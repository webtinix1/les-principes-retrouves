import type { Payload } from "payload";
import { genererReference } from "@/lib/espace/reference";
import { envoyerModele } from "@/lib/espace/mails";
import { journaliser } from "@/lib/espace/securite";

type Genre = "service" | "collaboration";

type Entree = {
  genre: Genre;
  request: Request;
  lecteur: { id: string; email: string; nom: string; prenoms: string } | null;
  nom: string;
  email: string;
  champs: Record<string, string>;
};

/**
 * Enregistre une demande de service ou une proposition de collaboration :
 * identifiant unique, rattachement au compte si la personne est connectée,
 * accusé de réception par e-mail, journal, notification interne facultative.
 * Retourne l'identifiant de la demande.
 */
export async function enregistrerDemande(payload: Payload, e: Entree): Promise<string> {
  const collection = e.genre === "service" ? "demandes-service" : "propositions-collaboration";
  const prefixe = e.genre === "service" ? "SRV" : "COL";
  const nom = e.lecteur ? `${e.lecteur.prenoms} ${e.lecteur.nom}`.trim() : e.nom;
  const email = e.lecteur ? e.lecteur.email : e.email;

  let reference = "";
  for (let essai = 0; essai < 4; essai++) {
    reference = genererReference(prefixe);
    try {
      await payload.create({
        collection,
        data: { reference, nom, email, lecteur: e.lecteur?.id ?? null, statut: "nouvelle", ...e.champs } as never,
      });
      break;
    } catch (err) {
      // Collision (très improbable) sur l'identifiant : on retente.
      if (essai === 3 || !/unique|duplicate|already/i.test(String((err as Error)?.message))) throw err;
    }
  }

  await journaliser(payload, e.genre === "service" ? "demande_service" : "demande_collaboration", {
    request: e.request,
    lecteur: e.lecteur?.id ?? null,
    detail: reference,
  });
  await envoyerModele(payload, email, e.genre, { reference });

  const interne = process.env.CONTACT_INBOX_EMAIL;
  if (interne) {
    await payload
      .sendEmail({
        to: interne,
        subject: `[Espace utilisateurs] ${reference}`,
        text: `${reference}\n${nom} <${email}>\n\n${Object.values(e.champs).join("\n")}`,
      })
      .catch(() => undefined);
  }
  return reference;
}

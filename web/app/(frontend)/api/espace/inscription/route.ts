import { NextResponse } from "next/server";
import { payloadClient } from "@/lib/payload";
import { proteger, erreur } from "@/lib/espace/protection";
import { schemaInscription } from "@/lib/espace/schemas";
import { journaliser } from "@/lib/espace/securite";
import { envoyerModele, urlSite } from "@/lib/espace/mails";
import { VERSION_INFORMATION } from "@/lib/espace-libelles";

export const runtime = "nodejs";

/**
 * Création de compte. La réponse est identique que l'adresse soit déjà connue
 * ou non (pas d'énumération de comptes) : dans le second cas, un e-mail
 * l'indique à son titulaire. Le compte reste inactif tant que l'adresse n'est
 * pas vérifiée (lien envoyé par Payload).
 */
export async function POST(request: Request) {
  const p = await proteger(request, schemaInscription, { nom: "inscription", limite: 5, fenetreMs: 3_600_000, antiRobot: true });
  if ("reponse" in p) return p.reponse;
  const d = p.data;

  const payload = await payloadClient();
  try {
    const { totalDocs } = await payload.count({ collection: "lecteurs", where: { email: { equals: d.email } } });
    if (totalDocs > 0) {
      await envoyerModele(payload, d.email, "existant", { lien: `${urlSite()}/espace-utilisateurs` });
      return NextResponse.json({ ok: true });
    }
    const lecteur = await payload.create({
      collection: "lecteurs",
      data: {
        email: d.email,
        password: d.mot_de_passe,
        nom: d.nom,
        prenoms: d.prenoms,
        pays: d.pays,
        ville: d.ville,
        profession: d.profession || undefined,
        domaine_interet: d.domaine_interet || undefined,
        information_acceptee_le: new Date().toISOString(),
        version_information: VERSION_INFORMATION,
      },
    });
    await journaliser(payload, "inscription", { request, lecteur: lecteur.id });
    return NextResponse.json({ ok: true });
  } catch (err) {
    payload.logger.error({ err }, "[espace] inscription");
    return erreur("generique", 500);
  }
}

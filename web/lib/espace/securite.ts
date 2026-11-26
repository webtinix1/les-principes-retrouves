import { createHmac } from "node:crypto";
import type { Payload } from "payload";
import { clientIp } from "@/lib/rate-limit";

/**
 * Journal technique de sécurité. Ne conserve jamais l'adresse IP en clair :
 * seulement une empreinte HMAC (corrélation d'abus), purgée après 12 mois.
 */
export type EvenementSecurite =
  | "inscription"
  | "verification"
  | "connexion"
  | "echec_connexion"
  | "deconnexion"
  | "mot_de_passe_demande"
  | "mot_de_passe_change"
  | "profil_modifie"
  | "compte_supprime"
  | "export_comptes"
  | "demande_service"
  | "demande_collaboration";

export const EVENEMENTS_SECURITE: { value: EvenementSecurite; label: string }[] = [
  { value: "inscription", label: "Inscription" },
  { value: "verification", label: "E-mail vérifié" },
  { value: "connexion", label: "Connexion" },
  { value: "echec_connexion", label: "Échec de connexion" },
  { value: "deconnexion", label: "Déconnexion" },
  { value: "mot_de_passe_demande", label: "Mot de passe oublié (demande)" },
  { value: "mot_de_passe_change", label: "Mot de passe modifié" },
  { value: "profil_modifie", label: "Profil modifié" },
  { value: "compte_supprime", label: "Compte supprimé" },
  { value: "export_comptes", label: "Export des comptes" },
  { value: "demande_service", label: "Demande de service" },
  { value: "demande_collaboration", label: "Proposition de collaboration" },
];

export function empreinteIp(ip: string): string {
  return createHmac("sha256", process.env.PAYLOAD_SECRET || "lpr").update(ip).digest("hex").slice(0, 24);
}

export async function journaliser(
  payload: Payload,
  evenement: EvenementSecurite,
  options: { request?: Request; lecteur?: string | null; detail?: string } = {},
): Promise<void> {
  try {
    await payload.create({
      collection: "journal-securite",
      data: {
        evenement,
        lecteur: options.lecteur ?? null,
        empreinte_ip: options.request ? empreinteIp(clientIp(options.request)) : undefined,
        detail: options.detail?.slice(0, 200),
      },
    });
  } catch (err) {
    payload.logger.error({ err }, "[espace] journal de sécurité indisponible");
  }
}

/** Supprime les entrées de plus de 12 mois (appelé au démarrage du serveur). */
export async function purgerJournal(payload: Payload): Promise<void> {
  const limite = new Date();
  limite.setMonth(limite.getMonth() - 12);
  await payload.delete({
    collection: "journal-securite",
    where: { createdAt: { less_than: limite.toISOString() } },
  });
}

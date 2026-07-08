import { prisma } from "@/lib/prisma";

/** Cookie httpOnly portant le code d'accès validé (re-vérifié en base à chaque usage). */
export const ACCESS_COOKIE = "ebz_acces";

/** Hiérarchie des niveaux : un niveau supérieur débloque les ressources inférieures. */
const RANG: Record<string, number> = {
  module_i: 1,
  module_ii: 2,
  module_iii: 3,
};

/** Niveau minimal requis par ressource téléchargeable (cf. politique d'accès, Page 7). */
export const RESSOURCE_NIVEAU: Record<string, string> = {
  wp_01: "module_i",
  wp_02: "module_i",
  wp_03: "module_i",
  guide_technique: "module_ii",
  arret_pilote: "module_ii",
};

export function rang(niveau: string): number {
  return RANG[niveau] ?? 0;
}

/** Un code (niveau) débloque-t-il une ressource donnée ? */
export function niveauDebloque(niveauCode: string, ressource_id: string): boolean {
  const requis = RESSOURCE_NIVEAU[ressource_id];
  if (!requis) return false;
  return rang(niveauCode) >= rang(requis);
}

export type CodeValide =
  | { valid: true; niveau: string; code: string }
  | { valid: false; reason: "introuvable" | "revoque" | "expire" };

/** Valide un code d'accès contre la base (source de vérité). */
export async function validerCode(code: string): Promise<CodeValide> {
  const rec = await prisma.codeAcces.findUnique({ where: { code: code.trim() } });
  if (!rec) return { valid: false, reason: "introuvable" };
  if (rec.revoked) return { valid: false, reason: "revoque" };
  if (rec.expires_at && rec.expires_at.getTime() < Date.now()) {
    return { valid: false, reason: "expire" };
  }
  return { valid: true, niveau: rec.niveau, code: rec.code };
}

/** Ressource marquée disponible au téléchargement par le back-office ? */
export async function ressourceDisponible(ressource_id: string): Promise<boolean> {
  const etat = await prisma.ressourceEtat.findUnique({ where: { ressource_id } });
  return etat?.is_available ?? false;
}

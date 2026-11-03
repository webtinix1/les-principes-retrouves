import { payloadClient } from "@/lib/payload";
import { getRessources, type RessourceCms } from "@/lib/cms";

/** Cookie httpOnly portant le code d'accès validé (re-vérifié en base à chaque usage). */
export const ACCESS_COOKIE = "ebz_acces";

/** Hiérarchie des niveaux : un niveau supérieur débloque les ressources inférieures. */
const RANG: Record<string, number> = {
  module_i: 1,
  module_ii: 2,
  module_iii: 3,
};

export function rang(niveau: string): number {
  return RANG[niveau] ?? 0;
}

/** Un code (niveau) débloque-t-il une ressource donnée ? (niveau requis : back-office) */
export function niveauDebloque(niveauCode: string, ressource: RessourceCms): boolean {
  const requis = rang(ressource.niveau_requis);
  return requis > 0 && rang(niveauCode) >= requis;
}

export async function getRessource(ressource_id: string): Promise<RessourceCms | undefined> {
  return (await getRessources()).find((r) => r.id === ressource_id);
}

export type CodeValide =
  | { valid: true; niveau: string; code: string }
  | { valid: false; reason: "introuvable" | "revoque" | "expire" };

/** Valide un code d'accès contre la base (source de vérité). */
export async function validerCode(code: string): Promise<CodeValide> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "codes-acces",
    where: { code: { equals: code.trim() } },
    limit: 1,
    depth: 0,
  });
  const rec = docs[0];
  if (!rec) return { valid: false, reason: "introuvable" };
  if (rec.revoked) return { valid: false, reason: "revoque" };
  if (rec.expires_at && new Date(rec.expires_at).getTime() < Date.now()) {
    return { valid: false, reason: "expire" };
  }
  if (!rec.used_at) {
    // Première utilisation (traçabilité back-office) — best-effort.
    await payload
      .update({ collection: "codes-acces", id: rec.id, data: { used_at: new Date().toISOString() } })
      .catch(() => undefined);
  }
  return { valid: true, niveau: rec.niveau, code: rec.code };
}

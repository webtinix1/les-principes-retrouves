import { cookies } from "next/headers";
import { payloadClient } from "@/lib/payload";
import type { Lecteur } from "@/payload-types";

/**
 * Session des comptes lecteurs : jeton Payload dans un cookie DÉDIÉ (httpOnly),
 * distinct du cookie du back-office. Se connecter comme lecteur n'écrase donc
 * jamais une session d'administrateur, et ce cookie n'ouvre aucune route /admin.
 */
export const COOKIE_LECTEUR = "lpr_lecteur";
const DUREE_S = 7 * 24 * 3600;

export function optionsCookie(maxAge = DUREE_S) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

/** Jeton de la requête courante (cookies Next). */
export async function jetonCourant(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE_LECTEUR)?.value;
}

/** Compte lecteur connecté, ou `null`. Le jeton est re-vérifié par Payload à chaque appel. */
export async function lecteurCourant(): Promise<(Lecteur & { _sid?: string }) | null> {
  const token = await jetonCourant();
  if (!token) return null;
  try {
    const payload = await payloadClient();
    const { user } = await payload.auth({ headers: new Headers({ Authorization: `JWT ${token}` }) });
    if (!user || user.collection !== "lecteurs") return null;
    return user as Lecteur & { _sid?: string };
  } catch {
    return null;
  }
}

/** Ferme la session côté serveur (retire la session du compte) puis efface le cookie. */
export async function fermerSession(lecteur: { id: string; _sid?: string }): Promise<void> {
  const payload = await payloadClient();
  try {
    const doc = await payload.db.findOne({ collection: "lecteurs", where: { id: { equals: lecteur.id } } });
    if (doc) {
      const sessions = ((doc as { sessions?: { id: string }[] }).sessions ?? []).filter((s) => s.id !== lecteur._sid);
      await payload.db.updateOne({
        id: lecteur.id,
        collection: "lecteurs",
        data: { ...doc, sessions, updatedAt: null },
        returning: false,
      });
    }
  } catch (err) {
    payload.logger.error({ err }, "[espace] fermeture de session");
  }
  (await cookies()).set(COOKIE_LECTEUR, "", { ...optionsCookie(0) });
}

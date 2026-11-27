import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Protection commune des routes de l'Espace utilisateurs :
 *  1. limitation de débit par IP et par route ;
 *  2. corps JSON valide, conforme au schéma ;
 *  3. champ piège (`site_web`, invisible) et délai minimal de remplissage ;
 *  4. Cloudflare Turnstile quand les clés sont configurées.
 * Les réponses d'erreur portent un code (`code`), traduit côté page par les
 * textes éditables du registre.
 */

export function erreur(code: string, status: number, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, code, ...extra }, { status });
}

async function verifierTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // non configuré : mode dégradé, comme le formulaire de contact
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    return ((await res.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}

type Options = {
  /** Nom du compteur de débit. */
  nom: string;
  limite: number;
  fenetreMs: number;
  /** Active champ piège, délai minimal et Turnstile (formulaires publics). */
  antiRobot?: boolean;
};

const DELAI_MIN_MS = Number(process.env.ESPACE_DELAI_MIN_MS ?? 1500);
/** Multiplicateur des plafonds de débit (recette automatisée uniquement ; 1 par défaut). */
const MULT_LIMITE = Math.max(1, Number(process.env.ESPACE_LIMITE_MULT ?? 1));

/** Valide la requête ; retourne les données ou une réponse d'erreur à renvoyer telle quelle. */
export async function proteger<T>(
  request: Request,
  schema: ZodType<T>,
  options: Options,
): Promise<{ data: T } | { reponse: NextResponse }> {
  const limite = rateLimit(options.nom, clientIp(request), options.limite * MULT_LIMITE, options.fenetreMs);
  if (!limite.ok) {
    return { reponse: erreur("limite", 429, { retry: limite.retryApres }) };
  }

  let brut: unknown;
  try {
    brut = await request.json();
  } catch {
    return { reponse: erreur("champs", 400) };
  }
  const corps = (brut && typeof brut === "object" ? brut : {}) as Record<string, unknown>;

  if (options.antiRobot) {
    const piege = typeof corps.site_web === "string" && corps.site_web !== "";
    const ouvert = Number(corps.ouvert_a);
    const trop_vite = !Number.isFinite(ouvert) || Date.now() - ouvert < DELAI_MIN_MS;
    if (piege || trop_vite) return { reponse: erreur("robot", 400) };
    if (!(await verifierTurnstile(typeof corps.turnstile_token === "string" ? corps.turnstile_token : undefined))) {
      return { reponse: erreur("robot", 400) };
    }
  }

  const parsed = schema.safeParse(corps);
  if (!parsed.success) {
    const motDePasse = parsed.error.issues.some((i) => i.path[0] === "mot_de_passe" || i.path[0] === "nouveau_mot_de_passe");
    return { reponse: erreur(motDePasse ? "mot_de_passe" : "champs", 422) };
  }
  return { data: parsed.data };
}

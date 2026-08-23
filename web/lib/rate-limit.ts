/**
 * Limitation de débit en mémoire (fenêtre fixe), par IP et par route.
 *
 * Garde-fou anti-abus sans dépendance externe : l'application tourne dans un
 * conteneur standalone unique, donc l'état de module est partagé entre toutes
 * les requêtes du serveur. Ce n'est pas un rate-limit distribué (il repart à
 * zéro au redémarrage et ne se partage pas entre instances) — largement suffisant
 * pour freiner le brute-force d'un code d'accès et le spam d'un formulaire.
 */

type Fenetre = { comptes: number; expireA: number };

// clé « route:ip » → fenêtre courante
const registre = new Map<string, Fenetre>();

// Balayage paresseux : on purge les fenêtres périmées de temps en temps pour
// éviter que la map ne grossisse indéfiniment sous des IP changeantes.
let dernierBalayage = 0;
function balayer(maintenant: number) {
  if (maintenant - dernierBalayage < 60_000) return;
  dernierBalayage = maintenant;
  for (const [cle, f] of registre) {
    if (f.expireA <= maintenant) registre.delete(cle);
  }
}

export type ResultatLimite = {
  ok: boolean;
  /** Secondes avant réautorisation (utile pour l'en-tête Retry-After). */
  retryApres: number;
};

/**
 * Enregistre une tentative et indique si elle est autorisée.
 * @param nom     identifiant de la route (« acces », « contact », « checkout »)
 * @param ip      IP cliente (cf. clientIp)
 * @param limite  nombre de requêtes autorisées par fenêtre
 * @param fenetreMs durée de la fenêtre en millisecondes
 */
export function rateLimit(
  nom: string,
  ip: string,
  limite: number,
  fenetreMs: number,
): ResultatLimite {
  const maintenant = Date.now();
  balayer(maintenant);

  const cle = `${nom}:${ip}`;
  const courante = registre.get(cle);

  if (!courante || courante.expireA <= maintenant) {
    registre.set(cle, { comptes: 1, expireA: maintenant + fenetreMs });
    return { ok: true, retryApres: 0 };
  }

  if (courante.comptes >= limite) {
    return { ok: false, retryApres: Math.ceil((courante.expireA - maintenant) / 1000) };
  }

  courante.comptes += 1;
  return { ok: true, retryApres: 0 };
}

/**
 * IP cliente derrière le reverse-proxy (Traefik). On prend le premier maillon
 * de `x-forwarded-for`, puis `x-real-ip`. Faute d'en-tête, on retombe sur une
 * clé constante : le seau devient global, ce qui est le comportement sûr (on
 * bride plutôt que de laisser passer).
 */
export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const premier = xff.split(",")[0]?.trim();
    if (premier) return premier;
  }
  return request.headers.get("x-real-ip")?.trim() || "inconnu";
}

/** Réponse 429 standard avec en-tête Retry-After. */
export function reponse429(retryApres: number): Response {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "Trop de tentatives. Merci de patienter avant de réessayer.",
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(Math.max(1, retryApres)),
      },
    },
  );
}

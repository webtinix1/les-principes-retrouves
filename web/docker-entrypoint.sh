#!/bin/sh
# Lance le serveur Next.js (Payload applique ses migrations et l'amorçage au
# premier appel), puis revalide les pages prérendues au build — sans base —
# pour qu'elles servent le contenu du back-office.
set -e

mkdir -p "${DOCUMENTS_DIR:-/app/data/documents}"

# Jeton de revalidation tiré au hasard à chaque démarrage : il n'existe que dans
# ce conteneur, le temps de ce processus. Rien à configurer côté déploiement.
CONTENU_REVALIDATE_TOKEN="$(od -An -tx1 -N32 /dev/urandom | tr -d ' \n')"
export CONTENU_REVALIDATE_TOKEN

echo "[entrypoint] Démarrage du serveur…"
node server.js &
SERVEUR_PID=$!

# Le serveur reste le processus à qui l'arrêt du conteneur doit être transmis.
trap 'kill -TERM "$SERVEUR_PID" 2>/dev/null' TERM INT

# La route de revalidation initialise Payload (migrations + amorçage) avant
# d'invalider les pages. On passe par node plutôt que wget : busybox ne gère
# pas les mêmes options que GNU wget selon les versions.
node -e '
const base = `http://127.0.0.1:${process.env.PORT || 3000}`;
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  for (let i = 0; i < 90; i++) {
    try {
      const reponse = await fetch(`${base}/api/contenu/revalider`, {
        method: "POST",
        headers: { authorization: `Bearer ${process.env.CONTENU_REVALIDATE_TOKEN}` },
      });
      if (reponse.ok) {
        console.log("[entrypoint] Base prête, contenu revalidé.");
        return;
      }
      console.error(`[entrypoint] revalidation : réponse ${reponse.status}, nouvel essai…`);
    } catch {
      /* serveur pas encore à l’écoute */
    }
    await pause(2000);
  }
  console.error(
    "[entrypoint] AVERTISSEMENT : base ou serveur injoignable, contenu non revalidé.",
  );
})();
' &

wait "$SERVEUR_PID"

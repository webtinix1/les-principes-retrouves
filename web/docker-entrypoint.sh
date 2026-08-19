#!/bin/sh
# Applique les migrations Prisma en attente (crée la base si absente, migre la
# base existante sur le volume), lance le serveur Next.js, puis revalide les
# pages à contenu éditable.
set -e

mkdir -p /app/data
echo "[entrypoint] Application des migrations Prisma…"
node ./node_modules/prisma/build/index.js migrate deploy

# Jeton de revalidation tiré au hasard à chaque démarrage : il n'existe que dans
# ce conteneur, le temps de ce processus. Rien à configurer côté déploiement.
CONTENU_REVALIDATE_TOKEN="$(od -An -tx1 -N32 /dev/urandom | tr -d ' \n')"
export CONTENU_REVALIDATE_TOKEN

echo "[entrypoint] Démarrage du serveur…"
node server.js &
SERVEUR_PID=$!

# Le serveur reste le processus à qui l'arrêt du conteneur doit être transmis.
trap 'kill -TERM "$SERVEUR_PID" 2>/dev/null' TERM INT

# Les pages sont prérendues au build, sans base : on réapplique les textes du
# back-office (volume) dès que le serveur répond. On passe par node plutôt que
# wget : busybox ne gère pas les mêmes options que GNU wget selon les versions.
node -e '
const base = `http://127.0.0.1:${process.env.PORT || 3000}`;
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const pret = await fetch(`${base}/`);
      if (!pret.ok) throw new Error(String(pret.status));
    } catch {
      await pause(1000);
      continue;
    }
    const reponse = await fetch(`${base}/api/contenu/revalider`, {
      method: "POST",
      headers: { authorization: `Bearer ${process.env.CONTENU_REVALIDATE_TOKEN}` },
    });
    if (reponse.ok) {
      console.log("[entrypoint] Contenu éditable revalidé.");
    } else {
      console.error(
        `[entrypoint] AVERTISSEMENT : revalidation refusée (${reponse.status}).`,
      );
    }
    return;
  }
  console.error(
    "[entrypoint] AVERTISSEMENT : serveur injoignable, contenu non revalidé.",
  );
})();
' &

wait "$SERVEUR_PID"

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
# back-office (volume) dès que le serveur répond.
(
  i=0
  while [ "$i" -lt 60 ]; do
    if wget -q -O /dev/null "http://127.0.0.1:${PORT:-3000}/" 2>/dev/null; then
      if wget -q -O /dev/null --method=POST --body-data='' \
        --header="Authorization: Bearer ${CONTENU_REVALIDATE_TOKEN}" \
        "http://127.0.0.1:${PORT:-3000}/api/contenu/revalider" 2>/dev/null; then
        echo "[entrypoint] Contenu éditable revalidé."
      else
        echo "[entrypoint] AVERTISSEMENT : revalidation du contenu échouée." >&2
      fi
      exit 0
    fi
    i=$((i + 1))
    sleep 1
  done
  echo "[entrypoint] AVERTISSEMENT : serveur injoignable, contenu non revalidé." >&2
) &

wait "$SERVEUR_PID"

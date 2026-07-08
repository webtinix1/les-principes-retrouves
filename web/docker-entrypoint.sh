#!/bin/sh
# Initialise la base SQLite sur le volume persistant au premier démarrage,
# puis lance le serveur Next.js. Aucune CLI Prisma requise au runtime :
# le schéma est baké dans /app/seed.db au moment du build (prisma migrate deploy).
set -e

mkdir -p /app/data
if [ ! -f /app/data/prod.db ]; then
  echo "[entrypoint] Base absente — initialisation depuis le schéma baké."
  cp /app/seed.db /app/data/prod.db
fi

exec node server.js

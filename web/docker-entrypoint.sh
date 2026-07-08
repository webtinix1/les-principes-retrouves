#!/bin/sh
# Applique les migrations Prisma en attente (crée la base si absente, migre la
# base existante sur le volume) puis lance le serveur Next.js.
set -e

mkdir -p /app/data
echo "[entrypoint] Application des migrations Prisma…"
node ./node_modules/prisma/build/index.js migrate deploy

exec node server.js

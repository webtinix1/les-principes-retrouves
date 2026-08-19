#!/bin/sh
# Sauvegarde de la base SQLite de production (commandes, codes d'accès, messages,
# contenus édités). L'image ne contient pas sqlite3 : on produit un snapshot
# COHÉRENT via `VACUUM INTO` (node + @libsql/client, présents dans l'image),
# on l'extrait sur l'hôte, on le compresse et on applique une rétention.
#
# Cron conseillé (voir /etc/cron.d/principes-backup) : tous les jours à 03h17.
set -eu

CONTENEUR="principes-retrouves-web-1"
DEST="/opt/platform.webtinix.com/apps/clients/les-principes-retrouves/backups"
RETENTION_JOURS=14
HORODATAGE="$(date +%Y%m%d-%H%M%S)"
SNAP_CONTENEUR="/app/data/_backup-${HORODATAGE}.db"
SNAP_HOTE="${DEST}/prod-${HORODATAGE}.db"

mkdir -p "$DEST"

# 1) Snapshot cohérent DANS le conteneur (VACUUM INTO gère les accès concurrents).
docker exec "$CONTENEUR" node -e "
const { createClient } = require('@libsql/client');
const db = createClient({ url: process.env.DATABASE_URL });
db.execute(\"VACUUM INTO '${SNAP_CONTENEUR}'\")
  .then(() => { console.log('snapshot ok'); process.exit(0); })
  .catch((e) => { console.error(e.message); process.exit(1); });
"

# 2) Extraction sur l'hôte, puis nettoyage du snapshot temporaire.
docker cp "${CONTENEUR}:${SNAP_CONTENEUR}" "$SNAP_HOTE"
docker exec "$CONTENEUR" rm -f "$SNAP_CONTENEUR"

# 3) Compression.
gzip -f "$SNAP_HOTE"
echo "[backup] ${SNAP_HOTE}.gz"

# 4) Rétention : supprime les sauvegardes plus vieilles que N jours.
find "$DEST" -name 'prod-*.db.gz' -type f -mtime "+${RETENTION_JOURS}" -delete

# 5) Garde-fou : au moins une sauvegarde doit exister.
if [ -z "$(find "$DEST" -name 'prod-*.db.gz' -type f 2>/dev/null | head -1)" ]; then
  echo "[backup] AVERTISSEMENT : aucune sauvegarde présente après exécution." >&2
  exit 1
fi

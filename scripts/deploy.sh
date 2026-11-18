#!/usr/bin/env bash
# Mise à jour de la production — exécuté SUR LE SERVEUR par le workflow
# .github/workflows/deploy.yml (ssh … 'bash -s' < scripts/deploy.sh), ou à la
# main depuis le serveur :
#   APP_DIR=/opt/platform.webtinix.com/apps/clients/les-principes-retrouves \
#   COMMIT=origin/main bash scripts/deploy.sh
#
# Étapes :
#   1. checkout du commit validé par la CI ;
#   2. construction de la nouvelle image web (l'ancienne continue de servir) ;
#   3. arrêt de web, instantané PostgreSQL (pg_dump) — l'état exact d'avant
#      les migrations Payload, sans écriture concurrente ;
#   4. démarrage du nouveau conteneur (migrations + amorçage au démarrage) ;
#   5. attente du conteneur « healthy » ; nettoyage des images orphelines.
# Si le nouveau conteneur ne devient pas sain : la base est restaurée depuis
# l'instantané (les migrations Payload sont donc annulées) et l'image précédente
# est remise en service. Le code dans APP_DIR reste, lui, sur le nouveau commit.
set -euo pipefail

APP_DIR="${APP_DIR:?APP_DIR manquant (dossier du dépôt sur le serveur)}"
COMMIT="${COMMIT:?COMMIT manquant (commit à déployer)}"
BRANCHE="${BRANCHE:-main}"
ATTENTE_MAX="${ATTENTE_MAX:-300}"          # secondes accordées au conteneur pour devenir sain
SAUVEGARDES_DIR="${SAUVEGARDES_DIR:-$APP_DIR/backups/deploiement}"
SAUVEGARDES_CONSERVEES="${SAUVEGARDES_CONSERVEES:-5}"   # instantanés gardés après succès

log() { printf '[deploy] %s\n' "$*"; }

cd "$APP_DIR"
[ -f .env ] || { log "ERREUR : aucun .env dans $APP_DIR (cf. DEPLOYMENT.md)."; exit 1; }

# 1) Garde-fou : on n'écrase jamais une modification faite à la main sur le serveur.
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  log "ERREUR : modifications locales non committées dans $APP_DIR — déploiement annulé."
  git status --short --untracked-files=no
  exit 1
fi

# 2) Code : on se cale exactement sur le commit validé par la CI.
log "Récupération de origin/$BRANCHE…"
git fetch --prune origin "$BRANCHE"
if ! git merge-base --is-ancestor "$COMMIT" "origin/$BRANCHE"; then
  log "ERREUR : $COMMIT n'appartient pas à origin/$BRANCHE — déploiement annulé."
  exit 1
fi
git checkout -q "$BRANCHE"
git reset -q --hard "$COMMIT"
log "Code en place : $(git log -1 --format='%h %s')"

# 3) Image web actuellement en service (pour revenir en arrière si besoin).
NOM_IMAGE="$(docker compose config --images | grep -E -- '-web$' | head -1 || true)"
ANCIENNE_IMAGE="$(docker compose images -q web 2>/dev/null | head -1 || true)"
INSTANTANE=""

# 4) Construction de la nouvelle image : l'ancien conteneur continue de servir pendant ce temps.
log "docker compose build --pull web…"
# --pull : rafraîchit l'image de base (node:22-alpine) — un cache local périmé ne
# satisfait plus la version de Node exigée par Payload.
docker compose build --pull web

# 5) Instantané de la base, conteneur web arrêté (aucune écriture entre l'instantané et
#    les migrations). pg_dump/pg_restore viennent de l'image postgres du service db ;
#    les identifiants sont lus dans l'environnement du conteneur.
log "Base de données : démarrage du service db (si besoin)…"
docker compose up -d --wait db
mkdir -p "$SAUVEGARDES_DIR"
INSTANTANE="$SAUVEGARDES_DIR/avant-$(date +%Y%m%d-%H%M%S)-$(git rev-parse --short "$COMMIT").dump"
log "Arrêt de web, puis instantané PostgreSQL → $INSTANTANE"
docker compose stop web
docker compose exec -T db sh -c 'pg_dump -Fc -U "$POSTGRES_USER" "$POSTGRES_DB"' > "$INSTANTANE"
if [ ! -s "$INSTANTANE" ]; then
  log "ERREUR : instantané vide — redémarrage de la version en service, déploiement annulé."
  rm -f "$INSTANTANE"
  docker compose up -d --no-build web
  exit 1
fi
log "Instantané : $(du -h "$INSTANTANE" | cut -f1)"

restaurer_base() {
  [ -n "$INSTANTANE" ] && [ -s "$INSTANTANE" ] || { log "Aucun instantané : base laissée telle quelle."; return 1; }
  log "Restauration de la base depuis $INSTANTANE (annule les migrations)…"
  docker compose stop web
  docker compose exec -T db sh -c '
    set -e
    dropdb  -U "$POSTGRES_USER" --force --if-exists "$POSTGRES_DB"
    createdb -U "$POSTGRES_USER" -O "$POSTGRES_USER" "$POSTGRES_DB"
    pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner --no-privileges --single-transaction --exit-on-error
  ' < "$INSTANTANE"
}

revenir_en_arriere() {
  if restaurer_base; then
    log "Base restaurée."
  else
    log "AVERTISSEMENT : base NON restaurée — intervention manuelle nécessaire (cf. DEPLOYMENT.md)."
  fi
  if [ -z "$ANCIENNE_IMAGE" ] || [ -z "$NOM_IMAGE" ]; then
    log "Pas d'image précédente connue : rien à remettre en service."
    return
  fi
  log "Retour à l'image précédente ($ANCIENNE_IMAGE)…"
  docker tag "$ANCIENNE_IMAGE" "$NOM_IMAGE"
  docker compose up -d --no-build web
}

# 6) Démarrage du nouveau conteneur (migrations + amorçage s'exécutent au démarrage).
log "docker compose up -d…"
docker compose up -d --no-build

# 7) Attente du conteneur web sain (HEALTHCHECK de web/Dockerfile).
CONTENEUR="$(docker compose ps -q web)"
log "Attente du conteneur web ${CONTENEUR:0:12} (max ${ATTENTE_MAX}s)…"
debut="$(date +%s)"
while :; do
  etat="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$CONTENEUR" 2>/dev/null || echo inconnu)"
  case "$etat" in
    healthy)
      log "Conteneur web sain."
      break
      ;;
    unhealthy|exited|dead|inconnu)
      log "ERREUR : conteneur web en état « $etat »."
      docker compose logs --tail 200 web || true
      revenir_en_arriere
      exit 1
      ;;
  esac
  if [ $(( $(date +%s) - debut )) -ge "$ATTENTE_MAX" ]; then
    log "ERREUR : conteneur web toujours « $etat » après ${ATTENTE_MAX}s."
    docker compose logs --tail 200 web || true
    revenir_en_arriere
    exit 1
  fi
  sleep 5
done

# 8) Nettoyage : images sans tag, instantanés au-delà des N plus récents.
docker image prune -f >/dev/null || true
ls -1t "$SAUVEGARDES_DIR"/avant-*.dump 2>/dev/null | tail -n +"$((SAUVEGARDES_CONSERVEES + 1))" | xargs -r rm -f

log "Déploiement terminé (instantané conservé : $INSTANTANE)."
docker compose ps

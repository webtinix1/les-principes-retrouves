# Déploiement — Les Principes Retrouvés (Next.js + Payload CMS)

Application **Next.js** (`web/`) avec back-office **Payload CMS** sur `/admin` et base
**PostgreSQL**, en Docker derrière **Traefik**, domaine **piloté par le `.env`**.

## Architecture

| Service | Rôle |
|---|---|
| `web` | Next.js (sortie `standalone`) : site public + admin Payload (`/admin`) + API (`/api`) |
| `db` | PostgreSQL 17 — réseau `interne` uniquement, jamais exposé |
| `outils` | (profil `outils`, ne démarre jamais seul) image de build complète pour les scripts |

- Volumes : `db-data` (PostgreSQL), `app-data` (`/app/data` : PDF protégés téléversés).
- HTTPS / Let's Encrypt / redirection / HSTS : labels Traefik ; `/admin` reçoit en plus un
  basic-auth Traefik (double verrou avec l'authentification Payload).

## Pré-requis

1. Docker + Docker Compose.
2. Traefik en place : entrypoint `websecure`, certresolver `le`, réseau externe
   `traefik-platform-network` (`docker network create traefik-platform-network` sinon).
3. DNS de `SITE_HOST` pointant vers le serveur.

## Mise en route

```bash
cp .env.example .env
# Renseigner : SITE_HOST, TRAEFIK_CONFIG_NAME, NEXT_PUBLIC_SITE_URL,
#   POSTGRES_USER / POSTGRES_PASSWORD / POSTGRES_DB,
#   PAYLOAD_SECRET (openssl rand -hex 32),
#   PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD (premier compte),
#   ADMIN_BASIC_AUTH, paiement et e-mail.
docker compose up -d --build
```

Au démarrage, le conteneur `web` :

1. applique les migrations PostgreSQL en attente (`web/migrations/`) ;
2. amorce ce qui est vide : premier compte admin, modules, concepts, autorités,
   ressources, textes des pages (jamais d'écrasement) ;
3. revalide les pages prérendues au build, pour qu'elles servent le contenu de la base.

Back-office : `https://${SITE_HOST}/admin`.

> **`NEXT_PUBLIC_SITE_URL` doit être exactement l'URL publique** (`https://${SITE_HOST}`).
> Payload n'accepte les sessions du back-office que depuis cette origine : avec une
> autre valeur, la connexion semble fonctionner mais les enregistrements échouent.

**E-mails du back-office** (mot de passe oublié) : envoyés via Resend dès que
`RESEND_API_KEY` et `RESEND_FROM` sont renseignés (domaine vérifié chez Resend) ;
sinon ils sont seulement écrits dans les logs du conteneur.

## Tester la pile en local (sans Traefik)

```bash
cp .env.example .env    # renseigner au minimum POSTGRES_*, PAYLOAD_SECRET, PAYLOAD_ADMIN_*, ADMIN_BASIC_AUTH
docker network create traefik-platform-network   # une fois
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build
```

Site sur `http://localhost:3000`, back-office sur `http://localhost:3000/admin`.

## Bascule depuis l'ancienne version (SQLite)

L'ancienne version stockait messages, commandes, codes d'accès, disponibilité des
ressources et textes réécrits dans `/app/data/prod.db` (volume `app-data`, conservé). Pour
les reprendre dans PostgreSQL, **après un premier démarrage** de la nouvelle version :

```bash
docker compose --profile outils run --rm -e SQLITE_FILE=/app/data/prod.db outils yarn import:sqlite
docker compose restart web     # republie les pages avec les textes importés
```

Le script est rejouable sans doublon. Les codes d'accès restent valides ; les anciens liens
de confirmation de commande (identifiants changés) ne le sont plus.

## Mettre à jour

### Déploiement automatique (merge sur `main`)

Chaque merge sur `main` déclenche le workflow **CI** ; s'il réussit, le workflow
**Déploiement** (`.github/workflows/deploy.yml`) se connecte en SSH au serveur et y exécute
`scripts/deploy.sh` :

1. checkout du commit validé par la CI ;
2. construction de la nouvelle image `web` (l'ancienne continue de servir) ;
3. arrêt de `web`, puis **instantané PostgreSQL** (`pg_dump`) dans
   `backups/deploiement/avant-<date>-<commit>.dump` — état exact d'avant les migrations ;
4. démarrage du nouveau conteneur (migrations + amorçage), attente de son état « healthy » ;
5. nettoyage des images orphelines ; les 5 derniers instantanés sont conservés.

Si le nouveau conteneur ne devient pas sain, **la base est restaurée depuis l'instantané
(les migrations Payload sont annulées) et l'image précédente est remise en service** ; le
workflow échoue avec les logs du conteneur (onglet Actions). L'indisponibilité à chaque
déploiement se limite à la durée de l'instantané et du démarrage. Un déploiement peut aussi
être relancé à la main : Actions → Déploiement → *Run workflow* (branche `main`).

Restauration manuelle d'un instantané (par exemple après un déploiement réussi mais
indésirable), depuis le dossier du dépôt sur le serveur :

```bash
docker compose stop web
docker compose exec -T db sh -c 'dropdb -U "$POSTGRES_USER" --force --if-exists "$POSTGRES_DB" \
  && createdb -U "$POSTGRES_USER" -O "$POSTGRES_USER" "$POSTGRES_DB" \
  && pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner --no-privileges --single-transaction --exit-on-error' \
  < backups/deploiement/avant-XXXX.dump
git checkout <commit précédent> && docker compose up -d --build   # code + image correspondants
```

**Mise en place (une fois)** — le serveur doit déjà héberger un clone du dépôt avec son
`.env` (cf. « Mise en route ») et pouvoir faire `git fetch` dessus.

1. Clé SSH dédiée, générée localement :

   ```bash
   ssh-keygen -t ed25519 -N "" -C "github-actions principes-retrouves" -f deploy_key
   ```

   Ajouter `deploy_key.pub` dans `~/.ssh/authorized_keys` de l'utilisateur de déploiement
   sur le serveur (membre du groupe `docker`, propriétaire du dossier du dépôt).
2. Empreinte du serveur (recommandé, évite une connexion « à l'aveugle ») :

   ```bash
   ssh-keyscan -H SERVEUR            # avec -p PORT si SSH n'écoute pas sur 22
   ```

3. Secrets GitHub (dépôt → *Settings → Secrets and variables → Actions*, ou environnement
   `production` pour y ajouter des relecteurs obligatoires) :

   | Secret | Valeur |
   |---|---|
   | `DEPLOY_HOST` | hôte ou IP du serveur |
   | `DEPLOY_USER` | utilisateur SSH |
   | `DEPLOY_SSH_KEY` | contenu de `deploy_key` (clé privée, jamais committée) |
   | `DEPLOY_PATH` | dossier du dépôt sur le serveur (ex. `/opt/platform.webtinix.com/apps/clients/les-principes-retrouves`) |
   | `DEPLOY_PORT` | (optionnel) port SSH, `22` par défaut |
   | `DEPLOY_KNOWN_HOSTS` | (optionnel) sortie de `ssh-keyscan` ci-dessus |

   Variable optionnelle `SITE_URL` (onglet *Variables*) : URL affichée sur l'environnement.

Le script refuse de déployer si le clone du serveur contient des modifications locales non
committées : toute correction passe par Git, jamais directement sur le serveur.

### Mise à jour manuelle

```bash
git pull
docker compose up -d --build
```

Modification du schéma (collection, champ) : générer la migration en développement
(`cd web && yarn migrate:create <nom>`) et la committer — elle s'applique au redémarrage.
En mise à jour manuelle, aucun instantané n'est pris : faire un `pg_dump` avant (cf.
« Sauvegardes ») si la mise à jour contient une migration.

## Sauvegardes

```bash
docker compose exec db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > sauvegarde.sql
docker run --rm -v principes-retrouves_app-data:/d -v "$PWD":/b alpine tar czf /b/documents.tgz -C /d documents
```

## Commandes utiles

```bash
docker compose logs -f web      # logs application (migrations, amorçage)
docker compose ps               # état
docker compose down             # arrêt (volumes conservés)
```

## Plusieurs instances (preprod / prod / démo)

Un dossier (ou un `.env`) par instance, avec `SITE_HOST`, `TRAEFIK_CONFIG_NAME` et
`COMPOSE_PROJECT_NAME` **différents** — Traefik route par domaine.

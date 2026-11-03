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

```bash
git pull
docker compose up -d --build
```

Modification du schéma (collection, champ) : générer la migration en développement
(`cd web && yarn migrate:create <nom>`) et la committer — elle s'applique au redémarrage.

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

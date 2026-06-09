# Déploiement — Les Principes Retrouvés (maquette)

Déploiement de la maquette statique en Docker, derrière **Traefik**, le domaine étant
**piloté par le `.env`** (même logique que les autres services de la plateforme).

## Architecture

- Image **nginx:alpine** servant le contenu de `site/` (statique).
- Exposée à Traefik via le réseau externe **`traefik-platform-network`**.
- HTTPS / certificat Let's Encrypt + redirection + HSTS gérés par Traefik (labels).

## Pré-requis

1. Docker + Docker Compose sur le serveur.
2. Un **Traefik** déjà en place avec :
   - un entrypoint **`websecure`** (443),
   - un certresolver nommé **`le`** (Let's Encrypt),
   - le réseau externe **`traefik-platform-network`**.
   > Si le réseau n'existe pas encore : `docker network create traefik-platform-network`
3. Le **DNS** du domaine (`SITE_HOST`) pointant vers le serveur.

## Mise en route

```bash
cp .env.example .env
# Éditer .env : SITE_HOST, TRAEFIK_CONFIG_NAME (unique), TZ
docker compose up -d --build
```

Le site est alors disponible sur `https://${SITE_HOST}`.

## Variables (.env)

| Variable | Rôle | Exemple |
|---|---|---|
| `COMPOSE_PROJECT_NAME` | Préfixe des conteneurs/images | `principes-retrouves` |
| `SITE_HOST` | Domaine public servi par Traefik | `lesprincipesretrouves.com` |
| `TRAEFIK_CONFIG_NAME` | Nom **unique** du routeur Traefik | `preprod`, `prod`, `demo-client` |
| `TZ` | Fuseau horaire du conteneur | `Africa/Brazzaville` |

## Plusieurs instances (preprod / prod / démo client)

Dupliquer dans un autre dossier (ou un autre `.env`) avec un `SITE_HOST` et un
`TRAEFIK_CONFIG_NAME` **différents** — aucun port à gérer, Traefik route par domaine.

## Mettre à jour le site

```bash
git pull          # ou copier les nouveaux fichiers de site/
docker compose up -d --build
```

## Commandes utiles

```bash
docker compose logs -f web      # logs nginx
docker compose ps               # état
docker compose down             # arrêt
```

## Vers la v2 (PrestaShop)

Quand la maquette sera validée et convertie en thème PrestaShop, ce `docker-compose.yml`
sera remplacé par une stack PrestaShop + base de données (MariaDB) + volumes, sur le
**même modèle Traefik piloté par `.env`** que le `docker-compose.yml` Dolibarr de référence.
Voir `docs/integrations.md`.

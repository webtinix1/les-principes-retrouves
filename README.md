# Les Principes Retrouvés

Site web académique officiel de **Gaudéric MAMBOU**, chercheur indépendant en épistémologie juridique (Brazzaville — Juin 2026).

Le site archive et présente une œuvre d'épistémologie et de droit constitutionnel — *Les Principes Retrouvés* — avec le ton et la sobriété d'une revue de recherche de haut niveau (références : Cairn, HAL, droit comparé).

> *« Le réel est voilé pour tous, filtré pour certains, et reconstructible par la méthode. »*

---

## État du projet

**Version 1 — MAQUETTE** statique, destinée à la **validation par le client** avant déploiement.
La v1 est un prototype visuel fidèle ; les fonctions back-end (paiement, comptes, envoi de formulaire) ne sont pas branchées.

**Cible v2** — conversion en **thème PrestaShop** (intégration modulaire + moyens de paiement Stripe / CinetPay). Voir [`docs/feature-backlog.md`](docs/feature-backlog.md).

## Stack

- **HTML5 / CSS3 / JavaScript vanilla**, statique, sans framework ni étape de build.
- Polices Google Fonts : Playfair Display, Lora, Inter, Fira Code.
- Header / footer définis une seule fois ([`site/assets/js/partials.js`](site/assets/js/partials.js)) et injectés en JS (sans `fetch`, donc compatibles `file://`) — transposables tels quels en partials `.tpl` PrestaShop.

## Structure du dépôt

```text
.
├── docs/        # 7 documents fondateurs (référence permanente)
├── site/        # Code de la maquette (HTML/CSS/JS, assets, data)
├── nginx/       # Configuration nginx pour le déploiement Docker
├── Dockerfile           # Image nginx servant site/
├── docker-compose.yml   # Déploiement derrière Traefik (domaine piloté par .env)
├── .env.example
└── DEPLOYMENT.md        # Procédure de déploiement
```

### Les 9 pages du site

Accueil · Manifeste · Note Épistémologique · L'Ouvrage · Laboratoire Doctrinal · Concepts Stabilisés · Formation · Extraits (freemium) · Contact.
Temps fort de l'accueil : la **Pyramide de Σ** interactive (animation « Méthode M » au survol).

## Lancer la maquette en local

- **Simple** : ouvrir [`site/index.html`](site/index.html) dans un navigateur (double-clic).
- **Recommandé** (rendu identique au déploiement) :
  - VS Code → extension **Live Server** → clic droit sur `site/index.html` → *Open with Live Server*.
  - ou : `python -m http.server 3000` à la racine, puis `http://127.0.0.1:3000/site/index.html`.

## Application Next.js + back-office Payload (`web/`)

Le site en production est l'application **Next.js** de `web/`, avec le back-office
**Payload CMS** sur `/admin` (textes des pages, modules et tarifs, concepts, autorités,
ressources et PDF protégés, commandes, codes d'accès, messages de contact) et une base
**PostgreSQL**.

```bash
cd web
cp .env.example .env      # DATABASE_URL (PostgreSQL local), PAYLOAD_SECRET, PAYLOAD_ADMIN_*
yarn install
yarn dev                  # http://localhost:3000 — admin : http://localhost:3000/admin
```

Au premier démarrage, la base est amorcée automatiquement (compte admin, modules,
concepts, autorités, ressources, textes des pages) à partir des données du code.

| Commande (`web/`) | Rôle |
|---|---|
| `yarn migrate:create <nom>` | Génère une migration après modification du schéma (à committer) |
| `yarn generate:types` | Régénère `payload-types.ts` |
| `yarn generate:importmap` | Régénère l'import map de l'admin (composants personnalisés) |
| `yarn contenu:extraire` | Régénère `content/blocs/origine.json` depuis le rendu JSX |
| `yarn import:sqlite` | Reprise one-shot de l'ancienne base SQLite (cf. DEPLOYMENT.md) |

## Déploiement (Docker + Traefik)

Le domaine et le routeur sont **pilotés par `.env`**, derrière un Traefik existant (réseau `traefik-platform-network`, HTTPS/HSTS gérés par Traefik).

```bash
cp .env.example .env      # SITE_HOST, TRAEFIK_CONFIG_NAME, POSTGRES_*, PAYLOAD_SECRET…
docker compose up -d --build
```

Détails complets : [`DEPLOYMENT.md`](DEPLOYMENT.md).

## Documentation projet (`docs/`)

| Fichier | Contenu |
|---|---|
| [`CLAUDE.md`](docs/CLAUDE.md) | Manuel d'instructions, règles d'or, conventions |
| [`brand-brief.md`](docs/brand-brief.md) | Palette, typographies, logo, ton éditorial |
| [`data-dictionary.md`](docs/data-dictionary.md) | Champs de formulaire et structures de données (`snake_case`) |
| [`app-spec.md`](docs/app-spec.md) | Périmètre, audience, les 9 pages |
| [`feature-backlog.md`](docs/feature-backlog.md) | Périmètre v1 + idées v2 (PrestaShop, paiements) |
| [`integrations.md`](docs/integrations.md) | Services externes par phase |
| [`errors-log.md`](docs/errors-log.md) | Journal des erreurs |

## Qualité

QA responsive automatisé (Playwright headless) : **0 débordement** sur 11 pages × 7 largeurs (320 → 1440 px).

## Charte (extrait)

| | |
|---|---|
| Or Maât | `#D4AF37` |
| Bleu académique | `#1E3A8A` |
| Bleu nuit | `#1a252f` |
| Blanc cassé | `#F9FAFB` |
| Gris texte | `#374151` |

## À fournir par le chercheur indépendant

PDF des ressources (Working Paper, guides, extraits), définitions complètes des 9 concepts, texte développé de la Note épistémologique, mentions légales et politique de confidentialité.

---

© 2026 Gaudéric MAMBOU — Recherche indépendante. Brazzaville, République du Congo.

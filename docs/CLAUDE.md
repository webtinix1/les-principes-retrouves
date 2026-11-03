# CLAUDE.md — Manuel d'instructions pour Claude Code

> Document de référence permanent. Claude Code doit consulter ce fichier au début de **chaque** session de travail sur ce projet.

---

## 1. Le projet en une phrase

Site web académique officiel **« Les Principes Retrouvés »** de Gaudéric MAMBOU : une vitrine sobre, de niveau « revue de recherche », présentant une œuvre d'épistémologie et de droit constitutionnel, et donnant accès à des documents de travail téléchargeables.

## 2. Statut actuel

- **V1 = MAQUETTE statique** (dans `site/`) — conservée comme **référence** jusqu'au jalon J1.
- **V2 = MIGRATION VERS NEXT.JS EN COURS** (dans `web/`), sur la base du
  `docs/update/DOCUMENT DE SYNTHÈSE FINAL.pdf`. Le document transforme la vitrine en **portail
  applicatif** (10 pages, ~26 150 mots, accès hybride 3 niveaux, paiement CinetPay, PDF protégés).
- **⚠️ Le plan « thème PrestaShop » est ABANDONNÉ** au profit de Next.js. Voir le cadrage et la
  roadmap : `docs/update/CADRAGE-V2.md` et `docs/update/ROADMAP.md`.
- Décision validée client le 2026-07-08. Périmètre commerce (déblocage par code vs vraie
  boutique) tranché avant le Lot 4.

## 3. Stack technique (décision V2 — 2026-07-08)

- **Next.js (App Router) + TypeScript + Tailwind v4 + shadcn/ui** (projet dans `web/`).
- **Gestionnaire de paquets : yarn.**
- **Polices auto-hébergées via `next/font`** (Playfair Display, Lora, Fira Code, Inter) — zéro
  requête CDN (perf + RGPD).
- **Back-office : Payload CMS 3** monté dans l'application Next.js (`/admin`, API REST
  `/api`), configuration `web/payload.config.ts` + dossier `web/payload/` (2026-11-03,
  remplace l'ancien back-office maison + Prisma/SQLite).
- **Base de données : PostgreSQL** (dev : base locale ; prod : service `db` du compose).
  Schéma versionné dans `web/migrations/` — après toute modification d'une collection ou
  d'un champ : `yarn migrate:create <nom>` puis committer la migration.
- **Contenu** : textes des pages = globals « Pages » (registre `web/content/blocs/`),
  listes (modules, concepts, autorités, ressources) = collections. Le JSX reste le texte
  d'origine (`content/blocs/origine.json`) : un bloc non modifié est rendu à l'identique.
- **Déploiement : Docker (sortie `standalone`) derrière Traefik** — `web/Dockerfile` +
  `docker-compose.yml`, piloté par `.env` (mêmes conventions que le site statique).
- Pages de contenu **prérendues (SSG/ISR)** pour le SEO ; couche applicative (auth, paiement,
  téléchargements protégés, formulaire) via **route handlers** `app/api/`.
- **Ancienne stack (archivée)** : la maquette `site/` reste en HTML/CSS/JS vanilla statique
  (nginx) jusqu'au basculement.

## 4. Règles d'or (NON négociables)

1. **Avant de nommer un champ, une variable de données, une clé JSON ou un « type » de contenu : consulter `data-dictionary.md`.** Si le nom n'existe pas, l'y ajouter d'abord, puis l'utiliser. Aucune création de nom de donnée « à la volée ».
2. **Toute la nomenclature de données est en `snake_case`** (clés JSON, attributs `data-*`, noms de fichiers de données, champs de formulaire).
3. **Avant toute décision visuelle (couleur, police, espacement, logo, animation) : consulter `brand-brief.md`.** Ne jamais inventer une couleur hors palette.
4. **Ton éditorial = clinique, objectif, impersonnel, souverain.** Jamais de marketing agressif, de triomphalisme, de « nous sommes ravis », d'emojis dans le contenu publié, ni de justification biographique. Le site est une architecture intellectuelle, pas une vitrine personnelle. Référence : revues Cairn / HAL / droit comparé.
   - **Règle lexicale (DMU)** : dans les textes théoriques, **bannir le mot « l'auteur »**. Utiliser « la présente recherche », « ce travail », « le chercheur indépendant ». (La mention de copyright « © Gaudéric MAMBOU » dans le footer reste autorisée : c'est une attribution légale, pas un texte théorique.)
5. **Mobile-first.** 60 % du trafic attendu vient du mobile (Afrique). Concevoir et tester d'abord en petit écran.
6. **Sobriété et espace blanc.** Le blanc cassé (`--blanc-casse`) et la rigueur typographique sont prioritaires. En cas de doute, retirer plutôt qu'ajouter.
7. **Ne pas ajouter de fonctionnalité hors périmètre v1** (paiement en ligne, comptes utilisateurs, espace membre) sans validation explicite. Voir `feature-backlog.md`.

## 5. Structure de dossiers cible

```text
GARD_SAISINE/
├── docs/                         # Les 7 documents fondateurs
└── site/                         # TOUT le code de la maquette
    ├── index.html                # Accueil
    ├── manifeste.html
    ├── epistemologie.html        # Note Épistémologique
    ├── ouvrage.html              # L'Ouvrage (Tomes I & II)
    ├── laboratoire.html          # Laboratoire Doctrinal
    ├── concepts.html             # Concepts Stabilisés
    ├── formation.html
    ├── extraits.html             # Extraits (Freemium)
    ├── blog.html                 # Blog : liste des articles + filtres
    ├── article.html              # Gabarit d'article (rendu via ?slug=)
    ├── contact.html
    ├── assets/
    │   ├── css/
    │   │   └── style.css         # CSS global unique (variables :root)
    │   ├── js/
    │   │   ├── partials.js       # Templates header + footer (injectés sans fetch)
    │   │   ├── articles.js       # Données du blog (ARTICLES) — sans fetch
    │   │   └── main.js           # Partials, nav, form, carrousel, blog, article
    │   ├── img/                  # Images optimisées (WebP) + logo SVG
    │   └── pdf/                  # Working Paper, guides (placeholders en v1)
    ├── data/                     # Données de contenu en JSON (concepts, modules…)
    ├── sitemap.xml
    └── robots.txt
```

### Header / footer — décision arrêtée

Le header et le footer sont **identiques sur les 8 pages**. Ils sont définis **une seule fois** dans `assets/js/partials.js` (sous forme de templates JS) et injectés par `main.js` dans `<header id="site-header">` / `<footer id="site-footer">`.

> **Pourquoi pas `fetch()` ?** Charger un partial HTML par `fetch()` échoue sous le protocole `file://` (politique de sécurité navigateur), donc la maquette serait cassée en double-clic. Les templates JS fonctionnent en `file://` comme sur serveur.
>
> **Portabilité PrestaShop** : ces deux partials correspondront directement aux fichiers `header.tpl` / `footer.tpl` du futur thème PrestaShop. Construire en gardant cette correspondance à l'esprit.

## 6. Conventions de code

- **Fichiers HTML** : un fichier par page, nommés en minuscules (voir arborescence du cahier des charges).
- **Classes CSS** : `kebab-case`, méthodologie type BEM légère (`.bloc__element--modificateur`) quand utile.
- **Données / JS / formulaires** : `snake_case` (cf. règle d'or n°2).
- **Couleurs / polices / tailles** : uniquement via variables CSS définies dans `:root` (voir `brand-brief.md`). Aucune valeur hexadécimale en dur ailleurs.
- **Accessibilité** : HTML sémantique (`<header> <nav> <main> <article> <footer>`), attributs `alt`, contraste suffisant, navigation clavier.
- **Commentaires** : sobres, en français, seulement là où l'intention n'est pas évidente.

## 7. Exigences livraison (rappel du cahier des charges)

- Responsive testé mobile / tablette / desktop.
- Google Fonts intégrées (Playfair Display, Lora, Inter, Fira Code).
- Logo en **SVG**, images en **WebP**.
- Formulaire de contact avec **captcha anti-spam** (back-end branché en v2 ; en v1 maquette, le formulaire est présent et validé côté client).
- `sitemap.xml` + `robots.txt` générés.
- Hébergement **HTTPS/SSL** (au déploiement).

## 8. SEO (rappel)

- Title Accueil : `Les Principes Retrouvés | Gaudéric MAMBOU | Épistémologie et Droit Constitutionnel`
- Meta description et mots-clés : voir `app-spec.md` / cahier des charges, section SEO.
- Une balise `<title>` et `<meta name="description">` propre par page.

## 9. Workflow attendu de Claude Code

1. Lire ce fichier + le document maître si besoin de contexte.
2. Pour toute nouvelle page/section : vérifier le contenu validé dans le document maître, puis `brand-brief.md` (style) et `data-dictionary.md` (si données).
3. Si une erreur ou un point de blocage survient : le consigner dans `errors-log.md`.
4. Là où le contenu réel manque, insérer un **placeholder clairement marqué** (`<!-- PLACEHOLDER: ... -->`) plutôt qu'inventer du texte doctrinal.
5. Ne jamais inventer de citation juridique, de jurisprudence ou de texte doctrinal : ce contenu vient de l'auteur.

---

*Fichiers liés : `data-dictionary.md`, `brand-brief.md`, `app-spec.md`, `feature-backlog.md`, `integrations.md`, `errors-log.md`.*

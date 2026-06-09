# CLAUDE.md — Manuel d'instructions pour Claude Code

> Document de référence permanent. Claude Code doit consulter ce fichier au début de **chaque** session de travail sur ce projet.

---

## 1. Le projet en une phrase

Site web académique officiel **« Les Principes Retrouvés »** de Gaudéric MAMBOU : une vitrine sobre, de niveau « revue de recherche », présentant une œuvre d'épistémologie et de droit constitutionnel, et donnant accès à des documents de travail téléchargeables.

## 2. Statut actuel

- **Version 1 = MAQUETTE** destinée à être **validée par le client** (Gaudéric MAMBOU) avant tout déploiement.
- Objectif de la v1 : démontrer le rendu visuel, la structure et le ton. Pas de fonctionnalités back-end actives.
- On part **de zéro** (aucune infra créée : ni GitHub, ni hébergement, ni domaine).
- **Cible v2 (après validation) : conversion en THÈME PRESTASHOP.** La maquette est un prototype HTML/CSS/JS statique, mais doit être **construite pour être portable vers PrestaShop** (templates Smarty + partials, modules de paiement Stripe / CinetPay branchés plus tard). Voir `feature-backlog.md` et `integrations.md`.
- Tout le code de la maquette vit dans le dossier **`site/`** (les docs restent à la racine, dans `docs/`).

## 3. Stack technique (décision arrêtée)

- **HTML5 / CSS3 / JavaScript vanilla statique.** Pas de framework (pas de React/Next.js/Vue), pas d'étape de build, pas de gestionnaire de paquets requis.
- Le site doit pouvoir s'ouvrir en double-cliquant sur `index.html` et être déployé sur n'importe quel hébergement statique (Vercel, Netlify, GitHub Pages, OVH…).
- Polices via **Google Fonts** (CDN) : Playfair Display, Lora, Inter, Fira Code.
- Pas de dépendance lourde. Si une micro-librairie est indispensable (ex. captcha), elle est chargée par CDN et documentée dans `integrations.md`.

## 4. Règles d'or (NON négociables)

1. **Avant de nommer un champ, une variable de données, une clé JSON ou un « type » de contenu : consulter `data-dictionary.md`.** Si le nom n'existe pas, l'y ajouter d'abord, puis l'utiliser. Aucune création de nom de donnée « à la volée ».
2. **Toute la nomenclature de données est en `snake_case`** (clés JSON, attributs `data-*`, noms de fichiers de données, champs de formulaire).
3. **Avant toute décision visuelle (couleur, police, espacement, logo, animation) : consulter `brand-brief.md`.** Ne jamais inventer une couleur hors palette.
4. **Ton éditorial = clinique, objectif, impersonnel, souverain.** Jamais de marketing agressif, de triomphalisme, de « nous sommes ravis », d'emojis dans le contenu publié, ni de justification biographique. Le site est une architecture intellectuelle, pas une vitrine personnelle. Référence : revues Cairn / HAL / droit comparé.
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
    ├── contact.html
    ├── assets/
    │   ├── css/
    │   │   └── style.css         # CSS global unique (variables :root)
    │   ├── js/
    │   │   ├── partials.js       # Templates header + footer (injectés sans fetch)
    │   │   └── main.js           # Injection partials, nav mobile, validation form
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

# Les Principes Retrouvés — Maquette v1

Maquette statique (HTML / CSS / JS vanilla) du site académique de Gaudéric MAMBOU,
destinée à validation client avant conversion en thème PrestaShop (v2).

## Lancer la maquette

- **Le plus simple** : double-cliquer sur `index.html` (le header/footer s'injectent via JS, sans `fetch`, donc cela fonctionne en `file://`).
- **Recommandé** (rendu identique au déploiement) : servir le dossier avec un serveur local.
  - VS Code : extension **Live Server** → clic droit sur `index.html` → « Open with Live Server ».
  - Python : `python -m http.server` dans ce dossier, puis ouvrir `http://localhost:8000`.

## Structure

- 8 pages principales + 2 pages légales (placeholders).
- `assets/css/style.css` : design system unique (variables `:root` = charte graphique).
- `assets/js/partials.js` : header + footer (source unique) → futurs `header.tpl` / `footer.tpl` PrestaShop.
- `assets/js/main.js` : injection des partials, menu mobile, validation du formulaire.
- `assets/img/logo-maat.svg` : logo (animation des ailes au survol).

## À fournir par l'auteur (placeholders en place)

- PDF du Laboratoire doctrinal (Working Paper, guide, note).
- Définitions complètes des 9 concepts + formulations canoniques.
- Texte développé de la Note épistémologique.
- Mentions légales et politique de confidentialité.

## Documentation projet

Voir le dossier `../docs/` (CLAUDE.md, brand-brief.md, data-dictionary.md, app-spec.md,
feature-backlog.md, integrations.md, errors-log.md).

# feature-backlog.md — Périmètre v1 & parking à idées

---

## A. Périmètre VERSION 1 (la maquette à valider par le client)

> Objectif v1 : une maquette statique fidèle, navigable, à valider par l'auteur **avant** déploiement. Tout doit être visuellement complet ; le back-end n'est pas branché.

### Socle technique
- [ ] Structure HTML/CSS/JS statique (8 pages + assets).
- [ ] CSS global unique avec variables `:root` (palette de `brand-brief.md`).
- [ ] Header + footer unifiés et cohérents sur les 8 pages.
- [ ] Intégration Google Fonts (Playfair Display, Lora, Inter, Fira Code).
- [ ] Responsive mobile-first (mobile / tablette / desktop).
- [ ] Logo « Plume de Maât » en SVG + animation hover (déploiement des ailes, 0.4s).

### Pages
- [ ] **Accueil** — Hero (logo, H1, sous-titre, accroche matricielle, formule d'ouverture 3 lignes), 3 CTA, sections de présentation.
- [ ] **Manifeste** — 4 sections doctrinales + citation canonique.
- [ ] **Note Épistémologique** — tableau des découvertes (Neptune/Le Verrier, Colomb, Claude Bernard) + encadré de cloisonnement disciplinaire.
- [ ] **L'Ouvrage** — 2 cartes (Tome I / Tome II) + quatrièmes de couverture validées.
- [ ] **Laboratoire Doctrinal** — liste de ressources avec boutons de téléchargement (PDF en placeholder).
- [ ] **Concepts Stabilisés** — grille de 9 cartes.
- [ ] **Formation** — 3 modules + CTA « Demander un devis institutionnel ».
- [ ] **Extraits (Freemium)** — section accès gratuit (3 PDF) + chapitres verrouillés (🔒) + encadré CTA. **Visuel uniquement** : le gating réel (capture email, envoi du lead magnet) est en v2.
- [ ] **Blog + articles** — liste (`blog.html`) avec filtres par catégorie + gabarit de lecture (`article.html?slug=`), alimentés par `ARTICLES` (4 articles rédigés). Système statique data-driven ; en v2 → billets gérés au back-office PrestaShop.
- [ ] **Accueil** — carrousel d'ouverture (3 slides) + sections : pyramide, 4 entrées, aperçu des tomes, dernières publications, teaser formation, citation.
- [ ] **Contact** — formulaire complet (validation côté client) + placeholder captcha.

### Données de contenu
- [ ] Fichiers `/data/*.json` (concepts, tomes, formation_modules, resources, nav_pages) — voir `data-dictionary.md`.
- [ ] Insertion des textes validés du document maître.
- [ ] Placeholders propres `<!-- PLACEHOLDER -->` là où le contenu réel manque.

### Conformité / SEO de base
- [ ] `<title>` + meta description par page.
- [ ] `sitemap.xml` + `robots.txt`.
- [ ] HTML sémantique + accessibilité de base (alt, contraste, clavier).
- [ ] Pages « Mentions légales » et « Politique de confidentialité » (au moins en placeholder structuré).

### Explicitement EXCLU de la v1 (présenté mais non fonctionnel)
- Paiement en ligne (Stripe / CinetPay).
- Comptes utilisateurs / espace membre.
- Accès freemium « gated » (3 chapitres).
- Back-end réel du formulaire (envoi d'email / stockage).
- Traduction anglaise.
- CMS / édition autonome par le client.

---

## B. Parking à idées (v2 et au-delà)

> Rien ici n'est engagé. À prioriser après validation de la maquette.

### Plateforme : conversion en thème PrestaShop (chantier v2 principal)
- Transformer la maquette validée en **thème PrestaShop** (templates Smarty).
- Partials JS `header`/`footer` → `header.tpl` / `footer.tpl`.
- Pages éditoriales (Manifeste, Note Épistémo, Concepts, Ouvrage…) → **pages CMS**.
- Modules de formation → **produits** PrestaShop (pour la vente).
- Brancher les **modules de paiement** (voir ci-dessous + `integrations.md`).
- Avantage : intégration modulaire, back-office, facturation, sans coder de back-end sur mesure.

### Monétisation
- **Paiement des formations** : Stripe (international) + CinetPay (Afrique / mobile money). Nécessite back-end, base de données commandes, CGV (droit OHADA + international), contrats de formation par module.
- **Vente des ouvrages** (Tomes I & II) en direct si souhaité.

### Contenu gated / communauté
- **Espace freemium** : 3 chapitres gratuits contre inscription → authentification + base utilisateurs.
- Espace « pairs » / réseau académique.

### Internationalisation
- Version **anglaise** (Working Paper FR + EN est déjà prévu dans le document maître).
- Sélecteur de langue.

### Fonctionnel
- **Back-end formulaire** : envoi d'email transactionnel + anti-spam serveur (voir `integrations.md`).
- Moteur de recherche interne (concepts, ressources).
- Fil d'actualité / publications (working papers additionnels, tribunes).
- Citation académique exportable (BibTeX, RIS) sur les pages ressources/ouvrage.
- Analytics respectueux de la vie privée (Plausible / Matomo).
- Newsletter doctrinale.

### Évolutions éditoriales (mentionnées dans le document maître)
- Tome III (théorie universelle appliquée à toutes les sciences).
- Section « Colloques / Événements ».
- Annexes publiques (table jurisprudentielle, bibliographie sélective).

---

## C. Hypothèses & questions ouvertes à trancher avec le client

- [ ] Domaine définitif (`lesprincipesretrouves.com` ?) — non acheté à ce jour.
- [ ] Hébergeur cible (Vercel / Netlify / OVH ?).
- [ ] Les PDF (Working Paper, guides) seront-ils fournis avant ou après validation maquette ?
- [ ] Header : duplication du markup ou injection JS d'un partial ? (défaut proposé : injection JS).
- [ ] Adresse email de réception du formulaire de contact.
- [ ] La page « Note Épistémologique » : confirmer les 3 exemples scientifiques et le contenu du tableau.

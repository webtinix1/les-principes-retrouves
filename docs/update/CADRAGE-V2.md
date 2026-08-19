# Cadrage V2 — Portail de l'École de Brazzaville

> Document de cadrage **préalable au développement**, établi après lecture intégrale du
> `DOCUMENT DE SYNTHÈSE FINAL.pdf` (82 pages) et audit du code existant (`site/`).
> Objet : mesurer l'écart, trancher la **stack technique** (migration Vite / Next.js / autre),
> et proposer un plan de lotissement. **Aucune ligne n'est encore codée ; rien n'est engagé.**
>
> Statut : *proposition à valider*. Date : 2026-07-08.

---

## 0. Décisions actées (2026-07-08)

- **Stack V2 : Next.js (App Router).** Retenu pour couvrir perf + SEO + shadcn dans un seul
  codebase et absorber la couche applicative (auth, paiement, PDF protégés). **Abandon du plan
  PrestaShop** — `CLAUDE.md §3` et `integrations.md §4-5` seront mis à jour en conséquence.
- **Périmètre transactionnel : ARBITRÉ (2026-07-08).** Modèle **« déblocage par code, sans compte »** :
  - **Pas de comptes clients** (amélioration possible plus tard). Paiement invité → code d'accès.
  - **Conservation des infos acheteur** dans une table `Commande` = historique (base d'un futur compte).
  - **Back-office nécessaire** (`/admin`), périmètre **transactionnel** : commandes, codes d'accès,
    messages de contact, disponibilité des PDF, export CSV. Modules/tarifs restent gérés **dans le code**.
  - **Auth admin : Traefik basic-auth** (protection au niveau infra, zéro code d'auth, un seul admin).
  - **Base de données : SQLite (volume persistant) conservé** pour l'instant ; Postgres si besoin ultérieur.
- **PDF intégraux & compte marchand CinetPay : fournis plus tard.** On construit toute la
  plomberie autour de **placeholders** (voir §4bis) pour ne rien bloquer et brancher le réel en une étape.
- **Base de données : Prisma + PostgreSQL** (conteneur Docker, cohérent avec l'infra Traefik) ;
  SQLite en dev possible. Détail et justification en §4ter.

> 📋 **Le suivi opérationnel des travaux est dans `ROADMAP.md`** (dérivé de ce cadrage, lot par lot,
> avec cases à cocher et les 3 référentiels d'ingénierie/design adoptés).

---

## 1. Constat central : le document change la NATURE du projet

La maquette actuelle (`site/`) a été conçue comme une **vitrine statique** destinée à être
validée puis convertie en **thème PrestaShop** (décision arrêtée dans `CLAUDE.md` §2 et §3).

Le `DOCUMENT DE SYNTHÈSE FINAL` va nettement plus loin. Il ne décrit plus une vitrine, mais un
**portail académique avec logique applicative** :

| Nouveauté introduite par le document | Implication |
|---|---|
| **10 pages canoniques** (au lieu de 8), dans un ordre cognitif précis | Refonte de l'arborescence + nouvelle home « Le Seuil » |
| **~26 150 mots** de contenu doctrinal rédigé, prêt à intégrer | Volume de contenu ×5 à ×8 vs actuel |
| **Système d'accès hybride à 3 niveaux** (libre / conditionné / premium) | Authentification + gating réel (plus une maquette) |
| **Paiement CinetPay** natif (Mobile Money + CB, EUR + XAF) | Back-end paiement + réconciliation |
| **Vente de 3 modules de formation** (350 € à 20 000 €) | Logique e-commerce / commande |
| **Téléchargements PDF protégés** (code d'accès après achat) | Auth + fichiers protégés + génération de codes |
| **Pyramide de Σ en SVG animé interactif** (tooltips, pulsation, flux) | Composant interactif fourni clé en main dans le doc |
| **Formulaire de contact + captcha** réellement fonctionnels | Back-end mail |

**Conséquence :** les besoins fonctionnels (auth, paiement, gating, téléchargements protégés,
formulaire) sont désormais **au cœur du produit**, plus en « v2 lointaine ». C'est ce qui
justifie de rouvrir la décision de stack — d'où votre question Vite / Next.js.

---

## 2. Cible fonctionnelle (synthèse du document)

### 2.1 Les 10 pages (ordre cognitif imposé)

| # | Page | Rôle | Volume |
|---|---|---|---|
| 1 | **Le Seuil** (accueil / Fronton) | Rupture cognitive, pyramide Σ animée | ~1 400 mots |
| 2 | L'Institution | Présentation de l'École (7 niveaux) | ~2 000 |
| 3 | La Constitution Scientifique | Acte constitutif (10 articles) | ~2 800 |
| 4 | Le Manifeste | Diagnostic de la crise (7 articles) | ~1 600 |
| 5 | Note Épistémologique | Fondations (Canon 7 principes) | ~1 850 |
| 6 | L'Ouvrage | Diptyque Tome I / Tome II + liminaires | ~1 800 |
| 7 | Laboratoire Doctrinal | 3 Working Papers + 2 pièces opératoires | ~2 800 |
| 8 | Concepts Stabilisés | 20 concepts en 4 strates | ~6 500 |
| 9 | Transmission & Inscriptions | 3 modules + paiement CinetPay | ~3 200 |
| 10 | Déclaration de Brazzaville | Manifeste public solennel | ~2 200 |

### 2.2 Système d'accès hybride (Pages 7 & 9 couplées)

- **Niveau 1 — Libre** : résumés exécutifs, présentations, extraits. Aucun compte.
- **Niveau 2 — Conditionné** : documents intégraux (WP-01/02/03, Guide Technique, Arrêt Pilote)
  débloqués par validation d'un module de formation.
- **Niveau 3 — Premium** : modèles personnalisés, conseil stratégique (Module III).
- **Boucle vertueuse** : l'achat d'un module génère un **code d'accès** qui débloque les
  téléchargements PDF correspondants. Vérification automatique après paiement CinetPay.

### 2.3 Paiement (CinetPay)

- Moyens : Mobile Money (MTN, Airtel, Orange, Moov — zone CEMAC/Afrique) + CB Visa/Mastercard.
- Devises : EUR et XAF (Franc CFA), conversion au taux officiel.
- Tarifs : Module I 800/350 € · Module II 1 500/650 € · Module III sur devis (5 000–20 000 €).

### 2.4 Système typographique & chromatique (déjà spécifié, à respecter au pixel)

- Polices : Playfair Display (titres), Lora (corps), Fira Code (équations), Inter (UI).
- Palette : Bleu Nuit profond `#111827`, Bleu Académique `#1E3A8A`, Bleu Nuit `#1A252F`,
  Or Maât `#D4AF37`, Blanc `#FFFFFF`, Blanc Cassé `#F9FAFB`, Gris Clair `#F4F4F5`.
- Le document fournit **le CSS des animations et le SVG complet de la pyramide** → réutilisables tels quels.

---

## 3. État actuel & écart technique

**Ce qui existe (`site/`)** — bonne base, honnête :
- HTML/CSS/JS vanilla, ~1 000 lignes HTML, CSS unique à variables `:root`, mobile-first.
- Header/footer injectés en JS (`partials.js`), carrousel Swiper, animations AOS, blog data-driven.
- SEO de base : `<title>` / meta par page, `sitemap.xml`, `robots.txt`.

**Limites au regard de la cible :**
1. **Rendu partiel côté JS** : header, footer et nav sont injectés via `innerHTML` au runtime.
   Acceptable pour une vitrine, sous-optimal pour le SEO et le premier rendu (public 60 % mobile Afrique).
2. **Aucune couche applicative** : pas d'auth, pas de paiement, pas de gating réel, pas de back-end formulaire.
3. **Contenu** : la maquette contient une fraction des ~26 000 mots désormais rédigés.
4. **Dépendances CDN lourdes** (Swiper + AOS) pour un rendu qui pourrait être plus léger.
5. **Pas d'étape de build** → pas de minification, pas de découpage, pas de composants réutilisables
   (les 20 concepts, les cartes, les modules sont du copier-coller HTML aujourd'hui).

---

## 4. Décision structurante : la stack technique

C'est le cœur du cadrage. Vos objectifs déclarés : **performance, SEO, accès à shadcn/ui**.
À quoi s'ajoutent les **besoins fonctionnels réels** (auth, paiement, gating, back-end).

### 4.1 Comparatif honnête des options

| Critère | Vanilla actuel + PrestaShop | **Vite (React SPA)** | **Next.js (App Router)** | **Astro** |
|---|---|---|---|---|
| SEO (site de 26k mots) | Correct | ❌ **Mauvais** (rendu client) | ✅ Excellent (SSG/SSR) | ✅ **Excellent** (HTML statique) |
| Perf mobile Afrique (bande passante faible) | Bon si allégé | Moyen (gros bundle JS) | Très bon (SSG + streaming) | ✅ **Meilleur** (0 JS par défaut) |
| shadcn/ui disponible | ❌ Non | ✅ Oui | ✅ **Natif** | ✅ Oui (îlots React) |
| Back-end intégré (auth, paiement, PDF protégés) | Via modules PrestaShop | ❌ Non (back séparé requis) | ✅ **Oui** (route handlers) | ✅ Oui (endpoints SSR) |
| Adéquation au design « monumental » sur mesure | ⚠️ PrestaShop bride le design | ✅ Total | ✅ Total | ✅ Total |
| Coût du back-end commerce | Faible (modules prêts) | Élevé (à coder) | Moyen (à coder) | Moyen (à coder) |
| Déploiement sur l'infra actuelle (Docker + Traefik) | ✅ | ✅ | ✅ (Node ou static export) | ✅ (static ou SSR) |
| Composantisation (20 concepts, cartes, modules) | ❌ | ✅ | ✅ | ✅ |

### 4.2 Écarter clairement

- **Vite / React SPA seul** : à **écarter comme socle du site**. Un SPA rendu côté client est
  contraire à l'objectif SEO d'un site de contenu de 26 000 mots, et pénalise le premier rendu
  sur mobile bas débit. Vite reste excellent *à l'intérieur* de Next.js/Astro pour des îlots
  interactifs — mais pas comme fondation.
- **PrestaShop** : donne le commerce « gratuitement » mais **combat** le design sur mesure
  attendu (Fronton, pyramide Σ, mise en page lapidaire), n'offre pas shadcn, DX datée, poids
  serveur. Reste défendable **uniquement si** le besoin dominant devient une vraie boutique
  multi-produits avec back-office. Ce n'est pas ce que décrit le document.

### 4.3 Recommandation

**Recommandation principale : Next.js (App Router).**

Motifs :
1. **Coche vos 3 objectifs à la fois** : perf (SSG/ISR + streaming), SEO (rendu serveur), shadcn (natif).
2. **Absorbe la couche applicative** introduite par le document — auth, webhooks CinetPay,
   téléchargements protégés, formulaire — via *route handlers*, **dans un seul codebase déployable**
   sur votre Docker/Traefik existant. Cela **remplace** le plan PrestaShop.
3. **Composantisation** : les 20 concepts, les cartes d'autorités, les 3 modules deviennent des
   composants + données typées, au lieu de HTML dupliqué.

**Alternative sérieuse : Astro.** Si l'on veut **maximiser perf/SEO** (le meilleur des quatre sur
mobile bas débit, 0 JS par défaut) et que la surface applicative reste contenue (paiement +
gating simples), Astro est un choix techniquement supérieur pour un site « contenu d'abord +
quelques îlots interactifs ». Il supporte shadcn via des composants React en îlots et sait faire
du SSR/endpoints quand il faut. Le compromis : un peu moins « framework applicatif tout-en-un »
que Next.js.

> **Ma préconisation nette** : **Next.js** si la partie commerce/gating/auth va s'étoffer
> (c'est la trajectoire du document) ; **Astro** si l'on veut d'abord un monument éditorial ultra-rapide
> et qu'on garde le paiement volontairement minimal. Les deux sont d'excellents choix ;
> **Vite-seul et PrestaShop sont à écarter** pour ce projet.

### 4.4 Ce que la migration implique (à assumer)

- Le `.pdf` fournit **déjà** le CSS des animations et le SVG de la pyramide → réutilisables directement.
- La palette, la typo et une partie du HTML existant se transposent en composants (peu de perte).
- **Nouveau à construire** (quel que soit Next.js ou Astro) : intégration CinetPay, système de
  codes d'accès, stockage des commandes, protection des PDF, back-end formulaire + captcha,
  et les mentions légales / CGV (droit OHADA + international) qu'exige la vente de formations.
- **Décision documentaire** : cette migration **contredit `CLAUDE.md` §3** (« pas de framework »)
  et le plan PrestaShop. Si validée, il faudra **mettre à jour `CLAUDE.md`, `integrations.md` et
  `feature-backlog.md`** en conséquence.

---

## 4bis. Contenu & intégrations différées (stratégie de placeholders)

Deux éléments seront **renseignés plus tard par le client**. On les anticipe sans se bloquer :

| Élément différé | Placeholder construit maintenant | Branchement du réel |
|---|---|---|
| **PDF intégraux** (WP-01/02/03, Guide, Arrêt) | Métadonnées saisies (`content/resources.json`) + `pdf/placeholder.pdf` + flag `is_available:false` → la route de téléchargement répond « bientôt disponible » | Déposer les vrais PDF, passer `is_available:true` |
| **Compte marchand CinetPay** | Abstraction `PaymentProvider` + `MockProvider` (paiement simulé → émet un code d'accès) ; tunnel complet testable sans clés | Implémenter `CinetPayProvider` + `.env` serveur |

Autres éléments en attente : domaine `lesprincipesretrouves.cg`, boîte mail de réception,
CGV/contrats (OHADA), textes doctrinaux manquants (`<!-- PLACEHOLDER -->`).

## 4ter. Base de données & persistance

- **ORM : Prisma** (schéma typé, migrations, portable SQLite→Postgres).
- **Cible : PostgreSQL** en conteneur Docker — cohérent avec l'infra existante (Docker + Traefik,
  patron du service Dolibarr de référence). Choix robuste dès qu'il y a paiement + codes d'accès.
- **Option légère : SQLite** — ok en dev / si volume minime, **non recommandé en prod** pour des
  données de paiement. Prisma permet de démarrer SQLite puis basculer Postgres sans réécrire le métier.
- **Modèles initiaux** : `Order`, `AccessCode`, `Enrollment`, `ContactMessage` (champs en `snake_case`).
- **Quand ?** La DB n'intervient qu'au **Lot 3+** ; les Lots 0-2 (site public) n'en dépendent pas.

## 4quater. Standards d'ingénierie & design adoptés

Trois référentiels servent de règles de qualité tout au long du projet (détail dans `ROADMAP.md`) :

1. **Vercel React Best Practices** — perf : pas de waterfalls, Server Components par défaut, bundle minimal.
2. **Frontend Design** (Anthropic) — identité distinctive (la palette/typo du document), Hero = thèse
   (pyramide Σ), typographie comme composant, animation orchestrée.
3. **Web Design Guidelines** (Vercel) — audit a11y/UX en `file:line`, contraste, clavier, sémantique.

Objectifs mesurables : Lighthouse mobile ≥ 90 (Perf/SEO/A11y), LCP < 2,5 s en 3G, JS initial ~0 sur le contenu.

## 5. Architecture cible proposée (Next.js)

```text
app/
├── (site)/                    # Pages de contenu (SSG/ISR) — SEO maximal
│   ├── page.tsx               # 1. Le Seuil (Fronton + pyramide Σ)
│   ├── institution/
│   ├── constitution/
│   ├── manifeste/
│   ├── note-epistemologique/
│   ├── ouvrage/
│   ├── laboratoire/
│   ├── concepts/
│   ├── transmission/          # 9. Modules + paiement
│   └── declaration/
├── api/                       # Route handlers (couche applicative)
│   ├── checkout/              # Création paiement CinetPay
│   ├── webhook/cinetpay/      # Réconciliation + génération code d'accès
│   ├── download/[ressource]/  # Téléchargement PDF protégé (vérif. accès)
│   └── contact/               # Formulaire + captcha (Turnstile)
components/                    # shadcn/ui + composants métier (CarteConcept, Pyramide…)
content/                       # Contenu doctrinal en MDX/JSON (snake_case conservé)
lib/                           # auth, accès, cinetpay, données
```

- **Pages de contenu** : pré-rendues (statique) → rapides et parfaites pour le SEO.
- **Données structurées** (20 concepts, autorités, modules) : en fichiers `content/*.json`
  ou MDX, **en conservant la nomenclature `snake_case`** (règle d'or n°2 de `CLAUDE.md`).
- **Pyramide Σ** : composant React (le SVG + les `@keyframes` du document, avec tooltips).

---

## 6. Plan de lotissement proposé (roadmap)

> Chaque lot est livrable et validable séparément.

- **Lot 0 — Décisions & socle** : trancher la stack (§9), initialiser le projet, porter la
  palette/typo/tokens, poser shadcn, mettre à jour la doc (`CLAUDE.md` & co).
- **Lot 1 — Design system & composants** : header/footer, boutons CTA, cartes, encadrés,
  **pyramide Σ animée**, grilles responsive (3 breakpoints du document).
- **Lot 2 — Contenu statique (10 pages)** : intégration des ~26 000 mots + SEO par page
  (title/meta/OG, `sitemap.xml`, données structurées). *Site public complet, sans paiement.*
- **Lot 3 — Formulaire & captcha** : back-end contact (service mail + Turnstile).
- **Lot 4 — Formation & paiement CinetPay** : pages modules, tunnel de paiement,
  webhook de réconciliation, génération des codes d'accès.
- **Lot 5 — Accès hybride & PDF protégés** : gating 3 niveaux, téléchargements sécurisés,
  boucle vertueuse Page 7 ↔ Page 9.
- **Lot 6 — Conformité & mise en ligne** : mentions légales, CGV (OHADA + international),
  RGPD, déploiement Docker/Traefik + HTTPS, recette mobile/tablette/desktop.

**Jalon de validation client recommandé** : à la fin du **Lot 2** (le monument éditorial complet,
navigable et rapide), avant d'engager la couche transactionnelle (Lots 4-5).

---

## 7. Décisions à trancher avec le client / points ouverts

1. **Stack** : Next.js (recommandé) vs Astro vs maintien vanilla+PrestaShop. → confirme le reste.
2. **Abandon de PrestaShop** : confirmé ou non ? (impacte `CLAUDE.md`, `integrations.md`).
3. **Périmètre transactionnel réel** : simple débocage de PDF par code, ou vraie boutique
   (factures, comptes, historique) ? → arbitre Next.js vs Astro.
4. **CinetPay** : compte marchand disponible ? Sinon, phase 2 avec liens de paiement en attendant.
5. **Contenu** : les PDF intégraux (WP, guides, arrêt) sont-ils fournis, ou placeholders au départ ?
6. **Domaine & mails** : `lesprincipesretrouves.cg` (indiqué dans le doc) — acquis ? Boîte de réception ?
7. **Juridique** : qui fournit les CGV / contrats de formation (droit OHADA) requis par la vente ?
8. **i18n** : version anglaise prévue à terme (le doc mentionne un WP FR/EN) — l'anticiper dès l'archi ?

---

## 8. Risques & points d'attention

- **Périmètre** : le document est un cahier de contenu très riche ; le risque n°1 est le
  glissement de charge. → lotir strictement, valider au Lot 2.
- **Ton éditorial** (`CLAUDE.md` §4) : ne pas trahir le registre clinique/souverain ; bannir « l'auteur »
  dans les textes théoriques (règle DMU) — vigilance à l'intégration des 26 000 mots.
- **Performance mobile Afrique** : contrainte forte → privilégier statique + JS minimal, images WebP,
  polices optimisées (auto-hébergement à envisager). C'est un argument pour Astro / Next.js SSG.
- **Sécurité** : paiement + PDF protégés + codes d'accès → aucun secret en dépôt, `.env` serveur,
  vérification côté serveur systématique (jamais côté client seul).
- **Conformité** : la vente de formations déclenche des obligations légales (CGV, facturation,
  RGPD) absentes du périmètre vitrine initial.

---

*Fichiers liés : `CLAUDE.md`, `feature-backlog.md`, `integrations.md`, `brand-brief.md`,
`data-dictionary.md`. Ce cadrage les met à jour sur le point « stack technique » sous réserve de validation.*

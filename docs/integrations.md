# integrations.md — APIs, services & outils externes

> **⚠️ MISE À JOUR 2026-07-08 — Réorientation V2 (Next.js).**
> Le projet migre vers **Next.js** (`web/`) ; **le plan « thème PrestaShop » est abandonné**.
> Conséquences sur ce fichier : les **§4 (PrestaShop)** et **§5 (Paiements via modules PrestaShop)**
> sont caducs. Les paiements (**CinetPay**) sont désormais intégrés **en propre** via des *route
> handlers* Next.js (abstraction `PaymentProvider` + `MockProvider` en attendant le compte
> marchand). Base de données : **Prisma + SQLite (dev) → PostgreSQL (prod)**. Référence :
> `docs/update/CADRAGE-V2.md` (§4bis, §4ter) et `docs/update/ROADMAP.md`.
> Les besoins **Google Fonts** évoluent aussi : polices désormais **auto-hébergées via `next/font`**.

> État au démarrage : **aucune infrastructure n'est créée** (ni GitHub, ni hébergeur, ni domaine). Ce fichier liste ce qui sera nécessaire, par phase. Aucune clé / secret ne doit être commitée dans le dépôt — utiliser des variables d'environnement et un `.env` ignoré par git (pertinent en v2).

---

## 1. Actifs en VERSION 1 (maquette statique)

### Google Fonts (CDN)
- **Rôle** : polices Playfair Display, Lora, Inter, Fira Code.
- **Intégration** : `<link>` vers `fonts.googleapis.com` dans le `<head>`, avec `preconnect`.
- **Clé** : aucune.
- **Note** : pour de meilleures perfs / RGPD, envisager l'auto-hébergement des polices en v2 (`assets/fonts/`).

> En v1, c'est la seule dépendance externe réellement chargée. Tout le reste ci-dessous est **prévu mais non branché** (placeholders).

---

## 2. À configurer pour le DÉPLOIEMENT (fin v1 / mise en ligne)

### Hébergement statique — décision : Docker + Traefik (serveur du client)
- **Choix retenu** : déploiement **Docker** (image nginx servant `site/`) derrière **Traefik**, sur le serveur du client. Domaine et nom de routeur **pilotés par `.env`** (mêmes conventions que les autres services de la plateforme, cf. le `docker-compose.yml` Dolibarr de référence).
- Fichiers : `Dockerfile`, `nginx/default.conf`, `docker-compose.yml`, `.env.example` (racine du projet) — voir `DEPLOYMENT.md`.
- **SSL / HTTPS + HSTS** : gérés par Traefik (certresolver Let's Encrypt `le`, redirection `sslredirect`).
- Réseau externe requis : `traefik-platform-network`.
- Alternatives écartées pour ce projet : Vercel / Netlify / GitHub Pages (le client héberge tout en Docker).

### Nom de domaine
- **Cible probable** : `lesprincipesretrouves.com`.
- **Statut** : non acheté. À acquérir + relier à l'hébergeur (DNS).

### Versionnement
- **GitHub** : dépôt à créer pour héberger le code et déclencher les déploiements.
- **Statut** : non configuré.

---

## 3. Formulaire de contact (back-end)

> En v1 (maquette) : formulaire présent, validation **côté client** uniquement, pas d'envoi réel.

Options pour rendre le formulaire fonctionnel (v1.1 / v2) — à trancher avec le client :

| Option | Type | Avantages | Points d'attention |
|---|---|---|---|
| **Formspree** / Basin / Web3Forms | Service tiers, zéro back-end | Compatible site statique, rapide à brancher | Plan gratuit limité, données chez le tiers |
| **Resend** / Postmark / SendGrid | API email transactionnel | Contrôle total, fiable | Nécessite une fonction serverless (donc back-end minimal) |
| **Netlify Forms** / Vercel + fonction | Lié à l'hébergeur | Intégré au déploiement | Couple le formulaire à l'hébergeur |

- **Champ d'arrivée** : adresse email de réception à fournir par le client.
- **Données** : voir `contact_form` dans `data-dictionary.md`.

### Captcha anti-spam (exigé par le cahier des charges)
- **Candidats** : hCaptcha, Cloudflare Turnstile (recommandé : discret, gratuit, respectueux vie privée), ou reCAPTCHA v3.
- **Clés** : site key (publique, côté client) + secret key (côté serveur, en v2).
- **Statut v1** : emplacement réservé dans le formulaire, non actif.

---

## 4. PrestaShop (cible v2 — plateforme)

> Décision : après validation de la maquette, le site est converti en **thème PrestaShop** pour bénéficier d'une intégration modulaire (notamment des paiements) et d'une gestion back-office.

- **Pourquoi PrestaShop** : système de thèmes (templates Smarty `.tpl` + partials `header.tpl`/`footer.tpl`), pages CMS éditables, et surtout un **écosystème de modules de paiement** prêt à l'emploi.
- **Mapping maquette → PrestaShop** :
  - Partials JS `header`/`footer` → `header.tpl` / `footer.tpl` du thème.
  - `style.css` (variables `:root`) → assets du thème (`themes/<theme>/assets/css`).
  - Pages Manifeste / Note Épistémo / Concepts / etc. → **pages CMS**.
  - Modules de formation payants → **produits** PrestaShop.
- **Implication pour la maquette** : garder header/footer isolés, un CSS unique à variables, et le contenu structuré (cf. `/data/*.json`) pour faciliter la reprise en `.tpl`.

## 5. Paiements (v2 — via modules PrestaShop)

> Hors périmètre v1. Documenté pour anticipation. En PrestaShop, ces paiements passent par des **modules** (pas de back-end à coder de zéro).

### Stripe (international)
- **Rôle** : paiement CB des formations (Modules 1 & 2 ; Module 3 sur devis).
- **Intégration PrestaShop** : module officiel Stripe.
- **Pré-requis** : compte Stripe, CGV, configuration du module.

### CinetPay (Afrique / mobile money)
- **Rôle** : paiement local (Mobile Money, cartes africaines) — adapté au public de Brazzaville / OHADA.
- **Intégration PrestaShop** : module CinetPay pour PrestaShop.
- **Pré-requis** : compte marchand CinetPay, configuration du module.

### Dépendances associées
- CGV (droit OHADA + international), contrats de formation par module, facturation (gérée par PrestaShop).

---

## 5. Analytics (optionnel, v2)
- **Candidats respectueux RGPD** : Plausible, Matomo, Simple Analytics.
- À préférer à Google Analytics pour rester cohérent avec le positionnement « institut de recherche » et la conformité RGPD.

---

## 6. Conformité
- **RGPD** : pages Mentions légales + Politique de confidentialité (liens footer obligatoires), consentement explicite sur le formulaire (`consent_rgpd`), bannière cookies seulement si traceurs ajoutés.
- **Mentions ISBN / dépôt légal** : concernent les ouvrages imprimés (hors site), mais peuvent être référencées sur la page L'Ouvrage.

---

## Récapitulatif des secrets à gérer (jamais commités)

| Secret | Quand | Stockage |
|---|---|---|
| Clé secrète captcha | v2 | variable d'env serveur |
| Clés Stripe (secret + webhook) | v2 | variable d'env serveur |
| Clés CinetPay (API key + site id) | v2 | variable d'env serveur |
| Clé API service email | v1.1/v2 | variable d'env serveur |

> En v1 statique : **aucun secret**. Le jour où un back-end est ajouté, créer un `.env` + l'ajouter à `.gitignore`.

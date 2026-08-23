# Audit design — Front office & Back-office (2026-08-23)

Audit mené sur la production (`https://les-principes-retrouves.webtinix.com`) avec deux
revues de design indépendantes (skills *impeccable* + *emil-design-eng*) et un détecteur
mécanique d'anti-patterns, sur captures réelles desktop (1440) + mobile (390).

Verdict de spécificité : le site est **fortement spécifique à son produit** (fronton sur
mesure, système Read « filet Or », pyramide Σ accessible). Les défauts relevés sont de la
**finition et de la conversion**, pas de l'identité. Fil rouge : le registre doctrinal,
excellent pour *lire*, dessert les moments où le visiteur doit *acheter* et où l'admin doit
*opérer vite*.

Détecteur mécanique : 5 accents `border-l-4` signalés. **Conservés** en front office (c'est
le filet Or de marque), **à réévaluer** en back-office (cartes du tableau de bord).

---

## Lot 1 — « Quick wins » (ce document couvre son périmètre)

Sûrs, fort ROI, surtout mécaniques. Implémentés le 2026-08-23.

### Back-office

| # | Problème | Correctif | Fichiers |
|---|----------|-----------|----------|
| B1 | Aucun état « en cours » sur les soumissions → clic mort, double-clic (2 e-mails, 2 versions en historique) | Composant client partagé `BoutonSoumettre` (`useFormStatus`) : désactive + change le libellé pendant `pending` | `components/admin/bouton-soumettre.tsx` (nouveau) + tous les formulaires admin |
| B2 | Actions conséquentes sans confirmation ni distinction (« Révoquer » identique à « Renvoyer ») | Confirmation (`window.confirm`) + variante **danger** (rouge) sur *révoquer un code* et *revenir au texte d'origine* | `admin/codes/page.tsx`, `admin/contenu/[cle]/page.tsx` |
| B3 | Enums `snake_case` visibles dans l'UI (`en_attente`, `paye`, `nouveau`…) | Map de libellés FR partagée (valeur enum conservée) | `lib/libelles.ts` (nouveau) + `admin/commandes`, `admin/messages`, `admin/codes` |
| B4 | Pas d'état de nav actif (on ne sait pas où on est) | Nav extraite en composant client (`usePathname`) marquant la section courante | `components/admin/admin-nav.tsx` (nouveau) + `admin/layout.tsx` |

### Front office

| # | Problème | Correctif | Fichiers |
|---|----------|-----------|----------|
| F1 | Pyramide Σ inutilisable au doigt (interaction `hover`/`focus` seule, légende « Survolez ») | Ajout `onClick` de bascule ; copie « Touchez, survolez ou parcourez au clavier » ; libellés agrandis (9→11) et opacités des bandes basses relevées pour la lisibilité mobile | `components/pyramide-sigma.tsx` |
| F2 | **Bug factuel** : mentions « CinetPay » alors que le rail retenu est **Chariow** | Remplacement du nom du prestataire dans les surfaces visibles | `components/checkout-form.tsx`, `app/(site)/transmission/page.tsx`, `app/(site)/confidentialite/page.tsx`, `app/(site)/cgv/page.tsx` |
| F3 | Textes pâles sous le seuil de contraste AA (`/50`, `/40`) | Plancher à `/70` sur la ligne de sécurité paiement et les avertissements de pied de page | `components/checkout-form.tsx`, `components/site-footer.tsx`, `components/page-stub.tsx` |
| F4 | CTA d'achat « fantôme » (or transparent, rempli au survol seulement) pour une formation à 800 € | Variante `or-plein` (or plein au repos) appliquée aux modules **achetables** ; le Module III (sur devis) garde le CTA sobre | `components/ui/button.tsx`, `app/(site)/transmission/page.tsx` |

Note F2 : le paiement Chariow n'est pas encore *activé* (compte/clé/produits côté client, cf.
[CADRAGE-CHARIOW.md](CADRAGE-CHARIOW.md)), mais le prestataire **retenu** est Chariow ;
afficher « CinetPay » est faux. La bascule tarifaire € → FCFA reste un point client distinct.

---

## Lot 2 — Implémenté le 2026-08-23 (3 arbitrages client + ingénierie)

Décisions client : **police du fronton unifiée vers Playfair** ; **curriculum des cartes
module replié** ; **boucles d'animation de l'accueil calmées**.

### Fronton
- **Police unifiée** : `fronton.css` consomme désormais `--font-playfair` / `--font-lora`
  (héritées du layout racine) au lieu de Cormorant/EB Garamond ; imports next/font retirés du
  layout du fronton. La police signature apparaît dès la page-porte. *Vérifié : composition
  intacte, wordmark « LE FRONTON » en Playfair.*
- **Timing d'entrée** : cadence resserrée (.55s) et CTA « Franchir le seuil » avancé (délai
  .16s au lieu de .46s) — la voie d'entrée n'apparaît plus en dernier.

### Front office
- **Étape paiement** (`checkout-form.tsx`) : bloc **Récapitulatif** (module + régime + montant,
  réactif au choix B2B/B2C) au-dessus du bouton ; ligne de sécurité + cadenas remontée ; CTA
  **or plein** portant le montant ; **validation par champ native** (retrait de `noValidate`).
- **Cartes module** (`transmission`) : tarifs remontés juste après les faits clés ; curriculum
  + livrables repliés derrière **« Voir le détail du programme »** (`<details>`, sans JS) ;
  CTA ancré en pied de carte (`mt-auto`) → boutons alignés.

### Back-office
- **Filtre de la liste de contenu** : chips **Tous / Modifiés / Texte d'origine** (via
  `searchParams`, avec compteurs) ; repère Or en bord gauche des blocs modifiés. Passe l'échelle.
- **Garde « modifications non enregistrées »** (`beforeunload`) sur l'éditeur ; anneau de focus
  sur la surface Tiptap.
- **Triage du tableau de bord** : les cartes actionnables (messages non traités, devis) passent
  en Or + « à traiter » quand non-nulles ; les compteurs d'info restent neutres ; chiffres en
  Playfair `tabular-nums` (fin du « 0 » barré de la fonte mono).

### A11y
- Cibles tactiles ≥ 44px : burger du fronton et liens de nav du site (panneau mobile).
- `:focus-visible` ajouté sur le menu du fronton.

### Perf / animations
- Accueil : la respiration du sommet Σ devient un **souffle d'entrée unique** (plus de boucle
  infinie) et les axes de flux sont **statiques**. `prefers-reduced-motion` inchangé.

### Reste (⏸, hors Lot 2)
- Prévisualisation *avant* publication dans l'éditeur (la garde `beforeunload` couvre déjà la
  perte accidentelle) ; LCP de l'accueil (police Playfair, optimisation fine) ; `shadcn` en
  `dependencies` ; Turnstile/Resend non activés (clés client) ; bascule tarifaire € → FCFA.

---

## Durcissement (traité le 2026-08-23, après le Lot 1)

- **Rotation des identifiants admin** : `ADMIN_BASIC_AUTH` n'est plus au défaut
  (`admin` / `brazzaville2026`). Nouveau hash apr1 dans le `.env` serveur (hors dépôt) ;
  le mot de passe en clair est remis au client, non stocké dans le code.
- **Limitation de débit** (`lib/rate-limit.ts`, en mémoire, par IP, sans dépendance) :
  - `/api/acces` : 10 tentatives / 5 min (anti-brute-force du code d'accès) ;
  - `/api/contact` : 5 envois / 10 min (anti-spam, en plus de Turnstile) ;
  - `/api/checkout` : 8 requêtes / 10 min.
  Réponse `429` avec en-tête `Retry-After`. Vérifié : blocage au-delà du seuil,
  seaux indépendants par IP. Non distribué (repart à zéro au redémarrage) — suffisant
  pour un conteneur unique.

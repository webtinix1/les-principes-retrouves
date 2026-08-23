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

## Lot 2 — À décider (NON couvert ici)

Plus impliquant, laissé en attente d'arbitrage :

- **Fronton** : unifier la police (Playfair sur la porte) ou assumer Cormorant comme « police
  du seuil » documentée ; revoir le timing d'entrée desktop (CTA « Franchir le seuil » qui
  apparaît en dernier, ~1,2 s ; probable élément LCP).
- **Back-office** : filtre de la liste de contenu (Tous / Modifiés / Origine) — tient à
  12 blocs, casse à ~200 ; garde « modifications non enregistrées » + prévisualisation avant
  publication ; refonte de *triage* du tableau de bord (compter → alerter).
- **Front office** : récapitulatif + validation par champ à l'étape paiement ; ancrage
  prix + CTA en pied de carte ; curriculum replié derrière « voir le détail ».
- **Perf** : LCP de `/accueil` (police Playfair) ; boucles d'animation infinies sur l'accueil.
- **A11y** : cibles tactiles < 44px (nav, burger fronton) ; `:focus-visible` sur le menu fronton.

---

## Points hors design (déjà cadrés ailleurs, en attente client)

- Rotation des identifiants admin (`ADMIN_BASIC_AUTH` encore au défaut) — **à traiter après le Lot 1**.
- Limitation de débit sur `/api/acces`, `/api/contact`, `/api/checkout` — **à traiter après le Lot 1**.

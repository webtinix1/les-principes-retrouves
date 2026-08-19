# Roadmap V2 — Portail de l'École de Brazzaville

> Roadmap opérationnelle des travaux, dérivée de `CADRAGE-V2.md`.
> Socle acté : **Next.js (App Router)**. Suivi par cases à cocher, lot par lot.
> Statut : `[ ]` à faire · `[~]` en cours · `[x]` fait · `[⏸]` en attente d'un élément client.

---

## Standards transversaux (à appliquer sur TOUT le projet)

Trois référentiels adoptés comme règles d'ingénierie et de design :

1. **Vercel React Best Practices** (perf) — [ref](https://www.skills.sh/vercel-labs/agent-skills/vercel-react-best-practices)
   - Éliminer les *waterfalls* de requêtes : fetch en parallèle, `React.cache()` pour dédupliquer.
   - Réduire le bundle : Server Components par défaut, `"use client"` seulement sur les îlots interactifs.
   - Limiter les re-renders (mémoïsation ciblée), lookups en `Set`/`Map` (O(1)), batching DOM.
   - Contenu = statique (SSG/ISR) ; le client ne charge que le JS des îlots (pyramide, formulaire).
2. **Frontend Design** (identité visuelle) — [ref](https://www.skills.sh/anthropics/skills/frontend-design)
   - Identité distinctive, pas d'esthétique générique : la palette/typo du document EST l'identité.
   - **Hero = thèse** : « Le Seuil » ouvre sur la pyramide Σ, l'objet le plus caractéristique.
   - Typographie comme composant mémorable (Playfair/Lora/Fira Code/Inter, échelle claire).
   - Les numéros (01/02/03) seulement là où la séquence a du sens (Canon 7 principes, articles).
   - Animation orchestrée (chargement séquentiel du Fronton) plutôt qu'effets dispersés.
3. **Web Design Guidelines** (a11y/UX) — [ref](https://www.skills.sh/vercel-labs/agent-skills/web-design-guidelines)
   - Audit de conformité a11y / UX en `file:line` avant chaque fin de lot.
   - Contraste (Or sur Bleu Nuit à vérifier), navigation clavier, focus visible, HTML sémantique.

**Objectifs mesurables** (contexte : 60 % mobile Afrique, bas débit) :
- Lighthouse mobile ≥ 90 sur Perf / SEO / Accessibilité / Best Practices.
- LCP < 2,5 s en 3G simulée ; JS initial des pages de contenu proche de 0.
- Images **WebP**, polices optimisées (auto-hébergement à valider), logo/pyramide en **SVG**.

---

## Contenu & intégrations différées (fournis PLUS TARD par le client)

Deux éléments ne sont **pas encore disponibles** ; on construit toute la plomberie autour de
**placeholders** pour ne rien bloquer et pouvoir brancher le réel en une étape.

| Élément différé | Stratégie de placeholder | Branchement du réel |
|---|---|---|
| **PDF intégraux** (WP-01/02/03, Guide Technique, Arrêt Pilote) | Métadonnées déjà saisies (`content/resources.json` : titre, classification, volume, niveau d'accès) ; fichier `pdf/placeholder.pdf` + flag `is_available:false` → la route de téléchargement répond « bientôt disponible » proprement | Déposer les vrais PDF + passer `is_available:true` |
| **Compte marchand CinetPay** (clés API, site id) | Abstraction `PaymentProvider` + `MockProvider` qui simule un paiement réussi → émet un code d'accès. Tout le tunnel (checkout → webhook → code → déblocage) est **testable de bout en bout** sans clés | Implémenter `CinetPayProvider`, renseigner les `.env` serveur |

- Autres `[⏸]` en attente client : **domaine** `lesprincipesretrouves.cg`, **boîte mail** de réception,
  **CGV / contrats de formation** (droit OHADA), textes doctrinaux manquants (`<!-- PLACEHOLDER -->`).

---

## Base de données & persistance (recommandation)

- **ORM : Prisma.** Schéma typé, migrations, portable entre bases (SQLite en dev → Postgres en prod).
- **Base cible : PostgreSQL** en conteneur Docker, **cohérent avec l'infra existante** (Docker + Traefik,
  même patron que le service Dolibarr de référence). C'est le choix robuste dès qu'il y a du **paiement**
  et des **codes d'accès** (intégrité, sauvegardes, accès concurrents).
- **Option plus légère : SQLite** (fichier, zéro infra) — acceptable en **dev** ou si le volume reste
  minime, mais **non recommandé en prod** pour des données de paiement/accès. Prisma permet de démarrer
  en SQLite et de basculer vers Postgres sans réécrire le code métier.
- **Modèle de données initial (esquisse)** : `Order` (commande module), `AccessCode` (code → ressources
  débloquées, expiration), `Enrollment` (module ↔ accès), `ContactMessage` (optionnel). Nomenclature
  des champs en **`snake_case`** (règle d'or `CLAUDE.md §4.2`).
- **Lot d'introduction** : la DB n'est nécessaire qu'au **Lot 3+** (formulaire) et surtout **Lot 4-5**
  (paiement/accès). Les Lots 0-2 (site public) n'en dépendent pas.

---

## Lot 0 — Décisions & socle technique  ✅ **TERMINÉ (2026-07-08)**
- [x] Initialiser le projet Next.js (App Router, TypeScript) — `web/`, Next 16 + React 19 + Tailwind v4, **yarn**.
- [x] Poser **shadcn/ui** + Tailwind ; configurer les **tokens** (palette 7 couleurs, 4 polices, dans `globals.css`).
- [x] Porter les polices (Playfair Display, Lora, Fira Code, Inter) — **auto-hébergées via `next/font`**.
- [x] Structure de dossiers (`app/(site)`, `app/api`, `components`, `content`, `lib`).
- [x] Configurer Prisma (SQLite en dev, `prisma.config.ts` Prisma 7) — **sans** modèles métier encore.
- [x] Mettre à jour la doc existante : `CLAUDE.md §2-3`, `integrations.md`, `feature-backlog.md` (Next.js, PrestaShop abandonné).
- [x] Dockerfile (sortie `standalone`) + `docker-compose.web.yml` (Traefik) + `.env.example` + `.dockerignore`.
- [x] **Build vérifié** (`yarn build` ✓, home prérendue statique) + rendu runtime confirmé (palette, polices, `lang=fr`).

## Lot 1 — Design system & composants  ✅ **TERMINÉ (2026-07-08)**
- [x] Header (Server) + footer (Server) + nav responsive (client : `usePathname` actif + menu mobile). Fin du `innerHTML` runtime.
- [x] Boutons CTA (variantes `or`/`ligne` + taille `cta`, hover du document), primitives `Carte` + `Encadré` (bordure Or).
- [x] **Pyramide de Σ** : composant SVG animé (pulsation 4 s, double respiration, tooltips accessibles survol + focus clavier).
- [x] Responsive mobile-first (nav lg:, hero fluide) + `prefers-reduced-motion` respecté.
- [x] a11y : focus visibles (outline Or), `aria-current`, `aria-live` sur la légende pyramide, contrastes Or/Bleu Nuit.
- [x] **Le Seuil (Fronton)** réel + 9 pages-stubs (+ 2 légales) → nav fonctionnelle, zéro 404. Déployé et vérifié en prod.

## Lot 2 — Contenu statique (10 pages)  ✅ **TERMINÉ (2026-07-08)** ← **jalon J1**
- [x] Contenu modélisé en `content/*.ts` (concepts, institution, autorités, modules, working-papers) en `snake_case`.
- [x] Les 10 pages intégrées (SSG), ordre cognitif imposé, ton clinique (« l'auteur » banni des textes théoriques).
- [x] Composants réutilisables : `CarteConcept`, `Carte`/`Encadré`, `Section`/`Container`/`Prose`/`TitreSection`.
- [x] SEO par page : `title`/`description` + Open Graph (`pageMetadata`), JSON-LD organisation, `sitemap.xml`, `robots.txt`.
- [x] Placeholders propres : téléchargements/gating (Laboratoire) et inscription/paiement (Transmission) → Lot 4-5.
- [ ] **Recette + validation client** (à faire — le site public complet est en ligne).

> Reste hors périmètre J1 (→ Lot 6) : contenu réel des pages `mentions-legales` et `confidentialite` (stubs).

## Lot 3 — Formulaire de contact & captcha  ✅ **TERMINÉ (2026-07-08)**
- [x] Route `api/contact` : validation serveur (zod) + persistance + e-mail Resend (best-effort, gracieux).
- [x] Captcha **Cloudflare Turnstile** (vérification serveur si clé configurée ; sinon mode dégradé).
- [x] Modèle `ContactMessage` + migration `init_contact` (Prisma 7, driver adapter libSQL).
- [x] Persistance prod : volume `app-data` + base migrée bakée (seed.db) + entrypoint ; testée à travers un redémarrage.
- [ ] `[⏸]` À fournir pour activer e-mail + anti-spam : `CONTACT_INBOX_EMAIL`, `RESEND_API_KEY`,
      `RESEND_FROM`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (cette dernière au build).

## Lot 4 — Formation & paiement  ✅ **TERMINÉ (2026-07-08)** *(déblocage par code, sans compte + back-office)*
- [x] Modèles Prisma `Commande` (infos acheteur = historique) + `CodeAcces` + `RessourceEtat` + migration.
- [x] Tunnel de commande invité depuis les modules de /transmission (`/commander/[module]`, régime B2B/B2C, devis pour Module III).
- [x] Abstraction `PaymentProvider` + `MockProvider` (paiement simulé de bout en bout) + squelette CinetPay.
- [x] Route `api/checkout` (émission `CodeAcces` + e-mail Resend) + `api/webhook/cinetpay` (squelette sécurisé).
- [x] **Back-office `/admin`** (Traefik basic-auth) : tableau de bord, commandes (+ statut, **export CSV**),
      codes (révoquer/renvoyer), messages, disponibilité des ressources.
- [x] DB : **SQLite (volume) conservé** ; migrations appliquées au démarrage (`migrate deploy`).
- [x] **Paiement Chariow intégré** (API-driven, prêt à brancher) : `ChariowProvider` + `api/webhook/chariow`
      (re-vérif `GET /v1/sales/{id}`), champ téléphone, `CHARIOW_*`. Cadrage : `docs/update/CADRAGE-CHARIOW.md`.
- [ ] `[⏸]` **Activer Chariow** : compte + clé `sk_live`, créer les produits (dashboard) → `CHARIOW_PRODUCT_MAP`,
      `PAYMENT_PROVIDER=chariow` ; confirmer XAF/Congo + mécanisme de signature webhook. (CinetPay abandonné, gardé en repli.)
- [ ] `[⏸]` Changer les identifiants admin par défaut (`ADMIN_BASIC_AUTH`).

## Lot 5 — Accès hybride & PDF protégés  ✅ **TERMINÉ (2026-07-08)**
- [x] Gating par niveau (libre = résumés affichés ; conditionné = intégral par code ; hiérarchie module_i<ii<iii).
- [x] Route `api/download/[ressource]` : vérif serveur (dispo back-office → code valide → niveau) avant envoi du PDF (dossier `protected/`, hors `public/`).
- [x] Saisie/validation de code (`api/acces` + cookie httpOnly), gestion révocation/expiration ; PDF placeholder de marque.
- [ ] `[⏸]` Déposer les vrais PDF dans `protected/<ressource_id>.pdf` + activer la dispo dans le back-office (`/admin/ressources`).

## Lot 6 — Conformité & mise en ligne  🔶 **EN GRANDE PARTIE FAIT (2026-07-08)**
- [x] Pages **Mentions légales**, **Politique de confidentialité (RGPD)**, **CGV** (trames structurées) + lien footer.
      `[⏸]` à faire valider par un juriste et compléter (`[…]` : forme juridique, hébergeur, durées, rétractation).
- [x] Sécurité : aucun secret en dépôt (scan OK), `.env` serveur, vérifs côté serveur systématiques, hash admin retiré de `.env.example`.
- [x] **Audit Lighthouse mobile** : SEO/Accessibilité/Best-practices ~**100** ; perf accueil 72→**83**, concepts **91**, laboratoire **86** ; CLS 0.
      Reste optimisable : LCP de l'accueil (police Playfair sous 4G simulée).
- [ ] `[⏸]` Domaine `lesprincipesretrouves.cg` + DNS (tâche client ; actuellement sur le sous-domaine webtinix.com, HTTPS/HSTS OK).
- [x] Durcissement image : `apk upgrade` (patch CVE OS), retrait Playwright/ESLint de l'image, compose `no-new-privileges` + `cap_drop: ALL`.
- [x] **QA parcours d'achat** validée de bout en bout (Playwright UI, prod) : commande → code → back-office → déblocage → téléchargement PDF.
- [ ] (Optionnel, différé) Analytics RGPD (Plausible/Matomo), préparation i18n FR/EN.

## Lot 7 — Contenu éditable depuis le back-office  ✅ **TERMINÉ (2026-08-19)**

> Demande client : pouvoir corriger les textes du site sans passer par un développeur.

- [x] **Architecture « le code reste le défaut »** : les pages enveloppent leur JSX existant
      (`<BlocProse cle="…">…</BlocProse>`). Sans surcharge en base, le texte d'origine est rendu
      tel quel — aucune copie à maintenir, aucune régression possible.
      *Vérifié : le HTML rendu des 9 pages est identique à la production, hors attributs `data-bloc`.*
- [x] Modèles `ContenuBloc` (surcharges) + `ContenuBlocVersion` (historique, sans relation pour
      survivre à un retour au texte d'origine) + migration `contenu_editable`.
- [x] **`/admin/contenu`** : 130 blocs sur 9 pages, éditeur riche (Tiptap) borné aux balises
      autorisées, retour au texte d'origine, historique restaurable (20 versions).
- [x] Assainissement **serveur** systématique (liste blanche calibrée sur la typographie réelle
      des pages) ; les blocs « texte court » sont réduits au texte brut.
- [x] Contenus structurés à clés dérivées : 20 concepts (définition + portée), Working Papers
      (titre + résumé), fiche des modules (public cible, durée, prérequis).
- [x] **Les pages restent statiques** (perf Lighthouse préservée). Le build Docker n'ayant pas de
      base, l'entrypoint revalide les pages au démarrage avec un jeton tiré au hasard dans le
      conteneur — sans quoi les textes du client disparaîtraient à chaque redéploiement.
      Filet de sécurité ISR (1 h) en complément.
- [x] Recette Playwright (`web/tests/contenu-editable.spec.ts`) : modifier → publier → vérifier
      sur le site → restaurer ; et neutralisation du HTML saisi dans un bloc « texte court ».
- [ ] `[⏸]` **Tarifs des modules non éditables** — volontaire : ils alimentent aussi
      `/commander/[module]` et l'enregistrement `Commande`. À ouvrir en recâblant le tunnel de
      commande sur la même source, au moment de la bascule € → FCFA (Chariow).
- [ ] `[⏸]` Restent en code : titres H1/H2 des pages (liés aux métadonnées SEO), pages légales,
      autorités de convergence, niveaux de l'architecture institutionnelle.

---

## Lot 8 — Fronton d'entrée & durcissement (audit)  ✅ **TERMINÉ (2026-08-19)**

**Fronton.** La maquette `updating/principe.html` devient la page-porte du site (`/`) ;
l'accueil « Le Seuil » passe sous `/accueil`.
- [x] Groupe de routes `(fronton)` sans en-tête/pied de page du site ; CSS livré sur cette
      seule route (zéro fuite de style, vérifié). Polices Cormorant/EB Garamond auto-hébergées
      (next/font) — Google Fonts est interdit par la CSP.
- [x] 3 images base64 (~850 Ko) extraites en fichiers `/public/fronton` (markup 876 Ko → ~5 Ko).
- [x] Menu (CSS pur) + « Franchir le seuil » câblés vers les vraies pages ; liens home
      (header, nav, back-office) repointés vers `/accueil` ; sitemap couvre `/` et `/accueil`.
- [x] Rendu vérifié desktop + mobile, sans erreur CSP.
- [ ] `[⏸]` **Libellés du menu du fronton** à confirmer avec le client (correspondances
      L'Organon→/ouvrage, La Pyramide→/concepts, etc. — choix par défaut).

**Durcissement (audit global).**
- [x] **En-têtes de sécurité** : CSP, X-Frame-Options DENY, X-Content-Type-Options,
      Referrer-Policy, Permissions-Policy ; `x-powered-by` retiré. (Seul HSTS existait.)
- [x] **Sauvegarde quotidienne** de la base SQLite (`scripts/backup-db.sh` + cron 03h17,
      snapshot cohérent VACUUM INTO, rétention 14 j). Restauration vérifiée.
- [x] Vérifié SANS faille : les Server Actions ne sont pas invocables hors `/admin`
      (Next 16 les lie à leurs routes ; Traefik renvoie 401 sur `/admin`).
- [ ] `[⏸]` **Changer `ADMIN_BASIC_AUTH`** (toujours le défaut) — commande fournie au client.
- [ ] `[⏸]` Activer Turnstile + limitation de débit sur `/api/contact` et `/api/acces`.
- [ ] Perf accueil 79 (LCP police Playfair) ; SEO/a11y/best-practices 100.

---

---

## Jalons

| Jalon | Contenu | Dépendances client |
|---|---|---|
| **J1** — fin Lot 2 | Monument éditorial complet, public, rapide, SEO | Aucune (placeholders) |
| **J2** — fin Lot 5 | Paiement + accès conditionné opérationnels | CinetPay + PDF réels |
| **J3** — fin Lot 6 | Mise en ligne production | Domaine, CGV, mail |

*Lié à : `CADRAGE-V2.md`, `CLAUDE.md`, `integrations.md`, `feature-backlog.md`, `data-dictionary.md`.*

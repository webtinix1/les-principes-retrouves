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

## Lot 3 — Formulaire de contact & captcha
- [ ] Route `api/contact` (envoi mail via service transactionnel) + validation serveur.
- [ ] Captcha **Cloudflare Turnstile** (discret, RGPD-friendly).
- [ ] Modèle `ContactMessage` (optionnel) + première migration Prisma.
- [ ] `[⏸]` Boîte mail de réception à fournir.

## Lot 4 — Formation & paiement  *(arbitrer le périmètre commerce AVANT de démarrer)*
- [ ] **Décision** : « déblocage simple par code » vs « vraie boutique » (comptes, factures, historique).
- [ ] Pages modules (I/II/III) + tunnel de commande.
- [ ] Abstraction `PaymentProvider` + `MockProvider` (paiement simulé de bout en bout).
- [ ] Route `api/checkout` + `api/webhook/cinetpay` (réconciliation → émission `AccessCode`).
- [ ] Modèles Prisma `Order`, `AccessCode`, `Enrollment` + migrations ; **bascule Postgres**.
- [ ] `[⏸]` Compte marchand CinetPay → implémenter `CinetPayProvider`, `.env` serveur.

## Lot 5 — Accès hybride & PDF protégés
- [ ] Gating 3 niveaux (libre / conditionné / premium) + boucle vertueuse Page 7 ↔ Page 9.
- [ ] Route `api/download/[ressource]` : vérification serveur du code d'accès avant envoi du PDF.
- [ ] Écrans de saisie/validation de code, gestion expiration.
- [ ] `[⏸]` Déposer les vrais PDF + passer `is_available:true`.

## Lot 6 — Conformité & mise en ligne
- [ ] Mentions légales, **CGV / contrats de formation** (OHADA + international), RGPD, politique cookies.
- [ ] `[⏸]` Domaine `lesprincipesretrouves.cg` + DNS + HTTPS/HSTS (Traefik / Let's Encrypt).
- [ ] Sécurité : aucun secret en dépôt, `.env` serveur, vérifs côté serveur systématiques.
- [ ] Recette finale mobile/tablette/desktop + audit Lighthouse (objectifs ci-dessus).
- [ ] (Optionnel) Analytics RGPD (Plausible/Matomo), préparation i18n FR/EN.

---

## Jalons

| Jalon | Contenu | Dépendances client |
|---|---|---|
| **J1** — fin Lot 2 | Monument éditorial complet, public, rapide, SEO | Aucune (placeholders) |
| **J2** — fin Lot 5 | Paiement + accès conditionné opérationnels | CinetPay + PDF réels |
| **J3** — fin Lot 6 | Mise en ligne production | Domaine, CGV, mail |

*Lié à : `CADRAGE-V2.md`, `CLAUDE.md`, `integrations.md`, `feature-backlog.md`, `data-dictionary.md`.*

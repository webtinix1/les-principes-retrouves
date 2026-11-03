# data-dictionary.md — Dictionnaire de données

> **Règle absolue** : avant de nommer un champ, une clé JSON, un attribut `data-*` ou un champ de formulaire, le chercher ici. S'il n'existe pas, l'ajouter dans ce fichier **avant** de l'utiliser dans le code. Toute la nomenclature est en `snake_case`.

Le site est **statique** : il n'y a pas de base de données relationnelle. Ce dictionnaire couvre donc :
1. les **champs du formulaire de contact** ;
2. les **structures de données de contenu** (fichiers JSON dans `/data/`) utilisées pour générer les pages répétitives (concepts, modules, tomes, ressources) ;
3. le **vocabulaire de navigation**.

Si une base de données est introduite plus tard (v2 : paiements / comptes), les noms ci-dessous deviennent les noms de tables/colonnes — la cohérence est donc anticipée dès maintenant.

---

## 1. Formulaire de contact — `contact_form`

Page : `contact.html`.

| Champ (`snake_case`) | Type | Obligatoire | Contraintes / valeurs | Notes |
|---|---|---|---|---|
| `full_name` | texte | oui | 2–120 caractères | Nom complet de l'émetteur |
| `email` | email | oui | format email valide | |
| `subject` | enum | oui | `formation` \| `edition` \| `collaboration` \| `autre` | Liste déroulante |
| `message` | texte long | oui | 10–5000 caractères | |
| `captcha_token` | texte | oui | jeton fourni par le service captcha | Validé en v2 côté serveur (voir `integrations.md`) |
| `consent_rgpd` | booléen | oui | doit valoir `true` | Case à cocher consentement RGPD |
| `submitted_at` | datetime (ISO 8601) | auto | généré à l'envoi | v2 (back-end) |

### Libellés des options de `subject`
| Valeur stockée | Libellé affiché |
|---|---|
| `formation` | Formation |
| `edition` | Édition |
| `collaboration` | Collaboration |
| `autre` | Autre |

---

## 2. Concepts stabilisés — `data/concepts.json`

Page : `concepts.html` (grille de 9 cartes).

Tableau d'objets `concept` :

| Champ | Type | Description |
|---|---|---|
| `concept_id` | texte (slug) | Identifiant unique, ex. `fiction_de_cloture` |
| `title` | texte | Titre affiché de la carte |
| `doctrinal_definition` | texte | Définition doctrinale (corps de la carte) |
| `canonical_formulation` | texte | Formulation canonique (affichée en italique / doré) |
| `cross_links` | tableau de `concept_id` | Liens croisés vers d'autres concepts |
| `display_order` | entier | Ordre dans la grille (1–9) |

### Les 9 `concept_id` officiels (figés)
1. `fiction_de_cloture`
2. `syllogisme_degrade`
3. `proactivite_judiciaire_encadree`
4. `desadherence_reflexive`
5. `validite_structurelle`
6. `imperium_theorique`
7. `necessite_structurelle`
8. `universalite_fonctionnelle`
9. `maat_operateur_logique`

---

## 3. Ouvrages (Tomes) — `data/tomes.json`

Page : `ouvrage.html` (deux cartes côte à côte).

| Champ | Type | Description |
|---|---|---|
| `tome_id` | texte | `tome_1` \| `tome_2` |
| `title` | texte | Titre du tome |
| `subtitle` | texte | Sous-titre |
| `central_logo` | texte | `pyramide_sigma` (Tome I) \| `plume_maat` (Tome II) |
| `nature` | texte | Nature de l'ouvrage |
| `focus` | texte | Axe principal |
| `back_cover_text` | texte long | Texte de quatrième de couverture (validé) |
| `cta_label` | texte | Libellé du bouton |
| `cta_href` | texte | Lien (placeholder en v1) |

---

## 4. Modules de formation — `data/formation_modules.json`

Page : `formation.html` (3 modules).

| Champ | Type | Description |
|---|---|---|
| `module_id` | texte | `module_1` \| `module_2` \| `module_3` |
| `level` | entier | Niveau 1–3 |
| `title` | texte | Intitulé du module |
| `audience` | texte | Public visé |
| `duration_label` | texte | Ex. « 2 jours (14 heures) » |
| `duration_hours` | entier | Durée en heures |
| `price_eur` | entier \| null | Tarif individuel en € ; `null` si « sur devis » |
| `price_label` | texte | Libellé affiché (gère « Sur devis ») |
| `content_points` | tableau de texte | Points du programme |
| `deliverable` | texte | Livrable |
| `access_note` | texte \| null | Ex. « Sur invitation » |

### Valeurs de référence (issues du document maître)
| `module_id` | `price_eur` | `duration_hours` |
|---|---|---|
| `module_1` | 800 | 14 |
| `module_2` | 1500 | 21 |
| `module_3` | `null` (sur devis) | 7 |

---

## 5. Ressources téléchargeables — `data/resources.json`

Page : `laboratoire.html`.

| Champ | Type | Description |
|---|---|---|
| `resource_id` | texte | Ex. `working_paper_01` |
| `title` | texte | Titre de la ressource |
| `description` | texte | Courte description |
| `file_path` | texte | Chemin du PDF, ex. `assets/pdf/working_paper_01.pdf` (placeholder en v1) |
| `language` | texte | `fr` \| `en` |
| `resource_type` | enum | `working_paper` \| `guide` \| `note` |

### Ressources prévues
- `working_paper_01` — Désadhérence réflexive et visibilité structurelle (`fr`, à venir `en`)
- `guide_invocation` — Guide Technique d'Invocation du Principe de Proactivité Judiciaire
- `note_recherche` — Note de Recherche Doctrinale

---

## 5bis. Articles du blog — `assets/js/articles.js` (`ARTICLES`)

Pages : `blog.html` (liste + filtres) et `article.html?slug=…` (lecture).
Stockés en module JS (et non JSON) pour rester compatibles `file://` (pas de `fetch`). En v2 PrestaShop : billets gérés au back-office.

| Champ | Type | Description |
|---|---|---|
| `slug` | texte (kebab-case) | Identifiant d'URL, ex. `fiction-de-cloture-angle-mort` |
| `title` | texte | Titre de l'article |
| `category` | enum | `Working Paper` \| `Tribune` \| `Note doctrinale` |
| `published_at` | date (ISO `YYYY-MM-DD`) | Date de publication |
| `reading_minutes` | entier | Temps de lecture estimé |
| `excerpt` | texte | Résumé (carte de liste) |
| `lede` | texte | Chapeau de l'article |
| `body` | HTML (chaîne) | Corps rédigé (h2, p, blockquote, ul) — contenu de confiance |

> Le `slug` est en **kebab-case** (convention d'URL), exception documentée à la règle `snake_case` qui s'applique aux autres données.

## 6. Navigation — `data/nav_pages.json`

| Champ | Type | Description |
|---|---|---|
| `page_id` | texte | Identifiant, ex. `accueil` |
| `label` | texte | Libellé dans le header |
| `href` | texte | Fichier cible, ex. `index.html` |
| `nav_order` | entier | Ordre dans le menu |

### Pages officielles (9 pages — ordre du header)
Le `label` ci-dessous est le **libellé court** affiché dans le header (pour tenir sur une ligne) ; le titre complet figure dans le `<h1>` de chaque page.

| `page_id` | `label` (header) | titre complet | `href` |
|---|---|---|---|
| `accueil` | Accueil | Les Principes Retrouvés | `index.html` |
| `manifeste` | Manifeste | Manifeste épistémologique | `manifeste.html` |
| `epistemologie` | Épistémologie | Note épistémologique | `epistemologie.html` |
| `ouvrage` | L'Ouvrage | L'Ouvrage | `ouvrage.html` |
| `laboratoire` | Laboratoire | Laboratoire doctrinal | `laboratoire.html` |
| `concepts` | Concepts | Concepts stabilisés | `concepts.html` |
| `formation` | Formation | Formation | `formation.html` |
| `extraits` | Extraits | Extraits (freemium) | `extraits.html` |
| `blog` | Blog | Blog | `blog.html` |
| `contact` | Contact | Contact | `contact.html` |

> `article.html` (page de lecture d'un billet) n'est pas dans le header : on y accède depuis le blog via `?slug=`. Sur cette page, `data-page="blog"` garde l'onglet « Blog » actif.

---

## 7. Convention de nommage

- **Données / JSON / formulaires / `data-*`** : `snake_case`.
- **Identifiants (`*_id`, slugs)** : `snake_case`, sans accents ni espaces (ex. `proactivite_judiciaire_encadree`).
- **Classes CSS** : `kebab-case` (hors de ce dictionnaire — voir CLAUDE.md).
- **Montants** : entiers en plus petite unité logique (ici l'euro entier `price_eur`), jamais de chaîne formatée pour le calcul ; le formatage d'affichage se fait via `price_label`.
- **Dates** : ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`).

> Tout nouveau besoin de donnée → ajouter une ligne ici **avant** de coder.

---

## 8. Back-office Payload (`web/payload/`) — collections et globals

Identifiants techniques Payload : `id` (UUID), `createdAt`, `updatedAt` (ajoutés
automatiquement, nommage imposé par Payload). Tous les autres champs : `snake_case`.

| Slug | Rôle | Champs |
|---|---|---|
| `commandes` | Commande d'un module (achat invité) | `statut` (en_attente · paye · echoue · rembourse · devis_demande), `module_id`, `module_titre`, `tarif_type` (b2b · b2c · devis), `montant`, `devise`, `buyer_nom`, `buyer_email`, `buyer_organisation`, `buyer_telephone`, `buyer_pays`, `payment_provider`, `payment_ref`, `code_acces` (jointure) |
| `codes-acces` | Code débloquant les téléchargements | `code` (unique), `niveau` (module_i · module_ii · module_iii), `email`, `commande` (→ commandes, unique), `revoked`, `expires_at`, `used_at` |
| `modules` | Modules de formation | `module_id` (stable), `ordre`, `niveau`, `numero`, `titre`, `public_cible`, `duree`, `prerequis`, `sessions[]` (`titre`, `points[].texte`), `livrables[].texte`, `tarif_b2b`, `tarif_b2c`, `tarif_devis`, `cta_label` |
| `messages-contact` | Formulaire de contact | `statut` (nouveau · traite · archive), `nom`, `email`, `organisation`, `sujet`, `message`, `consent_rgpd`, `source` |
| `ressources` | Arsenal du Laboratoire | `ressource_id` (stable, URL de téléchargement), `categorie` (working_paper · piece_operatoire), `ordre`, `niveau_requis`, `is_available`, `fichier` (→ documents), `reference`, `titre`, `classification`, `volume`, `statut`, `soumission`, `resume_label`, `resume[].texte`, `concepts_mobilises[].texte` |
| `documents` | PDF intégraux protégés (upload, hors `public/`) | `description` + champs d'upload Payload |
| `strates` | Strates du vocabulaire | `strate_id` (ancre), `ordre`, `titre`, `sous_titre`, `concepts` (jointure) |
| `concepts` | Concepts stabilisés | `concept_id` (ancre), `numero`, `strate` (→ strates), `titre`, `definition`, `portee` |
| `autorites` | Autorités de convergence (L'Ouvrage) | `autorite_id`, `ordre`, `nom`, `pays`, `apport` |
| `users` | Comptes du back-office | `email`, `nom` + champs d'authentification Payload |
| `contenu-<page>` (globals) | Textes des pages doctrinales | un champ par bloc du registre `content/blocs/` : clé `<page>.<section>.<partie>` → champ `<section>_<partie>` (ex. `manifeste.diagnostic.corps` → `diagnostic_corps`). **Ne jamais renommer une clé** (colonne en base). |

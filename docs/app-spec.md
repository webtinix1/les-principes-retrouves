# app-spec.md — Spécification : quoi et pour qui

---

## 1. En une phrase

Un site vitrine académique qui **archive et donne accès** à l'œuvre de Gaudéric MAMBOU (« Les Principes Retrouvés ») — une théorie de l'intelligibilité et son application au droit constitutionnel — avec un ton de revue de recherche.

## 2. Pour qui (utilisateurs cibles)

**Persona principal — « Le magistrat / l'universitaire »**
- Magistrats constitutionnels, juges, avocats au Conseil constitutionnel.
- Universitaires en droit public, doctorants, chercheurs en épistémologie.
- Lit sur mobile autant que sur desktop, souvent depuis l'Afrique francophone (Brazzaville, réseau OHADA) et l'international.
- Attend du sérieux, des sources, une présentation sobre. Méfiant face au marketing. Veut pouvoir **télécharger** des documents de travail et **citer** l'œuvre.

**Personas secondaires**
- **Institutions** (cours constitutionnelles, ministères, barreaux) cherchant une formation → demandent un **devis institutionnel**.
- **Pairs / passeurs académiques** (réseau international listé dans le document maître) recevant le Working Paper.
- **Journalistes / médias** (Les Dépêches de Brazzaville…) cherchant le contexte de l'œuvre.

## 3. Problème résolu

L'œuvre théorique de l'auteur a besoin d'un **point d'ancrage public, crédible et pérenne** : un lieu qui (a) expose la doctrine avec rigueur, (b) met à disposition les documents de circulation académique (Working Papers, guides), (c) présente l'offre de formation professionnelle, et (d) inspire l'autorité d'un institut de recherche — sans ressembler à une vitrine commerciale.

## 4. Stade actuel

- **Conception terminée** côté contenu : un document maître (cahier des charges) très détaillé existe, avec textes validés, charte graphique et arborescence.
- **Développement : non commencé.** On part de zéro.
- **Livrable immédiat = MAQUETTE (v1)** pour validation par le client (l'auteur) avant déploiement.

## 5. Les 9 pages (périmètre fonctionnel v1)

| # | Page | Fichier | Rôle |
|---|---|---|---|
| 1 | Accueil | `index.html` | Hero (logo, titre, accroche, formule), **Pyramide de Σ interactive (animation Méthode M)**, CTA vers les Tomes et le Working Paper |
| 2 | Manifeste | `manifeste.html` | Exposé doctrinal en 6 sections + citation canonique de la Maât |
| 3 | Note Épistémologique | `epistemologie.html` | 6 sections : fondements rationnels, 2 principes suprêmes, processus ternaire, tableau des découvertes, critique de l'inversion, décolonisation méthodologique |
| 4 | L'Ouvrage | `ouvrage.html` | Tomes I & II (cartes) + table des matières définitive (accordéon) + état de la doctrine |
| 5 | Laboratoire Doctrinal | `laboratoire.html` | 4 ressources PDF (Working Paper, guide, note, fiche technique/lead magnet) |
| 6 | Concepts Stabilisés | `concepts.html` | Grille de 9 cartes (définition + formulation canonique + liens croisés) |
| 7 | Formation | `formation.html` | Présentation des 3 modules + CTA « Demander un devis institutionnel » |
| 8 | Extraits (Freemium) | `extraits.html` | Accès gratuit (3 PDF) + chapitres verrouillés (🔒) + CTA accès complet |
| 9 | Contact | `contact.html` | Formulaire (nom, email, objet, message) + captcha |

Header (9 liens) et footer **identiques** sur toutes les pages. Pages légales (`mentions-legales.html`, `confidentialite.html`) en placeholders.

## 6. Parcours utilisateur clés

1. **Découverte doctrinale** : Accueil → Manifeste → Concepts Stabilisés → L'Ouvrage.
2. **Téléchargement académique** : Accueil/CTA → Laboratoire Doctrinal → télécharge le Working Paper N°1.
3. **Demande de formation** : Formation → CTA devis → Contact (objet = `formation`).
4. **Prise de contact générale** : n'importe quelle page → Contact.

## 7. Footer unifié (contenu validé)

- Texte : « © 2026 Gaudéric MAMBOU — Recherche indépendante. Brazzaville, République du Congo. »
- Liens : Mentions légales & Politique de confidentialité (RGPD).
- Licence : « Les contenus théoriques sont diffusés à titre de référence académique. Toute citation doit respecter les normes universitaires en vigueur. »

## 8. SEO (référence)

- **Title (Accueil)** : `Les Principes Retrouvés | Gaudéric MAMBOU | Épistémologie et Droit Constitutionnel`
- **Meta description** : « Œuvre indépendante formalisant l'équation universelle du réel et le principe de proactivité judiciaire encadrée depuis Brazzaville. »
- **Mots-clés** : Gaudéric Mambou, Fiction de clôture, Proactivité judiciaire, Désadhérence réflexive, Maât épistémologie, Droit constitutionnel africain, Brazzaville.
- `sitemap.xml` + `robots.txt` requis.

## 9. Critères de succès de la v1 (maquette)

- Le client reconnaît immédiatement le ton « revue académique » voulu.
- Les 8 pages sont navigables et fidèles à la charte (palette, polices, logo animé).
- Rendu impeccable sur mobile.
- Aucune fonctionnalité hors périmètre (pas de paiement, pas de compte).
- Les zones de contenu non encore fournies sont des **placeholders propres**, pas du texte inventé.

## 10. Hors périmètre v1

Voir `feature-backlog.md` — notamment : paiement en ligne (Stripe/CinetPay), espace membre / freemium gated, traduction EN, back-end du formulaire. Ces éléments sont **présentés ou simulés** en maquette, pas fonctionnels.

# Lot 2 — Espace utilisateurs : rapport de recette

Environnement : serveur de développement (`next dev`, port 3004), base PostgreSQL dédiée `principes_lot2` (copie de la production locale), e-mails écrits dans `.dev-emails/` (`EMAIL_TRANSPORT=fichier`), Chrome via Playwright. Aucun e-mail réel n'a été envoyé ; aucune mise en production.

## 1. Tests automatisés (`web/tests/espace-utilisateurs.spec.ts`)

Lancement : serveur démarré avec `EMAIL_TRANSPORT=fichier ESPACE_LIMITE_MULT=50`, puis
`BASE=http://localhost:3004 ADMIN_EMAIL=… ADMIN_PASSWORD=… PW_CHANNEL=chrome npx playwright test tests/espace-utilisateurs.spec.ts`.
(`ESPACE_LIMITE_MULT` relève les plafonds de débit pour que la suite ne se bloque pas elle-même ; il vaut 1 par défaut.)

| # | Parcours | Résultat |
|---|---|---|
| 1 | Page présente, 11ᵉ entrée du menu, textes du prototype, aucune mention « prototype / démonstration », navigation existante intacte | réussi |
| 2 | Création de compte ; connexion refusée avant vérification ; vérification par le lien reçu ; mauvais mot de passe refusé ; connexion ; cookie de session dédié et httpOnly (pas de cookie du back-office) ; déconnexion | réussi |
| 3 | Mot de passe oublié, e-mail, réinitialisation, reconnexion avec le nouveau mot de passe | réussi |
| 4 | Accès protégé : routes du compte refusées sans session (401) ; routes natives de Payload fermées pour les lecteurs (404) ; liste et export refusés aux non-administrateurs (403) | réussi |
| 5 | Anti-robots : champ piège et envoi trop rapide refusés (400) | réussi |
| 6 | Demande de service et proposition de collaboration sans compte ; identifiant `SRV-…` / `COL-…` ; accusé de réception reçu | réussi |
| 7 | Compte connecté : demande rattachée, visible dans l'Espace lecteur avec son statut ; modification de la ville ; suppression refusée avec un mauvais mot de passe puis acceptée ; le compte n'existe plus | réussi |
| 8 | Administration : demandes visibles, statistiques par pays et ville, export CSV ; un compte lecteur ne peut pas ouvrir de session d'administration | réussi |

Résultat final : **8 / 8**. Les parcours 1 à 7 ont été validés dans un même passage ; le parcours 8 a été rejoué seul après correction du test (l'export doit être appelé depuis la page d'administration, avec les en-têtes de navigateur).

## 2. Vérifications manuelles

- **Limitation de débit** : au-delà de 5 demandes en 10 minutes depuis la même adresse, la route renvoie 429 et la page affiche « Trop de tentatives… » (observé lors d'un passage de la suite sans multiplicateur).
- **Affichage** : ordinateur 1280 px (menu sur deux lignes avec 11 entrées, comme le prototype) et mobile 390 px (formulaires en une colonne).
- **Journal de sécurité** : inscriptions, vérifications, connexions et échecs, déconnexions, demandes, exports sont inscrits sans mot de passe ni adresse IP en clair.
- **Types, lint, build** : `npx tsc --noEmit`, `eslint` et `next build` passent (voir le résultat du build dans la pull request).

## 3. Critères du cahier (§ 11) non couverts ou à valider

| Critère | État |
|---|---|
| Sauvegarde et restauration | hors forfait, non traité |
| Permissions administrateur par rôle (gestionnaire, secrétariat) | règles d'accès codées ; seule la session `administrateur` a été rejouée en test automatisé |
| Exactitude des statistiques | calcul vérifié sur la base de recette (comptes vérifiés uniquement) ; pas de test automatisé |
| Envoi réel des e-mails (Resend) | non testé, nécessite les clés du client |
| Turnstile | actif seulement si les clés sont renseignées ; non testé |
| Rectification / suppression par l'administration | disponibles dans Payload ; non rejoué |
| Politique de confidentialité, durées de conservation, responsable du traitement | à fournir par le client avant ouverture |
| Formulaire « Soutenir le projet » du prototype | non repris (hors des quatre rubriques du cahier) |

## 4. Points signalés

- Le texte « Son activation interviendra après la mise en place du système de comptes… » de l'Espace lecteur du prototype n'est pas repris : il serait faux maintenant que l'espace est actif.
- Cartes et panneaux du prototype conservés mot pour mot, mentions « prototype » et « démonstration » retirées, ainsi que la note sur l'authentification « à raccorder ».
- L'anonymisation des demandes à la suppression d'un compte est codée mais pas vérifiée par un test automatisé (choix à valider, voir l'architecture, § 8).

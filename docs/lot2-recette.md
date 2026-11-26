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
| 8 | Administration : demandes visibles, page de statistiques, export CSV ; un compte lecteur ne peut pas ouvrir de session d'administration | réussi |
| 9 | Rôles : le secrétariat lit et fait avancer les demandes (statut, note) mais ne peut ni réécrire leur contenu, ni supprimer, ni exporter, ni lire le journal, ni gérer les comptes du back-office ; le gestionnaire exporte et lit le journal mais ne peut pas supprimer ; la création publique de compte reste fermée même avec un jeton d'administrateur | réussi |
| 10 | Export CSV : nombre de lignes et de comptes vérifiés cohérents avec la base ; chaque export ajoute une entrée au journal | réussi |
| 11 | Limitation de débit : la route renvoie 429 au-delà du plafond | réussi |

Résultat final : **11 / 11**, dans un même passage. Le test existant `contenu-editable.spec.ts` (édition de contenu depuis le back-office) passe aussi : pas de régression sur les pages existantes.

## 2. Vérifications manuelles

- **Affichage** : ordinateur 1280 px (menu sur deux lignes avec 11 entrées, comme le prototype) et mobile 390 px (formulaires en une colonne).
- **Journal de sécurité** : inscriptions, vérifications, connexions et échecs, déconnexions, demandes, exports sont inscrits sans mot de passe ni adresse IP en clair.
- **Types, lint, build** : `npx tsc --noEmit`, `eslint` et `next build` passent. Le build local doit être lancé avec une base injoignable (`DATABASE_URL` factice), comme le build Docker : avec la base de recette, Payload pose une question interactive à cause de l'historique de mode développement.

## 3. Critères du cahier (§ 11) non couverts ou à valider

| Critère | État |
|---|---|
| Sauvegarde et restauration | hors forfait, non traité |
| Permissions par rôle | testées pour secrétariat et gestionnaire (test 9) |
| Exactitude des statistiques | export et décompte des comptes vérifiés vérifiés par test (10) ; l'affichage du tableau par pays/ville n'a été contrôlé que par la présence de la page |
| Envoi réel des e-mails (Resend) | non testé, nécessite les clés du client |
| Turnstile | actif seulement si les clés sont renseignées ; non testé |
| Rectification / suppression par l'administration | suppression d'un compte par l'administrateur et rectification non rejouées ; suppression par la personne testée (7) |
| Politique de confidentialité, durées de conservation, responsable du traitement | à fournir par le client avant ouverture |
| Formulaire « Soutenir le projet » du prototype | non repris (hors des quatre rubriques du cahier) |

## 4. Points signalés

- Le texte « Son activation interviendra après la mise en place du système de comptes… » de l'Espace lecteur du prototype n'est pas repris : il serait faux maintenant que l'espace est actif.
- Cartes et panneaux du prototype conservés mot pour mot, mentions « prototype » et « démonstration » retirées, ainsi que la note sur l'authentification « à raccorder ».
- L'anonymisation des demandes à la suppression d'un compte est vérifiée par le test 7 (choix à valider, voir l'architecture, § 8).

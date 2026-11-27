# Lot 3 — Librairie : choix techniques (à valider par le client)

Document rédigé avant l'implémentation, à partir de la fiche technique « Mise en place de la librairie et du dispositif de vente ». Les points marqués **[à confirmer]** dépendent d'informations commerciales qu'aucune documentation publique ne fournit : ils doivent être confirmés par écrit auprès du prestataire avant l'ouverture à la vente.

## 1. Principe

Deux circuits distincts, clairement séparés sur chaque fiche d'ouvrage :

| | Numérique (PDF) | Imprimé (impression à la demande) |
|---|---|---|
| Vente et paiement | Chariow (page produit hébergée) | Site + prestataire de paiement (CinetPay, mode test) |
| Livraison | Chariow : le PDF est délivré après paiement, sans lien public permanent | Impression après paiement, expédition suivie par statuts |
| Trace sur le site | Ventes enregistrées via les notifications Chariow (Pulses) | Collection « Commandes d'ouvrages » |
| Prix | Défini dans Payload (affichage) **et** dans Chariow (prix réellement facturé) | Défini dans Payload, frais de livraison par zone |

Le site ne stocke jamais le PDF commercial : le fichier est téléversé dans le produit Chariow, qui en assure la livraison sécurisée. Aucune URL publique du site ne donne accès au fichier.

La librairie reste une section du site doctrinal : fiches sobres, charte V16 (colonne 1100 px), aucun ressort commercial (pas de compte à rebours, de promotion ni de bandeau). Les textes de présentation de la page « Les ouvrages » sont réutilisés tels quels.

## 2. Fiche commerciale par tome

Routes : `/librairie` (les deux ouvrages), `/librairie/tome-i`, `/librairie/tome-ii`. Chaque fiche présente : couverture (sans déformation, dimensions réelles du fichier), titre complet, auteur « Gaudéric MAMBOU — Juriste, Chercheur indépendant en épistémologie juridique », présentation, apport scientifique et doctrinal (paragraphes « diptyque » existants), informations bibliographiques, trois lignes de prix distinctes (PDF, imprimé, frais de livraison), conditions d'achat et de livraison, et les deux boutons.

Tout est éditable : le produit (titres, prix, liens, bibliographie, conditions) dans la collection **Ouvrages (produits)** ; les libellés de la librairie dans la page éditable « Librairie » (registre `content/blocs/librairie.ts`) ; la présentation et l'apport doctrinal restent ceux de la page « Les ouvrages ».

Un format dont le prix n'est pas renseigné n'est pas proposé à la vente : la fiche indique « Prix non encore déterminé » (l'état actuel du prix papier). Aucun tarif n'est inventé : les prix définitifs seront ceux validés par l'auteur.

## 3. Circuit numérique — Chariow

Ce que la documentation Chariow (chariow.dev) établit :

- Pages produit hébergées ; l'achat se fait sur Chariow (bouton « Acheter la version numérique » → lien du produit, saisi dans Payload).
- Notifications automatisées (« Pulses ») : requête HTTPS POST signée (en-tête `x-chariow-signature`, HMAC-SHA256 du corps brut avec le secret `whsec_…` de la Pulse), identifiant de livraison `x-pulse-delivery-id` pour l'idempotence, événements `successful.sale`, `failed.sale`, `abandoned.sale`. Le corps contient la vente (montant, devise, frais de plateforme et de paiement, net dû, dates), le produit et l'acheteur (nom, e-mail, téléphone, pays).
- API de consultation : `GET /v1/sales` et `GET /v1/sales/{id}`.

**Ce que nous implémentons** : un point d'entrée `/api/webhook/chariow-ventes` qui vérifie la signature, déduplique sur `x-pulse-delivery-id`, rattache la vente au tome par l'identifiant produit Chariow (champ de la fiche produit Payload) et l'enregistre dans **Ventes numériques**, en créant ou mettant à jour l'acheteur. Pour l'activer : créer dans Chariow une Pulse (Automations › Pulses) vers `https://lesprincipesretrouves.com/api/webhook/chariow-ventes`, événement `successful.sale`, et placer son secret dans `CHARIOW_PULSE_SECRET`.

Si la Pulse n'est pas créée, la consultation des ventes se fait dans le tableau de bord Chariow (Ventes) : la fiche d'ouvrage et l'achat fonctionnent sans elle.

**Non documenté publiquement [à confirmer auprès de Chariow]** : mécanisme exact de livraison du PDF (lien signé, durée, nombre de téléchargements — la vente expose seulement un compteur `download`), pays et moyens de paiement acceptés (Congo-Brazzaville, Mobile Money par opérateur, cartes internationales), devises acceptées, grille des commissions, calendrier de versement. La documentation montre que le montant net dû (`settlement.amount`), les frais (`service_fee`, `payment_fee`) et la date prévue de versement (`due_at`) existent par vente ; leurs valeurs n'ont pas de barème public. Le courriel de confirmation et l'espace « Mes achats » (Customer Portal) sont fournis par Chariow.

## 4. Circuit imprimé

### 4.1 Parcours

Fiche › « Commander l'édition imprimée » › formulaire (tome — fixé par la fiche —, quantité, coordonnées, adresse complète, pays) › récapitulatif (prix × quantité + frais de la zone) › acceptation des conditions › paiement › page de suivi de commande (`/librairie/commande/<identifiant>`) › courriels.

L'adresse de suivi utilise l'identifiant (UUID, non devinable) de la commande, comme le tunnel existant des modules.

### 4.2 Frais de livraison

Grille éditable par zone (Payload › Librairie › Réglages) : nom de la zone, pays (codes ISO), frais pour le premier exemplaire, frais par exemplaire supplémentaire, délai indicatif. Une zone sans frais renseignés n'est pas proposée (la commande est refusée avec un message : « Livraison vers ce pays : nous contacter »). Zones initiales créées vides, **tarifs à fournir par l'auteur** : Congo-Brazzaville, Afrique centrale et de l'Ouest, Europe, reste du monde. Ces frais dépendent de l'imprimeur et du transporteur retenus (§5).

### 4.3 Prestataire de paiement proposé : CinetPay

Choix : **CinetPay** (agrégateur africain : Mobile Money et cartes bancaires sur une page hébergée), car il vise la clientèle du Congo ; l'architecture (`lib/payment/`) permet de substituer un autre prestataire (Flutterwave, Stripe pour les cartes en EUR) sans toucher au tunnel.

- Intégration : API d'initialisation (`/v2/payment`) → redirection ; notification serveur (`notify_url`) ; **revérification systématique** via `/v2/payment/check` avant de marquer la commande payée (une notification seule ne valide jamais) ; au retour sur la page de suivi, la commande en attente est revérifiée de la même façon, ce qui fonctionne même si la notification n'arrive pas.
- Mode test : variables `CINETPAY_API_KEY`, `CINETPAY_SITE_ID` (clés du compte de test), `CINETPAY_MODE=test`. `LIBRAIRIE_PAIEMENT=cinetpay` les active. Sans elles, le fournisseur « mock » (paiement simulé, développement et recette) est utilisé ; il est **refusé en production**. Aucun paiement réel n'est exécuté dans ce lot.
- Devises : l'API CinetPay facture en XAF/XOF (et d'autres, dont USD). Les prix du site sont en euros ; le franc CFA (BEAC) a une parité fixe avec l'euro (1 € = 655,957 XAF), le montant est converti à cette parité, arrondi au multiple de 5 XAF au-dessus (exigence de l'API). Le taux est un champ éditable.
- **À confirmer auprès de CinetPay** (la documentation n'a pas pu être consultée lors de la rédaction) : couverture du Congo-Brazzaville et des opérateurs (MTN, Airtel), acceptation des cartes étrangères, commissions, délais et modalités de versement, ouverture d'un compte marchand pour une personne physique ou une structure, existence d'un bac à sable.

### 4.4 Modalités d'encaissement, devises, commissions, reversement (synthèse)

| | Chariow (PDF) | CinetPay (imprimé) |
|---|---|---|
| Acheteur au Congo | Selon les moyens activés par Chariow pour le pays **[à confirmer]** | Mobile Money (MTN, Airtel) et cartes, en XAF **[à confirmer]** |
| Acheteur à l'étranger | Selon le pays de l'acheteur, conversion de devise avec marge propre à Chariow | Carte bancaire, conversion à la charge du prestataire **[à confirmer]** |
| Commission | Frais de plateforme + frais de paiement, visibles par vente (`settlement`) ; barème non public | Barème contractuel, à demander |
| Reversement | Net dû par vente, date prévue visible ; modalités de retrait non publiques | Reversement sur compte Mobile Money ou bancaire de l'auteur, périodicité à demander |

Recommandation : demander aux deux prestataires, avant lancement, une confirmation écrite sur ces cinq lignes, puis la reporter ici.

## 5. Impression à la demande et livraison

Constat : Tome I est une édition numérique stabilisée « sans ISBN » (pré-BAT) ; les plateformes d'impression à la demande internationales exigent en général un fichier d'impression conforme, et plusieurs un ISBN. Aucun stock initial n'est constitué.

Dispositif proposé, en deux temps :

1. **Lancement (manuel, sans dépendance)** : la commande payée apparaît dans l'administration (statut « Payée ») ; l'auteur ou son collaborateur reçoit le courriel de notification, passe la commande à l'imprimeur (imprimeur local à Brazzaville pour le Congo ; sinon imprimeur à la demande européen avec expédition directe), fait avancer les statuts : **Payée › En impression › Expédiée › Livrée** (ou Annulée / Remboursée), renseigne transporteur, numéro de suivi et date d'expédition. L'acheteur reçoit un courriel à l'expédition.
2. **Évolution** : si le volume le justifie, brancher l'API d'un imprimeur à la demande à l'état « Payée ». Hors de ce lot.

Le choix de l'imprimeur, le prix de revient et le prix public de l'édition imprimée sont à arrêter par l'auteur (le prix doit couvrir production et livraison).

## 6. Données et administration (Payload, groupe « Librairie »)

| Collection / global | Rôle |
|---|---|
| Ouvrages (produits) | Fiche, prix des deux formats, lien et identifiant produit Chariow, bibliographie, conditions |
| Commandes d'ouvrages | Commandes imprimées : acheteur, adresse, lignes, total, statut, suivi d'expédition |
| Paiements | Une ligne par tentative (prestataire, référence, montant, statut) |
| Ventes numériques | Ventes Chariow reçues par notification |
| Acheteurs | Fichier de contacts (créé par les deux circuits) |
| Réclamations | Formulaire public `/librairie/reclamation`, statut de traitement |
| Réglages (global) | Grille de livraison par zone, taux XAF, e-mail de l'auteur |

Tout est réservé aux comptes de l'administration. Aucun accès public en lecture. Les migrations sont versionnées (`push: false`).

Remplacement du fichier PDF : dans Chariow (produit › fichier), pas sur le site ; le champ « note interne » de la fiche permet de consigner la version.

## 7. Sécurité et conformité

- Pas de lien public vers un PDF ; aucun fichier commercial dans `public/`.
- Webhooks : signature vérifiée (Chariow) ; revérification serveur (CinetPay) ; idempotence.
- Limitation de débit sur les formulaires ; consentement explicite aux conditions ; données minimales ; pas de numéro de carte sur le site.
- Les courriels transitent par Resend (variables existantes) ; sans configuration, l'envoi est ignoré et consigné.

## 8. Variables d'environnement

`LIBRAIRIE_PAIEMENT` (`cinetpay`, sinon prestataire simulé ; le simulé est refusé en production), `CINETPAY_API_KEY`, `CINETPAY_SITE_ID`, `CINETPAY_SECRET_KEY`, `CINETPAY_MODE`, `CHARIOW_PULSE_SECRET`, `LIBRAIRIE_AUTEUR_EMAIL` (repli : `CONTACT_INBOX_EMAIL`), `RESEND_API_KEY`, `RESEND_FROM`.

## 9. Décisions à valider par le client

1. Prix de l'édition imprimée et grille de frais par zone.
2. Imprimeur et transporteur.
3. CinetPay comme prestataire de l'imprimé, sous réserve des confirmations du §4.3.
4. Création de la Pulse Chariow pour l'enregistrement automatique des ventes numériques.
5. Prix numériques : 69 € (Tome I) et 59 € (Tome II) sont ceux déjà publiés ; ils doivent être identiques dans Chariow.

## 10. Accès, pages existantes et conformité

- **Accès** : lien « La librairie » dans le pied de page (libellé éditable dans Site › Navigation) et dans le sitemap ; lien « Fiche de l'ouvrage et édition imprimée » sous le bouton d'achat des pages de lecture. Le menu principal garde ses dix entrées (structure fixée par le document de synthèse) ; l'ajout d'une onzième entrée est une décision éditoriale à valider.
- **Page « Les ouvrages »** : inchangée, textes compris (consigne client). Ses cartes mènent toujours à Chariow ; la fiche de chaque ouvrage est le point d'entrée complet des deux circuits.
- **CGV** : la page existante concerne les modules de formation ; elle n'a pas été modifiée. Les conditions d'achat et de livraison des ouvrages sont portées par les fiches (champs éditables). Si le client souhaite un texte unique, la page CGV devra être rédigée par lui : aucun texte juridique n'a été inventé.
- **Textes** : tous les libellés de la librairie, des courriels et du suivi de commande sont éditables (Pages › La librairie). Seuls les intitulés techniques de l'administration restent dans le code.

# Guide : suivre et gérer les ventes (Gaudéric MAMBOU)

Tout se fait dans l'administration du site, `/admin`, groupe **Librairie**.

## Les fiches et les prix

**Librairie › Ouvrages (produits)** : une fiche par tome.
- *Prix de l'édition numérique* : il doit être identique au prix du produit dans Chariow.
- *Lien d'achat* : adresse de la page produit Chariow ; vide, le bouton n'apparaît pas.
- *Édition imprimée* : saisir le prix de l'exemplaire et cocher « Ouvrir les commandes ». Tant que le prix est vide, la fiche indique « Prix non encore déterminé ».
- *Informations bibliographiques* : éditeur, date, pagination, ISBN, uniquement lorsqu'ils sont établis.

La présentation de chaque tome est celle de la page « Les ouvrages » (Pages › Les ouvrages). Les libellés de la librairie sont dans Pages › La librairie.

## Le fichier PDF

Le PDF se téléverse et se remplace **dans Chariow** (produit › fichier), jamais sur le site. Notez la version dans le champ « Note interne » de la fiche.

## Les frais de livraison

**Librairie — réglages** : une ligne par zone (pays par codes ISO), frais du premier exemplaire et des suivants. Une zone sans tarif n'est pas proposée : l'acheteur est invité à écrire.

## Une commande imprimée

1. L'acheteur paie : la commande passe à **Payée** et vous recevez un courriel.
2. Faites imprimer l'exemplaire, puis passez le statut à **En impression**.
3. À l'envoi : statut **Expédiée**, avec transporteur et numéro de suivi. L'acheteur reçoit un courriel.
4. À la réception : **Livrée**. En cas d'annulation ou de remboursement : **Annulée** / **Remboursée**.

L'acheteur suit sa commande par le lien reçu par courriel.

## Les ventes numériques

- Référence : le tableau de bord Chariow (onglet Ventes), avec montants, frais et versements.
- Copie automatique sur le site : **Ventes numériques (Chariow)**, si la notification Chariow a été créée (voir `lot3-librairie.md` §3).

## Paiements, acheteurs, réclamations

- **Paiements** : une ligne par tentative de paiement imprimé, avec la référence du prestataire.
- **Acheteurs** : fichier des contacts des deux circuits.
- **Réclamations** : messages du formulaire public ; changez le statut (Nouvelle › En cours › Résolue) et consignez la suite donnée.

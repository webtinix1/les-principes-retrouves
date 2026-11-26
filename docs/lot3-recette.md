# Lot 3 — Librairie : recette

Paiements en **mode test uniquement** : aucun paiement réel n'a été ni ne peut être exécuté avec la configuration livrée (prestataire simulé ; CinetPay inactif sans clés).

## 1. Mise en route de la recette

```powershell
cd web
# base locale dédiée, serveur sur le port 3005
yarn dev -p 3005
$env:BASE="http://localhost:3005"; $env:ADMIN_EMAIL="…"; $env:ADMIN_PASSWORD="…"
$env:CHARIOW_PULSE_SECRET="<même valeur que dans .env du serveur>"   # facultatif : active le test du webhook
npx playwright test tests/librairie.spec.ts
```

Le test prépare puis **remet en l'état** : prix imprimé et lien Chariow d'essai, tarifs de la zone Congo-Brazzaville. Il crée des données de recette (commandes, acheteurs, réclamations) sur l'adresse `@example.com`.

## 2. Tests automatisés (`web/tests/librairie.spec.ts`)

| # | Vérification |
|---|---|
| 1 | Fiche du tome : auteur exact, titre complet, couverture sans déformation, deux formats avec prix distincts, mention des frais de livraison, aucun lien PDF |
| 2 | Circuit numérique : « Acheter la version numérique » pointe vers le lien Chariow du tome, nouvel onglet, `noopener` |
| 3 | Webhook Chariow : signature invalide refusée (401), vente signée enregistrée et rattachée au tome, rejeu ignoré (si `CHARIOW_PULSE_SECRET` fourni) |
| 4 | Circuit imprimé : choix du tome, quantité, coordonnées, adresse, calcul des frais par zone (2 × 30 € + 7 € = 67 €), pays sans tarif refusé, paiement simulé, commande « Payée », numéro, paiement, acheteur créés, suivi « En impression » puis « Expédiée » avec numéro de suivi |
| 5 | API : commande refusée sans tarif de livraison ou sans consentement |
| 6 | Réclamation enregistrée |

## 3. Contrôles manuels (à faire par le client avant l'ouverture)

| Contrôle | Attendu |
|---|---|
| `/librairie`, `/librairie/tome-i`, `/librairie/tome-ii` sur mobile et ordinateur | Colonne de 1100 px, couverture non déformée, deux formats clairement séparés |
| Tome II sans prix papier | « Prix non encore déterminé… », aucun bouton de commande |
| Lien Chariow vide | « L'édition numérique n'est pas encore ouverte à la vente », pas de bouton |
| Achat réel d'un PDF sur Chariow (compte de test Chariow) | Page de paiement Chariow, PDF délivré par Chariow, courriel de Chariow |
| Pulse Chariow créée vers `/api/webhook/chariow-ventes` | La vente apparaît dans « Ventes numériques » ; la livraison rejouée depuis Chariow n'est pas doublée |
| `LIBRAIRIE_PAIEMENT=cinetpay` avec clés de test | Redirection vers la page CinetPay ; au retour, la commande passe à « Payée » après vérification serveur ; refus → commande restée « En attente de paiement » |
| Courriels (`RESEND_API_KEY`, `RESEND_FROM`) | Confirmation à l'acheteur, notification à Gaudéric MAMBOU, courriel d'expédition au passage à « Expédiée » |
| Administration | Groupe « Librairie » : produits, commandes, paiements, ventes, acheteurs, réclamations, réglages |

## 4. Points non vérifiables sans comptes

- Comportement réel de CinetPay (couverture du Congo, cartes étrangères, signature des notifications) : intégration écrite d'après l'API publique, non exécutée contre le service.
- Format exact des notifications Chariow en conditions réelles : conforme à leur documentation, non exécuté contre Chariow.
- Livraison, délai et mécanisme de lien du PDF : relèvent de Chariow.
- Envoi réel des courriels : sans `RESEND_API_KEY`, l'envoi est ignoré (journal serveur) ; les champs « Courriel à l'acheteur / à Gaudéric MAMBOU » de la commande indiquent le résultat.

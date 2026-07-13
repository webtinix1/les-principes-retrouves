# Cadrage — Intégration paiement Chariow

> Étude préalable (2026-07-09) suite à la piste **Chariow** pour le paiement des
> modules de formation, en remplacement/complément du stub CinetPay.
> Sources : `https://chariow.dev/api-reference/` (+ `llms.txt`), `https://chariow.com`.
> **Rien n'est codé ici ; c'est un cadrage.**

---

## 1. Qu'est-ce que Chariow, et pourquoi c'est pertinent ici

Chariow est une **plateforme SaaS de vente de produits numériques** (fichiers, ebooks,
**cours/formations**, **licences**, bundles, coaching, memberships), **conçue pour les
créateurs africains francophones**.

- **Moyens de paiement** : Mobile Money (**Orange Money, MTN, Wave, Moov, Airtel**) +
  **cartes Visa/Mastercard** + virements. Gère **automatiquement devises et conversions**.
- **Checkout hébergé** : Chariow héberge la page de paiement → **aucune charge PCI** de notre côté.
- **Licences auto-générées** à l'achat (clé type `ABC-123-XYZ-789`), validables par API.
- **Dashboard** : produits, clients, ventes, remises, affiliés, webhooks.
- Positionnement : 200 000+ créateurs, témoignages Côte d'Ivoire, Cameroun, Sénégal, Bénin,
  Mali, Burkina — marché **UEMOA/CEMAC**.

**Adéquation** : nos 3 modules = produits numériques/licences ; le public est en zone Afrique
centrale (Congo, **XAF**). Chariow couvre nativement le Mobile Money local — c'est **plus simple
et plus adapté qu'une intégration CinetPay brute** (checkout hébergé, conversion gérée).

---

## 2. Bonne nouvelle : notre architecture est déjà prête

Au Lot 4, le paiement a été construit derrière une **abstraction** (`lib/payment/`) :
`PaymentProvider.createCheckout()` + un `MockProvider` + un squelette `CinetPay`, sélectionnés
par `PAYMENT_PROVIDER`. **Chariow se branche comme un provider de plus**, sans toucher au tunnel,
aux modèles, ni au back-office.

```
lib/payment/
├── types.ts        # interface PaymentProvider (inchangée)
├── mock.ts         # simulé (dev)
├── cinetpay.ts     # squelette (peut rester en fallback ou être retiré)
├── chariow.ts      # NOUVEAU → appelle l'API Chariow
└── index.ts        # getPaymentProvider() : "mock" | "cinetpay" | "chariow"
```

---

## 3. L'API Chariow — points utiles

- **Base** : `https://api.chariow.com/v1` · **Auth** : `Authorization: Bearer sk_live_…`
  (clé **serveur uniquement**, jamais côté client) · **Rate limit** : 100 req/min.
- **Checkout** — `POST /v1/checkout` :
  - Entrée : `product_id` (créé dans le dashboard Chariow), `email`, `first_name`, `last_name`,
    **`phone.number` + `phone.country_code`** (requis), optionnels : `payment_currency`,
    `redirect_url`, **`custom_metadata`** (≤ 10 clés — pour passer notre `commande_id`), `discount_code`.
  - Sortie : `data.step` (`payment` | `completed` | `already_purchased`), `data.purchase`
    (sale : `id`, `status` = `awaiting_payment|completed|failed|refunded`, montant),
    `data.payment.checkout_url` (**URL de redirection**) + `transaction_id`.
- **Sales** — `GET /v1/sales/{id}` : re-vérifier le statut réel d'une vente (réconciliation fiable).
- **Licenses** — `GET /v1/licenses/{key}` (valider : `is_active`, `is_expired`),
  `activate-license`, `revoke-license`, `get-activations`, `list`. Une licence est liée à
  une vente + un client + un produit.
- **Webhooks (« Pulses »)** — événements : `successful.sale`, `abandoned.sale`, `failed.sale`,
  `license.issued`, `license.activated`, `license.expired`, `license.revoked`, `affiliate.joined`.
  Payload : `event` + entité (sale/license) + produit + client + store.
- **Types non supportés par l'API checkout** : pay-what-you-want, Service, Coaching (sans objet
  ici ; nos modules sont des produits/licences classiques).

---

## 4. Modèle d'intégration — 2 options

### Option A — API-driven (recommandée)
On garde **notre tunnel et nos données** ; Chariow ne gère que l'encaissement.
1. Le visiteur remplit notre formulaire `/commander/[module]` (+ **téléphone**, nouveau champ).
2. `api/checkout` crée la `Commande` (statut `en_attente`) puis, via `ChariowProvider`,
   appelle `POST /v1/checkout` avec `custom_metadata={commande_id}` et `redirect_url` vers
   notre page de confirmation → renvoie `checkout_url`.
3. Redirection du visiteur vers la page **Chariow** (Mobile Money / carte).
4. **Webhook** `api/webhook/chariow` reçoit `successful.sale` → on **re-vérifie** via
   `GET /v1/sales/{id}` → `finalizePaidCommande()` (déjà codé : statut `paye`, émission du
   **code d'accès** + e-mail). Le gating du Lot 5 reste inchangé.

> Avantage : design du tunnel maîtrisé, historique complet en base, découplage. Coût : créer
> les produits Chariow + gérer la redirection/webhook.

### Option B — Liens hébergés (le plus simple)
Les CTA des modules pointent directement vers les **pages produit Chariow**. Chariow gère tout ;
notre site n'écoute que le webhook pour **enregistrer la vente / débloquer**. Moins de code, mais
tunnel et collecte d'infos **non maîtrisés** (design Chariow), et historique dépendant de Chariow.

**Recommandation : Option A** (cohérente avec l'existant), avec repli possible sur B si l'on veut
minimiser l'effort.

---

## 5. Codes d'accès : garder les nôtres, ou adopter les licences Chariow ?

- **Garder `CodeAcces` (recommandé au départ)** : émis dans `finalizePaidCommande` au webhook.
  **Zéro changement** au gating/téléchargements du Lot 5. Découplé de la dispo de Chariow.
- **Adopter les licences Chariow** (plus tard, option) : ne plus émettre nos codes ; valider la
  **clé de licence** via `GET /v1/licenses/{key}` dans `lib/access`. Moins à maintenir (Chariow
  émet/révoque), mais **couplage** (chaque téléchargement dépend d'un appel API Chariow) et le
  cas « paiement hors ligne / geste commercial » devient moins souple.

---

## 6. Impacts concrets à prévoir

- **Dashboard Chariow** : créer les **3 modules comme produits** (ou 2 : Module III reste « sur
  devis », hors Chariow). Récupérer les `product_id` → mapper dans `content/modules.ts`
  (`chariow_product_id`) ou une config.
- **Formulaire** : ajouter **téléphone (indicatif pays + numéro)** au `CheckoutForm` (requis par
  l'API). Le régime B2B/B2C peut rester chez nous (2 produits distincts, ou un produit + remise).
- **Réconciliation** : passer `commande_id` en `custom_metadata` ; au webhook, retrouver la
  commande et re-vérifier via `GET /v1/sales/{id}`.
- **Variables d'environnement** : `CHARIOW_API_KEY` (sk_live, serveur), `CHARIOW_WEBHOOK_SECRET`
  (si signature), `CHARIOW_PRODUCT_*` (ou dans les données modules), `PAYMENT_PROVIDER=chariow`.
- **Modèle de données** : ajouter `payment_ref`/`sale_id` Chariow sur `Commande` (déjà un champ
  `payment_ref`). Rien d'autre à changer.

---

## 7. Risques & questions ouvertes (à lever avant de coder)

1. **⚠️ Vérification de signature des webhooks — NON documentée.** Sans elle, un tiers pourrait
   **forger** un webhook « payé ». **Mitigation obligatoire** : ne jamais débloquer sur le seul
   payload → **re-vérifier systématiquement** la vente via `GET /v1/sales/{id}` avec notre clé
   serveur. **Confirmer avec le support Chariow** le mécanisme exact (header/secret/HMAC).
2. **⚠️ Devise XAF & Congo-Brazzaville.** Chariow met en avant l'Afrique de l'Ouest (UEMOA/XOF) ;
   il faut **confirmer que XAF (CEMAC/Congo) et les opérateurs locaux** (MTN/Airtel Congo) sont
   bien pris en charge, **et le payout** vers un compte au Congo. **À valider auprès de Chariow.**
3. **Frais & versements** : commission Chariow, délais et moyen de retrait — **question
   commerciale** pour le client.
4. **Compte marchand / KYC** Chariow à créer (clé `sk_live`, produits).
5. **Sandbox / test** : vérifier l'existence d'un mode test pour la recette (sinon tester avec un
   petit montant réel).

---

## 8. Plan de mise en œuvre (léger — l'archi est prête)

- **P1 — Provider & formulaire** : `ChariowProvider` (`POST /v1/checkout`), champ téléphone au
  `CheckoutForm`, mapping `module → product_id`, variables d'env. `PAYMENT_PROVIDER=mock` tant
  que le compte n'est pas prêt.
- **P2 — Webhook & réconciliation** : `api/webhook/chariow` → re-vérif `GET /v1/sales/{id}` →
  `finalizePaidCommande`. (Le squelette `cinetpay` sert de patron.)
- **P3 — Recette** : parcours complet en conditions réelles (ou sandbox), puis bascule
  `PAYMENT_PROVIDER=chariow`. Conserver `mock` en dev.
- **P4 (option)** : adopter les **licences Chariow** à la place de `CodeAcces`.

**Effort estimé** : faible à moyen (1 provider + 1 webhook + 1 champ de formulaire + config),
précisément parce que le tunnel, les modèles, le gating et le back-office existent déjà.

---

## 9. Décisions à prendre

1. **Chariow confirmé** comme rail de paiement (à la place de CinetPay) ? CinetPay conservé en repli ?
2. **Option A (API-driven)** vs **B (liens hébergés)** ?
3. **Codes d'accès** : garder les nôtres (reco) ou basculer sur les **licences Chariow** ?
4. Prérequis client : **compte Chariow + confirmation XAF/Congo + moyens de paiement + payout**.

*Lié à : `CADRAGE-V2.md` (§4bis, §4ter), `ROADMAP.md` (Lot 4), `integrations.md`.*

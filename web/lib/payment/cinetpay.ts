import type { CheckoutInput, CheckoutResult, PaymentProvider } from "./types";

/**
 * Squelette CinetPay (à activer au reçu du compte marchand — cf. ROADMAP Lot 4).
 * Initialise un paiement et renvoie l'URL de redirection ; la confirmation
 * arrive via app/api/webhook/cinetpay. Tant que les clés ne sont pas fournies,
 * sélectionner ce fournisseur lève une erreur explicite.
 */
export const cinetpayProvider: PaymentProvider = {
  id: "cinetpay",
  async createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
    const apiKey = process.env.CINETPAY_API_KEY;
    const siteId = process.env.CINETPAY_SITE_ID;
    if (!apiKey || !siteId) {
      throw new Error(
        "CinetPay non configuré : renseigner CINETPAY_API_KEY et CINETPAY_SITE_ID.",
      );
    }
    // PLACEHOLDER: appel réel à l'API CinetPay /v2/payment (à implémenter au
    // reçu du compte marchand). Doit renvoyer { kind: "redirect", url, payment_ref }.
    void input;
    throw new Error("Intégration CinetPay à finaliser (Lot 4).");
  },
};

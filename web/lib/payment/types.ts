/** Abstraction du fournisseur de paiement (Lot 4). */

export type CheckoutInput = {
  commande_id: string;
  montant: string;
  devise: string;
  module_titre: string;
  buyer_nom: string;
  buyer_email: string;
};

export type CheckoutResult =
  // Paiement immédiat (MockProvider) : le code peut être émis tout de suite.
  | { kind: "paid"; payment_ref: string }
  // Redirection vers une page de paiement externe (CinetPay) ; la confirmation
  // arrive plus tard via le webhook.
  | { kind: "redirect"; url: string; payment_ref: string };

export interface PaymentProvider {
  readonly id: string;
  createCheckout(input: CheckoutInput): Promise<CheckoutResult>;
}

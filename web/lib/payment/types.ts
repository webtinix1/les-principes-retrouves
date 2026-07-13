/** Abstraction du fournisseur de paiement (Lot 4). */

export type CheckoutInput = {
  commande_id: string;
  module_id: string;
  tarif_type: "b2b" | "b2c" | "devis";
  montant: string;
  devise: string;
  module_titre: string;
  buyer_nom: string;
  buyer_first_name: string;
  buyer_last_name: string;
  buyer_email: string;
  buyer_telephone?: string;
  buyer_pays?: string; // code pays ISO (ex. CG)
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

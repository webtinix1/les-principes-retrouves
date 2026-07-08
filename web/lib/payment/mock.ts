import { randomBytes } from "crypto";
import type { CheckoutInput, CheckoutResult, PaymentProvider } from "./types";

/**
 * Fournisseur simulé : valide le paiement immédiatement. Permet de tester tout
 * le tunnel (commande → code → e-mail) sans compte marchand. Utilisé tant que
 * PAYMENT_PROVIDER n'est pas "cinetpay".
 */
export const mockProvider: PaymentProvider = {
  id: "mock",
  async createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
    const ref = `MOCK-${randomBytes(5).toString("hex").toUpperCase()}`;
    void input;
    return { kind: "paid", payment_ref: ref };
  },
};

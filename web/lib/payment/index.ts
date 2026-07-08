import { mockProvider } from "./mock";
import { cinetpayProvider } from "./cinetpay";
import type { PaymentProvider } from "./types";

/** Sélectionne le fournisseur de paiement selon PAYMENT_PROVIDER (défaut "mock"). */
export function getPaymentProvider(): PaymentProvider {
  return process.env.PAYMENT_PROVIDER === "cinetpay"
    ? cinetpayProvider
    : mockProvider;
}

export type { PaymentProvider, CheckoutInput, CheckoutResult } from "./types";

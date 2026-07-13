import { mockProvider } from "./mock";
import { cinetpayProvider } from "./cinetpay";
import { chariowProvider } from "./chariow";
import type { PaymentProvider } from "./types";

/** Sélectionne le fournisseur de paiement selon PAYMENT_PROVIDER (défaut "mock"). */
export function getPaymentProvider(): PaymentProvider {
  switch (process.env.PAYMENT_PROVIDER) {
    case "chariow":
      return chariowProvider;
    case "cinetpay":
      return cinetpayProvider;
    default:
      return mockProvider;
  }
}

export type { PaymentProvider, CheckoutInput, CheckoutResult } from "./types";

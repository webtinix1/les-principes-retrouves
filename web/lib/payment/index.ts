import { mockProvider } from "./mock";
import { cinetpayProvider } from "./cinetpay";
import { chariowProvider } from "./chariow";
import { chariowProductId } from "@/lib/chariow";
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

/**
 * Le paiement en ligne peut-il réellement aboutir pour ce module ?
 *
 * Évite d'afficher un formulaire voué à l'échec : avec Chariow, un achat n'est
 * possible que si le produit est publié ET mappé (CHARIOW_PRODUCT_MAP). Lu à
 * l'exécution → l'ouverture se fait sans reconstruction dès que la map est
 * renseignée. Les autres fournisseurs (mock, cinetpay) répondent toujours.
 */
export function inscriptionsOuvertes(moduleId: string): boolean {
  if (process.env.PAYMENT_PROVIDER !== "chariow") return true;
  return (
    chariowProductId(moduleId, "b2b") !== null &&
    chariowProductId(moduleId, "b2c") !== null
  );
}

export type { PaymentProvider, CheckoutInput, CheckoutResult } from "./types";

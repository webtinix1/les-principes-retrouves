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

export type Regime = "b2b" | "b2c";

/**
 * Régimes tarifaires réellement achetables pour ce module.
 *
 * Avec Chariow, un régime n'est proposé que si son produit est publié ET mappé
 * (CHARIOW_PRODUCT_MAP) : si seul le B2B est publié, le site n'offre que le B2B
 * plutôt qu'un formulaire à moitié cassé. Lu à l'exécution → s'ouvre sans
 * reconstruction dès que la map change. Mock/cinetpay proposent les deux.
 */
export function regimesDisponibles(moduleId: string): Regime[] {
  if (process.env.PAYMENT_PROVIDER !== "chariow") return ["b2b", "b2c"];
  return (["b2b", "b2c"] as const).filter(
    (r) => chariowProductId(moduleId, r) !== null,
  );
}

/** Le paiement en ligne peut-il aboutir pour ce module (au moins un régime) ? */
export function inscriptionsOuvertes(moduleId: string): boolean {
  return regimesDisponibles(moduleId).length > 0;
}

export type { PaymentProvider, CheckoutInput, CheckoutResult } from "./types";

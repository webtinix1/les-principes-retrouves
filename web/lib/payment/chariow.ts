import { chariowFetch, chariowProductId } from "@/lib/chariow";
import { siteConfig } from "@/lib/site-config";
import type { CheckoutInput, CheckoutResult, PaymentProvider } from "./types";

/**
 * Fournisseur Chariow (API-driven) : initialise un paiement via POST /v1/checkout
 * et renvoie l'URL de la page de paiement hébergée. La confirmation arrive via
 * app/api/webhook/chariow (avec re-vérification GET /v1/sales/{id}).
 */
export const chariowProvider: PaymentProvider = {
  id: "chariow",
  async createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
    const productId = chariowProductId(input.module_id, input.tarif_type);
    if (!productId) {
      throw new Error(
        `Produit Chariow non configuré pour ${input.module_id}/${input.tarif_type} (CHARIOW_PRODUCT_MAP).`,
      );
    }

    const body: Record<string, unknown> = {
      product_id: productId,
      email: input.buyer_email,
      first_name: input.buyer_first_name.slice(0, 50),
      last_name: input.buyer_last_name.slice(0, 50),
      custom_metadata: { commande_id: input.commande_id },
      redirect_url: new URL(
        `/commande/confirmee?c=${input.commande_id}`,
        siteConfig.url,
      ).toString(),
    };
    if (input.buyer_telephone) {
      body.phone = {
        number: input.buyer_telephone.replace(/\D/g, ""),
        country_code: input.buyer_pays || "CG",
      };
    }

    const res = await chariowFetch("/checkout", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Chariow checkout: HTTP ${res.status}`);
    }
    const j = (await res.json()) as {
      data?: {
        step?: string;
        purchase?: { id?: string } | null;
        payment?: { checkout_url?: string; transaction_id?: string };
      };
    };
    const saleId = j.data?.purchase?.id;
    const ref = saleId ?? j.data?.payment?.transaction_id ?? "chariow";

    // Produit gratuit / déjà acheté → paiement immédiat.
    if (j.data?.step === "completed" || j.data?.step === "already_purchased") {
      return { kind: "paid", payment_ref: ref };
    }

    const url = j.data?.payment?.checkout_url;
    if (!url) throw new Error("Chariow : URL de paiement absente.");
    return { kind: "redirect", url, payment_ref: ref };
  },
};

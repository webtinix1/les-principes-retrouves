/**
 * Client léger de l'API Chariow (https://api.chariow.com/v1).
 * Clé serveur uniquement (Bearer sk_live_…). Ne jamais exposer côté client.
 */
const BASE = "https://api.chariow.com/v1";

function apiKey(): string {
  const k = process.env.CHARIOW_API_KEY;
  if (!k) throw new Error("CHARIOW_API_KEY manquant.");
  return k;
}

export async function chariowFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

/**
 * Mapping (module, régime) → identifiant produit Chariow, via l'env
 * CHARIOW_PRODUCT_MAP (JSON), ex :
 * {"fondements_organon":{"b2b":"prd_x","b2c":"prd_y"},"laboratoire_proactivite_juridique":{...}}
 */
export function chariowProductId(module_id: string, tarif_type: string): string | null {
  try {
    const map = JSON.parse(process.env.CHARIOW_PRODUCT_MAP || "{}");
    return map?.[module_id]?.[tarif_type] ?? null;
  } catch {
    return null;
  }
}

export type ChariowSaleStatus =
  | "awaiting_payment"
  | "completed"
  | "failed"
  | "abandoned"
  | "settled";

export type ChariowSale = {
  id: string;
  status: ChariowSaleStatus;
  payment?: { status?: string; transaction_id?: string; gateway?: string };
};

/** Récupère une vente (source de vérité pour la réconciliation du webhook). */
export async function getSale(saleId: string): Promise<ChariowSale | null> {
  try {
    const res = await chariowFetch(`/sales/${encodeURIComponent(saleId)}`, { method: "GET" });
    if (!res.ok) return null;
    const j = (await res.json()) as { data?: ChariowSale };
    return j.data ?? null;
  } catch {
    return null;
  }
}

/** Une vente est-elle réellement payée ? */
export function saleEstPayee(sale: ChariowSale | null): boolean {
  return sale?.status === "completed" || sale?.status === "settled";
}

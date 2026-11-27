/**
 * Client minimal de l'API CinetPay (v2) pour l'édition imprimée.
 * Clés serveur uniquement. Mode test : utiliser les clés d'un compte de test
 * (CINETPAY_MODE=test n'est qu'un indicateur de journalisation).
 *
 *  - initialisation : POST /v2/payment      → payment_url (redirection)
 *  - vérification   : POST /v2/payment/check → statut réel (source de vérité)
 */
const BASE = process.env.CINETPAY_API_URL || "https://api-checkout.cinetpay.com/v2";

export type CinetpayInit = {
  transaction_id: string;
  amount: number;
  currency: "XAF";
  description: string;
  return_url: string;
  notify_url: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  pays: string;
  code_postal?: string;
};

function identifiants() {
  const apikey = process.env.CINETPAY_API_KEY;
  const site_id = process.env.CINETPAY_SITE_ID;
  if (!apikey || !site_id) {
    throw new Error("CinetPay non configuré : renseigner CINETPAY_API_KEY et CINETPAY_SITE_ID.");
  }
  return { apikey, site_id };
}

async function appeler(chemin: string, corps: Record<string, unknown>) {
  const res = await fetch(`${BASE}${chemin}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "lesprincipesretrouves/1.0" },
    body: JSON.stringify(corps),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: res.ok, json };
}

export async function cinetpayInitialiser(i: CinetpayInit): Promise<{ url: string }> {
  const [prenom, ...reste] = i.nom.trim().split(/\s+/);
  const { json } = await appeler("/payment", {
    ...identifiants(),
    transaction_id: i.transaction_id,
    amount: i.amount,
    currency: i.currency,
    description: i.description.slice(0, 120),
    return_url: i.return_url,
    notify_url: i.notify_url,
    channels: "ALL",
    lang: "fr",
    customer_id: i.email,
    customer_name: prenom,
    customer_surname: reste.join(" ") || prenom,
    customer_email: i.email,
    customer_phone_number: i.telephone,
    customer_address: i.adresse,
    customer_city: i.ville,
    customer_country: i.pays.slice(0, 2).toUpperCase(),
    customer_state: i.pays.slice(0, 2).toUpperCase(),
    customer_zip_code: i.code_postal || "00000",
  });
  const data = json.data as { payment_url?: string } | undefined;
  if (json.code !== "201" || !data?.payment_url) {
    throw new Error(`CinetPay initialisation refusée (${String(json.code ?? "?")} ${String(json.message ?? "")})`);
  }
  return { url: data.payment_url };
}

export type CinetpayStatut = { accepte: boolean; refuse: boolean; moyen?: string; brut: string };

/** Statut réel d'une transaction, interrogé auprès de CinetPay. */
export async function cinetpayVerifier(transaction_id: string): Promise<CinetpayStatut> {
  const { json } = await appeler("/payment/check", { ...identifiants(), transaction_id });
  const data = (json.data ?? {}) as { status?: string; payment_method?: string };
  return {
    accepte: json.code === "00" && data.status === "ACCEPTED",
    refuse: data.status === "REFUSED",
    moyen: data.payment_method,
    brut: JSON.stringify({ code: json.code, message: json.message, status: data.status }),
  };
}

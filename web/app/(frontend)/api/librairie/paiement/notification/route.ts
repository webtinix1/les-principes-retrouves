import { NextResponse } from "next/server";
import { payloadClient } from "@/lib/payload";
import { actualiserPaiement } from "@/lib/librairie/commande";

export const runtime = "nodejs";

/**
 * Notification de paiement CinetPay (notify_url). Le contenu reçu n'est jamais
 * cru : on retrouve la transaction par sa référence, puis on interroge
 * CinetPay (/payment/check) avant de marquer la commande payée.
 */
export async function POST(request: Request) {
  let reference = "";
  try {
    const type = request.headers.get("content-type") ?? "";
    if (type.includes("application/json")) {
      const j = (await request.json()) as Record<string, unknown>;
      reference = String(j.cpm_trans_id ?? j.transaction_id ?? "");
    } else {
      const f = await request.formData();
      reference = String(f.get("cpm_trans_id") ?? f.get("transaction_id") ?? "");
    }
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!reference) return NextResponse.json({ ok: false }, { status: 400 });

  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "commandes-ouvrages",
    where: { payment_ref: { equals: reference } },
    limit: 1,
    depth: 0,
  });
  if (!docs[0]) return NextResponse.json({ ok: true, inconnue: true });

  await actualiserPaiement(docs[0].id);
  return NextResponse.json({ ok: true });
}

// CinetPay vérifie parfois l'adresse par un GET.
export const GET = () => NextResponse.json({ ok: true });

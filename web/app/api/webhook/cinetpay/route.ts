import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { finalizePaidCommande } from "@/lib/checkout";

export const runtime = "nodejs";

/**
 * Webhook de confirmation CinetPay (Lot 4 — squelette).
 * Refuse tout tant que CINETPAY_SECRET_KEY n'est pas configuré, pour éviter
 * qu'un appel externe ne valide une commande en mode simulé.
 *
 * À finaliser au reçu du compte marchand :
 *  - vérifier la signature / le token CinetPay (HMAC) ;
 *  - re-vérifier le statut réel via l'API CinetPay /v2/payment/check ;
 *  - puis finaliser la commande correspondante.
 */
export async function POST(request: Request) {
  const secret = process.env.CINETPAY_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Webhook non configuré." },
      { status: 501 },
    );
  }

  // PLACEHOLDER: validation de la signature CinetPay avec `secret`.
  let payload: Record<string, unknown> = {};
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const commande_id = String(payload.commande_id ?? "");
  const payment_ref = String(payload.cpm_trans_id ?? payload.payment_ref ?? "");
  if (!commande_id) return NextResponse.json({ ok: false }, { status: 400 });

  try {
    await finalizePaidCommande(commande_id, payment_ref || `CINETPAY-${commande_id}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook cinetpay]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

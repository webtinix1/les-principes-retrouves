import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { getSale, saleEstPayee } from "@/lib/chariow";
import { finalizePaidCommande } from "@/lib/checkout";

export const runtime = "nodejs";

/**
 * Webhook Chariow (« Pulses »). Sécurité : on ne débloque JAMAIS sur le seul
 * payload — on **re-vérifie** systématiquement la vente via GET /v1/sales/{id}
 * avec notre clé serveur. La vérification de signature (si CHARIOW_WEBHOOK_SECRET
 * est fourni) est appliquée en plus, à titre indicatif.
 */
function verifieSignature(raw: string, signature: string | null): boolean {
  const secret = process.env.CHARIOW_WEBHOOK_SECRET;
  if (!secret || !signature) return true; // non configuré → on s'appuie sur getSale
  try {
    const digest = createHmac("sha256", secret).update(raw).digest("hex");
    const a = Buffer.from(digest);
    const b = Buffer.from(signature.replace(/^sha256=/, ""));
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Extrait l'identifiant de vente Chariow depuis un payload de forme variable. */
function extraitSaleId(p: Record<string, unknown>): string | null {
  const d = (p.data ?? p) as Record<string, unknown>;
  const cand =
    (d.id as string) ||
    ((d.sale as Record<string, unknown>)?.id as string) ||
    ((d.purchase as Record<string, unknown>)?.id as string) ||
    ((d.sale_id as string) ?? "");
  return cand || null;
}

export async function POST(request: Request) {
  const raw = await request.text();
  const sigOk = verifieSignature(
    raw,
    request.headers.get("x-chariow-signature") ?? request.headers.get("x-signature"),
  );
  if (!sigOk) {
    console.warn("[webhook chariow] signature invalide (poursuite via getSale).");
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const saleId = extraitSaleId(payload);
  if (!saleId) {
    // Événement sans vente exploitable (ex. abandoned.sale) → accusé de réception.
    return NextResponse.json({ ok: true, ignored: true });
  }

  // Source de vérité : la vente réellement payée chez Chariow.
  const sale = await getSale(saleId);
  if (!saleEstPayee(sale)) {
    return NextResponse.json({ ok: true, pending: true });
  }

  // Retrouver la commande : par référence de paiement (= sale id posé au checkout),
  // sinon par custom_metadata.commande_id.
  const meta = ((payload.data as Record<string, unknown>)?.custom_metadata ??
    (payload.data as Record<string, unknown>)?.metadata ??
    {}) as Record<string, unknown>;
  const commandeId = (meta.commande_id as string) || null;

  const commande =
    (await prisma.commande.findFirst({ where: { payment_ref: saleId } })) ??
    (commandeId
      ? await prisma.commande.findUnique({ where: { id: commandeId } })
      : null);

  if (!commande) {
    console.warn("[webhook chariow] vente payée sans commande correspondante:", saleId);
    return NextResponse.json({ ok: true, unmatched: true });
  }

  try {
    await finalizePaidCommande(commande.id, saleId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook chariow]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

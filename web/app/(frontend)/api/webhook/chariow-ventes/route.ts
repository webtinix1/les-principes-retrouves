import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { payloadClient } from "@/lib/payload";
import { compterAchat } from "@/lib/librairie/commande";

export const runtime = "nodejs";

/**
 * Notifications Chariow (« Pulses ») pour la vente des PDF.
 * Signature : HMAC-SHA256 du corps brut avec le secret de la Pulse
 * (CHARIOW_PULSE_SECRET), en-tête `x-chariow-signature: sha256=<hex>`.
 * Idempotence : `x-pulse-delivery-id`. Sans secret configuré, le point
 * d'entrée refuse tout (501).
 */
function signatureValide(brut: string, signature: string | null): boolean {
  const secret = process.env.CHARIOW_PULSE_SECRET;
  if (!secret || !signature) return false;
  const attendu = Buffer.from(createHmac("sha256", secret).update(brut).digest("hex"));
  const recu = Buffer.from(signature.replace(/^sha256=/, ""));
  return attendu.length === recu.length && timingSafeEqual(attendu, recu);
}

type Obj = Record<string, unknown>;
const obj = (v: unknown): Obj => (v && typeof v === "object" ? (v as Obj) : {});
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const txt = (v: unknown) => (typeof v === "string" && v ? v : undefined);

const STATUT: Record<string, "payee" | "echouee" | "abandonnee"> = {
  "successful.sale": "payee",
  "failed.sale": "echouee",
  "abandoned.sale": "abandonnee",
};

export async function POST(request: Request) {
  if (!process.env.CHARIOW_PULSE_SECRET) {
    return NextResponse.json({ ok: false, error: "Webhook non configuré." }, { status: 501 });
  }
  const brut = await request.text();
  if (!signatureValide(brut, request.headers.get("x-chariow-signature"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let corps: Obj;
  try {
    corps = JSON.parse(brut) as Obj;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const evenement = request.headers.get("x-pulse-event") ?? txt(corps.event) ?? "";
  const statut = STATUT[evenement];
  if (!statut) return NextResponse.json({ ok: true, ignore: true });

  const livraison = request.headers.get("x-pulse-delivery-id") ?? "";
  const vente = obj(corps.sale);
  const produit = obj(corps.product);
  const client = obj(corps.customer);
  const montant = obj(vente.amount);
  const reglement = obj(vente.settlement);
  const venteId = txt(vente.id);
  if (!venteId) return NextResponse.json({ ok: true, ignore: true });

  const payload = await payloadClient();

  // Déjà traitée (même livraison rejouée) → accusé de réception.
  const existante = await payload.find({
    collection: "ventes-numeriques",
    where: { vente_id: { equals: venteId } },
    limit: 1,
    depth: 0,
  });
  if (existante.docs[0]?.livraison_id && existante.docs[0].livraison_id === livraison) {
    return NextResponse.json({ ok: true, doublon: true });
  }

  // Rattachement au tome par l'identifiant du produit Chariow.
  const produitId = txt(produit.id);
  const ouvrage = produitId
    ? (
        await payload.find({
          collection: "ouvrages",
          where: { "numerique.produit_chariow": { equals: produitId } },
          limit: 1,
          depth: 0,
        })
      ).docs[0]
    : undefined;

  const donnees = {
    statut,
    vente_id: venteId,
    livraison_id: livraison || undefined,
    tome: ouvrage?.tome,
    produit: txt(produit.name) ?? produitId,
    date_vente: txt(vente.completed_at) ?? txt(vente.created_at),
    montant: num(montant.value),
    devise: txt(montant.currency),
    frais: num(reglement.fee),
    net: num(reglement.amount),
    buyer_nom: txt(client.name),
    buyer_email: txt(client.email),
    buyer_pays: txt(client.country),
  };

  try {
    if (existante.docs[0]) {
      await payload.update({ collection: "ventes-numeriques", id: existante.docs[0].id, data: donnees });
    } else {
      await payload.create({ collection: "ventes-numeriques", data: donnees });
      if (statut === "payee" && donnees.buyer_email) {
        await compterAchat(payload, {
          email: donnees.buyer_email,
          nom: donnees.buyer_nom,
          pays: donnees.buyer_pays,
          origine: "numerique",
        });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook chariow-ventes]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

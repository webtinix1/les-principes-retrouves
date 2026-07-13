import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getModule, isPurchasable, tarifFor } from "@/lib/commerce";
import { getPaymentProvider } from "@/lib/payment";
import { finalizePaidCommande } from "@/lib/checkout";
import { sendMail } from "@/lib/email";

export const runtime = "nodejs";

const schema = z.object({
  module_id: z.string().min(1),
  tarif_type: z.enum(["b2b", "b2c", "devis"]),
  buyer_nom: z.string().trim().min(2).max(120),
  buyer_email: z.email().max(200),
  buyer_organisation: z.string().trim().max(160).optional().or(z.literal("")),
  buyer_telephone: z.string().trim().max(30).optional().or(z.literal("")),
  buyer_pays: z.string().trim().max(3).optional().or(z.literal("")),
  consent_rgpd: z.literal(true, {
    error: "Le consentement au traitement des données est requis.",
  }),
});

/** Sépare un nom complet en prénom / nom (Chariow exige les deux). */
function splitNom(nom: string): { first: string; last: string } {
  const parts = nom.trim().split(/\s+/);
  return { first: parts[0], last: parts.slice(1).join(" ") || parts[0] };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 422 },
    );
  }
  const data = parsed.data;

  const module = getModule(data.module_id);
  if (!module) {
    return NextResponse.json({ ok: false, error: "Module inconnu." }, { status: 404 });
  }

  // Module III (sur devis) : pas de paiement, on enregistre une demande.
  if (data.tarif_type === "devis" || !isPurchasable(module)) {
    const commande = await prisma.commande.create({
      data: {
        module_id: module.id,
        module_titre: `${module.numero} — ${module.titre}`,
        tarif_type: "devis",
        montant: module.tarif_devis ?? "Sur devis",
        buyer_nom: data.buyer_nom,
        buyer_email: data.buyer_email,
        buyer_organisation: data.buyer_organisation || null,
        buyer_telephone: data.buyer_telephone || null,
        buyer_pays: data.buyer_pays || null,
        payment_provider: "—",
        statut: "devis_demande",
      },
    });
    await sendMail({
      to: process.env.CONTACT_INBOX_EMAIL ?? "",
      subject: `[Devis] ${module.numero} — ${data.buyer_nom}`,
      text: `Demande de devis.\nModule : ${module.titre}\nNom : ${data.buyer_nom}\nE-mail : ${data.buyer_email}\nOrganisation : ${data.buyer_organisation || "—"}`,
      replyTo: data.buyer_email,
    });
    return NextResponse.json({ ok: true, redirect: `/commande/confirmee?c=${commande.id}` });
  }

  // Modules I & II : création de la commande puis paiement.
  const provider = getPaymentProvider();
  const montant = tarifFor(module, data.tarif_type);

  const commande = await prisma.commande.create({
    data: {
      module_id: module.id,
      module_titre: `${module.numero} — ${module.titre}`,
      tarif_type: data.tarif_type,
      montant,
      buyer_nom: data.buyer_nom,
      buyer_email: data.buyer_email,
      buyer_organisation: data.buyer_organisation || null,
      buyer_telephone: data.buyer_telephone || null,
      buyer_pays: data.buyer_pays || null,
      payment_provider: provider.id,
      statut: "en_attente",
    },
  });

  const { first, last } = splitNom(data.buyer_nom);

  try {
    const result = await provider.createCheckout({
      commande_id: commande.id,
      module_id: module.id,
      tarif_type: data.tarif_type,
      montant,
      devise: commande.devise,
      module_titre: commande.module_titre,
      buyer_nom: commande.buyer_nom,
      buyer_first_name: first,
      buyer_last_name: last,
      buyer_email: commande.buyer_email,
      buyer_telephone: data.buyer_telephone || undefined,
      buyer_pays: data.buyer_pays || undefined,
    });

    if (result.kind === "paid") {
      await finalizePaidCommande(commande.id, result.payment_ref);
      return NextResponse.json({ ok: true, redirect: `/commande/confirmee?c=${commande.id}` });
    }
    // Redirection vers la page de paiement externe (CinetPay)
    await prisma.commande.update({
      where: { id: commande.id },
      data: { payment_ref: result.payment_ref },
    });
    return NextResponse.json({ ok: true, redirect: result.url });
  } catch (err) {
    console.error("[checkout] paiement:", err);
    await prisma.commande.update({
      where: { id: commande.id },
      data: { statut: "echoue" },
    });
    return NextResponse.json(
      { ok: false, error: "Le paiement n'a pas pu être initié. Merci de réessayer." },
      { status: 502 },
    );
  }
}

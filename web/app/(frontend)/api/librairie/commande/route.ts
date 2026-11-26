import { NextResponse } from "next/server";
import { z } from "zod";
import { creerCommande, ErreurCommande } from "@/lib/librairie/commande";
import { clientIp, rateLimit, reponse429 } from "@/lib/rate-limit";

export const runtime = "nodejs";

const court = (max: number) => z.string().trim().max(max);

const schema = z.object({
  tome: z.enum(["tome-i", "tome-ii"]),
  quantite: z.coerce.number().int().min(1).max(20),
  nom: court(120).min(2),
  email: z.email().max(200),
  telephone: court(30).min(6),
  adresse1: court(200).min(3),
  adresse2: court(200).optional().or(z.literal("")),
  code_postal: court(20).optional().or(z.literal("")),
  ville: court(120).min(2),
  pays: court(2).length(2),
  consentement: z.literal(true, { error: "L’acceptation des conditions est requise." }),
});

/** Commande d'un exemplaire imprimé : enregistrement puis paiement. */
export async function POST(request: Request) {
  const limite = rateLimit("librairie-commande", clientIp(request), 8, 10 * 60_000);
  if (!limite.ok) return reponse429(limite.retryApres);

  let corps: unknown;
  try {
    corps = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  const parsed = schema.safeParse(corps);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 422 },
    );
  }

  try {
    const { consentement, ...donnees } = parsed.data;
    void consentement;
    const { redirect } = await creerCommande(donnees);
    return NextResponse.json({ ok: true, redirect });
  } catch (err) {
    if (err instanceof ErreurCommande) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.statut });
    }
    console.error("[librairie] commande:", err);
    return NextResponse.json({ ok: false, error: "Erreur du serveur." }, { status: 500 });
  }
}

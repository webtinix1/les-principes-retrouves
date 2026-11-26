import { NextResponse } from "next/server";
import { payloadClient } from "@/lib/payload";
import { proteger, erreur } from "@/lib/espace/protection";
import { schemaService } from "@/lib/espace/schemas";
import { lecteurCourant } from "@/lib/espace/session";
import { enregistrerDemande } from "@/lib/espace/demandes";

export const runtime = "nodejs";

/** Demande de service : avec ou sans compte (rattachée au compte si connecté). */
export async function POST(request: Request) {
  const p = await proteger(request, schemaService, { nom: "service", limite: 5, fenetreMs: 10 * 60_000, antiRobot: true });
  if ("reponse" in p) return p.reponse;
  const lecteur = await lecteurCourant();
  if (!lecteur && (!p.data.nom || !p.data.email)) return erreur("champs", 422);

  try {
    const reference = await enregistrerDemande(await payloadClient(), {
      genre: "service",
      request,
      lecteur,
      nom: p.data.nom,
      email: p.data.email,
      champs: { nature: p.data.nature, message: p.data.message },
    });
    return NextResponse.json({ ok: true, reference });
  } catch (err) {
    (await payloadClient()).logger.error({ err }, "[espace] demande de service");
    return erreur("generique", 500);
  }
}

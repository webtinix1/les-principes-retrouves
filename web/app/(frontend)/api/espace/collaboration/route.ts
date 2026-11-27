import { NextResponse } from "next/server";
import { payloadClient } from "@/lib/payload";
import { proteger, erreur } from "@/lib/espace/protection";
import { schemaCollaboration } from "@/lib/espace/schemas";
import { lecteurCourant } from "@/lib/espace/session";
import { enregistrerDemande } from "@/lib/espace/demandes";

export const runtime = "nodejs";

/** Proposition de collaboration : file de traitement dédiée. */
export async function POST(request: Request) {
  const p = await proteger(request, schemaCollaboration, { nom: "collaboration", limite: 5, fenetreMs: 10 * 60_000, antiRobot: true });
  if ("reponse" in p) return p.reponse;
  const lecteur = await lecteurCourant();
  if (!lecteur && (!p.data.nom || !p.data.email)) return erreur("champs", 422);

  try {
    const reference = await enregistrerDemande(await payloadClient(), {
      genre: "collaboration",
      request,
      lecteur,
      nom: p.data.nom,
      email: p.data.email,
      champs: {
        institution: p.data.institution,
        type_collaboration: p.data.type_collaboration,
        presentation: p.data.presentation,
      },
    });
    return NextResponse.json({ ok: true, reference });
  } catch (err) {
    (await payloadClient()).logger.error({ err }, "[espace] collaboration");
    return erreur("generique", 500);
  }
}

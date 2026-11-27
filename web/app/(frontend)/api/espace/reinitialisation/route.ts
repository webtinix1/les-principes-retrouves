import { NextResponse } from "next/server";
import { payloadClient } from "@/lib/payload";
import { proteger, erreur } from "@/lib/espace/protection";
import { schemaReinit } from "@/lib/espace/schemas";
import { journaliser } from "@/lib/espace/securite";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const p = await proteger(request, schemaReinit, { nom: "reinit", limite: 10, fenetreMs: 3_600_000 });
  if ("reponse" in p) return p.reponse;

  const payload = await payloadClient();
  try {
    const res = await payload.resetPassword({
      collection: "lecteurs",
      data: { token: p.data.token, password: p.data.nouveau_mot_de_passe },
      overrideAccess: true,
    });
    await journaliser(payload, "mot_de_passe_change", { request, lecteur: (res.user as { id: string }).id });
    return NextResponse.json({ ok: true });
  } catch {
    return erreur("lien_invalide", 400);
  }
}

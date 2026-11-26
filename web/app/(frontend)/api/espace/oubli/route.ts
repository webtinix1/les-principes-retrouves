import { NextResponse } from "next/server";
import { payloadClient } from "@/lib/payload";
import { proteger } from "@/lib/espace/protection";
import { schemaOubli } from "@/lib/espace/schemas";
import { journaliser } from "@/lib/espace/securite";

export const runtime = "nodejs";

/** Mot de passe oublié : réponse identique que le compte existe ou non. */
export async function POST(request: Request) {
  const p = await proteger(request, schemaOubli, { nom: "oubli", limite: 5, fenetreMs: 3_600_000, antiRobot: true });
  if ("reponse" in p) return p.reponse;

  const payload = await payloadClient();
  try {
    await payload.forgotPassword({ collection: "lecteurs", data: { email: p.data.email } });
    await journaliser(payload, "mot_de_passe_demande", { request });
  } catch (err) {
    payload.logger.error({ err }, "[espace] mot de passe oublié");
  }
  return NextResponse.json({ ok: true });
}

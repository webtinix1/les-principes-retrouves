import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { payloadClient } from "@/lib/payload";
import { proteger, erreur } from "@/lib/espace/protection";
import { schemaConnexion } from "@/lib/espace/schemas";
import { journaliser } from "@/lib/espace/securite";
import { COOKIE_LECTEUR, optionsCookie } from "@/lib/espace/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const p = await proteger(request, schemaConnexion, { nom: "connexion", limite: 10, fenetreMs: 10 * 60_000 });
  if ("reponse" in p) return p.reponse;

  const payload = await payloadClient();
  try {
    const res = await payload.login({
      collection: "lecteurs",
      data: { email: p.data.email, password: p.data.mot_de_passe },
    });
    if (!res.token) return erreur("generique", 500);
    (await cookies()).set(COOKIE_LECTEUR, res.token, optionsCookie());
    await journaliser(payload, "connexion", { request, lecteur: res.user?.id });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const nom = (err as Error)?.name;
    await journaliser(payload, "echec_connexion", { request, detail: nom });
    if (nom === "UnverifiedEmail") return erreur("non_verifie", 403);
    if (nom === "LockedAuth") return erreur("verrouille", 423);
    return erreur("identifiants", 401);
  }
}

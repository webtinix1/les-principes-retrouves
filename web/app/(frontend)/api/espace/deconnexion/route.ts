import { NextResponse } from "next/server";
import { payloadClient } from "@/lib/payload";
import { fermerSession, lecteurCourant } from "@/lib/espace/session";
import { journaliser } from "@/lib/espace/securite";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const lecteur = await lecteurCourant();
  if (lecteur) {
    await fermerSession(lecteur);
    await journaliser(await payloadClient(), "deconnexion", { request, lecteur: lecteur.id });
  }
  return NextResponse.json({ ok: true });
}

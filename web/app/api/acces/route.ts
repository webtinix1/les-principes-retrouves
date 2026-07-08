import { NextResponse } from "next/server";
import { z } from "zod";
import { validerCode, ACCESS_COOKIE } from "@/lib/access";

export const runtime = "nodejs";

const schema = z.object({ code: z.string().trim().min(4).max(40) });

const RAISONS: Record<string, string> = {
  introuvable: "Code d'accès inconnu.",
  revoque: "Ce code d'accès a été révoqué.",
  expire: "Ce code d'accès a expiré.",
};

/** Valide un code et pose un cookie httpOnly qui débloque les téléchargements. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Code invalide." }, { status: 422 });
  }

  const res = await validerCode(parsed.data.code);
  if (!res.valid) {
    return NextResponse.json(
      { ok: false, error: RAISONS[res.reason] },
      { status: 403 },
    );
  }

  const response = NextResponse.json({ ok: true, niveau: res.niveau });
  response.cookies.set(ACCESS_COOKIE, res.code, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  });
  return response;
}

/** Efface le cookie d'accès (déconnexion du code). */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ACCESS_COOKIE);
  return response;
}

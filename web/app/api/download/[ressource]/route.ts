import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readFile } from "fs/promises";
import path from "path";
import {
  ACCESS_COOKIE,
  RESSOURCE_NIVEAU,
  niveauDebloque,
  validerCode,
  ressourceDisponible,
} from "@/lib/access";

export const runtime = "nodejs";

/**
 * Téléchargement protégé d'une ressource intégrale (Working Paper, guide, arrêt).
 * Vérifie, dans l'ordre : ressource connue → disponibilité (back-office) →
 * code d'accès présent et valide → niveau suffisant. Puis sert le PDF depuis
 * le dossier `protected/` (hors `public/`).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ressource: string }> },
) {
  const { ressource } = await params;

  if (!(ressource in RESSOURCE_NIVEAU)) {
    return NextResponse.json({ ok: false, error: "Ressource inconnue." }, { status: 404 });
  }

  if (!(await ressourceDisponible(ressource))) {
    return NextResponse.json(
      { ok: false, error: "Document bientôt disponible." },
      { status: 404 },
    );
  }

  const code = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!code) {
    return NextResponse.json(
      { ok: false, error: "Code d'accès requis." },
      { status: 401 },
    );
  }

  const res = await validerCode(code);
  if (!res.valid) {
    return NextResponse.json(
      { ok: false, error: "Code d'accès invalide ou révoqué." },
      { status: 403 },
    );
  }

  if (!niveauDebloque(res.niveau, ressource)) {
    return NextResponse.json(
      { ok: false, error: "Votre niveau d'accès ne couvre pas ce document." },
      { status: 403 },
    );
  }

  // Sert le fichier réel s'il existe, sinon le placeholder (en attendant les PDF).
  const dir = path.join(process.cwd(), "protected");
  let data: Buffer;
  try {
    data = await readFile(path.join(dir, `${ressource}.pdf`));
  } catch {
    try {
      data = await readFile(path.join(dir, "placeholder.pdf"));
    } catch {
      return NextResponse.json(
        { ok: false, error: "Document en préparation." },
        { status: 404 },
      );
    }
  }

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${ressource}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}

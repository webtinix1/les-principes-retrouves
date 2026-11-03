import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readFile } from "fs/promises";
import path from "path";
import { ACCESS_COOKIE, getRessource, niveauDebloque, validerCode } from "@/lib/access";
import { DOCUMENTS_DIR } from "@/payload/collections/Documents";

export const runtime = "nodejs";

/**
 * Téléchargement protégé d'une ressource intégrale (Working Paper, guide, arrêt).
 * Vérifie, dans l'ordre : ressource connue → disponibilité (back-office) →
 * code d'accès présent et valide → niveau suffisant. Puis sert le PDF téléversé
 * dans le back-office (collection « Documents protégés », hors `public/`),
 * à défaut le document d'attente `protected/placeholder.pdf`.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ressource: string }> },
) {
  const { ressource: id } = await params;

  const ressource = await getRessource(id);
  if (!ressource) {
    return NextResponse.json({ ok: false, error: "Ressource inconnue." }, { status: 404 });
  }

  if (!ressource.is_available) {
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

  const candidats = [
    // basename : le nom vient de la base, on interdit toute sortie du dossier.
    ressource.fichier && path.join(DOCUMENTS_DIR, path.basename(ressource.fichier)),
    path.join(process.cwd(), "protected", "placeholder.pdf"),
  ].filter(Boolean) as string[];

  for (const fichier of candidats) {
    try {
      const data = await readFile(fichier);
      return new NextResponse(new Uint8Array(data), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${id}.pdf"`,
          "Cache-Control": "private, no-store",
        },
      });
    } catch {
      /* fichier suivant */
    }
  }

  return NextResponse.json(
    { ok: false, error: "Document en préparation." },
    { status: 404 },
  );
}

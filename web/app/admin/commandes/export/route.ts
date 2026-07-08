import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

/** Export CSV des commandes (back-office, protégé par Traefik basic-auth). */
export async function GET() {
  const commandes = await prisma.commande.findMany({
    orderBy: { created_at: "desc" },
    include: { code_acces: true },
  });

  const entetes = [
    "date", "module", "regime", "montant", "devise",
    "nom", "email", "organisation", "statut", "code_acces", "reference_paiement",
  ];
  const lignes = commandes.map((c) =>
    [
      c.created_at.toISOString(),
      c.module_titre,
      c.tarif_type,
      c.montant,
      c.devise,
      c.buyer_nom,
      c.buyer_email,
      c.buyer_organisation ?? "",
      c.statut,
      c.code_acces?.code ?? "",
      c.payment_ref ?? "",
    ].map(csvCell).join(","),
  );
  const csv = "﻿" + [entetes.map(csvCell).join(","), ...lignes].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="commandes.csv"`,
    },
  });
}

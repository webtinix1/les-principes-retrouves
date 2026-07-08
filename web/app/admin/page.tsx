import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function Tuile({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="block border-l-4 border-or bg-white p-6 shadow-sm transition-shadow hover:shadow"
    >
      <p className="font-mono text-3xl font-semibold text-bleu-nuit-profond">{value}</p>
      <p className="mt-1 font-ui text-sm text-bleu-nuit-profond/70">{label}</p>
    </Link>
  );
}

export default async function AdminDashboard() {
  const [commandes, payees, devis, codesActifs, messagesNouveaux] = await Promise.all([
    prisma.commande.count(),
    prisma.commande.count({ where: { statut: "paye" } }),
    prisma.commande.count({ where: { statut: "devis_demande" } }),
    prisma.codeAcces.count({ where: { revoked: false } }),
    prisma.contactMessage.count({ where: { statut: "nouveau" } }),
  ]);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Tableau de bord</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Tuile label="Commandes (total)" value={commandes} href="/admin/commandes" />
        <Tuile label="Commandes payées" value={payees} href="/admin/commandes" />
        <Tuile label="Demandes de devis" value={devis} href="/admin/commandes" />
        <Tuile label="Codes d'accès actifs" value={codesActifs} href="/admin/codes" />
        <Tuile label="Messages non traités" value={messagesNouveaux} href="/admin/messages" />
      </div>
    </div>
  );
}

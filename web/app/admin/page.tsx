import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

/**
 * Tuile du tableau de bord. `attention` distingue « il y a quelque chose à
 * traiter » (accent Or + chiffre coloré) d'un simple compteur d'information :
 * l'accent Or ne décore plus toutes les cartes, il signale l'action.
 */
function Tuile({
  label,
  value,
  href,
  attention = false,
}: {
  label: string;
  value: number;
  href: string;
  attention?: boolean;
}) {
  const actif = attention && value > 0;
  return (
    <Link
      href={href}
      className={cn(
        "block border-l-4 bg-white p-6 shadow-sm transition-shadow hover:shadow",
        actif ? "border-or" : "border-bleu-nuit-profond/10",
      )}
    >
      {/* tabular-nums : chiffres alignés, sans le « 0 » barré de la fonte mono. */}
      <p
        className={cn(
          "font-heading text-3xl font-semibold tabular-nums",
          actif ? "text-or" : "text-bleu-nuit-profond",
        )}
      >
        {value}
      </p>
      <p className="mt-1 font-ui text-sm text-bleu-nuit-profond/70">
        {label}
        {actif ? <span className="ml-2 align-middle text-xs font-semibold text-or">à traiter</span> : null}
      </p>
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
        {/* Actionnables en premier : ce qui attend l'opérateur. */}
        <Tuile label="Messages non traités" value={messagesNouveaux} href="/admin/messages" attention />
        <Tuile label="Demandes de devis" value={devis} href="/admin/commandes" attention />
        <Tuile label="Commandes payées" value={payees} href="/admin/commandes" />
        <Tuile label="Commandes (total)" value={commandes} href="/admin/commandes" />
        <Tuile label="Codes d'accès actifs" value={codesActifs} href="/admin/codes" />
      </div>
    </div>
  );
}

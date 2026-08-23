import { prisma } from "@/lib/prisma";
import { setCommandeStatut } from "@/app/admin/actions";
import { BoutonSoumettre } from "@/components/admin/bouton-soumettre";
import { STATUT_COMMANDE, REGIME_TARIF, libelle } from "@/lib/libelles";

export const dynamic = "force-dynamic";

const STATUTS = ["en_attente", "paye", "echoue", "rembourse", "devis_demande"];

function dateFr(d: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Africa/Brazzaville",
  }).format(d);
}

export default async function AdminCommandes() {
  const commandes = await prisma.commande.findMany({
    orderBy: { created_at: "desc" },
    include: { code_acces: true },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-bold">
          Commandes <span className="font-mono text-lg text-bleu-nuit-profond/50">({commandes.length})</span>
        </h1>
        <a
          href="/admin/commandes/export"
          className="font-ui text-sm text-bleu-academique underline underline-offset-4 hover:text-or"
        >
          Exporter en CSV
        </a>
      </div>

      <div className="mt-6 overflow-x-auto rounded border border-bleu-nuit-profond/10 bg-white">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-gris-clair font-ui text-xs uppercase tracking-wide text-bleu-nuit-profond/60">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Acheteur</th>
              <th className="p-3">Module</th>
              <th className="p-3">Régime</th>
              <th className="p-3">Montant</th>
              <th className="p-3">Code</th>
              <th className="p-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bleu-nuit-profond/5">
            {commandes.map((c) => (
              <tr key={c.id} className="align-top">
                <td className="p-3 font-mono text-xs whitespace-nowrap text-bleu-nuit-profond/70">{dateFr(c.created_at)}</td>
                <td className="p-3">
                  <div className="font-semibold">{c.buyer_nom}</div>
                  <div className="text-bleu-nuit-profond/60">{c.buyer_email}</div>
                  {c.buyer_organisation && <div className="text-bleu-nuit-profond/50">{c.buyer_organisation}</div>}
                </td>
                <td className="p-3">{c.module_titre}</td>
                <td className="p-3">{libelle(REGIME_TARIF, c.tarif_type)}</td>
                <td className="p-3 whitespace-nowrap font-mono">{c.montant}</td>
                <td className="p-3 font-mono text-xs">{c.code_acces?.code ?? "—"}</td>
                <td className="p-3">
                  <form action={setCommandeStatut} className="flex items-center gap-1">
                    <input type="hidden" name="id" value={c.id} />
                    <select
                      name="statut"
                      defaultValue={c.statut}
                      className="rounded border border-bleu-nuit-profond/15 bg-white px-1.5 py-1 text-xs"
                    >
                      {STATUTS.map((s) => (
                        <option key={s} value={s}>{libelle(STATUT_COMMANDE, s)}</option>
                      ))}
                    </select>
                    <BoutonSoumettre variante="primaire" enCours="…">Enregistrer</BoutonSoumettre>
                  </form>
                </td>
              </tr>
            ))}
            {commandes.length === 0 && (
              <tr><td colSpan={7} className="p-6 text-center text-bleu-nuit-profond/50">Aucune commande.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

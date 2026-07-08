import { prisma } from "@/lib/prisma";
import { WORKING_PAPERS, PIECES_OPERATOIRES } from "@/content/working-papers";
import { setRessourceDispo } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminRessources() {
  const ressources = [...WORKING_PAPERS, ...PIECES_OPERATOIRES];
  const etats = await prisma.ressourceEtat.findMany();
  const dispo = new Map(etats.map((e) => [e.ressource_id, e.is_available]));

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Disponibilité des ressources</h1>
      <p className="mt-2 font-sans text-sm text-bleu-nuit-profond/70">
        Active le téléchargement des documents intégraux (le gating par code
        d&apos;accès est appliqué au Lot 5). Par défaut : indisponible.
      </p>

      <div className="mt-6 divide-y divide-bleu-nuit-profond/5 rounded border border-bleu-nuit-profond/10 bg-white">
        {ressources.map((r) => {
          const isDispo = dispo.get(r.id) ?? false;
          return (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="font-mono text-xs text-bleu-nuit-profond/50">{r.id}</p>
                <p className="font-sans text-sm">{r.titre}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={isDispo ? "text-xs font-semibold text-green-700" : "text-xs font-semibold text-bleu-nuit-profond/40"}>
                  {isDispo ? "disponible" : "indisponible"}
                </span>
                <form action={setRessourceDispo}>
                  <input type="hidden" name="ressource_id" value={r.id} />
                  <input type="hidden" name="is_available" value={isDispo ? "false" : "true"} />
                  <button className="rounded border border-bleu-nuit-profond/20 px-3 py-1 text-xs hover:bg-gris-clair">
                    {isDispo ? "Désactiver" : "Activer"}
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PAGES_BLOCS } from "@/content/blocs";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Filtre = "tous" | "modifies" | "origine";

const FILTRES: { cle: Filtre; label: string }[] = [
  { cle: "tous", label: "Tous" },
  { cle: "modifies", label: "Modifiés" },
  { cle: "origine", label: "Texte d'origine" },
];

export default async function AdminContenu({
  searchParams,
}: {
  searchParams: Promise<{ filtre?: string }>;
}) {
  const { filtre: filtreBrut } = await searchParams;
  const filtre: Filtre =
    filtreBrut === "modifies" || filtreBrut === "origine" ? filtreBrut : "tous";

  const surcharges = await prisma.contenuBloc.findMany({
    select: { cle: true, updated_at: true },
  });
  const modifies = new Map(surcharges.map((s) => [s.cle, s.updated_at]));

  const totalBlocs = PAGES_BLOCS.reduce((n, p) => n + p.blocs.length, 0);
  const nbModifies = modifies.size;
  const compteur: Record<Filtre, number> = {
    tous: totalBlocs,
    modifies: nbModifies,
    origine: totalBlocs - nbModifies,
  };

  const garder = (cle: string) =>
    filtre === "tous"
      ? true
      : filtre === "modifies"
        ? modifies.has(cle)
        : !modifies.has(cle);

  // Pages restreintes au filtre courant ; celles sans bloc correspondant sont masquées.
  const pages = PAGES_BLOCS.map((p) => ({
    ...p,
    blocsFiltres: p.blocs.filter((b) => garder(b.cle)),
  })).filter((p) => p.blocsFiltres.length > 0);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Contenu des pages</h1>
      <p className="mt-2 max-w-[70ch] font-sans text-sm text-bleu-nuit-profond/70">
        Modifie les textes du site sans passer par un développeur. Un bloc non
        modifié affiche le texte d&apos;origine ; après modification, tu peux
        revenir à l&apos;original ou restaurer une version antérieure à tout
        moment. Les changements sont publiés immédiatement.
      </p>

      {/* Filtre — retrouver rapidement les blocs modifiés parmi la centaine existante. */}
      <div className="mt-5 flex flex-wrap gap-2">
        {FILTRES.map((f) => {
          const actif = f.cle === filtre;
          return (
            <Link
              key={f.cle}
              href={f.cle === "tous" ? "/admin/contenu" : `/admin/contenu?filtre=${f.cle}`}
              className={cn(
                "rounded-full border px-3 py-1 font-ui text-xs transition-colors",
                actif
                  ? "border-bleu-nuit-profond bg-bleu-nuit-profond text-blanc-casse"
                  : "border-bleu-nuit-profond/20 text-bleu-nuit-profond/70 hover:bg-gris-clair",
              )}
            >
              {f.label}{" "}
              <span className={cn("tabular-nums", actif ? "text-blanc-casse/70" : "text-bleu-nuit-profond/40")}>
                {compteur[f.cle]}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 space-y-8">
        {pages.map((page) => {
          const nbMod = page.blocs.filter((b) => modifies.has(b.cle)).length;
          return (
            <section key={page.chemin}>
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-heading text-lg font-semibold">
                  {page.titre}{" "}
                  <Link
                    href={page.chemin}
                    className="font-mono text-xs font-normal text-bleu-academique hover:text-or"
                  >
                    {page.chemin} ↗
                  </Link>
                </h2>
                <p className="font-ui text-xs text-bleu-nuit-profond/50">
                  {page.blocs.length} blocs
                  {nbMod > 0 ? ` · ${nbMod} modifié${nbMod > 1 ? "s" : ""}` : ""}
                </p>
              </header>

              <div className="mt-3 divide-y divide-bleu-nuit-profond/5 rounded border border-bleu-nuit-profond/10 bg-white">
                {page.blocsFiltres.map((bloc) => {
                  const modifieLe = modifies.get(bloc.cle);
                  return (
                    <Link
                      key={bloc.cle}
                      href={`/admin/contenu/${encodeURIComponent(bloc.cle)}`}
                      className={cn(
                        // Repère en bord gauche : les blocs modifiés se repèrent au balayage.
                        "flex flex-wrap items-center justify-between gap-3 border-l-4 p-4 hover:bg-gris-clair",
                        modifieLe ? "border-or" : "border-transparent",
                      )}
                    >
                      <div className="min-w-0">
                        <p className="font-sans text-sm font-medium">{bloc.label}</p>
                        {bloc.aide ? (
                          <p className="mt-0.5 font-ui text-xs text-bleu-nuit-profond/50">
                            {bloc.aide}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="font-ui text-[0.7rem] uppercase tracking-wide text-bleu-nuit-profond/40">
                          {bloc.type === "riche" ? "texte long" : "texte court"}
                        </span>
                        {modifieLe ? (
                          <span className="rounded bg-or/15 px-2 py-0.5 font-ui text-xs font-semibold text-bleu-nuit-profond">
                            modifié le{" "}
                            {modifieLe.toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        ) : (
                          <span className="font-ui text-xs text-bleu-nuit-profond/40">
                            texte d&apos;origine
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

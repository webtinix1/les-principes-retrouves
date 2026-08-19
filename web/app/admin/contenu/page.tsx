import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PAGES_BLOCS } from "@/content/blocs";

export const dynamic = "force-dynamic";

export default async function AdminContenu() {
  const surcharges = await prisma.contenuBloc.findMany({
    select: { cle: true, updated_at: true },
  });
  const modifies = new Map(surcharges.map((s) => [s.cle, s.updated_at]));

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Contenu des pages</h1>
      <p className="mt-2 max-w-[70ch] font-sans text-sm text-bleu-nuit-profond/70">
        Modifie les textes du site sans passer par un développeur. Un bloc non
        modifié affiche le texte d&apos;origine ; après modification, tu peux
        revenir à l&apos;original ou restaurer une version antérieure à tout
        moment. Les changements sont publiés immédiatement.
      </p>

      <div className="mt-8 space-y-8">
        {PAGES_BLOCS.map((page) => {
          const nbModifies = page.blocs.filter((b) => modifies.has(b.cle)).length;
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
                  {nbModifies > 0 ? ` · ${nbModifies} modifié${nbModifies > 1 ? "s" : ""}` : ""}
                </p>
              </header>

              <div className="mt-3 divide-y divide-bleu-nuit-profond/5 rounded border border-bleu-nuit-profond/10 bg-white">
                {page.blocs.map((bloc) => {
                  const modifieLe = modifies.get(bloc.cle);
                  return (
                    <Link
                      key={bloc.cle}
                      href={`/admin/contenu/${encodeURIComponent(bloc.cle)}`}
                      className="flex flex-wrap items-center justify-between gap-3 p-4 hover:bg-gris-clair"
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

import { getStrates } from "@/lib/cms";
import { CarteConcept } from "@/components/carte-concept";
import { BlocProse } from "@/components/bloc";
import { Cloture, Exergue, OuverturePage } from "@/components/editorial";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { getTextes, remplir } from "@/lib/contenu";

export async function generateMetadata() {
  const t = await getTextes("concepts");
  return pageMetadata({
    title: t["seo.titre"],
    description: t["seo.description"],
    path: "/concepts",
  });
}

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

const n2 = (n: number) => String(n).padStart(2, "0");

/** PAGE 8 — CONCEPTS STABILISÉS (Infrastructure Lexicale V4.0). */
export default async function ConceptsPage() {
  const [STRATES, t] = await Promise.all([getStrates(), getTextes("concepts")]);
  return (
    <>
      <OuverturePage
        page_id="concepts"
        titre={t["hero.titre"]}
        sousTitre={t["hero.sous_titre"]}
        sommaire={[
          { id: "index-concepts", label: t["index.titre"] },
          ...STRATES.map((s) => ({ id: s.id, label: s.titre })),
        ]}
      >
        <Exergue>{t["hero.exergue"]}</Exergue>
      </OuverturePage>

      {/* Introduction */}
      <section className="surface-claire bg-papier px-5 pt-14 pb-14 md:pt-24 md:pb-20 lg:px-6 xl:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-x-6 lg:grid-cols-12">
          <BlocProse cle="concepts.introduction.corps" className="lg:col-span-8 lg:col-start-4">
            <p>
              Ce vocabulaire ne constitue pas un simple glossaire. Il est le
              système d’exploitation de la Science Métamoderne. Ces vingt
              concepts, classés par strates logiques, définissent les conditions
              de possibilité de l’intelligibilité et les règles de l’action
              normative.
            </p>
            <p>
              Chaque entrée est verrouillée contre toute dérive disciplinaire,
              toute spéculation gratuite et toute confusion avec les courants
              métamodernes culturels contemporains. Le visiteur dispose ici du
              dictionnaire d’autorité de l’École de Brazzaville : chaque
              définition est opposable et immunisée contre l’arbitraire.
            </p>
          </BlocProse>
        </div>
      </section>

      <div className="surface-claire bg-papier">
        {/* Barre des strates : accès direct, collante sur ordinateur */}
        <nav
          aria-label={t["strates.aria"]}
          className="border-y border-filet bg-papier px-5 lg:sticky lg:top-0 lg:z-30 lg:px-6 xl:px-10"
        >
          <ol className="mx-auto grid max-w-[1280px] grid-cols-2 lg:flex lg:items-stretch">
            {STRATES.map((strate, i) => (
              <li
                key={strate.id}
                className={cn(
                  "min-w-0 lg:flex-1",
                  i % 2 === 1 && "border-l border-filet-doux",
                  i >= 2 && "border-t border-filet-doux lg:border-t-0",
                  i === 2 && "lg:border-l",
                )}
              >
                <a
                  href={`#${strate.id}`}
                  className="flex min-h-14 h-full flex-col justify-center gap-0.5 px-3 py-2.5 font-ui text-[13.5px] leading-snug text-encre-2 hover:bg-papier-2 hover:text-encre lg:px-4 lg:text-[14.5px]"
                >
                  <span className="font-code text-[11px] text-or-700">
                    {n2(strate.concepts[0]?.numero ?? 0)}–{n2(strate.concepts[strate.concepts.length - 1]?.numero ?? 0)}
                  </span>
                  <span>{strate.titre}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Index : accès direct à chaque strate et à chaque concept */}
        <section className="px-5 pt-14 pb-6 md:pt-20 lg:px-6 xl:px-10">
          <nav aria-label={t["index.aria"]} className="mx-auto max-w-[1280px] lg:scroll-mt-28!" id="index-concepts">
            <p className="pb-6 font-code text-xs tracking-[0.14em] text-or-700 uppercase">
              {t["index.titre"]}
            </p>
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {STRATES.map((strate) => (
                <div key={strate.id} className="flex flex-col">
                  <a
                    href={`#${strate.id}`}
                    className="flex min-h-11 items-end border-b border-encre pb-2.5 font-titre text-[1.0625rem] leading-[1.3] font-medium text-encre hover:underline hover:decoration-or-500 hover:decoration-2 hover:underline-offset-[5px]"
                  >
                    {strate.titre}
                  </a>
                  <ol className="flex flex-col">
                    {strate.concepts.map((c) => (
                      <li key={c.id}>
                        <a
                          href={`#${c.id}`}
                          className="glisse grid min-h-11 grid-cols-[24px_minmax(0,1fr)] items-baseline gap-2 border-b border-filet-doux py-2.5 font-ui text-[14.5px] leading-snug text-encre-2 hover:text-lien hover:underline hover:underline-offset-[3px]"
                        >
                          <span className="font-code text-[11.5px] text-or-700" aria-hidden="true">
                            {n2(c.numero)}
                          </span>
                          {c.titre}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </nav>
        </section>

        {/* Les 4 strates */}
        {STRATES.map((strate) => (
          <section
            key={strate.id}
            id={strate.id}
            className="px-5 pt-14 md:pt-24 lg:scroll-mt-16! lg:px-6 xl:px-10"
          >
            <div className="mx-auto grid max-w-[1280px] gap-x-6 gap-y-8 border-t border-filet pt-14 md:pt-20 lg:grid-cols-12">
              <header className="flex flex-col gap-3 lg:col-span-3">
                <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:text-[1.875rem]">
                  {strate.titre}
                </h2>
                <p className="font-texte text-lg leading-[1.45] text-encre-2 italic">{strate.sous_titre}</p>
                <span className="font-code text-[11.5px] text-encre-3">
                  {remplir(t["strate.nombre"], { n: strate.concepts.length })}
                </span>
              </header>
              <div className="grid min-w-0 gap-6 lg:col-span-9 lg:col-start-4 xl:grid-cols-2">
                {strate.concepts.map((concept) => (
                  <CarteConcept key={concept.id} concept={concept} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Appel à l'épreuve */}
      <Cloture>
        {t["cloture.texte"]}
      </Cloture>
    </>
  );
}

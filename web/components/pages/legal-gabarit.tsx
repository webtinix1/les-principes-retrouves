import { FilAriane, SurCettePage, type EntreeSommaire } from "@/components/editorial";
import { getTexte } from "@/lib/contenu";

/**
 * Gabarit de lecture simple des pages légales (mentions, confidentialité, CGV) :
 * fil d'Ariane, titre sur papier, avertissement éventuel, sommaire collant à
 * gauche (ordinateur) et colonne de lecture de 680 px.
 */
export async function GabaritLegal({
  titre,
  sousTitre,
  avertissement,
  sommaire,
  children,
}: {
  titre: string;
  sousTitre?: React.ReactNode;
  /** Mention provisoire (document en cours de finalisation). */
  avertissement?: React.ReactNode;
  sommaire: EntreeSommaire[];
  children: React.ReactNode;
}) {
  const accueil = await getTexte("site_interface.legal.fil_accueil");
  return (
    <>
      <section className="surface-claire border-b border-filet bg-papier px-5 pt-8 pb-12 md:pt-12 md:pb-16 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
          <FilAriane items={[{ label: accueil, href: "/accueil" }, { label: titre }]} />
          <div className="flex flex-col gap-4 lg:ml-[calc(25%+6px)] lg:max-w-[760px]">
            <h1 className="m-rise font-titre text-[2.125rem] leading-[1.1] font-medium text-balance text-encre md:text-[3.25rem] md:leading-[1.06]" style={{ "--dl": "100ms" } as React.CSSProperties}>
              {titre}
            </h1>
            {sousTitre && (
              <p className="m-rise font-texte text-[1.125rem] leading-[1.5] text-encre-2 italic md:text-[1.3125rem]" style={{ "--dl": "250ms" } as React.CSSProperties}>
                {sousTitre}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="surface-claire bg-papier px-5 pt-10 pb-14 md:pt-16 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-x-6 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SurCettePage entrees={sommaire} className="lg:sticky lg:top-8" />
          </div>
          <div className="flex min-w-0 flex-col gap-10 lg:col-span-7 lg:col-start-4">
            {avertissement && (
              <div
                role="note"
                className="max-w-[680px] rounded-[4px] border border-dashed border-filet-fort bg-papier-2 px-5 py-4 font-ui text-sm leading-[1.6] text-encre-2"
              >
                {avertissement}
              </div>
            )}
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

/** Classes des intertitres et listes du texte légal (alignées sur le HTML riche de `bloc.tsx`). */
export const H2_LEGAL = "mt-12 font-titre text-2xl leading-[1.25] font-medium text-encre first:mt-0 md:text-[1.75rem]";
export const LISTE_LEGALE = "mt-4 flex list-disc flex-col gap-2 pl-6 marker:text-encre-3";
export const LIEN_LEGAL = "text-lien underline underline-offset-[3px] hover:text-encre";
export const CODE_LEGAL = "font-code text-[0.9em] text-encre-2";


import Link from "next/link";
import { notFound } from "next/navigation";
import { AcquerirTome } from "@/components/acquerir-tome";
import { getRecueil, getRecueils, getVenteOuvrages } from "@/lib/cms";

import { dureeLecture } from "@/content/lectures";
import { BadgeAcces, FilAriane, SurCettePage } from "@/components/editorial";
import { LigneTexte } from "@/components/pages/ouvrage-textes";
import { buttonVariants } from "@/components/ui/button";
import { libellesLecture, remplacer } from "@/lib/lecture";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Sommaire d'un tome : les textes ouverts à la lecture, un lien par texte. */

// Les tomes viennent du back-office (Ouvrage › Les deux tomes) ; une adresse
// inconnue aboutit à notFound().
export const dynamicParams = true;

/** Filet de sécurité : revalidation périodique des textes du back-office. */
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getRecueils()).map((r) => ({ tome: r.tome }));
}

export async function generateMetadata({ params }: { params: Promise<{ tome: string }> }) {
  const { tome } = await params;
  const recueil = await getRecueil(tome);
  if (!recueil) return {};
  const l = await libellesLecture();
  return pageMetadata({
    title: remplacer(l["seo.tome_titre"], { tome: recueil.etiquette, titre: recueil.titre }),
    description: remplacer(l["seo.tome_description"], { presentation: recueil.presentation[0] ?? "" }),
    path: `/ouvrage/${recueil.tome}`,
  });
}

const dl = (ms: number) => ({ "--dl": `${ms}ms` }) as React.CSSProperties;

type LignePlan = { titre: string; libre?: string };

/** Regroupe le plan sous ses parties (lignes commençant par « Partie »). */
function grouperPlan(plan: LignePlan[]) {
  const groupes: { partie: string | null; lignes: LignePlan[] }[] = [];
  for (const ligne of plan) {
    if (ligne.titre.startsWith("Partie")) groupes.push({ partie: ligne.titre, lignes: [] });
    else if (groupes.length === 0) groupes.push({ partie: null, lignes: [ligne] });
    else groupes[groupes.length - 1].lignes.push(ligne);
  }
  return groupes;
}

export default async function SommaireTomePage({
  params,
}: {
  params: Promise<{ tome: string }>;
}) {
  const { tome } = await params;
  const recueil = await getRecueil(tome);
  if (!recueil) notFound();

  const base = `/ouvrage/${recueil.tome}`;
  const [vente, l] = await Promise.all([getVenteOuvrages(), libellesLecture()]);
  const t = (cle: string, valeurs?: Record<string, string | number>) => remplacer(l[cle], valeurs);
  const textes = recueil.parties.flatMap((p) => p.textes);
  const minutes = textes.reduce((n, t) => n + dureeLecture(t), 0);
  // Numérotation continue des textes d'une partie à l'autre.
  const debuts = recueil.parties.map((_, i) =>
    recueil.parties.slice(0, i).reduce((n, p) => n + p.textes.length, 0),
  );
  const sommaire = [
    ...recueil.parties.map((p, i) => ({ id: `partie-${i + 1}`, label: p.titre })),
    ...(recueil.plan ? [{ id: "plan", label: t("sommaire.plan_titre", { tome: recueil.etiquette }) }] : []),
  ];

  return (
    <>
      {/* Ouverture, sur papier */}
      <section className="surface-claire border-b border-filet bg-papier px-5 pt-8 pb-14 md:pt-14 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-x-6 gap-y-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-8">
            <div className="m-rise" style={dl(100)}>
              <FilAriane items={[{ label: t("fil_ariane.ouvrage"), href: "/ouvrage" }, { label: recueil.etiquette }]} />
            </div>
            <span className="m-rise mt-4 font-code text-xs tracking-[0.14em] text-or-700 uppercase" style={dl(200)}>
              {t("sommaire.surtitre", { tome: recueil.etiquette })}
            </span>
            <h1
              className="m-rise font-titre text-[2.25rem] leading-[1.08] font-medium text-balance text-encre md:text-[3.5rem] md:leading-[1.06]"
              style={dl(300)}
            >
              {recueil.titre}
            </h1>
            <p
              className="m-rise font-texte text-[1.1875rem] leading-[1.45] text-encre-2 italic md:text-[1.4375rem]"
              style={dl(450)}
            >
              {recueil.sous_titre}
            </p>
            <div
              className="m-rise mt-2 flex max-w-[680px] flex-col gap-4 font-texte text-[1.0625rem] leading-[1.7] text-encre md:text-lg"
              style={dl(550)}
            >
              {recueil.presentation.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="m-rise mt-3 flex flex-wrap items-center gap-x-6 gap-y-4" style={dl(650)}>
              {textes[0] && (
                <Link
                  href={`${base}/${textes[0].slug}`}
                  className={buttonVariants({ variant: "or-plein", size: "cta" })}
                >
                  {t("sommaire.commencer")} <span className="arr" aria-hidden="true">→</span>
                </Link>
              )}
              <span className="flex flex-wrap items-center gap-3">
                <BadgeAcces libre />
                <span className="font-code text-[12px] text-encre-3">
                  {t("sommaire.compteur", { n: textes.length, min: minutes })}
                </span>
              </span>
            </div>
            <AcquerirTome offre={vente[recueil.tome]} etiquette={recueil.etiquette} variante="or" className="mt-1" />
          </div>
          {sommaire.length >= 2 && (
            <div className="m-rise lg:col-span-3 lg:col-start-10 lg:self-end" style={dl(750)}>
              <SurCettePage entrees={sommaire} />
            </div>
          )}
        </div>
      </section>

      {/* Les textes ouverts, par partie */}
      {recueil.parties.map((partie, iPartie) => (
        <section
          key={partie.titre}
          id={`partie-${iPartie + 1}`}
          className="surface-claire bg-papier px-5 pb-14 md:pb-24 lg:px-6 xl:px-10"
        >
          <div
            className={cn(
              "mx-auto grid max-w-[1280px] gap-x-6 gap-y-6 pt-14 md:pt-24 lg:grid-cols-12",
              iPartie > 0 && "border-t border-filet",
            )}
          >
            <div className="flex flex-col gap-3 lg:col-span-3">
              <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:text-[1.875rem]">
                {partie.titre}
              </h2>
              <p className="font-ui text-[15px] leading-[1.55] text-encre-2">{partie.description}</p>
              <span className="font-code text-[11.5px] text-encre-3">
                {t(partie.textes.length > 1 ? "sommaire.partie_plusieurs" : "sommaire.partie_un", { n: partie.textes.length })}
              </span>
            </div>
            <ol className="min-w-0 border-b border-filet lg:col-span-8 lg:col-start-4">
              {partie.textes.map((texte, iTexte) => (
                <LigneTexte
                  key={texte.slug}
                  href={`${base}/${texte.slug}`}
                  rang={debuts[iPartie] + iTexte + 1}
                  texte={texte}
                />
              ))}
            </ol>
          </div>
        </section>
      ))}

      {/* Plan complet (Tome II) */}
      {recueil.plan && (
        <section id="plan" className="surface-claire bg-papier-2 px-5 py-14 md:py-24 lg:px-6 xl:px-10">
          <div className="mx-auto grid max-w-[1280px] gap-x-6 gap-y-8 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-3">
              <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:text-[1.875rem]">
                {t("sommaire.plan_titre", { tome: recueil.etiquette })}
              </h2>
              <p className="font-ui text-[15px] leading-[1.55] text-encre-2">
                {t("sommaire.plan_note")}
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-8 lg:col-span-8 lg:col-start-4">
              {grouperPlan(recueil.plan).map((groupe, iGroupe) => (
                <div key={groupe.partie ?? `groupe-${iGroupe}`} className="flex flex-col">
                  {groupe.partie && (
                    <h3 className="border-b-2 border-encre pb-2.5 font-titre text-[1.25rem] leading-[1.3] font-medium text-encre md:text-[1.375rem]">
                      {groupe.partie}
                    </h3>
                  )}
                  <ol className={cn("flex flex-col", !groupe.partie && "border-t-2 border-encre")}>
                    {groupe.lignes.map((ligne) => (
                      <li
                        key={ligne.titre}
                        className="flex min-h-14 flex-col gap-2 border-b border-filet py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                      >
                        {ligne.libre ? (
                          <Link
                            href={`${base}/${ligne.libre}`}
                            className="font-ui text-[15.5px] leading-snug font-semibold text-lien underline underline-offset-[3px] hover:decoration-2"
                          >
                            {ligne.titre}
                          </Link>
                        ) : (
                          <span className="font-ui text-[15.5px] leading-snug text-encre-2">{ligne.titre}</span>
                        )}
                        <span className="shrink-0">
                          <BadgeAcces libre={!!ligne.libre} />
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

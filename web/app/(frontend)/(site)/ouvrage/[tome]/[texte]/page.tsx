import Link from "next/link";
import { notFound } from "next/navigation";
import { AcquerirTome } from "@/components/acquerir-tome";
import { getRecueil, getRecueils, getStrates, getVenteOuvrages } from "@/lib/cms";

import { dureeLecture } from "@/content/lectures";
import {
  CorpsLecture,
  NotionsTexte,
  SommaireTexte,
  notionsDuTexte,
} from "@/components/lecture";
import { BarreLectureMobile, CopierReference, PourcentageLu } from "@/components/lecture-suivi";
import { BadgeAcces, FilAriane } from "@/components/editorial";
import { formateurMeta } from "@/components/pages/ouvrage-textes";
import { libellesLecture, remplacer } from "@/lib/lecture";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Lecture d'un texte ouvert (liminaire ou chapitre en accès libre). */

// Un texte ajouté dans le back-office (Ouvrage › Textes des tomes) obtient
// sa page au premier accès ; une adresse inconnue aboutit à notFound().
export const dynamicParams = true;

/** Filet de sécurité : revalidation périodique des textes du back-office. */
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getRecueils()).flatMap((r) =>
    r.parties.flatMap((p) => p.textes).map((t) => ({ tome: r.tome, texte: t.slug })),
  );
}

async function trouver(tome: string, slug: string) {
  const recueil = await getRecueil(tome);
  if (!recueil) return null;
  const textes = recueil.parties.flatMap((p) => p.textes);
  const index = textes.findIndex((t) => t.slug === slug);
  if (index < 0) return null;
  return { recueil, textes, index, texte: textes[index] };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tome: string; texte: string }>;
}) {
  const { tome, texte: slug } = await params;
  const trouve = await trouver(tome, slug);
  if (!trouve) return {};
  const { recueil, texte } = trouve;
  const premier = texte.blocs.find((b) => b.t === "p");
  const l = await libellesLecture();
  return pageMetadata({
    title: remplacer(l["seo.texte_titre"], { titre: texte.titre, tome: recueil.etiquette }),
    description: remplacer(l["seo.texte_description"], {
      extrait:
        premier && "x" in premier ? premier.x.slice(0, 155).replace(/\s\S*$/, "") + "…" : recueil.sous_titre,
    }),
    path: `/ouvrage/${recueil.tome}/${texte.slug}`,
  });
}

const dl = (ms: number) => ({ "--dl": `${ms}ms` }) as React.CSSProperties;

export default async function LecturePage({
  params,
}: {
  params: Promise<{ tome: string; texte: string }>;
}) {
  const { tome, texte: slug } = await params;
  const trouve = await trouver(tome, slug);
  if (!trouve) notFound();
  const { recueil, textes, index, texte } = trouve;
  const precedent = textes[index - 1];
  const suivant = textes[index + 1];
  const base = `/ouvrage/${recueil.tome}`;
  const [vente, strates, l, formater] = await Promise.all([
    getVenteOuvrages(),
    getStrates(),
    libellesLecture(),
    formateurMeta(),
  ]);
  const notions = notionsDuTexte(texte, strates);
  /** Texte de Site › Lecture des tomes, marqueurs remplis. */
  const t = (cle: string, valeurs?: Record<string, string | number>) => remplacer(l[cle], valeurs);
  /** « 11 min · 7 sections » */
  const meta = (x: typeof texte) => formater(x, false);
  const tomeRomain = recueil.etiquette.replace("Tome ", "");
  // Référence : *…* = italique à l'écran ; copiée en texte brut, espaces ordinaires.
  const modeleReference = t("citer.reference", { titre: texte.titre, tome: tomeRomain, recueil: recueil.titre });
  const reference = modeleReference.replace(/\*/g, "").replace(/[\u00a0\u202f]/g, " ");
  const sommaireTome = t("rail.sommaire", { tome: recueil.etiquette });

  const outils = (
    <>
      <NotionsTexte notions={notions} />
      <div className={cn("flex flex-col gap-2.5", notions.length > 0 && "border-t border-filet pt-5")}>
        <span className="font-code text-xs tracking-[0.14em] text-encre-3 uppercase">{t("citer.titre")}</span>
        <p className="font-texte text-[13.5px] leading-[1.55] text-encre-2">
          {modeleReference.split("*").map((morceau, i) => (i % 2 === 1 ? <em key={i}>{morceau}</em> : morceau))}
        </p>
        <CopierReference texte={reference} copier={t("citer.copier")} copiee={t("citer.copiee")} />
      </div>
    </>
  );

  return (
    <>
      <BarreLectureMobile
        etiquette={recueil.etiquette}
        index={index}
        sommaire={base}
        libelles={{
          aria: t("rail.aria", { tome: recueil.etiquette }),
          sommaire: t("mobile.sommaire"),
          sommaireTome,
          progression: t("mobile.progression_aria"),
        }}
        textes={textes.map((x) => ({ titre: x.titre, href: `${base}/${x.slug}`, meta: meta(x) }))}
      />

      <div className="surface-claire bg-papier px-5 lg:px-6 xl:px-10">
        <div className="mx-auto max-w-[1280px]">
          {/* Ouverture */}
          <div className="grid border-b border-filet pt-8 pb-10 md:pt-14 md:pb-12 lg:grid-cols-12 lg:gap-x-6">
            <div className="flex flex-col gap-4 lg:col-span-7 lg:col-start-4">
              <div className="m-rise" style={dl(100)}>
                <FilAriane
                  items={[
                    { label: t("fil_ariane.ouvrage"), href: "/ouvrage" },
                    { label: recueil.etiquette, href: base },
                    { label: texte.titre },
                  ]}
                />
              </div>
              <span className="m-rise mt-2 font-code text-xs tracking-[0.14em] text-or-700 uppercase" style={dl(200)}>
                {t("texte.position", { tome: recueil.etiquette, n: index + 1, total: textes.length })}
              </span>
              <h1
                className="m-rise font-titre text-[2.25rem] leading-[1.08] font-medium text-balance text-encre md:text-[3.75rem] md:leading-[1.05]"
                style={dl(300)}
              >
                {texte.titre}
              </h1>
              {texte.sous_titre && (
                <p className="m-rise font-texte text-[1.1875rem] leading-[1.45] text-encre-2 italic md:text-[1.4375rem]" style={dl(450)}>
                  {texte.sous_titre}
                </p>
              )}
              <div className="m-rise mt-1.5 flex flex-wrap items-center gap-4" style={dl(600)}>
                <span className="font-ui text-sm text-encre-3">{t("texte.duree", { min: dureeLecture(texte) })}</span>
                <BadgeAcces libre />
              </div>
            </div>
          </div>

          {/* Corps : rail des textes · texte · outils */}
          <div className="grid items-start gap-x-6 pt-10 pb-16 md:pt-14 lg:grid-cols-12">
            <aside
              aria-label={t("rail.aria", { tome: recueil.etiquette })}
              className="m-rise sticky top-6 hidden max-h-[calc(100vh-3rem)] flex-col gap-2 overflow-y-auto pr-6 lg:col-span-3 lg:flex"
              style={dl(700)}
            >
              <span className="pb-2 font-code text-xs tracking-[0.14em] text-or-700 uppercase">
                {recueil.etiquette} · {recueil.titre.length > 24 ? t("rail.textes_ouverts") : recueil.titre}
              </span>
              <ol className="flex flex-col">
                {textes.map((x, i) =>
                  i === index ? (
                    <li key={x.slug} className="my-1">
                      <Link
                        href={`${base}/${x.slug}`}
                        aria-current="page"
                        className="-mx-3 grid grid-cols-[28px_minmax(0,1fr)] gap-2.5 rounded-[2px] border border-filet bg-blanc p-3"
                      >
                        <span className="font-code text-[11.5px] text-or-700">{String(i + 1).padStart(2, "0")}</span>
                        <span className="flex flex-col gap-0.5">
                          <span className="font-ui text-[14.5px] font-semibold text-encre">{x.titre}</span>
                          <PourcentageLu libelle={t("rail.vous_lisez")} />
                        </span>
                      </Link>
                      <SommaireTexte texte={texte} className="mt-2 ml-[38px]" />
                    </li>
                  ) : (
                    <li key={x.slug}>
                      <Link
                        href={`${base}/${x.slug}`}
                        className="glisse group grid min-h-11 grid-cols-[28px_minmax(0,1fr)] gap-2.5 border-t border-filet-doux py-3"
                      >
                        <span className="font-code text-[11.5px] text-encre-3">{String(i + 1).padStart(2, "0")}</span>
                        <span className="flex flex-col gap-0.5">
                          <span className="font-ui text-[14.5px] text-encre-2 group-hover:underline">{x.titre}</span>
                          <span className="font-code text-[11.5px] text-encre-3">
                            {meta(x)}
                            {i < index && ` ${t("rail.lu")}`}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ),
                )}
              </ol>
              <Link href={base} className="mt-3 flex min-h-9 items-center font-ui text-sm font-medium text-lien">
                {sommaireTome}
              </Link>
            </aside>

            <article id="texte" className="min-w-0 lg:col-span-7 lg:col-start-4">
              <CorpsLecture texte={texte} />

              <p className="mt-10 max-w-[680px] border-t border-filet pt-5 font-ui text-sm leading-relaxed text-encre-3">
                {t("texte.mention", { tome: recueil.etiquette })}
              </p>
              <AcquerirTome offre={vente[recueil.tome]} etiquette={recueil.etiquette} variante="nuit" className="mt-5" />

              {/* Outils (mobile et tablette) */}
              <div className="mt-12 flex flex-col gap-8 lg:hidden">{outils}</div>

              <nav aria-label={t("navigation.aria")} className="rv mt-14 flex max-w-[680px] flex-col gap-4">
                {suivant && (
                  <Link
                    href={`${base}/${suivant.slug}`}
                    className="surface-sombre souleve flex flex-col gap-2.5 rounded-[4px] bg-nuit-950 px-6 py-6 md:px-8 md:py-7"
                  >
                    <span className="font-code text-[11.5px] tracking-[0.12em] text-or-500 uppercase">
                      {t("navigation.suivant", { n: index + 2, total: textes.length })}
                    </span>
                    <span className="font-titre text-[1.625rem] leading-[1.15] font-medium text-white md:text-[2rem]">
                      {suivant.titre}
                    </span>
                    {suivant.sous_titre && (
                      <span className="font-texte text-[17px] text-nuit-100 italic md:text-lg">{suivant.sous_titre}</span>
                    )}
                    <span className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-ui text-sm text-nuit-300">{formater(suivant)}</span>
                      <span className="font-ui text-[15px] font-semibold text-or-300">
                        {t("navigation.continuer")} <span className="arr" aria-hidden="true">→</span>
                      </span>
                    </span>
                  </Link>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  {precedent ? (
                    <Link
                      href={`${base}/${precedent.slug}`}
                      className="souleve flex flex-col gap-2.5 rounded-[4px] border border-filet bg-blanc px-6 py-5 hover:border-encre"
                    >
                      <span className="font-code text-[11.5px] text-encre-3">{t("navigation.precedent")}</span>
                      <span className="font-titre text-[19px] text-encre">{precedent.titre}</span>
                    </Link>
                  ) : (
                    <Link
                      href="/ouvrage"
                      className="souleve flex flex-col gap-2.5 rounded-[4px] border border-filet bg-blanc px-6 py-5 hover:border-encre"
                    >
                      <span className="font-code text-[11.5px] text-encre-3">{t("navigation.retour_ouvrage")}</span>
                      <span className="font-titre text-[19px] text-encre">{t("fil_ariane.ouvrage")}</span>
                    </Link>
                  )}
                  <Link
                    href={base}
                    className="souleve flex flex-col gap-2.5 rounded-[4px] border border-filet bg-blanc px-6 py-5 hover:border-encre"
                  >
                    <span className="font-code text-[11.5px] text-encre-3">{t("navigation.revenir")}</span>
                    <span className="font-titre text-[19px] text-encre">{sommaireTome}</span>
                  </Link>
                </div>
              </nav>
            </article>

            <aside
              aria-label={t("outils.aria")}
              className="m-rise sticky top-6 hidden flex-col gap-9 lg:col-span-2 lg:col-start-11 lg:flex"
              style={dl(850)}
            >
              {outils}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

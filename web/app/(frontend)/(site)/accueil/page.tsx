import Link from "next/link";
import { PyramideSigma, type NiveauPyramide, type TextesPyramide } from "@/components/pyramide-sigma";
import { buttonVariants } from "@/components/ui/button";
import { numero2 } from "@/lib/navigation";
import { getNavigation } from "@/lib/navigation-textes";
import { cn } from "@/lib/utils";
import { pageMetadata, JsonLd, organizationJsonLd } from "@/lib/seo";
import { getListe, getTexte, getTextes } from "@/lib/contenu";

export async function generateMetadata() {
  return pageMetadata({
    title: await getTexte("accueil.seo.titre"),
    description: await getTexte("accueil.seo.description"),
    path: "/accueil",
  });
}

/** Textes éditables (back-office → Pages → Accueil) : la page se régénère au plus tard toutes les heures. */
export const revalidate = 3600;

const dl = (ms: number) => ({ "--dl": `${ms}ms` }) as React.CSSProperties;

/** Ciel étoilé : continuité avec le Fronton (positions déterministes). */
const ETOILES = Array.from({ length: 34 }, (_, i) => ({
  x: ((i * 37.7) % 100).toFixed(1),
  y: ((i * 61.3 + 7) % 92).toFixed(1),
  r: 1 + (i % 3) * 0.6,
  du: (3 + (i % 5) * 0.9).toFixed(1),
  dl: (i * 270) % 4000,
}));

type Porte = { etiquette: string; titre: string; texte: string; action: string; lien: string };
type Resume = { page_id: string; titre: string; resume: string };

/** PAGE 1 — LE SEUIL. */
export default async function LeSeuil() {
  const textes = await getTextes("accueil");
  /** Texte simple de la page (clé sans le préfixe « accueil. »). */
  const t = (cle: string) => {
    const v = textes[cle];
    if (v === undefined) throw new Error(`Bloc inconnu du registre : accueil.${cle}`);
    return v;
  };
  const [niveaux, portes, resumes] = await Promise.all([
    getListe<NiveauPyramide>("accueil.niveaux_pyramide"),
    getListe<Porte>("accueil.portes"),
    getListe<Resume>("accueil.resumes"),
  ]);
  const RESUMES = new Map(resumes.map((r) => [r.page_id, r]));
  const TITRE = t("ouverture.titre").split(" ");
  const formuleSigma = t("ouverture.formule_sigma");
  const formuleMaat = t("ouverture.formule_maat");
  // La largeur et le nombre de pas de l'animation « machine à écrire » suivent la longueur de la formule.
  const lgSigma = Array.from(formuleSigma).length;
  const lgMaat = Array.from(formuleMaat).length;
  const textesPyramide: TextesPyramide = {
    titre: t("pyramide.titre"),
    consigne: t("pyramide.consigne"),
    axe_descendant: t("pyramide.axe_descendant"),
    axe_descendant_legende: t("pyramide.axe_descendant_legende"),
    axe_ascendant: t("pyramide.axe_ascendant"),
    axe_ascendant_legende: t("pyramide.axe_ascendant_legende"),
    groupe_lecture: t("pyramide.groupe_lecture"),
    position: t("pyramide.position"),
    symbole_vide: t("pyramide.symbole_vide"),
    lien_entree: t("pyramide.lien_entree"),
  };

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* Ouverture nocturne : prolonge le ciel du Fronton */}
      <section
        aria-labelledby="titre-seuil"
        className="surface-sombre relative overflow-hidden bg-nuit-950 px-5 pt-10 pb-20 lg:px-6 lg:pt-16 lg:pb-28 xl:px-10"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {ETOILES.map((s, i) => (
            <span
              key={i}
              className="etoile"
              style={
                {
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.r}px`,
                  height: `${s.r}px`,
                  "--du": `${s.du}s`,
                  "--dl": `${s.dl}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative mx-auto flex max-w-[1280px] flex-col gap-12 lg:gap-16">
          <p
            className="m-track mx-auto max-w-[820px] text-center font-titre text-[13px] leading-[1.8] tracking-[0.14em] text-or-300 uppercase md:text-[15px]"
            style={dl(200)}
          >
            {t("ouverture.dedicace")}
          </p>

          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="flex flex-col gap-8 lg:pt-6">
              <span className="m-rise font-code text-xs tracking-[0.14em] text-or-500 uppercase" style={dl(500)}>
                {t("ouverture.surtitre")}
              </span>
              <h1
                id="titre-seuil"
                className="font-titre text-[2.375rem] leading-[1.1] font-medium text-white md:text-[3.25rem] xl:text-[4rem] xl:leading-[1.08]"
              >
                {TITRE.map((m, i) => (
                  <span key={i}>
                    <span className="mot" style={dl(600 + i * 90)}>
                      {m}
                    </span>
                    {i < TITRE.length - 1 && " "}
                  </span>
                ))}
              </h1>
              <p className="m-rise font-texte text-[1.1875rem] leading-normal text-nuit-100 italic md:text-[1.4375rem]" style={dl(1300)}>
                {t("ouverture.citation")}
              </p>
              <div
                role="group"
                aria-label={t("ouverture.formules_lecture")}
                className="relative flex flex-col gap-2.5 py-5"
              >
                <span aria-hidden="true" className="m-draw absolute inset-x-0 top-0 h-px bg-nuit-800" style={dl(1500)} />
                <span
                  aria-hidden="true"
                  className="typ font-code text-xl font-medium text-or-500 md:text-[22px]"
                  style={{
                    width: `${lgSigma}ch`,
                    animation: `pr-type 1.1s steps(${lgSigma},end) 1.7s both, pr-caret .6s step-end 1.7s 4`,
                  }}
                >
                  {formuleSigma}
                </span>
                <span
                  aria-hidden="true"
                  className="typ font-code text-xl font-medium text-or-500 md:text-[22px]"
                  style={{
                    width: `${lgMaat}ch`,
                    animation: `pr-type 1.4s steps(${lgMaat},end) 2.9s both, pr-caret .6s step-end 2.9s 5`,
                  }}
                >
                  {formuleMaat}
                </span>
                <span aria-hidden="true" className="m-draw absolute inset-x-0 bottom-0 h-px bg-nuit-800" style={dl(1700)} />
              </div>
              <div className="m-rise flex flex-wrap gap-3.5" style={dl(2000)}>
                <Link href="/institution" className={buttonVariants({ variant: "or-plein", size: "cta" })}>
                  {t("ouverture.bouton_institut")} <span className="arr" aria-hidden="true">→</span>
                </Link>
                <Link href="/ouvrage" className={buttonVariants({ variant: "or", size: "cta" })}>
                  {t("ouverture.bouton_tomes")}
                </Link>
              </div>
            </div>

            <PyramideSigma niveaux={niveaux} textes={textesPyramide} />
          </div>
        </div>
      </section>

      {/* Axiome */}
      <section
        aria-labelledby="titre-axiome"
        className="surface-claire bg-papier px-5 py-16 lg:px-6 lg:py-[120px] xl:px-10"
      >
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <figure className="rv m-0 flex flex-col gap-5">
            <span aria-hidden="true" className="rv-draw h-0.5 w-20 bg-or-500" />
            <blockquote className="font-texte text-[1.625rem] leading-[1.4] text-balance text-encre italic md:text-[2.125rem]">
              {t("axiome.citation")}
            </blockquote>
          </figure>
          <div className="surface-sombre rv rv2 flex flex-col gap-4 rounded-[4px] bg-nuit-950 px-6 py-8 md:px-12 md:py-11">
            <h2 id="titre-axiome" className="font-titre text-[1.625rem] font-medium text-or-500 md:text-[1.75rem]">
              {t("axiome.titre")}
            </h2>
            <p className="font-texte text-lg leading-[1.7] text-nuit-100 md:text-[1.1875rem]">
              {t("axiome.texte")}
            </p>
          </div>
        </div>
      </section>

      {/* Trois portes */}
      <section
        aria-labelledby="titre-portes"
        className="surface-claire bg-papier px-5 pb-20 lg:px-6 lg:pb-32 xl:px-10"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
          <div className="relative flex flex-col gap-3 pt-14 md:flex-row md:items-end md:justify-between md:gap-10">
            <span aria-hidden="true" className="rv-draw absolute inset-x-0 top-0 h-px bg-filet" />
            <h2 id="titre-portes" className="rv font-titre text-[2rem] leading-[1.15] font-medium text-encre md:text-[2.5rem]">
              {t("portes.titre")}
            </h2>
            <span className="rv font-code text-[12.5px] text-encre-3">
              {t("portes.sous_titre")}
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {portes.map((p, i) => (
              <Link
                key={i}
                href={p.lien}
                className={cn(
                  "souleve rv flex flex-col gap-3.5 rounded-[4px] border border-filet bg-blanc p-6 hover:border-encre md:p-8",
                  i === 1 && "rv2",
                  i === 2 && "rv3",
                )}
              >
                <span className="font-code text-xs tracking-[0.14em] text-or-700 uppercase">{p.etiquette}</span>
                <span className="font-titre text-[1.625rem] leading-[1.2] font-medium text-encre md:text-[28px]">
                  {p.titre}
                </span>
                <span aria-hidden="true" className="trait-or" />
                <span className="font-texte text-[17px] leading-[1.6] text-encre-2">{p.texte}</span>
                <span className="mt-auto pt-3 font-ui text-[15px] font-semibold text-lien">
                  {p.action} <span className="arr" aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* L’œuvre en dix pages */}
      <section
        aria-labelledby="titre-plan"
        className="surface-claire bg-papier-2 px-5 py-16 lg:px-6 lg:py-28 xl:px-10"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
          <div className="rv grid items-end gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <h2 id="titre-plan" className="font-titre text-[2rem] leading-[1.15] font-medium text-encre md:text-[2.5rem]">
              {t("plan.titre")}
            </h2>
            <p className="font-texte text-[16.5px] leading-[1.65] text-encre-2 md:text-lg">
              {t("plan.chapeau")}
            </p>
          </div>
          <ol className="grid gap-10 lg:grid-cols-[1fr_3fr_4fr_2fr] lg:gap-6">
            {(await getNavigation()).familles.map((f) => (
              <li key={f.id} className="flex flex-col gap-4">
                <span className="flex flex-col gap-3">
                  <span className="font-code text-xs tracking-[0.14em] text-encre-3 uppercase">
                    {f.id === "Le Seuil" ? t("plan.famille_seuil") : f.titre}
                  </span>
                  <span aria-hidden="true" className="rv-draw h-0.5 bg-encre" />
                </span>
                <div
                  className={cn(
                    "grid gap-5",
                    f.pages.length === 2 && "grid-cols-2",
                    f.pages.length === 3 && "grid-cols-2 sm:grid-cols-3",
                    f.pages.length === 4 && "grid-cols-2 sm:grid-cols-4",
                  )}
                >
                  {f.pages.map((p) => (
                    <Link
                      key={p.page_id}
                      href={p.href}
                      className="group rv flex flex-col gap-1.5 transition-transform duration-300 hover:-translate-y-[3px]"
                    >
                      <span className="font-code text-xs tracking-[0.14em] text-or-700">{numero2(p.numero)}</span>
                      <span className="font-titre text-xl break-words hyphens-auto text-encre group-hover:underline group-hover:decoration-or-500 group-hover:underline-offset-[5px]">
                        {RESUMES.get(p.page_id)?.titre}
                      </span>
                      <span className="font-ui text-[13.5px] leading-[1.45] text-encre-3">
                        {RESUMES.get(p.page_id)?.resume}
                      </span>
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Clôture */}
      <section className="surface-sombre flex flex-col items-center gap-7 bg-nuit-950 px-5 pt-20 pb-20 text-center lg:pt-28 lg:pb-24">
        <span aria-hidden="true" className="rv-draw h-0.5 w-[120px] origin-center bg-or-500" />
        <p className="rv max-w-[760px] font-texte text-[1.375rem] leading-normal text-white italic md:text-[1.625rem]">
          {t("cloture.citation")}
        </p>
        <span className="rv rv2 font-code text-xs tracking-[0.18em] text-nuit-300">
          {t("cloture.locus")}
        </span>
        <Link
          href="/institution"
          className={cn(buttonVariants({ variant: "or-plein", size: "cta" }), "rv rv2 mt-3")}
        >
          {t("ouverture.bouton_institut")} <span className="arr" aria-hidden="true">→</span>
        </Link>
        <Link href="/institution" className="rv rv3 mt-6 flex min-h-11 flex-col items-center gap-1">
          <span className="font-code text-[11.5px] text-nuit-300">
            {t("cloture.page_suivante")} <span className="arr" aria-hidden="true">→</span>
          </span>
          <span className="font-titre text-xl text-or-300">{t("cloture.page_suivante_titre")}</span>
        </Link>
      </section>
    </>
  );
}

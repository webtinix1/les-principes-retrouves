import Link from "next/link";
import { cookies } from "next/headers";

import { BlocProse } from "@/components/bloc";
import { AccesForm } from "@/components/acces-form";
import { BlocSection, Cloture, Exergue, OuverturePage } from "@/components/editorial";
import { BoucleAcces } from "@/components/pages/commande-boucle";
import { CarteRessource, ChaineProgression } from "@/components/pages/labo-ressource";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getListesLaboratoire, getRessources, type RessourceCms } from "@/lib/cms";
import { ACCESS_COOKIE, niveauDebloque, validerCode } from "@/lib/access";
import { getTextes } from "@/lib/contenu";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const t = await getTextes("laboratoire");
  return pageMetadata({
    title: t["seo.titre"],
    description: t["seo.description"],
    path: "/laboratoire",
  });
}

/* Gating par code d'accès actif. Les PDF intégraux, la disponibilité et le
   niveau requis se règlent dans le back-office (Laboratoire → Ressources). */

/** Présentation des trois niveaux (même dessin que la boucle de Transmission). */
const NIVEAU_STYLE = [
  { carte: "border border-filet bg-blanc", numero: "text-encre-3", titre: "text-encre", texte: "text-encre-2" },
  { carte: "border border-encre bg-blanc", numero: "text-or-700", titre: "text-encre", texte: "text-encre-2" },
  { carte: "surface-sombre bg-nuit-950", numero: "text-or-500", titre: "text-white", texte: "text-nuit-100" },
];

/** PAGE 7 — LABORATOIRE DOCTRINAL (Version finale avec politique d'accès hybride). */
export default async function LaboratoirePage() {
  // État d'accès de la session (code d'accès + disponibilité des ressources).
  const code = (await cookies()).get(ACCESS_COOKIE)?.value;
  const res = code ? await validerCode(code) : null;
  const niveauActif = res && res.valid ? res.niveau : null;

  const [ressources, { niveaux_acces: NIVEAUX_ACCES, progression: PROGRESSION }, t] =
    await Promise.all([getRessources(), getListesLaboratoire(), getTextes("laboratoire")]);
  const SOMMAIRE = [
    { id: "acces", label: t["acces.titre"] },
    { id: "working-papers", label: t["working_papers.titre"] },
    { id: "pieces", label: t["pieces.titre"] },
    { id: "progression", label: t["progression.titre"] },
  ];
  const WORKING_PAPERS = ressources.filter((r) => r.categorie === "working_paper");
  const PIECES_OPERATOIRES = ressources.filter((r) => r.categorie === "piece_operatoire");
  const etatRessource = (r: RessourceCms) => ({
    available: r.is_available,
    unlocked: niveauActif ? niveauDebloque(niveauActif, r) : false,
  });

  return (
    <>
      <OuverturePage
        page_id="laboratoire"
        titre={t["hero.titre"]}
        sousTitre={t["hero.sous_titre"]}
        sommaire={SOMMAIRE}
      >
        <Exergue>{t["hero.exergue"]}</Exergue>
      </OuverturePage>

      {/* Introduction au Laboratoire */}
      <section className="surface-claire bg-papier px-5 pt-14 pb-14 md:pt-24 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto grid max-w-[1280px] lg:grid-cols-12 lg:gap-x-6">
          <BlocProse cle="laboratoire.introduction.corps" className="lg:col-span-8 lg:col-start-4">
            <p>
              Ce Laboratoire ne propose pas de simples commentaires académiques.
              Il met à disposition des praticiens mondiaux — juristes,
              magistrats, chercheurs, avocats — les instruments concrets de la
              Méthode Reconstructive (Méthode M).
            </p>
            <p>
              Les documents ci-dessous sont conçus pour armer l’intelligence du
              chercheur et du praticien face aux fictions de clôture des
              paradigmes saturés. Ils matérialisent le passage de l’Organon
              théorique (Tome I) au Laboratoire pratique (Tome II), en offrant
              des protocoles de détection, de qualification et d’action face aux
              anomalies structurelles.
            </p>
            <p>
              Chaque pièce est soumise aux mêmes exigences de démonstration qui
              ont présidé à l’élaboration des <em>Principes Retrouvés</em>.
              Aucune ne sollicite une adhésion préalable ; chacune demande à être
              éprouvée dans la rigueur de son application.
            </p>
          </BlocProse>
        </div>
      </section>

      {/* Politique d'accès hybride — présentée comme INFORMATION */}
      <section id="acces" className="surface-claire bg-papier px-5 pb-14 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 border-t border-filet pt-14 md:pt-24">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
            <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:col-span-3 lg:text-[1.875rem]">
              {t["acces.titre"]}
            </h2>
            <BlocProse cle="laboratoire.acces_hybride.corps" className="lg:col-span-8 lg:col-start-4">
              <p>
                Conformément au{" "}
                <strong>Principe de Souveraineté du Démontré</strong> et à la
                distinction des deux temporalités (temps de la démonstration /
                temps de la réception), l’accès à l’arsenal obéit à une logique de
                compartimentation sémantique à trois niveaux.
              </p>
            </BlocProse>
          </div>

          <ol className="grid items-end gap-4 lg:grid-cols-3 lg:gap-6">
            {NIVEAUX_ACCES.map((niveau, i) => {
              const s = NIVEAU_STYLE[i] ?? NIVEAU_STYLE[0];
              return (
                <li
                  key={niveau.numero}
                  className={cn(
                    "rv flex flex-col gap-3 rounded-[4px] p-7",
                    i === 1 && "rv2 lg:min-h-[260px]",
                    i === 2 && "rv3 lg:min-h-[300px]",
                    i === 0 && "lg:min-h-[220px]",
                    s.carte,
                  )}
                >
                  <span className={cn("font-code text-xs tracking-[0.14em] uppercase", s.numero)}>
                    {niveau.numero}
                  </span>
                  <h3 className={cn("font-titre text-2xl font-medium", s.titre)}>{niveau.titre}</h3>
                  <p className={cn("font-ui text-[15px] leading-[1.55]", s.texte)}>{niveau.description}</p>
                </li>
              );
            })}
          </ol>

          <p className="max-w-[680px] font-texte text-[17px] leading-[1.7] text-encre-2 italic lg:ml-[calc(25%+6px)]">
            {t["acces.ressources"]}
          </p>

          {/* Saisie du code d'accès (débloque les téléchargements conditionnés) */}
          <div id="code" className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
            <div className="rv flex flex-col gap-6 rounded-[4px] border border-filet bg-blanc p-6 md:p-10 lg:col-span-7">
              <div className="flex flex-col gap-2">
                <h3 className="font-titre text-[26px] leading-[1.25] font-medium text-encre">
                  {t["code.titre"]}
                </h3>
                <p className="font-ui text-[15px] leading-[1.55] text-encre-2">
                  {t["code.texte"]}
                </p>
              </div>
              <AccesForm niveauActif={niveauActif} />
            </div>
            <BoucleAcces courante={3} className="lg:col-span-4 lg:col-start-9 lg:self-center" />
          </div>
        </div>
      </section>

      {/* Les trois Working Papers fondateurs */}
      <section id="working-papers" className="surface-claire bg-papier px-5 pb-14 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 border-t border-filet pt-14 md:pt-24">
          <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre md:text-[2.125rem]">
            {t["working_papers.titre"]}
          </h2>
          <div className="grid gap-8">
            {WORKING_PAPERS.map((ressource) => (
              <CarteRessource key={ressource.id} ressource={ressource} {...etatRessource(ressource)} />
            ))}
          </div>
        </div>
      </section>

      {/* Les deux pièces opératoires */}
      <section id="pieces" className="surface-claire bg-papier px-5 pb-14 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 border-t border-filet pt-14 md:pt-24">
          <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre md:text-[2.125rem]">
            {t["pieces.titre"]}
          </h2>
          <div className="grid gap-8">
            {PIECES_OPERATOIRES.map((ressource) => (
              <CarteRessource key={ressource.id} ressource={ressource} {...etatRessource(ressource)} />
            ))}
          </div>
        </div>
      </section>

      {/* La progression logique de l'arsenal */}
      <BlocSection id="progression" titre={t["progression.titre"]}>
        <div className="flex flex-col gap-10">
          <BlocProse cle="laboratoire.progression.corps">
            <p>
              L’arsenal se déploie selon une progression rigoureuse qui respecte
              l’architecture constitutive de la Science Métamoderne. Chaque pièce
              s’appuie sur la précédente, formant un édifice doctrinal cohérent et
              opposable. Elle respecte également le{" "}
              <strong>Principe de Souveraineté du Démontré</strong> : l’accès aux
              outils opérationnels est subordonné à la maîtrise préalable des
              fondements épistémologiques.
            </p>
          </BlocProse>
          <ChaineProgression etapes={PROGRESSION} />
        </div>
      </BlocSection>

      {/* Appel à l'épreuve */}
      <Cloture
        suite={
          <Link
            href="/concepts"
            className="flex min-h-11 items-center gap-1.5 font-ui text-[15px] font-semibold text-lien"
          >
            {t["cloture.lien"]} <span className="arr" aria-hidden="true">→</span>
          </Link>
        }
      >
        {t["cloture.texte"]}
      </Cloture>
    </>
  );
}

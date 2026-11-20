import Link from "next/link";

import { getAutorites, getVenteOuvrages } from "@/lib/cms";
import { AcquerirTome } from "@/components/acquerir-tome";
import { getRecueils } from "@/lib/cms";
import { Carte, Encadre, Etiquette } from "@/components/primitives";
import { BlocProse } from "@/components/bloc";
import { BadgeAcces, BlocSection, Cloture, Exergue, OuverturePage } from "@/components/editorial";
import { LigneTexteCompacte } from "@/components/pages/ouvrage-textes";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getListe, getTexte, getTextes, remplir } from "@/lib/contenu";

export async function generateMetadata() {
  return pageMetadata({
    title: await getTexte("ouvrage.seo.titre"),
    description: await getTexte("ouvrage.seo.description"),
    path: "/ouvrage",
  });
}

/** Élément des listes de l'encadré « Noyau / Expansion » (`content/blocs/ouvrage.ts`). */
type ElementProgramme = { terme: string; texte: string };

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

/**
 * Corps riche des cartes « Présentation symétrique » : neutralise la colonne de
 * prose de `BlocProse` pour garder la typographie de la carte (17 px, interligne
 * 1,7, paragraphes espacés par le gap de 16 px).
 */
const CORPS_CARTE =
  "flex max-w-none flex-col gap-4 text-[17px] leading-[1.7] md:text-[17px] md:leading-[1.7] [&_p]:mt-0 [&_p]:text-wrap";

/** En-tête de section large : H2 en colonnes 1–3, chapeau en colonnes 4–11, filet au-dessus. */
function EnteteSection({ titre, children }: { titre: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid gap-x-6 gap-y-6 lg:grid-cols-12">
      <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:col-span-3 lg:text-[1.875rem]">
        {titre}
      </h2>
      {children && <div className="min-w-0 lg:col-span-8 lg:col-start-4">{children}</div>}
    </div>
  );
}

/** PAGE 6 — L'OUVRAGE (version actualisée) : Le Diptyque du Noyau Démontré. */
export default async function OuvragePage() {
  const [AUTORITES, VENTE, t, NOYAU, EXPANSION] = await Promise.all([
    getAutorites(),
    getVenteOuvrages(),
    getTextes("ouvrage"),
    getListe<ElementProgramme>("ouvrage.noyau"),
    getListe<ElementProgramme>("ouvrage.expansion"),
  ]);
  const SOMMAIRE = [
    { id: "acces-libre", label: t["textes_liminaires.titre"] },
    { id: "introduction", label: t["introduction.titre"] },
    { id: "presentation", label: t["presentation.titre"] },
    { id: "autorites", label: t["sommaire.autorites"] },
    { id: "programme", label: t["sommaire.programme"] },
  ];
  return (
    <>
      <OuverturePage
        page_id="ouvrage"
        titre={t["hero.titre"]}
        sousTitre={t["hero.sous_titre"]}
        sommaire={SOMMAIRE}
        actions={
          <a href="#acces-libre" className={buttonVariants({ variant: "or-plein", size: "cta" })}>
            {t["hero.bouton"]} <span aria-hidden="true">↓</span>
          </a>
        }
      >
        <Exergue>{t["hero.exergue"]}</Exergue>
      </OuverturePage>

      {/* 1 — Accès libre aux tomes, en premier : le diptyque Tome I / Tome II */}
      <section id="acces-libre" className="surface-claire bg-papier px-5 pt-14 pb-14 md:pt-24 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
          <EnteteSection titre={t["textes_liminaires.titre"]}>
            <BlocProse cle="ouvrage.textes_liminaires.corps">
              <p>
                Le diptyque est encadré par des textes liminaires qui en
                garantissent la réception et la cohérence :
              </p>
            </BlocProse>
          </EnteteSection>
          {/* Lecture en accès libre — cartes Trello « Modification Tome I / II » :
              textes publiés un à un, chacun avec son lien ; pour le Tome II,
              le liminaire d'abord, puis les chapitres I, II et VII. */}
          <div className="grid gap-6 lg:grid-cols-2">
            {(await getRecueils()).map((recueil, iRecueil) => {
              // Numérotation continue des textes d'une partie à l'autre.
              const debuts = recueil.parties.map((_, i) =>
                recueil.parties.slice(0, i).reduce((n, p) => n + p.textes.length, 0),
              );
              const total = recueil.parties.reduce((n, p) => n + p.textes.length, 0);
              return (
                <article
                  key={recueil.tome}
                  aria-labelledby={`titre-${recueil.tome}`}
                  className={cn(
                    "rv flex flex-col gap-4 rounded-[4px] border border-filet bg-blanc p-6 md:p-8",
                    iRecueil === 1 && "rv2",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Etiquette>{recueil.etiquette}</Etiquette>
                    <BadgeAcces libre />
                  </div>
                  <h3
                    id={`titre-${recueil.tome}`}
                    className="font-titre text-[1.5rem] leading-[1.2] font-medium text-balance text-encre md:text-[1.75rem]"
                  >
                    {recueil.titre}
                  </h3>
                  <p className="font-texte text-[16.5px] leading-[1.5] text-encre-2 italic">
                    {recueil.sous_titre}
                  </p>
                  <div className="mt-2 flex flex-col gap-6">
                    {recueil.parties.map((partie, iPartie) => (
                      <div key={partie.titre} className="flex flex-col">
                        <span className="pb-1 font-ui text-sm font-semibold text-encre">{partie.titre}</span>
                        <span className="pb-3 font-ui text-[13.5px] text-encre-3">{partie.description}</span>
                        <ol className="border-b border-filet-doux">
                          {partie.textes.map((texte, iTexte) => (
                            <LigneTexteCompacte
                              key={texte.slug}
                              href={`/ouvrage/${recueil.tome}/${texte.slug}`}
                              rang={debuts[iPartie] + iTexte + 1}
                              texte={texte}
                            />
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">
                    <Link
                      href={`/ouvrage/${recueil.tome}`}
                      className={buttonVariants({ variant: "or", size: "cta" })}
                    >
                      {remplir(t["acces_libre.bouton_lire"], { tome: recueil.etiquette })}{" "}
                      <span className="arr" aria-hidden="true">→</span>
                    </Link>
                    <span className="font-code text-[11.5px] text-encre-3">
                      {remplir(t["acces_libre.compteur"], { n: total })}
                    </span>
                  </div>
                  <AcquerirTome
                    offre={VENTE[recueil.tome]}
                    etiquette={recueil.etiquette}
                    variante="nuit"
                    className="border-t border-filet-doux pt-5"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2 — Introduction au diptyque */}
      <BlocSection id="introduction" titre={t["introduction.titre"]}>
        <BlocProse cle="ouvrage.introduction.corps">
          <p>
            <em>Les Principes Retrouvés</em> ne se présentent ni comme une
            doctrine achevée, ni comme un système clos, ni comme une
            philosophie supplémentaire des sciences. Ils se constituent comme
            le <strong>premier traité systématique</strong> issu d’un
            Programme Général de Recherche ayant pour objet l’intelligibilité
            elle-même.
          </p>
          <p>
            L’architecture de l’ensemble repose sur une symétrie rigoureuse
            entre deux mouvements complémentaires :
          </p>
          <p>
            <strong>Le Tome I</strong> pose l’ontologie et l’épistémologie
            fondamentales. Il formalise la matrice Σ et déploie le Canon de la
            Découverte en sept principes. Il constitue l’<strong>Organon</strong>{" "}
            — l’instrument de recherche de second ordre qui permet au
            chercheur, quelle que soit sa discipline, de remonter de ses
            anomalies vers les principes qui les rendent possibles.
          </p>
          <p>
            <strong>Le Tome II</strong> transpose cette axiomatique dans le
            laboratoire du droit constitutionnel. Il formule le{" "}
            <strong>Théorème de la Validité Inversée</strong> et codifie la
            Proactivité Judiciaire Encadrée. Il constitue le terrain d’essai
            clinique où la méthode est éprouvée sur les pathologies
            systémiques de l’État de droit.
          </p>
          <p>
            Ensemble, ces deux volumes ne clôturent pas la recherche. Ils
            ouvrent un espace où la recherche peut se poursuivre selon des
            règles explicites, discutables et continuellement perfectibles. Si
            cette démarche est fondée, <em>Les Principes Retrouvés</em> ne
            marquent pas l’achèvement d’une théorie. Ils constituent l’acte
            fondateur d’un programme de recherche appelé à produire, par la
            même méthode et sous les mêmes exigences, une série de
            démonstrations nouvelles dans les différents champs de la
            connaissance.
          </p>
        </BlocProse>
      </BlocSection>

      {/* 3 — Présentation symétrique du diptyque */}
      <section id="presentation" className="surface-claire bg-papier px-5 pb-14 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 border-t border-filet pt-14 md:pt-24">
          <EnteteSection titre={t["presentation.titre"]} />
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Colonne gauche — Tome I */}
            <Carte className="rv flex flex-col gap-4">
              <Etiquette>{t["presentation.tome_i.etiquette"]}</Etiquette>
              <h3 className="font-titre text-[1.5rem] leading-[1.2] font-medium text-encre md:text-[1.75rem]">
                {t["presentation.tome_i.titre"]}
              </h3>
              <p className="font-texte text-[16.5px] leading-[1.5] text-encre-2 italic">
                {t["presentation.tome_i.sous_titre"]}
              </p>
              <div className="mt-2 flex flex-col gap-4 border-t border-filet-doux pt-6 font-texte text-[17px] leading-[1.7] text-encre">
                <p className="font-titre text-[1.25rem] leading-[1.4] text-encre italic">
                  {t["presentation.tome_i.question"]}
                </p>
                <BlocProse cle="ouvrage.presentation.tome_i.corps" className={CORPS_CARTE}>
                  <p>
                    De l’astronomie à la biologie, de la gestion de l’État aux
                    sciences normatives, la rationalité contemporaine traverse une
                    crise invisible mais profonde : l’hyperspécialisation a
                    fragmenté la connaissance. Chaque discipline s’est murée dans
                    son jargon, s’avérant structurellement incapable de communiquer
                    avec les domaines limitrophes. Nous mesurons tout, nous
                    calculons tout, mais nous ne comprenons plus comment le Tout
                    tient ensemble. C’est la « misère théorique » de notre époque.
                  </p>
                  <p>
                    Né au cœur de l’École de Brazzaville, ce livre pose les
                    fondements d’une rupture épistémologique majeure : la Science
                    Métamoderne, ayant pour objet unique l’intelligibilité
                    elle-même. Étrangère aux postures esthétiques et aux
                    oscillations sensibles du métamodernisme culturel, elle
                    s’impose comme la première tentative systématique de faire de
                    l’intelligibilité le centre de gravité d’une science générale.
                  </p>
                  <p>
                    À travers la formulation de son Équation Cyclique Universelle{" "}
                    <span className="font-code text-[0.95em] font-medium whitespace-nowrap text-encre">Σ = M(F(V(Σ)))</span>, cette
                    recherche démontre que le Réel n’est pas un chaos aléatoire,
                    mais une structure unifiée dont les lois préexistent à
                    l’observation. Le Substratum Commun (Σ) ne s’impose pas comme un
                    objet observé, mais comme une condition de possibilité déduite
                    par nécessité heuristique : la cohérence du réel et de la
                    connaissance devient difficilement pensable sans lui.
                  </p>
                  <p>
                    Contre la méthode empirique classique et la triade dialectique
                    hégélienne, cet ouvrage réhabilite la primauté absolue du
                    cerveau sur le laboratoire et déploie le Canon de la Découverte
                    en sept principes. Il ne décrit pas la science depuis
                    l’extérieur ; il fournit au chercheur — quelle que soit sa
                    discipline — un Organon de réintégration lui permettant de
                    remonter activement de ses anomalies vers les principes qui les
                    rendent possibles.
                  </p>
                  <p>
                    S’assimilant à la lignée des précurseurs universels qui,
                    d’Europe en Amérique, de l’Inde à l’Afrique, ont su identifier
                    les angles morts du réductionnisme — René Thom, Pierre
                    Delattre, Jean-Paul Benzécri, Claude Bernard, Georges Duhamel,
                    Jules Carles, Thomas Kuhn, Ludwig von Bertalanffy, Samir Amin,
                    Cheikh Anta Diop, Jan Assmann, Théophile Obenga — ce travail ne
                    sollicite pas la permission des paradigmes saturés. Il ne
                    demande pas à être accepté sur autorité.
                  </p>
                  <p className="italic">Il demande à être éprouvé.</p>
                </BlocProse>
              </div>
              <Link
                href="/ouvrage/tome-i"
                className="mt-auto flex min-h-11 items-center gap-1.5 pt-4 font-ui text-[15px] font-semibold text-lien"
              >
                {t["presentation.tome_i.lien"]} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </Carte>

            {/* Colonne droite — Tome II */}
            <Carte className="rv rv2 flex flex-col gap-4">
              <Etiquette>{t["presentation.tome_ii.etiquette"]}</Etiquette>
              {/* Titre officiel (liminaires du Tome II, octobre 2026). */}
              <h3 className="font-titre text-[1.5rem] leading-[1.2] font-medium text-balance text-encre md:text-[1.75rem]">
                {t["presentation.tome_ii.titre"]}
              </h3>
              <p className="font-texte text-[16.5px] leading-[1.5] text-encre-2 italic">
                {t["presentation.tome_ii.sous_titre"]}
              </p>
              <div className="mt-2 flex flex-col gap-4 border-t border-filet-doux pt-6 font-texte text-[17px] leading-[1.7] text-encre">
                <p className="font-titre text-[1.25rem] leading-[1.4] text-encre italic">
                  {t["presentation.tome_ii.question"]}
                </p>
                <BlocProse cle="ouvrage.presentation.tome_ii.corps" className={CORPS_CARTE}>
                  <p>
                    Enfermé dans le cul-de-sac du positivisme abstrait, le
                    constitutionnalisme moderne s’est transformé en une simple
                    bureaucratie textuelle. Les cours de justice et les parlements
                    excellent à vérifier la conformité des procédures, mais restent
                    aveugles aux injustices réelles qui consument la société.
                  </p>
                  <p>
                    Sous prétexte de neutralité, le formalisme kelsénien est devenu
                    le complice silencieux de l’invisibilisation des violations du
                    pacte social.
                  </p>
                  <p>
                    Dans ce second volume, cette recherche transforme le droit en
                    un véritable laboratoire systémique et formule une loi
                    implacable, le Théorème de la Validité Inversée :{" "}
                    <span className="font-code text-[0.95em] font-medium whitespace-nowrap text-encre">V(S) = C(S) × E(S)</span>.
                    L’annulation de l’effectivité sémantique emporte
                    mathématiquement l’invalidation absolue de la validité globale.
                    Une Constitution de papier ne vaut rien si ses promesses ne sont
                    pas concrètement vécues sur le terrain.
                  </p>
                  <p>
                    S’appuyant sur l’isomorphisme de l’archipel des laboratoires
                    mondiaux — de la Public Interest Litigation indienne à l’Estado
                    de Cosas Inconstitucional colombien, du contrôle de
                    conventionnalité ex officio mexicain aux constitutions
                    transformatives sud-africaine et kenyane, de l’autosaisine
                    béninoise à l’Existenzminimum allemand, jusqu’à la dissidence
                    constructive américaine et à la lecture corrective canadienne —
                    cet ouvrage réhabilite la Maât, science universelle de la
                    non-contradiction structurelle de Rang A.
                  </p>
                  <p>
                    Ce traité dote le praticien abandonné à son propre dénuement
                    d’un arsenal d’action infaillible, démontrant pourquoi
                    l’autosaisine et la saisine d’office du juge constitutionnel
                    face à l’Urgence Caractérisée (Gravité Systémique,
                    Irréparabilité des droits, Carence Chronique du législateur)
                    constituent une obligation cybernétique de rétroaction négative
                    face à l’entropie de l’Isfet.
                  </p>
                  <p>
                    L’analyse clinique du procès de Nelson Mandela à Rivonia
                    (1963-1964) fournit l’illustration historique suprême de la
                    collision entre le Syllogisme Dégradé de la Cour de Pretoria et
                    le Syllogisme Réel de la Majeure universelle de la dignité
                    humaine.
                  </p>
                  <p>
                    Écrit depuis Brazzaville, ce travail ne revendique aucune
                    centralité géographique. Le locus énonciatif du Fronton n’est
                    pas un grief identitaire ; il est un privilège optique, une
                    position de moindre adhérence aux routines cognitives des
                    centres académiques dominants. L’universel n’a pas de centre. Il
                    se démontre par la nécessité interne de sa structure.
                  </p>
                  <p className="italic">
                    Ce livre ne demande pas à être accepté sur autorité. Il exige
                    d’être éprouvé.
                  </p>
                </BlocProse>
              </div>
              <Link
                href="/ouvrage/tome-ii"
                className="mt-auto flex min-h-11 items-center gap-1.5 pt-4 font-ui text-[15px] font-semibold text-lien"
              >
                {t["presentation.tome_ii.lien"]} <span className="arr" aria-hidden="true">→</span>
              </Link>
            </Carte>
          </div>
        </div>
      </section>

      {/* 4 — L'ancrage doctrinal : les 12 Autorités de Convergence */}
      <section id="autorites" className="surface-claire bg-papier px-5 pb-14 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 border-t border-filet pt-14 md:pt-24">
          <EnteteSection titre={t["autorites.titre"]}>
            <BlocProse cle="ouvrage.autorites.corps">
              <p>
                L’œuvre ne naît pas du vide. Elle dialogue avec les plus hautes
                autorités scientifiques et juridiques pour instituer un nouveau
                cadre d’intelligibilité. L’ancrage doctrinal s’articule autour de
                trois champs épistémiques complémentaires : l’épistémologie et la
                systémique, les sciences du vivant et du transformisme, la
                décolonisation épistémique et la réhabilitation des matrices
                endogènes.
              </p>
            </BlocProse>
          </EnteteSection>
          <ol className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {AUTORITES.map((autorite, i) => (
              <li
                key={autorite.id}
                className="rv grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 border-t border-filet py-6"
              >
                <span className="pt-1.5 font-code text-[11.5px] text-or-700">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <h3 className="font-titre text-[1.3125rem] leading-[1.25] font-medium text-encre">
                    {autorite.nom}
                  </h3>
                  <p className="font-code text-[12px] text-encre-3">{autorite.pays}</p>
                  <p className="mt-1 font-texte text-[16.5px] leading-[1.6] text-encre-2">{autorite.apport}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — Le Programme de recherche : Noyau et Expansion (l'encadré nuit de la page) */}
      <BlocSection id="programme" titre={t["programme.titre"]}>
        <div className="flex flex-col gap-8">
          <BlocProse cle="ouvrage.programme.corps">
            <p>
              Conformément au Principe de Souveraineté du Démontré scellé dans la
              Constitution Scientifique de l’École, l’ouvrage distingue
              rigoureusement deux niveaux :
            </p>
          </BlocProse>
          <Encadre className="rv grid gap-10 md:grid-cols-2 md:gap-0">
            <div className="flex flex-col md:pr-10">
              <h3 className="font-titre text-[1.375rem] leading-[1.25] font-medium text-or-500 md:text-2xl">
                {t["programme.noyau.titre"]}
              </h3>
              <p className="mt-1.5 font-texte text-[16px] text-nuit-300 italic">
                {t["programme.noyau.sous_titre"]}
              </p>
              <ul className="mt-5 flex flex-col gap-3.5 border-t border-nuit-800 pt-5 font-ui text-[15.5px] leading-[1.6] text-nuit-100">
                {NOYAU.map((el) => (
                  <li key={el.terme}>
                    <strong className="font-semibold text-white">{el.terme}</strong> {el.texte}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col border-t border-nuit-800 pt-10 md:border-t-0 md:border-l md:pt-0 md:pl-10">
              <h3 className="font-titre text-[1.375rem] leading-[1.25] font-medium text-or-500 md:text-2xl">
                {t["programme.expansion.titre"]}
              </h3>
              <p className="mt-1.5 font-texte text-[16px] text-nuit-300 italic">
                {t["programme.expansion.sous_titre"]}
              </p>
              <ul className="mt-5 flex flex-col gap-3.5 border-t border-nuit-800 pt-5 font-ui text-[15.5px] leading-[1.6] text-nuit-100">
                {EXPANSION.map((el) => (
                  <li key={el.terme}>
                    <strong className="font-semibold text-white">{el.terme}</strong> {el.texte}
                  </li>
                ))}
              </ul>
            </div>
          </Encadre>
          <BlocProse cle="ouvrage.programme.axes">
            <p>
              Ces axes ne constituent pas des promesses dogmatiques. Ils
              définissent des terrains d’application où la Méthode M est appelée
              à déployer ses protocoles de recherche, selon les mêmes exigences
              de démonstration, de critique et de vérification qui ont présidé à
              l’élaboration des présents travaux.
            </p>
          </BlocProse>
        </div>
      </BlocSection>

      {/* 6 — Appel à l'épreuve */}
      <Cloture
        suite={
          <Link
            href="/laboratoire"
            className="flex min-h-11 items-center gap-1.5 font-ui text-[15px] font-semibold text-lien"
          >
            {t["cloture.lien"]} <span className="arr" aria-hidden="true">→</span>
          </Link>
        }
      >
        {t["cloture.citation"]}
      </Cloture>
    </>
  );
}

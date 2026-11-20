import Link from "next/link";
import { BlocProse } from "@/components/bloc";
import {
  ArticleNumerote,
  BlocSection,
  Citation,
  Cloture,
  Exergue,
  Formule,
  OuverturePage,
} from "@/components/editorial";
import { Carte, Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { getListesInstitution } from "@/lib/cms";
import { getTexte, getTextes } from "@/lib/contenu";

export async function generateMetadata() {
  return pageMetadata({
    title: await getTexte("institution.seo.titre"),
    description: await getTexte("institution.seo.description"),
    path: "/institution",
  });
}

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

const LISTE = "flex list-disc flex-col gap-1.5 pl-6 marker:text-encre-3";

/** PAGE 2 — L'INSTITUTION (L'École de Brazzaville). */
export default async function Institution() {
  const {
    niveaux: NIVEAUX,
    mouvement_organique: MOUVEMENT_ORGANIQUE,
    canon: CANON,
    champs_autorites: AUTORITES,
  } = await getListesInstitution();
  const textes = await getTextes("institution");
  /** Texte simple de la page (clé sans le préfixe « institution. »). */
  const t = (cle: string, valeurs?: Record<string, string | number>) => {
    const v = textes[cle];
    if (v === undefined) throw new Error(`Bloc inconnu du registre : institution.${cle}`);
    // Marqueurs {nom} remplacés par leur valeur.
    return Object.entries(valeurs ?? {}).reduce((acc, [k, x]) => acc.split(`{${k}}`).join(String(x)), v);
  };
  const SOMMAIRE = [
    { id: "objet", label: t("objet.titre") },
    { id: "architecture", label: t("architecture.titre") },
    { id: "souverainete", label: t("souverainete.titre") },
    { id: "privilege-optique", label: t("privilege_optique.titre") },
    { id: "demarche", label: t("demarche.titre") },
  ];
  return (
    <>
      <OuverturePage
        page_id="institution"
        titre={t("hero.titre")}
        sousTitre={t("hero.sous_titre")}
        sommaire={SOMMAIRE}
      >
        <Exergue>
          {t("hero.exergue")}
        </Exergue>
      </OuverturePage>

      {/* 1 — L'objet unique : l'Intelligibilité */}
      <BlocSection id="objet" titre={t("objet.titre")} bordure={false}>
        <div className="flex flex-col gap-10">
          <BlocProse cle="institution.objet.corps">
            <p>
              L’École de Brazzaville a pour objet unique et souverain{" "}
              <strong>l’Intelligibilité elle-même</strong>.
            </p>
            <p>
              Elle ne se substitue à aucune science particulière. Elle ne juge
              pas, ne remplace pas et ne valide pas les disciplines
              scientifiques constituées. Elle reconnaît pleinement leur
              autonomie, leurs méthodes propres et leurs résultats.
            </p>
            <p>
              Son objet est d’un autre ordre. Elle cherche à mettre au jour les
              structures générales d’intelligibilité qui semblent traverser les
              processus de découverte, indépendamment des objets particuliers
              étudiés par chaque discipline. Elle{" "}
              <strong>formalise et restitue</strong> les conditions géométriques,
              cybernétiques et rationnelles qui rendent simultanément possibles :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>L’apparition des phénomènes ;</li>
              <li>Leur compréhension par l’esprit humain ;</li>
              <li>La connaissance cognitive que nous en prenons ;</li>
              <li>L’articulation des savoirs entre disciplines.</li>
            </ul>
            <p>
              Cette démarche ne constitue pas une discipline supplémentaire venant
              s’ajouter à la fragmentation académique. Elle est une{" "}
              <strong>nouvelle architecture de la pensée</strong> et un{" "}
              <strong>Organon de réintégration</strong>. Elle ne se contente pas
              de décrire les conditions de possibilité des savoirs (épistémologie
              descriptive) ; elle fournit au chercheur — quelle que soit sa
              discipline — un Canon de reconstruction lui permettant de remonter
              activement de ses anomalies vers les principes qui les rendent
              possibles.
            </p>
          </BlocProse>

          <div className="flex max-w-[680px] flex-col border-y border-filet py-6">
            <p className="font-code text-xs uppercase tracking-[0.14em] text-or-700">
              {t("objet.formule_etiquette")}
            </p>
            <Citation className="mt-3 mb-0 pl-0 md:pl-6">
              <span className="font-texte text-[1.1875rem] leading-[1.6] text-encre italic">
                {t("objet.formule_citation")}
              </span>
            </Citation>
          </div>

          <BlocProse cle="institution.objet.distinction">
            <p>
              Cette distinction opère par changement de niveau logique (au sens de
              la théorie des types de Bertrand Russell et de la systémique de
              Pierre Delattre) :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>
                Le métamodernisme culturel reste à l’intérieur de la tension
                (niveau phénoménal) ;
              </li>
              <li>
                La Science Métamoderne s’extrait de l’oscillation pour en
                modéliser la mécanique (niveau principiel).
              </li>
            </ul>
          </BlocProse>
        </div>
      </BlocSection>

      {/* 2 — Architecture institutionnelle à sept niveaux */}
      <BlocSection id="architecture" titre={t("architecture.titre")}>
        <div className="flex flex-col gap-12">
          <BlocProse cle="institution.architecture.corps">
            <p>
              Conformément à la Constitution Scientifique de l’École de
              Brazzaville, le Programme de recherche s’organise selon une
              architecture constitutive à sept niveaux, chacun répondant à une
              fonction spécifique dans l’élaboration, la transmission et le
              développement de la connaissance :
            </p>
          </BlocProse>

          {/* Schéma : les sept niveaux en pile numérotée, chacun ancré à son détail. */}
          <nav aria-label={t("architecture.schema_lecture")} className="max-w-[760px]">
            <ol className="flex flex-col gap-1.5">
              {NIVEAUX.map((niveau, i) => (
                <li
                  key={niveau.id}
                  className="rv md:ml-[calc(var(--i)*28px)]"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <a
                    href={`#niveau-${niveau.id}`}
                    className="group grid min-h-14 grid-cols-[48px_minmax(0,1fr)_20px] items-center gap-3 rounded-[4px] border border-filet bg-blanc py-2.5 pr-4 pl-3 transition-colors hover:border-encre md:grid-cols-[56px_minmax(0,1fr)_20px]"
                  >
                    <span className="border-r border-filet-doux pr-3 text-center font-titre text-2xl leading-none text-or-700">
                      {niveau.numero}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-code text-[11px] uppercase tracking-[0.14em] text-encre-3">
                        {t("architecture.niveau_etiquette", { numero: niveau.numero })}
                      </span>
                      <span className="font-titre text-[1.0625rem] leading-snug font-medium text-encre md:text-lg">
                        {niveau.titre}
                      </span>
                    </span>
                    <span aria-hidden="true" className="font-ui text-encre-3 transition-transform group-hover:translate-y-0.5 group-hover:text-encre">
                      ↓
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-12">
            {NIVEAUX.map((niveau) => (
              <ArticleNumerote
                key={niveau.id}
                id={`niveau-${niveau.id}`}
                romain={niveau.numero}
                etiquette={t("architecture.niveau_etiquette", { numero: niveau.numero })}
                titre={niveau.titre}
              >
                <div className="flex max-w-[680px] flex-col gap-4">
                  <dl className="flex flex-col gap-1.5 font-ui text-[15px] leading-[1.55] text-encre-2">
                    <div>
                      <dt className="inline font-semibold text-encre">{t("architecture.fonction")} </dt>
                      <dd className="inline">{niveau.fonction}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-encre">
                        {t("architecture.question")}{" "}
                      </dt>
                      <dd className="inline italic">{niveau.question_fondamentale}</dd>
                    </div>
                  </dl>
                  <div className="flex flex-col gap-3 font-texte text-[1.0625rem] leading-[1.7] text-encre">
                    {niveau.corps.map((paragraphe, index) => (
                      <p key={index}>{paragraphe}</p>
                    ))}
                  </div>
                  {niveau.equation ? <Formule>{niveau.equation}</Formule> : null}
                  {niveau.liste ? (
                    <ul className={`${LISTE} font-texte text-[1.0625rem] leading-[1.6] text-encre`}>
                      {niveau.liste.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {niveau.maxime ? (
                    <Citation className="my-2 italic">
                      {t("architecture.maxime", { maxime: niveau.maxime })}
                    </Citation>
                  ) : null}
                </div>
              </ArticleNumerote>
            ))}
          </div>

          <div className="flex max-w-[680px] flex-col gap-4 border-t border-filet pt-8 font-texte text-[1.125rem] leading-[1.7] md:text-[1.1875rem]">
            <p>
              <strong className="font-semibold">
                {t("architecture.mouvement_intro")}
              </strong>
            </p>
            <ul className={LISTE}>
              {MOUVEMENT_ORGANIQUE.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </BlocSection>

      {/* 3 — Le Principe de Souveraineté du Démontré (l'encadré fort de la page) */}
      <BlocSection id="souverainete" titre={t("souverainete.titre")}>
        <div className="flex flex-col gap-10">
          <BlocProse cle="institution.souverainete.corps">
            <p>
              Le Principe de Souveraineté du Démontré constitue le premier article
              de la Constitution Scientifique de l’École de Brazzaville. Il
              s’énonce ainsi :
            </p>
          </BlocProse>

          <Encadre className="rv max-w-[760px]">
            <h3 className="font-titre text-[1.375rem] leading-[1.3] font-medium text-or-500 md:text-2xl">
              {t("souverainete.encadre_titre")}
            </h3>
            <BlocProse
              cle="institution.souverainete.encadre"
              className="mt-5 flex max-w-none flex-col gap-3 text-[1.0625rem] leading-[1.7] text-nuit-100 italic md:text-lg md:leading-[1.7] [&_p]:mt-0 [&_p]:text-wrap"
            >
              <p>
                Dans la Science Métamoderne, le Programme de recherche peut être
                plus vaste que le Corpus.
              </p>
              <p>Les hypothèses peuvent précéder les démonstrations.</p>
              <p>Les intuitions peuvent orienter les recherches.</p>
              <p>
                Les perspectives peuvent ouvrir de nouveaux champs
                d’investigation.
              </p>
              <p>
                Mais aucune proposition ne devient constitutive du Corpus tant
                qu’elle n’a pas atteint le degré de démonstration exigé par la
                Constitution méthodologique de la Science Métamoderne.
              </p>
              <p>
                Ainsi, la croissance du savoir ne dépend ni de l’autorité de son
                auteur, ni de l’ancienneté d’une intuition, ni de la force d’une
                conviction.
              </p>
              <p>
                Elle dépend exclusivement de la qualité de sa démonstration, de sa
                résistance à la critique et de son intégration progressive dans un
                corpus scientifiquement stabilisé.
              </p>
            </BlocProse>
          </Encadre>

          <BlocProse cle="institution.souverainete.portee">
            <p>
              Ce principe est redoutable. Il protège définitivement l’École contre
              toute accusation de dogmatisme. Il interdit à tout censeur de
              reprocher de ne pas avoir tout publié : ce qui n’est pas dans le
              Corpus n’y est pas parce qu’il n’a pas encore satisfait aux
              exigences de la Constitution, non parce qu’il n’existe pas.
            </p>
            <p>
              Toute découverte scientifique possède deux temporalités distinctes :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>
                Le temps de sa démonstration, qui dépend du travail scientifique ;
              </li>
              <li>
                Le temps de sa réception, qui dépend de l’histoire des communautés
                savantes et des conditions historiques, culturelles et cognitives
                de sa transmission.
              </li>
            </ul>
            <p>
              Une science durable doit posséder une théorie de la publication
              aussi rigoureuse que sa théorie de la découverte.
            </p>
          </BlocProse>
        </div>
      </BlocSection>

      {/* 4 — Le Privilège Optique de Brazzaville */}
      <BlocSection id="privilege-optique" titre={t("privilege_optique.titre")}>
        <div className="flex flex-col gap-12">
          <BlocProse cle="institution.privilege_optique.corps">
            <p>
              Penser la refondation de l’intelligibilité depuis Brazzaville et
              l’Afrique subsaharienne ne constitue pas un repli identitaire, mais
              l’affirmation d’un <strong>Privilège Optique</strong> partagé par une
              lignée de précurseurs sur les cinq continents.
            </p>
            <p>
              Écrit depuis Brazzaville, ce travail ne revendique aucune centralité
              géographique. Le locus énonciatif du Fronton n’est pas un grief
              identitaire ; il est un privilège optique, une position de moindre
              adhérence cognitive aux routines positivistes des centres académiques
              dominants. L’universel n’a pas de centre. Il se démontre par la
              nécessité interne de sa structure.
            </p>
            <p>
              La désoccidentalisation méthodologique opérée ici n’est pas une
              démarche identitaire ou militante ; elle est strictement
              épistémologique. Elle vise à arracher les fondements rationnels
              endogènes au folklore pour restituer leur portée logico-mathématique
              originelle.
            </p>
          </BlocProse>

          <div className="flex max-w-[680px] flex-col gap-4">
            <h3 className="font-titre text-[1.375rem] leading-[1.3] font-medium text-encre md:text-2xl">
              {t("privilege_optique.lignee_titre")}
            </h3>
            <BlocProse
              cle="institution.privilege_optique.lignee"
              className="flex flex-col gap-4 [&_p]:mt-0 [&_p]:text-wrap"
            >
            <p className="font-texte text-[1.125rem] leading-[1.7] md:text-[1.1875rem] md:leading-[1.75]">
              En s’appuyant sur les ruptures épistémologiques de{" "}
              <strong className="font-semibold">René Thom</strong> (France),{" "}
              <strong className="font-semibold">Pierre Delattre</strong> (Belgique),{" "}
              <strong className="font-semibold">Jean-Paul Benzécri</strong> (France),{" "}
              <strong className="font-semibold">Claude Bernard</strong> (France),{" "}
              <strong className="font-semibold">Georges Duhamel</strong> (France),{" "}
              <strong className="font-semibold">Jules Carles</strong> (France),{" "}
              <strong className="font-semibold">Thomas Kuhn</strong> (États-Unis),{" "}
              <strong className="font-semibold">Ludwig von Bertalanffy</strong> (Autriche),{" "}
              <strong className="font-semibold">Samir Amin</strong> (Égypte/France),{" "}
              <strong className="font-semibold">Cheikh Anta Diop</strong> (Sénégal),{" "}
              <strong className="font-semibold">Jan Assmann</strong> (Allemagne) et{" "}
              <strong className="font-semibold">Théophile Obenga</strong> (Congo), cette démarche s’assimile à
              ces esprits qui, d’Europe en Amérique, de l’Inde à l’Afrique, ont su
              identifier les angles morts du réductionnisme.
            </p>
            <p className="font-texte text-[1.125rem] leading-[1.7] font-semibold md:text-[1.1875rem] md:leading-[1.75]">
              Ce n’est pas la position géographique qui donne la vue. C’est la
              moindre adhérence cognitive aux routines positivistes, une posture
              partagée par tous ces savants à travers les cinq continents.
            </p>
            </BlocProse>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="font-code text-xs uppercase tracking-[0.14em] text-or-700">
              {t("privilege_optique.autorites_titre")}
            </h3>
            {AUTORITES.map((champ) => (
              <div key={champ.id} className="flex flex-col gap-4">
                <p className="font-titre text-lg leading-snug font-medium text-encre italic">
                  {t("privilege_optique.champ", { champ: champ.champ })}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {champ.autorites.map((autorite) => (
                    <Carte key={autorite.nom} className="souleve flex flex-col gap-2 p-5 md:p-6">
                      <p className="font-titre text-lg leading-snug font-medium text-encre">
                        {autorite.nom}{" "}
                        <span className="font-ui text-sm font-normal text-encre-3">
                          {t("privilege_optique.origine", { origine: autorite.origine })}
                        </span>
                      </p>
                      <p className="font-ui text-[15px] leading-[1.55] text-encre-2">
                        {autorite.motif}
                      </p>
                    </Carte>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlocSection>

      {/* 5 — La démarche épistémologique */}
      <BlocSection id="demarche" titre={t("demarche.titre")}>
        <div className="flex flex-col gap-6">
          <BlocProse cle="institution.demarche.equation">
            <p>La Science Métamoderne applique l’équation systémique :</p>
          </BlocProse>
          <Formule className="max-w-[680px]" lecture={t("demarche.formule_sigma_lecture")}>
            {t("demarche.formule_sigma")}
          </Formule>
          <BlocProse cle="institution.demarche.transposition">
            <p>
              Elle démontre comment le Substratum Commun (Σ), altéré par le Voile
              Ontologique (V) et le Filtrage institutionnel (F), peut être
              mathématiquement recalculé et restauré par la Méthode Reconstructive
              (M).
            </p>
            <p>
              Dans le champ de la régulation des systèmes complexes, de la justice
              et de l’équité procédurale, l’équation universelle se transpose sous
              sa forme anthropologique et cybernétique originelle :
            </p>
          </BlocProse>
          <Formule className="max-w-[680px]" lecture={t("demarche.formule_maat_lecture")}>
            {t("demarche.formule_maat")}
          </Formule>
          <BlocProse cle="institution.demarche.analogie">
            <p>
              Cette transposition n’est pas une analogie poétique. Elle est la
              démonstration que les principes qui gouvernent l’intelligibilité du
              réel gouvernent également l’intelligibilité des systèmes normatifs.
              La Maât, réhabilitée hors de toute assignation folklorique et adossée
              aux travaux de Jan Assmann et Théophile Obenga, est l’opérateur
              universel de non-contradiction structurelle.
            </p>
          </BlocProse>

          <h3 className="mt-6 max-w-[680px] font-titre text-[1.375rem] leading-[1.3] font-medium text-encre md:text-2xl">
            {t("demarche.canon_titre")}
          </h3>
          <ol className="max-w-[680px] border-b border-filet-doux">
            {CANON.map((principe) => (
              <li
                key={principe.numero}
                className="rv grid grid-cols-[36px_minmax(0,1fr)] gap-3 border-t border-filet-doux py-4"
              >
                <span className="font-code text-lg leading-[1.6] text-or-700">
                  {principe.numero}.
                </span>
                <p className="font-texte text-[1.0625rem] leading-[1.65] text-encre">
                  <strong className="font-semibold">{principe.titre}</strong> : {principe.glose}
                </p>
              </li>
            ))}
          </ol>

          <BlocProse cle="institution.demarche.canon" className="mt-2">
            <p>
              Ce Canon ne décrit pas la science depuis l’extérieur ; il fournit au
              chercheur — quelle que soit sa discipline — un Organon de
              réintégration lui permettant de remonter activement de ses anomalies
              vers les principes qui les rendent possibles.
            </p>
          </BlocProse>
        </div>
      </BlocSection>

      {/* 6 — Appel à l'épreuve (formule de clôture) */}
      <Cloture
        suite={
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link href="/constitution" className={buttonVariants({ variant: "or-plein", size: "cta" })}>
              {t("cloture.bouton_constitution")} <span className="arr" aria-hidden="true">→</span>
            </Link>
            <Link href="/manifeste" className={buttonVariants({ variant: "or", size: "cta" })}>
              {t("cloture.bouton_manifeste")} <span className="arr" aria-hidden="true">→</span>
            </Link>
            <Link href="/ouvrage" className={buttonVariants({ variant: "or", size: "cta" })}>
              {t("cloture.bouton_ouvrage")} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        }
      >
        <h2 className="mb-5 font-titre text-[1.75rem] leading-[1.18] font-medium text-encre not-italic md:text-[2.125rem]">
          {t("cloture.titre")}
        </h2>
        <blockquote>
          {t("cloture.citation_1")}
          <br />
          {t("cloture.citation_2")}
        </blockquote>
      </Cloture>
    </>
  );
}

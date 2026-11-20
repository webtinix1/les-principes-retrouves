import Link from "next/link";

import { BlocProse } from "@/components/bloc";
import {
  ArticleNumerote,
  BlocSection,
  Cloture,
  Exergue,
  OuverturePage,
} from "@/components/editorial";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { getTexte, getTextes } from "@/lib/contenu";

export async function generateMetadata() {
  return pageMetadata({
    title: await getTexte("constitution.seo.titre"),
    description: await getTexte("constitution.seo.description"),
    path: "/constitution",
  });
}

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

/**
 * Les dix articles : ancre, numéro et clé du registre (« constitution.article_<cle>.* »).
 * Leurs titres (H3) alimentent aussi le sommaire latéral.
 */
const ARTICLES = [
  { id: "article-i", romain: "I", cle: "objet" },
  { id: "article-ii", romain: "II", cle: "souverainete" },
  { id: "article-iii", romain: "III", cle: "distinction" },
  { id: "article-iv", romain: "IV", cle: "hypotheses" },
  { id: "article-v", romain: "V", cle: "critique" },
  { id: "article-vi", romain: "VI", cle: "organons" },
  { id: "article-vii", romain: "VII", cle: "auteur" },
  { id: "article-viii", romain: "VIII", cle: "autorites" },
  { id: "article-ix", romain: "IX", cle: "cloture_ethique" },
  { id: "article-x", romain: "X", cle: "continuite" },
];

type EntreeArticle = { id: string; romain: string; titre: string };

/** Intitulé secondaire à l'intérieur d'un article. */
function SousTitre({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-8! font-ui text-[15.5px] leading-snug font-semibold text-encre">{children}</p>
  );
}

export default async function Page() {
  const textes = await getTextes("constitution");
  /** Texte simple de la page (clé sans le préfixe « constitution. »). */
  const t = (cle: string, valeurs?: Record<string, string | number>) => {
    const v = textes[cle];
    if (v === undefined) throw new Error(`Bloc inconnu du registre : constitution.${cle}`);
    // Marqueurs {nom} remplacés par leur valeur.
    return Object.entries(valeurs ?? {}).reduce((acc, [k, x]) => acc.split(`{${k}}`).join(String(x)), v);
  };
  const SOMMAIRE = [
    { id: "preambule", label: t("preambule.titre") },
    { id: "articles", label: t("articles.titre") },
    { id: "disposition", label: t("disposition_finale.titre") },
  ];
  const articles: EntreeArticle[] = ARTICLES.map((a) => ({
    id: a.id,
    romain: a.romain,
    titre: t(`article_${a.cle}.titre`),
  }));
  /** Étiquette et titre de l'article n° `romain`. */
  const art = (romain: string) => {
    const a = articles.find((x) => x.romain === romain);
    return { etiquette: t("articles.etiquette", { romain }), titre: a?.titre ?? "" };
  };
  return (
    <>
      {/* ============================ OUVERTURE ============================ */}
      <OuverturePage
        page_id="constitution"
        titre={t("hero.titre")}
        sousTitre={t("hero.sous_titre")}
        sommaire={SOMMAIRE}
        actions={
          <a href="#articles" className={buttonVariants({ variant: "or-plein", size: "cta" })}>
            {t("hero.bouton")} <span aria-hidden="true">↓</span>
          </a>
        }
      >
        <Exergue>{t("hero.exergue")}</Exergue>
        <p className="m-rise mt-5 font-texte text-[1.0625rem] leading-[1.6] text-encre-2 italic" style={{ "--dl": "1100ms" } as React.CSSProperties}>
          {t("hero.formule")}
        </p>
      </OuverturePage>

      {/* ==================== PRÉAMBULE CONSTITUTIONNEL ==================== */}
      <BlocSection id="preambule" titre={t("preambule.titre")} bordure={false}>
        <BlocProse cle="constitution.preambule.corps">
          <p className="italic">
            La Science Métamoderne n&apos;est pas d&apos;abord un ensemble de
            connaissances ; elle est une méthode d&apos;institution durable de
            l&apos;intelligibilité.
          </p>
          <p>
            Toute tradition scientifique appelée à se développer durablement
            suppose la réunion de conditions explicites de production, de
            validation, de transmission et de renouvellement du savoir. La
            présente Constitution a pour objet de formaliser ces conditions, afin
            que la recherche de l&apos;intelligibilité puisse devenir elle-même un
            objet de science.
          </p>
          <p>
            Elle ne promet ni révélation définitive ni autorité particulière. Elle
            définit une exigence de travail.
          </p>
          <p>
            Sa maxime fondatrice, qui gouverne l&apos;ensemble de ses articles, est
            la suivante :
          </p>
          {/* L'encadré fort de la page : la maxime fondatrice. */}
          <p className="surface-sombre mt-8! rounded-[4px] bg-nuit-950 px-6 py-8 font-titre text-[1.375rem] leading-[1.4] text-or-500 italic md:px-12 md:py-11 md:text-[1.625rem]">
            « Ne rien imposer. Laisser les choses s&apos;imposer d&apos;elles-mêmes
            par la seule puissance du raisonnement. »
          </p>
        </BlocProse>
      </BlocSection>

      {/* ================= LES DIX ARTICLES CONSTITUTIONNELS ================= */}
      <section id="articles" className="surface-claire bg-papier px-5 pb-14 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-x-6 gap-y-8 border-t border-filet pt-14 md:pt-24 lg:grid-cols-12">
          <aside className="flex flex-col gap-6 lg:col-span-3">
            <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:text-[1.875rem]">
              {t("articles.titre")}
            </h2>
            <SommaireArticles
              articles={articles}
              lecture={t("articles.sommaire_lecture")}
              lienLecture={(a) => t("articles.lien_lecture", { romain: a.romain, titre: a.titre })}
            />
          </aside>

          <div className="flex min-w-0 flex-col gap-14 lg:col-span-8 lg:col-start-4">
            {/* -------------------- ARTICLE I -------------------- */}
            <ArticleNumerote id="article-i" romain="I" {...art("I")}>
              <BlocProse cle="constitution.article_objet.corps" className="text-encre">
                <p>
                  La Science Métamoderne a pour objet unique{" "}
                  <strong>l&apos;Intelligibilité elle-même</strong>.
                </p>
                <p>
                  Elle ne se substitue à aucune science particulière. Elle ne juge
                  pas, ne remplace pas et ne valide pas les disciplines scientifiques
                  constituées. Elle reconnaît pleinement leur autonomie, leurs
                  méthodes propres et leurs résultats.
                </p>
                <p>
                  Son objet est d&apos;un autre ordre. Elle cherche à mettre au jour
                  les structures générales d&apos;intelligibilité qui semblent
                  traverser les processus de découverte, indépendamment des objets
                  particuliers étudiés par chaque discipline.
                </p>
                <p>
                  Elle est{" "}
                  <strong>
                    la science des conditions qui rendent simultanément possibles
                    l&apos;apparition des phénomènes, leur intelligibilité et la
                    connaissance que nous en prenons
                  </strong>
                  .
                </p>
              </BlocProse>
            </ArticleNumerote>

            {/* -------------------- ARTICLE II -------------------- */}
            <ArticleNumerote id="article-ii" romain="II" {...art("II")}>
              <BlocProse cle="constitution.article_souverainete.corps" className="text-encre">
                <p>
                  Dans la Science Métamoderne, le Programme de recherche peut être
                  plus vaste que le Corpus.
                </p>
                <p>Les hypothèses peuvent précéder les démonstrations.</p>
                <p>Les intuitions peuvent orienter les recherches.</p>
                <p>
                  Les perspectives peuvent ouvrir de nouveaux champs
                  d&apos;investigation.
                </p>
                <p>
                  <strong>
                    Mais aucune proposition ne devient constitutive du Corpus tant
                    qu&apos;elle n&apos;a pas atteint le degré de démonstration exigé
                    par la présente Constitution.
                  </strong>
                </p>
                <p>
                  Ainsi, la croissance du savoir ne dépend ni de l&apos;autorité de
                  son auteur, ni de l&apos;ancienneté d&apos;une intuition, ni de la
                  force d&apos;une conviction.
                </p>
                <p>
                  Elle dépend exclusivement de la qualité de sa démonstration, de sa
                  résistance à la critique et de son intégration progressive dans un
                  corpus scientifiquement stabilisé.
                </p>
              </BlocProse>
            </ArticleNumerote>

            {/* -------------------- ARTICLE III -------------------- */}
            <ArticleNumerote id="article-iii" romain="III" {...art("III")}>
              <BlocProse cle="constitution.article_distinction.corps" className="text-encre">
                <p>
                  La Science Métamoderne s&apos;organise selon une architecture
                  constitutive à sept niveaux, chacun répondant à une fonction
                  spécifique :
                </p>
                <ul className="mt-4 list-none space-y-3">
                  <li>
                    <strong>Niveau 0 — La Constitution scientifique.</strong> Elle
                    définit les règles fondamentales qui gouvernent la production, la
                    validation et la transmission du savoir. Elle constitue le niveau
                    normatif suprême.
                  </li>
                  <li>
                    <strong>Niveau I — La Science Métamoderne.</strong> Théorie
                    générale de l&apos;intelligibilité, gouvernée par la présente
                    Constitution méthodologique.
                  </li>
                  <li>
                    <strong>
                      Niveau II — Le Programme de recherche de Brazzaville.
                    </strong>{" "}
                    Il définit les grands problèmes scientifiques, les hypothèses
                    directrices et les orientations. Il est toujours plus vaste que
                    ce qui est déjà démontré. Il constitue l&apos;horizon
                    scientifique.
                  </li>
                  <li>
                    <strong>Niveau III — L&apos;Institut de Brazzaville.</strong> Il
                    constitue l&apos;infrastructure scientifique du Programme. Il
                    organise les recherches, les publications, les archives, les
                    formations, les colloques et les partenariats. Il est
                    l&apos;Autorité Épistémique Suprême qui exerce le monopole de
                    certification sur le Noyau Démontré.
                  </li>
                  <li>
                    <strong>Niveau IV — L&apos;École de Brazzaville.</strong> Elle
                    désigne la communauté des chercheurs qui participent librement au
                    Programme, dans le respect d&apos;une même discipline
                    intellectuelle fondée sur la démonstration, la critique et la
                    révision permanente.
                  </li>
                  <li>
                    <strong>
                      Niveau V — L&apos;Organon (Les Principes Retrouvés).
                    </strong>{" "}
                    Il constitue le premier traité systématique du Programme. Il
                    n&apos;en représente ni l&apos;achèvement ni la limite, mais le
                    premier corpus fondateur à partir duquel pourront être développées
                    de nouvelles recherches.
                  </li>
                  <li>
                    <strong>
                      Niveau VI — Les Démonstrations successives et le Corpus.
                    </strong>{" "}
                    Le Corpus rassemble de manière étanche les travaux validés issus
                    du Programme. Il n&apos;accueille aucune anticipation, aucun
                    résultat non stabilisé. Il constitue la mémoire démontrée de
                    l&apos;École.
                  </li>
                </ul>
                <p>
                  Ces sept niveaux ne sont pas juxtaposés. Ils forment un seul
                  mouvement organique, analogue aux fonctions vitales d&apos;un
                  organisme vivant :
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                  <li>Le Programme est l&apos;ADN qui oriente.</li>
                  <li>L&apos;Institut est l&apos;organisme qui porte.</li>
                  <li>L&apos;École est la communauté vivante qui transmet.</li>
                  <li>Le Corpus est la mémoire génétique qui conserve.</li>
                </ul>
              </BlocProse>
            </ArticleNumerote>

            {/* -------------------- ARTICLE IV -------------------- */}
            <ArticleNumerote id="article-iv" romain="IV" {...art("IV")}>
              <BlocProse cle="constitution.article_hypotheses.corps" className="text-encre">
                <p>
                  Le Programme de recherche de Brazzaville comporte plusieurs
                  chantiers théoriques dont les démonstrations ne sont pas encore
                  intégrées au Corpus. Cette situation ne résulte ni d&apos;une
                  rétention volontaire, ni d&apos;une spéculation prématurée. Elle
                  procède d&apos;une exigence méthodologique explicite, qui distingue
                  deux temporalités irréductibles dans la vie d&apos;une découverte
                  scientifique :
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                  <li>
                    Le temps de sa démonstration, qui dépend du travail scientifique ;
                  </li>
                  <li>
                    Le temps de sa réception, qui dépend de l&apos;histoire des
                    communautés savantes et des conditions historiques, culturelles et
                    cognitives de sa transmission.
                  </li>
                </ul>
                <p>
                  Aucune proposition n&apos;entre dans le Corpus tant que ces deux
                  conditions cumulatives ne sont pas satisfaites.
                </p>

                <SousTitre>
                  Première condition — La maturité démonstrative interne
                </SousTitre>
                <p>
                  Aucune proposition ne devient constitutive du Corpus tant
                  qu&apos;elle n&apos;a pas satisfait aux exigences de démonstration,
                  de critique et de vérification fixées par la présente Constitution.
                  Une théorie peut être rationnellement établie et demeurer hors du
                  Corpus aussi longtemps qu&apos;elle n&apos;a pas atteint le degré de
                  formalisation, de discussion et de stabilisation requis par les
                  principes méthodologiques de l&apos;École.
                </p>

                <SousTitre>
                  Deuxième condition — La maturité de la réception scientifique
                </SousTitre>
                <p>
                  Certaines vérités, bien que rationnellement établies, ne peuvent
                  être communiquées sans être dénaturées tant que la communauté
                  scientifique n&apos;a pas atteint le niveau de compréhension requis
                  pour les recevoir et les éprouver. Le Voile Ontologique et le
                  Filtrage Sélectif opèrent également à l&apos;échelle historique : la
                  transmission d&apos;une vérité microscopique à une conscience
                  macroscopique saturée exigerait une conversion qualitative que
                  seule l&apos;élévation progressive des capacités collectives
                  d&apos;intelligibilité peut permettre.
                </p>
                <p>
                  Ainsi, les démonstrations en cours seront publiées progressivement,
                  à mesure qu&apos;elles atteindront le degré de formalisation exigé
                  par les principes méthodologiques de l&apos;École, et selon le
                  rythme où la communauté scientifique sera en mesure de les recevoir
                  et de les éprouver.
                </p>

                <SousTitre>Effet attendu du Programme</SousTitre>
                <p>
                  L&apos;un des effets attendus de la diffusion du Programme est de
                  contribuer à l&apos;élévation des capacités collectives
                  d&apos;intelligibilité. Cet effet n&apos;en constitue pas
                  l&apos;objet premier. L&apos;objet du Programme demeure
                  l&apos;intelligibilité elle-même. L&apos;élévation des capacités
                  cognitives collectives en est une conséquence méthodologique, non un
                  programme d&apos;ingénierie morale ou spirituelle.
                </p>

                <SousTitre>Axes du Programme d&apos;Expansion</SousTitre>
                <p>
                  Le Programme d&apos;Expansion comprend notamment les chantiers
                  suivants, dont les démonstrations seront versées au Corpus selon les
                  conditions cumulatives énoncées ci-dessus :
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                  <li>
                    Les sciences du vivant (mécanismes de régulation cellulaire,
                    réplication virale) ;
                  </li>
                  <li>
                    La physique fondamentale (phénomènes nucléaires, limites de
                    l&apos;univers matériel) ;
                  </li>
                  <li>
                    Les sciences de la complexité (transformations de la matière et
                    répercussions sur le biotope) ;
                  </li>
                  <li>
                    La théorie de la connaissance appliquée à la transposition
                    d&apos;échelle (passage des transformations qualitatives intimes
                    aux émergences qualitatives systémiques).
                  </li>
                </ul>
                <p>
                  Ces axes ne constituent pas des promesses dogmatiques. Ils
                  définissent des terrains d&apos;application où la Méthode M est
                  appelée à déployer ses protocoles, selon les mêmes exigences de
                  démonstration, de critique et de vérification qui gouvernent
                  l&apos;ensemble du Programme.
                </p>
              </BlocProse>
            </ArticleNumerote>

            {/* -------------------- ARTICLE V -------------------- */}
            <ArticleNumerote id="article-v" romain="V" {...art("V")}>
              <BlocProse cle="constitution.article_critique.corps" className="text-encre">
                <p>
                  La critique n&apos;est pas extérieure au Programme de Brazzaville.
                  Elle constitue l&apos;un des mécanismes normaux de son
                  développement.
                </p>
                <p>
                  Toute objection argumentée est accueillie comme une occasion de
                  préciser les concepts, d&apos;améliorer les démonstrations ou de
                  réviser les hypothèses lorsque cela est nécessaire.
                </p>
                <p>
                  La solidité d&apos;une théorie ne se mesure pas à sa résistance à
                  toute critique, mais à sa capacité à intégrer la discussion sans
                  perdre sa cohérence.
                </p>
                <p>
                  Le critique externe n&apos;est pas un réfutateur ; il est un
                  révélateur. Il ne déplace pas le centre de gravité de
                  l&apos;œuvre ; il le rend plus visible.
                </p>
              </BlocProse>
            </ArticleNumerote>

            {/* -------------------- ARTICLE VI -------------------- */}
            <ArticleNumerote id="article-vi" romain="VI" {...art("VI")}>
              <BlocProse cle="constitution.article_organons.corps" className="text-encre">
                <p>
                  Chaque Organon futur est une application particulière de la présente
                  Constitution. Il n&apos;a pas à redéfinir les fondements.
                </p>
                <p>
                  Il constitue une démonstration autonome, soumise aux mêmes exigences
                  que le premier Organon (Les Principes Retrouvés).
                </p>
                <p>
                  Les travaux ultérieurs ne viendront pas répéter le premier corpus.
                  Ils auront pour mission d&apos;en prolonger les principes, d&apos;en
                  éprouver la méthode, d&apos;en enrichir les concepts et d&apos;en
                  étendre progressivement le domaine d&apos;application.
                </p>
                <SousTitre>Principe de fécondité scientifique</SousTitre>
                <p>
                  Une théorie ne devient véritablement scientifique que
                  lorsqu&apos;elle est capable de produire davantage qu&apos;elle-même.
                  Sa valeur ne réside pas seulement dans les démonstrations
                  qu&apos;elle contient, mais dans sa capacité à rendre possibles de
                  nouvelles démonstrations, de nouveaux concepts, de nouvelles
                  théories et de nouvelles applications.
                </p>
              </BlocProse>
            </ArticleNumerote>

            {/* -------------------- ARTICLE VII -------------------- */}
            <ArticleNumerote id="article-vii" romain="VII" {...art("VII")}>
              <BlocProse cle="constitution.article_auteur.corps" className="text-encre">
                <p>
                  Le chercheur indépendant est le premier serviteur de la
                  Constitution. Il n&apos;a aucun privilège doctrinal.
                </p>
                <p>
                  Une fois la Constitution posée, le Programme peut, en principe, être
                  poursuivi par d&apos;autres chercheurs qui appliqueront les mêmes
                  exigences méthodologiques, même s&apos;ils contestent certaines
                  démonstrations, en proposent de nouvelles ou révisent le corpus
                  existant.
                </p>
                <p>
                  L&apos;œuvre cesse d&apos;être seulement celle d&apos;un chercheur
                  particulier. Elle devient la proposition d&apos;un cadre normatif de
                  production, de validation et d&apos;évolution des connaissances.
                </p>
                <p>
                  L&apos;effacement de l&apos;ego et la posture d&apos;universalité de
                  droit ne sont pas des postures de convenance. Ils sont la condition
                  de possibilité de la continuité scientifique.
                </p>
              </BlocProse>
            </ArticleNumerote>

            {/* -------------------- ARTICLE VIII -------------------- */}
            <ArticleNumerote id="article-viii" romain="VIII" {...art("VIII")}>
              <BlocProse cle="constitution.article_autorites.corps" className="text-encre">
                <p>
                  La Science Métamoderne ne naît pas du vide. Elle s&apos;assimile à
                  la lignée des précurseurs universels qui, sur les cinq continents,
                  ont su identifier les angles morts du réductionnisme et réinstituer
                  les conditions de possibilité de l&apos;intelligibilité.
                </p>
                <p>
                  Ses autorités de convergence s&apos;organisent selon trois champs
                  épistémiques complémentaires, chacun apportant une pièce décisive à
                  l&apos;édifice.
                </p>

                <SousTitre>
                  Dans le champ de l&apos;épistémologie et de la systémique
                </SousTitre>
                <ul className="mt-4 list-none space-y-3">
                  <li>
                    <strong>René Thom (France)</strong> — pour la critique de la
                    misère théorique, la modélisation des catastrophes et la
                    réhabilitation de la représentation mentale comme véritable moteur
                    de la découverte scientifique ;
                  </li>
                  <li>
                    <strong>Pierre Delattre (Belgique)</strong> — pour la théorie
                    générale des systèmes ouverts à éléments discrets, la distinction
                    entre syntaxe mathématique et sémantique conceptuelle, et la
                    formalisation des lois d&apos;interaction topologiques invariantes ;
                  </li>
                  <li>
                    <strong>Jean-Paul Benzécri (France)</strong> — pour la
                    réhabilitation de l&apos;induction a posteriori libérée des
                    prénotions arbitraires, et la démonstration que l&apos;expérience
                    ne produit pas l&apos;idée mais la juge ;
                  </li>
                  <li>
                    <strong>Claude Bernard (France)</strong> — pour l&apos;exigence de
                    l&apos;idée directrice préalable, la découverte du milieu intérieur
                    comme thermostat de non-contradiction structurelle du vivant, et
                    la démonstration que « quand nous croyons induire, nous déduisons
                    réellement » ;
                  </li>
                  <li>
                    <strong>Georges Duhamel (France)</strong> — pour la vigilance
                    critique face à l&apos;aliénation par le machinisme et la routine
                    technique, et la réaffirmation de la primauté de
                    l&apos;intelligibilité sur l&apos;opératoire ;
                  </li>
                  <li>
                    <strong>Thomas Kuhn (États-Unis)</strong> — pour la structure des
                    révolutions scientifiques, la modélisation des changements de
                    paradigmes et l&apos;identification des anomalies comme
                    déclencheurs de la reconstruction théorique ;
                  </li>
                  <li>
                    <strong>Ludwig von Bertalanffy (Autriche)</strong> — pour la
                    théorie générale des systèmes et la formalisation des principes
                    d&apos;organisation communs aux systèmes vivants, physiques et
                    sociaux.
                  </li>
                </ul>

                <SousTitre>
                  Dans le champ des sciences du vivant et du transformisme
                </SousTitre>
                <ul className="mt-4 list-none space-y-3">
                  <li>
                    <strong>Jules Carles (France)</strong> — pour son œuvre majeure Le
                    Transformisme, qui interroge les mécanismes profonds de
                    l&apos;évolution des espèces et la réconciliation des héritages
                    lamarckien et darwinien. C&apos;est précisément à partir de
                    l&apos;étude intensive de son ouvrage (1988-1989, au Centre
                    culturel français de Brazzaville) que la présente recherche a
                    formulé, dès l&apos;âge de dix-neuf ans, la loi organogénétique
                    unifiant ces deux traditions sous le concept de
                    Lamarco-darwinisme, posant ainsi les fondements biologiques de la
                    théorie générale de la conversion du principiel en phénoménal.
                  </li>
                </ul>

                <SousTitre>
                  Dans le champ de la décolonisation épistémique et de la
                  réhabilitation des matrices endogènes
                </SousTitre>
                <ul className="mt-4 list-none space-y-3">
                  <li>
                    <strong>Samir Amin (Égypte/France)</strong> — pour la
                    déconstruction de l&apos;eurocentrisme épistémique, la théorie de
                    l&apos;accumulation à l&apos;échelle mondiale et la démonstration
                    que l&apos;universel n&apos;a pas de centre géographique exclusif ;
                  </li>
                  <li>
                    <strong>Cheikh Anta Diop (Sénégal)</strong> — pour l&apos;unité
                    épistémologique de l&apos;Afrique, la réhabilitation des matrices
                    scientifiques de Kemet et la démonstration de l&apos;antériorité
                    des formalisations africaines dans les domaines de la mathématique,
                    de l&apos;astronomie et de la médecine ;
                  </li>
                  <li>
                    <strong>
                      Jan Assmann (Allemagne) et Théophile Obenga (Congo)
                    </strong>{" "}
                    — pour la réhabilitation de la Maât comme opérateur logique
                    universel de non-contradiction structurelle, arrachée au folklore
                    mémoriel pour être élevée au rang de modèle cybernétique
                    d&apos;harmonie systémique et de justice effective.
                  </li>
                </ul>

                <SousTitre>Posture méthodologique</SousTitre>
                <p>
                  Ce n&apos;est pas la position géographique qui donne la vue.
                  C&apos;est la moindre adhérence cognitive aux routines positivistes,
                  une posture partagée par tous ces savants à travers les cinq
                  continents.
                </p>
                <p>
                  La Science Métamoderne ne se substitue à aucune de ces autorités.
                  Elle les articule en une architecture supérieure qui formalise ce
                  qu&apos;elles ont en commun lorsqu&apos;elles produisent de
                  l&apos;intelligibilité. Elle ne juge pas les sciences ; elle cherche
                  à rendre intelligible l&apos;intelligibilité des sciences.
                </p>
              </BlocProse>
            </ArticleNumerote>

            {/* -------------------- ARTICLE IX -------------------- */}
            <ArticleNumerote id="article-ix" romain="IX" {...art("IX")}>
              <BlocProse cle="constitution.article_cloture_ethique.corps" className="text-encre">
                <p>
                  La Science Métamoderne ne demande aucune adhésion préalable. Elle
                  n&apos;invite pas à une croyance. Elle propose une méthode. Elle ne
                  prétend pas clore la recherche. Elle ouvre un espace où la recherche
                  peut se poursuivre selon des règles explicites, discutables et
                  continuellement perfectibles.
                </p>
                <p className="pl-6 text-encre-2 italic">
                  « Ce travail ne demande pas à être accepté sur autorité. Il demande
                  à être éprouvé. »
                </p>
                <p>
                  Cette formule constitue le pacte éthique fondateur de l&apos;École.
                  Elle interdit toute affirmation arbitraire, toute conclusion
                  insuffisamment démontrée, toute posture dogmatique. Elle gouverne
                  aussi bien la recherche que son exposition.
                </p>
              </BlocProse>
            </ArticleNumerote>

            {/* -------------------- ARTICLE X -------------------- */}
            <ArticleNumerote id="article-x" romain="X" {...art("X")}>
              <BlocProse cle="constitution.article_continuite.corps" className="text-encre">
                <p>
                  L&apos;intelligibilité ne constitue pas un état acquis une fois pour
                  toutes. Elle est un processus continu.
                </p>
                <p>
                  Elle se découvre. Elle se démontre. Elle se transmet. Elle
                  s&apos;institue. Elle se développe.
                </p>
                <p>
                  Toute tradition scientifique durable est celle qui parvient à
                  organiser cette continuité sans jamais interrompre le dialogue entre
                  les principes, les phénomènes, la démonstration et la critique.
                </p>
                <p>
                  La vocation de la Science Métamoderne est d&apos;expliciter les
                  conditions de cette continuité afin que la recherche de
                  l&apos;intelligibilité puisse devenir elle-même un objet de science.
                </p>
                <p>
                  Le Programme de Brazzaville n&apos;est pas un programme destiné à
                  résoudre une liste de problèmes. Il est un programme destiné à
                  augmenter durablement la capacité de l&apos;humanité à produire de
                  l&apos;intelligibilité.
                </p>
              </BlocProse>
            </ArticleNumerote>
          </div>
        </div>
      </section>

      {/* ======================= DISPOSITION FINALE ======================= */}
      <BlocSection id="disposition" titre={t("disposition_finale.titre")}>
        <BlocProse cle="constitution.disposition_finale.corps">
          <p className="italic">
            La présente Constitution entre en vigueur à la date de sa proclamation.
          </p>
          <p className="italic">
            Elle ne peut être modifiée que par l&apos;Institut de Brazzaville, sur
            proposition argumentée de la communauté scientifique de l&apos;École, et
            selon les mêmes exigences de démonstration et de critique qui gouvernent
            l&apos;ensemble du Programme.
          </p>
          <p className="mt-8! border-t border-filet pt-6 font-ui text-[15px] font-semibold text-encre">
            Locus : Brazzaville — Juillet 2026
          </p>
          <p className="mt-2! font-code text-xs leading-[1.6] tracking-[0.14em] text-or-700 uppercase">
            [Scellé et opposable pour l&apos;éternité des cycles de la raison]
          </p>
        </BlocProse>
      </BlocSection>

      {/* ======================= APPEL À L'ÉPREUVE ======================= */}
      <Cloture
        suite={
          <Link
            href="/manifeste"
            className={buttonVariants({ variant: "or-plein", size: "cta" })}
          >
            {t("cloture.bouton")} <span className="arr" aria-hidden="true">→</span>
          </Link>
        }
      >
        <h2 className="mb-5 font-titre text-[1.75rem] leading-[1.18] font-medium text-encre not-italic md:text-[2.125rem]">
          {t("cloture.titre")}
        </h2>
        <p>{t("cloture.citation")}</p>
      </Cloture>
    </>
  );
}

/** Sommaire latéral des dix articles (collant sur ordinateur). */
function SommaireArticles({
  articles: ARTICLES,
  lecture,
  lienLecture,
}: {
  articles: EntreeArticle[];
  /** aria-label des deux sommaires. */
  lecture: string;
  /** aria-label d'un numéro du sommaire mobile. */
  lienLecture: (a: EntreeArticle) => string;
}) {
  return (
    <>
      {/* Mobile : les dix numéros, en grille compacte. */}
      <nav aria-label={lecture} className="lg:hidden">
        <ol className="grid grid-cols-5 gap-1.5">
          {ARTICLES.map((a) => (
            <li key={a.id}>
              <a
                href={`#${a.id}`}
                aria-label={lienLecture(a)}
                className="flex min-h-11 items-center justify-center rounded-[2px] border border-filet bg-blanc font-titre text-lg text-or-700 hover:border-encre"
              >
                {a.romain}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      {/* Ordinateur : la liste des articles, collante. */}
      <nav aria-label={lecture} className="sticky top-6 hidden lg:block">
        <ol className="border-b border-filet-doux">
          {ARTICLES.map((a) => (
            <li key={a.id}>
              <a
                href={`#${a.id}`}
                className="glisse grid min-h-11 grid-cols-[40px_1fr] items-baseline gap-2 border-t border-filet-doux py-2 font-ui text-[14px] leading-snug text-encre-2 hover:text-encre hover:underline hover:decoration-or-500 hover:decoration-2 hover:underline-offset-[5px]"
              >
                <span className="font-titre text-[15px] text-or-700">{a.romain}</span>
                {a.titre}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

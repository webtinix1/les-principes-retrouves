import Link from "next/link";

import { Section, Container, TitreSection } from "@/components/section";
import { BlocProse } from "@/components/bloc";
import { Carte, Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Constitution Scientifique",
  description:
    "Acte constitutif du Programme de recherche de la Science Métamoderne : préambule et dix articles constitutionnels.",
  path: "/constitution",
});

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

/** Label liminaire d'un article (Or Maât, casse UI). */
function ArticleLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-ui text-sm font-semibold tracking-widest text-or uppercase">
      {children}
    </p>
  );
}

/** Intitulé secondaire à l'intérieur d'un article. */
function SousTitre({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 font-ui font-semibold">{children}</p>;
}

export default function Page() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <Section tone="profond" className="text-center">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-3xl font-bold tracking-[-0.02em] text-balance text-or sm:text-5xl">
            Constitution scientifique de l&apos;École de Brazzaville
          </h1>
          <p className="mt-6 font-sans text-lg text-blanc-casse italic">
            Acte constitutif du Programme de recherche de la Science Métamoderne
          </p>

          <Encadre className="mx-auto mt-10 max-w-2xl">
            <p className="font-heading text-xl text-or italic sm:text-2xl">
              « Ne rien imposer. Laisser les choses s&apos;imposer d&apos;elles-mêmes
              par la seule puissance du raisonnement. »
            </p>
          </Encadre>

          <p className="mt-8 font-sans text-blanc-casse italic">
            « Ce travail ne demande pas à être accepté sur autorité. Il demande à
            être éprouvé. »
          </p>

          <div className="mt-10">
            <a
              href="#articles"
              className={cn(buttonVariants({ variant: "ligne", size: "cta" }))}
            >
              Lire la Constitution intégrale ↓
            </a>
          </div>
        </Container>
      </Section>

      {/* ==================== PRÉAMBULE CONSTITUTIONNEL ==================== */}
      <Section tone="nuit" id="preambule">
        <Container>
          <TitreSection>Préambule constitutionnel</TitreSection>
          <BlocProse cle="constitution.preambule.corps" className="mt-8">
            <p className="font-sans italic">
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
            <p className="font-heading text-lg text-or italic">
              « Ne rien imposer. Laisser les choses s&apos;imposer d&apos;elles-mêmes
              par la seule puissance du raisonnement. »
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* ================= LES DIX ARTICLES CONSTITUTIONNELS ================= */}
      <Section tone="clair" id="articles">
        <Container>
          <TitreSection>Les dix articles constitutionnels</TitreSection>

          <div className="mt-10 space-y-8">
            {/* -------------------- ARTICLE I -------------------- */}
            <Carte>
              <ArticleLabel>Article I</ArticleLabel>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                L&apos;Objet
              </h3>
              <BlocProse cle="constitution.article_objet.corps" className="mt-4 mx-0 max-w-none text-bleu-nuit-profond">
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
            </Carte>

            {/* -------------------- ARTICLE II -------------------- */}
            <Carte>
              <ArticleLabel>Article II</ArticleLabel>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                Le Principe de Souveraineté du Démontré
              </h3>
              <BlocProse cle="constitution.article_souverainete.corps" className="mt-4 mx-0 max-w-none text-bleu-nuit-profond">
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
            </Carte>

            {/* -------------------- ARTICLE III -------------------- */}
            <Carte>
              <ArticleLabel>Article III</ArticleLabel>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                La Distinction constitutionnelle
              </h3>
              <BlocProse cle="constitution.article_distinction.corps" className="mt-4 mx-0 max-w-none text-bleu-nuit-profond">
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
            </Carte>

            {/* -------------------- ARTICLE IV -------------------- */}
            <Carte>
              <ArticleLabel>Article IV</ArticleLabel>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                Le Statut des hypothèses et le Programme d&apos;Expansion
              </h3>
              <BlocProse cle="constitution.article_hypotheses.corps" className="mt-4 mx-0 max-w-none text-bleu-nuit-profond">
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
            </Carte>

            {/* -------------------- ARTICLE V -------------------- */}
            <Carte>
              <ArticleLabel>Article V</ArticleLabel>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                Le Statut de la critique
              </h3>
              <BlocProse cle="constitution.article_critique.corps" className="mt-4 mx-0 max-w-none text-bleu-nuit-profond">
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
            </Carte>

            {/* -------------------- ARTICLE VI -------------------- */}
            <Carte>
              <ArticleLabel>Article VI</ArticleLabel>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                Le Statut des Organons futurs
              </h3>
              <BlocProse cle="constitution.article_organons.corps" className="mt-4 mx-0 max-w-none text-bleu-nuit-profond">
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
            </Carte>

            {/* -------------------- ARTICLE VII -------------------- */}
            <Carte>
              <ArticleLabel>Article VII</ArticleLabel>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                Le Statut de l&apos;auteur
              </h3>
              <BlocProse cle="constitution.article_auteur.corps" className="mt-4 mx-0 max-w-none text-bleu-nuit-profond">
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
            </Carte>

            {/* -------------------- ARTICLE VIII -------------------- */}
            <Carte>
              <ArticleLabel>Article VIII</ArticleLabel>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                Les Autorités de convergence
              </h3>
              <BlocProse cle="constitution.article_autorites.corps" className="mt-4 mx-0 max-w-none text-bleu-nuit-profond">
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
            </Carte>

            {/* -------------------- ARTICLE IX -------------------- */}
            <Carte>
              <ArticleLabel>Article IX</ArticleLabel>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                La Formule de clôture éthique
              </h3>
              <BlocProse cle="constitution.article_cloture_ethique.corps" className="mt-4 mx-0 max-w-none text-bleu-nuit-profond">
                <p>
                  La Science Métamoderne ne demande aucune adhésion préalable. Elle
                  n&apos;invite pas à une croyance. Elle propose une méthode. Elle ne
                  prétend pas clore la recherche. Elle ouvre un espace où la recherche
                  peut se poursuivre selon des règles explicites, discutables et
                  continuellement perfectibles.
                </p>
                <p className="font-heading text-lg text-bleu-nuit-profond italic">
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
            </Carte>

            {/* -------------------- ARTICLE X -------------------- */}
            <Carte>
              <ArticleLabel>Article X</ArticleLabel>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                Le Principe de continuité de l&apos;intelligibilité
              </h3>
              <BlocProse cle="constitution.article_continuite.corps" className="mt-4 mx-0 max-w-none text-bleu-nuit-profond">
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
            </Carte>
          </div>
        </Container>
      </Section>

      {/* ======================= DISPOSITION FINALE ======================= */}
      <Section tone="academique">
        <Container>
          <TitreSection>Disposition finale</TitreSection>
          <BlocProse cle="constitution.disposition_finale.corps" className="mt-8">
            <p className="italic">
              La présente Constitution entre en vigueur à la date de sa proclamation.
            </p>
            <p className="italic">
              Elle ne peut être modifiée que par l&apos;Institut de Brazzaville, sur
              proposition argumentée de la communauté scientifique de l&apos;École, et
              selon les mêmes exigences de démonstration et de critique qui gouvernent
              l&apos;ensemble du Programme.
            </p>
            <p className="mt-6 font-ui font-semibold">
              Locus : Brazzaville — Juillet 2026
            </p>
            <p className="font-ui tracking-widest text-or uppercase">
              [Scellé et opposable pour l&apos;éternité des cycles de la raison]
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* ======================= APPEL À L'ÉPREUVE ======================= */}
      <Section tone="nuit" className="text-center">
        <Container className="max-w-3xl">
          <TitreSection className="text-center" filet={false}>
            Appel à l&apos;épreuve
          </TitreSection>
          <p className="mt-8 font-heading text-xl text-blanc-casse italic sm:text-2xl">
            « La Constitution scientifique de l&apos;École de Brazzaville ne demande
            pas à être acceptée sur autorité. Elle demande à être éprouvée par la
            recherche elle-même. »
          </p>
          <div className="mt-10">
            <Link
              href="/manifeste"
              className={cn(buttonVariants({ variant: "or", size: "cta" }))}
            >
              Explorer le Manifeste →
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

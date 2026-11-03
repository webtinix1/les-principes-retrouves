import Link from "next/link";
import { Section, Container, TitreSection } from "@/components/section";
import { BlocProse, BlocTexte } from "@/components/bloc";
import { Carte, Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Le Manifeste de Brazzaville",
  description:
    "L'Horizon de l'Effectivité Normative : diagnostic de la crise de l'intelligibilité et les sept articles du Manifeste.",
  path: "/manifeste",
});

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

/** Les sept articles du Manifeste de Brazzaville. */
const ARTICLES = [
  {
    id: "article-i",
    numero: "Article I",
    titre: "Primauté de l'Intelligibilité sur l'Opératoire",
    texte:
      "La recherche scientifique dépend d'abord du cerveau avant de dépendre du laboratoire. Le laboratoire vérifie, mesure, contrôle ou réfute ; mais c'est l'intelligence qui formule les problèmes, identifie les anomalies, construit les hypothèses et découvre les principes.",
  },
  {
    id: "article-ii",
    numero: "Article II",
    titre: "Le Théorème de la Genèse Scientifique",
    texte:
      "La connaissance ne naît pas de l'induction mécanique, ni de la déduction formelle. Elle naît de la rencontre entre une intelligibilité déjà présente et une difficulté qui en révèle l'incomplétude. La genèse réelle de la découverte obéit à la séquence : Architecture Préalable → Paradoxe/Anomalie → Hypothèse → Thésis → Expérantia → Connaissance.",
  },
  {
    id: "article-iii",
    numero: "Article III",
    titre: "Le Principe de Nécessité Heuristique",
    texte:
      "L'ascension vers les principes ne s'effectue pas par spéculation arbitraire. Chaque élévation vers un niveau supérieur d'intelligibilité doit apparaître comme la conséquence nécessaire des insuffisances constatées au niveau inférieur. Le chercheur ne monte pas parce qu'il le veut ; il monte parce que le niveau inférieur ne suffit plus à rendre compte de la cohérence du réel.",
  },
  {
    id: "article-iv",
    numero: "Article IV",
    titre: "La Reconstruction Synthétique",
    texte:
      "L'analyse est nécessaire, mais elle fragmente. Elle dissèque le réel en disciplines, en objets et en variables. La synthèse reconstructive est la forme supérieure de l'analyse : elle consiste à remonter des éléments dissociés vers les fondements implicites qui les unissent. Là où l'analyse voit des disciplines séparées, la méthode reconstructive cherche le Substratum Commun qui les rend simultanément possibles.",
  },
  {
    id: "article-v",
    numero: "Article V",
    titre: "La Double Respiration du Réel et de la Connaissance",
    texte:
      "La méthode reconnaît deux mouvements symétriques et inverses. Le mouvement descendant (Ontologique) : le Substratum Commun (Σ, π₁ ↔ π₂) se convertit progressivement en manifestations observables à travers la Charnière Ontologique et le Voile Ontologique. Le mouvement ascendant (Épistémologique) : l'intelligence remonte du monde observable, franchit le Voile, traverse la Charnière, et reconstruit l'architecture préalable pour retrouver le Substratum Commun.",
  },
  {
    id: "article-vi",
    numero: "Article VI",
    titre: "Le Principe de Non-Imposition",
    texte:
      "Nul principe ne peut être introduit avant que le raisonnement n'en ait progressivement établi la nécessité. La recherche ne consiste pas à imposer des conclusions, mais à reconstruire les conditions qui conduisent nécessairement jusqu'à elles.",
  },
  {
    id: "article-vii",
    numero: "Article VII",
    titre: "Le Principe de Démonstration Catégorique",
    texte:
      "Aucune affirmation ne peut être tenue pour acquise tant qu'elle n'a pas fait l'objet d'une démonstration suffisante au regard de son domaine. L'ambition d'une théorie ne dispense jamais de l'exigence de sa démonstration.",
  },
];

/** PAGE 4 — LE MANIFESTE DE BRAZZAVILLE. */
export default function ManifestePage() {
  return (
    <>
      {/* Hero */}
      <Section tone="profond" className="text-center">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-or sm:text-5xl">
            Le Manifeste de Brazzaville
          </h1>
          <BlocTexte
            cle="manifeste.hero.sous_titre"
            className="mt-4 font-sans text-lg italic text-blanc-casse/80"
          >
            L'Horizon de l'Effectivité Normative
          </BlocTexte>
          <BlocTexte
            cle="manifeste.hero.exergue"
            as="blockquote"
            className="mt-6 font-heading text-lg italic text-blanc-casse"
          >
            « Ce qui structure le Réel ne peut disparaître : l'Univers ne
            s'anéantit pas, il s'occulte. »
          </BlocTexte>
        </Container>
      </Section>

      {/* Section 1 — Le diagnostic */}
      <Section tone="clair">
        <Container>
          <header className="mb-8">
            <TitreSection>
              Le diagnostic — une crise de l'intelligibilité contemporaine
            </TitreSection>
          </header>
          <BlocProse cle="manifeste.diagnostic.corps">
            <p>
              La science contemporaine traverse une anomalie structurelle
              majeure dont les symptômes, bien que visibles, demeurent
              insuffisamment théorisés. L'humanité accumule une quantité sans
              précédent de données phénoménales — en astronomie, en biologie
              moléculaire, en physique quantique, en sciences juridiques — tout
              en subissant un recul dramatique de leur compréhension d'ensemble.
            </p>
            <p>
              Nous mesurons avec une précision inédite, nous calculons avec une
              puissance computationnelle inégalée, mais nous ne comprenons plus
              comment le Tout tient ensemble.
            </p>
            <p>
              <strong>
                Cette crise n'est pas une crise du savoir. Elle est une crise de
                l'intelligibilité du savoir.
              </strong>
            </p>
            <p>
              Le problème ne réside pas dans l'insuffisance des instruments
              d'observation ni dans la rareté des données brutes. Il réside dans
              l'effacement progressif de la réflexion fondamentale qui avait
              jadis pour fonction d'interroger les principes, les formes
              génératrices et les conditions d'intelligibilité des phénomènes
              étudiés. Les grandes traditions philosophiques et scientifiques —
              d'Aristote à Descartes, de Kant à Hegel, de Popper à Lakatos — ont
              fourni des réponses majeures à des questions partielles. Aucune
              cependant n'a pris pour objet l'intelligibilité elle-même dans
              toute son amplitude.
            </p>
            <p>
              La Science Métamoderne se propose précisément de combler cet
              espace théorique. Elle ne cherche pas à ajouter une théorie
              supplémentaire aux théories existantes. Elle cherche à restituer
              les conditions de possibilité de toute production de connaissance.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* Section 2 — L'illusion quantitative moderniste */}
      <Section tone="gris">
        <Container>
          <header className="mb-8">
            <TitreSection>
              L'illusion quantitative moderniste et le principe de technicité
            </TitreSection>
          </header>
          <BlocProse cle="manifeste.illusion_quantitative.corps">
            <p>
              Le tournant épistémologique initié par Francis Bacon, théorisé par
              Emmanuel Kant et radicalisé par la dialectique hégélienne, a opéré
              une inversion critique : la substitution de l'observation empirique{" "}
              <em>a posteriori</em> à la déduction fondamentale{" "}
              <em>a priori</em>. En décrétant que le progrès de la connaissance
              dépend principalement du perfectionnement des moyens techniques, la
              science moderne s'est enlisée dans ce que René Thom qualifiait de
              « misère théorique » généralisée.
            </p>
            <p>
              <strong>
                Cette illusion repose sur le « principe de technicité »
              </strong>{" "}
              : la croyance qu'une accumulation frénétique de faits bruts finira
              par faire jaillir spontanément la vérité. Or, la profusion des
              données phénoménales n'a fait qu'accentuer la cécité structurale de
              l'époque. On confond la précision descriptive des effets avec la
              compréhension ontologique des causes.
            </p>
            <p>
              La science moderne excelle dans l'art de mesurer, de prévoir et
              d'exploiter les effets, mais elle a renoncé à l'exigence de
              comprendre les structures profondes et les causes premières qui
              font tenir les phénomènes ensemble. Le technicien moderne se sature
              d'un « savoir-faire parcellaire » tout en devenant structurellement
              aveugle aux architectures profondes qui unissent les phénomènes.
            </p>
            <p>
              <strong>
                Ce n'est pas le laboratoire qui produit la science ; c'est le
                cerveau.
              </strong>
            </p>
            <p>
              Comme le soulignait Pierre Delattre, le « secret » des expériences
              cruciales, qui apportent les progrès les plus nets parce que leurs
              résultats ont une large validité, ne réside pas ailleurs que dans
              le choix judicieux des paramètres significatifs, dicté par
              l'architecture conceptuelle préalable. L'expérience ne produit pas
              l'idée ; elle la juge.
            </p>
            <p>
              Comme l'observait Claude Bernard, la découverte scientifique
              procède d'une{" "}
              <strong>rationnelle interprétation mentale</strong> qui précède et
              gouverne l'expérience ; quand nous croyons induire, nous déduisons
              réellement ; seulement l'expérimentateur se dirige d'après un
              principe supposé ou provisoire.
            </p>
            <p>
              Cette dérive s'est accompagnée de la marginalisation des fondements
              rationnels endogènes. Les principes fondamentaux d'intelligibilité,
              formalisés dès Kemet et transmis à la tradition grecque, ont été
              progressivement effacés du récit dominant de l'histoire des
              sciences, réduits à des vestiges folkloriques plutôt que reconnus
              comme la matrice originelle de la rationalité universelle.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* Section 3 — Le piège post-moderne */}
      <Section tone="clair">
        <Container>
          <header className="mb-8">
            <TitreSection>
              Le piège post-moderne — du scepticisme au nihilisme du réel
            </TitreSection>
          </header>
          <BlocProse cle="manifeste.piege_postmoderne.corps">
            <p>
              Face aux rigidités du positivisme dogmatique, la critique
              post-moderne a légitimement dénoncé l'arbitraire des prénotions et
              les circuits de légitimation institutionnels. Cependant, en faisant
              de la déconstruction son unique horizon, elle a dissous l'idée même
              de vérité objective au profit d'un relativisme absolu.
            </p>
            <p>
              Le post-modernisme a acté la fragmentation du savoir ordinaire (K),
              mais il s'y est complu, transformant la recherche en un archipel de
              disciplines isolées et aveugles. Sa rébellion est purement négative
              : il est capable de disséquer le sensible, mais structurellement
              inapte à reconstruire ce qu'il a brisé. Il laisse le chercheur
              livré à sa propre merci et abandonné à son propre dénuement, enfermé
              dans le chaos d'une multiplicité sans principe directeur.
            </p>
            <p>
              <strong>
                La Science Métamoderne refuse cette alternative stérile entre le
                dogmatisme moderne et le nihilisme post-moderne.
              </strong>{" "}
              Elle ne rejette ni la rigueur de l'analyse moderne, ni la vigilance
              critique post-moderne ; elle les réorganise.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* Section 4 — La Matrice de la Maât */}
      <Section tone="nuit">
        <Container>
          <header className="mb-8">
            <TitreSection>
              La Matrice de la Maât — opérateur suprême de non-contradiction
            </TitreSection>
          </header>
          <BlocProse cle="manifeste.matrice_maat.intro" className="text-blanc-casse [&_strong]:text-or">
            <p>
              La Science Métamoderne réhabilite la matrice de la Maât — non comme
              un folklore mémoriel, mais comme le modèle cybernétique d'harmonie
              systémique et de justice effective. Débarrassée des lectures
              identitaires ou nostalgiques, la Maât est théorisée ici comme
              l'exigence de non-contradiction structurelle suprême, définie par
              trois propriétés cumulatives :
            </p>
          </BlocProse>
          <div className="mx-auto mt-8 grid max-w-[68ch] gap-6">
            <Encadre>
              <p className="font-heading text-xl font-semibold text-or">
                1. Totalité
              </p>
              <p className="mt-2 font-sans">
                Rien n'existe hors du système. Chaque fragment n'a de sens que
                rattaché à l'architecture globale qui le rend possible.
              </p>
            </Encadre>
            <Encadre>
              <p className="font-heading text-xl font-semibold text-or">
                2. Indivisibilité
              </p>
              <p className="mt-2 font-sans">
                La fragmentation apparente n'est qu'une illusion transitoire
                provoquée par les limites de l'observateur. L'unité précède la
                multiplicité.
              </p>
            </Encadre>
            <Encadre>
              <p className="font-heading text-xl font-semibold text-or">
                3. Cohérence Interne
              </p>
              <p className="mt-2 font-sans">
                Absence absolue de contradiction fonctionnelle. Le système
                maintient activement sa propre unité face aux agressions du
                milieu extérieur.
              </p>
            </Encadre>
          </div>
          <BlocProse cle="manifeste.matrice_maat.conclusion" className="mt-8 text-blanc-casse">
            <p>
              La Maât transpose, dans le champ normatif du droit, de la justice
              et de l'équité procédurale, les principes universels de
              l'intelligibilité, sans les exposer comme tels. Elle est la
              contre-partie exacte de la Pyramide de{" "}
              <span className="font-mono text-or">Σ</span> : là où le Tome I
              modélise la structure ontologique du réel, le Tome II déploie la
              Balance de la Maât comme instrument de rectification des pathologies
              systémiques.
            </p>
            <p>
              Face à l'<em>Isfet</em> — la disharmonie, la rupture de tension,
              l'omission législative —, la Maât agit comme le thermostat supérieur
              de non-contradiction qui s'oppose à l'entropie et restaure
              l'équilibre du système.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* Section 5 — La décolonisation méthodologique de l'universel */}
      <Section tone="clair">
        <Container>
          <header className="mb-8">
            <TitreSection>
              La décolonisation méthodologique de l'universel
            </TitreSection>
          </header>
          <BlocProse cle="manifeste.decolonisation.corps">
            <p>
              Adosser cette exigence d'harmonie systémique et d'effectivité
              absolue au modèle universel de la Maât, c'est situer l'École de
              Brazzaville au centre du débat scientifique international. Penser la
              refondation du droit et de la connaissance à partir de ces principes
              n'est pas le produit d'un repli localisé ou d'un particularisme.
              C'est l'affirmation d'un <strong>Privilège Optique</strong> partagé
              par une lignée de précurseurs sur les cinq continents.
            </p>
            <p>
              <strong>L'Universalité de la Lignée des Précurseurs.</strong> En
              s'appuyant sur les ruptures épistémologiques de René Thom (France),
              Pierre Delattre (Belgique), Jean-Paul Benzécri (France), Claude
              Bernard (France), Georges Duhamel (France), Jules Carles (France),
              Thomas Kuhn (États-Unis), Ludwig von Bertalanffy (Autriche), Samir
              Amin (Égypte/France), Cheikh Anta Diop (Sénégal), Jan Assmann
              (Allemagne) et Théophile Obenga (Congo), cette démarche s'assimile à
              ces esprits qui, d'Europe en Amérique, de l'Inde à l'Afrique, ont su
              identifier les angles morts du réductionnisme.
            </p>
            <p>
              <strong>
                Ce n'est pas la position géographique qui donne la vue. C'est la
                moindre adhérence cognitive aux routines positivistes,
              </strong>{" "}
              une posture partagée par tous ces savants à travers les cinq
              continents.
            </p>
            <p>
              La décolonisation méthodologique opérée ici n'est pas une démarche
              identitaire ou militante ; elle est strictement épistémologique.
              Elle vise à arracher les fondements rationnels endogènes au folklore
              pour restituer leur portée logico-mathématique originelle.{" "}
              <strong>
                L'universel n'a pas de centre géographique exclusif.
              </strong>{" "}
              Il ne dépend ni de la validation des centres académiques dominants,
              ni des circuits de légitimation formels : l'universel se démontre par
              la puissance explicative de sa méthode.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* Section 6 — Les sept articles du Manifeste */}
      <Section tone="gris">
        <Container>
          <header className="mb-8">
            <TitreSection>Les sept articles du Manifeste</TitreSection>
            <BlocTexte
              cle="manifeste.articles.chapeau"
              className="mt-4 max-w-[68ch] pl-4 font-sans text-base leading-relaxed text-bleu-nuit-profond/80"
            >
              Le Manifeste de Brazzaville ne se contente pas de diagnostiquer la
              crise. Il formule les sept principes qui gouvernent la remontée
              reconstructive vers l'Intelligibilité.
            </BlocTexte>
          </header>
          <div className="grid gap-6 lg:grid-cols-2">
            {ARTICLES.map((article) => (
              <Carte key={article.id}>
                <p className="font-mono text-sm text-or">{article.numero}</p>
                <h3 className="mt-1 font-heading text-xl font-semibold">
                  {article.titre}
                </h3>
                <p className="mt-3 font-sans text-base leading-relaxed">
                  {article.texte}
                </p>
              </Carte>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 7 — Le pacte éthique avec le lecteur */}
      <Section tone="nuit">
        <Container>
          <header className="mb-8">
            <TitreSection>Le pacte éthique avec le lecteur</TitreSection>
          </header>
          <BlocProse cle="manifeste.pacte.corps" className="text-center text-blanc-casse">
            <p>
              La Science Métamoderne ne demande aucune adhésion préalable. Elle
              n'invite pas à une croyance. Elle propose une méthode. Elle ne
              prétend pas clore la recherche. Elle ouvre un espace où la recherche
              peut se poursuivre selon des règles explicites, discutables et
              continuellement perfectibles.
            </p>
            <p>
              Si cette démarche est fondée, <em>Les Principes Retrouvés</em> ne
              marquent pas l'achèvement d'une théorie. Ils constituent l'acte
              fondateur d'un programme de recherche appelé à produire, par la même
              méthode et sous les mêmes exigences, une série de démonstrations
              nouvelles dans les différents champs de la connaissance.
            </p>
          </BlocProse>
          <div className="mx-auto mt-8 max-w-[68ch]">
            <Encadre className="text-center">
              <BlocTexte
                cle="manifeste.pacte.exergue"
                className="font-heading text-lg italic text-blanc-casse"
              >
                Ce travail ne demande pas à être accepté sur autorité. Il demande
                à être éprouvé.
              </BlocTexte>
            </Encadre>
          </div>
        </Container>
      </Section>

      {/* Appel à l'épreuve — CTA */}
      <Section tone="profond" className="text-center">
        <Container className="max-w-2xl">
          <p className="font-heading text-xl italic text-blanc-casse">
            L'appel à l'épreuve.
          </p>
          <BlocTexte
            cle="manifeste.appel.corps"
            className="mt-4 font-sans text-base leading-relaxed text-blanc-casse/80"
          >
            La formalisation de ces invariants et leur soumission à l'examen
            critique se poursuivent dans la Note Épistémologique.
          </BlocTexte>
          <Link
            href="/note-epistemologique"
            className={cn(buttonVariants({ variant: "or", size: "cta" }), "mt-8")}
          >
            Découvrir la Note Épistémologique
          </Link>
        </Container>
      </Section>
    </>
  );
}

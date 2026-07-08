import Link from "next/link";
import { Section, Container, Prose, TitreSection } from "@/components/section";
import { Carte, Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Note Épistémologique",
  description:
    "Restituer les conditions de l'intelligibilité : primauté du cerveau sur le laboratoire, Canon de la Découverte en sept principes, sextuor de la structuration intime.",
  path: "/note-epistemologique",
});

/** Le Canon de la Découverte — sept principes (Section 4). */
const CANON = [
  {
    id: "principe-i",
    titre: "Principe I — Le primat de l'intelligibilité sur l'opératoire",
    texte:
      "La recherche scientifique dépend d'abord du cerveau avant de dépendre du laboratoire.",
  },
  {
    id: "principe-ii",
    titre: "Principe II — Le Théorème de la Genèse Scientifique",
    texte:
      "La connaissance ne naît pas de l'induction mécanique, ni de la déduction formelle. Elle naît de la rencontre entre une intelligibilité déjà présente et une difficulté qui en révèle l'incomplétude.",
  },
  {
    id: "principe-iii",
    titre: "Principe III — Le principe de nécessité heuristique",
    texte:
      "Chaque élévation vers un niveau supérieur d'intelligibilité doit apparaître comme la conséquence nécessaire des insuffisances constatées au niveau inférieur.",
  },
  {
    id: "principe-iv",
    titre: "Principe IV — La reconstruction synthétique",
    texte:
      "La synthèse reconstructive consiste à remonter des éléments dissociés vers les fondements implicites qui les unissent.",
  },
  {
    id: "principe-v",
    titre: "Principe V — La double respiration du réel et de la connaissance",
    texte:
      "Le mouvement descendant (ontologique) et le mouvement ascendant (épistémologique) sont les deux battements d'un même cœur rationnel.",
  },
  {
    id: "principe-vi",
    titre: "Principe VI — Le principe de non-imposition",
    texte:
      "Nul principe ne peut être introduit avant que le raisonnement n'en ait progressivement établi la nécessité.",
  },
  {
    id: "principe-vii",
    titre: "Principe VII — Le principe de démonstration catégorique",
    texte:
      "Aucune affirmation ne peut être tenue pour acquise tant qu'elle n'a pas fait l'objet d'une démonstration suffisante au regard de son domaine. L'ambition d'une théorie ne dispense jamais de l'exigence de sa démonstration.",
  },
];

/** Le sextuor de la structuration intime — six cas d'étude (Section 6). */
const SEXTUOR = [
  {
    id: "le-verrier",
    titre: "1. Urbain Le Verrier (L'Invisible Mathématique)",
    texte:
      "Il n'est pas convoqué pour ses mérites d'astronome, mais parce qu'il démontre magistralement comment la détection d'une Anomalie (les perturbations d'Uranus) force une reconstruction théorique pure avant toute observation télescopique. En 1846, Le Verrier calcule la position de Neptune à la pointe de sa plume, forçant le visible à s'aligner sur l'invisible mathématique.",
  },
  {
    id: "galois",
    titre: "2. Évariste Galois (L'Architecture de la Symétrie)",
    texte:
      "Il met à nu la structure intime du calcul non pas en résolvant des équations isolées, mais en prouvant qu'une Architecture Abstraite (la théorie des groupes) devance et gouverne sa propre démonstration. La veille de sa mort, en 1832, Galois scelle l'algèbre moderne en identifiant les invariants de symétrie qui rendent les équations résolubles ou non.",
  },
  {
    id: "chadwick",
    titre: "3. James Chadwick (La Confirmation Expérimentale)",
    texte:
      "Il illustre avec une précision clinique le passage chirurgical d'une Hypothèse Structurée (le besoin de neutralité pour maintenir la cohésion atomique) à sa validation factuelle. En 1932, Chadwick ne découvre pas le neutron par hasard ; il le déduit de la nécessité structurelle de combler l'anomalie de masse constatée au sein du noyau atomique.",
  },
  {
    id: "colomb",
    titre: "4. Christophe Colomb (La Complétude de la Sphère)",
    texte:
      "Il brise la fiction de clôture géographique de son époque non par un hasard empirique, mais en subordonnant l'appareil technique de son expédition à une Majeure Rationnelle Préalable : l'isomorphisme et l'unité de la sphère (Σ). Le voyage de 1492 n'est pas une errance ; c'est l'Expérantia subordonnée à l'Hypothèse de la rotondité terrestre.",
  },
  {
    id: "claude-bernard",
    titre: "5. Claude Bernard (L'Invisible Biologique)",
    texte:
      "Il applique le Canon au vivant en posant a priori l'existence du « Milieu Intérieur » comme thermostat supérieur de non-contradiction. Il démontre que l'idée directrice interne gouverne impérativement l'expérience. L'organisme n'est pas un système passif soumis aux caprices de l'environnement extérieur ; il maintient activement sa propre unité (Σ).",
  },
  {
    id: "huxley",
    titre: "6. Thomas Henry Huxley (La Continuité Structurale)",
    texte:
      "Il traverse le voile du temps géologique en démontrant que la paléontologie n'est pas un catalogue fortuit de débris, mais une reconstruction morphologique intégrale régie par des lois d'anatomie comparée. En identifiant le lien intime entre les dinosaures et les oiseaux, Huxley prouve que la continuité structurelle traverse les époques et les espèces.",
  },
];

/** PAGE 5 — NOTE ÉPISTÉMOLOGIQUE (Restituer les conditions de l'intelligibilité). */
export default function NoteEpistemologiquePage() {
  return (
    <>
      {/* Hero */}
      <Section tone="profond" className="text-center">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-or sm:text-5xl">
            NOTE ÉPISTÉMOLOGIQUE
          </h1>
          <p className="mt-4 font-sans text-lg italic text-blanc-casse/80">
            Restituer les conditions de l'intelligibilité
          </p>
          <blockquote className="mt-6 font-heading text-lg italic text-blanc-casse">
            « Le réel est voilé pour tous, filtré pour certains, et
            reconstructible par la méthode. »
          </blockquote>
        </Container>
      </Section>

      {/* Section 1 — Posture métascientifique */}
      <Section tone="clair">
        <Container>
          <header className="mb-8">
            <TitreSection>
              Posture métascientifique — l'intelligibilité de l'intelligibilité
            </TitreSection>
          </header>
          <Prose>
            <p>
              L'École de Brazzaville n'a pas pour vocation de se substituer, de
              juger ou de valider les disciplines scientifiques constituées. Elle
              reconnaît pleinement leur autonomie, leurs méthodes propres et
              l'exactitude de leurs résultats. Son objet est d'un autre ordre :
              elle se déploie comme une science qui cherche à{" "}
              <strong>rendre intelligible l'intelligibilité des sciences</strong>.
            </p>
            <p>
              L'esprit humain, lorsqu'il est livré à son propre sort, abandonné à
              son propre dénuement et laissé à sa propre merci, subit le chaos des
              faits bruts et s'enferme dans des tautologies restrictives. Contre
              cette entropie cognitive, la Science Métamoderne propose une
              hypothèse structurale générale : les grandes découvertes de
              l'histoire humaine, par-delà la diversité de leurs objets
              particuliers, partagent des invariants structurels profonds dans
              leur mécanisme de production de la connaissance.
            </p>
            <p>
              Cette Note Épistémologique a pour objet de formaliser ces invariants
              et de les soumettre à l'épreuve de l'examen critique. Elle ne décrit
              pas la science depuis l'extérieur ; elle en restitue l'architecture,
              en formalise les médiations et en guide la remontée.
            </p>
          </Prose>
        </Container>
      </Section>

      {/* Section 2 — Axiome central */}
      <Section tone="gris">
        <Container>
          <header className="mb-8">
            <TitreSection>
              Axiome central — la primauté du cerveau sur le laboratoire
            </TitreSection>
          </header>
          <Prose>
            <p>
              L'École de Brazzaville affirme un principe fondateur que l'illusion
              empiriste moderne a progressivement occulté :{" "}
              <strong>
                l'accumulation brute de faits issus du hasard de l'instrumentation
                technique ne produit jamais de sens
              </strong>
              .
            </p>
            <p>
              L'expérience n'engendre pas le concept ; elle se contente d'en
              valider ou d'en falsifier la portée. Le Monde Observable (S) reçoit
              sa signification de l'Architecture Préalable d'Intelligibilité
              forgée par l'activité rationnelle de l'esprit. Sans prémisse majeure
              conçue a priori, la recherche scientifique s'abîme dans une pure
              description phénoménale privée de profondeur ontologique.
            </p>
          </Prose>
          <div className="mx-auto mt-8 max-w-[68ch]">
            <Encadre>
              <p className="font-heading text-lg italic">
                Le laboratoire ne crée pas l'ordre ; il juge l'ordre que
                l'intelligence a d'abord reconnu sous le Voile.
              </p>
            </Encadre>
          </div>
          <Prose className="mt-8">
            <p>
              Comme le soulignait René Thom, le progrès scientifique est avant
              tout une affaire de représentation mentale partielle des phénomènes,
              et non de simple manipulation technique. Comme le démontrait Pierre
              Delattre, le « secret » des expériences cruciales ne réside pas
              ailleurs que dans le choix judicieux des paramètres significatifs,
              dicté par l'architecture conceptuelle préalable. Comme l'observait
              Claude Bernard, la découverte scientifique procède d'une{" "}
              <strong>rationnelle interprétation mentale</strong> qui précède et
              gouverne l'expérience ; quand nous croyons induire, nous déduisons
              réellement ; seulement l'expérimentateur se dirige d'après un
              principe supposé ou provisoire.
            </p>
            <p>
              Ces trois autorités de convergence verrouillent définitivement la
              primauté de l'intelligibilité sur l'opératoire.
            </p>
          </Prose>
        </Container>
      </Section>

      {/* Section 3 — Les deux principes suprêmes d'organisation */}
      <Section tone="clair">
        <Container>
          <header className="mb-8">
            <TitreSection>
              Les deux principes suprêmes d'organisation
            </TitreSection>
          </header>
          <div className="grid gap-6 lg:grid-cols-2">
            <Carte>
              <h3 className="font-heading text-xl font-semibold">
                Principe d'Unité Structurelle (Généralisation)
              </h3>
              <p className="mt-3 font-heading text-lg italic">
                « Toutes les échelles du réel obéissent à une même loi organique. »
              </p>
              <p className="mt-4 font-sans leading-relaxed">
                Le fragment isolé n'a pas de sens intelligible hors de sa relation
                avec la totalité (<span className="font-mono text-or">Σ</span>).
                Cette loi traverse la physique, la biologie, le droit et les
                sciences sociales. L'isomorphisme des découvertes à travers les
                disciplines n'est pas un hasard ; il est le signe que l'Unité
                Structurelle Absolue (<span className="font-mono text-or">Σ</span>)
                préexiste à la fragmentation du Voile et du Filtrage.
              </p>
            </Carte>
            <Carte>
              <h3 className="font-heading text-xl font-semibold">
                Principe de Polarité Complémentaire (Dualité)
              </h3>
              <p className="mt-3 font-heading text-lg italic">
                « Toute réalité intelligible comporte deux pôles corrélatifs et
                oscillants (<span className="font-mono text-or">π₁ ↔ π₂</span>). »
              </p>
              <p className="mt-4 font-sans leading-relaxed">
                L'analyse procède par distinction (
                <span className="font-mono text-or">π₁</span>) et la synthèse opère
                par relation (<span className="font-mono text-or">π₂</span>). Ces
                deux polarités ne s'opposent pas ; elles sont les deux battements
                d'un même cœur rationnel. L'erreur fondamentale des cadres de
                pensée classiques est de croire que la relation naît de la
                rencontre d'éléments préexistants. Le paradigme métamoderne affirme
                l'inverse : l'unité produit la relation, et la relation définit les
                termes.
              </p>
            </Carte>
          </div>
        </Container>
      </Section>

      {/* Section 4 — Le Théorème de la Genèse Scientifique : le Canon en 7 principes */}
      <Section tone="nuit">
        <Container>
          <header className="mb-8">
            <TitreSection>
              Le Théorème de la Genèse Scientifique — le Canon en 7 principes
            </TitreSection>
          </header>
          <Prose className="text-blanc-casse">
            <p>
              Toute authentique découverte s'élabore selon un parcours
              inductif-rationnel vertical indéfectible. Ce processus algorithmique
              est modélisé par le Canon de la Découverte en 7 principes :
            </p>
          </Prose>
          <div className="mx-auto mt-8 max-w-[68ch]">
            <Encadre>
              <pre className="overflow-x-auto font-mono text-sm text-or">
                {`[ ARCHITECTURE PRÉALABLE ] ← L'infrastructure implicite
            ↓
[ ANOMALIE / PARADOXE ]   ← Le point d'impact entropique
            ↓
[ QUESTION ]              ← La circonscription du vide sémantique
            ↓
[ HYPOTHÈSE ]            ← La Majeure rationnelle (hyppo, en deçà)
            ↓
[ THÉSIS ]               ← L'action de poser et de démontrer
            ↓
[ EXPÉRANTIA ]           ← Le banc d'essai phénoménal (mineure subordonnée)
            ↓
[ CONNAISSANCE ]         ← La réintégration néguentropique`}
              </pre>
            </Encadre>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {CANON.map((principe) => (
              <Carte key={principe.id}>
                <h3 className="font-heading text-lg font-semibold">
                  {principe.titre}
                </h3>
                <p className="mt-3 font-sans leading-relaxed">{principe.texte}</p>
              </Carte>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 5 — Rectification de la triade dialectique */}
      <Section tone="clair">
        <Container>
          <header className="mb-8">
            <TitreSection>
              Rectification de la triade dialectique
            </TitreSection>
            <h3 className="mt-3 pl-4 font-heading text-xl font-semibold text-bleu-academique">
              Invalidation du modèle hégélien
            </h3>
          </header>
          <Prose>
            <p>
              Le sens commun moderne, pollué par la dialectique hégélienne (Thèse →
              Antithèse → Synthèse), croit que la « thèse » est le point de départ
              d'un raisonnement. L'étude étymologique et historique rétablit la
              vérité scientifique :
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong>La Thèse (thésis)</strong> n'est pas le commencement. C'est
                l'action de poser, de soutenir et d'établir. C'est le terme moyen
                d'un processus.
              </li>
              <li>
                <strong>Ce qui précède la thèse, c'est l'Hypothèse (hyppo, « en
                deçà »).</strong>{" "}
                L'hypothèse est l'interprétation mentale anticipée (Claude
                Bernard).
              </li>
            </ul>
            <p>
              <strong>La séquence réelle de la découverte :</strong>{" "}
              Intuition/Paradoxe → Hypothèse → Thésis (démonstration) → Expérantia
              (vérification)
            </p>
            <p>
              En confondant la thèse (le résultat soutenu) avec le point de départ,
              la science moderne s'est interdite de penser les conditions de
              possibilité des phénomènes. Elle s'est condamnée à décrire les effets
              sans comprendre les causes.
            </p>
          </Prose>
        </Container>
      </Section>

      {/* Section 6 — Le sextuor de la structuration intime */}
      <Section tone="gris">
        <Container>
          <header className="mb-8">
            <TitreSection>
              Le sextuor de la structuration intime
            </TitreSection>
          </header>
          <Prose>
            <p>
              Les trajectoires des grands découvreurs ne sont pas invoquées ici
              comme des preuves d'autorité, mais comme des cas d'étude cliniques
              modélisés par l'Équation Cyclique Universelle{" "}
              <span className="font-mono text-or">Σ = M(F(V(Σ)))</span> et le Canon
              de la Découverte en 7 principes.
            </p>
          </Prose>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {SEXTUOR.map((cas) => (
              <Carte key={cas.id}>
                <h3 className="font-heading text-lg font-semibold">
                  {cas.titre}
                </h3>
                <p className="mt-3 font-sans leading-relaxed">{cas.texte}</p>
              </Carte>
            ))}
          </div>
        </Container>
      </Section>

      {/* Appel à l'épreuve */}
      <Section tone="profond" className="text-center">
        <Container className="max-w-2xl">
          <Prose className="text-blanc-casse">
            <p>
              La Science Métamoderne ne demande aucune adhésion préalable. Elle
              n'invite pas à une croyance. Elle propose une méthode. Elle ne prétend
              pas clore la recherche. Elle ouvre un espace où la recherche peut se
              poursuivre selon des règles explicites, discutables et continuellement
              perfectibles.
            </p>
          </Prose>
          <p className="mt-8 font-heading text-lg italic text-blanc-casse">
            Ce travail ne demande pas à être accepté sur autorité. Il demande à
            être éprouvé.
          </p>
          <div className="mt-10">
            <Link
              href="/ouvrage"
              className={cn(buttonVariants({ variant: "or", size: "cta" }))}
            >
              Découvrir l'Ouvrage
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

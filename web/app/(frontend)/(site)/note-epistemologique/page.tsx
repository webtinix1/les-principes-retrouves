import Link from "next/link";
import { BlocProse } from "@/components/bloc";
import { BlocSection, Cloture, Exergue, OuverturePage } from "@/components/editorial";
import { FriseCanon } from "@/components/pages/savoir-note-frise";
import { Carte, Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { getListe, getTextes } from "@/lib/contenu";

export async function generateMetadata() {
  const t = await getTextes("note_epistemologique");
  return pageMetadata({
    title: t["seo.titre"],
    description: t["seo.description"],
    path: "/note-epistemologique",
  });
}

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

/** Ancres des sept principes du Canon (#principe-i … #principe-vii). */
const ROMAINS = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

/**
 * Textes des cartes « principes suprêmes » rendus via BlocProse : les classes
 * d'origine des paragraphes sont reportées sur `[&_p]` pour que le texte du
 * back-office garde la même typographie (et neutraliser la prose par défaut).
 */
const CARTE_TEXTE =
  "max-w-none [&_p]:font-ui [&_p]:text-[15.5px] [&_p]:leading-[1.6] [&_p]:text-encre-2 [&_p]:text-wrap";
const CARTE_MAXIME =
  "max-w-none [&_p]:font-texte [&_p]:text-[1.125rem] [&_p]:leading-[1.55] [&_p]:text-encre [&_p]:italic [&_p]:text-wrap";

/** PAGE 5 — NOTE ÉPISTÉMOLOGIQUE (Restituer les conditions de l'intelligibilité). */
export default async function NoteEpistemologiquePage() {
  const [t, ETAPES_CANON, CANON, SEXTUOR] = await Promise.all([
    getTextes("note_epistemologique"),
    getListe<{ terme: string; role: string }>("note_epistemologique.etapes_canon"),
    getListe<{ titre: string; texte: string }>("note_epistemologique.canon"),
    getListe<{ titre: string; texte: string }>("note_epistemologique.sextuor"),
  ]);

  const SOMMAIRE = [
    { id: "posture", label: t["sommaire.posture"] },
    { id: "axiome", label: t["sommaire.axiome"] },
    { id: "principes", label: t["principes.titre"] },
    { id: "canon", label: t["sommaire.canon"] },
    { id: "triade", label: t["triade.titre"] },
    { id: "sextuor", label: t["sextuor.titre"] },
  ];

  return (
    <>
      <OuverturePage
        page_id="note_epistemologique"
        titre={t["hero.titre"]}
        sousTitre={t["hero.sous_titre"]}
        sommaire={SOMMAIRE}
      >
        <Exergue>{t["hero.exergue"]}</Exergue>
      </OuverturePage>

      {/* Section 1 — Posture métascientifique */}
      <BlocSection
        id="posture"
        bordure={false}
        titre={t["posture.titre"]}
      >
          <BlocProse cle="note_epistemologique.posture.corps">
            <p>
              L’École de Brazzaville n’a pas pour vocation de se substituer, de
              juger ou de valider les disciplines scientifiques constituées. Elle
              reconnaît pleinement leur autonomie, leurs méthodes propres et
              l’exactitude de leurs résultats. Son objet est d’un autre ordre :
              elle se déploie comme une science qui cherche à{" "}
              <strong>rendre intelligible l’intelligibilité des sciences</strong>.
            </p>
            <p>
              L’esprit humain, lorsqu’il est livré à son propre sort, abandonné à
              son propre dénuement et laissé à sa propre merci, subit le chaos des
              faits bruts et s’enferme dans des tautologies restrictives. Contre
              cette entropie cognitive, la Science Métamoderne propose une
              hypothèse structurale générale : les grandes découvertes de
              l’histoire humaine, par-delà la diversité de leurs objets
              particuliers, partagent des invariants structurels profonds dans
              leur mécanisme de production de la connaissance.
            </p>
            <p>
              Cette Note Épistémologique a pour objet de formaliser ces invariants
              et de les soumettre à l’épreuve de l’examen critique. Elle ne décrit
              pas la science depuis l’extérieur ; elle en restitue l’architecture,
              en formalise les médiations et en guide la remontée.
            </p>
          </BlocProse>
      </BlocSection>

      {/* Section 2 — Axiome central */}
      <BlocSection
        id="axiome"
        titre={t["axiome.titre"]}
      >
          <BlocProse cle="note_epistemologique.axiome.corps">
            <p>
              L’École de Brazzaville affirme un principe fondateur que l’illusion
              empiriste moderne a progressivement occulté :{" "}
              <strong>
                l’accumulation brute de faits issus du hasard de l’instrumentation
                technique ne produit jamais de sens
              </strong>
              .
            </p>
            <p>
              L’expérience n’engendre pas le concept ; elle se contente d’en
              valider ou d’en falsifier la portée. Le Monde Observable (S) reçoit
              sa signification de l’Architecture Préalable d’Intelligibilité
              forgée par l’activité rationnelle de l’esprit. Sans prémisse majeure
              conçue a priori, la recherche scientifique s’abîme dans une pure
              description phénoménale privée de profondeur ontologique.
            </p>
          </BlocProse>
          {/* L'encadré fort de la page : l'axiome central. */}
          <Encadre className="rv my-10 md:my-12">
            <p className="font-titre text-[1.375rem] leading-[1.4] text-or-500 italic md:text-[1.75rem]">
              {t["axiome.encadre"]}
            </p>
          </Encadre>
          <BlocProse cle="note_epistemologique.axiome.thom">
            <p>
              Comme le soulignait René Thom, le progrès scientifique est avant
              tout une affaire de représentation mentale partielle des phénomènes,
              et non de simple manipulation technique. Comme le démontrait Pierre
              Delattre, le « secret » des expériences cruciales ne réside pas
              ailleurs que dans le choix judicieux des paramètres significatifs,
              dicté par l’architecture conceptuelle préalable. Comme l’observait
              Claude Bernard, la découverte scientifique procède d’une{" "}
              <strong>rationnelle interprétation mentale</strong> qui précède et
              gouverne l’expérience ; quand nous croyons induire, nous déduisons
              réellement ; seulement l’expérimentateur se dirige d’après un
              principe supposé ou provisoire.
            </p>
            <p>
              Ces trois autorités de convergence verrouillent définitivement la
              primauté de l’intelligibilité sur l’opératoire.
            </p>
          </BlocProse>
      </BlocSection>

      {/* Section 3 — Les deux principes suprêmes d'organisation */}
      <BlocSection id="principes" titre={t["principes.titre"]}>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <Carte className="rv flex flex-col">
              <h3 className="font-titre text-[1.375rem] leading-[1.3] font-medium text-encre">
                {t["principes.unite_titre"]}
              </h3>
              <p className="mt-3 font-texte text-[1.125rem] leading-[1.55] text-encre italic">
                {t["principes.unite_maxime"]}
              </p>
              <BlocProse cle="note_epistemologique.principes.unite_corps" className={cn("mt-4", CARTE_TEXTE)}>
              <p className="font-ui text-[15.5px] leading-[1.6] text-encre-2">
                Le fragment isolé n’a pas de sens intelligible hors de sa relation
                avec la totalité (<span className="font-code text-or-700">Σ</span>).
                Cette loi traverse la physique, la biologie, le droit et les
                sciences sociales. L’isomorphisme des découvertes à travers les
                disciplines n’est pas un hasard ; il est le signe que l’Unité
                Structurelle Absolue (<span className="font-code text-or-700">Σ</span>)
                préexiste à la fragmentation du Voile et du Filtrage.
              </p>
              </BlocProse>
            </Carte>
            <Carte className="rv rv2 flex flex-col">
              <h3 className="font-titre text-[1.375rem] leading-[1.3] font-medium text-encre">
                {t["principes.polarite_titre"]}
              </h3>
              <BlocProse cle="note_epistemologique.principes.polarite_maxime" className={cn("mt-3", CARTE_MAXIME)}>
              <p className="font-texte text-[1.125rem] leading-[1.55] text-encre italic">
                « Toute réalité intelligible comporte deux pôles corrélatifs et
                oscillants (<span className="font-code not-italic text-or-700">π₁ ↔ π₂</span>). »
              </p>
              </BlocProse>
              <BlocProse cle="note_epistemologique.principes.polarite_corps" className={cn("mt-4", CARTE_TEXTE)}>
              <p className="font-ui text-[15.5px] leading-[1.6] text-encre-2">
                L’analyse procède par distinction (
                <span className="font-code text-or-700">π₁</span>) et la synthèse opère
                par relation (<span className="font-code text-or-700">π₂</span>). Ces
                deux polarités ne s’opposent pas ; elles sont les deux battements
                d’un même cœur rationnel. L’erreur fondamentale des cadres de
                pensée classiques est de croire que la relation naît de la
                rencontre d’éléments préexistants. Le paradigme métamoderne affirme
                l’inverse : l’unité produit la relation, et la relation définit les
                termes.
              </p>
              </BlocProse>
            </Carte>
          </div>
      </BlocSection>

      {/* Section 4 — Le Théorème de la Genèse Scientifique : le Canon en 7 principes */}
      <section id="canon" className="surface-claire bg-papier px-5 pb-14 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 border-t border-filet pt-14 md:gap-16 md:pt-24">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
            <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:col-span-3 lg:text-[1.875rem]">
              {t["canon.titre"]}
            </h2>
          <BlocProse cle="note_epistemologique.theoreme.corps" className="min-w-0 lg:col-span-8 lg:col-start-4">
            <p>
              Toute authentique découverte s’élabore selon un parcours
              inductif-rationnel vertical indéfectible. Ce processus algorithmique
              est modélisé par le Canon de la Découverte en 7 principes :
            </p>
          </BlocProse>
          </div>
          {/* Frise du Canon : horizontale sur ordinateur, verticale sur mobile. */}
          <FriseCanon etapes={ETAPES_CANON} ariaLabel={t["canon.frise_aria"]} />

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
            <ol className="grid gap-x-10 md:grid-cols-2 lg:col-span-8 lg:col-start-4">
              {CANON.map((principe, i) => (
                <li
                  key={i}
                  id={`principe-${ROMAINS[i] ?? i + 1}`}
                  className="rv flex flex-col gap-2 border-t border-filet py-6"
                >
                  <h3 className="font-titre text-[1.1875rem] leading-[1.3] font-medium text-encre">
                    {principe.titre}
                  </h3>
                  <p className="font-texte text-[1.0625rem] leading-[1.65] text-encre-2">
                    {principe.texte}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Section 5 — Rectification de la triade dialectique */}
      <BlocSection id="triade" titre={t["triade.titre"]}>
            <h3 className="mb-6 font-texte text-[1.25rem] leading-[1.4] text-encre-2 italic">
              {t["triade.sous_titre"]}
            </h3>
          <BlocProse cle="note_epistemologique.triade.corps">
            <p>
              Le sens commun moderne, pollué par la dialectique hégélienne (Thèse →
              Antithèse → Synthèse), croit que la « thèse » est le point de départ
              d’un raisonnement. L’étude étymologique et historique rétablit la
              vérité scientifique :
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong>La Thèse (thésis)</strong> n’est pas le commencement. C’est
                l’action de poser, de soutenir et d’établir. C’est le terme moyen
                d’un processus.
              </li>
              <li>
                <strong>Ce qui précède la thèse, c’est l’Hypothèse (hyppo, « en
                deçà »).</strong>{" "}
                L’hypothèse est l’interprétation mentale anticipée (Claude
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
              la science moderne s’est interdite de penser les conditions de
              possibilité des phénomènes. Elle s’est condamnée à décrire les effets
              sans comprendre les causes.
            </p>
          </BlocProse>
      </BlocSection>

      {/* Section 6 — Le sextuor de la structuration intime */}
      <section id="sextuor" className="surface-claire bg-papier-2 px-5 py-14 md:py-24 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 md:gap-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
            <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:col-span-3 lg:text-[1.875rem]">
              {t["sextuor.titre"]}
            </h2>
          <BlocProse cle="note_epistemologique.sextuor.corps" className="min-w-0 lg:col-span-8 lg:col-start-4">
            <p>
              Les trajectoires des grands découvreurs ne sont pas invoquées ici
              comme des preuves d’autorité, mais comme des cas d’étude cliniques
              modélisés par l’Équation Cyclique Universelle{" "}
              <span className="font-code whitespace-nowrap text-or-700 [font-variant-ligatures:none]">Σ = M(F(V(Σ)))</span> et le Canon
              de la Découverte en 7 principes.
            </p>
          </BlocProse>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {SEXTUOR.map((cas, i) => (
              <Carte key={i} className={cn("rv flex flex-col", i % 3 === 1 && "rv2", i % 3 === 2 && "rv3")}>
                <h3 className="font-titre text-[1.25rem] leading-[1.3] font-medium text-encre">
                  {cas.titre}
                </h3>
                <p className="mt-3 font-texte text-[1rem] leading-[1.65] text-encre-2">{cas.texte}</p>
              </Carte>
            ))}
          </div>
        </div>
      </section>

      {/* Appel à l'épreuve */}
      <section className="surface-claire bg-papier px-5 pt-14 md:pt-24 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[760px] justify-center">
          <BlocProse cle="note_epistemologique.pacte.corps" className="text-center text-encre-2">
            <p>
              La Science Métamoderne ne demande aucune adhésion préalable. Elle
              n’invite pas à une croyance. Elle propose une méthode. Elle ne prétend
              pas clore la recherche. Elle ouvre un espace où la recherche peut se
              poursuivre selon des règles explicites, discutables et continuellement
              perfectibles.
            </p>
          </BlocProse>
        </div>
      </section>

      <Cloture
        suite={
          <Link
            href="/ouvrage"
            className={cn(buttonVariants({ variant: "or-plein", size: "cta" }), "mt-2")}
          >
            {t["cloture.bouton"]}
          </Link>
        }
      >
        {t["cloture.texte"]}
      </Cloture>
    </>
  );
}

import { getStrates } from "@/lib/cms";
import { CarteConcept } from "@/components/carte-concept";
import { Section, Container, TitreSection } from "@/components/section";
import { BlocProse } from "@/components/bloc";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Concepts Stabilisés",
  description:
    "L'Infrastructure Lexicale de l'École de Brazzaville : 20 concepts stabilisés en quatre strates (ontologie, épistémologie, méthodologie, arsenal opératoire).",
  path: "/concepts",
});

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

/** PAGE 8 — CONCEPTS STABILISÉS (Infrastructure Lexicale V4.0). */
export default async function ConceptsPage() {
  const STRATES = await getStrates();
  return (
    <>
      {/* Hero */}
      <Section tone="profond" className="text-center">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold tracking-[-0.02em] text-balance text-or sm:text-5xl">
            Infrastructure Lexicale
          </h1>
          <p className="mt-4 font-sans text-lg italic text-blanc-casse/80">
            Les 20 Piliers de la Science Métamoderne — Version 4.0 enrichie
          </p>
          <blockquote className="mt-6 font-heading text-lg italic text-blanc-casse">
            « La précision sémantique est la condition absolue de l’intégrité de
            la structure. »
          </blockquote>
        </Container>
      </Section>

      {/* Introduction */}
      <Section tone="clair">
        <Container>
          <BlocProse cle="concepts.introduction.corps">
            <p>
              Ce vocabulaire ne constitue pas un simple glossaire. Il est le
              système d’exploitation de la Science Métamoderne. Ces vingt
              concepts, classés par strates logiques, définissent les conditions
              de possibilité de l’intelligibilité et les règles de l’action
              normative.
            </p>
            <p>
              Chaque entrée est verrouillée contre toute dérive disciplinaire,
              toute spéculation gratuite et toute confusion avec les courants
              métamodernes culturels contemporains. Le visiteur dispose ici du
              dictionnaire d’autorité de l’École de Brazzaville : chaque
              définition est opposable et immunisée contre l’arbitraire.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* Les 4 strates */}
      {STRATES.map((strate, index) => (
        <Section key={strate.id} tone={index % 2 === 0 ? "gris" : "clair"}>
          <Container>
            <header className="mb-8">
              <TitreSection>{strate.titre}</TitreSection>
              <p className="mt-2 pl-4 font-sans text-lg italic text-bleu-nuit-profond/70">
                {strate.sous_titre}
              </p>
            </header>
            <div className="grid gap-6 lg:grid-cols-2">
              {strate.concepts.map((concept) => (
                <CarteConcept key={concept.id} concept={concept} />
              ))}
            </div>
          </Container>
        </Section>
      ))}

      {/* Appel à l'épreuve */}
      <Section tone="nuit" className="text-center">
        <Container className="max-w-2xl">
          <p className="font-heading text-lg italic text-blanc-casse">
            « Ces concepts ne demandent pas à être acceptés sur autorité. Ils
            demandent à être éprouvés dans la rigueur de leur application. »
          </p>
        </Container>
      </Section>
    </>
  );
}

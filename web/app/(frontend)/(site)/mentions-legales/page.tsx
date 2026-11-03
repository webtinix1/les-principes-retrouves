import { Section, Container } from "@/components/section";
import { BlocProse } from "@/components/bloc";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du portail de l'École de Brazzaville : éditeur, hébergement, propriété intellectuelle.",
  path: "/mentions-legales",
});

/** Texte éditable depuis le back-office (Pages) — cf. les pages doctrinales. */
export const revalidate = 3600;

export default function MentionsLegales() {
  return (
    <>
      <Section tone="profond" className="text-center">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-or sm:text-5xl">
            Mentions légales
          </h1>
        </Container>
      </Section>

      <Section tone="clair">
        <Container>
          <div className="mx-auto mb-8 max-w-[68ch] border-l-4 border-or bg-gris-clair p-4 font-ui text-sm text-bleu-nuit-profond/80">
            Document en cours de finalisation. Les éléments entre crochets{" "}
            <span className="font-mono">[…]</span> doivent être complétés et
            validés par le responsable de la publication et un conseil juridique.
          </div>
          <BlocProse cle="mentions_legales.texte.corps" className="max-w-[68ch]">
            <h2 className="mt-0 font-heading text-xl font-semibold">Éditeur du site</h2>
            <p>
              Le présent site est édité par <strong>Gaudéric MAMBOU</strong>,
              chercheur indépendant, au titre de l&apos;Institut de Brazzaville
              (École de Brazzaville — Science Métamoderne).
            </p>
            <p>
              Forme juridique : <span className="font-mono">[à préciser]</span>.
              Immatriculation (RCCM / registre) :{" "}
              <span className="font-mono">[à préciser]</span>. Adresse :{" "}
              <span className="font-mono">[adresse]</span>, Brazzaville,
              République du Congo. Contact :{" "}
              <a
                href="mailto:contact@lesprincipesretrouves.cg"
                className="font-mono text-or underline-offset-4 hover:underline"
              >
                contact@lesprincipesretrouves.cg
              </a>
              .
            </p>

            <h2 className="font-heading text-xl font-semibold">Directeur de la publication</h2>
            <p>Gaudéric MAMBOU.</p>

            <h2 className="font-heading text-xl font-semibold">Hébergement</h2>
            <p>
              Le site est hébergé sur une infrastructure serveur dédiée opérée
              par <strong>Webtinix</strong> —{" "}
              <span className="font-mono">[raison sociale, adresse et contact de l&apos;hébergeur]</span>
              .
            </p>

            <h2 className="font-heading text-xl font-semibold">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus doctrinaux, textes, concepts,
              formulations, logo et éléments graphiques du site sont protégés au
              titre du droit de la propriété intellectuelle. © 2026 Gaudéric
              MAMBOU. Toute reproduction ou représentation, totale ou partielle,
              sans autorisation écrite préalable, est interdite. Les citations
              académiques restent autorisées dans le respect des normes
              universitaires en vigueur.
            </p>

            <h2 className="font-heading text-xl font-semibold">Données personnelles</h2>
            <p>
              Le traitement des données personnelles est décrit dans la{" "}
              <a href="/confidentialite" className="text-or underline-offset-4 hover:underline">
                politique de confidentialité
              </a>
              .
            </p>

            <h2 className="font-heading text-xl font-semibold">Conditions de vente</h2>
            <p>
              La vente des modules de formation est régie par les{" "}
              <a href="/cgv" className="text-or underline-offset-4 hover:underline">
                conditions générales de vente
              </a>
              .
            </p>
          </BlocProse>
        </Container>
      </Section>
    </>
  );
}

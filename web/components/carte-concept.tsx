import type { Concept } from "@/content/concepts";
import { BlocTexte } from "@/components/bloc";

/** Carte d'un concept stabilisé : numéro, titre, définition d'autorité, portée opératoire. */
export function CarteConcept({ concept }: { concept: Concept }) {
  return (
    <article
      id={concept.id}
      className="scroll-mt-24 border-l-4 border-or bg-blanc-casse p-6 text-bleu-nuit-profond"
    >
      <header className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-or" aria-hidden="true">
          {String(concept.numero).padStart(2, "0")}
        </span>
        <h3 className="font-heading text-xl font-semibold">{concept.titre}</h3>
      </header>
      <dl className="mt-4 space-y-3 text-sm leading-relaxed">
        <div>
          <dt className="font-ui text-xs font-semibold uppercase tracking-wide text-or/90">
            Définition d'autorité
          </dt>
          <BlocTexte
            as="dd"
            cle={`concepts.${concept.id}.definition`}
            className="mt-1 font-sans"
          >
            {concept.definition}
          </BlocTexte>
        </div>
        <div>
          <dt className="font-ui text-xs font-semibold uppercase tracking-wide text-or/90">
            Portée opératoire
          </dt>
          <BlocTexte
            as="dd"
            cle={`concepts.${concept.id}.portee`}
            className="mt-1 font-sans"
          >
            {concept.portee}
          </BlocTexte>
        </div>
      </dl>
    </article>
  );
}

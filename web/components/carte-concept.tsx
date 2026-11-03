import type { Concept } from "@/content/concepts";

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
          <dd className="mt-1 font-sans">{concept.definition}</dd>
        </div>
        <div>
          <dt className="font-ui text-xs font-semibold uppercase tracking-wide text-or/90">
            Portée opératoire
          </dt>
          <dd className="mt-1 font-sans">{concept.portee}</dd>
        </div>
      </dl>
    </article>
  );
}

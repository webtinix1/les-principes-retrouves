import type { Concept } from "@/content/concepts";
import { getTexte } from "@/lib/contenu";

/** Carte d'un concept stabilisé : numéro, titre, définition d'autorité, portée opératoire. */
export async function CarteConcept({ concept }: { concept: Concept }) {
  const definition = await getTexte("site_interface.concept.definition");
  const portee = await getTexte("site_interface.concept.portee");
  return (
    <article
      id={concept.id}
      className="surface-claire rv flex flex-col gap-5 rounded-[4px] border border-filet bg-blanc p-6 text-encre md:p-8 lg:scroll-mt-28!"
    >
      <header className="grid grid-cols-[32px_minmax(0,1fr)] items-baseline gap-x-3">
        <span className="font-code text-[13px] text-or-700" aria-hidden="true">
          {String(concept.numero).padStart(2, "0")}
        </span>
        <h3 className="font-titre text-[1.375rem] leading-[1.25] font-medium text-encre md:text-[1.5rem]">
          {concept.titre}
        </h3>
      </header>
      <dl className="flex flex-col gap-5 border-t border-filet-doux pt-5">
        <div className="flex flex-col gap-1.5">
          <dt className="font-code text-[11.5px] tracking-[0.14em] text-encre-3 uppercase">
            {definition}
          </dt>
          <dd className="font-texte text-[16.5px] leading-[1.65] text-encre">{concept.definition}</dd>
        </div>
        <div className="flex flex-col gap-1.5">
          <dt className="font-code text-[11.5px] tracking-[0.14em] text-encre-3 uppercase">
            {portee}
          </dt>
          <dd className="font-texte text-[16.5px] leading-[1.65] text-encre-2">{concept.portee}</dd>
        </div>
      </dl>
    </article>
  );
}

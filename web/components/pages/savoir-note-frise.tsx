import { cn } from "@/lib/utils";

/**
 * Frise du Canon de la Découverte (Note épistémologique) : sept étapes
 * numérotées posées sur un filet. Horizontale sur ordinateur (lg), verticale
 * sur mobile. La dernière étape (la connaissance) est le seul nœud plein.
 */
export function FriseCanon({
  etapes,
  ariaLabel = "Les sept étapes du Canon de la Découverte",
}: {
  etapes: { terme: string; role: string }[];
  /** Libellé d'accessibilité de la frise (éditable : note_epistemologique.canon.frise_aria). */
  ariaLabel?: string;
}) {
  return (
    <ol
      aria-label={ariaLabel}
      className="relative grid lg:grid-cols-7 lg:gap-x-4"
    >
      {/* Filet horizontal reliant les nœuds (ordinateur) */}
      <span
        aria-hidden="true"
        className="rv-draw absolute top-[22px] right-[calc(100%/14)] left-[calc(100%/14)] hidden h-px bg-filet-fort lg:block"
      />
      {etapes.map((etape, i) => {
        const derniere = i === etapes.length - 1;
        return (
          <li
            key={etape.terme}
            className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 lg:flex lg:flex-col lg:items-center lg:gap-4 lg:text-center"
          >
            {/* Filet vertical vers l'étape suivante (mobile) */}
            {!derniere && (
              <span
                aria-hidden="true"
                className="absolute top-11 bottom-0 left-[22px] w-px -translate-x-1/2 bg-filet-fort lg:hidden"
              />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 grid size-11 place-items-center rounded-full border font-code text-[13px]",
                derniere
                  ? "border-or-700 bg-or-500 font-medium text-nuit-950"
                  : "border-or-700 bg-papier text-or-700",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={cn("rv flex flex-col gap-1 pt-2 lg:pt-0", !derniere && "pb-7 lg:pb-0")}>
              <p className="font-titre text-[1.1875rem] leading-[1.25] font-medium text-encre lg:text-[1.0625rem] xl:text-[1.1875rem]">
                {etape.terme}
              </p>
              <p className="font-ui text-[14.5px] leading-[1.5] text-encre-2 lg:text-[13.5px]">
                {etape.role}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

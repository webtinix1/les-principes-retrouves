import { cn } from "@/lib/utils";

/**
 * Carte — bloc de contenu à bordure gauche Or Maât (4px), fond Gris Clair.
 * Motif récurrent du document (cartes concepts, autorités, modules, articles).
 */
export function Carte({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border-l-4 border-or bg-gris-clair p-6 text-bleu-nuit-profond",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Encadré — cadre à bordure Or Maât (2px) sur fond Bleu Nuit, réservé aux
 * formulations canoniques (Axiome de Non-Perte, maximes, articles scellés).
 */
export function Encadre({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border-2 border-or bg-bleu-nuit p-8 text-blanc-casse",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

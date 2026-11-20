import { cn } from "@/lib/utils";

/**
 * Carte — fond blanc, filet 1 px, rayon 4 px, sans ombre ni barre latérale.
 */
export function Carte({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "surface-claire rounded-[4px] border border-filet bg-blanc p-6 text-encre md:p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Encadré fort — fond nuit, titre or. Un seul par page : l'axiome ou la
 * maxime de la page. Pas de bordure dorée.
 */
export function Encadre({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "surface-sombre rounded-[4px] bg-nuit-950 px-6 py-8 text-nuit-100 md:px-12 md:py-11",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Étiquette — Fira Code 12 px, capitales espacées 0,14 em. Or 700 sur clair,
 * Or Maât sur nuit (règle `.surface-claire .text-or` de globals.css).
 */
export function Etiquette({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-code text-xs font-normal uppercase tracking-[0.14em] text-or",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/**
 * Avis — encadré d'information sur fond clair (mentions, confirmations).
 * Fond papier 2 et filets, sans or.
 */
export function Avis({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "surface-claire rounded-[4px] border border-filet bg-papier-2 p-6 text-encre",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";

/**
 * Carte — bloc de contenu (concepts, autorités, modules, articles).
 * Règles des design systems : surface blanche, filet 1px, rayon 12px, sans
 * ombre ni barre d'accent latérale. Le rang « Or » se porte par l'étiquette.
 */
export function Carte({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "surface-claire rounded-xl border border-bleu-nuit-profond/10 bg-blanc p-6 text-bleu-nuit-profond",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Encadré — cadre Or Maât (2px) sur fond Bleu Nuit, réservé aux formulations
 * canoniques (Axiome de Non-Perte, maximes, articles scellés).
 */
export function Encadre({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "surface-sombre rounded-xl border-2 border-or bg-bleu-nuit p-8 text-blanc-casse",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Étiquette — surtitre en capitales espacées (police mono), coins carrés.
 * Remplace les surtitres ad hoc (« Tome I », « Module II », numéros).
 */
export function Etiquette({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-medium uppercase tracking-[0.14em] text-or",
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
 * Filet complet plutôt qu'une barre latérale.
 */
export function Avis({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "surface-claire rounded-xl border border-or/50 bg-gris-clair p-6 text-bleu-nuit-profond",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

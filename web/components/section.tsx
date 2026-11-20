import { cn } from "@/lib/utils";

/**
 * Section — bloc pleine largeur. Design system de la refonte : la nuit pour
 * les seuils, le papier pour la lecture.
 */
type Tone =
  | "clair" // Papier — fond de lecture par défaut
  | "gris" // Papier 2 — zones secondaires
  | "nuit" // Nuit — seuils, ouvertures (à réserver)
  | "academique" // (ancien ton) rendu comme la nuit
  | "profond"; // Nuit profonde — seuils

// `surface-claire` / `surface-sombre` : règle de contraste de l'Or (globals.css).
const TONES: Record<Tone, string> = {
  clair: "surface-claire bg-papier text-encre",
  gris: "surface-claire bg-papier-2 text-encre",
  nuit: "surface-sombre bg-nuit-950 text-nuit-100",
  academique: "surface-sombre bg-nuit-950 text-nuit-100",
  profond: "surface-sombre bg-nuit-950 text-nuit-100",
};

export function Section({
  tone = "clair",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { tone?: Tone }) {
  return (
    <section
      className={cn("px-5 py-14 md:py-24 lg:px-6 xl:px-10", TONES[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}

/** Conteneur centré (grille de 1 200 px dans les marges du site). */
export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px]", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Colonne de lecture — mesure 680 px (66 à 72 caractères), Lora 19/1,75
 * (18/1,7 sur mobile). Extraite en constante pour que les blocs éditables
 * (`components/bloc.tsx`) rendent exactement la même typographie.
 */
export const PROSE_CLASS =
  "max-w-[680px] font-texte text-[1.125rem] leading-[1.7] md:text-[1.1875rem] md:leading-[1.75] [&_p]:mt-[1.1em] [&_p:first-child]:mt-0 [&_p]:text-pretty [&_strong]:font-semibold";

/** Prose — colonne de lecture. */
export function Prose({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn(PROSE_CLASS, className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Titre de section (H2) — Playfair 500, 28 px sur mobile, 34 px sur
 * ordinateur. L'or est rare : le filet n'est posé que sur demande.
 */
export function TitreSection({
  className,
  children,
  filet = false,
  ...props
}: React.ComponentProps<"h2"> & { filet?: boolean }) {
  return (
    <h2
      className={cn(
        "font-titre text-[1.75rem] leading-[1.18] font-medium text-balance md:text-[2.125rem]",
        filet &&
          "before:mb-5 before:block before:h-0.5 before:w-20 before:bg-or-500 before:content-['']",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

import { cn } from "@/lib/utils";

/**
 * Section — bloc pleine largeur avec ton de fond (palette du document).
 * Gère automatiquement la couleur de texte lisible sur le fond choisi.
 */
type Tone =
  | "clair" // Blanc Cassé — fond éditorial par défaut
  | "gris" // Gris Clair — sections alternées
  | "nuit" // Bleu Nuit — sections secondaires / encadrés
  | "academique" // Bleu Académique — sections principales
  | "profond"; // Bleu Nuit profond — sections solennelles

const TONES: Record<Tone, string> = {
  clair: "bg-blanc-casse text-bleu-nuit-profond",
  gris: "bg-gris-clair text-bleu-nuit-profond",
  nuit: "bg-bleu-nuit text-blanc-casse",
  academique: "bg-bleu-academique text-blanc",
  profond: "bg-bleu-nuit-profond text-blanc-casse",
};

export function Section({
  tone = "clair",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { tone?: Tone }) {
  return (
    <section className={cn("px-6 py-16 sm:py-20", TONES[tone], className)} {...props}>
      {children}
    </section>
  );
}

/** Conteneur centré à largeur maîtrisée. */
export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Colonne de lecture « revue » — extraite en constante pour que les blocs
 * éditables (`components/bloc.tsx`) rendent exactement la même typographie.
 * Alignée à gauche avec le même retrait que les titres (filet Or).
 */
export const PROSE_CLASS =
  "max-w-[72ch] pl-4 font-sans text-base leading-relaxed [&_p]:mt-4 [&_p:first-child]:mt-0 [&_strong]:font-semibold";

/**
 * Prose — colonne de lecture « revue » : mesure limitée (~68 car.),
 * interlignage généreux, rythme vertical des paragraphes (corps Lora).
 */
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

/** Titre de section (H2) — Playfair, avec filet Or optionnel à gauche. */
export function TitreSection({
  className,
  children,
  filet = true,
  ...props
}: React.ComponentProps<"h2"> & { filet?: boolean }) {
  return (
    <h2
      className={cn(
        "font-heading text-2xl font-semibold sm:text-3xl",
        filet && "border-l-4 border-or pl-4",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

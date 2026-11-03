import { cn } from "@/lib/utils";
import { PROSE_CLASS } from "@/components/section";
import { getSurcharge } from "@/lib/contenu";

/**
 * Blocs de contenu éditables depuis le back-office Payload (/admin → Pages).
 *
 * Le JSX passé en `children` EST le texte d'origine : tant que le back-office
 * porte ce même texte (ou rien), il est rendu tel quel — aucune régression
 * possible sur les pages non éditées. Un texte modifié dans Payload le
 * remplace, en conservant la même typographie.
 *
 * L'attribut `data-bloc` rend le bloc repérable dans le HTML rendu : c'est par
 * lui que `scripts/extraire-contenu.ts` relit le texte d'origine.
 */

/**
 * Mise en forme du HTML produit par l'éditeur riche. Nécessaire uniquement sur
 * ce chemin : le JSX par défaut porte déjà ses propres classes (listes, titres
 * et citations sont stylés au cas par cas dans les pages).
 */
const HTML_RICHE_CLASS = cn(
  "[&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold",
  "[&_h4]:mt-6 [&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-semibold",
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
  "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
  "[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-or [&_blockquote]:pl-4 [&_blockquote]:font-heading [&_blockquote]:italic",
  "[&_a]:text-or [&_a]:underline [&_a]:underline-offset-2",
  "[&_em]:italic",
);

type BlocProseProps = {
  /** Clé du registre (`content/blocs/`). Doit y être déclarée. */
  cle: string;
  className?: string;
  /** Texte par défaut, en JSX — rendu tel quel tant qu'aucune surcharge n'existe. */
  children: React.ReactNode;
};

/** Bloc de prose multi-paragraphes, dans la colonne de lecture standard. */
export async function BlocProse({ cle, className, children }: BlocProseProps) {
  const surcharge = await getSurcharge(cle);

  if (surcharge?.type === "html") {
    return (
      <div
        data-bloc={cle}
        className={cn(PROSE_CLASS, HTML_RICHE_CLASS, className)}
        dangerouslySetInnerHTML={{ __html: surcharge.html }}
      />
    );
  }

  return (
    <div data-bloc={cle} className={cn(PROSE_CLASS, className)}>
      {children}
    </div>
  );
}

type BlocTexteProps = {
  cle: string;
  /** Balise de rendu — le bloc doit rester au même niveau sémantique que l'original. */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "blockquote" | "dd" | "li";
  className?: string;
  /** Texte par défaut (une seule ligne, sans mise en forme). */
  children: React.ReactNode;
};

/**
 * Bloc de texte court (titre, exergue, chapeau d'une ligne). Le texte du
 * back-office est brut : React l'échappe, aucun HTML n'est interprété.
 */
export async function BlocTexte({
  cle,
  as: Balise = "p",
  className,
  children,
}: BlocTexteProps) {
  const surcharge = await getSurcharge(cle);

  return (
    <Balise data-bloc={cle} className={className}>
      {surcharge?.type === "texte" ? surcharge.texte : children}
    </Balise>
  );
}

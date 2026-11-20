import { cn } from "@/lib/utils";
import { PROSE_CLASS } from "@/components/section";
import { isValidElement } from "react";
import { getSurcharge } from "@/lib/contenu";
import { ancrerTitres, ancreTitre, libelleTitre } from "@/lib/contenu/sanitize";

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
  // Intertitres des pages légales (mêmes classes que leur JSX d'origine).
  "[&_h2]:mt-10 [&_h2]:font-titre [&_h2]:text-2xl [&_h2]:font-medium",
  "[&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-medium",
  "[&_h4]:mt-6 [&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-medium",
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
  "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
  "[&_blockquote]:my-6 [&_blockquote]:pl-6 [&_blockquote]:text-encre-2",
  "[&_a]:text-lien [&_a]:underline [&_a]:underline-offset-[3px]",
  "[&_em]:italic",
);

type BlocProseProps = {
  /** Clé du registre (`content/blocs/`). Doit y être déclarée. */
  cle: string;
  className?: string;
  /**
   * Pose sur les <h2>/<h3> du HTML du back-office un `id` déduit de leur
   * texte (`ancreTitre`) — à activer quand un sommaire pointe vers ces
   * intertitres (pages légales). Le JSX d'origine utilise `<Intertitre>`.
   */
  ancres?: boolean;
  /** Texte par défaut, en JSX — rendu tel quel tant qu'aucune surcharge n'existe. */
  children: React.ReactNode;
};

/** Bloc de prose multi-paragraphes, dans la colonne de lecture standard. */
export async function BlocProse({ cle, className, ancres, children }: BlocProseProps) {
  const surcharge = await getSurcharge(cle);

  if (surcharge?.type === "html") {
    return (
      <div
        data-bloc={cle}
        className={cn(PROSE_CLASS, HTML_RICHE_CLASS, className)}
        dangerouslySetInnerHTML={{ __html: ancres ? ancrerTitres(surcharge.html).html : surcharge.html }}
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

type IntertitreProps = {
  as?: "h2" | "h3";
  className?: string;
  /** Texte de l'intertitre (chaîne seule : l'ancre en est déduite). */
  children: string;
};

/**
 * Intertitre ancré du JSX d'origine : son `id` est déduit du texte par la
 * même fonction que pour le HTML du back-office (`<BlocProse ancres>`), de
 * sorte que le sommaire reste juste quel que soit le texte rendu.
 */
export function Intertitre({ as: Balise = "h2", className, children }: IntertitreProps) {
  return (
    <Balise id={ancreTitre(children)} className={className}>
      {children}
    </Balise>
  );
}

/** Intertitres <h2> (`<Intertitre>`) d'un JSX, dans l'ordre. */
function intertitresJsx(noeud: React.ReactNode, sortie: string[] = []): string[] {
  if (Array.isArray(noeud)) {
    for (const n of noeud) intertitresJsx(n, sortie);
  } else if (isValidElement<{ children?: React.ReactNode; as?: string }>(noeud)) {
    if (noeud.type === Intertitre) {
      if ((noeud.props.as ?? "h2") === "h2" && typeof noeud.props.children === "string") {
        sortie.push(noeud.props.children);
      }
    } else {
      intertitresJsx(noeud.props.children, sortie);
    }
  }
  return sortie;
}

/**
 * Sommaire « Sur cette page » d'un bloc riche à intertitres : les <h2> du
 * texte du back-office s'il a été modifié, sinon les `<Intertitre>` du JSX
 * d'origine. Ancres et libellés sont déduits du texte des intertitres
 * (numérotation de tête retirée du libellé) : ils correspondent toujours.
 */
export async function sommaireDuBloc(
  cle: string,
  contenu: React.ReactNode,
): Promise<{ id: string; label: string }[]> {
  const surcharge = await getSurcharge(cle);
  if (surcharge?.type === "html") {
    return ancrerTitres(surcharge.html)
      .titres.filter((t) => t.niveau === 2)
      .map((t) => ({ id: t.id, label: libelleTitre(t.texte) }));
  }
  const vus = new Map<string, number>();
  return intertitresJsx(contenu).map((texte) => {
    const base = ancreTitre(texte);
    const rang = (vus.get(base) ?? 0) + 1;
    vus.set(base, rang);
    return { id: rang === 1 ? base : `${base}-${rang}`, label: libelleTitre(texte) };
  });
}

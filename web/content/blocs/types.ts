/**
 * Registre des blocs de contenu éditables depuis le back-office (/admin/contenu).
 *
 * PRINCIPE — le code reste la source du texte par défaut. Une page déclare ses
 * blocs en enveloppant son JSX existant :
 *
 *     <BlocProse cle="manifeste.diagnostic">
 *       <p>La science contemporaine…</p>
 *     </BlocProse>
 *
 * Sans surcharge en base, le JSX d'origine est rendu tel quel (aucune
 * duplication du texte, aucune régression possible). Avec surcharge, le HTML
 * assaini du back-office le remplace. « Revenir au texte d'origine » supprime
 * simplement la ligne en base.
 *
 * Ce registre ne porte donc QUE des métadonnées : il sert à lister les blocs
 * dans le back-office, à valider les clés à l'enregistrement et à savoir quelle
 * page revalider. Clés stables "<page>.<section>" (snake_case, CLAUDE.md §4.2).
 */

export type TypeBloc =
  /** Prose multi-paragraphes → éditeur riche (gras, listes, citations, liens). */
  | "riche"
  /** Texte court d'une seule ligne (titre, exergue) → champ simple, sans balise. */
  | "simple";

export type BlocDef = {
  /** Identifiant stable "<page>.<section>". NE JAMAIS renommer : c'est la clé en base. */
  cle: string;
  /** Libellé affiché dans le back-office. */
  label: string;
  type: TypeBloc;
  /** Repère de localisation dans la page ("Section 1 — Le diagnostic"). */
  aide?: string;
};

export type PageBlocs = {
  /** Chemin public — sert aussi de cible à `revalidatePath` après enregistrement. */
  chemin: string;
  /** Titre affiché dans le back-office. */
  titre: string;
  blocs: BlocDef[];
};

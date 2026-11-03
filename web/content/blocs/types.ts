/**
 * Registre des blocs de contenu éditables depuis le back-office Payload
 * (/admin → groupe « Pages » : un global par page, cf. payload/globals/contenu.ts).
 *
 * PRINCIPE — le JSX des pages reste le texte d'origine. Une page déclare ses
 * blocs en enveloppant son JSX existant :
 *
 *     <BlocProse cle="manifeste.diagnostic.corps">
 *       <p>La science contemporaine…</p>
 *     </BlocProse>
 *
 * Tant que le back-office porte ce même texte (`origine.json`) ou rien, le JSX
 * est rendu tel quel (aucune régression possible). Un texte modifié dans
 * Payload le remplace ; vider le champ fait revenir le texte d'origine.
 *
 * Ce registre ne porte QUE des métadonnées : il génère les champs des globals
 * et sait quelle page revalider. Clés stables "<page>.<section>.<partie>"
 * (snake_case, CLAUDE.md §4.2) — après un ajout : `yarn contenu:extraire`,
 * puis `yarn migrate:create`.
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
  /** Identifiant de la page (préfixe des clés, ex. "note_epistemologique"). */
  page: string;
  /** Chemin public — sert aussi de cible à `revalidatePath` après enregistrement. */
  chemin: string;
  /** Titre affiché dans le back-office. */
  titre: string;
  blocs: BlocDef[];
};

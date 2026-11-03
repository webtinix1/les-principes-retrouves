import type { BlocDef, PageBlocs } from "./types";
import { MANIFESTE_BLOCS } from "./manifeste";
import { CONSTITUTION_BLOCS } from "./constitution";
import { DECLARATION_BLOCS } from "./declaration";
import { INSTITUTION_BLOCS } from "./institution";
import { OUVRAGE_BLOCS } from "./ouvrage";
import { NOTE_EPISTEMOLOGIQUE_BLOCS } from "./note_epistemologique";
import { LABORATOIRE_BLOCS } from "./laboratoire";
import { TRANSMISSION_BLOCS } from "./transmission";
import { CONCEPTS_BLOCS } from "./concepts";

export type { BlocDef, PageBlocs, TypeBloc } from "./types";

/**
 * Registre complet des pages éditables, dans l'ordre de lecture du site
 * (ordre cognitif imposé par le document maître).
 * Ajouter une page = créer son fichier de blocs et l'ajouter ici.
 */
export const PAGES_BLOCS: PageBlocs[] = [
  MANIFESTE_BLOCS,
  DECLARATION_BLOCS,
  CONSTITUTION_BLOCS,
  INSTITUTION_BLOCS,
  NOTE_EPISTEMOLOGIQUE_BLOCS,
  CONCEPTS_BLOCS,
  OUVRAGE_BLOCS,
  LABORATOIRE_BLOCS,
  TRANSMISSION_BLOCS,
];

/** Index clé → définition (validation des enregistrements, rendu de l'éditeur). */
export const BLOC_PAR_CLE: Map<string, BlocDef> = new Map(
  PAGES_BLOCS.flatMap((p) => p.blocs.map((b) => [b.cle, b] as const)),
);

/** Index clé → page (global Payload qui porte le bloc). */
export const PAGE_PAR_CLE: Map<string, PageBlocs> = new Map(
  PAGES_BLOCS.flatMap((p) => p.blocs.map((b) => [b.cle, p] as const)),
);

/** Index clé → chemin public de la page (cible de `revalidatePath`). */
export const CHEMIN_PAR_CLE: Map<string, string> = new Map(
  PAGES_BLOCS.flatMap((p) => p.blocs.map((b) => [b.cle, p.chemin] as const)),
);

/** Toutes les pages à revalider (démarrage du conteneur, revalidation globale). */
export const CHEMINS_EDITABLES: string[] = PAGES_BLOCS.map((p) => p.chemin);

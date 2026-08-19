import type { BlocDef, PageBlocs } from "./types";
import { MANIFESTE_BLOCS } from "./manifeste";

export type { BlocDef, PageBlocs, TypeBloc } from "./types";

/**
 * Registre complet des pages éditables, dans l'ordre d'affichage du back-office.
 * Ajouter une page = créer son fichier de blocs et l'ajouter ici.
 */
export const PAGES_BLOCS: PageBlocs[] = [MANIFESTE_BLOCS];

/** Index clé → définition (validation des enregistrements, rendu de l'éditeur). */
export const BLOC_PAR_CLE: Map<string, BlocDef> = new Map(
  PAGES_BLOCS.flatMap((p) => p.blocs.map((b) => [b.cle, b] as const)),
);

/** Index clé → chemin public de la page (cible de `revalidatePath`). */
export const CHEMIN_PAR_CLE: Map<string, string> = new Map(
  PAGES_BLOCS.flatMap((p) => p.blocs.map((b) => [b.cle, p.chemin] as const)),
);

/** Toutes les pages à revalider (démarrage du conteneur, revalidation globale). */
export const CHEMINS_EDITABLES: string[] = PAGES_BLOCS.map((p) => p.chemin);

import type { BlocDef, ListeDef, PageBlocs } from "./types";
import { MANIFESTE_BLOCS } from "./manifeste";
import { CONSTITUTION_BLOCS } from "./constitution";
import { DECLARATION_BLOCS } from "./declaration";
import { INSTITUTION_BLOCS } from "./institution";
import { OUVRAGE_BLOCS } from "./ouvrage";
import { NOTE_EPISTEMOLOGIQUE_BLOCS } from "./note_epistemologique";
import { LABORATOIRE_BLOCS } from "./laboratoire";
import { TRANSMISSION_BLOCS } from "./transmission";
import { CONCEPTS_BLOCS } from "./concepts";
import { UTILISATEURS_BLOCS } from "./utilisateurs";
import { CGV_BLOCS } from "./cgv";
import { MENTIONS_LEGALES_BLOCS } from "./mentions_legales";
import { CONFIDENTIALITE_BLOCS } from "./confidentialite";
import { ACCUEIL_BLOCS } from "./accueil";
import { FRONTON_BLOCS } from "./fronton";
import { SITE_NAVIGATION_BLOCS } from "./site_navigation";
import { SITE_INTERFACE_BLOCS } from "./site_interface";
import { SITE_FORMULAIRES_BLOCS } from "./site_formulaires";
import { SITE_LECTURE_BLOCS } from "./site_lecture";
import { LIBRAIRIE_BLOCS } from "./librairie";

export type { BlocDef, ChampListe, ListeDef, PageBlocs, TypeBloc } from "./types";

/**
 * Registre complet des pages éditables, dans l'ordre de lecture du site
 * (ordre cognitif imposé par le document maître).
 * Ajouter une page = créer son fichier de blocs et l'ajouter ici.
 */
export const PAGES_BLOCS: PageBlocs[] = [
  FRONTON_BLOCS,
  ACCUEIL_BLOCS,
  MANIFESTE_BLOCS,
  DECLARATION_BLOCS,
  CONSTITUTION_BLOCS,
  INSTITUTION_BLOCS,
  NOTE_EPISTEMOLOGIQUE_BLOCS,
  CONCEPTS_BLOCS,
  OUVRAGE_BLOCS,
  LIBRAIRIE_BLOCS,
  LABORATOIRE_BLOCS,
  TRANSMISSION_BLOCS,
  UTILISATEURS_BLOCS,
  // Pages légales
  MENTIONS_LEGALES_BLOCS,
  CONFIDENTIALITE_BLOCS,
  CGV_BLOCS,
  // Textes communs à tout le site
  SITE_NAVIGATION_BLOCS,
  SITE_INTERFACE_BLOCS,
  SITE_FORMULAIRES_BLOCS,
  SITE_LECTURE_BLOCS,
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

/** Index "<page>.<liste>" → { page, liste }. */
export const LISTE_PAR_CLE: Map<string, { page: PageBlocs; liste: ListeDef }> = new Map(
  PAGES_BLOCS.flatMap((p) => (p.listes ?? []).map((l) => [`${p.page}.${l.nom}`, { page: p, liste: l }] as const)),
);

/** Toutes les pages à revalider (démarrage du conteneur, revalidation globale). */
export const CHEMINS_EDITABLES: string[] = [
  ...new Set(PAGES_BLOCS.filter((p) => p.portee !== "site").map((p) => p.chemin)),
];

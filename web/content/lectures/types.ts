/**
 * Textes en lecture libre sur le site (cartes Trello « Modification Tome I »
 * et « Modification Tome II »). Un texte est une suite de blocs typés, rendue
 * par `components/lecture.tsx`.
 */
export type BlocLecture =
  /** Paragraphe de prose. */
  | { t: "p"; x: string }
  /** Intertitre (niveau 3 ou 4) ; `id` sert d'ancre au sommaire. */
  | { t: "h"; x: string; n?: 3 | 4; id?: string }
  /** Formule ou chaîne opératoire (K → M → K′ → Σ), en police mono. */
  | { t: "f"; x: string }
  /** Liste numérotée ou à puces. */
  | { t: "ol" | "ul"; items: string[] }
  /** Citation en exergue, avec sa source. */
  | { t: "cite"; x: string; source: string }
  /** Note ou référence de bas de texte. */
  | { t: "note"; x: string };

export type TexteLecture = {
  slug: string;
  titre: string;
  sous_titre: string | null;
  exergue?: string;
  exergue_source?: string;
  blocs: BlocLecture[];
};

/** Un recueil de lecture : l'ensemble des textes ouverts d'un tome. */
export type Recueil = {
  /** Segment d'URL : /ouvrage/<tome>. */
  tome: "tome-i" | "tome-ii";
  etiquette: string;
  titre: string;
  sous_titre: string;
  presentation: string[];
  /** Groupes de textes, dans l'ordre de lecture demandé par l'auteur. */
  parties: { titre: string; description: string; textes: TexteLecture[] }[];
  /** Plan complet du tome : ce qui est ouvert et ce qui reste réservé à l'ouvrage. */
  plan?: { titre: string; libre?: string }[];
};

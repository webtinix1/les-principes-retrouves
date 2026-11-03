import type { PageBlocs } from "./types";

/** Blocs éditables de la page Les Concepts Stabilisés. */
export const CONCEPTS_BLOCS: PageBlocs = {
  page: "concepts",
  chemin: "/concepts",
  titre: "Les Concepts Stabilisés",
  blocs: [
    {
      cle: "concepts.introduction.corps",
      label: "Introduction au vocabulaire",
      type: "riche",
      aide: "Ouverture",
    },
  ],
};

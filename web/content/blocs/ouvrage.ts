import type { PageBlocs } from "./types";

/** Blocs éditables de la page L'Ouvrage — le diptyque. */
export const OUVRAGE_BLOCS: PageBlocs = {
  page: "ouvrage",
  chemin: "/ouvrage",
  titre: "L'Ouvrage — le diptyque",
  blocs: [
    {
      cle: "ouvrage.introduction.corps",
      label: "Introduction au diptyque",
      type: "riche",
      aide: "Ouverture",
    },
    {
      cle: "ouvrage.textes_liminaires.corps",
      label: "Les textes liminaires",
      type: "riche",
      aide: "Textes liminaires du diptyque",
    },
    {
      cle: "ouvrage.autorites.corps",
      label: "L'ancrage doctrinal — les 12 Autorités",
      type: "riche",
      aide: "Autorités de Convergence",
    },
    {
      cle: "ouvrage.programme.corps",
      label: "Le Programme de recherche — corps de texte",
      type: "riche",
      aide: "Noyau et Expansion",
    },
    {
      cle: "ouvrage.programme.axes",
      label: "Le Programme de recherche — les axes",
      type: "riche",
      aide: "Noyau et Expansion",
    },
  ],
};

import type { PageBlocs } from "./types";

/** Blocs éditables de la page Le Laboratoire Juridique. */
export const LABORATOIRE_BLOCS: PageBlocs = {
  page: "laboratoire",
  chemin: "/laboratoire",
  titre: "Le Laboratoire Juridique",
  blocs: [
    {
      cle: "laboratoire.introduction.corps",
      label: "Introduction du Laboratoire",
      type: "riche",
      aide: "Ouverture",
    },
    {
      cle: "laboratoire.acces_hybride.corps",
      label: "Politique d'accès hybride",
      type: "riche",
      aide: "Accès aux documents",
    },
    {
      cle: "laboratoire.progression.corps",
      label: "La progression logique de l'arsenal",
      type: "riche",
      aide: "Arsenal",
    },
  ],
};

import type { PageBlocs } from "./types";

/** Blocs éditables de la page La Transmission — formations. */
export const TRANSMISSION_BLOCS: PageBlocs = {
  page: "transmission",
  chemin: "/transmission",
  titre: "La Transmission — formations",
  blocs: [
    {
      cle: "transmission.argumentaire.corps",
      label: "L'argumentaire de la souveraineté",
      type: "riche",
      aide: "Ouverture",
    },
    {
      cle: "transmission.modules.corps",
      label: "La grille des modules — chapeau",
      type: "riche",
      aide: "Modules de formation",
    },
    {
      cle: "transmission.paiement.corps",
      label: "Passerelle de paiement — texte",
      type: "riche",
      aide: "Bas de page",
    },
  ],
};

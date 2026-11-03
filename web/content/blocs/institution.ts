import type { PageBlocs } from "./types";

/** Blocs éditables de la page L'École de Brazzaville. */
export const INSTITUTION_BLOCS: PageBlocs = {
  page: "institution",
  chemin: "/institution",
  titre: "L'École de Brazzaville",
  blocs: [
    {
      cle: "institution.objet.corps",
      label: "L'objet unique — corps de texte",
      type: "riche",
      aide: "L'objet unique — l'Intelligibilité",
    },
    {
      cle: "institution.objet.distinction",
      label: "L'objet unique — la distinction de niveau logique",
      type: "riche",
      aide: "L'objet unique — l'Intelligibilité",
    },
    {
      cle: "institution.architecture.corps",
      label: "L'architecture à sept niveaux — corps de texte",
      type: "riche",
      aide: "Architecture institutionnelle",
    },
    {
      cle: "institution.souverainete.corps",
      label: "Souveraineté du Démontré — corps de texte",
      type: "riche",
      aide: "Le Principe de Souveraineté du Démontré",
    },
    {
      cle: "institution.souverainete.portee",
      label: "Souveraineté du Démontré — portée du principe",
      type: "riche",
      aide: "Le Principe de Souveraineté du Démontré",
    },
    {
      cle: "institution.privilege_optique.corps",
      label: "Le Privilège Optique — corps de texte",
      type: "riche",
      aide: "Le Privilège Optique de Brazzaville",
    },
    {
      cle: "institution.demarche.equation",
      label: "La démarche — l'équation systémique",
      type: "riche",
      aide: "La démarche épistémologique",
    },
    {
      cle: "institution.demarche.transposition",
      label: "La démarche — la transposition",
      type: "riche",
      aide: "La démarche épistémologique",
    },
    {
      cle: "institution.demarche.analogie",
      label: "La démarche — au-delà de l'analogie",
      type: "riche",
      aide: "La démarche épistémologique",
    },
    {
      cle: "institution.demarche.canon",
      label: "La démarche — le Canon",
      type: "riche",
      aide: "La démarche épistémologique",
    },
  ],
};

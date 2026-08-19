import type { PageBlocs } from "./types";

/** Blocs éditables de la page La Note Épistémologique. */
export const NOTE_EPISTEMOLOGIQUE_BLOCS: PageBlocs = {
  chemin: "/note-epistemologique",
  titre: "La Note Épistémologique",
  blocs: [
    {
      cle: "note_epistemologique.posture.corps",
      label: "Posture métascientifique",
      type: "riche",
      aide: "Intelligibilité de l'intelligibilité",
    },
    {
      cle: "note_epistemologique.axiome.corps",
      label: "Axiome central — corps de texte",
      type: "riche",
      aide: "Primauté du cerveau sur le laboratoire",
    },
    {
      cle: "note_epistemologique.axiome.thom",
      label: "Axiome central — l'appui sur René Thom",
      type: "riche",
      aide: "Primauté du cerveau sur le laboratoire",
    },
    {
      cle: "note_epistemologique.theoreme.corps",
      label: "Le Théorème de la Genèse Scientifique",
      type: "riche",
      aide: "Le Canon en six temps",
    },
    {
      cle: "note_epistemologique.triade.corps",
      label: "Rectification de la triade dialectique",
      type: "riche",
      aide: "Triade dialectique",
    },
    {
      cle: "note_epistemologique.sextuor.corps",
      label: "Le sextuor de la structuration intime",
      type: "riche",
      aide: "Sextuor",
    },
    {
      cle: "note_epistemologique.pacte.corps",
      label: "Le pacte éthique",
      type: "riche",
      aide: "Fin de page",
    },
  ],
};

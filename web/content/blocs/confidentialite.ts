import type { PageBlocs } from "./types";

/** Bloc éditable de la page Politique de confidentialité (texte intégral, intertitres compris). */
export const CONFIDENTIALITE_BLOCS: PageBlocs = {
  page: "confidentialite",
  chemin: "/confidentialite",
  titre: "Politique de confidentialité",
  blocs: [
    {
      cle: "confidentialite.texte.corps",
      label: "Texte de la page",
      type: "riche",
      aide: "Texte intégral (intertitres en « Titre 2 »)",
    },
  ],
};

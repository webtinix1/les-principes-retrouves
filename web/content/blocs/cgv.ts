import type { PageBlocs } from "./types";

/** Bloc éditable de la page Conditions générales de vente (texte intégral, intertitres compris). */
export const CGV_BLOCS: PageBlocs = {
  page: "cgv",
  chemin: "/cgv",
  titre: "Conditions générales de vente",
  blocs: [
    {
      cle: "cgv.texte.corps",
      label: "Texte de la page",
      type: "riche",
      aide: "Texte intégral (intertitres en « Titre 2 »)",
    },
  ],
};

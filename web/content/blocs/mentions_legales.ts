import type { PageBlocs } from "./types";

/** Bloc éditable de la page Mentions légales (texte intégral, intertitres compris). */
export const MENTIONS_LEGALES_BLOCS: PageBlocs = {
  page: "mentions_legales",
  chemin: "/mentions-legales",
  titre: "Mentions légales",
  blocs: [
    {
      cle: "mentions_legales.texte.corps",
      label: "Texte de la page",
      type: "riche",
      aide: "Texte intégral (intertitres en « Titre 2 »)",
    },
  ],
};

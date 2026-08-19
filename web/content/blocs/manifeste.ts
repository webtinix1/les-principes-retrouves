import type { PageBlocs } from "./types";

/** Blocs éditables de la page 4 — LE MANIFESTE DE BRAZZAVILLE. */
export const MANIFESTE_BLOCS: PageBlocs = {
  chemin: "/manifeste",
  titre: "Le Manifeste de Brazzaville",
  blocs: [
    {
      cle: "manifeste.hero.sous_titre",
      label: "Sous-titre",
      type: "simple",
      aide: "En-tête — sous le titre principal",
    },
    {
      cle: "manifeste.hero.exergue",
      label: "Exergue",
      type: "simple",
      aide: "En-tête — citation en ouverture",
    },
    {
      cle: "manifeste.diagnostic.corps",
      label: "Le diagnostic — corps de texte",
      type: "riche",
      aide: "Section 1 — une crise de l'intelligibilité contemporaine",
    },
    {
      cle: "manifeste.illusion_quantitative.corps",
      label: "L'illusion quantitative — corps de texte",
      type: "riche",
      aide: "Section 2 — illusion quantitative moderniste et principe de technicité",
    },
    {
      cle: "manifeste.piege_postmoderne.corps",
      label: "Le piège post-moderne — corps de texte",
      type: "riche",
      aide: "Section 3 — du scepticisme au nihilisme du réel",
    },
    {
      cle: "manifeste.matrice_maat.intro",
      label: "La Matrice de la Maât — introduction",
      type: "riche",
      aide: "Section 4 — avant les trois propriétés",
    },
    {
      cle: "manifeste.matrice_maat.conclusion",
      label: "La Matrice de la Maât — après les trois propriétés",
      type: "riche",
      aide: "Section 4 — transposition normative et Isfet",
    },
    {
      cle: "manifeste.decolonisation.corps",
      label: "La décolonisation méthodologique — corps de texte",
      type: "riche",
      aide: "Section 5 — Privilège Optique et lignée des précurseurs",
    },
    {
      cle: "manifeste.articles.chapeau",
      label: "Les sept articles — chapeau",
      type: "simple",
      aide: "Section 6 — paragraphe d'introduction aux sept articles",
    },
    {
      cle: "manifeste.pacte.corps",
      label: "Le pacte éthique — corps de texte",
      type: "riche",
      aide: "Section 7 — pacte éthique avec le lecteur",
    },
    {
      cle: "manifeste.pacte.exergue",
      label: "Le pacte éthique — encadré final",
      type: "simple",
      aide: "Section 7 — encadré « Ce travail ne demande pas à être accepté… »",
    },
    {
      cle: "manifeste.appel.corps",
      label: "Appel à l'épreuve — texte",
      type: "simple",
      aide: "Pied de page — avant le bouton vers la Note Épistémologique",
    },
  ],
};

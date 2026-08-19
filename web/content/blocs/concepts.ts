import type { BlocDef, PageBlocs } from "./types";
import { STRATES } from "@/content/concepts";

/**
 * Les 20 concepts stabilisés : définition d'autorité et portée opératoire.
 * Les clés sont dérivées des identifiants du contenu — ajouter un concept dans
 * `content/concepts.ts` l'expose automatiquement au back-office.
 */
const CONCEPTS: BlocDef[] = STRATES.flatMap((strate) =>
  strate.concepts.flatMap((concept): BlocDef[] => [
    {
      cle: `concepts.${concept.id}.definition`,
      label: `${String(concept.numero).padStart(2, "0")}. ${concept.titre} — définition d'autorité`,
      type: "simple",
      aide: strate.titre,
    },
    {
      cle: `concepts.${concept.id}.portee`,
      label: `${String(concept.numero).padStart(2, "0")}. ${concept.titre} — portée opératoire`,
      type: "simple",
      aide: strate.titre,
    },
  ]),
);

/** Blocs éditables de la page Les Concepts Stabilisés. */
export const CONCEPTS_BLOCS: PageBlocs = {
  chemin: "/concepts",
  titre: "Les Concepts Stabilisés",
  blocs: [
    {
      cle: "concepts.introduction.corps",
      label: "Introduction au vocabulaire",
      type: "riche",
      aide: "Ouverture",
    },
    ...CONCEPTS,
  ],
};

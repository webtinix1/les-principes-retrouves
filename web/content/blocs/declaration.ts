import type { PageBlocs } from "./types";

/** Blocs éditables de la page La Déclaration d'Institution. */
export const DECLARATION_BLOCS: PageBlocs = {
  chemin: "/declaration",
  titre: "La Déclaration d'Institution",
  blocs: [
    {
      cle: "declaration.preambule.corps",
      label: "Préambule — le constat historique",
      type: "riche",
      aide: "Ouverture",
    },
    {
      cle: "declaration.acte_i.corps",
      label: "Acte I — La proclamation de l'École",
      type: "riche",
      aide: "Acte I",
    },
    {
      cle: "declaration.acte_ii.corps",
      label: "Acte II — L'objet unique : l'intelligibilité",
      type: "riche",
      aide: "Acte II",
    },
    {
      cle: "declaration.acte_iii.intro",
      label: "Acte III — La Science Métamoderne (introduction)",
      type: "riche",
      aide: "Acte III",
    },
    {
      cle: "declaration.acte_iii.equation",
      label: "Acte III — après l'équation Σ = M(F(V(Σ)))",
      type: "riche",
      aide: "Acte III",
    },
    {
      cle: "declaration.acte_iii.transposition",
      label: "Acte III — la transposition normative",
      type: "riche",
      aide: "Acte III",
    },
    {
      cle: "declaration.acte_iv.corps",
      label: "Acte IV — L'architecture institutionnelle",
      type: "riche",
      aide: "Acte IV",
    },
    {
      cle: "declaration.acte_v.corps",
      label: "Acte V — Le principe de fécondité scientifique",
      type: "riche",
      aide: "Acte V",
    },
    {
      cle: "declaration.acte_vi.corps",
      label: "Acte VI — Le privilège optique de Brazzaville",
      type: "riche",
      aide: "Acte VI",
    },
    {
      cle: "declaration.acte_vii.corps",
      label: "Acte VII — Le pacte éthique",
      type: "riche",
      aide: "Acte VII",
    },
    {
      cle: "declaration.acte_viii.corps",
      label: "Acte VIII — La formule de clôture éthique",
      type: "riche",
      aide: "Acte VIII",
    },
    {
      cle: "declaration.acte_viii.synthese",
      label: "Acte VIII — la synthèse finale",
      type: "riche",
      aide: "Acte VIII",
    },
  ],
};

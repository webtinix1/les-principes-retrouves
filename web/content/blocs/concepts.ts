import type { PageBlocs } from "./types";

/**
 * Blocs éditables de la page Les Concepts Stabilisés. Les strates et les
 * concepts eux-mêmes se règlent dans leurs collections (Concepts → Strates).
 */
export const CONCEPTS_BLOCS: PageBlocs = {
  page: "concepts",
  chemin: "/concepts",
  titre: "Les Concepts Stabilisés",
  blocs: [
    {
      cle: "concepts.seo.titre",
      label: "Titre de la page (onglet et Google)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut: "Concepts Stabilisés",
    },
    {
      cle: "concepts.seo.description",
      label: "Description (résultats Google)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut:
        "L'Infrastructure Lexicale de l'École de Brazzaville : 20 concepts stabilisés en quatre strates (ontologie, épistémologie, méthodologie, arsenal opératoire).",
    },
    {
      cle: "concepts.hero.titre",
      label: "Titre principal (H1)",
      type: "simple",
      aide: "En-tête de page",
      defaut: "Concepts stabilisés",
    },
    {
      cle: "concepts.hero.sous_titre",
      label: "Sous-titre",
      type: "simple",
      aide: "En-tête de page — sous le titre principal",
      defaut:
        "Infrastructure lexicale — les 20 piliers de la Science Métamoderne, version 4.0 enrichie",
    },
    {
      cle: "concepts.index.titre",
      label: "« Index des 20 concepts »",
      type: "simple",
      aide: "Intitulé de l'index des concepts, repris dans le sommaire « Sur cette page »",
      defaut: "Index des 20 concepts",
    },
    {
      cle: "concepts.hero.exergue",
      label: "Exergue",
      type: "simple",
      aide: "En-tête de page — citation en ouverture",
      defaut:
        "« La précision sémantique est la condition absolue de l’intégrité de la structure. »",
    },
    {
      cle: "concepts.introduction.corps",
      label: "Introduction au vocabulaire",
      type: "riche",
      aide: "Ouverture",
    },
    {
      cle: "concepts.strates.aria",
      label: "Barre des strates — libellé d'accessibilité",
      type: "simple",
      aide: "Barre des strates (collante) — lu par les lecteurs d'écran (invisible à l'écran)",
      defaut: "Strates",
    },
    {
      cle: "concepts.index.aria",
      label: "Index — libellé d'accessibilité",
      type: "simple",
      aide: "Index des concepts — lu par les lecteurs d'écran (invisible à l'écran)",
      defaut: "Index des concepts",
    },
    {
      cle: "concepts.strate.nombre",
      label: "Nombre de concepts d'une strate",
      type: "simple",
      aide: "En-tête de chaque strate — {n} = nombre de concepts",
      defaut: "{n} concepts",
    },
    {
      cle: "concepts.cloture.texte",
      label: "Phrase de clôture",
      type: "simple",
      aide: "Fin de page — phrase en italique",
      defaut:
        "« Ces concepts ne demandent pas à être acceptés sur autorité. Ils demandent à être éprouvés dans la rigueur de leur application. »",
    },
  ],
};

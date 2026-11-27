import type { PageBlocs } from "./types";

/** Textes du Fronton (page d'entrée « / »), prototype maître V16. */
export const FRONTON_BLOCS: PageBlocs = {
  page: "fronton",
  chemin: "/",
  titre: "Le Fronton",
  blocs: [
    {
      cle: "fronton.seo.titre",
      label: "Titre (onglet et Google)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut: "Le Fronton — Maât : théorie de l’intelligibilité",
    },
    {
      cle: "fronton.seo.description",
      label: "Description (Google)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut:
        "Les Principes Retrouvés — Maât : théorie de l’intelligibilité. Le Fronton : la Pyramide de Maât–Σ, architecture préalable de l’intelligibilité, et la Balance de Maât.",
    },
    {
      cle: "fronton.titre",
      label: "Titre",
      type: "simple",
      aide: "Le Fronton",
      defaut: "LE FRONTON",
    },
    {
      cle: "fronton.dedicace_1",
      label: "Dédicace 1",
      type: "simple",
      aide: "Le Fronton — dédicaces",
      defaut:
        "« À l’intelligibilité du Réel, dont toute connaissance procède et vers laquelle toute reconstruction tend. »",
    },
    {
      cle: "fronton.dedicace_2",
      label: "Dédicace 2",
      type: "simple",
      aide: "Le Fronton — dédicaces",
      defaut: "« À l’esprit humain, capable de retrouver l’ordre là où ne subsistent plus que des fragments. »",
    },
    {
      cle: "fronton.dedicace_3",
      label: "Dédicace 3",
      type: "simple",
      aide: "Le Fronton — dédicaces",
      defaut: "« À la mémoire des bâtisseurs de Maât, dont l’œuvre demeure présente derrière le voile du temps. »",
    },
    {
      cle: "fronton.embleme_alt",
      label: "Emblème de Maât — description de l’image",
      type: "simple",
      aide: "Le Fronton — images (descriptions pour lecteurs d’écran et Google)",
      defaut: "Emblème graphique de Maât : plume centrale dorée et ailes déployées sur fond bleu nuit.",
    },
    {
      cle: "fronton.pyramide_alt",
      label: "Pyramide de Maât–Σ — description de l’image",
      type: "simple",
      aide: "Le Fronton — images (descriptions pour lecteurs d’écran et Google)",
      defaut:
        "Pyramide canonique de Maât–Σ : architecture préalable de l’intelligibilité, mouvements descendant et ascendant, Voile, Filtrage, monde phénoménal et connaissance constituée.",
    },
    {
      cle: "fronton.thebes_titre",
      label: "Bandeau — titre",
      type: "simple",
      aide: "Le Fronton — bandeau de la Nouvelle Thèbes",
      defaut: "LA NOUVELLE THÈBES — CITÉ DU SAVOIR",
    },
    {
      cle: "fronton.thebes_aria",
      label: "Bandeau — description de l’image",
      type: "simple",
      aide: "Le Fronton — bandeau de la Nouvelle Thèbes",
      defaut: "Panorama du fleuve et de la cité",
    },
    {
      cle: "fronton.balance_alt",
      label: "Balance de Maât — description de l’image",
      type: "simple",
      aide: "Le Fronton — images (descriptions pour lecteurs d’écran et Google)",
      defaut:
        "Balance de Maât issue du corpus : balance dorée portant MAÂT, avec les plateaux Vérité (Rigueur) et Justice (Équité).",
    },
    {
      cle: "fronton.blog.surtitre",
      label: "Articles à la une — surtitre",
      type: "simple",
      aide: "Le Fronton — articles du blog mis en avant (bas de page)",
      defaut: "Le blog",
    },
    {
      cle: "fronton.blog.titre",
      label: "Articles à la une — titre",
      type: "simple",
      aide: "Le Fronton — articles du blog mis en avant (bas de page)",
      defaut: "À la une",
    },
    {
      cle: "fronton.blog.lire",
      label: "Articles à la une — lien vers un article",
      type: "simple",
      aide: "Le Fronton — articles du blog mis en avant (bas de page)",
      defaut: "Lire l’article",
    },
    {
      cle: "fronton.blog.tous",
      label: "Articles à la une — lien vers le blog",
      type: "simple",
      aide: "Le Fronton — articles du blog mis en avant (bas de page)",
      defaut: "Tous les articles du blog",
    },
  ],
};

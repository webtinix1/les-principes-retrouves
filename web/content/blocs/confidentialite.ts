import type { PageBlocs } from "./types";

/** Bloc éditable de la page Politique de confidentialité (texte intégral, intertitres compris). */
export const CONFIDENTIALITE_BLOCS: PageBlocs = {
  page: "confidentialite",
  chemin: "/confidentialite",
  titre: "Politique de confidentialité",
  blocs: [
    {
      cle: "confidentialite.hero.titre",
      label: "Titre de la page (H1)",
      type: "simple",
      aide: "En-tête de page — repris dans le fil d'Ariane",
      defaut: "Politique de confidentialité",
    },
    {
      cle: "confidentialite.avertissement.corps",
      label: "Encadré d'avertissement",
      type: "riche",
      aide: "Encadré en pointillés au-dessus du texte",
    },
    {
      cle: "confidentialite.texte.corps",
      label: "Texte de la page",
      type: "riche",
      aide: "Texte intégral — chaque intertitre en « Titre 2 » devient une entrée du sommaire « Sur cette page » (ancre déduite du texte)",
    },
    {
      cle: "confidentialite.seo.titre",
      label: "Titre (référencement)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut: "Politique de confidentialité",
    },
    {
      cle: "confidentialite.seo.description",
      label: "Description (référencement)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut: "Traitement des données personnelles du portail de l'École de Brazzaville : données collectées, finalités, durées, droits et cookies.",
    },
  ],
};

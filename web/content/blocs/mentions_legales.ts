import type { PageBlocs } from "./types";

/** Bloc éditable de la page Mentions légales (texte intégral, intertitres compris). */
export const MENTIONS_LEGALES_BLOCS: PageBlocs = {
  page: "mentions_legales",
  chemin: "/mentions-legales",
  titre: "Mentions légales",
  blocs: [
    {
      cle: "mentions_legales.hero.titre",
      label: "Titre de la page (H1)",
      type: "simple",
      aide: "En-tête de page — repris dans le fil d'Ariane",
      defaut: "Mentions légales",
    },
    {
      cle: "mentions_legales.avertissement.corps",
      label: "Encadré d'avertissement",
      type: "riche",
      aide: "Encadré en pointillés au-dessus du texte",
    },
    {
      cle: "mentions_legales.texte.corps",
      label: "Texte de la page",
      type: "riche",
      aide: "Texte intégral — chaque intertitre en « Titre 2 » devient une entrée du sommaire « Sur cette page » (ancre déduite du texte)",
    },
    {
      cle: "mentions_legales.seo.titre",
      label: "Titre (référencement)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut: "Mentions légales",
    },
    {
      cle: "mentions_legales.seo.description",
      label: "Description (référencement)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut: "Mentions légales du portail de l'École de Brazzaville : éditeur, hébergement, propriété intellectuelle.",
    },
  ],
};

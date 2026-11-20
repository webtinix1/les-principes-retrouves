import type { PageBlocs } from "./types";

/** Bloc éditable de la page Conditions générales de vente (texte intégral, intertitres compris). */
export const CGV_BLOCS: PageBlocs = {
  page: "cgv",
  chemin: "/cgv",
  titre: "Conditions générales de vente",
  blocs: [
    {
      cle: "cgv.hero.titre",
      label: "Titre de la page (H1)",
      type: "simple",
      aide: "En-tête de page — repris dans le fil d'Ariane",
      defaut: "Conditions générales de vente",
    },
    {
      cle: "cgv.hero.sous_titre",
      label: "Sous-titre",
      type: "simple",
      aide: "En-tête de page — sous le titre",
      defaut: "Modules de formation de l'Institut de Brazzaville",
    },
    {
      cle: "cgv.avertissement.corps",
      label: "Encadré d'avertissement",
      type: "riche",
      aide: "Encadré en pointillés au-dessus du texte",
    },
    {
      cle: "cgv.texte.corps",
      label: "Texte de la page",
      type: "riche",
      aide: "Texte intégral — chaque intertitre en « Titre 2 » devient une entrée du sommaire « Sur cette page » (ancre déduite du texte)",
    },
    {
      cle: "cgv.seo.titre",
      label: "Titre (référencement)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut: "Conditions générales de vente",
    },
    {
      cle: "cgv.seo.description",
      label: "Description (référencement)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut: "Conditions générales de vente des modules de formation de l'Institut de Brazzaville.",
    },
  ],
};

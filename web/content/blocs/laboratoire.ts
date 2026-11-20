import type { PageBlocs } from "./types";

/**
 * Blocs éditables de la page Le Laboratoire Juridique. Les niveaux d'accès et
 * la progression se règlent dans Laboratoire → Listes ; les ressources dans
 * Laboratoire → Ressources.
 */
export const LABORATOIRE_BLOCS: PageBlocs = {
  page: "laboratoire",
  chemin: "/laboratoire",
  titre: "Le Laboratoire Juridique",
  blocs: [
    {
      cle: "laboratoire.seo.titre",
      label: "Titre de la page (onglet et Google)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut: "Laboratoire Doctrinal",
    },
    {
      cle: "laboratoire.seo.description",
      label: "Description (résultats Google)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut:
        "L'Arsenal Opérationnel de l'Institut de Brazzaville : trois Working Papers fondateurs, Guide Technique d'Invocation et Arrêt Pilote, sous politique d'accès hybride.",
    },
    {
      cle: "laboratoire.hero.titre",
      label: "Titre principal (H1)",
      type: "simple",
      aide: "En-tête de page",
      defaut: "Laboratoire Doctrinal",
    },
    {
      cle: "laboratoire.hero.sous_titre",
      label: "Sous-titre",
      type: "simple",
      aide: "En-tête de page — sous le titre principal",
      defaut: "L’Arsenal Opérationnel de l’Institut de Brazzaville",
    },
    {
      cle: "laboratoire.hero.exergue",
      label: "Exergue",
      type: "simple",
      aide: "En-tête de page — citation en ouverture",
      defaut:
        "« L’intelligibilité théorique se valide par son opérationnalité en arène contentieuse. »",
    },
    {
      cle: "laboratoire.introduction.corps",
      label: "Introduction du Laboratoire",
      type: "riche",
      aide: "Ouverture",
    },
    {
      cle: "laboratoire.acces.titre",
      label: "Politique d’accès hybride — titre (H2)",
      type: "simple",
      aide: "Section — Politique d’accès hybride (aussi utilisé dans le sommaire)",
      defaut: "Politique d’accès hybride",
    },
    {
      cle: "laboratoire.acces_hybride.corps",
      label: "Politique d'accès hybride",
      type: "riche",
      aide: "Accès aux documents",
    },
    {
      cle: "laboratoire.acces.ressources",
      label: "Phrase sur les cinq ressources",
      type: "simple",
      aide: "Section — Politique d’accès hybride (sous les trois niveaux)",
      defaut:
        "L’arsenal se déploie en cinq ressources souveraines, articulées selon une progression logique.",
    },
    {
      cle: "laboratoire.code.titre",
      label: "Accès conditionné — titre (H3)",
      type: "simple",
      aide: "Section — Politique d’accès hybride (encadré de saisie du code)",
      defaut: "Accès conditionné — votre code",
    },
    {
      cle: "laboratoire.code.texte",
      label: "Accès conditionné — texte",
      type: "simple",
      aide: "Section — Politique d’accès hybride (encadré de saisie du code)",
      defaut:
        "Les participants aux modules de formation reçoivent un code d’accès qui débloque les documents intégraux. Saisissez-le ci-dessous.",
    },
    {
      cle: "laboratoire.working_papers.titre",
      label: "Working Papers — titre (H2)",
      type: "simple",
      aide: "Section — Les trois Working Papers fondateurs (aussi utilisé dans le sommaire)",
      defaut: "Les trois Working Papers fondateurs",
    },
    {
      cle: "laboratoire.pieces.titre",
      label: "Pièces opératoires — titre (H2)",
      type: "simple",
      aide: "Section — Les deux pièces opératoires (aussi utilisé dans le sommaire)",
      defaut: "Les deux pièces opératoires",
    },
    {
      cle: "laboratoire.progression.titre",
      label: "Progression de l’arsenal — titre (H2)",
      type: "simple",
      aide: "Section — La progression logique de l’arsenal (aussi utilisé dans le sommaire)",
      defaut: "La progression logique de l’arsenal",
    },
    {
      cle: "laboratoire.progression.corps",
      label: "La progression logique de l'arsenal",
      type: "riche",
      aide: "Arsenal",
    },
    {
      cle: "laboratoire.cloture.texte",
      label: "Phrase de clôture",
      type: "simple",
      aide: "Fin de page — phrase en italique",
      defaut:
        "« Les outils présentés dans ce Laboratoire ne demandent pas à être acceptés sur autorité. Ils demandent à être éprouvés dans la rigueur de leur application. »",
    },
    {
      cle: "laboratoire.cloture.lien",
      label: "Lien de fin de page",
      type: "simple",
      aide: "Fin de page — lien vers les Concepts (la flèche → est ajoutée automatiquement)",
      defaut: "Consulter les Concepts Stabilisés",
    },
  ],
};

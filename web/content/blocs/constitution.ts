import type { PageBlocs } from "./types";

/** Blocs éditables de la page La Constitution Scientifique. */
export const CONSTITUTION_BLOCS: PageBlocs = {
  page: "constitution",
  chemin: "/constitution",
  titre: "La Constitution Scientifique",
  blocs: [
    {
      cle: "constitution.preambule.corps",
      label: "Préambule — corps de texte",
      type: "riche",
      aide: "Préambule constitutionnel",
    },
    {
      cle: "constitution.article_objet.corps",
      label: "Article — L'Objet",
      type: "riche",
      aide: "Les dix articles constitutionnels",
    },
    {
      cle: "constitution.article_souverainete.corps",
      label: "Article — Le Principe de Souveraineté du Démontré",
      type: "riche",
      aide: "Les dix articles constitutionnels",
    },
    {
      cle: "constitution.article_distinction.corps",
      label: "Article — La Distinction constitutionnelle",
      type: "riche",
      aide: "Les dix articles constitutionnels",
    },
    {
      cle: "constitution.article_hypotheses.corps",
      label: "Article — Le Statut des hypothèses et le Programme d'Expansion",
      type: "riche",
      aide: "Les dix articles constitutionnels",
    },
    {
      cle: "constitution.article_critique.corps",
      label: "Article — Le Statut de la critique",
      type: "riche",
      aide: "Les dix articles constitutionnels",
    },
    {
      cle: "constitution.article_organons.corps",
      label: "Article — Le Statut des Organons futurs",
      type: "riche",
      aide: "Les dix articles constitutionnels",
    },
    {
      cle: "constitution.article_auteur.corps",
      label: "Article — Le Statut de l'auteur",
      type: "riche",
      aide: "Les dix articles constitutionnels",
    },
    {
      cle: "constitution.article_autorites.corps",
      label: "Article — Les Autorités de convergence",
      type: "riche",
      aide: "Les dix articles constitutionnels",
    },
    {
      cle: "constitution.article_cloture_ethique.corps",
      label: "Article — La Formule de clôture éthique",
      type: "riche",
      aide: "Les dix articles constitutionnels",
    },
    {
      cle: "constitution.article_continuite.corps",
      label: "Article — Le Principe de continuité de l'intelligibilité",
      type: "riche",
      aide: "Les dix articles constitutionnels",
    },
    {
      cle: "constitution.disposition_finale.corps",
      label: "Disposition finale — corps de texte",
      type: "riche",
      aide: "Fin de page",
    },
  ],
};

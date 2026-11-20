import type { BlocDef, PageBlocs } from "./types";

const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle,
  label,
  type: "simple",
  aide,
  defaut,
});

const ENTETE = "En-tête de page";
const PREAMBULE = "Préambule constitutionnel";
const ARTICLES = "Les dix articles constitutionnels";
const FIN = "Fin de page";
const CLOTURE = "Appel à l'épreuve (clôture)";

/** Un article : son titre (H3, repris dans le sommaire latéral) puis son corps. */
const article = (nom: string, romain: string, titre: string, label: string): BlocDef[] => [
  s(`constitution.article_${nom}.titre`, `Article ${romain} — titre`, ARTICLES, titre),
  {
    cle: `constitution.article_${nom}.corps`,
    label,
    type: "riche",
    aide: ARTICLES,
  },
];

/** Blocs éditables de la page La Constitution Scientifique. */
export const CONSTITUTION_BLOCS: PageBlocs = {
  page: "constitution",
  chemin: "/constitution",
  titre: "La Constitution Scientifique",
  blocs: [
    s("constitution.seo.titre", "Titre de la page (SEO)", "Référencement (Google)", "Constitution Scientifique"),
    s(
      "constitution.seo.description",
      "Description de la page (SEO)",
      "Référencement (Google)",
      "Acte constitutif du Programme de recherche de la Science Métamoderne : préambule et dix articles constitutionnels.",
    ),
    s(
      "constitution.hero.titre",
      "Titre principal (H1)",
      ENTETE,
      "Constitution scientifique de l'École de Brazzaville",
    ),
    s(
      "constitution.hero.sous_titre",
      "Sous-titre",
      ENTETE,
      "Acte constitutif du Programme de recherche de la Science Métamoderne",
    ),
    s("constitution.hero.bouton", "Bouton « Lire la Constitution intégrale »", ENTETE, "Lire la Constitution intégrale"),
    s(
      "constitution.hero.exergue",
      "Exergue",
      ENTETE,
      "« Ne rien imposer. Laisser les choses s'imposer d'elles-mêmes par la seule puissance du raisonnement. »",
    ),
    s(
      "constitution.hero.formule",
      "Formule sous l’exergue",
      ENTETE,
      "« Ce travail ne demande pas à être accepté sur autorité. Il demande à être éprouvé. »",
    ),

    s(
      "constitution.preambule.titre",
      "Titre de section (H2, repris dans « Sur cette page »)",
      PREAMBULE,
      "Préambule constitutionnel",
    ),
    {
      cle: "constitution.preambule.corps",
      label: "Préambule — corps de texte",
      type: "riche",
      aide: PREAMBULE,
    },

    s(
      "constitution.articles.titre",
      "Titre de section (H2, repris dans « Sur cette page »)",
      ARTICLES,
      "Les dix articles constitutionnels",
    ),
    s(
      "constitution.articles.sommaire_lecture",
      "Sommaire des articles — lecture pour lecteurs d’écran (aria-label)",
      ARTICLES,
      "Les dix articles",
    ),
    s(
      "constitution.articles.lien_lecture",
      "Sommaire mobile — lecture d’un numéro (aria-label)",
      `${ARTICLES} — {romain} = numéro romain, {titre} = titre de l’article`,
      "Article {romain} — {titre}",
    ),
    s(
      "constitution.articles.etiquette",
      "Étiquette d’un article",
      `${ARTICLES} — {romain} = numéro romain de l’article`,
      "Article {romain}",
    ),
    ...article("objet", "I", "L'Objet", "Article — L'Objet"),
    ...article(
      "souverainete",
      "II",
      "Le Principe de Souveraineté du Démontré",
      "Article — Le Principe de Souveraineté du Démontré",
    ),
    ...article(
      "distinction",
      "III",
      "La Distinction constitutionnelle",
      "Article — La Distinction constitutionnelle",
    ),
    ...article(
      "hypotheses",
      "IV",
      "Le Statut des hypothèses et le Programme d'Expansion",
      "Article — Le Statut des hypothèses et le Programme d'Expansion",
    ),
    ...article("critique", "V", "Le Statut de la critique", "Article — Le Statut de la critique"),
    ...article("organons", "VI", "Le Statut des Organons futurs", "Article — Le Statut des Organons futurs"),
    ...article("auteur", "VII", "Le Statut de l'auteur", "Article — Le Statut de l'auteur"),
    ...article(
      "autorites",
      "VIII",
      "Les Autorités de convergence",
      "Article — Les Autorités de convergence",
    ),
    ...article(
      "cloture_ethique",
      "IX",
      "La Formule de clôture éthique",
      "Article — La Formule de clôture éthique",
    ),
    ...article(
      "continuite",
      "X",
      "Le Principe de continuité de l'intelligibilité",
      "Article — Le Principe de continuité de l'intelligibilité",
    ),

    s(
      "constitution.disposition_finale.titre",
      "Titre de section (H2, repris dans « Sur cette page »)",
      FIN,
      "Disposition finale",
    ),
    {
      cle: "constitution.disposition_finale.corps",
      label: "Disposition finale — corps de texte",
      type: "riche",
      aide: FIN,
    },

    s("constitution.cloture.titre", "Titre (H2)", CLOTURE, "Appel à l'épreuve"),
    s(
      "constitution.cloture.citation",
      "Citation",
      CLOTURE,
      "« La Constitution scientifique de l'École de Brazzaville ne demande pas à être acceptée sur autorité. Elle demande à être éprouvée par la recherche elle-même. »",
    ),
    s("constitution.cloture.bouton", "Bouton vers le Manifeste", CLOTURE, "Explorer le Manifeste"),
  ],
};

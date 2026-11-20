import type { BlocDef, PageBlocs } from "./types";

const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle,
  label,
  type: "simple",
  aide,
  defaut,
});

const titre = (section: string, aide: string, defaut: string) =>
  s(`manifeste.${section}.titre`, "Titre de section (H2, repris dans « Sur cette page »)", aide, defaut);

/** Blocs éditables de la page 4 — LE MANIFESTE DE BRAZZAVILLE. */
export const MANIFESTE_BLOCS: PageBlocs = {
  page: "manifeste",
  chemin: "/manifeste",
  titre: "Le Manifeste de Brazzaville",
  blocs: [
    s("manifeste.seo.titre", "Titre de la page (SEO)", "Référencement (Google)", "Le Manifeste de Brazzaville"),
    s(
      "manifeste.seo.description",
      "Description de la page (SEO)",
      "Référencement (Google)",
      "L'Horizon de l'Effectivité Normative : diagnostic de la crise de l'intelligibilité et les sept articles du Manifeste.",
    ),
    s("manifeste.hero.titre", "Titre principal (H1)", "En-tête de page", "Le Manifeste de Brazzaville"),
    {
      cle: "manifeste.hero.sous_titre",
      label: "Sous-titre",
      type: "simple",
      aide: "En-tête — sous le titre principal",
    },
    {
      cle: "manifeste.hero.exergue",
      label: "Exergue",
      type: "simple",
      aide: "En-tête — citation en ouverture",
    },
    titre("diagnostic", "Section 1 — une crise de l'intelligibilité contemporaine", "Le diagnostic — une crise de l’intelligibilité contemporaine"),
    {
      cle: "manifeste.diagnostic.corps",
      label: "Le diagnostic — corps de texte",
      type: "riche",
      aide: "Section 1 — une crise de l'intelligibilité contemporaine",
    },
    titre(
      "illusion_quantitative",
      "Section 2 — illusion quantitative moderniste et principe de technicité",
      "L’illusion quantitative moderniste et le principe de technicité",
    ),
    {
      cle: "manifeste.illusion_quantitative.corps",
      label: "L'illusion quantitative — corps de texte",
      type: "riche",
      aide: "Section 2 — illusion quantitative moderniste et principe de technicité",
    },
    titre(
      "piege_postmoderne",
      "Section 3 — du scepticisme au nihilisme du réel",
      "Le piège post-moderne — du scepticisme au nihilisme du réel",
    ),
    {
      cle: "manifeste.piege_postmoderne.corps",
      label: "Le piège post-moderne — corps de texte",
      type: "riche",
      aide: "Section 3 — du scepticisme au nihilisme du réel",
    },
    titre(
      "matrice_maat",
      "Section 4 — la Matrice de la Maât",
      "La Matrice de la Maât — opérateur suprême de non-contradiction",
    ),
    {
      cle: "manifeste.matrice_maat.intro",
      label: "La Matrice de la Maât — introduction",
      type: "riche",
      aide: "Section 4 — avant les trois propriétés",
    },
    {
      cle: "manifeste.matrice_maat.conclusion",
      label: "La Matrice de la Maât — après les trois propriétés",
      type: "riche",
      aide: "Section 4 — transposition normative et Isfet",
    },
    titre(
      "decolonisation",
      "Section 5 — Privilège Optique et lignée des précurseurs",
      "La décolonisation méthodologique de l’universel",
    ),
    {
      cle: "manifeste.decolonisation.corps",
      label: "La décolonisation méthodologique — corps de texte",
      type: "riche",
      aide: "Section 5 — Privilège Optique et lignée des précurseurs",
    },
    titre("articles", "Section 6 — les sept articles", "Les sept articles du Manifeste"),
    {
      cle: "manifeste.articles.chapeau",
      label: "Les sept articles — chapeau",
      type: "simple",
      aide: "Section 6 — paragraphe d'introduction aux sept articles",
    },
    s(
      "manifeste.articles.etiquette",
      "Étiquette d’un article",
      "Section 6 — {romain} = numéro romain de l’article",
      "Article {romain}",
    ),
    titre("pacte", "Section 7 — pacte éthique avec le lecteur", "Le pacte éthique avec le lecteur"),
    {
      cle: "manifeste.pacte.corps",
      label: "Le pacte éthique — corps de texte",
      type: "riche",
      aide: "Section 7 — pacte éthique avec le lecteur",
    },
    {
      cle: "manifeste.pacte.exergue",
      label: "Le pacte éthique — encadré final",
      type: "simple",
      aide: "Section 7 — encadré « Ce travail ne demande pas à être accepté… »",
    },
    s("manifeste.appel.titre", "Appel à l'épreuve — titre", "Pied de page — avant le bouton vers la Note Épistémologique", "L’appel à l’épreuve."),
    {
      cle: "manifeste.appel.corps",
      label: "Appel à l'épreuve — texte",
      type: "simple",
      aide: "Pied de page — avant le bouton vers la Note Épistémologique",
    },
    s(
      "manifeste.appel.bouton",
      "Appel à l'épreuve — bouton",
      "Pied de page — bouton vers la Note Épistémologique",
      "Découvrir la Note Épistémologique",
    ),
  ],
  listes: [
    {
      nom: "matrice",
      label: "La Matrice de la Maât — les trois propriétés",
      element: "Propriété",
      aide: "Section 4 — encadré des trois propriétés cumulatives",
      champs: [
        { nom: "numero", label: "Numéro" },
        { nom: "titre", label: "Titre" },
        { nom: "texte", label: "Texte", type: "zone" },
      ],
      origine: [
        {
          numero:
            "1.",
          titre:
            "Totalité",
          texte:
            "Rien n’existe hors du système. Chaque fragment n’a de sens que rattaché à l’architecture globale qui le rend possible.",
        },
        {
          numero:
            "2.",
          titre:
            "Indivisibilité",
          texte:
            "La fragmentation apparente n’est qu’une illusion transitoire provoquée par les limites de l’observateur. L’unité précède la multiplicité.",
        },
        {
          numero:
            "3.",
          titre:
            "Cohérence Interne",
          texte:
            "Absence absolue de contradiction fonctionnelle. Le système maintient activement sa propre unité face aux agressions du milieu extérieur.",
        },
      ],
    },
    {
      nom: "articles",
      label: "Les sept articles du Manifeste",
      element: "Article",
      aide: "Section 6 — numéro en chiffres romains (sert aussi d’ancre : #article-i…)",
      champs: [
        { nom: "numero", label: "Numéro (chiffres romains)" },
        { nom: "titre", label: "Titre" },
        { nom: "texte", label: "Texte", type: "zone" },
      ],
      origine: [
        {
          numero:
            "I",
          titre:
            "Primauté de l'Intelligibilité sur l'Opératoire",
          texte:
            "La recherche scientifique dépend d'abord du cerveau avant de dépendre du laboratoire. Le laboratoire vérifie, mesure, contrôle ou réfute ; mais c'est l'intelligence qui formule les problèmes, identifie les anomalies, construit les hypothèses et découvre les principes.",
        },
        {
          numero:
            "II",
          titre:
            "Le Théorème de la Genèse Scientifique",
          texte:
            "La connaissance ne naît pas de l'induction mécanique, ni de la déduction formelle. Elle naît de la rencontre entre une intelligibilité déjà présente et une difficulté qui en révèle l'incomplétude. La genèse réelle de la découverte obéit à la séquence : Architecture Préalable → Paradoxe/Anomalie → Hypothèse → Thésis → Expérantia → Connaissance.",
        },
        {
          numero:
            "III",
          titre:
            "Le Principe de Nécessité Heuristique",
          texte:
            "L'ascension vers les principes ne s'effectue pas par spéculation arbitraire. Chaque élévation vers un niveau supérieur d'intelligibilité doit apparaître comme la conséquence nécessaire des insuffisances constatées au niveau inférieur. Le chercheur ne monte pas parce qu'il le veut ; il monte parce que le niveau inférieur ne suffit plus à rendre compte de la cohérence du réel.",
        },
        {
          numero:
            "IV",
          titre:
            "La Reconstruction Synthétique",
          texte:
            "L'analyse est nécessaire, mais elle fragmente. Elle dissèque le réel en disciplines, en objets et en variables. La synthèse reconstructive est la forme supérieure de l'analyse : elle consiste à remonter des éléments dissociés vers les fondements implicites qui les unissent. Là où l'analyse voit des disciplines séparées, la méthode reconstructive cherche le Substratum Commun qui les rend simultanément possibles.",
        },
        {
          numero:
            "V",
          titre:
            "La Double Respiration du Réel et de la Connaissance",
          texte:
            "La méthode reconnaît deux mouvements symétriques et inverses. Le mouvement descendant (Ontologique) : le Substratum Commun (Σ, π₁ ↔ π₂) se convertit progressivement en manifestations observables à travers la Charnière Ontologique et le Voile Ontologique. Le mouvement ascendant (Épistémologique) : l'intelligence remonte du monde observable, franchit le Voile, traverse la Charnière, et reconstruit l'architecture préalable pour retrouver le Substratum Commun.",
        },
        {
          numero:
            "VI",
          titre:
            "Le Principe de Non-Imposition",
          texte:
            "Nul principe ne peut être introduit avant que le raisonnement n'en ait progressivement établi la nécessité. La recherche ne consiste pas à imposer des conclusions, mais à reconstruire les conditions qui conduisent nécessairement jusqu'à elles.",
        },
        {
          numero:
            "VII",
          titre:
            "Le Principe de Démonstration Catégorique",
          texte:
            "Aucune affirmation ne peut être tenue pour acquise tant qu'elle n'a pas fait l'objet d'une démonstration suffisante au regard de son domaine. L'ambition d'une théorie ne dispense jamais de l'exigence de sa démonstration.",
        },
      ],
    },
  ],
};

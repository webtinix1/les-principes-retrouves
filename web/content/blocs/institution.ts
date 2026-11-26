import type { BlocDef, PageBlocs } from "./types";

const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle,
  label,
  type: "simple",
  aide,
  defaut,
});
const r = (cle: string, label: string, aide: string): BlocDef => ({ cle, label, type: "riche", aide });

const SEO = "Référencement (Google)";
const ENTETE = "En-tête de page";
const HORIZON = "Bandeau « Horizon scientifique central »";
const RUPTURE = "Une rupture épistémologique assumée";
const PROGRAMME = "Le programme de recherche";
const MAAT = "Bandeau « De Maât à la proactivité judiciaire encadrée »";
const NIVEAUX = "Une architecture intellectuelle à quatre niveaux";
const PROLONG = "Prolongements prospectifs distincts";
const BRAZZA = "Brazzaville : locus historique et énonciatif";
const ECOLE = "Section « L’École de pensée de Brazzaville »";
const CORPUS = "Section « Corpus établi, programme et prospective »";

/**
 * Textes de la page Institution (« /institution »), prototype maître V16.
 * Les anciennes listes de `payload/globals/listes.ts` (niveaux, mouvement
 * organique, Canon, autorités) ne sont plus affichées par cette page.
 */
export const INSTITUTION_BLOCS: PageBlocs = {
  page: "institution",
  chemin: "/institution",
  titre: "Institution",
  blocs: [
    s(
      "institution.seo.titre",
      "Titre (onglet et Google)",
      SEO,
      "Institut de Brazzaville — École de pensée et programme",
    ),
    s(
      "institution.seo.description",
      "Description (Google)",
      SEO,
      "Institut de Brazzaville — École de pensée : une infrastructure intellectuelle au service d’un programme de recherche consacré à l’intelligibilité.",
    ),

    s("institution.entete.eyebrow", "Surtitre", ENTETE, "Institution et programme de recherche"),
    s("institution.entete.titre", "Titre principal (H1)", ENTETE, "Institut de Brazzaville — École de pensée"),
    s(
      "institution.entete.intro",
      "Phrase d’introduction",
      ENTETE,
      "Une infrastructure intellectuelle au service d’un programme de recherche consacré à l’intelligibilité.",
    ),
    s(
      "institution.entete.auteur",
      "Désignation de l’auteur (sous l’en-tête)",
      ENTETE,
      "Gaudéric MAMBOU, Juriste, Chercheur indépendant en épistémologie juridique",
    ),
    s(
      "institution.entete.embleme_alt",
      "Emblème de Maât — description de l’image",
      ENTETE,
      "Emblème graphique de Maât : plume centrale dorée et ailes déployées sur fond bleu nuit.",
    ),

    s("institution.horizon.tag", "Étiquette", HORIZON, "HORIZON SCIENTIFIQUE CENTRAL"),
    s(
      "institution.horizon.titre",
      "Titre",
      HORIZON,
      "La Science Métamoderne : science de l’unité et Organon de réintégration",
    ),
    r("institution.horizon.corps", "Texte avant la formule", HORIZON),
    s("institution.horizon.equation", "Formule", HORIZON, "K → M → K′ → Σ"),
    s(
      "institution.horizon.suite",
      "Paragraphe après la formule",
      HORIZON,
      "Le Référentiel d’Intelligibilité (R) permet d’examiner le savoir constitué (K) ; l’écart Δ(R,K) rend visible une insuffisance de cohérence ; le principe de Non-Perte oriente la reconstruction par la Méthode M.",
    ),

    s("institution.rupture.titre", "Titre", RUPTURE, "Une rupture épistémologique assumée"),
    r("institution.rupture.corps", "Texte", RUPTURE),

    s(
      "institution.programme.lead",
      "Paragraphe d’introduction (grand corps)",
      PROGRAMME,
      "Les Principes Retrouvés constituent le premier corpus démonstratif d’un programme de recherche consacré à l’intelligibilité. Le Tome I en établit l’architecture théorique ; le Tome II en confronte la portée dans le champ du droit constitutionnel. L’Institut organise la continuité de ce travail : recherches, publications, archives, rencontres et transmission.",
    ),
    s(
      "institution.programme.statuts",
      "Statuts de lecture",
      PROGRAMME,
      "Statuts de lecture : corpus établi · programme de recherche · recherche en cours · prospective.",
    ),

    s("institution.maat_droit.titre", "Titre", MAAT, "De Maât à la proactivité judiciaire encadrée"),
    r("institution.maat_droit.corps", "Texte", MAAT),

    s(
      "institution.science.texte",
      "Paragraphe sur la Science Métamoderne",
      NIVEAUX,
      "La Science Métamoderne ne désigne pas une discipline supplémentaire. Elle travaille sur le réel à un niveau supérieur d’intelligibilité et prend en charge la pluralité des sciences, leurs objets, leurs méthodes, leurs résultats et leurs relations. Elle coordonne les connaissances différenciées et les réintègre dans une unité structurelle, sans fusionner les disciplines.",
    ),
    s(
      "institution.quatre_niveaux.titre",
      "Titre (les quatre cartes sont dans « Listes »)",
      NIVEAUX,
      "Une architecture intellectuelle à quatre niveaux",
    ),

    s("institution.prolongements.titre", "Titre", PROLONG, "Prolongements prospectifs distincts"),
    s(
      "institution.prolongements.texte",
      "Texte",
      PROLONG,
      "La Science Métamoderne est appelée à produire, dans le temps, de nouvelles démonstrations, de nouveaux concepts et de nouvelles intelligibilités. Les disciplines séparent leurs objets ; la recherche des principes rapproche leurs chercheurs.",
    ),
    r("institution.prolongements.chantier", "Encadré « Chantier prospectif distinct »", PROLONG),

    s("institution.brazzaville.titre", "Titre", BRAZZA, "Brazzaville : locus historique et énonciatif"),
    s(
      "institution.brazzaville.texte",
      "Texte",
      BRAZZA,
      "Brazzaville est le lieu depuis lequel cette recherche a été élaborée et formulée. Cette position rend visible une autre provenance possible de la production doctrinale ; elle ne revendique aucune supériorité géographique ni aucun monopole de l’universel.",
    ),
    s(
      "institution.brazzaville.note",
      "Note (petits caractères)",
      BRAZZA,
      "Le programme de recherche est plus vaste que le corpus établi. Les hypothèses et prolongements sont annoncés comme tels jusqu’à ce que leurs démonstrations soient établies.",
    ),

    s(
      "institution.ecole.titre",
      "Titre",
      ECOLE,
      "L’École de pensée de Brazzaville : structurer et transmettre",
    ),
    r("institution.ecole.corps", "Texte", ECOLE),

    s("institution.corpus.titre", "Titre", CORPUS, "Corpus établi, programme et prospective"),
    r("institution.corpus.corps", "Texte", CORPUS),
  ],
  listes: [
    {
      nom: "cartes_niveaux",
      label: "Architecture à quatre niveaux — cartes",
      element: "Niveau",
      champs: [
        { nom: "etiquette", label: "Étiquette" },
        { nom: "titre", label: "Titre" },
        { nom: "texte", label: "Texte", type: "zone" },
      ],
      origine: [
        {
          etiquette: "NIVEAU I · INSTITUTION",
          titre: "Institut de Brazzaville",
          texte:
            "Infrastructure de conservation, d’organisation, de publication, d’archives, de rencontres scientifiques et de transmission. L’Institut ne crée pas la vérité du corpus : il en assure la conservation, la présentation et la diffusion.",
        },
        {
          etiquette: "NIVEAU II · ACTES CONSTITUTIFS",
          titre: "Fronton, Manifeste, Constitution, Note épistémologique",
          texte:
            "Les textes qui définissent l’objet, les principes de méthode, la discipline intellectuelle, les règles de discussion et l’orientation générale du programme.",
        },
        {
          etiquette: "NIVEAU III · PROGRAMME",
          titre: "Objet, méthode, vocabulaire, Organon, laboratoire, transmission",
          texte:
            "Le programme est plus vaste que le corpus publié. Il accueille des recherches nouvelles, des hypothèses et des prolongements, en indiquant explicitement leur statut.",
        },
        {
          etiquette: "NIVEAU IV · PREMIER CORPUS",
          titre: "Les Principes Retrouvés — Tomes I et II",
          texte:
            "Le Tome I établit la théorie de l’intelligibilité. Le Tome II en éprouve la portée dans le champ du droit constitutionnel. Le diptyque constitue le premier corpus public de cette recherche.",
        },
      ],
    },
  ],
};

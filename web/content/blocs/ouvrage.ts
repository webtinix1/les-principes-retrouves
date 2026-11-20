import type { BlocDef, PageBlocs } from "./types";

/** Bloc « simple » (texte court sans mise en forme) avec son texte d'origine. */
const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle,
  label,
  type: "simple",
  aide,
  defaut,
});

const ENTETE = "En-tête de page";
const SOMMAIRE = "Sommaire « Sur cette page » (libellés plus courts que les titres de section)";
const S1 = "Section 1 — Les textes liminaires du diptyque";
const S2 = "Section 2 — Introduction au diptyque";
const S3 = "Section 3 — Présentation symétrique du diptyque";
const S3_I = "Section 3 — Présentation symétrique, carte « Tome I »";
const S3_II = "Section 3 — Présentation symétrique, carte « Tome II »";
const S4 = "Section 4 — Les 12 Autorités de Convergence";
const S5 = "Section 5 — Le Programme de recherche";
const S5_ENC = "Section 5 — Encadré « Noyau Démontré / Programme d’Expansion »";
const CLOTURE = "Clôture de page";
const SEO = "Référencement (Google)";

/** Blocs éditables de la page L'Ouvrage — le diptyque. */
export const OUVRAGE_BLOCS: PageBlocs = {
  page: "ouvrage",
  chemin: "/ouvrage",
  titre: "L'Ouvrage — le diptyque",
  blocs: [
    s("ouvrage.hero.titre", "Titre de la page (H1)", ENTETE, "L’Ouvrage"),
    s(
      "ouvrage.hero.sous_titre",
      "Sous-titre",
      ENTETE,
      "Les Principes Retrouvés — De l’axiomatique pure à l’application juridictionnelle",
    ),
    s("ouvrage.hero.bouton", "Bouton « Lire en accès libre »", ENTETE, "Lire en accès libre"),
    s(
      "ouvrage.hero.exergue",
      "Exergue",
      ENTETE,
      "« Ce diptyque ne constitue pas une théorie supplémentaire parmi les théories existantes. Il inaugure un Programme de recherche consacré à l’étude de l’intelligibilité elle-même. »",
    ),
    s("ouvrage.sommaire.autorites", "Sommaire — Autorités de Convergence", SOMMAIRE, "Les 12 Autorités de Convergence"),
    s("ouvrage.sommaire.programme", "Sommaire — Programme de recherche", SOMMAIRE, "Le Programme de recherche"),
    s("ouvrage.textes_liminaires.titre", "Titre de section (H2)", S1, "Les textes liminaires du diptyque"),
    {
      cle: "ouvrage.textes_liminaires.corps",
      label: "Les textes liminaires",
      type: "riche",
      aide: "Textes liminaires du diptyque",
    },
    s(
      "ouvrage.acces_libre.bouton_lire",
      "Bouton « Lire le … » d'une carte de tome",
      `${S1} — cartes des tomes ({tome} = étiquette du tome, ex. « Tome I »)`,
      "Lire le {tome}",
    ),
    s(
      "ouvrage.acces_libre.compteur",
      "Nombre de textes en accès libre",
      `${S1} — cartes des tomes ({n} = nombre de textes)`,
      "{n} textes en accès libre",
    ),
    s("ouvrage.introduction.titre", "Titre de section (H2)", S2, "Introduction au diptyque"),
    {
      cle: "ouvrage.introduction.corps",
      label: "Introduction au diptyque",
      type: "riche",
      aide: "Ouverture",
    },
    s("ouvrage.presentation.titre", "Titre de section (H2)", S3, "Présentation symétrique du diptyque"),
    s("ouvrage.presentation.tome_i.etiquette", "Tome I — étiquette", S3_I, "Tome I"),
    s("ouvrage.presentation.tome_i.titre", "Tome I — titre", S3_I, "L’Organon"),
    s(
      "ouvrage.presentation.tome_i.sous_titre",
      "Tome I — sous-titre",
      S3_I,
      "Science de l’Intelligibilité — Traité d’épistémologie fondamentale et de métaphysique logico-mathématique",
    ),
    s(
      "ouvrage.presentation.tome_i.question",
      "Tome I — question d'ouverture",
      S3_I,
      "Pourquoi le monde produit-il de plus en plus de données et de moins en moins de sens ?",
    ),
    {
      cle: "ouvrage.presentation.tome_i.corps",
      label: "Tome I — présentation",
      type: "riche",
      aide: S3_I,
    },
    s("ouvrage.presentation.tome_i.lien", "Tome I — lien", S3_I, "Lire les textes liminaires"),
    s("ouvrage.presentation.tome_ii.etiquette", "Tome II — étiquette", S3_II, "Tome II · Le Laboratoire Juridique"),
    s(
      "ouvrage.presentation.tome_ii.titre",
      "Tome II — titre",
      S3_II,
      "La saisine d'office, l'autosaisine et l'action positive du juge constitutionnel",
    ),
    s(
      "ouvrage.presentation.tome_ii.sous_titre",
      "Tome II — sous-titre",
      S3_II,
      "Théorie générale et formalisation d'un principe universel de proactivité judiciaire encadrée",
    ),
    s(
      "ouvrage.presentation.tome_ii.question",
      "Tome II — question d'ouverture",
      S3_II,
      "Le droit constitutionnel n’est plus capable de nous protéger. Comment le réparer ?",
    ),
    {
      cle: "ouvrage.presentation.tome_ii.corps",
      label: "Tome II — présentation",
      type: "riche",
      aide: S3_II,
    },
    s("ouvrage.presentation.tome_ii.lien", "Tome II — lien", S3_II, "Lire le liminaire et trois chapitres"),
    s(
      "ouvrage.autorites.titre",
      "Titre de section (H2)",
      S4,
      "L’ancrage doctrinal — Les 12 Autorités de Convergence",
    ),
    {
      cle: "ouvrage.autorites.corps",
      label: "L'ancrage doctrinal — les 12 Autorités",
      type: "riche",
      aide: "Autorités de Convergence",
    },
    s("ouvrage.programme.titre", "Titre de section (H2)", S5, "Le Programme de recherche — Noyau et Expansion"),
    {
      cle: "ouvrage.programme.corps",
      label: "Le Programme de recherche — corps de texte",
      type: "riche",
      aide: "Noyau et Expansion",
    },
    s("ouvrage.programme.noyau.titre", "Noyau — titre", S5_ENC, "Le Noyau Démontré"),
    s("ouvrage.programme.noyau.sous_titre", "Noyau — sous-titre", S5_ENC, "Les Principes Retrouvés"),
    s("ouvrage.programme.expansion.titre", "Expansion — titre", S5_ENC, "Le Programme d’Expansion"),
    s("ouvrage.programme.expansion.sous_titre", "Expansion — sous-titre", S5_ENC, "Les chantiers émergents"),
    {
      cle: "ouvrage.programme.axes",
      label: "Le Programme de recherche — les axes",
      type: "riche",
      aide: "Noyau et Expansion",
    },
    s(
      "ouvrage.cloture.citation",
      "Citation de clôture",
      CLOTURE,
      "« La Science Métamoderne ne demande aucune adhésion préalable. Elle invite à une enquête. Elle ne sollicite pas une croyance. Elle propose une méthode. »",
    ),
    s("ouvrage.cloture.lien", "Lien vers le Laboratoire", CLOTURE, "Accéder au Laboratoire Doctrinal"),
    s("ouvrage.seo.titre", "Titre (référencement)", SEO, "L'Ouvrage"),
    s(
      "ouvrage.seo.description",
      "Description (référencement)",
      SEO,
      "Le Diptyque du Noyau Démontré : Tome I (l'Organon) et Tome II (le Laboratoire Juridique). Textes liminaires et chapitres I, II et VII du Tome II en accès libre, et les douze autorités de convergence.",
    ),
  ],
  listes: [
    {
      nom: "noyau",
      label: "Le Noyau Démontré — éléments",
      element: "Élément",
      aide: `${S5_ENC} — colonne gauche. Le terme s'affiche en gras, suivi du texte.`,
      champs: [
        { nom: "terme", label: "Terme (en gras, avec ses deux-points)" },
        { nom: "texte", label: "Texte", type: "zone" },
      ],
      origine: [
        {
          terme: "L’Axiomatique pure :",
          texte: "la modélisation de la matrice Σ et de ses polarités simultanées (π₁ ↔ π₂).",
        },
        {
          terme: "Le Canon de la Découverte :",
          texte: "le protocole de la remontée inductive-rationnelle en sept principes.",
        },
        {
          terme: "Le Laboratoire Juridique :",
          texte: "le Théorème de la Validité Inversée et la codification de la Proactivité Judiciaire Encadrée.",
        },
      ],
    },
    {
      nom: "expansion",
      label: "Le Programme d’Expansion — éléments",
      element: "Élément",
      aide: `${S5_ENC} — colonne droite. Le terme s'affiche en gras, suivi du texte.`,
      champs: [
        { nom: "terme", label: "Terme (en gras, avec ses deux-points)" },
        { nom: "texte", label: "Texte", type: "zone" },
      ],
      origine: [
        {
          terme: "Sciences du vivant :",
          texte: "régulation cellulaire, réplication virale, loi organogénétique, lamarco-darwinisme.",
        },
        {
          terme: "Physique fondamentale :",
          texte: "phénomènes nucléaires, limites de l’univers matériel, théorie de la transposition d’échelle.",
        },
        {
          terme: "Sciences de la complexité :",
          texte: "transformations de la matière et répercussions sur le biotope.",
        },
        {
          terme: "Théorie de l’information :",
          texte: "modélisation des flux de connaissance.",
        },
      ],
    },
  ],
};

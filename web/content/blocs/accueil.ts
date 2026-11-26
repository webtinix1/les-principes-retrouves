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
const ENTREE = "Ouverture (bandeau bleu)";
const DIAG = "Le diagnostic central";
const ELLIPSE = "Le point aveugle : l’ellipse méthodologique";
const RUPTURE = "La rupture épistémologique";
const SOCLE = "Carte « Maât : une matrice pour reconstruire l’ordre »";
const SCIENCE = "Carte « La Science Métamoderne »";
const DIPTYQUE = "Le diptyque fondateur";
const TRANSMISSION = "Bandeau « Transmettre à l’Afrique et au monde »";
const RENCONTRE = "Carte « Rencontre doctrinale et scientifique »";
const LIVRE = "Section « Le Livre des livres »";
const BRAZZA = "Section « Brazzaville : lieu d’énonciation »";

/** Textes de l'Accueil (« /accueil »), prototype maître V16. */
export const ACCUEIL_BLOCS: PageBlocs = {
  page: "accueil",
  chemin: "/accueil",
  titre: "Accueil",
  blocs: [
    s("accueil.seo.titre", "Titre (onglet et Google)", SEO, "Accueil — Les Principes Retrouvés : Maât et intelligibilité"),
    s(
      "accueil.seo.description",
      "Description (Google)",
      SEO,
      "Le Tome I établit la théorie de l’intelligibilité ; le Tome II en confronte la portée dans le champ du droit constitutionnel. Depuis Brazzaville.",
    ),

    s("accueil.entree.eyebrow", "Surtitre", ENTREE, "Les Principes Retrouvés"),
    s(
      "accueil.entree.diptyque",
      "Phrase de présentation du diptyque",
      ENTREE,
      "Le Tome I établit la théorie de l’intelligibilité ; le Tome II en confronte la portée dans le champ du droit constitutionnel, à travers la saisine d’office, l’autosaisine et l’action positive du juge constitutionnel.",
    ),
    s("accueil.entree.bouton_tome_i", "Bouton 1 (vers les Ouvrages)", ENTREE, "Découvrir le Tome I"),
    s("accueil.entree.bouton_tome_ii", "Bouton 2 (vers les Ouvrages)", ENTREE, "Découvrir le Tome II"),
    s("accueil.entree.bouton_architecture", "Bouton 3 (vers l’Institution)", ENTREE, "Explorer l’architecture"),
    s("accueil.entree.signature_auteur", "Signature — auteur", ENTREE, "Gaudéric MAMBOU"),
    s("accueil.entree.signature_lieu", "Signature — lieu et date", ENTREE, "Brazzaville — Novembre 2026"),

    s(
      "accueil.introduction.lead",
      "Paragraphe d’introduction (grand corps)",
      "Introduction",
      "L’humanité contemporaine n’est pas menacée seulement par un manque de connaissances. Elle est confrontée à un risque plus profond : celui de voir la différenciation de ses savoirs, de ses compétences et de ses institutions cesser de reconstruire l’unité qui les rend intelligibles. Lorsque les parties se multiplient sans que leurs relations soient restaurées, la désarticulation peut gagner l’ensemble et conduire au déclin organique ou social, jusqu’au chaos.",
    ),

    s("accueil.diagnostic.tag", "Étiquette", DIAG, "LE DIAGNOSTIC CENTRAL"),
    s(
      "accueil.diagnostic.titre",
      "Titre",
      DIAG,
      "Quand la différenciation cesse de reconstruire l’unité et mène au déclin",
    ),
    r("accueil.diagnostic.corps", "Texte du bandeau", DIAG),

    s("accueil.ellipse.titre", "Titre", ELLIPSE, "Le point aveugle : l’ellipse méthodologique"),
    s(
      "accueil.ellipse.texte",
      "Paragraphe avant la formule",
      ELLIPSE,
      "La connaissance ne commence pas avec l’équation qui la formalise. Entre le phénomène et la forme achevée se déploient des opérations qui rendent la connaissance possible : observer, saisir une relation, interpréter, déterminer, symboliser, puis formaliser. Lorsque ces médiations disparaissent du récit de la connaissance, la formalisation est prise à tort pour son origine absolue.",
    ),
    s(
      "accueil.ellipse.equation",
      "Formule",
      ELLIPSE,
      "Phénomène → Saisie de la relation → Interprétation → Détermination → Symbolisation → Formalisation",
    ),
    s(
      "accueil.ellipse.suite",
      "Paragraphe après la formule",
      ELLIPSE,
      "L’enfant voit avant de nommer, saisit avant de décrire, distingue avant de définir, reconnaît avant de formaliser. Une équation exprime une relation ; elle ne crée pas l’ordre intelligible dont elle procède.",
    ),

    s(
      "accueil.rupture.titre",
      "Titre",
      RUPTURE,
      "La rupture épistémologique : sortir du monopole de l’universel",
    ),
    r("accueil.rupture.corps", "Texte", RUPTURE),

    s("accueil.socle.tag", "Étiquette", SOCLE, "LE SOCLE PRINCIPIEL · KEMET"),
    s("accueil.socle.titre", "Titre", SOCLE, "Maât : une matrice pour reconstruire l’ordre"),
    r("accueil.socle.corps", "Texte", SOCLE),
    s("accueil.socle.bouton", "Bouton (vers la Déclaration)", SOCLE, "Entrer dans la Déclaration sur Maât"),

    s("accueil.science.tag", "Étiquette", SCIENCE, "L’AMBITION SCIENTIFIQUE CENTRALE"),
    s("accueil.science.titre", "Titre", SCIENCE, "La Science Métamoderne"),
    r("accueil.science.corps", "Texte avant la première formule", SCIENCE),
    s("accueil.science.equation_1", "Première formule", SCIENCE, "K → M → K′ → Σ"),
    s(
      "accueil.science.mesure",
      "Paragraphe entre les deux formules",
      SCIENCE,
      "La mesure structurelle examine la cohérence des manifestations relativement à un référentiel explicite. Elle ne prétend pas mesurer directement le principe lui-même.",
    ),
    s(
      "accueil.science.equation_2",
      "Seconde formule",
      SCIENCE,
      "Manifestation → Référentiel → Mesure de cohérence → Structure génératrice",
    ),
    s(
      "accueil.science.bouton",
      "Bouton (vers la Note épistémologique)",
      SCIENCE,
      "Découvrir l’architecture de la Science Métamoderne",
    ),

    s(
      "accueil.diptyque_fondateur.titre",
      "Titre (les deux cartes des Tomes sont dans « Listes »)",
      DIPTYQUE,
      "Le diptyque fondateur : de Maât à la reconstruction du droit",
    ),

    s(
      "accueil.transmission.titre",
      "Titre",
      TRANSMISSION,
      "Transmettre à l’Afrique et au monde la capacité de reconstruire",
    ),
    r("accueil.transmission.corps", "Texte", TRANSMISSION),
    s(
      "accueil.transmission.bouton",
      "Bouton (vers la Transmission)",
      TRANSMISSION,
      "Découvrir l’ambition de transmission",
    ),

    s("accueil.rencontre.tag", "Étiquette", RENCONTRE, "RENCONTRE DOCTRINALE ET SCIENTIFIQUE"),
    s(
      "accueil.rencontre.titre",
      "Titre",
      RENCONTRE,
      "Première rencontre doctrinale et scientifique de Brazzaville",
    ),
    s(
      "accueil.rencontre.texte",
      "Texte",
      RENCONTRE,
      "La rencontre initialement envisagée à Brazzaville a été reportée faute de soutien financier. Sa préparation scientifique et institutionnelle se poursuit. Une nouvelle date sera annoncée lorsque les conditions de tenue seront réunies.",
    ),

    s("accueil.livre.titre", "Titre", LIVRE, "Le Livre des livres : une ambition encyclopédique universelle"),
    r("accueil.livre.corps", "Texte", LIVRE),

    s(
      "accueil.brazzaville.titre",
      "Titre",
      BRAZZA,
      "Brazzaville : lieu d’énonciation et de production théorique",
    ),
    r("accueil.brazzaville.corps", "Texte", BRAZZA),
  ],
  listes: [
    {
      nom: "tomes",
      label: "Le diptyque fondateur — cartes des Tomes",
      element: "Tome",
      aide: "Les deux cartes côte à côte (Tome I, Tome II). Champs facultatifs laissés vides : non affichés.",
      champs: [
        { nom: "etiquette", label: "Étiquette" },
        { nom: "designation", label: "Désignation de l’auteur sous l’étiquette (facultatif)", type: "zone" },
        { nom: "titre", label: "Titre" },
        { nom: "texte", label: "Texte", type: "zone" },
        { nom: "signature", label: "Signature en gras (facultatif)", type: "zone" },
        { nom: "bouton", label: "Libellé du bouton" },
        { nom: "lien", label: "Adresse du bouton (ex. /ouvrage)" },
      ],
      origine: [
        {
          etiquette: "TOME I · FONDEMENT ÉPISTÉMOLOGIQUE",
          designation: "",
          titre: "Maât : théorie de l’intelligibilité",
          texte:
            "Le Tome I expose l’Architecture Préalable, la formalisation Σ, la genèse de la connaissance, le principe de Non-Perte, la Méthode M, le Référentiel d’Intelligibilité et la possibilité d’une mesure structurelle.",
          signature: "",
          bouton: "Découvrir le Tome I",
          lien: "/ouvrage",
        },
        {
          etiquette: "TOME II · APPLICATION JURIDIQUE",
          designation: "Gaudéric MAMBOU, Juriste, Chercheur indépendant en épistémologie juridique",
          titre: "La saisine d’office, l’autosaisine et l’action positive du juge constitutionnel",
          texte:
            "Le Tome II part des difficultés du droit contemporain et montre comment la matrice de Maât permet de reconstruire les conditions d’intelligibilité de l’ordre juridique. Il examine la clôture procédurale, la chose jugée, la rectification et la proactivité judiciaire encadrée.",
          signature: "Gaudéric MAMBOU, Juriste, Chercheur indépendant en épistémologie juridique.",
          bouton: "Découvrir le Tome II",
          lien: "/ouvrage",
        },
      ],
    },
  ],
};

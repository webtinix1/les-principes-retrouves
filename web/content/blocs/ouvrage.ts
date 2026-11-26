import type { BlocDef, PageBlocs } from "./types";

/** Bloc « simple » (texte court sans mise en forme) avec son texte d'origine. */
const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle: `ouvrage.${cle}`,
  label,
  type: "simple",
  aide,
  defaut,
});

const SEO = "Référencement (Google)";
const ENTETE = "En-tête de page";
const INTRO = "Introduction, sous l’en-tête";
const TOME_I = "Carte « Tome I »";
const TOME_II = "Carte « Tome II »";
const LECTEUR =
  "Lecteur « Choisir un texte » — les textes eux-mêmes (extraits et lectures intégrales) se modifient dans Ouvrage › Textes des tomes";
const DIPTYQUE = "Section finale « Le diptyque »";

/**
 * Textes de la page Les ouvrages (/ouvrage), prototype maître V16. Les textes
 * des tomes (extraits et lectures intégrales) sont dans la collection
 * « Textes des tomes » ; les liens d'achat dans Boutique › Vente des ouvrages.
 */
export const OUVRAGE_BLOCS: PageBlocs = {
  page: "ouvrage",
  chemin: "/ouvrage",
  titre: "Les ouvrages",
  blocs: [
    s("seo.titre", "Titre (onglet et Google)", SEO, "Les ouvrages — Le diptyque : lire avant d’acquérir"),
    s(
      "seo.description",
      "Description (Google)",
      SEO,
      "Deux ouvrages autonomes et complémentaires : Maât, théorie de l’intelligibilité (Tome I) et sa portée en droit constitutionnel (Tome II). Extraits à lire.",
    ),

    s("entete.surtitre", "Surtitre", ENTETE, "Le diptyque · Lire avant d’acquérir"),
    s("entete.titre", "Titre de la page (H1)", ENTETE, "Les ouvrages"),
    s(
      "entete.texte",
      "Texte sous le titre",
      ENTETE,
      "Deux ouvrages autonomes et complémentaires. Des extraits substantiels permettent d’entrer dans leur démarche avant l’acquisition.",
    ),

    s(
      "intro.chapeau",
      "Chapeau",
      INTRO,
      "Le Tome I établit la théorie de l’intelligibilité. Le Tome II en confronte la portée dans le champ du droit constitutionnel. Le lecteur peut découvrir ci-dessous des passages liminaires et des extraits de chapitres avant d’accéder à la page d’achat.",
    ),
    s(
      "intro.statuts",
      "Statuts de lecture",
      INTRO,
      "Statuts de lecture : corpus établi · programme de recherche · recherche en cours · prospective.",
    ),

    s(
      "tome_i.couverture_alt",
      "Couverture — description de l’image",
      `${TOME_I} — pour lecteurs d’écran et Google`,
      "Première de couverture du Tome I — édition numérique stabilisée Pré-BAT, sans ISBN.",
    ),
    s("tome_i.rubrique", "Rubrique", TOME_I, "TOME I · OUVRAGE FONDATEUR"),
    s("tome_i.titre", "Titre", TOME_I, "Maât : théorie de l’intelligibilité"),
    s(
      "tome_i.description",
      "Description",
      TOME_I,
      "Le premier mouvement du diptyque : Architecture Préalable, pyramide Maât–Σ, genèse de la connaissance, principe de Non-Perte, Méthode M, Organon et Science Métamoderne.",
    ),
    s("tome_i.prix", "Prix", TOME_I, "69 €"),
    s("tome_i.prix_format", "Format (à côté du prix)", TOME_I, "édition numérique PDF"),
    s("tome_i.note", "Note sous le prix", TOME_I, "Prix de l’édition numérique PDF : 69 €. Prix papier non déterminé."),
    s(
      "tome_i.bouton",
      "Bouton d’achat",
      `${TOME_I} — ouvre le lien d’achat saisi dans Boutique › Vente des ouvrages (inactif tant qu’il est vide)`,
      "Accéder à l’achat du Tome I",
    ),

    s(
      "tome_ii.couverture_alt",
      "Couverture — description de l’image",
      `${TOME_II} — pour lecteurs d’écran et Google`,
      "Première de couverture du Tome II — Les Principes Retrouvés, La saisine d’office, l’autosaisine et l’action positive du juge constitutionnel.",
    ),
    s("tome_ii.rubrique", "Rubrique", TOME_II, "TOME II · APPLICATION JURIDIQUE"),
    s(
      "tome_ii.auteur",
      "Auteur",
      TOME_II,
      "Gaudéric MAMBOU, Juriste, Chercheur indépendant en épistémologie juridique",
    ),
    s(
      "tome_ii.titre",
      "Titre",
      TOME_II,
      "La saisine d’office, l’autosaisine et l’action positive du juge constitutionnel",
    ),
    s(
      "tome_ii.sous_titre",
      "Sous-titre (en italique)",
      TOME_II,
      "Théorie générale et formalisation d’un principe universel de proactivité judiciaire encadrée.",
    ),
    s(
      "tome_ii.description",
      "Description",
      TOME_II,
      "Le second mouvement : laboratoire congolais, théorie de la clôture procédurale, comparaisons juridictionnelles, Rivonia et arsenal opérationnel.",
    ),
    s("tome_ii.prix", "Prix", TOME_II, "59 €"),
    s("tome_ii.prix_format", "Format (à côté du prix)", TOME_II, "édition numérique PDF"),
    s("tome_ii.note", "Note sous le prix", TOME_II, "Prix de l’édition numérique PDF : 59 €. Prix papier non déterminé."),
    s(
      "tome_ii.bouton",
      "Bouton d’achat",
      `${TOME_II} — ouvre le lien d’achat saisi dans Boutique › Vente des ouvrages (inactif tant qu’il est vide)`,
      "Accéder à l’achat du Tome II",
    ),

    s("lecteur.titre", "Titre", LECTEUR, "Choisir un texte"),
    s(
      "lecteur.chapeau",
      "Chapeau",
      LECTEUR,
      "Choisissez un tome, puis le texte à consulter. Un seul texte est présenté à la fois.",
    ),
    s("lecteur.tome_i", "Onglet et intertitre « TOME I »", LECTEUR, "TOME I"),
    s("lecteur.tome_ii", "Onglet et intertitre « TOME II »", LECTEUR, "TOME II"),
    s("lecteur.tomes_aria", "Groupe des onglets — libellé pour lecteurs d’écran", LECTEUR, "Choisir un tome"),
    s(
      "lecteur.consigne",
      "Consigne",
      LECTEUR,
      "Sélectionnez un texte dans la liste. Son contenu s’affichera seul dans l’espace de lecture.",
    ),
    s("lecteur.textes_aria", "Liste des textes — libellé pour lecteurs d’écran", LECTEUR, "Choisir un texte"),
    s("lecteur.lire_integral", "Bouton « Lire le texte intégral »", LECTEUR, "Lire le texte intégral"),
    s("lecteur.ouvrir_integral", "Mention « Ouvrir le texte intégral »", `${LECTEUR} — en tête de chaque lecture intégrale`, "Ouvrir le texte intégral"),
    s("lecteur.retour", "Bouton de retour", `${LECTEUR} — barre au-dessus d’une lecture intégrale`, "← Retour à la sélection des textes"),
    s(
      "lecteur.note",
      "Note sous le lecteur",
      LECTEUR,
      "Les textes liminaires, les chapitres sélectionnés et les conclusions sont accessibles dans leur intégralité. Chaque extrait ouvre directement le texte auquel il se rapporte.",
    ),

    s("diptyque.titre", "Titre", DIPTYQUE, "Le diptyque : premier corpus démonstratif du Livre des livres"),
    s(
      "diptyque.tome_i",
      "Paragraphe « Tome I »",
      DIPTYQUE,
      "Le Tome I — Maât : théorie de l’intelligibilité établit l’architecture théorique, la genèse de la connaissance, le Canon de la découverte, le principe de Non-Perte, la Méthode M et la fonction de l’Organon.",
    ),
    s(
      "diptyque.tome_ii",
      "Paragraphe « Tome II »",
      DIPTYQUE,
      "Le Tome II — La saisine d’office, l’autosaisine et l’action positive du juge constitutionnel confronte cette architecture au champ du droit constitutionnel. Il part de l’expérience congolaise différenciée, construit la question scientifique, puis engage les comparaisons et la formalisation d’une proactivité judiciaire encadrée.",
    ),
    s(
      "diptyque.corpus",
      "Paragraphe final",
      DIPTYQUE,
      "Ces deux ouvrages forment le premier corpus public du programme encyclopédique. Ils ne prétendent pas épuiser les domaines auxquels la recherche pourra ultérieurement s’étendre.",
    ),
  ],
};

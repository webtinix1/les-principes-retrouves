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
const S1 = "Section 1 — L’argumentaire de la souveraineté";
const S2 = "Section 2 — La Boucle Vertueuse";
const S3 = "Section 3 — La grille des modules";
const S4 = "Section 4 — Paiement";
const S5 = "Section 5 — Secrétariat International (colonne de gauche)";
const S5_FORM = "Section 5 — Secrétariat International (encadré du formulaire)";
const CLOTURE = "Clôture de page";
const SEO = "Référencement (Google)";

/** Blocs éditables de la page La Transmission — formations. */
export const TRANSMISSION_BLOCS: PageBlocs = {
  page: "transmission",
  chemin: "/transmission",
  titre: "La Transmission — formations",
  blocs: [
    s("transmission.hero.titre", "Titre de la page (H1)", ENTETE, "Transmission & Inscriptions"),
    s(
      "transmission.hero.sous_titre",
      "Sous-titre",
      ENTETE,
      "L’émancipation intellectuelle et l’arsenal de Rang A",
    ),
    s("transmission.hero.bouton_comparer", "Bouton « Comparer les trois modules »", ENTETE, "Comparer les trois modules"),
    s("transmission.hero.bouton_secretariat", "Bouton « Écrire au Secrétariat »", ENTETE, "Écrire au Secrétariat"),
    s(
      "transmission.hero.exergue",
      "Exergue",
      ENTETE,
      "« L’esprit humain, trop longtemps livré à son propre sort, abandonné à son propre dénuement face à l’émiettement du savoir et à la fiction de clôture des disciplines, trouve ici les conditions de sa souveraineté retrouvée. L’Institut de Brazzaville ne propose pas une adhésion à un dogme, mais la mise à disposition d’un Organon de réintégration. Acquérir cet arsenal, c’est cesser de subir la fragmentation pour commencer à calculer la cohérence. »",
    ),
    s("transmission.sommaire.boucle", "Sommaire — La Boucle Vertueuse", SOMMAIRE, "La Boucle Vertueuse"),
    s("transmission.sommaire.grille", "Sommaire — La grille des modules", SOMMAIRE, "La grille des modules"),
    s("transmission.sommaire.paiement", "Sommaire — Paiement", SOMMAIRE, "Paiement sécurisé"),
    s("transmission.argumentaire.titre", "Titre de section (H2)", S1, "L’argumentaire de la souveraineté"),
    {
      cle: "transmission.argumentaire.corps",
      label: "L'argumentaire de la souveraineté",
      type: "riche",
      aide: "Ouverture",
    },
    s(
      "transmission.boucle.titre",
      "Titre de section (H2)",
      S2,
      "La Boucle Vertueuse : Formation → Accès à l’Arsenal",
    ),
    {
      cle: "transmission.boucle.corps",
      label: "La Boucle Vertueuse — texte",
      type: "riche",
      aide: `${S2} — à droite du titre`,
    },
    s(
      "transmission.boucle.schema_aria",
      "Schéma — description pour les lecteurs d'écran",
      `${S2} — texte invisible lu par les lecteurs d'écran`,
      "Les trois niveaux d’accès à l’arsenal",
    ),
    s(
      "transmission.boucle.legende",
      "Légende du parcours",
      `${S2} — sous les quatre étapes`,
      "Le parcours de l’inscrit, de la Transmission au Laboratoire Doctrinal.",
    ),
    s(
      "transmission.boucle.doctrine",
      "Phrase de doctrine",
      `${S2} — paragraphe sous le schéma`,
      "Cette architecture respecte la doctrine scellée : l’universel n’a pas de centre géographique, mais il a une exigence de rigueur. L’accès aux outils opérationnels est subordonné à la maîtrise préalable des fondements épistémologiques.",
    ),
    s("transmission.grille.titre", "Titre de section (H2)", S3, "La grille des modules de formation"),
    {
      cle: "transmission.modules.corps",
      label: "La grille des modules — chapeau",
      type: "riche",
      aide: "Modules de formation",
    },
    s(
      "transmission.grille.note",
      "Note sur le régime B2B / B2C",
      `${S3} — sous le tableau des modules`,
      "Le régime (B2B ou B2C) se choisit à l’étape suivante, sur le formulaire d’inscription.",
    ),
    s("transmission.paiement.titre", "Titre de section (H2)", S4, "Passerelle de paiement sécurisée et souveraine"),
    {
      cle: "transmission.paiement.corps",
      label: "Passerelle de paiement — texte",
      type: "riche",
      aide: "Bas de page",
    },
    s(
      "transmission.paiement.frais",
      "Phrase sur les frais",
      `${S4} — sous les moyens de paiement`,
      "Aucun frais n’est indexé sur le principe de non-imposition de l’École. Les fonds collectés alimentent exclusivement le Programme de Recherche, les archives numériques et la formation des chercheurs indépendants du Sud global.",
    ),
    s("transmission.contact.titre", "Titre de section (H2)", S5, "Secrétariat International"),
    s("transmission.contact.sous_titre", "Sous-titre", S5, "Coordonnées et Liaison Scientifique"),
    s("transmission.contact.siege.titre", "Le Siège — titre", S5, "Le Siège — Institut de Brazzaville"),
    s(
      "transmission.contact.siege.ligne_1",
      "Le Siège — ligne 1",
      S5,
      "Autorité Épistémique Suprême de la Science Métamoderne",
    ),
    s("transmission.contact.siege.ligne_2", "Le Siège — ligne 2 (ville)", S5, "Brazzaville, République du Congo"),
    s(
      "transmission.contact.siege.ligne_3",
      "Le Siège — ligne 3 (petits caractères)",
      S5,
      "Siège de l’Autorité de Certification et du Corpus Fondateur",
    ),
    s(
      "transmission.contact.antenne.titre",
      "L'Antenne — titre",
      S5,
      "L’Antenne de Recherche — Liaison Scientifique et Académique",
    ),
    s("transmission.contact.antenne.ligne_1", "L'Antenne — ligne 1 (ville)", S5, "Dakar, Sénégal"),
    s(
      "transmission.contact.antenne.ligne_2",
      "L'Antenne — ligne 2 (petits caractères)",
      S5,
      "Pôle de recherche interdisciplinaire et de dialogue avec les écoles de pensée africaines",
    ),
    s("transmission.contact.numerique.titre", "Contact numérique — intitulé", S5, "Contact numérique"),
    s(
      "transmission.contact.numerique.email",
      "Contact numérique — adresse e-mail (aussi utilisée pour le lien)",
      S5,
      "contact@lesprincipesretrouves.cg",
    ),
    s("transmission.contact.numerique.site", "Contact numérique — site", S5, "www.lesprincipesretrouves.cg"),
    s("transmission.demande.titre", "Titre de l'encadré", S5_FORM, "Adresser une demande"),
    s(
      "transmission.demande.texte",
      "Texte de l'encadré",
      S5_FORM,
      "Toute correspondance scientifique, institutionnelle ou relative aux modules peut être adressée au Secrétariat International.",
    ),
    s(
      "transmission.cloture.citation",
      "Citation de clôture",
      CLOTURE,
      "« Ces concepts ne demandent pas à être acceptés sur autorité. Ils demandent à être éprouvés dans la rigueur de leur application. »",
    ),
    s("transmission.cloture.lien", "Lien vers la Déclaration", CLOTURE, "Déposer une déclaration d’épreuve"),
    s("transmission.seo.titre", "Titre (référencement)", SEO, "Transmission & Inscriptions"),
    s(
      "transmission.seo.description",
      "Description (référencement)",
      SEO,
      "L'enseignement, l'arsenal opérationnel et le secrétariat international : trois modules de formation, la boucle vertueuse et les coordonnées de l'Institut.",
    ),
  ],
  listes: [
    {
      nom: "niveaux",
      label: "La Boucle Vertueuse — les trois niveaux d’accès",
      element: "Niveau",
      aide: `${S2} — trois cartes, de gauche à droite (la mise en forme dépend du rang : claire, encadrée, sombre). Dans un accès, le texte avant « → » s'affiche en gras.`,
      champs: [
        { nom: "niveau", label: "Surtitre (« Niveau 1 »)" },
        { nom: "titre", label: "Titre" },
        { nom: "sous_titre", label: "Sous-titre" },
        { nom: "acces", label: "Accès (une ligne par puce)", type: "lignes" },
        {
          nom: "condition",
          label: "Condition, affichée sur la flèche qui mène à ce niveau (une ligne par ligne ; vide pour le premier)",
          type: "lignes",
        },
      ],
      origine: [
        {
          niveau: "Niveau 1",
          titre: "Accès libre",
          sous_titre: "Diffusion doctrinale",
          acces: [
            "Résumés exécutifs des Working Papers",
            "Présentation des Concepts Stabilisés",
            "Extraits de l’Arrêt Pilote (considérants uniquement)",
          ],
          condition: [],
        },
        {
          niveau: "Niveau 2",
          titre: "Accès conditionné",
          sous_titre: "Par l’inscription aux modules",
          acces: [
            "Module I validé → Accès aux Working Papers intégraux (WP-01, WP-02, WP-03)",
            "Module II validé → Accès au Guide Technique d’Invocation intégral + Arrêt Pilote intégral commenté",
          ],
          condition: ["Module I", "ou II validé"],
        },
        {
          niveau: "Niveau 3",
          titre: "Accès premium",
          sous_titre: "Module III",
          acces: [
            "Modèles d’actes juridictionnels personnalisés",
            "Conseil stratégique sur mesure",
            "Accès privilégié au Programme de Recherche",
          ],
          condition: ["Module III"],
        },
      ],
    },
    {
      nom: "etapes",
      label: "La Boucle Vertueuse — les quatre étapes du parcours",
      element: "Étape",
      aide: `${S2} — frise sous les trois niveaux. Un code « EBZ-… » s'affiche en police à chasse fixe.`,
      champs: [
        { nom: "cap", label: "Repère (« 1 · Transmission »)" },
        { nom: "texte", label: "Texte" },
      ],
      origine: [
        { cap: "1 · Transmission", texte: "S’inscrire à un module" },
        { cap: "2 · Formation", texte: "Valider le module" },
        { cap: "3 · Confirmation", texte: "Recevoir le code EBZ-XXXX-XXXX" },
        { cap: "4 · Laboratoire", texte: "Saisir le code, l’arsenal se débloque" },
      ],
    },
    {
      nom: "acces_modules",
      label: "La grille des modules — accès débloqué par chaque module",
      element: "Module",
      aide: `${S3} — ligne « Accès » du tableau, dans l’ordre des modules (I, II, III)`,
      champs: [{ nom: "texte", label: "Accès débloqué" }],
      origine: [
        { texte: "Working Papers intégraux (WP-01, WP-02, WP-03)" },
        { texte: "Guide Technique d’Invocation intégral + Arrêt Pilote intégral commenté" },
        { texte: "Modèles d’actes, conseil stratégique, Programme de Recherche" },
      ],
    },
    {
      nom: "moyens_paiement",
      label: "Paiement — les moyens acceptés",
      element: "Moyen de paiement",
      aide: `${S4} — trois colonnes (icônes dans l'ordre : mobile, carte, devises)`,
      champs: [
        { nom: "titre", label: "Intitulé" },
        { nom: "detail", label: "Détail", type: "zone" },
      ],
      origine: [
        { titre: "Mobile Money (Zone CEMAC et Afrique)", detail: "MTN, Airtel, Orange, Moov." },
        { titre: "Cartes Bancaires Internationales", detail: "Visa, Mastercard (Europe, Amériques, Asie, Afrique)." },
        {
          titre: "Devises",
          detail: "Euro (EUR) et Franc CFA (XAF), avec conversion automatique au taux officiel.",
        },
      ],
    },
  ],
};

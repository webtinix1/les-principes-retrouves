import type { BlocDef, PageBlocs } from "./types";

const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle,
  label,
  type: "simple",
  aide,
  defaut,
});

const ENTETE = "En-tête de page";
const OBJET = "L'objet unique — l'Intelligibilité";
const ARCHI = "Architecture institutionnelle";
const SOUV = "Le Principe de Souveraineté du Démontré";
const PRIV = "Le Privilège Optique de Brazzaville";
const DEMARCHE = "La démarche épistémologique";
const CLOTURE = "Appel à l'épreuve (clôture)";

/**
 * Blocs éditables de la page L'École de Brazzaville. Les listes (sept niveaux,
 * mouvement organique, Canon, autorités) sont déclarées dans
 * `payload/globals/listes.ts`.
 */
export const INSTITUTION_BLOCS: PageBlocs = {
  page: "institution",
  chemin: "/institution",
  titre: "L'École de Brazzaville",
  blocs: [
    s("institution.seo.titre", "Titre de la page (SEO)", "Référencement (Google)", "L'Institution"),
    s(
      "institution.seo.description",
      "Description de la page (SEO)",
      "Référencement (Google)",
      "L'École de Brazzaville et le Programme de recherche de la Science Métamoderne : architecture à sept niveaux, souveraineté du démontré, privilège optique.",
    ),
    s("institution.hero.titre", "Titre principal (H1)", ENTETE, "L’Institution"),
    s(
      "institution.hero.sous_titre",
      "Sous-titre",
      ENTETE,
      "L’École de Brazzaville et le Programme de recherche de la Science Métamoderne",
    ),
    s(
      "institution.hero.exergue",
      "Exergue",
      ENTETE,
      "« La Science Métamoderne n’est pas d’abord un ensemble de connaissances ; elle est une méthode d’institution durable de l’intelligibilité. »",
    ),

    // 1 — L'objet unique
    s(
      "institution.objet.titre",
      "Titre de section (H2, repris dans « Sur cette page »)",
      OBJET,
      "L’objet unique — l’Intelligibilité",
    ),
    {
      cle: "institution.objet.corps",
      label: "L'objet unique — corps de texte",
      type: "riche",
      aide: OBJET,
    },
    s("institution.objet.formule_etiquette", "Étiquette de la formule canonique", OBJET, "Formule canonique de démarcation"),
    s(
      "institution.objet.formule_citation",
      "Formule canonique de démarcation — citation",
      OBJET,
      "« Le métamodernisme culturel cherche à dépasser le conflit entre l’unité et la multiplicité ; la Science Métamoderne cherche à comprendre ce qui rend possible leur intelligibilité commune. »",
    ),
    {
      cle: "institution.objet.distinction",
      label: "L'objet unique — la distinction de niveau logique",
      type: "riche",
      aide: OBJET,
    },

    // 2 — Architecture
    s(
      "institution.architecture.titre",
      "Titre de section (H2, repris dans « Sur cette page »)",
      ARCHI,
      "L’architecture institutionnelle à sept niveaux",
    ),
    {
      cle: "institution.architecture.corps",
      label: "L'architecture à sept niveaux — corps de texte",
      type: "riche",
      aide: ARCHI,
    },
    s(
      "institution.architecture.schema_lecture",
      "Schéma des niveaux — lecture pour lecteurs d’écran (aria-label)",
      ARCHI,
      "Les sept niveaux",
    ),
    s(
      "institution.architecture.niveau_etiquette",
      "Étiquette d’un niveau",
      `${ARCHI} — {numero} = numéro romain du niveau`,
      "Niveau {numero}",
    ),
    s("institution.architecture.fonction", "Libellé « Fonction »", ARCHI, "Fonction :"),
    s(
      "institution.architecture.question",
      "Libellé « Question fondamentale »",
      ARCHI,
      "Question fondamentale :",
    ),
    s(
      "institution.architecture.maxime",
      "Présentation de la maxime d’un niveau",
      `${ARCHI} — {maxime} = la maxime du niveau`,
      "« {maxime} »",
    ),
    s(
      "institution.architecture.mouvement_intro",
      "Introduction du mouvement organique (en gras)",
      ARCHI,
      "Ces sept niveaux ne sont pas juxtaposés. Ils forment un seul mouvement organique, analogue aux fonctions vitales d’un organisme vivant :",
    ),

    // 3 — Souveraineté du Démontré
    s(
      "institution.souverainete.titre",
      "Titre de section (H2, repris dans « Sur cette page »)",
      SOUV,
      "Le Principe de Souveraineté du Démontré",
    ),
    {
      cle: "institution.souverainete.corps",
      label: "Souveraineté du Démontré — corps de texte",
      type: "riche",
      aide: SOUV,
    },
    s(
      "institution.souverainete.encadre_titre",
      "Encadré — titre (H3)",
      SOUV,
      "Principe de Souveraineté du Démontré",
    ),
    {
      cle: "institution.souverainete.encadre",
      label: "Encadré — énoncé du principe",
      type: "riche",
      aide: SOUV,
    },
    {
      cle: "institution.souverainete.portee",
      label: "Souveraineté du Démontré — portée du principe",
      type: "riche",
      aide: SOUV,
    },

    // 4 — Privilège Optique
    s(
      "institution.privilege_optique.titre",
      "Titre de section (H2, repris dans « Sur cette page »)",
      PRIV,
      "Le Privilège Optique de Brazzaville",
    ),
    {
      cle: "institution.privilege_optique.corps",
      label: "Le Privilège Optique — corps de texte",
      type: "riche",
      aide: PRIV,
    },
    s(
      "institution.privilege_optique.lignee_titre",
      "La Lignée des Précurseurs — titre (H3)",
      PRIV,
      "L’Universalité de la Lignée des Précurseurs",
    ),
    {
      cle: "institution.privilege_optique.lignee",
      label: "La Lignée des Précurseurs — texte",
      type: "riche",
      aide: PRIV,
    },
    s(
      "institution.privilege_optique.autorites_titre",
      "Les autorités de convergence — titre (H3)",
      PRIV,
      "Les autorités de convergence épistémologique",
    ),
    s(
      "institution.privilege_optique.champ",
      "Présentation d’un champ disciplinaire",
      `${PRIV} — {champ} = nom du champ`,
      "{champ} :",
    ),
    s(
      "institution.privilege_optique.origine",
      "Présentation de l’origine d’une autorité",
      `${PRIV} — {origine} = pays d’origine`,
      "({origine})",
    ),

    // 5 — Démarche
    s(
      "institution.demarche.titre",
      "Titre de section (H2, repris dans « Sur cette page »)",
      DEMARCHE,
      "La démarche épistémologique",
    ),
    {
      cle: "institution.demarche.equation",
      label: "La démarche — l'équation systémique",
      type: "riche",
      aide: DEMARCHE,
    },
    s("institution.demarche.formule_sigma", "Formule Σ", DEMARCHE, "Σ = M(F(V(Σ)))"),
    s(
      "institution.demarche.formule_sigma_lecture",
      "Formule Σ — lecture pour lecteurs d’écran",
      DEMARCHE,
      "Sigma égale M de F de V de Sigma",
    ),
    {
      cle: "institution.demarche.transposition",
      label: "La démarche — la transposition",
      type: "riche",
      aide: DEMARCHE,
    },
    s("institution.demarche.formule_maat", "Formule Maât", DEMARCHE, "Maât = M(F(V(Maât)))"),
    s(
      "institution.demarche.formule_maat_lecture",
      "Formule Maât — lecture pour lecteurs d’écran",
      DEMARCHE,
      "Maât égale M de F de V de Maât",
    ),
    {
      cle: "institution.demarche.analogie",
      label: "La démarche — au-delà de l'analogie",
      type: "riche",
      aide: DEMARCHE,
    },
    s(
      "institution.demarche.canon_titre",
      "Le Canon — titre (H3)",
      DEMARCHE,
      "La démarche épistémologique obéit au Canon de la Découverte en sept principes :",
    ),
    {
      cle: "institution.demarche.canon",
      label: "La démarche — le Canon",
      type: "riche",
      aide: DEMARCHE,
    },

    // Clôture
    s("institution.cloture.titre", "Titre (H2)", CLOTURE, "Appel à l’épreuve"),
    s(
      "institution.cloture.citation_1",
      "Citation — première ligne",
      CLOTURE,
      "« La Science Métamoderne ne demande aucune adhésion préalable. Elle invite à une enquête. Elle ne sollicite pas une croyance. Elle propose une méthode.",
    ),
    s(
      "institution.cloture.citation_2",
      "Citation — seconde ligne",
      CLOTURE,
      "Ce travail ne demande pas à être accepté sur autorité. Il demande à être éprouvé. »",
    ),
    s(
      "institution.cloture.bouton_constitution",
      "Bouton vers la Constitution",
      CLOTURE,
      "Lire la Constitution Scientifique",
    ),
    s("institution.cloture.bouton_manifeste", "Bouton vers le Manifeste", CLOTURE, "Découvrir le Manifeste"),
    s("institution.cloture.bouton_ouvrage", "Bouton vers l’Ouvrage", CLOTURE, "Explorer l’Ouvrage"),
  ],
};

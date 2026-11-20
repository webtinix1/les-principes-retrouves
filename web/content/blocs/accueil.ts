import type { BlocDef, PageBlocs } from "./types";

const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle,
  label,
  type: "simple",
  aide,
  defaut,
});

const OUVERTURE = "Ouverture — ciel nocturne";
const PYRAMIDE = "Ouverture — la Pyramide de Σ";
const AXIOME = "Section — Axiome";
const PORTES = "Section — Par où entrer";
const PLAN = "Section — L’œuvre en dix pages";
const CLOTURE = "Clôture de la page";
const SEO = "Référencement (Google)";

/** Textes de la page 1 — L'Accueil (le Seuil). */
export const ACCUEIL_BLOCS: PageBlocs = {
  page: "accueil",
  chemin: "/accueil",
  titre: "Accueil (le Seuil)",
  blocs: [
    s("accueil.seo.titre", "Titre de la page (SEO)", SEO, "Le Seuil — Inauguration d'une Autre Ère de la Connaissance"),
    s(
      "accueil.seo.description",
      "Description de la page (SEO)",
      SEO,
      "Le Fronton de la Science Métamoderne. Σ = M(F(V(Σ))) : le réel est voilé pour tous, filtré pour certains, et reconstructible par la méthode.",
    ),

    // Ouverture
    s(
      "accueil.ouverture.dedicace",
      "Dédicace",
      OUVERTURE,
      "À l’Esprit Humain Souverain, à la Conscience Retrouvée de Kemet, à l’Effectivité sans Faille de l’Ordre Juste.",
    ),
    s("accueil.ouverture.surtitre", "Surtitre", OUVERTURE, "01 / 10 · Le Seuil"),
    s(
      "accueil.ouverture.titre",
      "Titre principal (H1)",
      `${OUVERTURE} — les mots apparaissent un à un (séparés par les espaces)`,
      "Science Métamoderne : la science de l’intelligibilité",
    ),
    s(
      "accueil.ouverture.citation",
      "Citation sous le titre",
      OUVERTURE,
      "« Le réel est voilé pour tous, filtré pour certains, et reconstructible par la méthode. »",
    ),
    s(
      "accueil.ouverture.formules_lecture",
      "Formules — lecture pour lecteurs d’écran (aria-label)",
      OUVERTURE,
      "Formules : Σ = M(F(V(Σ))) et Maât = M(F(V(Maât)))",
    ),
    s("accueil.ouverture.formule_sigma", "Formule 1", OUVERTURE, "Σ = M(F(V(Σ)))"),
    s("accueil.ouverture.formule_maat", "Formule 2", OUVERTURE, "Maât = M(F(V(Maât)))"),
    s(
      "accueil.ouverture.bouton_institut",
      "Bouton « Entrer dans l’Institut » (ouverture et clôture)",
      OUVERTURE,
      "Entrer dans l’Institut de Brazzaville",
    ),
    s("accueil.ouverture.bouton_tomes", "Bouton « Lire les tomes »", OUVERTURE, "Lire les tomes"),

    // Pyramide de Σ (composant interactif)
    s("accueil.pyramide.titre", "Titre de la Pyramide", PYRAMIDE, "La Pyramide de Σ"),
    s(
      "accueil.pyramide.consigne",
      "Consigne",
      PYRAMIDE,
      "Survolez, touchez ou parcourez au clavier chaque niveau.",
    ),
    s("accueil.pyramide.axe_descendant", "Axe gauche — titre", PYRAMIDE, "Mouvement descendant"),
    s("accueil.pyramide.axe_descendant_legende", "Axe gauche — légende", PYRAMIDE, "Manifestation"),
    s("accueil.pyramide.axe_ascendant", "Axe droit — titre", PYRAMIDE, "Mouvement ascendant"),
    s(
      "accueil.pyramide.axe_ascendant_legende",
      "Axe droit — légende",
      PYRAMIDE,
      "Réintégration par la Méthode M",
    ),
    s(
      "accueil.pyramide.groupe_lecture",
      "Groupe des niveaux — lecture pour lecteurs d’écran (aria-label)",
      PYRAMIDE,
      "Niveaux de la Pyramide de Σ",
    ),
    s(
      "accueil.pyramide.position",
      "Position du niveau affiché",
      `${PYRAMIDE} — {n} = numéro du niveau, {total} = nombre de niveaux`,
      "Niveau {n} sur {total}",
    ),
    s(
      "accueil.pyramide.symbole_vide",
      "Symbole affiché pour un niveau sans symbole",
      PYRAMIDE,
      "⟷",
    ),
    s("accueil.pyramide.lien_entree", "Lien vers l’entrée complète", PYRAMIDE, "lire l’entrée complète"),

    // Axiome
    s(
      "accueil.axiome.citation",
      "Citation",
      AXIOME,
      "« Ce qui structure le Réel ne peut disparaître : l’Univers ne s’anéantit pas, il s’occulte. »",
    ),
    s("accueil.axiome.titre", "Titre de l’encadré (H2)", AXIOME, "Axiome Absolu de Non-Perte"),
    s(
      "accueil.axiome.texte",
      "Texte de l’encadré",
      AXIOME,
      "L’Unité Structurelle (Σ / Maât) préexiste à l’expérience. Elle traverse la fragmentation du Voile (V), survit à l’opacité du Filtrage (F), et se réactive intégralement par la puissance correctrice de la Méthode M.",
    ),

    // Par où entrer
    s("accueil.portes.titre", "Titre (H2)", PORTES, "Par où entrer"),
    s("accueil.portes.sous_titre", "Sous-titre", PORTES, "Trois portes, selon ce que vous venez chercher"),

    // L'œuvre en dix pages
    s("accueil.plan.titre", "Titre (H2)", PLAN, "L’œuvre en dix pages"),
    s(
      "accueil.plan.chapeau",
      "Chapeau",
      PLAN,
      "L’ordre du menu est l’ordre de lecture. Chaque page renvoie à la suivante.",
    ),
    s(
      "accueil.plan.famille_seuil",
      "Libellé de la première colonne (famille « Le Seuil »)",
      PLAN,
      "Seuil",
    ),

    // Clôture
    s(
      "accueil.cloture.citation",
      "Citation de clôture",
      CLOTURE,
      "« Ce travail ne demande pas à être accepté sur autorité. Il demande à être éprouvé. »",
    ),
    s("accueil.cloture.locus", "Locus", CLOTURE, "LOCUS : BRAZZAVILLE — JUILLET 2026"),
    s("accueil.cloture.page_suivante", "Page suivante — surtitre", CLOTURE, "Page suivante · 02"),
    s("accueil.cloture.page_suivante_titre", "Page suivante — titre", CLOTURE, "L’Institution"),
  ],
  listes: [
    {
      nom: "niveaux_pyramide",
      label: "Pyramide de Σ — les six niveaux",
      element: "Niveau",
      aide: `${PYRAMIDE} — du sommet à la base. Le libellé peut tenir sur deux lignes (retour à la ligne).`,
      champs: [
        { nom: "symbole", label: "Symbole (dans la tranche)" },
        { nom: "libelle", label: "Libellé de la tranche", type: "zone" },
        { nom: "nom", label: "Nom (titre de la définition)" },
        { nom: "formule", label: "Formule" },
        { nom: "definition", label: "Définition", type: "zone" },
        { nom: "source_libelle", label: "Source — libellé du lien" },
        { nom: "source_lien", label: "Source — adresse du lien" },
      ],
      origine: [
        {
          symbole: "Σ",
          libelle: "Substratum commun",
          nom: "Substratum Commun",
          formule: "Σ = M(F(V(Σ)))",
          definition:
            "L'Unité Structurelle Absolue, antérieure à toute manifestation et à toute connaissance.",
          source_libelle: "Concepts stabilisés, 01",
          source_lien: "/concepts#substratum_commun",
        },
        {
          symbole: "π₁ ↔ π₂",
          libelle: "Polarités",
          nom: "Polarités complémentaires",
          formule: "π₁ ↔ π₂",
          definition: "Distinction (π₁) et relation (π₂), en tension simultanée.",
          source_libelle: "Concepts stabilisés, 01",
          source_lien: "/concepts#substratum_commun",
        },
        {
          symbole: "",
          libelle: "Charnière\nontologique",
          nom: "Charnière Ontologique",
          formule: "Principiel → Phénoménal",
          definition: "Seuil critique de conversion du principiel en phénoménal.",
          source_libelle: "Concepts stabilisés, 10",
          source_lien: "/concepts#conversion_principiel_phenomenal",
        },
        {
          symbole: "V",
          libelle: "Voile ontologique",
          nom: "Voile Ontologique",
          formule: "S = V(Σ)",
          definition: "Condition universelle et nécessaire de toute manifestation.",
          source_libelle: "Concepts stabilisés, 03",
          source_lien: "/concepts#voile_ontologique",
        },
        {
          symbole: "F",
          libelle: "Filtrage sélectif",
          nom: "Filtrage Sélectif",
          formule: "K = F(S) = F(V(Σ))",
          definition: "Tri institutionnel qui sédimente le savoir ordinaire.",
          source_libelle: "Concepts stabilisés, 04",
          source_lien: "/concepts#filtrage_selectif",
        },
        {
          symbole: "S",
          libelle: "Monde observable",
          nom: "Monde Observable (S)",
          formule: "S",
          definition: "Fragmentation phénoménale, base de la remontée épistémologique.",
          source_libelle: "Note épistémologique",
          source_lien: "/note-epistemologique",
        },
      ],
    },
    {
      nom: "portes",
      label: "Par où entrer — les trois portes",
      element: "Porte",
      aide: PORTES,
      champs: [
        { nom: "etiquette", label: "Étiquette" },
        { nom: "titre", label: "Titre" },
        { nom: "texte", label: "Texte", type: "zone" },
        { nom: "action", label: "Libellé de l’action" },
        { nom: "lien", label: "Adresse du lien" },
      ],
      origine: [
        {
          etiquette: "Lire · 06 L’Ouvrage",
          titre: "Les Principes Retrouvés",
          texte:
            "Le diptyque, de l’axiomatique pure à l’application juridictionnelle. Les textes liminaires du Tome I, le liminaire et trois chapitres du Tome II sont en accès libre.",
          action: "Ouvrir les tomes",
          lien: "/ouvrage",
        },
        {
          etiquette: "Comprendre · 02 Institution",
          titre: "L’École de Brazzaville",
          texte:
            "Son objet unique, l’Intelligibilité, son architecture à sept niveaux, puis la Constitution, le Manifeste et la Note épistémologique qui la fondent.",
          action: "Découvrir l’Institution",
          lien: "/institution",
        },
        {
          etiquette: "Se former · 09 Transmission",
          titre: "Trois modules",
          texte:
            "Pour chercheurs, magistrats, avocats et institutions. Chaque module validé ouvre un niveau d’accès au Laboratoire Doctrinal.",
          action: "Comparer les modules",
          lien: "/transmission#grille",
        },
      ],
    },
    {
      nom: "resumes",
      label: "L’œuvre en dix pages — titres et résumés",
      element: "Page",
      aide: `${PLAN} — l’identifiant de page (page_id) relie le résumé à sa page : ne pas le modifier.`,
      champs: [
        { nom: "page_id", label: "Identifiant de page (ne pas modifier)" },
        { nom: "titre", label: "Titre" },
        { nom: "resume", label: "Résumé" },
      ],
      origine: [
        { page_id: "seuil", titre: "Accueil", resume: "Pyramide de Σ, axiome" },
        { page_id: "institution", titre: "L’Institution", resume: "Objet, architecture à 7 niveaux, démarche" },
        { page_id: "constitution", titre: "Constitution", resume: "Préambule, 10 articles, disposition finale" },
        { page_id: "manifeste", titre: "Manifeste", resume: "Matrice de la Maât, 7 articles" },
        { page_id: "note_epistemologique", titre: "Note épistémologique", resume: "Canon en 7 étapes" },
        { page_id: "ouvrage", titre: "L’Ouvrage", resume: "Diptyque, tomes en accès libre" },
        { page_id: "laboratoire", titre: "Laboratoire", resume: "Working Papers, code d’accès" },
        { page_id: "concepts", titre: "Concepts", resume: "20 concepts en 4 strates" },
        { page_id: "transmission", titre: "Transmission", resume: "3 modules, inscription" },
        { page_id: "declaration", titre: "Déclaration", resume: "Préambule, actes I à VIII" },
      ],
    },
  ],
};

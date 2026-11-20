import type { PageBlocs } from "./types";

/** Blocs éditables de la page La Note Épistémologique. */
export const NOTE_EPISTEMOLOGIQUE_BLOCS: PageBlocs = {
  page: "note_epistemologique",
  chemin: "/note-epistemologique",
  titre: "La Note Épistémologique",
  blocs: [
    {
      cle: "note_epistemologique.seo.titre",
      label: "Titre de la page (onglet et Google)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut: "Note Épistémologique",
    },
    {
      cle: "note_epistemologique.seo.description",
      label: "Description (résultats Google)",
      type: "simple",
      aide: "Référencement (Google)",
      defaut:
        "Restituer les conditions de l'intelligibilité : primauté du cerveau sur le laboratoire, Canon de la Découverte en sept principes, sextuor de la structuration intime.",
    },
    {
      cle: "note_epistemologique.hero.titre",
      label: "Titre principal (H1)",
      type: "simple",
      aide: "En-tête de page",
      defaut: "Note épistémologique",
    },
    {
      cle: "note_epistemologique.hero.sous_titre",
      label: "Sous-titre",
      type: "simple",
      aide: "En-tête de page — sous le titre principal",
      defaut: "Restituer les conditions de l’intelligibilité",
    },
    {
      cle: "note_epistemologique.hero.exergue",
      label: "Exergue",
      type: "simple",
      aide: "En-tête de page — citation en ouverture",
      defaut:
        "« Le réel est voilé pour tous, filtré pour certains, et reconstructible par la méthode. »",
    },
    {
      cle: "note_epistemologique.sommaire.posture",
      label: "Sommaire — entrée « Posture »",
      type: "simple",
      aide: "En-tête de page — « Sur cette page » (libellé court de la section 1)",
      defaut: "Posture métascientifique",
    },
    {
      cle: "note_epistemologique.sommaire.axiome",
      label: "Sommaire — entrée « Axiome »",
      type: "simple",
      aide: "En-tête de page — « Sur cette page » (libellé court de la section 2)",
      defaut: "Axiome central",
    },
    {
      cle: "note_epistemologique.sommaire.canon",
      label: "Sommaire — entrée « Canon »",
      type: "simple",
      aide: "En-tête de page — « Sur cette page » (libellé court de la section 4)",
      defaut: "Le Canon en 7 principes",
    },
    {
      cle: "note_epistemologique.posture.titre",
      label: "Posture métascientifique — titre (H2)",
      type: "simple",
      aide: "Section 1 — Posture métascientifique",
      defaut: "Posture métascientifique — l’intelligibilité de l’intelligibilité",
    },
    {
      cle: "note_epistemologique.posture.corps",
      label: "Posture métascientifique",
      type: "riche",
      aide: "Intelligibilité de l'intelligibilité",
    },
    {
      cle: "note_epistemologique.axiome.titre",
      label: "Axiome central — titre (H2)",
      type: "simple",
      aide: "Section 2 — Axiome central",
      defaut: "Axiome central — la primauté du cerveau sur le laboratoire",
    },
    {
      cle: "note_epistemologique.axiome.corps",
      label: "Axiome central — corps de texte",
      type: "riche",
      aide: "Primauté du cerveau sur le laboratoire",
    },
    {
      cle: "note_epistemologique.axiome.encadre",
      label: "Axiome central — encadré",
      type: "simple",
      aide: "Section 2 — Axiome central (encadré doré)",
      defaut:
        "Le laboratoire ne crée pas l’ordre ; il juge l’ordre que l’intelligence a d’abord reconnu sous le Voile.",
    },
    {
      cle: "note_epistemologique.axiome.thom",
      label: "Axiome central — l'appui sur René Thom",
      type: "riche",
      aide: "Primauté du cerveau sur le laboratoire",
    },
    {
      cle: "note_epistemologique.principes.titre",
      label: "Les deux principes suprêmes — titre (H2)",
      type: "simple",
      aide: "Section 3 — Les deux principes suprêmes d’organisation (aussi utilisé dans le sommaire)",
      defaut: "Les deux principes suprêmes d’organisation",
    },
    {
      cle: "note_epistemologique.principes.unite_titre",
      label: "Principe d’Unité Structurelle — titre (H3)",
      type: "simple",
      aide: "Section 3 — carte de gauche",
      defaut: "Principe d’Unité Structurelle (Généralisation)",
    },
    {
      cle: "note_epistemologique.principes.unite_maxime",
      label: "Principe d’Unité Structurelle — maxime",
      type: "simple",
      aide: "Section 3 — carte de gauche (citation en italique)",
      defaut: "« Toutes les échelles du réel obéissent à une même loi organique. »",
    },
    {
      cle: "note_epistemologique.principes.unite_corps",
      label: "Principe d’Unité Structurelle — texte",
      type: "riche",
      aide: "Section 3 — carte de gauche",
    },
    {
      cle: "note_epistemologique.principes.polarite_titre",
      label: "Principe de Polarité Complémentaire — titre (H3)",
      type: "simple",
      aide: "Section 3 — carte de droite",
      defaut: "Principe de Polarité Complémentaire (Dualité)",
    },
    {
      cle: "note_epistemologique.principes.polarite_maxime",
      label: "Principe de Polarité Complémentaire — maxime",
      type: "riche",
      aide: "Section 3 — carte de droite (citation en italique)",
    },
    {
      cle: "note_epistemologique.principes.polarite_corps",
      label: "Principe de Polarité Complémentaire — texte",
      type: "riche",
      aide: "Section 3 — carte de droite",
    },
    {
      cle: "note_epistemologique.canon.titre",
      label: "Le Canon en 7 principes — titre (H2)",
      type: "simple",
      aide: "Section 4 — Le Théorème de la Genèse Scientifique",
      defaut: "Le Théorème de la Genèse Scientifique — le Canon en 7 principes",
    },
    {
      cle: "note_epistemologique.theoreme.corps",
      label: "Le Théorème de la Genèse Scientifique",
      type: "riche",
      aide: "Le Canon en six temps",
    },
    {
      cle: "note_epistemologique.canon.frise_aria",
      label: "Frise du Canon — libellé d'accessibilité",
      type: "simple",
      aide: "Section 4 — lu par les lecteurs d'écran (invisible à l'écran)",
      defaut: "Les sept étapes du Canon de la Découverte",
    },
    {
      cle: "note_epistemologique.triade.titre",
      label: "Rectification de la triade dialectique — titre (H2)",
      type: "simple",
      aide: "Section 5 — Triade dialectique (aussi utilisé dans le sommaire)",
      defaut: "Rectification de la triade dialectique",
    },
    {
      cle: "note_epistemologique.triade.sous_titre",
      label: "Rectification de la triade dialectique — intertitre (H3)",
      type: "simple",
      aide: "Section 5 — Triade dialectique",
      defaut: "Invalidation du modèle hégélien",
    },
    {
      cle: "note_epistemologique.triade.corps",
      label: "Rectification de la triade dialectique",
      type: "riche",
      aide: "Triade dialectique",
    },
    {
      cle: "note_epistemologique.sextuor.titre",
      label: "Le sextuor — titre (H2)",
      type: "simple",
      aide: "Section 6 — Sextuor (aussi utilisé dans le sommaire)",
      defaut: "Le sextuor de la structuration intime",
    },
    {
      cle: "note_epistemologique.sextuor.corps",
      label: "Le sextuor de la structuration intime",
      type: "riche",
      aide: "Sextuor",
    },
    {
      cle: "note_epistemologique.pacte.corps",
      label: "Le pacte éthique",
      type: "riche",
      aide: "Fin de page",
    },
    {
      cle: "note_epistemologique.cloture.texte",
      label: "Phrase de clôture",
      type: "simple",
      aide: "Fin de page — phrase en italique",
      defaut: "Ce travail ne demande pas à être accepté sur autorité. Il demande à être éprouvé.",
    },
    {
      cle: "note_epistemologique.cloture.bouton",
      label: "Bouton de fin de page",
      type: "simple",
      aide: "Fin de page — bouton vers l’Ouvrage",
      defaut: "Découvrir l’Ouvrage",
    },
  ],
  listes: [
    {
      nom: "etapes_canon",
      label: "Frise du Canon — les sept étapes",
      element: "Étape",
      aide: "Section 4 — frise numérotée (le dernier élément est mis en valeur)",
      champs: [
        { nom: "terme", label: "Terme" },
        { nom: "role", label: "Rôle" },
      ],
      origine: [
        { terme: "Architecture préalable", role: "L’infrastructure implicite" },
        { terme: "Anomalie / Paradoxe", role: "Le point d’impact entropique" },
        { terme: "Question", role: "La circonscription du vide sémantique" },
        { terme: "Hypothèse", role: "La Majeure rationnelle (hyppo, en deçà)" },
        { terme: "Thésis", role: "L’action de poser et de démontrer" },
        { terme: "Expérantia", role: "Le banc d’essai phénoménal (mineure subordonnée)" },
        { terme: "Connaissance", role: "La réintégration néguentropique" },
      ],
    },
    {
      nom: "canon",
      label: "Le Canon de la Découverte — les sept principes",
      element: "Principe",
      aide: "Section 4 — sous la frise",
      champs: [
        { nom: "titre", label: "Titre" },
        { nom: "texte", label: "Texte", type: "zone" },
      ],
      origine: [
        {
          titre: "Principe I — Le primat de l'intelligibilité sur l'opératoire",
          texte:
            "La recherche scientifique dépend d'abord du cerveau avant de dépendre du laboratoire.",
        },
        {
          titre: "Principe II — Le Théorème de la Genèse Scientifique",
          texte:
            "La connaissance ne naît pas de l'induction mécanique, ni de la déduction formelle. Elle naît de la rencontre entre une intelligibilité déjà présente et une difficulté qui en révèle l'incomplétude.",
        },
        {
          titre: "Principe III — Le principe de nécessité heuristique",
          texte:
            "Chaque élévation vers un niveau supérieur d'intelligibilité doit apparaître comme la conséquence nécessaire des insuffisances constatées au niveau inférieur.",
        },
        {
          titre: "Principe IV — La reconstruction synthétique",
          texte:
            "La synthèse reconstructive consiste à remonter des éléments dissociés vers les fondements implicites qui les unissent.",
        },
        {
          titre: "Principe V — La double respiration du réel et de la connaissance",
          texte:
            "Le mouvement descendant (ontologique) et le mouvement ascendant (épistémologique) sont les deux battements d'un même cœur rationnel.",
        },
        {
          titre: "Principe VI — Le principe de non-imposition",
          texte:
            "Nul principe ne peut être introduit avant que le raisonnement n'en ait progressivement établi la nécessité.",
        },
        {
          titre: "Principe VII — Le principe de démonstration catégorique",
          texte:
            "Aucune affirmation ne peut être tenue pour acquise tant qu'elle n'a pas fait l'objet d'une démonstration suffisante au regard de son domaine. L'ambition d'une théorie ne dispense jamais de l'exigence de sa démonstration.",
        },
      ],
    },
    {
      nom: "sextuor",
      label: "Le sextuor — les six cas d'étude",
      element: "Cas d'étude",
      aide: "Section 6 — cartes",
      champs: [
        { nom: "titre", label: "Titre" },
        { nom: "texte", label: "Texte", type: "zone" },
      ],
      origine: [
        {
          titre: "1. Urbain Le Verrier (L'Invisible Mathématique)",
          texte:
            "Il n'est pas convoqué pour ses mérites d'astronome, mais parce qu'il démontre magistralement comment la détection d'une Anomalie (les perturbations d'Uranus) force une reconstruction théorique pure avant toute observation télescopique. En 1846, Le Verrier calcule la position de Neptune à la pointe de sa plume, forçant le visible à s'aligner sur l'invisible mathématique.",
        },
        {
          titre: "2. Évariste Galois (L'Architecture de la Symétrie)",
          texte:
            "Il met à nu la structure intime du calcul non pas en résolvant des équations isolées, mais en prouvant qu'une Architecture Abstraite (la théorie des groupes) devance et gouverne sa propre démonstration. La veille de sa mort, en 1832, Galois scelle l'algèbre moderne en identifiant les invariants de symétrie qui rendent les équations résolubles ou non.",
        },
        {
          titre: "3. James Chadwick (La Confirmation Expérimentale)",
          texte:
            "Il illustre avec une précision clinique le passage chirurgical d'une Hypothèse Structurée (le besoin de neutralité pour maintenir la cohésion atomique) à sa validation factuelle. En 1932, Chadwick ne découvre pas le neutron par hasard ; il le déduit de la nécessité structurelle de combler l'anomalie de masse constatée au sein du noyau atomique.",
        },
        {
          titre: "4. Christophe Colomb (La Complétude de la Sphère)",
          texte:
            "Il brise la fiction de clôture géographique de son époque non par un hasard empirique, mais en subordonnant l'appareil technique de son expédition à une Majeure Rationnelle Préalable : l'isomorphisme et l'unité de la sphère (Σ). Le voyage de 1492 n'est pas une errance ; c'est l'Expérantia subordonnée à l'Hypothèse de la rotondité terrestre.",
        },
        {
          titre: "5. Claude Bernard (L'Invisible Biologique)",
          texte:
            "Il applique le Canon au vivant en posant a priori l'existence du « Milieu Intérieur » comme thermostat supérieur de non-contradiction. Il démontre que l'idée directrice interne gouverne impérativement l'expérience. L'organisme n'est pas un système passif soumis aux caprices de l'environnement extérieur ; il maintient activement sa propre unité (Σ).",
        },
        {
          titre: "6. Thomas Henry Huxley (La Continuité Structurale)",
          texte:
            "Il traverse le voile du temps géologique en démontrant que la paléontologie n'est pas un catalogue fortuit de débris, mais une reconstruction morphologique intégrale régie par des lois d'anatomie comparée. En identifiant le lien intime entre les dinosaures et les oiseaux, Huxley prouve que la continuité structurelle traverse les époques et les espèces.",
        },
      ],
    },
  ],
};

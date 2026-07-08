/**
 * Les 20 Concepts Stabilisés (Infrastructure Lexicale V4.0), classés en 4 strates.
 * Transcription fidèle du DOCUMENT DE SYNTHÈSE FINAL (Page 8). Données en snake_case.
 * Aucun texte doctrinal inventé : tout provient du document maître.
 */

export type Concept = {
  numero: number;
  id: string;
  titre: string;
  definition: string;
  portee: string;
};

export type Strate = {
  id: string;
  titre: string;
  sous_titre: string;
  concepts: Concept[];
};

export const STRATES: Strate[] = [
  {
    id: "noyau_ontologique",
    titre: "Strate I — Le Noyau Ontologique",
    sous_titre: "L'Architecture du Réel",
    concepts: [
      {
        numero: 1,
        id: "substratum_commun",
        titre: "Substratum Commun (Σ, π₁ ↔ π₂)",
        definition:
          "Niveau principiel d'unité génératrice, antérieur à toute manifestation observable et à toute connaissance explicite. Il ne désigne ni une substance immobile, ni un absolu théologique, mais une unité relationnelle et dynamique structurée par la tension simultanée de deux polarités complémentaires : la polarité de distinction/cohésion (π₁) et la polarité de relation/complétude (π₂).",
        portee:
          "Sommet de la Pyramide de l'ascension épistémologique. La Science Métamoderne ne cherche pas à l'observer directement, mais à restituer les médiations qui permettent de le retrouver par la remontée reconstructive. Dans le champ juridique, il se transpose sous la forme de la Maât.",
      },
      {
        numero: 2,
        id: "maat",
        titre: "Maât",
        definition:
          "Opérateur logique universel de non-contradiction structurelle et d'équilibre dynamique. Réhabilitée hors de toute assignation folklorique, mémorielle ou identitaire, et adossée aux travaux de Jan Assmann et Théophile Obenga, elle se définit par trois propriétés cumulatives : Totalité, Indivisibilité, Cohérence Interne.",
        portee:
          "Dans le Laboratoire Juridique (Tome II), la Maât agit comme le thermostat supérieur de non-contradiction qui s'oppose à l'entropie de l'Isfet. Elle formalise l'exigence selon laquelle une Constitution de papier (Cohérence Syntaxique) s'effondre mathématiquement si son effectivité sémantique est annihilée par la violence structurelle.",
      },
      {
        numero: 3,
        id: "voile_ontologique",
        titre: "Voile Ontologique (V)",
        definition:
          "Condition universelle, nécessaire et enveloppante de toute manifestation. Le Voile n'est pas un obstacle accidentel que l'instrumentation technique pourrait un jour supprimer ; il est la loi structurelle par laquelle le Réel Principiel (Σ) se convertit en monde phénoménal observable. Toute réalité phénoménale est déjà voilée : S = V(Σ).",
        portee:
          "Sa reconnaissance destitue l'illusion empiriste selon laquelle le réel se donnerait directement à l'observation. Traverser le Voile ne signifie pas l'abolir, mais rendre visible son action pour remonter vers les conditions de possibilité.",
      },
      {
        numero: 4,
        id: "filtrage_selectif",
        titre: "Filtrage Sélectif (F)",
        definition:
          "Opérateur épistémologique, historique et régulateur qui calibre l'accès à la complétude et protège le système cognitif de la désintégration. Le Filtrage transforme la manifestation voilée (S) en Savoir Ordinaire fragmenté (K) : K = F(S) = F(V(Σ)). Il s'exécute à travers les institutions académiques, les paradigmes dominants et les circuits de légitimation.",
        portee:
          "Le Filtrage n'est pas un défaut de la connaissance mais sa condition de possibilité historique. Il opère simultanément un masquage : en rendant certains signaux admissibles, il en rend d'autres invisibles. La Désadhérence Réflexive consiste à suspendre les automatismes de ce Filtrage.",
      },
      {
        numero: 5,
        id: "fiction_de_cloture",
        titre: "Fiction de Clôture",
        definition:
          "Redéfinie rigoureusement comme « l'oubli du Voile ». Pathologie majeure du savoir ordinaire, symptôme par lequel le système cognitif se comporte comme si la manifestation voilée et filtrée (S ou K) était l'Absolu (Σ), oubliant les médiations (V et F) qui la rendent possible.",
        portee:
          "Dans le champ scientifique, elle produit le fétichisme du laboratoire et l'illusion inductive. Dans le champ juridique, elle produit le formalisme kelsénien et le syllogisme dégradé. Briser la Fiction de Clôture est l'acte inaugural de la Méthode Reconstructive.",
      },
    ],
  },
  {
    id: "noyau_epistemologique",
    titre: "Strate II — Le Noyau Épistémologique",
    sous_titre: "La Dynamique de la Connaissance",
    concepts: [
      {
        numero: 6,
        id: "intelligibilite",
        titre: "Intelligibilité",
        definition:
          "Objet premier et centre de gravité unique de la Science Métamoderne. Elle désigne la propriété intrinsèque et objective du réel à se laisser appréhender, comparer, relier et organiser par l'activité de l'esprit humain sous forme de connaissances communicables et universelles de droit.",
        portee:
          "La Science Métamoderne ne cherche pas à ajouter une théorie supplémentaire aux théories existantes, mais à restituer les conditions géométriques, cybernétiques et rationnelles qui rendent simultanément possibles l'apparition des phénomènes, leur compréhension par l'esprit humain et la connaissance que nous en prenons.",
      },
      {
        numero: 7,
        id: "architecture_prealable_intelligibilite",
        titre: "Architecture Préalable d'Intelligibilité",
        definition:
          "Structure implicite, partiellement voilée, qui précède l'observation et oriente le regard du chercheur. Elle agit comme un principe d'orientation et de détection des incohérences, rendant possible l'identification des anomalies et la formulation des hypothèses. « Le savoir, c'est ce que je ne pense pas mais au moyen de quoi je pense. »",
        portee:
          "Le laboratoire ne crée pas l'ordre ; il vérifie l'ordre que l'intelligence a d'abord reconnu sous le Voile. L'expérience ne produit pas l'idée ; elle la juge. Cette reconnaissance restaure la souveraineté du cerveau sur le laboratoire.",
      },
      {
        numero: 8,
        id: "respiration_ontologique",
        titre: "Respiration Ontologique",
        definition:
          "Mouvement descendant et organique par lequel l'Unité Absolue (Σ) se convertit et se fragmente, à travers les opérateurs du Voile (V) et du Filtrage (F), pour donner naissance au Monde Observable (S) : S = V(Σ) puis K = F(V(Σ)).",
        portee:
          "Premier battement du cœur rationnel. Elle est la condition de possibilité de l'apparaître du réel. Sans elle, l'Unité demeurerait inaccessible, muette, enfermée dans sa propre complétude. La manifestation est le prix payé pour l'apparaître.",
      },
      {
        numero: 9,
        id: "respiration_epistemologique",
        titre: "Respiration Épistémologique",
        definition:
          "Mouvement ascendant, réflexif et rationnel par lequel l'esprit du chercheur, partant du constat d'une anomalie dans le savoir ordinaire, active la Méthode M pour remonter des fragments observables vers la structure de la totalité réintégrée : Σ = M(F(V(Σ))).",
        portee:
          "Second battement du cœur rationnel, symétrique et inverse de la Respiration Ontologique. La connaissance authentique ne consiste pas à accumuler des données dans le cadre du Savoir Ordinaire, mais à remonter des manifestations voilées et filtrées vers les conditions qui les rendent possibles.",
      },
      {
        numero: 10,
        id: "conversion_principiel_phenomenal",
        titre: "Conversion du Principiel en Phénoménal",
        definition:
          "Mécanisme de passage par lequel les lois pures et invariantes du Régime Principiel (le sommet de la Pyramide) s'incarnent et se manifestent sous forme de variables denses, mesurables ou applicables dans le Régime Opératoire (le monde physique et juridique).",
        portee:
          "Elle s'opère au niveau de la Charnière Ontologique, seuil critique où l'Unité Structurelle Absolue se réfracte en multiplicité observable. Elle n'est pas une simple transformation quantitative, mais une rupture qualitative : le passage d'un régime d'existence à un autre.",
      },
    ],
  },
  {
    id: "methodologie",
    titre: "Strate III — La Méthodologie",
    sous_titre: "La Science Métamoderne",
    concepts: [
      {
        numero: 11,
        id: "science_metamoderne",
        titre: "Science Métamoderne",
        definition:
          "Nouvelle architecture de la pensée et Organon de réintégration. Elle ne constitue pas une discipline supplémentaire venant s'ajouter à la fragmentation académique, mais une refondation totale du geste scientifique lui-même. Formule de démarcation : « Le métamodernisme culturel cherche à dépasser le conflit entre l'unité et la multiplicité ; la Science Métamoderne cherche à comprendre ce qui rend possible leur intelligibilité commune. »",
        portee:
          "Métascience des structures de la connaissance, adossée à la théorie générale des systèmes de Pierre Delattre et à l'épistémologie structurale de René Thom. Il s'agit d'un calcul de cohérence normative et non d'une théorie de la sensibilité contemporaine.",
      },
      {
        numero: 12,
        id: "hypothese",
        titre: "Hypothèse (Hyppo-thésis)",
        definition:
          "Du grec hyppo (en deçà, sous) et thésis (l'action de poser). Point de départ antérieur et infrastructure invisible de la découverte. Située en deçà de la thèse, l'hypothèse est la prémisse majeure rationnelle qui dicte la structure géométrique du modèle avant toute vérification expérimentale.",
        portee:
          "L'Hypothèse ne se déduit pas mécaniquement des faits ; elle les devance et les gouverne. Comme le soulignait Claude Bernard, l'idée directrice précède toujours l'expérience.",
      },
      {
        numero: 13,
        id: "thesis",
        titre: "Thésis (Thèse)",
        definition:
          "Action d'établir, de formaliser le modèle et de déployer activement la preuve théorique. Contrairement à la triade dialectique hégélienne, elle n'est jamais première ; elle constitue le moyen terme dynamique qui prend appui sur l'infrastructure de l'hypothèse. Séquence authentique : Hypothèse → Thésis → Expérantia.",
        portee:
          "En confondant la thèse (le résultat soutenu) avec le point de départ, la science moderne s'est interdit de penser les conditions de possibilité des phénomènes. La restauration de la séquence authentique permet à l'esprit de retrouver sa fonction génératrice d'intelligibilité.",
      },
      {
        numero: 14,
        id: "experantia",
        titre: "Expérantia (Expérience)",
        definition:
          "Protocole empirique inséré dans le temps et l'espace qui intervient à titre exclusif de mineure subordonnée dans le syllogisme de la découverte. L'appareil ou le fait de laboratoire n'est pas la source du concept, mais son juge et son validateur. Du latin experiri : éprouver, faire l'essai.",
        portee:
          "L'expérience ne produit pas l'idée ; elle la juge. On ne cherche pas au hasard ; on provoque artificiellement le fait pour éprouver l'hypothèse rationnellement anticipée. Cette réhabilitation restaure la primauté absolue du cerveau sur le laboratoire.",
      },
      {
        numero: 15,
        id: "remontee_reconstructive",
        titre: "Remontée Reconstructive (Méthode M)",
        definition:
          "Protocole algorithmique qui permet d'extraire l'universel sans prénotions arbitraires. C'est le cheminement exact par lequel le chercheur traverse le Voile et le Filtrage pour restituer la cohérence du Tout à partir d'une anomalie locale. Elle est l'opérateur inverse de la Charnière Ontologique.",
        portee:
          "Boucle réflexive en trois temps : détecter la rupture (S) — repérer l'anomalie ; rendre visible le Voile et le Filtrage — comprendre que la procédure a oublié ses conditions de possibilité ; réintégration corrective (Σ) — reconstruire une décision ou une théorie qui comble la lacune et ramène le fragment conflictuel à l'harmonie globale du système.",
      },
    ],
  },
  {
    id: "arsenal_operatoire",
    titre: "Strate IV — L'Arsenal Opératoire",
    sous_titre: "Les Concepts de Combat",
    concepts: [
      {
        numero: 16,
        id: "desadherence_reflexive",
        titre: "Désadhérence Réflexive",
        definition:
          "Suspension méthodique et provisoire des cadres conceptuels saturés (le Savoir Ordinaire K), afin de rendre perceptibles les structures invisibles et les médiations oubliées. Distincte de la déconstruction post-moderne : elle ne dissout pas les catégories, elle les rend visibles en tant que médiations ; elle ne nie pas la réalité, elle interroge les conditions de possibilité de sa manifestation.",
        portee:
          "S'exécute en trois temps rigoureux : la détection de l'Anomalie (identifier une rupture de symétrie ou un fait paradoxal) ; la suspension des automatismes conceptuels (reconnaître que le Savoir Ordinaire n'est pas le réel en son état originaire) ; la formalisation de la Question (traduire l'Anomalie en un problème logique rigoureux).",
      },
      {
        numero: 17,
        id: "syllogisme_degrade",
        titre: "Syllogisme Dégradé",
        definition:
          "Pathologie majeure de la science et du droit contemporains, caractérisée par l'ellipse de la Majeure rationnelle, où la procédure ou l'empirisme prennent la place du principe et tuent la substance. Forme linéaire incapable de saisir la simultanéité des médiations. Le Cogito cartésien et le paradoxe socratique en sont des exemples destitués.",
        portee:
          "Le Syllogisme Dégradé transforme la sécurité procédurale en violence institutionnelle. Il fige l'injustice sous le voile de la stricte conformité formelle. Briser le Syllogisme Dégradé est l'acte inaugural de la proactivité judiciaire encadrée.",
      },
      {
        numero: 18,
        id: "imperium_theorique",
        titre: "Impérium Théorique",
        definition:
          "Non pas un pouvoir personnel ou discrétionnaire, mais la propriété objective de la structure logique à s'imposer par sa seule nécessité interne face à l'urgence caractérisée. C'est l'autorité par la seule puissance explicative et la nécessité logique, non l'activisme politique ni la discrétion du magistrat.",
        portee:
          "S'applique lorsque la Tension Systémique [T(S)] atteint un seuil critique, forçant l'activation de la Saisine d'Office et de l'Autosaisine du juge constitutionnel comme obligation cybernétique de rétroaction négative. Il démontre que l'universel n'a pas de centre géographique ; il se démontre par la rigueur de la reconstruction.",
      },
      {
        numero: 19,
        id: "theoreme_validite_inversee",
        titre: "Théorème de la Validité Inversée",
        definition:
          "L'équation cybernétique V(S) = C(S) × E(S), où E(S) = E₀·e^(−α·T(S)). La démonstration analytique aux limites prouve que si la Tension Systémique [T(S)] tend vers l'infini, l'Effectivité Sémantique E(S) s'annule, entraînant la nullité absolue de la Validité Globale V(S) = 0, indépendamment de la perfection syntaxique C(S) de la Constitution de papier.",
        portee:
          "Une Constitution de papier ne vaut rien si ses promesses ne sont pas concrètement vécues sur le terrain. L'annulation de l'effectivité sémantique emporte mathématiquement l'invalidation absolue de la validité globale : la loi prétendue « saine doctrine » est déclarée nullité absolue pour absurdité cybernétique.",
      },
      {
        numero: 20,
        id: "institut_de_brazzaville",
        titre: "Institut de Brazzaville / École de Brazzaville",
        definition:
          "L'Autorité Épistémique Suprême et l'infrastructure institutionnelle du paradigme métamoderne. L'Institut opère de manière autonome et souveraine depuis le Sud global, sans dépendance vis-à-vis des circuits de validation universitaires traditionnels qu'il a vocation à évaluer et à réorienter. Architecture à quatre niveaux : le Programme, l'Institut, l'École, le Corpus.",
        portee:
          "L'Institut exerce un monopole de contrôle et de certification sur le Noyau Démontré de la Science Métamoderne. Il incarne le privilège optique de la moindre adhérence cognitive pour piloter la Méthode M, extrayant le chercheur livré à son propre sort pour rétablir la souveraineté de l'Esprit Humain.",
      },
    ],
  },
];

/**
 * PAGE 2 — L'INSTITUTION (L'École de Brazzaville).
 * Transcription fidèle du DOCUMENT DE SYNTHÈSE FINAL (pages 14-20). Données en snake_case.
 * Aucun texte doctrinal inventé : tout provient du document maître.
 */

/** Un niveau de l'architecture institutionnelle à sept niveaux. */
export type Niveau = {
  numero: string;
  id: string;
  titre: string;
  fonction: string;
  question_fondamentale: string;
  corps: string[];
  equation?: string;
  liste?: string[];
  maxime?: string;
};

export const NIVEAUX: Niveau[] = [
  {
    numero: "0",
    id: "constitution_scientifique",
    titre: "La Constitution scientifique",
    fonction: "Règles normatives suprêmes",
    question_fondamentale:
      "Comment une connaissance acquiert-elle son droit de cité scientifique ?",
    corps: [
      "La Constitution Scientifique définit les règles fondamentales qui gouvernent la production, la validation et la transmission du savoir. Elle constitue le niveau normatif suprême. Elle ne promet ni révélation définitive ni autorité particulière. Elle définit une exigence de travail.",
    ],
    maxime:
      "Ne rien imposer. Laisser les choses s'imposer d'elles-mêmes par la seule puissance du raisonnement.",
  },
  {
    numero: "I",
    id: "science_metamoderne",
    titre: "La Science Métamoderne",
    fonction: "Théorie générale de l'intelligibilité",
    question_fondamentale: "Que cherchons-nous à comprendre ?",
    corps: [
      "La Science Métamoderne est la théorie générale de l'intelligibilité, gouvernée par la Constitution méthodologique. Elle formalise et restitue les conditions qui rendent simultanément possibles l'apparition des phénomènes, leur intelligibilité et la connaissance que nous en prenons.",
      "Elle applique l'équation systémique :",
      "Elle démontre comment le Substratum Commun (Σ), altéré par le Voile Ontologique (V) et le Filtrage institutionnel (F), peut être mathématiquement recalculé et restauré par la Méthode Reconstructive (M).",
    ],
    equation: "Σ = M(F(V(Σ)))",
  },
  {
    numero: "II",
    id: "programme_de_recherche",
    titre: "Le Programme de recherche de Brazzaville",
    fonction: "Horizon scientifique",
    question_fondamentale: "Quelles sont les questions ouvertes ?",
    corps: [
      "Le Programme de recherche définit les grands problèmes scientifiques, les hypothèses directrices et les orientations. Il est toujours plus vaste que ce qui est déjà démontré. Il constitue l'horizon scientifique.",
      "Le Programme comporte plusieurs chantiers théoriques dont les démonstrations seront publiées progressivement à mesure qu'elles atteindront le degré de formalisation et de vérification exigé par ses propres principes méthodologiques, et selon le rythme où la communauté scientifique sera en mesure de les recevoir et de les éprouver.",
      "Ces axes ne constituent pas des promesses dogmatiques. Ils définissent des terrains d'application où la Méthode M est appelée à déployer ses protocoles de recherche :",
    ],
    liste: [
      "Les sciences du vivant (mécanismes de régulation cellulaire, réplication virale, loi organogénétique) ;",
      "La physique fondamentale (phénomènes nucléaires, limites de l'univers matériel) ;",
      "Les sciences de la complexité (transformations de la matière et répercussions sur le biotope) ;",
      "La théorie de l'information (modélisation des flux de connaissance).",
    ],
  },
  {
    numero: "III",
    id: "institut",
    titre: "L'Institut de Brazzaville",
    fonction: "Infrastructure scientifique",
    question_fondamentale: "Comment cette recherche est-elle organisée ?",
    corps: [
      "L'Institut constitue l'infrastructure scientifique du Programme. Il organise les recherches, les publications, les archives, les formations, les colloques, les partenariats scientifiques et les laboratoires.",
      "L'Institut exerce un monopole de contrôle et de certification sur le Noyau Démontré de la Science Métamoderne. Il est le seul habilité à sceller les concepts structurels stabilisés et à valider les protocoles de remontée reconstructive.",
    ],
  },
  {
    numero: "IV",
    id: "ecole",
    titre: "L'École de Brazzaville",
    fonction: "Communauté vivante",
    question_fondamentale: "Qui fait vivre cette recherche ?",
    corps: [
      "L'École désigne la communauté des chercheurs qui participent librement au Programme de Recherche. Elle ne repose sur aucune adhésion personnelle. Elle repose uniquement sur l'acceptation d'une même discipline intellectuelle : primauté de la démonstration, discussion critique permanente, stabilité du vocabulaire, distinction entre hypothèse, démonstration et programme, révision continue des concepts.",
      "L'École n'est donc pas une doctrine. Elle est une communauté de recherche.",
    ],
  },
  {
    numero: "V",
    id: "organon",
    titre: "L'Organon (Les Principes Retrouvés)",
    fonction: "Premier traité systématique",
    question_fondamentale: "Qu'avons-nous effectivement démontré ?",
    corps: [
      "L'Organon constitue le premier traité systématique du Programme. Il n'en représente ni l'achèvement ni la limite, mais le premier corpus fondateur à partir duquel pourront être développées de nouvelles recherches.",
      "Les Principes Retrouvés (Tome I : L'Organon ; Tome II : Le Laboratoire Juridique) constituent le Noyau Démontré de la Science Métamoderne. Ils établissent l'axiomatique pure, le Canon de la Découverte en sept principes, le Théorème de la Validité Inversée et la codification de la Proactivité Judiciaire Encadrée.",
    ],
  },
  {
    numero: "VI",
    id: "corpus",
    titre: "Le Corpus scientifique",
    fonction: "Mémoire génétique",
    question_fondamentale: "Qu'est-ce qui est scientifiquement stabilisé ?",
    corps: [
      "Le Corpus rassemble de manière étanche les travaux validés issus du Programme. Il n'accueille aucune anticipation, aucun résultat non stabilisé. Il constitue la mémoire démontrée de l'École.",
      "Le Corpus comprend les ouvrages fondateurs, les Working Papers, les développements doctrinaux, les concepts structurels stabilisés, les applications disciplinaires et les actes de colloques.",
    ],
  },
];

/** Analogie organique reliant les sept niveaux (fin de la Section 2). */
export const MOUVEMENT_ORGANIQUE: string[] = [
  "Le Programme est l'ADN qui oriente.",
  "L'Institut est l'organisme qui porte.",
  "L'École est la communauté vivante qui transmet.",
  "Le Corpus est la mémoire génétique qui conserve.",
];

/** Le Canon de la Découverte en sept principes (Section 5). */
export type PrincipeCanon = {
  numero: number;
  titre: string;
  glose: string;
};

export const CANON: PrincipeCanon[] = [
  {
    numero: 1,
    titre: "Vocation",
    glose: "L'architecture préalable d'intelligibilité qui oriente le regard.",
  },
  {
    numero: 2,
    titre: "Anomalie",
    glose: "La détection d'une rupture de symétrie ou d'un fait paradoxal.",
  },
  {
    numero: 3,
    titre: "Concentration",
    glose:
      "La formalisation de la Question qui force l'esprit à reconnaître l'insuffisance des outils disponibles.",
  },
  {
    numero: 4,
    titre: "Hypothèse (hyppo-thésis)",
    glose:
      "La Majeure rationnelle préexistante, l'interprétation mentale anticipée.",
  },
  {
    numero: 5,
    titre: "Thésis",
    glose:
      "L'acte rigoureux de soutenir et d'établir l'hypothèse par une chaîne de nécessité démonstrative.",
  },
  {
    numero: 6,
    titre: "Expérantia",
    glose:
      "L'épreuve contrôlée, placée au milieu du processus pour éprouver la cohérence de la thésis.",
  },
  {
    numero: 7,
    titre: "Validation",
    glose: "La réintégration néguentropique dans une architecture cohérente.",
  },
];

/** Les autorités de convergence épistémologique, groupées par champ (Section 4). */
export type ChampAutorites = {
  id: string;
  champ: string;
  autorites: { nom: string; origine: string; motif: string }[];
};

export const AUTORITES: ChampAutorites[] = [
  {
    id: "epistemologie_systemique",
    champ: "Dans le champ de l'épistémologie et de la systémique",
    autorites: [
      {
        nom: "René Thom",
        origine: "France",
        motif:
          "Pour sa critique de la misère théorique et la modélisation des catastrophes.",
      },
      {
        nom: "Pierre Delattre",
        origine: "Belgique",
        motif:
          "Pour la théorie générale des systèmes ouverts et la distinction entre syntaxe mathématique et sémantique conceptuelle.",
      },
      {
        nom: "Jean-Paul Benzécri",
        origine: "France",
        motif:
          "Pour la réhabilitation de l'induction a posteriori libérée des prénotions arbitraires.",
      },
      {
        nom: "Claude Bernard",
        origine: "France",
        motif:
          "Pour l'exigence de l'idée directrice préalable et la découverte du milieu intérieur.",
      },
      {
        nom: "Georges Duhamel",
        origine: "France",
        motif:
          "Pour la vigilance à l'égard de l'aliénation par le machinisme et la routine technique.",
      },
      {
        nom: "Thomas Kuhn",
        origine: "États-Unis",
        motif:
          "Pour la structure des révolutions scientifiques et les changements de paradigmes.",
      },
      {
        nom: "Ludwig von Bertalanffy",
        origine: "Autriche",
        motif: "Pour la théorie générale des systèmes.",
      },
    ],
  },
  {
    id: "vivant_transformisme",
    champ: "Dans le champ des sciences du vivant et du transformisme",
    autorites: [
      {
        nom: "Jules Carles",
        origine: "France",
        motif:
          "Pour son œuvre majeure Le Transformisme, qui a fourni les bases conceptuelles permettant, dès 1988-1989, la formulation de la loi organogénétique réconciliant les héritages lamarckien et darwinien sous le concept de Lamarco-darwinisme.",
      },
    ],
  },
  {
    id: "decolonisation_epistemique",
    champ:
      "Dans le champ de la décolonisation épistémique et de la réhabilitation des matrices endogènes",
    autorites: [
      {
        nom: "Samir Amin",
        origine: "Égypte/France",
        motif: "Pour la déconstruction de l'eurocentrisme épistémique.",
      },
      {
        nom: "Cheikh Anta Diop",
        origine: "Sénégal",
        motif:
          "Pour l'unité épistémologique de l'Afrique et la réhabilitation des matrices scientifiques de Kemet.",
      },
      {
        nom: "Jan Assmann (Allemagne) et Théophile Obenga",
        origine: "Congo",
        motif:
          "Pour la réhabilitation de la Maât comme opérateur logique universel de non-contradiction structurelle.",
      },
    ],
  },
];

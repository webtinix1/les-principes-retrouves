/**
 * Les trois modules de formation de l'École de Brazzaville.
 * Transcription fidèle du DOCUMENT DE SYNTHÈSE FINAL (Page 9, Section 2 —
 * La Grille des Modules de Formation). Données en snake_case.
 * Aucun tarif ni contenu inventé : tout provient du document maître.
 */

export type Session = {
  titre: string;
  points: string[];
};

export type Module = {
  id: string;
  numero: string;
  titre: string;
  public_cible: string;
  duree: string;
  prerequis: string;
  sessions: Session[];
  livrables: string[];
  tarif_b2b: string | null;
  tarif_b2c: string | null;
  tarif_devis: string | null;
  cta_label: string;
};

export const MODULES: Module[] = [
  {
    id: "fondements_organon",
    numero: "Module I",
    titre: "Les Fondements de l'Organon",
    public_cible:
      "Chercheurs, doctorants, magistrats, avocats, juristes publicistes, enseignants-chercheurs en épistémologie.",
    duree: "2 jours (14 heures) — Format présentiel ou hybride.",
    prerequis:
      "Aucun prérequis technique. Une formation universitaire de niveau Licence est recommandée.",
    sessions: [
      {
        titre: "Session 1 — La crise de l'intelligibilité contemporaine",
        points: [
          "Diagnostic de la fragmentation disciplinaire et de la Fiction de Clôture",
          "L'illusion quantitative moderniste et le principe de technicité",
          "Le piège post-moderne : du scepticisme au nihilisme du réel",
          "La nécessité de la remontée reconstructive",
        ],
      },
      {
        titre: "Session 2 — L'axiomatique de la Science Métamoderne",
        points: [
          "L'Équation Cyclique Universelle : Σ = M(F(V(Σ)))",
          "Le Voile Ontologique et le Filtrage Sélectif comme conditions de manifestation",
          "La Charnière Ontologique : conversion du principiel en phénoménal",
          "La double respiration du réel et de la connaissance",
        ],
      },
      {
        titre: "Session 3 — Le Canon de la Découverte en sept principes",
        points: [
          "Vocation : l'Architecture Préalable d'Intelligibilité",
          "Anomalie : détection de la rupture de symétrie",
          "Concentration : formalisation de la Question",
          "Hypothèse (hyppo-thésis) : la Majeure rationnelle préexistante",
          "Thésis : l'acte rigoureux de démonstration",
          "Expérantia : l'épreuve contrôlée",
          "Validation : la réintégration néguentropique",
        ],
      },
      {
        titre: "Session 4 — Les autorités de convergence épistémologique",
        points: [
          "René Thom : la misère théorique et la modélisation des catastrophes",
          "Pierre Delattre : la théorie générale des systèmes ouverts",
          "Jean-Paul Benzécri : la réhabilitation de l'induction libérée des prénotions",
          "Claude Bernard : l'exigence de l'idée directrice préalable",
          "Jules Carles : la loi organogénétique et le lamarco-darwinisme",
        ],
      },
    ],
    livrables: [
      "Attestation de l'Institut de Brazzaville",
      "Guide Méthodologique de l'Organon (PDF, 120 pages)",
      "Fiches de synthèse des concepts stabilisés",
      "Accès à la bibliographie commentée",
      "Accès aux Working Papers intégraux (WP-01, WP-02, WP-03)",
    ],
    tarif_b2b: "800 €",
    tarif_b2c: "350 €",
    tarif_devis: null,
    cta_label: "S'inscrire au Module I",
  },
  {
    id: "laboratoire_proactivite_juridique",
    numero: "Module II",
    titre: "Le Laboratoire de la Proactivité Juridique",
    public_cible:
      "Magistrats constitutionnels, avocats au Conseil constitutionnel, juristes d'État, ONG de défense des droits fondamentaux, législateurs, conseillers juridiques.",
    duree: "3 jours (21 heures) — Format présentiel obligatoire.",
    prerequis:
      "Module I validé ou expérience professionnelle équivalente en droit constitutionnel.",
    sessions: [
      {
        titre: "Session 1 — Le Théorème de la Validité Inversée",
        points: [
          "Formalisation physico-mathématique : V(S) = C(S) × E(S)",
          "La démonstration analytique aux limites",
          "L'annulation de l'Effectivité Sémantique et la nullité absolue de la Validité Globale",
          "Applications cliniques : le cas du Congo-Brazzaville",
        ],
      },
      {
        titre: "Session 2 — L'Urgence Caractérisée comme déclencheur objectif",
        points: [
          "Les trois critères cumulatifs : Gravité Systémique, Irréparabilité des droits, Carence Chronique du législateur",
          "La modélisation mathématique du seuil critique T_critique",
          "La destitution du dogme de la passivité juridictionnelle",
        ],
      },
      {
        titre: "Session 3 — Le modèle cybernétique de la Maât",
        points: [
          "Les trois propriétés cumulatives : Totalité, Indivisibilité, Cohérence Interne",
          "L'opposition Maât/Isfet : l'opérateur de non-contradiction structurelle",
          "Les Instructions du Vizir de Kemet et leur actualisation contemporaine",
          "La Maât comme thermostat supérieur de l'État de droit",
        ],
      },
      {
        titre: "Session 4 — L'archipel des laboratoires mondiaux",
        points: [
          "Inde : la Public Interest Litigation et la saisine suo motu",
          "Colombie : l'Estado de Cosas Inconstitucional",
          "Mexique : le contrôle de conventionnalité ex officio",
          "Afrique du Sud : le constitutionnalisme transformatif",
          "Kenya : les ordonnances de supervision",
          "Bénin : l'autosaisine de la Cour constitutionnelle",
          "Allemagne : l'Existenzminimum",
          "Canada : la lecture corrective (reading in)",
          "États-Unis : les structural injunctions",
        ],
      },
      {
        titre: "Session 5 — Le cas Mandela à Rivonia (1963-1964)",
        points: [
          "Le Syllogisme Dégradé de la Cour de Pretoria",
          "Le Syllogisme Réel de la Majeure universelle de la dignité humaine",
          "L'application clinique du Théorème de la Validité Inversée",
          "L'Impérium Théorique comme propriété objective de la structure logique",
        ],
      },
      {
        titre: "Session 6 — Le Principe Universel de Proactivité Judiciaire Encadrée",
        points: [
          "Énoncé formel du Principe",
          "Les conditions d'activation",
          "Les effets de l'injonction structurelle",
          "Le Guide Technique d'Invocation",
        ],
      },
    ],
    livrables: [
      "Certification de l'Institut de Brazzaville",
      "Guide Technique d'Invocation (PDF, 80 pages)",
      "Modèles d'Actes Juridictionnels (requêtes, conclusions, mémoires)",
      "Arrêt Pilote Fictif S/O N°001-2026 (modèle commenté)",
      "Accès au Laboratoire Doctrinal en ligne",
      "Accès au Guide Technique d'Invocation intégral",
      "Accès à l'Arrêt Pilote intégral commenté",
    ],
    tarif_b2b: "1 500 €",
    tarif_b2c: "650 €",
    tarif_devis: null,
    cta_label: "S'inscrire au Module II",
  },
  {
    id: "strategie_architectonique_systemique",
    numero: "Module III",
    titre: "Stratégie et Architectonique Systémique",
    public_cible:
      "Hautes juridictions, institutions internationales, cabinets de conseil stratégique, chercheurs confirmés, directeurs de thèse, comités d'éthique.",
    duree: "Sur devis (programme personnalisé de 5 à 10 jours).",
    prerequis:
      "Modules I et II validés, ou expérience professionnelle significative.",
    sessions: [
      {
        titre: "Axe 1 — Haute expertise de l'Institut de Brazzaville",
        points: [
          "Audit épistémologique des institutions juridiques",
          "Diagnostic des pathologies systémiques",
          "Recommandations stratégiques de réintégration corrective",
          "Accompagnement à la réforme constitutionnelle",
        ],
      },
      {
        titre: "Axe 2 — Applications avancées de la Méthode M",
        points: [
          "Sciences du vivant : la loi organogénétique, les mécanismes de régulation cellulaire, la réplication virale",
          "Physique fondamentale : les phénomènes nucléaires, les limites de l'univers matériel",
          "Sciences de la complexité : les transformations de la matière, les répercussions sur le biotope",
          "Théorie de l'information : la modélisation des flux de connaissance",
        ],
      },
      {
        titre: "Axe 3 — Séminaires sur invitation",
        points: [
          "Dirigés par le fondateur de l'École",
          "Thèmes : La transposition d'échelle, la Charnière Ontologique, le Programme d'Expansion",
          "Format : cercles restreints (10-15 participants maximum)",
          "Lieu : Brazzaville ou site partenaire",
        ],
      },
      {
        titre: "Axe 4 — Conseil stratégique",
        points: [
          "Refondation des institutions juridiques et académiques",
          "Design de programmes de recherche interdisciplinaires",
          "Évaluation de la cohérence systémique des politiques publiques",
          "Médiation épistémique entre disciplines",
        ],
      },
    ],
    livrables: [
      "Rapport d'expertise personnalisé",
      "Recommandations stratégiques opérationnelles",
      "Protocoles de recherche sur mesure",
      "Certification avancée de l'Institut",
      "Accès privilégié au Programme de Recherche",
      "Accès aux modèles personnalisés d'actes juridictionnels",
      "Conseil stratégique sur mesure",
    ],
    tarif_b2b: null,
    tarif_b2c: null,
    tarif_devis: "Sur Devis Uniquement (de 5 000 € à 20 000 € selon la complexité).",
    cta_label: "Demander un Devis",
  },
];

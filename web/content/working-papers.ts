/**
 * L'Arsenal Opérationnel du Laboratoire Doctrinal (Page 7).
 * Transcription fidèle du DOCUMENT DE SYNTHÈSE FINAL. Données en snake_case.
 * Aucun texte doctrinal inventé : tout provient du document maître.
 */

export type Ressource = {
  id: string;
  reference: string;
  titre: string;
  classification: string;
  volume: string;
  statut: string;
  soumission?: string;
  resume_label: string; // « Résumé exécutif » ou « Présentation »
  resume: string[];
  concepts_mobilises?: string[];
};

/** Section 2 — Les trois Working Papers fondateurs. */
export const WORKING_PAPERS: Ressource[] = [
  {
    id: "wp_01",
    reference: "EBZ-2026-WP-01",
    titre:
      "Désadhérence Réflexive et Visibilité Structurelle : Briser le Dogme Positiviste",
    classification: "Rang A — Épistémologie Fondamentale",
    volume: "~4 000 mots",
    statut: "Pièce fondatrice du Laboratoire Doctrinal",
    resume_label: "Résumé exécutif",
    resume: [
      "Ce document pose les fondations épistémologiques de la rupture méthodologique opérée par la Science Métamoderne. Il déploie le concept de Désadhérence Réflexive comme compétence cognitive supérieure permettant au chercheur de s'extraire des routines cognitives instituées (le Savoir Ordinaire K) pour détecter la faille invisible sous les sédimentations formelles.",
      "Le WP-01 démontre comment la rigueur de la structure (π₁) s'articule à la réouverture des relations (π₂) pour libérer l'Impérium théorique du modèle. Il ne produit pas de résultats sectoriels ; il fournit l'instrument de second ordre permettant à toute discipline de réinterroger ses propres conditions d'intelligibilité.",
    ],
    concepts_mobilises: [
      "Désadhérence Réflexive (compétence cognitive de suspension des cadres saturés)",
      "Fiction de Clôture (pathologie du savoir qui oublie les médiations)",
      "Voile Ontologique (V) et Filtrage Sélectif (F) comme conditions de manifestation",
      "Méthode Reconstructive (M) et remontée vers le Substratum Commun (Σ)",
      "Savoir Ordinaire (K) et Anomalie comme déclencheur",
    ],
  },
  {
    id: "wp_02",
    reference: "EBZ-2026-WP-02",
    titre:
      "Destitution Logique de la Circulaire Formelle Occidentale : Analyse du Cogito cartésien et du paradoxe socratique comme impasses tautologiques sédimentées",
    classification: "Rang A — Invalidation Logique",
    volume: "~4 000 mots",
    statut: "Pièce de déconstruction du Laboratoire Doctrinal",
    soumission: "Review of Modern Epistemology",
    resume_label: "Résumé exécutif",
    resume: [
      "Ce papier technique exécute la déconstruction chirurgicale des deux énoncés qui ont longtemps structuré l'épistémologie occidentale : le Cogito, ergo sum cartésien et le « Je ne sais rien » socratique. La présente recherche démontre que ces deux énoncés s'exécutent au sein d'un Syllogisme Dégradé qui ampute la raison de sa prémisse Majeure universelle, enfermant l'esprit dans une boucle tautologique circulaire.",
      "En modélisant le parcours de la découverte comme une trajectoire d'état différentielle et progressive (essais, erreurs, réajustements), ce document prouve que l'esprit humain s'extrait de son état initial par capitalisation néguentropique. Il décrit la convergence asymptotique de la conscience vers le sommet de Σ, réfutant l'illusion de la stagnation circulaire pour restituer à l'esprit humain sa puissance d'évolution universelle.",
    ],
    concepts_mobilises: [
      "Syllogisme Dégradé (ellipse de la Majeure universelle)",
      "Capitalisation néguentropique (progression asymptotique de la conscience)",
      "Fiction de Clôture (symptôme de la circularité tautologique)",
      "Progression asymptotique vs stagnation circulaire",
      "Architecture Préalable d'Intelligibilité",
    ],
  },
  {
    id: "wp_03",
    reference: "EBZ-2026-WP-03",
    titre:
      "Les Principes Retrouvés : Étude Reconstructive sur les Fondements Épistémologiques et Étymologiques du Langage Scientifique (1990-1992)",
    classification: "Rang A — Épistémologie Historique / Preuve d'Antériorité",
    volume: "~4 200 mots",
    statut: "Pièce d'ancrage historique du Laboratoire Doctrinal",
    soumission: "International Journal of Unified Science",
    resume_label: "Résumé exécutif",
    resume: [
      "Ce document opère la restitution clinique de la phase fondatrice du Programme de Brazzaville, telle qu'elle fut consignée dans les manuscrits non édités rédigés entre 1990 et 1992. Il démontre que l'Architecture Préalable d'Intelligibilité, le Canon de la découverte, la loi organogénétique et la séquence Hypothèse → Thésis → Expérantia ne sont pas des élaborations récentes, mais les formes matures d'intuitions structurales précocement identifiées, systématiquement formalisées et soumises à l'épreuve du temps.",
      "En reconstituant la trajectoire intellectuelle qui conduisait de l'analyse étymologique du langage scientifique à la modélisation systémique de la conversion du principiel en phénoménal, ce document établit une preuve d'antériorité inattaquable. Il démontre que la Science Métamoderne ne surgit pas d'un vide historique, mais constitue l'aboutissement méthodique d'un programme de recherche continu, dont les fondements furent posés à l'âge de dix-neuf ans, consolidés par l'étude intensive de Le Transformisme de Jules Carles, et progressivement élevés au rang de formalisation mathématique et cybernétique.",
    ],
    concepts_mobilises: [
      "Architecture Préalable d'Intelligibilité",
      "Fiction de Clôture terminologique",
      "Loi organogénétique et lamarco-darwinisme",
      "Charnière Ontologique et transposition d'échelle",
      "Canon en 7 principes (Vocation, Anomalie, Concentration, Hypothèse, Thésis, Expérantia, Validation)",
      "Équation Cyclique Universelle Σ = M(F(V(Σ)))",
      "Principe de Souveraineté du Démontré",
      "Principe de Fécondité Scientifique",
    ],
  },
];

/** Section 3 — Les deux pièces opératoires. */
export const PIECES_OPERATOIRES: Ressource[] = [
  {
    id: "guide_technique",
    reference: "Guide Technique d'Invocation",
    titre:
      "Le Protocole Contentieux de la Validité Inversée : Détection — Qualification — Demande",
    classification: "Arsenal Juridictionnel — Application du Théorème V(S)=C(S)×E(S)",
    volume: "~3 000 mots",
    statut: "Manuel du praticien du Laboratoire Doctrinal",
    resume_label: "Présentation",
    resume: [
      "Ce guide pratique fournit aux avocats, magistrats du fond et requérants l'armature méthodologique nécessaire pour opposer le Test de Validité Structurelle à toute exception d'irrecevabilité procédurale fondée sur la Fiction de Clôture. Il enseigne comment détecter cliniquement l'anomalie normative (cavaliers législatifs, omissions, imprécisions structurelles, violations du principe d'égalité devant l'impôt) ; qualifier le franchissement du seuil critique (répétition, blocage des droits, carence chronique du législateur, urgence caractérisée) ; formuler la Demande d'injonction proactive face à l'État défaillant, en mobilisant l'opérateur de la Maât comme principe de non-contradiction structurelle.",
      "Le Guide Technique d'Invocation transforme le praticien en opérateur vivant de la Méthode M. Il ne s'agit plus de commenter la jurisprudence, mais de forcer le système juridique à réintégrer les paramètres de la Maât (Totalité, Indivisibilité, Cohérence Interne) comme thermostat supérieur de l'État de droit.",
    ],
    concepts_mobilises: [
      "Test de Validité Structurelle",
      "Fiction de Clôture procédurale",
      "Maât comme principe de non-contradiction structurelle",
      "Méthode Reconstructive (M) appliquée au contentieux",
    ],
  },
  {
    id: "arret_pilote",
    reference: "Arrêt Pilote Fictif S/O N°001-2026",
    titre:
      "Sieur X. et Collectif des Acteurs de l'État de Droit c/ État Défaillant — Modélisation de l'Injonction Structurelle",
    classification: "Haute Décision Constitutionnelle — Saisine d'Office (S/O)",
    volume: "~2 000 mots",
    statut: "Modèle juridictionnel du Laboratoire Doctrinal",
    resume_label: "Présentation",
    resume: [
      "Retranscription intégrale de la décision juridictionnelle de référence appliquant le paradigme métamoderne. L'instance : Haute Cour de l'Intelligibilité Constitutionnelle (Institut de Brazzaville, Juillet 2026). Le mode de saisine : Saisine d'Office et Autosaisine provoquées par l'Urgence Caractérisée (Gravité systémique, Irréparabilité des droits, Carence Chronique du législateur). Les faits : constat d'une dérive entropique majeure où la Fiction de Clôture procédurale d'une haute cour étouffe l'expression de la dignité humaine, créant une rupture de symétrie avec la Majeure universelle.",
      "La motivation applique le Théorème de la Validité Inversée : la Constitution de papier présente une perfection syntaxique apparente C(S) ; la Tension Systémique [T(S)] provoquée par l'Isfet normatif tend vers l'infini ; par l'application de la formule E(S) = E₀ · e^(−α·T(S)), l'Effectivité Sémantique E(S) est mathématiquement annulée (E(S) = 0) ; en conséquence, la Validité Globale du système s'effondre : V(S) = C(S) × 0 = 0. La loi prétendue « saine doctrine » est déclarée nullité absolue pour absurdité cybernétique.",
      "Le dispositif : Injonction Structurelle transhistorique (Effet Huxley). La Cour ordonne la réintégration immédiate des paramètres de la Maât comme thermostat de non-contradiction supérieur du système juridique. L'Arrêt Pilote S/O N°001-2026 fournit un modèle clé en main : il démontre que la Saisine d'Office n'est pas un activisme discrétionnaire, mais une obligation cybernétique de rétroaction négative face à l'entropie de l'Isfet.",
    ],
    concepts_mobilises: [
      "Théorème de la Validité Inversée : V(S) = C(S) × E(S)",
      "Effectivité Sémantique : E(S) = E₀ · e^(−α·T(S))",
      "Saisine d'Office et Urgence Caractérisée",
      "Injonction Structurelle (Effet Huxley)",
      "Maât comme thermostat de non-contradiction",
    ],
  },
];

/** Section 4 — La progression logique de l'arsenal. */
export type EtapeProgression = {
  reference: string;
  role: string;
  prerequis: string;
};

export const PROGRESSION: EtapeProgression[] = [
  { reference: "WP-01", role: "Protocole épistémologique", prerequis: "Module I minimum" },
  { reference: "WP-02", role: "Invalidation des tautologies", prerequis: "Module I minimum" },
  { reference: "WP-03", role: "Fondements historiques", prerequis: "Module I minimum" },
  { reference: "Guide Technique", role: "Manuel du praticien", prerequis: "Module II" },
  { reference: "Arrêt Pilote", role: "Modèle juridictionnel", prerequis: "Module II" },
  { reference: "Application contentieuse réelle", role: "Praticien formé", prerequis: "—" },
];

/** Section 1 — Politique d'accès hybride à trois niveaux (présentée comme information). */
export type NiveauAcces = {
  numero: string;
  titre: string;
  description: string;
};

export const NIVEAUX_ACCES: NiveauAcces[] = [
  {
    numero: "Niveau 1",
    titre: "Accès libre",
    description:
      "Les résumés exécutifs, les présentations et les extraits sont librement consultables pour garantir la diffusion doctrinale et l'universalité de la démarche.",
  },
  {
    numero: "Niveau 2",
    titre: "Accès conditionné",
    description:
      "Les documents intégraux (Working Papers, Guide Technique, Arrêt Pilote) sont réservés aux participants des modules de formation, garantissant ainsi la qualité de la réception et la rigueur de l'application.",
  },
  {
    numero: "Niveau 3",
    titre: "Accès premium",
    description:
      "Les modèles personnalisés et le conseil stratégique sont réservés aux participants du Module III.",
  },
];

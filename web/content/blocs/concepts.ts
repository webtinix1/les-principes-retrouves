import type { PageBlocs } from "./types";
import { listeCartes, listeTermes, simple as s } from "./fabrique-v16";

const SEO = "Référencement (Google)";
const ENTETE = "En-tête de page (bandeau bleu nuit)";
const OUV = "Ouverture";
const PLANS = "Trois plans à ne jamais confondre";
const SOCLE = "Le socle principiel et structurel";
const GENESE = "Genèse, symbolisation et formalisation";
const MESURE = "La reconstruction et la mesure";
const CASC = "La dynamique de décomposition : cascade entropique";
const JUR = "Les concepts du laboratoire juridique";
const META = "Science Métamoderne et École de pensée de Brazzaville";
const ELL = "L’ellipse méthodologique";
const DIAG = "La cascade entropique : structure du diagnostic";
const DECLIN = "Déclin et intelligibilité commune";
const OPS = "Les opérateurs de la matrice kémitique";
const CASC_JUR = "La cascade entropique du désordre juridique";
const PRO = "La proactivité judiciaire encadrée : guide technique";
const CANON = "Fin de page — Le Canon de la découverte";
const LIVRE = "Fin de page — Livre des livres et unité des sciences";
const ANCRE = "Chaque carte porte une ancre de lien stable (/concepts#…) : ne pas modifier le champ « Ancre ».";

/** Textes de la page « Concepts et vocabulaire de recherche » (prototype maître V16). */
export const CONCEPTS_BLOCS: PageBlocs = {
  page: "concepts",
  chemin: "/concepts",
  titre: "Concepts et vocabulaire de recherche",
  blocs: [
    s("concepts.seo.titre", "Titre (onglet et Google)", SEO, "Concepts et vocabulaire de recherche — Principes Retrouvés"),
    s(
      "concepts.seo.description",
      "Description (Google)",
      SEO,
      "Les notions qui structurent la reconstruction de l’intelligibilité et son application dans le champ juridique : Maât, Σ, CRGI, Méthode M, cascade entropique.",
    ),
    s("concepts.v16_tete.surtitre", "Surtitre doré", ENTETE, "Infrastructure conceptuelle"),
    s("concepts.v16_tete.titre", "Titre de la page (H1)", ENTETE, "Concepts et vocabulaire de recherche"),
    s(
      "concepts.v16_tete.intro",
      "Phrase d’introduction",
      ENTETE,
      "Les notions qui structurent la reconstruction de l’intelligibilité et son application dans le champ juridique.",
    ),
    s(
      "concepts.v16_ouverture.chapeau",
      "Chapeau (grand texte d’ouverture)",
      OUV,
      "Le vocabulaire des Principes Retrouvés constitue une infrastructure de recherche. Les concepts ne sont pas des slogans interchangeables : chacun occupe une place déterminée, répond à une fonction et doit être lu dans son rapport aux autres notions.",
    ),
    s("concepts.v16_plans.titre", "Titre de section", PLANS, "Trois plans à ne jamais confondre"),
    s("concepts.v16_socle.titre", "Titre de section", SOCLE, "Le socle principiel et structurel"),
    s("concepts.v16_genese.titre", "Titre de section", GENESE, "Genèse, symbolisation et formalisation"),
    s("concepts.v16_genese.surtitre", "Encadré — surtitre doré", GENESE, "CRGI · SÉQUENCE DE RÉFÉRENCE"),
    s(
      "concepts.v16_genese.sequence",
      "Encadré — séquence",
      GENESE,
      "Phénomène → Saisie de la relation → Interprétation → Détermination → Symbolisation → Formalisation",
    ),
    s(
      "concepts.v16_genese.texte",
      "Encadré — texte",
      GENESE,
      "La symbolisation est un moment propre de la genèse de l’intelligibilité. La formalisation en constitue une détermination ultérieure ; elle ne peut être rétroactivement traitée comme l’origine absolue de la relation exprimée.",
    ),
    s("concepts.v16_mesure.titre", "Titre de section", MESURE, "La reconstruction et la mesure"),
    s("concepts.v16_cascade.titre", "Titre de section", CASC, "La dynamique de décomposition : cascade entropique"),
    s("concepts.v16_cascade.carte_titre", "Carte — titre", CASC, "Cascade entropique"),
    s(
      "concepts.v16_cascade.carte_p1",
      "Carte — paragraphe 1",
      CASC,
      "Processus de décomposition organique qui apparaît lorsque la spécialisation, la segmentation, la fragmentation et la désarticulation conduisent à la perte de l’intelligibilité commune, à la désorientation puis à la décomposition. La cascade entropique ne concerne pas seulement la connaissance : elle peut également affecter l’organisation de la Cité et, plus généralement, toute organisation structurelle.",
    ),
    s(
      "concepts.v16_cascade.carte_p2",
      "Carte — paragraphe 2",
      CASC,
      "La dynamique n’est pas présentée comme une fatalité : la reconnaissance de l’écart ouvre la possibilité d’une correction avant son terme.",
    ),
    s("concepts.v16_juridique.titre", "Titre de section", JUR, "Les concepts du laboratoire juridique"),
    s("concepts.v16_metamoderne.titre", "Titre de section", META, "Science Métamoderne et École de pensée de Brazzaville"),
    s(
      "concepts.v16_metamoderne.texte",
      "Paragraphe",
      META,
      "La Science Métamoderne est un Organon de réintégration et de coordination des savoirs, non une discipline concurrente. La symbolisation y est une médiation nécessaire à la construction effective de la science de l’unité. L’École de pensée de Brazzaville constitue le lieu de structuration, de discussion et de transmission de cette reconstruction, sans revendiquer un monopole de l’universel.",
    ),
    s(
      "concepts.v16_metamoderne.note",
      "Note (petits caractères)",
      META,
      "Ce glossaire oriente la lecture ; il ne remplace pas les définitions et démonstrations des ouvrages maîtres. Les concepts du Tome II sont des catégories analytiques de la recherche, non des qualifications juridictionnelles.",
    ),
    s("concepts.v16_ellipse.titre", "Titre de section", ELL, "L’ellipse méthodologique"),
    s(
      "concepts.v16_ellipse.texte",
      "Paragraphe",
      ELL,
      "Passage insuffisamment explicité du phénomène ou du résultat à la formalisation, qui laisse dans l’ombre une ou plusieurs médiations de la genèse de la connaissance. Le CRGI permet d’examiner ces médiations : saisie de la relation, interprétation, détermination et symbolisation. L’ellipse n’est pas synonyme de toute abstraction ni de toute formalisation ; elle désigne une omission dans l’explicitation du processus.",
    ),
    s("concepts.v16_diagnostic.titre", "Titre de section", DIAG, "La cascade entropique : structure du diagnostic"),
    s(
      "concepts.v16_diagnostic.p1",
      "Paragraphe 1",
      DIAG,
      "Dynamique possible de désarticulation dans laquelle la différenciation des parties n’est plus accompagnée d’une reconstruction de leurs relations. La séquence de référence est : spécialisation → segmentation → fragmentation → désarticulation → désorientation → risque de décomposition. Elle constitue un schème diagnostique, non une loi physique universelle ni une fatalité historique.",
    ),
    s(
      "concepts.v16_diagnostic.p2",
      "Paragraphe 2",
      DIAG,
      "Dans le domaine des savoirs, elle met en évidence l’écart entre l’accumulation des résultats et leur réintégration. Dans le domaine institutionnel, elle invite à examiner la perte de cohérence entre fonctions, règles, responsabilités et finalités. Son usage exige de préciser le système étudié et les indices de désarticulation observés.",
    ),
    s("concepts.v16_declin.titre", "Titre de section", DECLIN, "Déclin et intelligibilité commune"),
    s(
      "concepts.v16_declin.texte",
      "Paragraphe",
      DECLIN,
      "Le déclin dont il est question ne doit pas être compris comme une prophétie indifférenciée. Il désigne le risque qu’un système perde la capacité de reconnaître, de relier et de corriger les écarts qui affectent sa propre organisation. Le diagnostic ouvre ainsi une question opératoire : quelles relations doivent être restituées pour empêcher que la fragmentation ne se transforme en désorganisation durable ?",
    ),
    s(
      "concepts.v16_operateurs.titre",
      "Titre de section",
      OPS,
      "Les opérateurs de la matrice kémitique mobilisés dans le laboratoire juridique",
    ),
    s(
      "concepts.v16_operateurs.conclusion",
      "Paragraphe après les opérateurs",
      OPS,
      "Ces opérateurs doivent être contextualisés à partir des sources kémitiques et distingués de leur formalisation doctrinale contemporaine.",
    ),
    s("concepts.v16_cascade_juridique.titre", "Titre de section", CASC_JUR, "La cascade entropique du désordre juridique"),
    s(
      "concepts.v16_cascade_juridique.sequence",
      "Séquence",
      CASC_JUR,
      "Injustice → Incorrection → Dysfonctionnement → Désordre → Chaos (Isfet)",
    ),
    s(
      "concepts.v16_cascade_juridique.texte",
      "Paragraphe",
      CASC_JUR,
      "Cette chaîne décrit une dynamique de dégradation et les conséquences possibles d'une absence de rectification. Elle ne constitue pas une équivalence automatique entre toute irrégularité et le chaos.",
    ),
    s(
      "concepts.v16_proactivite.titre",
      "Titre de section",
      PRO,
      "La proactivité judiciaire encadrée : guide technique d’invocation",
    ),
    s(
      "concepts.v16_proactivite.sequence",
      "Séquence",
      PRO,
      "Anomalie → Nécessité → Compétence → Initiative → Contradictoire → Motivation → Proportionnalité → Restauration → Non-substitution",
    ),
    s(
      "concepts.v16_proactivite.texte",
      "Paragraphe",
      PRO,
      "La nécessité n'engendre pas la compétence. La Méthode M ne crée ni pouvoir juridictionnel ni voie de recours. Chaque étape appelle une vérification propre au droit applicable.",
    ),
    s("concepts.v16_canon.titre", "Titre", CANON, "Le Canon de la découverte en sept principes"),
    s(
      "concepts.v16_canon.p1",
      "Paragraphe 1",
      CANON,
      "Primat de l’intelligibilité sur l’opératoire ; Théorème de la Genèse Scientifique ; nécessité heuristique ; reconstruction synthétique ; double respiration du réel et de la connaissance ; non-imposition ; démonstration catégorique. Le Canon est exposé intégralement dans la Note épistémologique et développé dans le Tome I.",
    ),
    s(
      "concepts.v16_canon.p2",
      "Paragraphe 2",
      CANON,
      "Principe V : les mouvements descendant ontologique et ascendant épistémologique sont complémentaires, mais non mécaniquement inverses. Cette formulation respecte l’arbitrage doctrinal retenu pour la présentation publique.",
    ),
    s("concepts.v16_livre.titre", "Titre", LIVRE, "Livre des livres et unité des sciences"),
    s(
      "concepts.v16_livre.p1",
      "Paragraphe 1",
      LIVRE,
      "Le Livre encyclopédique universel désigne l’ambition de rechercher les conditions communes d’intelligibilité des savoirs. Il ne vise ni la fusion des disciplines ni la réduction de leurs méthodes à un langage unique.",
    ),
    s(
      "concepts.v16_livre.p2",
      "Paragraphe 2",
      LIVRE,
      "La Science Métamoderne coordonne les sciences constituées à un niveau supérieur d’intelligibilité et réintègre leurs connaissances différenciées dans l’unité structurelle du réel et de la connaissance. Cette réintégration constitue son opération propre ; elle n’abolit pas la pluralité disciplinaire.",
    ),
  ],
  listes: [
    listeCartes(
      "v16_plans",
      "Les trois plans",
      `${PLANS} — cartes. ${ANCRE}`,
      [
        {
          ancre: "plan_ontologique",
          tag: "PLAN ONTOLOGIQUE",
          titre: "Architecture Préalable · Pyramide Maât–Σ",
          paragraphes: [
            "Elle exprime les conditions principielle et structurelle de la manifestation et de l’intelligibilité. La pyramide est la représentation canonique de cette architecture.",
          ],
        },
        {
          ancre: "plan_genetique",
          tag: "PLAN GÉNÉTIQUE",
          titre: "CRGI · Genèse de la connaissance",
          paragraphes: [
            "Il restitue les opérations constitutives de la connaissance : phénomène, saisie de la relation, interprétation, détermination, symbolisation, formalisation.",
          ],
        },
        {
          ancre: "plan_reconstructif",
          tag: "PLAN RECONSTRUCTIF",
          titre: "M · Reconstruction",
          paragraphes: [
            "La Méthode M travaille à partir du savoir constitué pour reconstruire les relations et principes devenus obscurcis. Elle ne se confond ni avec la pyramide ni avec le CRGI.",
          ],
        },
      ],
      { ancres: true },
    ),
    listeCartes(
      "v16_socle",
      "Le socle principiel et structurel",
      `${SOCLE} — cartes. ${ANCRE}`,
      [
        {
          ancre: "maat",
          titre: "Maât",
          paragraphes: [
            "Principe d’intelligibilité au niveau principiel, issu de la matrice kémitique. Maât ne se réduit pas à une traduction morale ou culturelle et ne se confond pas avec Σ.",
          ],
        },
        {
          ancre: "sigma",
          titre: "Σ",
          paragraphes: [
            "Formalisation contemporaine de l’unité structurelle recherchée. Σ n’est ni une discipline supplémentaire ni une opération méthodologique.",
          ],
        },
        {
          ancre: "substratum_commun",
          titre: "Substratum Commun",
          paragraphes: [
            "Unité structurelle recherchée à travers la diversité des systèmes et des phénomènes, sans abolir la spécificité des objets et des méthodes disciplinaires.",
          ],
        },
        {
          ancre: "pi1_pi2",
          titre: "π₁ / π₂",
          paragraphes: [
            "π₁ désigne la différenciation ; π₂, la corrélation. Leur articulation permet de penser ensemble distinction et relation.",
          ],
        },
        {
          ancre: "voile_ontologique",
          titre: "Voile (V)",
          paragraphes: [
            "Condition de manifestation. Il ne se confond pas avec le filtrage et ne doit pas être présenté comme une opération de sélection.",
          ],
        },
        {
          ancre: "filtrage_selectif",
          titre: "Filtrage (F)",
          paragraphes: ["Fonction de sélection et d’organisation des éléments manifestés dans la constitution du savoir."],
        },
      ],
      { ancres: true, tags: false },
    ),
    listeCartes(
      "v16_mesure",
      "La reconstruction et la mesure",
      `${MESURE} — cartes. ${ANCRE}`,
      [
        {
          ancre: "methode_m",
          titre: "M — Méthode reconstructive",
          paragraphes: [
            "M organise la reconstruction à partir du savoir disponible selon le principe de Non-Perte. Elle ne garantit ni récupération immédiate ni reconstruction infaillible.",
          ],
        },
        {
          ancre: "k_m_k_prime_sigma",
          titre: "K → M → K′ → Σ",
          paragraphes: [
            "K désigne la connaissance constituée ; M la méthode reconstructive ; K′ la connaissance reconstruite ; Σ la formalisation principielle vers laquelle s’oriente la remontée.",
          ],
        },
        {
          ancre: "referentiel_intelligibilite",
          titre: "R — Référentiel d’Intelligibilité",
          paragraphes: [
            "Projection opératoire de l’Architecture dans la recherche. R explicite les critères au regard desquels K peut être examiné. R n’est pas Σ.",
          ],
        },
        {
          ancre: "ecart_r_k",
          titre: "Δ(R,K)",
          paragraphes: [
            "Écart structurel entre l’état du savoir K et les conditions d’intelligibilité formulées par R. Il appelle examen et interprétation, non conclusion automatique.",
          ],
        },
        {
          ancre: "grandeur_et_quantite",
          titre: "Grandeur et quantité",
          paragraphes: [
            "Une grandeur n’est pas nécessairement une quantité. La mesure structurelle porte sur une relation de cohérence relativement à un référentiel explicite ; elle ne mesure pas directement le principe.",
          ],
        },
        {
          ancre: "desadherence_reflexive",
          titre: "Désadhérence réflexive",
          paragraphes: [
            "Prise de distance critique à l’égard des cadres conceptuels reçus afin de réexaminer les conditions de visibilité et de validité, sans abandonner l’exigence de démonstration.",
          ],
        },
      ],
      { ancres: true, tags: false },
    ),
    listeCartes(
      "v16_juridique",
      "Les concepts du laboratoire juridique",
      `${JUR} — cartes. ${ANCRE}`,
      [
        {
          ancre: "fiction_de_cloture",
          titre: "Fiction de clôture",
          paragraphes: [
            "Catégorie analytique désignant une situation dans laquelle les effets d’une clôture procédurale peuvent s’étendre à une question constitutionnelle distincte qui n’a pas été examinée au fond. Elle ne qualifie pas, à elle seule, la légalité de la décision.",
          ],
        },
        {
          ancre: "syllogisme_degrade",
          titre: "Syllogisme dégradé",
          paragraphes: [
            "Catégorie de recherche décrivant un raisonnement qui traite la majeure formelle comme si elle épuisait les conditions de légitimité et de cohérence de l’ordre juridique.",
          ],
        },
        {
          ancre: "syllogisme_reel",
          titre: "Syllogisme réel",
          paragraphes: [
            "Reconstruction du raisonnement par réintégration du contexte, du principe et de la cohérence du système : règle → fait → contexte → principe → cohérence du système.",
          ],
        },
        {
          ancre: "proactivite_judiciaire_encadree",
          titre: "Proactivité judiciaire encadrée",
          paragraphes: [
            "Proposition doctrinale d’une intervention juridictionnelle juridiquement fondée et procéduralement encadrée. Elle suppose une compétence existante et le respect des garanties ; la nécessité ne crée pas la compétence.",
          ],
        },
      ],
      { ancres: true, tags: false },
    ),
    listeTermes("v16_operateurs", "Les opérateurs de la matrice kémitique", `${OPS} — un paragraphe par opérateur (« Terme : texte »)`, [
      { terme: "Ir Maât", texte: "mise en œuvre active du principe, pratiquer la Maât et rétablir l’ordre." },
      { terme: "Oupet", texte: "charge ou mission fonctionnelle attachée à la fonction considérée." },
      { terme: "Serekh", texte: "redressement du tort et restauration de l’ordre lésé dans la reconstruction proposée." },
      { terme: "Isfet", texte: "chaos, antithèse de Maât et terme-limite de la dégradation." },
    ]),
  ],
};

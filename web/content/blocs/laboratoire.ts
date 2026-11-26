import type { PageBlocs } from "./types";
import { listeCartes, listeTermes, simple as s } from "./fabrique-v16";

const SEO = "Référencement (Google)";
const ENTETE = "En-tête de page (bandeau bleu nuit)";
const OUV = "Ouverture";
const S1 = "1. Le laboratoire congolais : trois requêtes, trois réponses";
const S2 = "2. De l’observation à la question scientifique";
const S3 = "3. La matrice kémitique de Maât";
const S4 = "4. Les questions du droit contemporain";
const S5 = "5. De la théorie à l’arsenal opérationnel";
const OPS = "La matrice de Maât et ses opérateurs";
const CASC = "La cascade entropique appliquée à l’ordre juridique";
const GUIDE = "Le Guide technique d’invocation";
const DEM = "Fin de page — De l’observation à la reconstruction";

/** Textes de la page « Le Laboratoire » (prototype maître V16). */
export const LABORATOIRE_BLOCS: PageBlocs = {
  page: "laboratoire",
  chemin: "/laboratoire",
  titre: "Le Laboratoire",
  blocs: [
    s("laboratoire.seo.titre", "Titre (onglet et Google)", SEO, "Le Laboratoire — espace d’application et de confrontation"),
    s(
      "laboratoire.seo.description",
      "Description (Google)",
      SEO,
      "Le Laboratoire : des faits juridictionnels à la matrice de Maât, puis à la reconstruction pratique des questions du droit contemporain.",
    ),
    s("laboratoire.v16_tete.surtitre", "Surtitre doré", ENTETE, "Espace d’application et de confrontation"),
    s("laboratoire.v16_tete.titre", "Titre de la page (H1)", ENTETE, "Le Laboratoire"),
    s(
      "laboratoire.v16_tete.intro",
      "Phrase d’introduction",
      ENTETE,
      "Des faits juridictionnels à la matrice de Maât, puis à la reconstruction pratique des questions du droit contemporain.",
    ),
    s(
      "laboratoire.v16_ouverture.chapeau",
      "Chapeau (grand texte d’ouverture)",
      OUV,
      "Le Laboratoire constitue l’espace d’application de la théorie. Le Tome II en représente la première application juridictionnelle développée. La démarche ne plaque pas une conclusion sur les faits : elle part d’un dossier déterminé, distingue les réponses juridictionnelles, formule ensuite la question scientifique et construit progressivement ses outils conceptuels et pratiques.",
    ),
    s("laboratoire.v16_s1.titre", "Titre de section", S1, "1. Le laboratoire congolais : trois requêtes, trois réponses"),
    s(
      "laboratoire.v16_s1.texte",
      "Paragraphe d’introduction",
      S1,
      "Les trois requêtes portent sur la loi n° 2-2000 du 1er février 2000 portant organisation de la pêche maritime. Leur succession constitue le matériau empirique initial. Les différences de requérants, de moyens et de motifs doivent être conservées.",
    ),
    s("laboratoire.v16_s1.constat_intitule", "Encadré — intitulé en gras", S1, "Constat de méthode :"),
    s(
      "laboratoire.v16_s1.constat_texte",
      "Encadré — texte",
      S1,
      "la première décision porte sur la capacité de représentation ; la deuxième sur le droit constitutionnel applicable dans le temps ; la troisième sur la nouveauté d’un moyen et la clôture procédurale. Ces trois réponses ne sont ni identiques ni réductibles à un refus uniforme d’examiner le fond.",
    ),
    s("laboratoire.v16_s2.titre", "Titre de section", S2, "2. De l’observation à la question scientifique"),
    s(
      "laboratoire.v16_s2.p1",
      "Paragraphe 1",
      S2,
      "Ce n’est qu’après l’examen différencié des trois décisions que la question de recherche peut être formulée : dans quelles conditions la protection constitutionnelle peut-elle demeurer effective lorsque les mécanismes ordinaires de saisine et de traitement des recours ne permettent pas l’examen autonome de certains griefs ?",
    ),
    s(
      "laboratoire.v16_s2.p2",
      "Paragraphe 2",
      S2,
      "La difficulté ne démontre pas que toute clôture procédurale serait illégitime, ni que tout moyen nouveau devrait nécessairement être accueilli. Elle conduit à examiner les rapports entre sécurité juridique, autorité de la chose jugée, objet du litige et traitement effectif d’une question constitutionnelle distincte.",
    ),
    s("laboratoire.v16_s3.titre", "Titre de section", S3, "3. La matrice kémitique de Maât : fondements de la reconstruction"),
    s(
      "laboratoire.v16_s3.p1",
      "Paragraphe 1",
      S3,
      "La recherche remonte ensuite vers les matériaux historiques, lexicaux et institutionnels de Kemet. Maât n’est pas un ornement culturel ajouté à la démonstration, ni un simple synonyme de justice. Dans la reconstruction proposée, elle constitue un principe structurant de l’ordre juste, de la vérité, de la rectitude et de la cohérence.",
    ),
    s(
      "laboratoire.v16_s3.p2",
      "Paragraphe 2",
      S3,
      "L’investigation distingue les attestations historiques des catégories doctrinales contemporaines. Elle examine les rapports entre principe, fonction, responsabilité, plainte, correction et restauration de l’ordre, sans assimiler les institutions anciennes aux juridictions constitutionnelles modernes.",
    ),
    s("laboratoire.v16_s4.titre", "Titre de section", S4, "4. Les questions du droit contemporain : conceptualiser et prendre en charge"),
    s(
      "laboratoire.v16_s4.p1",
      "Paragraphe avant la liste",
      S4,
      "La recherche ne s’arrête pas à une analogie historique. Elle revient aux problèmes contemporains du droit et les affronte sur leurs terrains propres : recevabilité, chose jugée, accès au juge, initiative juridictionnelle, effectivité des droits, remèdes structurels et limites de la fonction juridictionnelle.",
    ),
    s(
      "laboratoire.v16_s4.p2",
      "Paragraphe après la liste",
      S4,
      "La comparaison internationale ne consiste pas à rechercher un modèle uniforme. Elle distingue les fonctions d’accès, d’initiative, de suivi, de réparation et de traitement des défaillances structurelles, dont les fondements varient selon les systèmes.",
    ),
    s("laboratoire.v16_s5.titre", "Titre de section", S5, "5. De la théorie à l’arsenal opérationnel"),
    s(
      "laboratoire.v16_s5.p1",
      "Paragraphe",
      S5,
      "Le Tome II ne propose pas une permission générale d’agir au juge. Il organise une méthode de vérification des conditions et des limites de l’intervention. La nécessité de restaurer un ordre ne crée jamais, à elle seule, une compétence juridictionnelle nouvelle. Le Laboratoire met ainsi en relation reconstruction conceptuelle et prise en charge pratique, sans effacer les exigences du droit positif.",
    ),
    s(
      "laboratoire.v16_s5.encadre",
      "Encadré (en gras)",
      S5,
      "Le Laboratoire est un espace d’application, de confrontation et de production conceptuelle. Il ne doit pas être confondu avec une bibliothèque générale ni avec un catalogue de ressources.",
    ),
    s("laboratoire.v16_operateurs.titre", "Titre de section", OPS, "La matrice de Maât et ses opérateurs : de l’ordre à la restauration"),
    s(
      "laboratoire.v16_operateurs.intro",
      "Paragraphe d’introduction",
      OPS,
      "La reconstruction juridique ne prend pas Maât comme une simple analogie. Elle examine la matrice kémitique dans ses dimensions principielle, fonctionnelle et restauratrice, puis reconstruit ses opérateurs dans le cadre du droit contemporain.",
    ),
    s(
      "laboratoire.v16_operateurs.legende",
      "Légende sous les cartes",
      OPS,
      "Les opérateurs sont présentés dans leur fonction doctrinale au sein de la reconstruction. Leur contextualisation historique doit rester distincte de leur formalisation contemporaine.",
    ),
    s("laboratoire.v16_cascade.titre", "Titre de section", CASC, "La cascade entropique appliquée à l’ordre juridique"),
    s("laboratoire.v16_cascade.sequence", "Séquence", CASC, "Injustice → Incorrection → Dysfonctionnement → Désordre → Chaos (Isfet)"),
    s(
      "laboratoire.v16_cascade.texte",
      "Paragraphe",
      CASC,
      "Cette séquence décrit la dynamique de dégradation lorsque le tort n’est pas corrigé, que les fonctions ne remplissent plus leur mission et que l’ordre lésé ne retrouve pas ses conditions de cohérence. Elle donne au diagnostic une portée prévisionnelle : reconnaître le processus permet d’interroger les conditions de rectification avant que le désordre ne se consolide.",
    ),
    s("laboratoire.v16_guide.titre", "Titre de section", GUIDE, "Le Guide technique d’invocation : neuf étapes de contrôle"),
    s(
      "laboratoire.v16_guide.sequence",
      "Séquence",
      GUIDE,
      "Anomalie → Nécessité → Compétence → Initiative → Contradictoire → Motivation → Proportionnalité → Restauration → Non-substitution",
    ),
    s(
      "laboratoire.v16_guide.texte",
      "Paragraphe",
      GUIDE,
      "La nécessité théorique de répondre à une anomalie ne se confond jamais avec la compétence juridique pour agir. La Méthode M ne crée ni compétence ni voie de recours. L’urgence ne crée pas, à elle seule, une compétence. Le contradictoire, la motivation, la proportionnalité, la restauration recherchée et la non-substitution demeurent des exigences distinctes.",
    ),
    s("laboratoire.v16_demarche.titre", "Titre", DEM, "De l’observation à la reconstruction : ordre de la démarche"),
    s(
      "laboratoire.v16_demarche.p1",
      "Paragraphe 1",
      DEM,
      "Le laboratoire ne commence pas par une conclusion générale sur l’ineffectivité du droit contemporain. Il restitue d’abord les faits, les requêtes et les réponses juridictionnelles dans leurs différences. C’est seulement après cette observation que l’anomalie peut être formulée et que la question scientifique peut être construite.",
    ),
    s(
      "laboratoire.v16_demarche.p2",
      "Paragraphe 2",
      DEM,
      "La progression est la suivante : faits et requêtes → décisions différenciées → difficultés révélées → formulation de la question scientifique → construction théorique → confrontation comparative → formalisation de la proactivité judiciaire encadrée.",
    ),
    s(
      "laboratoire.v16_demarche.p3",
      "Paragraphe 3",
      DEM,
      "La nécessité d’une intervention ne crée pas, à elle seule, une compétence juridictionnelle. Toute proposition d’action positive demeure conditionnée par le droit applicable, le contradictoire, la motivation, la proportionnalité et la non-substitution.",
    ),
  ],
  listes: [
    listeCartes("v16_requetes", "Les trois requêtes", `${S1} — cartes`, [
      {
        tag: "23 JUIN 2022 · PREMIÈRE REQUÊTE",
        titre: "Première requête — représentation d’organisations professionnelles",
        paragraphes: [
          "La requête a été introduite le 23 juin 2022 par Monsieur MAMBOU Gaudéric, agissant au nom de plusieurs organisations professionnelles. Décision n° 007/DCC/SVA/22 du 7 juillet 2022.",
          "Irrecevabilité liée à l’insuffisance des pièces établissant l’existence juridique et la capacité d’agir des organisations représentées. Le grief constitutionnel n’est pas examiné au fond.",
        ],
      },
      {
        tag: "2 SEPTEMBRE 2022 · DEUXIÈME REQUÊTE",
        titre: "Deuxième requête — régime constitutionnel applicable dans le temps",
        paragraphes: [
          "La requête a été introduite le 2 septembre 2022 par Monsieur KINOUANI Serge Florent. Décision n° 001/DCC/SVA/23 du 30 mars 2023.",
          "Examen du régime constitutionnel applicable dans le temps à une loi adoptée sous l’empire de l’Acte fondamental de transition de 1997. La Cour écarte l’application rétroactive des exigences procédurales de la Constitution de 2015 et rejette la requête.",
        ],
      },
      {
        tag: "3 AOÛT 2023 · TROISIÈME REQUÊTE",
        titre: "Troisième requête — moyen manifestement nouveau",
        paragraphes: [
          "Une nouvelle requête a été introduite le 3 août 2023 par Monsieur KINOUANI Serge Florent. Décision n° 006/DCC/SVA/23 du 6 septembre 2023.",
          "Un moyen notamment tiré de l’article 15 de la Constitution de 2015 est qualifié de « manifestement nouveau ». La Cour oppose néanmoins l’autorité de la décision antérieure et la concentration des moyens ; la requête est déclarée irrecevable sans examen autonome du grief nouveau au fond.",
        ],
      },
    ]),
    listeCartes("v16_fondements", "Fondements de la reconstruction", `${S3} — cartes`, [
      {
        tag: "FONDEMENT PRINCIPIEL",
        titre: "Maât",
        paragraphes: [
          "Le principe structurant de l’ordre, de la justice, de la vérité et de l’équilibre, étudié dans son contexte kémitique et mobilisé dans une reconstruction doctrinale contemporaine.",
        ],
      },
      {
        tag: "MISE EN ŒUVRE",
        titre: "Ir Maât et la responsabilité fonctionnelle",
        paragraphes: [
          "L’examen de l’action conforme à Maât et des responsabilités attachées à l’exercice d’une fonction, en distinguant les sources anciennes de leur formalisation actuelle.",
        ],
      },
      {
        tag: "RECONSTRUCTION",
        titre: "De l’ordre compromis à sa restauration",
        paragraphes: [
          "La recherche des conditions dans lesquelles un déséquilibre peut être identifié, qualifié et corrigé sans anachronisme institutionnel.",
        ],
      },
    ]),
    listeTermes("v16_notions", "Notions du droit contemporain", `${S4} — liste à puces`, [
      {
        terme: "Saisine d’office :",
        texte: "intervention fondée sur un mécanisme et une compétence prévus par le droit applicable.",
      },
      {
        terme: "Autosaisine :",
        texte: "initiative juridictionnelle dont le fondement et le champ doivent être identifiés dans chaque ordre juridique.",
      },
      {
        terme: "Action positive :",
        texte: "fonction d’intervention ou de correction dont les conditions ne se déduisent pas d’une simple nécessité abstraite.",
      },
      {
        terme: "Proactivité judiciaire encadrée :",
        texte:
          "proposition doctrinale soumise aux exigences de compétence, de contradictoire, de motivation, de proportionnalité et de non-substitution.",
      },
    ]),
    listeCartes("v16_operateurs", "Les opérateurs de la matrice", `${OPS} — cartes`, [
      {
        tag: "PRINCIPE",
        titre: "Maât",
        paragraphes: [
          "Ordre juste, vérité, rectitude et cohérence structurelle : le fondement principiel de l’ordre à préserver ou à restaurer.",
        ],
      },
      {
        tag: "MISE EN ŒUVRE",
        titre: "Ir Maât",
        paragraphes: [
          "La mise en œuvre active du principe : pratiquer la Maât et rétablir l’ordre dans l’exercice d’une fonction.",
        ],
      },
      {
        tag: "MISSION FONCTIONNELLE",
        titre: "Oupet",
        paragraphes: ["La charge ou mission attachée à la fonction considérée et les responsabilités qui en découlent."],
      },
      {
        tag: "RESTAURATION",
        titre: "Serekh",
        paragraphes: [
          "Le redressement du tort et la restauration de l’ordre lésé, dans la reconstruction fonctionnelle proposée.",
        ],
      },
      {
        tag: "TERME-LIMITE",
        titre: "Isfet",
        paragraphes: ["Le chaos, antithèse de Maât et terme-limite de la dégradation de l’ordre."],
      },
    ]),
  ],
};

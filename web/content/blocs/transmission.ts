import type { PageBlocs } from "./types";
import { listeCartes, simple as s } from "./fabrique-v16";

const SEO = "Référencement (Google)";
const ENTETE = "En-tête de page (bandeau bleu nuit)";
const OUV = "Ouverture";
const SUP = "Les supports de transmission";
const THEBES = "La Nouvelle Thèbes — Cité du Savoir";
const BIB = "Deux bibliothèques distinctes";
const REN = "La confrontation publique : une rencontre reportée";
const RUP = "Une transmission qui ne neutralise pas la rupture";
const BANDE = "Encadré — Transmettre à l’Afrique et au monde";
const MAT = "La transmission de la matrice, pas seulement des résultats";
const FIN1 = "Fin de page — La transmission : transmettre la capacité de reconstruire";
const FIN2 = "Fin de page — De l’Organon à la Nouvelle Thèbes";

/** Textes de la page « De l’Organon à la Nouvelle Thèbes » (prototype maître V16). */
export const TRANSMISSION_BLOCS: PageBlocs = {
  page: "transmission",
  chemin: "/transmission",
  titre: "Transmission — De l’Organon à la Nouvelle Thèbes",
  blocs: [
    s("transmission.seo.titre", "Titre (onglet et Google)", SEO, "Transmission — De l’Organon à la Nouvelle Thèbes"),
    s(
      "transmission.seo.description",
      "Description (Google)",
      SEO,
      "Une trajectoire institutionnelle, documentaire et architecturale pour la conservation et la transmission des savoirs : de l’Organon à la Nouvelle Thèbes.",
    ),
    s("transmission.v16_tete.surtitre", "Surtitre doré", ENTETE, "Horizon de transmission"),
    s("transmission.v16_tete.titre", "Titre de la page (H1)", ENTETE, "De l’Organon à la Nouvelle Thèbes"),
    s(
      "transmission.v16_tete.intro",
      "Phrase d’introduction",
      ENTETE,
      "Une trajectoire institutionnelle, documentaire et architecturale pour la conservation et la transmission des savoirs.",
    ),
    s(
      "transmission.v16_ouverture.chapeau",
      "Chapeau (grand texte d’ouverture)",
      OUV,
      "La transmission des Principes Retrouvés s’appuie d’abord sur les deux ouvrages. Elle s’inscrit ensuite dans un horizon plus vaste : Organon → École de pensée de Brazzaville → Cité du Savoir → Nouvelle Thèbes.",
    ),
    s(
      "transmission.v16_ouverture.sequence",
      "Séquence",
      OUV,
      "Organon → École de pensée de Brazzaville → Cité du Savoir → Nouvelle Thèbes",
    ),
    s("transmission.v16_supports.titre", "Titre de section", SUP, "Les supports de transmission"),
    s("transmission.v16_thebes.titre", "Titre de section", THEBES, "La Nouvelle Thèbes — Cité du Savoir"),
    s(
      "transmission.v16_thebes.texte",
      "Paragraphe",
      THEBES,
      "La Nouvelle Thèbes est pensée comme une Cité du Savoir organisée autour d’un plan directeur, du Sanctuaire des Principes, de ses espaces institutionnels et scientifiques, ainsi que d’un Atlas de dix planches. Son architecture articule les lieux de recherche, de réflexion, de transmission et de conservation.",
    ),
    s("transmission.v16_bibliotheques.titre", "Titre de section", BIB, "Deux bibliothèques distinctes"),
    s(
      "transmission.v16_rencontre.titre",
      "Titre de section",
      REN,
      "La confrontation publique : une rencontre reportée, non abandonnée",
    ),
    s(
      "transmission.v16_rencontre.p1",
      "Paragraphe 1",
      REN,
      "La Première rencontre doctrinale et scientifique de Brazzaville a été reportée faute de soutien financier suffisant. Le report est intégré à la stratégie de préparation : consolider le dossier scientifique, préciser les contributions, renforcer les relais institutionnels et réunir les moyens nécessaires avant l’annonce d’une nouvelle date.",
    ),
    s(
      "transmission.v16_rencontre.p2",
      "Paragraphe 2",
      REN,
      "La rencontre devra permettre une confrontation argumentée des apports du Tome I et du Tome II. Elle ne sera annoncée comme programmée qu’une fois les conditions matérielles et institutionnelles suffisamment établies. Aucune date ne doit être affichée par anticipation.",
    ),
    s("transmission.v16_rupture.titre", "Titre de section", RUP, "Une transmission qui ne neutralise pas la rupture"),
    s(
      "transmission.v16_rupture.p1",
      "Paragraphe 1",
      RUP,
      "Transmettre Les Principes Retrouvés ne consiste pas à atténuer leur diagnostic pour les rendre immédiatement conformes aux catégories reçues. Il s’agit de présenter clairement la cascade entropique, l’ellipse méthodologique, la reconstruction de l’intelligibilité et le dépassement fonctionnel dans leur articulation propre, tout en donnant accès aux démonstrations et aux objections possibles.",
    ),
    s(
      "transmission.v16_rupture.p2",
      "Paragraphe 2",
      RUP,
      "La transmission doit conserver simultanément la force de la proposition et son ouverture à l’épreuve. Elle ne transforme ni les hypothèses en résultats acquis ni les perspectives en réalisations déjà opérationnelles.",
    ),
    s("transmission.v16_bande.titre", "Titre", BANDE, "Transmettre à l’Afrique et au monde la capacité de reconstruire"),
    s(
      "transmission.v16_bande.p1",
      "Paragraphe 1",
      BANDE,
      "La transmission des Principes Retrouvés ne consiste pas à diffuser un ensemble de conclusions qu’il suffirait de reproduire. Elle vise à transmettre une capacité : reconnaître une anomalie, retrouver les relations qui ont été obscurcies, reconstruire les principes, éprouver les propositions et réintégrer les connaissances différenciées dans une intelligibilité commune.",
    ),
    s(
      "transmission.v16_bande.sequence",
      "Séquence",
      BANDE,
      "Reconnaître → Reconstruire → Éprouver → Transmettre → Reconstruire à nouveau",
    ),
    s(
      "transmission.v16_bande.p2",
      "Paragraphe 2",
      BANDE,
      "Depuis Brazzaville, cette ambition s’adresse à l’Afrique et au monde. Elle ne revendique aucun monopole géographique de l’universel ; elle affirme la possibilité de contribuer à sa reconstruction depuis un lieu longtemps tenu à la périphérie des généalogies dominantes du savoir.",
    ),
    s("transmission.v16_matrice.titre", "Titre de section", MAT, "La transmission de la matrice, pas seulement des résultats"),
    s(
      "transmission.v16_matrice.texte",
      "Paragraphe",
      MAT,
      "Le diptyque constitue le premier corpus public de cette entreprise. Le Tome I expose la théorie de l’intelligibilité ; le Tome II montre comment la matrice de Maât permet de reconstruire des questions du droit contemporain. L’École de pensée de Brazzaville organise la discussion et la transmission de cette capacité reconstructive.",
    ),
    s("transmission.v16_capacite.titre", "Titre", FIN1, "La transmission : transmettre la capacité de reconstruire"),
    s(
      "transmission.v16_capacite.p1",
      "Paragraphe 1",
      FIN1,
      "La transmission ne consiste pas à reproduire indéfiniment des résultats déjà acquis. Elle consiste à transmettre la capacité de reconstruire. La relation peut être formulée ainsi : résultat transmis ≠ capacité reconstructive transmise.",
    ),
    s(
      "transmission.v16_capacite.p2",
      "Paragraphe 2",
      FIN1,
      "Le mouvement général est : reconnaître → reconstruire → éprouver → transmettre → reconstruire à nouveau. La transmission ne clôt pas le cycle ; elle en garantit la continuité.",
    ),
    s(
      "transmission.v16_capacite.p3",
      "Paragraphe 3",
      FIN1,
      "L’École de pensée de Brazzaville constitue le lieu de transmission de cette architecture. Sa vocation première n’est pas l’enseignement au sens classique, mais la transmission de la capacité à reconnaître, relier et reconstruire les savoirs.",
    ),
    s("transmission.v16_horizon.titre", "Titre", FIN2, "De l’Organon à la Nouvelle Thèbes"),
    s(
      "transmission.v16_horizon.p1",
      "Paragraphe 1",
      FIN2,
      "Organon → École de pensée de Brazzaville → Cité du Savoir → Nouvelle Thèbes. Cette relation décrit un prolongement intellectuel, institutionnel, documentaire et architectural ; elle ne doit pas être réduite à une simple succession décorative.",
    ),
    s(
      "transmission.v16_horizon.p2",
      "Paragraphe 2",
      FIN2,
      "L’Atlas de la Nouvelle Thèbes rassemble dix planches consacrées aux grandes composantes de la cité, du plan directeur aux espaces institutionnels, scientifiques et de transmission, jusqu’à la Bibliothèque générale des œuvres et archives.",
    ),
    s(
      "transmission.v16_horizon.p3",
      "Paragraphe 3",
      FIN2,
      "La Bibliothèque générale des œuvres et archives et la Bibliothèque des Civilisations sont deux composantes distinctes. Le Laboratoire n’est pas une bibliothèque. Aucun fonds, catalogue, bâtiment ou raccordement non vérifié ne doit être inventé.",
    ),
  ],
  listes: [
    listeCartes("v16_supports", "Les supports de transmission", `${SUP} — cartes`, [
      {
        tag: "01 · PUBLICATIONS",
        titre: "Les deux tomes",
        paragraphes: [
          "Le Tome I établit la théorie de l’intelligibilité ; le Tome II en développe l’application dans le champ du droit constitutionnel. Ils constituent le premier support de transmission.",
        ],
      },
      {
        tag: "02 · CONFRONTATION",
        titre: "Rencontres et publications scientifiques",
        paragraphes: [
          "Les rencontres, colloques, articles et échanges permettent d’exposer les constructions à la discussion et à la critique. La rencontre de Brazzaville est reportée ; sa nouvelle date reste à fixer.",
        ],
      },
      {
        tag: "03 · ARCHIVES",
        titre: "Conservation documentaire",
        paragraphes: [
          "Les textes, versions, références, manuscrits et documents de travail doivent être conservés avec leur statut, leur provenance et leur chronologie.",
        ],
      },
      {
        tag: "04 · FORMATION",
        titre: "Transmission des méthodes",
        paragraphes: [
          "Les ressources et formations pourront être développées progressivement et annoncées lorsqu’elles seront effectivement disponibles.",
        ],
      },
    ]),
    listeCartes("v16_atlas", "L’Atlas de la Nouvelle Thèbes (dix planches)", `${THEBES} — cartes`, [
      { tag: "ATLAS · I", titre: "Plan directeur de la Nouvelle Thèbes", paragraphes: ["Matrice spatiale générale de la cité."] },
      { tag: "ATLAS · II", titre: "Sanctuaire des Principes", paragraphes: ["Architecture intérieure et parcours du sanctuaire."] },
      { tag: "ATLAS · III", titre: "Porte des Principes", paragraphes: ["Quartier institutionnel."] },
      { tag: "ATLAS · IV", titre: "Quartiers scientifiques", paragraphes: ["Anneau des Sciences."] },
      { tag: "ATLAS · V", titre: "Place de la Recherche", paragraphes: ["Cœur opérationnel."] },
      { tag: "ATLAS · VI", titre: "Laboratoires", paragraphes: ["Les Ateliers de la Cité."] },
      { tag: "ATLAS · VII", titre: "Jardins de la Réflexion", paragraphes: ["Espaces de réflexion."] },
      { tag: "ATLAS · VIII", titre: "Amphithéâtres et Forums", paragraphes: ["Espaces de rencontre et de confrontation."] },
      { tag: "ATLAS · IX", titre: "Cycle scientifique de la recherche", paragraphes: ["Représentation du cycle scientifique."] },
      {
        tag: "ATLAS · X",
        titre: "Bibliothèque générale des œuvres et archives",
        paragraphes: ["Conservation des œuvres et archives du projet."],
      },
    ]),
    listeCartes(
      "v16_bibliotheques",
      "Les deux bibliothèques",
      `${BIB} — cartes`,
      [
        {
          titre: "Bibliothèque générale",
          paragraphes: [
            "Consacrée aux œuvres et archives du projet. Elle ne doit pas être confondue avec le Laboratoire.",
          ],
        },
        {
          titre: "Bibliothèque des Civilisations",
          paragraphes: ["Composante architecturale distincte de la Bibliothèque générale des œuvres et archives."],
        },
      ],
      { tags: false },
    ),
  ],
};

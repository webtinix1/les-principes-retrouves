import type { Recueil, TexteLecture } from "./types";
import { TOME_I_LIMINAIRES } from "./tome-i";
import { TOME_II_CHAPITRES_LIBRES, TOME_II_LIMINAIRES } from "./tome-ii";

export type { BlocLecture, Recueil, TexteLecture } from "./types";

/**
 * Tome I — carte Trello « Modification Tome I » :
 *  1. les préliminaires sont publiés texte par texte, chacun avec son lien ;
 *  2. l'extrait libre couvre les 28 premières pages (les liminaires intégraux).
 */
export const TOME_I: Recueil = {
  tome: "tome-i",
  etiquette: "Tome I",
  titre: "L’Organon",
  sous_titre:
    "Science de l’Intelligibilité — Traité d’épistémologie fondamentale et de métaphysique logico-mathématique",
  presentation: [
    "Les textes liminaires du Tome I sont ouverts à la lecture, texte par texte. Ils couvrent les vingt-huit premières pages de l’ouvrage : le Discours préliminaire, le Discours de la méthode reconstructive, l’Avant-propos et l’Introduction générale.",
    "Choisissez le texte qui vous intéresse. Chacun se lit de façon autonome et renvoie au suivant.",
  ],
  parties: [
    {
      titre: "Textes liminaires",
      description: "Les 28 premières pages du Tome I, en accès libre.",
      textes: TOME_I_LIMINAIRES,
    },
  ],
};

/**
 * Tome II — carte Trello « Modification Tome II » :
 *  1. le texte liminaire d'abord, puis le Tome II ;
 *  2. les chapitres I, II et VII en accès libre.
 */
export const TOME_II: Recueil = {
  tome: "tome-ii",
  etiquette: "Tome II",
  titre: "La saisine d’office, l’autosaisine et l’action positive du juge constitutionnel",
  sous_titre:
    "Théorie générale et formalisation d’un principe universel de proactivité judiciaire encadrée",
  presentation: [
    "Le Tome II confronte la théorie de l’intelligibilité au champ du droit constitutionnel, à travers la saisine d’office, l’autosaisine et l’action positive du juge constitutionnel.",
    "Son objet n’est pas de poser une proactivité juridictionnelle sans limites, mais d’examiner les conditions dans lesquelles une intervention positive du juge peut être pensée, encadrée et juridiquement reconstruite.",
  ],
  parties: [
    {
      titre: "Textes liminaires",
      description: "Les seuils du volume : épigraphes, avant-propos et introduction générale.",
      textes: TOME_II_LIMINAIRES,
    },
    {
      titre: "Chapitres en accès libre",
      description: "Trois chapitres du Tome II, ouverts à la lecture intégrale.",
      textes: TOME_II_CHAPITRES_LIBRES,
    },
  ],
  plan: [
    { titre: "Avant-propos", libre: "avant-propos" },
    { titre: "Introduction générale", libre: "introduction-generale" },
    { titre: "Partie I — Le constat" },
    { titre: "Chapitre I — L’expérience fondatrice", libre: "chapitre-i" },
    { titre: "Chapitre II — La crise de la chose jugée : quand la procédure tue le droit", libre: "chapitre-ii" },
    { titre: "Partie II — La théorie et les déplacements épistémologiques" },
    { titre: "Chapitre III — Le démontage du dogme de Montesquieu : l’illusion de la passivité juridictionnelle" },
    { titre: "Chapitre IV — L’Impérium de la rectification" },
    { titre: "Annexe doctrinale majeure — Déplacements épistémologiques fondamentaux et reconstruction métamoderne" },
    { titre: "Partie III — Les laboratoires comparatifs" },
    { titre: "Chapitre V — Inde, Afrique du Sud, Kenya et Bénin" },
    { titre: "Chapitre VI — Colombie, Mexique, Canada, Allemagne et États-Unis" },
    { titre: "Rivonia — Laboratoire historique du Syllogisme Réel" },
    { titre: "Partie IV — L’arsenal opérationnel" },
    { titre: "Chapitre VII — Le Guide technique d’invocation", libre: "chapitre-vii" },
    { titre: "Chapitre VIII — L’Arrêt pilote fictif S/O n° 001-2026" },
    { titre: "Partie V — La Charte de Brazzaville" },
    { titre: "Chapitre IX — Pour une science juridique métamoderne" },
    { titre: "Conclusion générale — Le Verdict de la Balance" },
  ],
};

export const RECUEILS: Recueil[] = [TOME_I, TOME_II];

export function getRecueil(tome: string): Recueil | undefined {
  return RECUEILS.find((r) => r.tome === tome);
}

/** Textes d'un recueil dans l'ordre de lecture (toutes parties confondues). */
export function textesDe(recueil: Recueil): TexteLecture[] {
  return recueil.parties.flatMap((p) => p.textes);
}

/** Nombre de minutes de lecture (≈ 230 mots / min). */
export function dureeLecture(texte: TexteLecture): number {
  const mots = texte.blocs
    .map((b) => ("items" in b ? b.items.join(" ") : b.x))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(mots / 230));
}

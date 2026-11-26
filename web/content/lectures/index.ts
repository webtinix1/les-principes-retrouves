import type { Recueil, TexteLecture } from "./types";
import { TOME_I_TEXTES } from "./tome-i";
import { TOME_II_TEXTES } from "./tome-ii";

export type { BlocLecture, Recueil, TexteLecture } from "./types";

/**
 * Les deux tomes en lecture libre, repris du prototype maître V16 (page « Les
 * ouvrages ») : pour chaque texte, un extrait et sa lecture intégrale.
 * Données d'origine : elles amorcent Payload (payload/seed.ts) et servent de
 * repli quand la base est injoignable.
 */
export const TOME_I: Recueil = {
  tome: "tome-i",
  etiquette: "Tome I",
  titre: "Maât : théorie de l’intelligibilité",
  sous_titre: "",
  presentation: [
    "Le premier mouvement du diptyque : Architecture Préalable, pyramide Maât–Σ, genèse de la connaissance, principe de Non-Perte, Méthode M, Organon et Science Métamoderne.",
  ],
  parties: [{ titre: "TOME I", description: "", textes: TOME_I_TEXTES }],
};

export const TOME_II: Recueil = {
  tome: "tome-ii",
  etiquette: "Tome II",
  titre: "La saisine d’office, l’autosaisine et l’action positive du juge constitutionnel",
  sous_titre: "Théorie générale et formalisation d’un principe universel de proactivité judiciaire encadrée.",
  presentation: [
    "Le second mouvement : laboratoire congolais, théorie de la clôture procédurale, comparaisons juridictionnelles, Rivonia et arsenal opérationnel.",
  ],
  parties: [{ titre: "TOME II", description: "", textes: TOME_II_TEXTES }],
};

export const RECUEILS: Recueil[] = [TOME_I, TOME_II];

/**
 * Adresses de textes retirés lors du passage au prototype V16 : elles restent
 * indexées par les moteurs de recherche et redirigent vers le sommaire du tome.
 */
export const TEXTES_RETIRES: Record<Recueil["tome"], string[]> = {
  "tome-i": ["discours-de-la-methode-reconstructive", "avant-propos"],
  "tome-ii": ["chapitre-vii"],
};

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

/** Adresses de L'Ouvrage, des sommaires et de chaque texte (revalidation du cache). */
export function cheminsOuvrage(): string[] {
  return [
    "/ouvrage",
    ...RECUEILS.flatMap((r) => [`/ouvrage/${r.tome}`, ...textesDe(r).map((t) => `/ouvrage/${r.tome}/${t.slug}`)]),
  ];
}

import { getTexte, getTextes } from "@/lib/contenu";

/**
 * Textes d'interface de la lecture des tomes (registre content/blocs/site_lecture.ts,
 * back-office Site › Lecture des tomes), avec leurs marqueurs {tome}, {n}…
 */

type Valeurs = Record<string, string | number>;

/** Remplace les marqueurs {nom} ; un marqueur inconnu reste tel quel. */
export function remplacer(texte: string, valeurs: Valeurs = {}): string {
  return texte.replace(/\{(\w+)\}/g, (m, nom: string) => (nom in valeurs ? String(valeurs[nom]) : m));
}

/** Un texte de « site_lecture » (clé courte : "citer.titre"), marqueurs remplis. */
export async function libelle(cle: string, valeurs?: Valeurs): Promise<string> {
  return remplacer(await getTexte(`site_lecture.${cle}`), valeurs);
}

/** Tous les textes de « site_lecture », par clé courte (marqueurs non remplis). */
export function libellesLecture(): Promise<Record<string, string>> {
  return getTextes("site_lecture");
}

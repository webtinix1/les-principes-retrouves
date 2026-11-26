import type { BlocDef, ListeDef } from "./types";

/**
 * Raccourcis de déclaration des registres des pages refaites sur le
 * prototype maître V16 (Laboratoire, Concepts, Transmission).
 */

/** Bloc « simple » (texte sans mise en forme) avec son texte d'origine. */
export const simple = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle,
  label,
  type: "simple",
  aide,
  defaut,
});

/** Carte du prototype (`.card`) : surtitre, titre, paragraphes, ancre facultative. */
export type CarteOrigine = {
  ancre?: string;
  tag?: string;
  titre: string;
  paragraphes: string[];
};

/**
 * Liste de cartes `.card` (surtitre doré facultatif, titre, paragraphes).
 * Avec `ancres`, chaque carte porte un identifiant de lien stable
 * (`/concepts#maat`).
 */
export function listeCartes(
  nom: string,
  label: string,
  aide: string,
  origine: CarteOrigine[],
  options: { ancres?: boolean; tags?: boolean } = {},
): ListeDef {
  const { ancres = false, tags = true } = options;
  return {
    nom,
    label,
    element: "Carte",
    aide,
    champs: [
      ...(ancres
        ? [{ nom: "ancre", label: "Ancre de lien (identifiant technique — ne pas modifier)" }]
        : []),
      ...(tags ? [{ nom: "tag", label: "Surtitre doré (petites capitales, facultatif)" }] : []),
      { nom: "titre", label: "Titre de la carte" },
      { nom: "paragraphes", label: "Paragraphes (un par ligne)", type: "lignes" as const },
    ],
    origine: origine.map((c) => ({
      ...(ancres ? { ancre: c.ancre ?? "" } : {}),
      ...(tags ? { tag: c.tag ?? "" } : {}),
      titre: c.titre,
      paragraphes: c.paragraphes,
    })),
  };
}

/** Liste « terme en gras + texte » (puces ou paragraphes à intitulé). */
export function listeTermes(
  nom: string,
  label: string,
  aide: string,
  origine: { terme: string; texte: string }[],
): ListeDef {
  return {
    nom,
    label,
    element: "Entrée",
    aide,
    champs: [
      { nom: "terme", label: "Terme (en gras)" },
      { nom: "texte", label: "Texte", type: "zone" },
    ],
    origine,
  };
}

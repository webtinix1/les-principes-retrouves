import { getListe, getTextes } from "@/lib/contenu";

/**
 * Textes des formulaires (back-office, global « Site — Formulaires »), lus côté
 * serveur et transmis en propriétés aux composants client des formulaires.
 * Server-only.
 */
export type TextesFormulaires = {
  /** Tous les textes simples, par clé courte (« contact.bouton », « commun.nom »…). */
  textes: Record<string, string>;
  /** Liste des pays du formulaire d'inscription. */
  pays: { code: string; libelle: string }[];
};

export async function getTextesFormulaires(): Promise<TextesFormulaires> {
  const [textes, pays] = await Promise.all([
    getTextes("site_formulaires"),
    getListe<{ code: string; libelle: string }>("site_formulaires.pays"),
  ]);
  return { textes, pays };
}

/** Sous-ensemble des textes d'un préfixe, clés sans le préfixe (« contact. »). */
export function textesDe(textes: Record<string, string>, ...prefixes: string[]): Record<string, string> {
  const sortie: Record<string, string> = {};
  for (const [cle, valeur] of Object.entries(textes)) {
    const p = prefixes.find((x) => cle.startsWith(`${x}.`));
    if (p) sortie[cle.slice(p.length + 1)] = valeur;
  }
  return sortie;
}

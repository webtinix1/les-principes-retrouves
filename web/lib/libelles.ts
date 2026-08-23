/**
 * Libellés d'affichage pour les valeurs d'enum stockées en base (snake_case).
 * La valeur enum reste la source de vérité ; on ne traduit que l'affichage,
 * pour ne pas laisser fuir « en_attente » / « paye » dans l'UI française.
 */

export const STATUT_COMMANDE: Record<string, string> = {
  en_attente: "En attente",
  paye: "Payé",
  echoue: "Échoué",
  rembourse: "Remboursé",
  devis_demande: "Devis demandé",
};

export const STATUT_MESSAGE: Record<string, string> = {
  nouveau: "Nouveau",
  traite: "Traité",
  archive: "Archivé",
};

export const NIVEAU_CODE: Record<string, string> = {
  module_i: "Module I",
  module_ii: "Module II",
  module_iii: "Module III",
};

export const REGIME_TARIF: Record<string, string> = {
  b2b: "Institutionnel (B2B)",
  b2c: "Individuel (B2C)",
  devis: "Sur devis",
};

/** Renvoie le libellé connu, ou la valeur brute en dernier recours. */
export function libelle(table: Record<string, string>, valeur: string): string {
  return table[valeur] ?? valeur;
}

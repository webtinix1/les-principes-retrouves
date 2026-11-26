/** Libellés des valeurs d'enum de la librairie (la valeur en base reste la référence). */

export const TOMES = { "tome-i": "Tome I", "tome-ii": "Tome II" } as const;
export type TomeId = keyof typeof TOMES;

export const STATUT_COMMANDE_OUVRAGE = {
  en_attente_paiement: "En attente de paiement",
  payee: "Payée",
  en_impression: "En impression",
  expediee: "Expédiée",
  livree: "Livrée",
  annulee: "Annulée",
  remboursee: "Remboursée",
} as const;
export type StatutCommandeOuvrage = keyof typeof STATUT_COMMANDE_OUVRAGE;

export const STATUT_PAIEMENT = {
  initie: "Initié",
  accepte: "Accepté",
  refuse: "Refusé",
  rembourse: "Remboursé",
} as const;

export const STATUT_RECLAMATION = {
  nouvelle: "Nouvelle",
  en_cours: "En cours de traitement",
  resolue: "Résolue",
} as const;

export const STATUT_VENTE = {
  payee: "Payée",
  echouee: "Échouée",
  abandonnee: "Abandonnée",
} as const;

export const options = (table: Record<string, string>) =>
  Object.entries(table).map(([value, label]) => ({ value, label }));

/** Désignation de l'auteur, exacte, imposée par la fiche technique. */
export const AUTEUR_DESIGNATION =
  "Gaudéric MAMBOU — Juriste, Chercheur indépendant en épistémologie juridique";

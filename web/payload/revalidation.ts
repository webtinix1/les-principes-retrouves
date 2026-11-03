import { revalidatePath } from "next/cache";

/**
 * Invalide le cache ISR des pages publiques après une modification dans le
 * back-office. Hors contexte de requête Next (seed, scripts), revalidatePath
 * lève : on l'ignore — le rendu suivant relira la base de toute façon.
 */
export function revaliderChemins(chemins: string[]): void {
  for (const chemin of chemins) {
    try {
      revalidatePath(chemin);
    } catch {
      /* hors requête Next : rien à invalider */
    }
  }
}

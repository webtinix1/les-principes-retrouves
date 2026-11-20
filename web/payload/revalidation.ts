import { revalidatePath } from "next/cache";
import { cheminsOuvrage } from "@/content/lectures";
import { FOOTER_LINKS, NAV_PAGES } from "@/lib/navigation";

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

/** Textes communs (navigation, interface) : tout le site est revalidé. */
export function revaliderSite(): void {
  try {
    revalidatePath("/", "layout");
  } catch {
    /* hors requête Next : rien à invalider */
  }
  // Les pages prérendues par generateStaticParams ne suivent pas toujours la
  // revalidation de layout : on les nomme une à une.
  revaliderChemins([
    ...NAV_PAGES.map((p) => p.href),
    ...FOOTER_LINKS.map((l) => l.href.split("#")[0]),
    ...cheminsOuvrage(),
  ]);
}

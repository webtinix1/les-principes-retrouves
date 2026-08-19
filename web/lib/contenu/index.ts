import { cache } from "react";
import { prisma } from "@/lib/prisma";

/**
 * Lecture des surcharges éditoriales (back-office) appliquées aux blocs de
 * contenu. Le texte par défaut vit dans le JSX des pages : on ne lit ici que
 * les réécritures.
 *
 * `cache()` déduplique la requête sur tout un rendu de page : une seule lecture
 * SQLite quel que soit le nombre de blocs.
 */
export const getSurcharges = cache(async (): Promise<Map<string, string>> => {
  try {
    const lignes = await prisma.contenuBloc.findMany({
      select: { cle: true, valeur: true },
    });
    return new Map(lignes.map((l) => [l.cle, l.valeur]));
  } catch {
    // Build Docker : aucune base n'existe encore (l'entrypoint migre au
    // démarrage). On sert alors les textes du code — le conteneur déclenche
    // une revalidation au boot pour réappliquer les surcharges du volume.
    return new Map();
  }
});

/** Surcharge d'un bloc, ou `null` si le texte d'origine (JSX) doit être rendu. */
export async function getSurcharge(cle: string): Promise<string | null> {
  return (await getSurcharges()).get(cle) ?? null;
}

import type { Payload } from "payload";
import { OUVRAGES_ORIGINE, ZONES_ORIGINE } from "./donnees";

/**
 * Amorçage idempotent de la librairie : les deux fiches (valeurs d'origine,
 * prix numériques déjà publiés sur la page Les ouvrages) et la grille de zones
 * (sans tarif). Rien n'est jamais écrasé.
 */
export async function amorcerLibrairie(payload: Payload): Promise<void> {
  for (const tome of ["tome-i", "tome-ii"] as const) {
    const { totalDocs } = await payload.count({ collection: "ouvrages", where: { tome: { equals: tome } } });
    if (totalDocs > 0) continue;
    const o = OUVRAGES_ORIGINE[tome];
    await payload.create({
      collection: "ouvrages",
      data: {
        tome,
        reference_editoriale: o.reference_editoriale,
        titre_complet: o.titre_complet,
        sous_titre: o.sous_titre,
        auteur: o.auteur,
        couverture_url: o.couverture.url,
        couverture_largeur: o.couverture.largeur,
        couverture_hauteur: o.couverture.hauteur,
        bibliographie: o.bibliographie,
        numerique: { prix: o.prix_pdf },
        imprime: { actif: false },
      },
    });
    payload.logger.info(`[amorçage] fiche librairie créée : ${tome}`);
  }

  const reglages = await payload.findGlobal({ slug: "librairie-reglages", depth: 0 });
  if (!reglages.zones || reglages.zones.length === 0) {
    await payload.updateGlobal({
      slug: "librairie-reglages",
      data: { zones: ZONES_ORIGINE.map((z) => ({ nom: z.nom, pays: z.pays })) },
    });
    payload.logger.info("[amorçage] zones de livraison créées (tarifs à renseigner)");
  }
}

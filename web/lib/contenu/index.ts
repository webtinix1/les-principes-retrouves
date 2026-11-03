import { cache } from "react";
import type { GlobalSlug } from "payload";
import { payloadClient } from "@/lib/payload";
import { BLOC_PAR_CLE, PAGE_PAR_CLE } from "@/content/blocs";
import ORIGINE from "@/content/blocs/origine.json";
import { nomChamp, slugGlobal } from "@/payload/globals/contenu";
import { lexicalEnHtml, lexicalEstVide } from "./lexical";

/**
 * Lecture du contenu éditorial des pages (globals Payload « contenu-<page> »).
 *
 * Le texte d'origine reste le JSX des pages. On ne s'en écarte que si le
 * back-office porte un texte DIFFÉRENT de l'origine (`origine.json`) :
 *   - champ vide, ou identique à l'origine → JSX d'origine (rendu au pixel près) ;
 *   - champ modifié → texte du back-office.
 */

type Origine = Record<string, { html?: string; texte?: string }>;
const ORIGINES = ORIGINE as Origine;

export type Surcharge = { type: "html"; html: string } | { type: "texte"; texte: string };

/** Contenu brut d'un global de page, mis en cache pour tout le rendu. */
const lireGlobal = cache(async (slug: GlobalSlug): Promise<Record<string, unknown>> => {
  try {
    const payload = await payloadClient();
    return (await payload.findGlobal({ slug, depth: 0 })) as unknown as Record<string, unknown>;
  } catch {
    // Build Docker : aucune base joignable. On sert les textes du code — le
    // conteneur revalide les pages au démarrage pour réappliquer la base.
    return {};
  }
});

/** Surcharge d'un bloc, ou `null` si le texte d'origine (JSX) doit être rendu. */
export async function getSurcharge(cle: string): Promise<Surcharge | null> {
  const page = PAGE_PAR_CLE.get(cle);
  const def = BLOC_PAR_CLE.get(cle);
  if (!page || !def) return null;

  const valeur = (await lireGlobal(slugGlobal(page)))[nomChamp(cle)];
  const origine = ORIGINES[cle];

  if (def.type === "riche") {
    if (valeur == null || lexicalEstVide(valeur)) return null;
    const html = lexicalEnHtml(valeur);
    return html === origine?.html ? null : { type: "html", html };
  }

  if (typeof valeur !== "string" || !valeur.trim()) return null;
  const texte = valeur.trim();
  return texte === origine?.texte ? null : { type: "texte", texte };
}

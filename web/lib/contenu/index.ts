import { cache } from "react";
import type { GlobalSlug } from "payload";
import { payloadClient } from "@/lib/payload";
import { BLOC_PAR_CLE, LISTE_PAR_CLE, PAGES_BLOCS, PAGE_PAR_CLE } from "@/content/blocs";
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
  return texte === (origine?.texte ?? def.defaut) ? null : { type: "texte", texte };
}

/** Remplace les marqueurs {nom} d'un texte. Un marqueur supprimé à la saisie est sans effet. */
export function remplir(texte: string, valeurs: Record<string, string | number> = {}): string {
  return texte.replace(/\{(\w+)\}/g, (m, nom: string) => (nom in valeurs ? String(valeurs[nom]) : m));
}

/**
 * Texte court d'un bloc « simple » (titre passé en propriété, libellé,
 * métadonnée) : la saisie du back-office, sinon le texte d'origine.
 */
export async function getTexte(cle: string, valeurs?: Record<string, string | number>): Promise<string> {
  const page = PAGE_PAR_CLE.get(cle);
  const def = BLOC_PAR_CLE.get(cle);
  if (!page || !def) throw new Error(`Bloc inconnu du registre : ${cle}`);
  const valeur = (await lireGlobal(slugGlobal(page)))[nomChamp(cle)];
  const texte =
    typeof valeur === "string" && valeur.trim() ? valeur.trim() : (def.defaut ?? ORIGINES[cle]?.texte ?? "");
  return remplir(texte, valeurs);
}

/**
 * Tous les textes « simples » d'une page du registre, par clé courte
 * (« site_interface.pagination.suivante » → « pagination.suivante »). Pour
 * transmettre des libellés à un composant client.
 */
export async function getTextes(pageId: string): Promise<Record<string, string>> {
  const page = PAGES_BLOCS.find((p) => p.page === pageId);
  if (!page) throw new Error(`Page inconnue du registre : ${pageId}`);
  const g = await lireGlobal(slugGlobal(page));
  const sortie: Record<string, string> = {};
  for (const b of page.blocs) {
    if (b.type !== "simple") continue;
    const v = g[nomChamp(b.cle)];
    sortie[b.cle.slice(pageId.length + 1)] =
      typeof v === "string" && v.trim() ? v.trim() : (b.defaut ?? ORIGINES[b.cle]?.texte ?? "");
  }
  return sortie;
}

type ElementListe = Record<string, string | string[]>;

/**
 * Liste structurée du registre (« manifeste.articles ») : la saisie du
 * back-office, ou les données d'origine si la liste est vide.
 */
export async function getListe<T extends ElementListe = ElementListe>(cle: string): Promise<T[]> {
  const entree = LISTE_PAR_CLE.get(cle);
  if (!entree) throw new Error(`Liste inconnue du registre : ${cle}`);
  const { page, liste } = entree;
  const valeur = (await lireGlobal(slugGlobal(page)))[liste.nom];
  if (!Array.isArray(valeur) || valeur.length === 0) return liste.origine as T[];
  return (valeur as Record<string, unknown>[]).map((ligne) => {
    const el: ElementListe = {};
    for (const c of liste.champs) {
      const v = ligne[c.nom];
      el[c.nom] =
        c.type === "lignes"
          ? Array.isArray(v)
            ? (v as { texte?: unknown }[]).map((x) => (typeof x.texte === "string" ? x.texte : ""))
            : []
          : typeof v === "string"
            ? v
            : "";
    }
    return el as T;
  });
}

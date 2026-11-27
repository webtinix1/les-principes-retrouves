import { cache } from "react";
import { getTextes } from "@/lib/contenu";
import { FOOTER_LINKS, NAV_PAGES, type Famille, type NavPage, type PageCanonique } from "@/lib/navigation";

/**
 * Navigation avec les textes éditables du back-office (global « Site —
 * Navigation et pied de page »). La structure (adresses, numéros, familles)
 * reste celle de `lib/navigation.ts` ; seuls les libellés, les titres et les
 * noms de famille viennent du registre `content/blocs/site_navigation.ts`.
 * Server-only : les composants client reçoivent le résultat en propriétés.
 */

/** Clé courte (sans préfixe de page) du nom de chaque famille. */
const CLE_FAMILLE: Record<Famille, string> = {
  "Le Seuil": "familles.seuil",
  Fondements: "familles.fondements",
  Savoir: "familles.savoir",
  Parcours: "familles.parcours",
};

const ORDRE_FAMILLES: Famille[] = ["Le Seuil", "Fondements", "Savoir", "Parcours"];

/** Clé courte du libellé de chaque lien du pied de page (par adresse). */
const CLE_PIED: Record<string, string> = {
  "/mentions-legales": "pied.lien_mentions_legales",
  "/confidentialite": "pied.lien_confidentialite",
  "/librairie": "pied.lien_librairie",
  "/cgv": "pied.lien_cgv",
  "/transmission#contact": "entete.contact",
};

export type FamilleNav = {
  /** Identifiant stable de la famille. */
  id: Famille;
  /** Nom affiché (éditable). */
  titre: string;
  pages: PageCanonique[];
};

export type Navigation = {
  /** Les dix pages canoniques, libellés et titres éditables. */
  pages: PageCanonique[];
  familles: FamilleNav[];
  /** Nom affiché de chaque famille. */
  nomFamille: Record<Famille, string>;
  footer: NavPage[];
  /** Tous les textes du global « site_navigation », par clé courte. */
  textes: Record<string, string>;
};

/** Navigation du site avec ses textes éditables (mise en cache pour le rendu). */
export const getNavigation = cache(async (): Promise<Navigation> => {
  const t = await getTextes("site_navigation");
  const pages = NAV_PAGES.map((p) => ({
    ...p,
    label: t[`menu.${p.page_id}`] || p.label,
    titre: t[`titre.${p.page_id}`] || p.titre,
  }));
  const nomFamille = Object.fromEntries(
    ORDRE_FAMILLES.map((f) => [f, t[CLE_FAMILLE[f]] || f]),
  ) as Record<Famille, string>;
  const familles = ORDRE_FAMILLES.map((id) => ({
    id,
    titre: nomFamille[id],
    pages: pages.filter((p) => p.famille === id),
  }));
  const footer = FOOTER_LINKS.map((l) => ({
    ...l,
    label: (CLE_PIED[l.href] && t[CLE_PIED[l.href]]) || l.label,
  }));
  return { pages, familles, nomFamille, footer, textes: t };
});

/** Page canonique (libellés éditables) par identifiant. */
export async function getPageCanonique(page_id: string): Promise<PageCanonique & { nomFamille: string }> {
  const nav = await getNavigation();
  const p = nav.pages.find((x) => x.page_id === page_id);
  if (!p) throw new Error(`Page de navigation inconnue : ${page_id}`);
  return { ...p, nomFamille: nav.nomFamille[p.famille] };
}

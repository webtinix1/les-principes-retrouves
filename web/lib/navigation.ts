/**
 * Navigation officielle — les 10 pages canoniques dans l'ordre cognitif imposé
 * par le DOCUMENT DE SYNTHÈSE FINAL. Données en snake_case (règle d'or CLAUDE.md).
 * Les libellés du menu sont courts ; le titre complet vit dans le <h1> de chaque page.
 *
 * Le menu garde ses 10 entrées visibles, sans sous-menu. Les familles
 * (Seuil, Fondements, Savoir, Parcours) ne servent qu'aux fins séparateurs du
 * menu, au surtitre des pages (« 04 / 10 · Fondements ») et au pied de page.
 */
export type Famille = "Le Seuil" | "Fondements" | "Savoir" | "Parcours";

export type NavPage = {
  page_id: string;
  label: string;
  href: string;
};

export type PageCanonique = NavPage & {
  /** Rang dans l'ordre de lecture, de 1 à 10. */
  numero: number;
  famille: Famille;
  /** Titre de la page (H1), pour la pagination de fin de page. */
  titre: string;
};

export const NAV_PAGES: PageCanonique[] = [
  {
    page_id: "fronton",
    label: "Fronton",
    href: "/",
    numero: 0,
    famille: "Le Seuil",
    titre: "Le Fronton",
  },
  {
    page_id: "seuil",
    label: "Accueil",
    href: "/accueil",
    numero: 1,
    famille: "Le Seuil",
    titre: "Accueil",
  },
  {
    page_id: "institution",
    label: "Institution",
    href: "/institution",
    numero: 2,
    famille: "Fondements",
    titre: "L’Institution",
  },
  {
    page_id: "constitution",
    label: "Constitution",
    href: "/constitution",
    numero: 3,
    famille: "Fondements",
    titre: "Constitution scientifique",
  },
  {
    page_id: "manifeste",
    label: "Manifeste",
    href: "/manifeste",
    numero: 4,
    famille: "Fondements",
    titre: "Le Manifeste de Brazzaville",
  },
  {
    page_id: "note_epistemologique",
    label: "Note épistémologique",
    href: "/note-epistemologique",
    numero: 5,
    famille: "Savoir",
    titre: "Note épistémologique",
  },
  {
    page_id: "ouvrage",
    label: "Ouvrages",
    href: "/ouvrage",
    numero: 6,
    famille: "Savoir",
    titre: "L’Ouvrage",
  },
  {
    page_id: "laboratoire",
    label: "Laboratoire",
    href: "/laboratoire",
    numero: 7,
    famille: "Savoir",
    titre: "Laboratoire Doctrinal",
  },
  {
    page_id: "concepts",
    label: "Concepts",
    href: "/concepts",
    numero: 8,
    famille: "Savoir",
    titre: "Concepts stabilisés",
  },
  {
    page_id: "transmission",
    label: "Transmission",
    href: "/transmission",
    numero: 9,
    famille: "Parcours",
    titre: "Transmission & Inscriptions",
  },
  {
    page_id: "declaration",
    label: "Déclaration",
    href: "/declaration",
    numero: 10,
    famille: "Parcours",
    titre: "La Déclaration de Brazzaville",
  },
];

/** Numéro sur deux chiffres : 1 → « 01 ». */
export const numero2 = (n: number) => String(n).padStart(2, "0");

/** Un fin séparateur suit ces entrées du menu (fin du Seuil, des Fondements, du Savoir). */
export const SEPARATEUR_APRES = new Set(["seuil", "manifeste", "concepts"]);

/** Page canonique par identifiant. */
export function pageCanonique(page_id: string): PageCanonique {
  const p = NAV_PAGES.find((x) => x.page_id === page_id);
  if (!p) throw new Error(`Page de navigation inconnue : ${page_id}`);
  return p;
}

/** Pages précédente et suivante dans l'ordre de lecture. */
export function voisines(page_id: string) {
  const i = NAV_PAGES.findIndex((p) => p.page_id === page_id);
  return { precedente: NAV_PAGES[i - 1], suivante: NAV_PAGES[i + 1] };
}

export const FOOTER_LINKS: NavPage[] = [
  {
    page_id: "mentions_legales",
    label: "Mentions légales",
    href: "/mentions-legales",
  },
  {
    page_id: "confidentialite",
    label: "Politique de confidentialité",
    href: "/confidentialite",
  },
  { page_id: "cgv", label: "Conditions de vente", href: "/cgv" },
  { page_id: "transmission", label: "Contact", href: "/transmission#contact" },
];

/** Colonnes du pied de page : une par famille. */
export const FAMILLES: { titre: Famille; pages: PageCanonique[] }[] = (
  ["Le Seuil", "Fondements", "Savoir", "Parcours"] as Famille[]
).map((titre) => ({
  titre,
  pages: NAV_PAGES.filter((p) => p.famille === titre),
}));

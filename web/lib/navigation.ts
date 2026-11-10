/**
 * Navigation officielle — les 10 pages canoniques dans l'ordre cognitif imposé
 * par le DOCUMENT DE SYNTHÈSE FINAL. Données en snake_case (règle d'or CLAUDE.md).
 * Les libellés du header sont courts ; le titre complet vit dans le <h1> de chaque page.
 */
export type NavPage = {
  page_id: string;
  label: string;
  href: string;
};

export const NAV_PAGES: NavPage[] = [
  { page_id: "seuil", label: "Accueil", href: "/accueil" },
  { page_id: "institution", label: "Institution", href: "/institution" },
  { page_id: "constitution", label: "Constitution", href: "/constitution" },
  { page_id: "manifeste", label: "Manifeste", href: "/manifeste" },
  { page_id: "note_epistemologique", label: "Note épistémologique", href: "/note-epistemologique" },
  { page_id: "ouvrage", label: "Ouvrage", href: "/ouvrage" },
  { page_id: "laboratoire", label: "Laboratoire", href: "/laboratoire" },
  { page_id: "concepts", label: "Concepts", href: "/concepts" },
  { page_id: "transmission", label: "Transmission", href: "/transmission" },
  { page_id: "declaration", label: "Déclaration", href: "/declaration" },
];

export const FOOTER_LINKS: NavPage[] = [
  { page_id: "mentions_legales", label: "Mentions légales", href: "/mentions-legales" },
  { page_id: "confidentialite", label: "Politique de confidentialité", href: "/confidentialite" },
  { page_id: "cgv", label: "Conditions de vente", href: "/cgv" },
  { page_id: "transmission", label: "Contact", href: "/transmission#contact" },
];

/**
 * Menu groupé : mêmes pages, même ordre que NAV_PAGES, réunies en familles
 * pour alléger la barre (5 entrées au lieu de 10). Une entrée de type
 * « lien » est un lien direct.
 */
export type NavEntree =
  | { type: "lien"; page: NavPage }
  | { type: "groupe"; label: string; pages: NavPage[] };

const page = (id: string) => {
  const p = NAV_PAGES.find((x) => x.page_id === id);
  if (!p) throw new Error(`Page de navigation inconnue : ${id}`);
  return p;
};

export const NAV_ENTREES: NavEntree[] = [
  { type: "lien", page: page("seuil") },
  {
    type: "groupe",
    label: "Fondements",
    pages: [page("institution"), page("constitution"), page("manifeste")],
  },
  {
    type: "groupe",
    label: "Savoir",
    pages: [page("note_epistemologique"), page("ouvrage"), page("laboratoire"), page("concepts")],
  },
  { type: "lien", page: page("transmission") },
  { type: "lien", page: page("declaration") },
];

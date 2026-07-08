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
  { page_id: "seuil", label: "Accueil", href: "/" },
  { page_id: "institution", label: "Institution", href: "/institution" },
  { page_id: "constitution", label: "Constitution", href: "/constitution" },
  { page_id: "manifeste", label: "Manifeste", href: "/manifeste" },
  { page_id: "note_epistemologique", label: "Note Épistémo", href: "/note-epistemologique" },
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

/** Configuration globale du site (URL, identité) — source unique pour SEO. */
export const siteConfig = {
  name: "Les Principes Retrouvés",
  shortName: "École de Brazzaville",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://les-principes-retrouves.webtinix.com",
  locale: "fr_FR",
  description:
    "Portail de l'École de Brazzaville — Science Métamoderne : théorie générale de l'intelligibilité, épistémologie et droit constitutionnel.",
  author: "Gaudéric MAMBOU",
  locus: "Brazzaville, République du Congo",
} as const;

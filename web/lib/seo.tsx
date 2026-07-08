import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/** Construit les métadonnées d'une page (title/description + Open Graph). */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
  };
}

/** Données structurées JSON-LD de l'organisation (rendues une fois, sur l'accueil). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    founder: { "@type": "Person", name: siteConfig.author },
    location: { "@type": "Place", name: siteConfig.locus },
  };
}

/** Balise <script type="application/ld+json"> prête à insérer. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

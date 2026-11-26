import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getTexte } from "@/lib/contenu";
import "./globals.css";
// Charte du prototype maître V16 (Georgia / Arial, polices système : aucun téléchargement).
import "./v16.css";
// Améliorations UI/UX (audit) : complète v16.css sans la modifier.
import "./ux.css";

// Métadonnées par défaut : éditables dans le back-office, global « Site —
// Navigation et pied de page » (section « Référencement »).
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: await getTexte("site_navigation.seo.titre_defaut"),
      template: await getTexte("site_navigation.seo.modele_titre"),
    },
    description: await getTexte("site_navigation.seo.description"),
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, Lora, Fira_Code, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { getTexte } from "@/lib/contenu";
import "./globals.css";

// Titres, dédicace — Playfair Display
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Corps de texte — Lora
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Équations Σ = M(F(V(Σ))) — Fira Code
const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Titres et texte des pages de contenu : instances propres au site (graisses
// 400 à 600). Les instances ci-dessus restent celles du Fronton, inchangées.
const playfairSite = Playfair_Display({
  variable: "--font-playfair-site",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const loraSite = Lora({
  variable: "--font-lora-site",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Interface, boutons, légendes — Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Titre et description par défaut : back-office, global « Site — Navigation
// et pied de page » (section « Référencement »).
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
    <html
      lang="fr"
      className={`${playfair.variable} ${lora.variable} ${firaCode.variable} ${inter.variable} ${playfairSite.variable} ${loraSite.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

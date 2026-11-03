import type { Metadata } from "next";
import { Playfair_Display, Lora, Fira_Code, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
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
  weight: ["500"],
  display: "swap",
});

// Interface, boutons, légendes — Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Les Principes Retrouvés | École de Brazzaville | Science Métamoderne",
    template: "%s | Les Principes Retrouvés",
  },
  description:
    "Portail de l'École de Brazzaville — Science Métamoderne : théorie générale de l'intelligibilité, épistémologie et droit constitutionnel.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${lora.variable} ${firaCode.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

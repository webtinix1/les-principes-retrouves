import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import { pageMetadata } from "@/lib/seo";
import "./fronton.css";

/**
 * Polices du fronton, auto-hébergées via next/font (le design d'origine les
 * chargeait depuis Google Fonts, ce que la CSP du site interdit). Exposées en
 * variables CSS et consommées par fronton.css.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = pageMetadata({
  title: "Le Seuil de l'Organon Reconstructif",
  description:
    "Le Fronton de l'École de Brazzaville — seuil de l'Organon Reconstructif. Toute connaissance repose sur une architecture préalable d'intelligibilité.",
  path: "/",
});

/**
 * Layout du fronton — volontairement SANS l'en-tête ni le pied de page du site :
 * c'est une page-porte autonome. Le CSS importé ici n'est livré que sur cette
 * route (découpage CSS par segment de Next), donc il ne fuit pas vers le site.
 */
export default function FrontonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} ${ebGaramond.variable} fronton-root`}>
      {children}
    </div>
  );
}

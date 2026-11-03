import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import "./fronton.css";

/**
 * Le fronton parle désormais la voix du site : Playfair Display (titres) + Lora
 * (corps), déjà chargées et exposées en variables CSS par le layout racine
 * (`--font-playfair`, `--font-lora`), héritées ici. La police signature apparaît
 * ainsi dès la page-porte — fin de la discontinuité de seuil (audit design).
 */

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
  return <div className="fronton-root">{children}</div>;
}

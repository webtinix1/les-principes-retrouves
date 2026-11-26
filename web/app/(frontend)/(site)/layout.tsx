import { EnteteV16 } from "@/components/v16/entete";
import { PiedV16 } from "@/components/v16/pied";
import { getNavigation } from "@/lib/navigation-textes";

/**
 * Gabarit de toutes les pages, Fronton compris, conforme au prototype maître
 * V16 : filet doré, en-tête marine collant avec la navigation par boutons,
 * contenu, pied de page avec les contacts officiels.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { textes: t } = await getNavigation();
  return (
    <div className="site">
      <a href="#contenu" className="lien-evitement">
        {t["acces.aller_au_contenu"]}
      </a>
      <EnteteV16 />
      <main id="contenu">{children}</main>
      <PiedV16 />
    </div>
  );
}

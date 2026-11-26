import { AidesLecture } from "@/components/v16/aides-lecture";
import { EnteteV16 } from "@/components/v16/entete";
import { PagesVoisines } from "@/components/v16/pages-voisines";
import { PiedV16 } from "@/components/v16/pied";
import { getNavigation } from "@/lib/navigation-textes";

/**
 * Gabarit de toutes les pages, Fronton compris, conforme au prototype maître
 * V16 : filet doré, en-tête marine collant avec la navigation par boutons,
 * contenu, pied de page avec les contacts officiels. S'y ajoutent les aides à
 * la lecture (sommaire, progression, retour en haut) et les pages voisines.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pages, textes: t } = await getNavigation();
  return (
    <div className="site">
      <a href="#contenu" className="lien-evitement">
        {t["acces.aller_au_contenu"]}
      </a>
      <EnteteV16 />
      <AidesLecture sommaire={t["sommaire.titre"]} retourHaut={t["pagination.retour_debut"]} />
      <main id="contenu" tabIndex={-1}>
        {children}
      </main>
      <PagesVoisines
        pages={pages.map((p) => ({ href: p.href, titre: p.label }))}
        libelles={{
          aria: t["pagination.nav_aria"],
          precedente: t["pagination.precedente"],
          suivante: t["pagination.suivante"],
          retourDebut: t["pagination.retour_debut"],
        }}
      />
      <PiedV16 />
    </div>
  );
}

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PaginationCanonique } from "@/components/navigation-page";
import { getNavigation } from "@/lib/navigation-textes";

/**
 * Layout des pages de contenu : en-tête + contenu + pagination canonique +
 * pied de page. La classe `site` porte les règles transverses du design
 * system (fond papier, focus, contraste, mouvement) — cf. globals.css.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pages, textes: t } = await getNavigation();
  const pagination = {
    nav_aria: t["pagination.nav_aria"],
    precedente: t["pagination.precedente"],
    suivante: t["pagination.suivante"],
    retour_debut: t["pagination.retour_debut"],
  };
  return (
    <div className="site flex min-h-full flex-1 flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-or-500 focus:px-4 focus:py-3 focus:font-ui focus:text-sm focus:font-semibold focus:text-nuit-950"
      >
        {t["acces.aller_au_contenu"]}
      </a>
      <SiteHeader />
      <main id="contenu" className="flex-1">
        {children}
        <PaginationCanonique pages={pages} libelles={pagination} />
      </main>
      <SiteFooter />
    </div>
  );
}

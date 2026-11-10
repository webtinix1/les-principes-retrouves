import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * Layout des pages de contenu : en-tête + contenu + pied de page.
 * La classe `site` porte les règles transverses des design systems
 * (focus, contraste, pression) — cf. globals.css.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site flex min-h-full flex-1 flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-or focus:px-4 focus:py-2 focus:font-ui focus:text-sm focus:font-semibold focus:text-bleu-nuit-profond"
      >
        Aller au contenu
      </a>
      <SiteHeader />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

import Link from "next/link";
import { LogoMaat } from "@/components/logo-maat";
import { SiteNav } from "@/components/site-nav";

/**
 * En-tête du site (Server Component — rendu au build pour le SEO).
 * L'interactivité (menu mobile, état actif) est isolée dans <SiteNav /> (client).
 */
export function SiteHeader() {
  return (
    <header className="relative bg-bleu-nuit text-blanc-casse">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
        <Link
          href="/"
          aria-label="Les Principes Retrouvés — accueil"
          className="site-logo flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
        >
          <LogoMaat className="h-9 w-auto" />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-base font-semibold text-blanc">
              Les Principes Retrouvés
            </span>
            <span className="font-ui text-[0.65rem] uppercase tracking-[0.15em] text-or/80">
              École de Brazzaville
            </span>
          </span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}

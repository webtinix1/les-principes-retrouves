import Link from "next/link";
import { LogoMaat } from "@/components/logo-maat";
import { SiteNav } from "@/components/site-nav";

/**
 * En-tête du site (Server Component — rendu au build pour le SEO).
 * L'interactivité (menu mobile, état actif) est isolée dans <SiteNav /> (client).
 */
export function SiteHeader() {
  return (
    <header className="relative z-50 border-b border-or/20 bg-[radial-gradient(130%_200%_at_50%_-60%,#20456c_0%,#122a44_38%,#0b1a30_68%,#070f1e_100%)] text-blanc-casse">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
        <Link
          href="/accueil"
          aria-label="Les Principes Retrouvés — accueil"
          className="site-logo flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
        >
          <LogoMaat className="h-10 w-auto" />
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

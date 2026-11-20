import Link from "next/link";
import { LogoMaat } from "@/components/logo-maat";
import {
  BarrePosition,
  MenuMobile,
  NavOrdinateur,
  type LibellesNav,
} from "@/components/site-nav";
import { getNavigation } from "@/lib/navigation-textes";

/**
 * En-tête du site (Server Component). Aplat nuit, sans dégradé.
 * - Ordinateur (≥ 1024 px) : ligne 1 (68 px) marque + Contact ; ligne 2 (52 px)
 *   les 10 entrées du menu, numérotées, avec trois fins séparateurs.
 * - Mobile : marque + bouton « Menu » (44 px), puis la ligne de position
 *   « 04 / 10 · Manifeste ». L'en-tête mobile est collant ; sur ordinateur il
 *   défile avec la page (les sommaires latéraux sont collants à sa place).
 * Textes : back-office, global « Site — Navigation et pied de page ».
 */
export async function SiteHeader() {
  const { pages, textes: t } = await getNavigation();
  const libelles: LibellesNav = {
    contact: t["entete.contact"],
    menu_ouvrir: t["entete.menu_ouvrir"],
    menu_fermer: t["entete.menu_fermer"],
    nav_aria: t["entete.nav_aria"],
    sur_total: t["position.sur_total"],
    precedente_aria: t["position.precedente_aria"],
    suivante_aria: t["position.suivante_aria"],
  };
  return (
    <header className="surface-sombre sticky top-0 z-50 bg-nuit-950 text-nuit-100 lg:static">
      <div className="mx-auto max-w-[1360px] px-5 lg:px-6 xl:px-10">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[68px] lg:border-b lg:border-nuit-800">
          <Link
            href="/"
            aria-label={t["marque.logo_aria"]}
            className="site-logo m-fade flex min-h-11 items-center gap-2.5 lg:gap-3.5"
          >
            <LogoMaat className="h-[19px] lg:h-[25px]" />
            <span className="flex flex-col gap-0.5">
              <span className="font-titre text-[17px] font-medium text-white lg:text-[19px]">
                {t["marque.nom"]}
              </span>
              <span className="hidden font-code text-[10.5px] uppercase tracking-[0.16em] text-or-500 lg:block">
                {t["marque.devise"]}
              </span>
            </span>
          </Link>
          <Link
            href="/transmission#contact"
            className="hidden min-h-11 items-center font-ui text-sm text-nuit-300 transition-colors hover:text-or-300 lg:flex"
          >
            {libelles.contact}
          </Link>
          <MenuMobile pages={pages} libelles={libelles} />
        </div>
        <BarrePosition pages={pages} libelles={libelles} />
        <NavOrdinateur pages={pages} libelles={libelles} />
      </div>
    </header>
  );
}

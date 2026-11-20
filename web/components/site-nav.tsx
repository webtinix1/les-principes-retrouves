"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { SEPARATEUR_APRES, numero2, type PageCanonique } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** Libellés de l'en-tête, lus côté serveur dans le back-office (cf. site-header). */
export type LibellesNav = {
  contact: string;
  menu_ouvrir: string;
  menu_fermer: string;
  nav_aria: string;
  /** « / 10 » après le numéro de la page courante. */
  sur_total: string;
  /** « Page précédente : {page} ». */
  precedente_aria: string;
  /** « Page suivante : {page} ». */
  suivante_aria: string;
};

type PropsNav = { pages: PageCanonique[]; libelles: LibellesNav };

const avecPage = (modele: string, page: string) => modele.split("{page}").join(page);

function estActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

/** Menu ordinateur : les 10 entrées sur une ligne, numérotées à partir de 1 280 px. */
export function NavOrdinateur({ pages, libelles }: PropsNav) {
  const pathname = usePathname();
  return (
    <nav aria-label={libelles.nav_aria} className="hidden lg:block">
      <ul className="flex items-center justify-between">
        {pages.map((p, i) => {
          const active = estActive(pathname, p.href);
          return (
            <Fragment key={p.page_id}>
              <li
                className="m-rise"
                style={{ "--dl": `${80 + i * 40}ms` } as React.CSSProperties}
              >
                <Link
                  href={p.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "nav-lien flex h-[52px] items-center gap-1.5 border-b-2 border-transparent px-1.5 font-ui text-[13.5px] font-medium whitespace-nowrap text-nuit-100 transition-colors hover:text-or-300 xl:px-2 xl:text-[14.5px]",
                    active && "border-or-500 text-or-500 hover:text-or-500",
                  )}
                >
                  <span
                    className={cn(
                      "hidden font-code text-[11px] font-normal xl:inline",
                      active ? "text-or-500" : "text-nuit-num",
                    )}
                  >
                    {numero2(p.numero)}
                  </span>
                  {p.label}
                </Link>
              </li>
              {SEPARATEUR_APRES.has(p.page_id) && (
                <li aria-hidden="true" className="h-[18px] w-px bg-nuit-800" />
              )}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Mobile : bouton « Menu » (panneau de la liste complète, numérotée) et ligne
 * de position « 04 / 10 · Manifeste » avec page précédente / suivante. La
 * ligne de position n'apparaît que sur les 10 pages canoniques.
 */
export function MenuMobile({ pages, libelles }: PropsNav) {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [cheminOuvert, setCheminOuvert] = useState(pathname);

  // Fermeture au changement de page (ajustement d'état pendant le rendu).
  if (cheminOuvert !== pathname) {
    setCheminOuvert(pathname);
    setOuvert(false);
  }

  useEffect(() => {
    if (!ouvert) return;
    const echap = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", echap);
    return () => document.removeEventListener("keydown", echap);
  }, [ouvert]);

  return (
    <>
      <button
        type="button"
        className="flex h-11 min-w-11 items-center gap-2 rounded-[2px] border border-nuit-800 px-3 font-ui text-sm font-medium text-nuit-100 lg:hidden"
        aria-expanded={ouvert}
        aria-controls="menu-mobile"
        onClick={() => setOuvert((v) => !v)}
      >
        {ouvert ? (
          <X aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
        ) : (
          <Menu aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
        )}
        {ouvert ? libelles.menu_fermer : libelles.menu_ouvrir}
      </button>

      {ouvert && (
        <nav
          id="menu-mobile"
          aria-label={libelles.nav_aria}
          className="m-panel absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-nuit-800 bg-nuit-950 px-5 pb-8 lg:hidden"
        >
          <ul>
            {pages.map((p) => {
              const active = estActive(pathname, p.href);
              return (
                <li
                  key={p.page_id}
                  className={cn(
                    SEPARATEUR_APRES.has(p.page_id) &&
                      "mb-2 border-b border-nuit-800 pb-2",
                  )}
                >
                  <Link
                    href={p.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOuvert(false)}
                    className={cn(
                      "flex min-h-12 items-center gap-4 font-ui text-base font-medium text-nuit-100",
                      active && "text-or-500",
                    )}
                  >
                    <span
                      className={cn(
                        "w-6 font-code text-xs font-normal",
                        active ? "text-or-500" : "text-nuit-num",
                      )}
                    >
                      {numero2(p.numero)}
                    </span>
                    <span className={cn(active && "border-b-2 border-or-500")}>
                      {p.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/transmission#contact"
            onClick={() => setOuvert(false)}
            className="mt-4 flex min-h-11 items-center font-ui text-sm text-nuit-300"
          >
            {libelles.contact}
          </Link>
        </nav>
      )}
    </>
  );
}

/** Ligne de position mobile : « 04 / 10 · Manifeste », page précédente / suivante. */
export function BarrePosition({ pages, libelles }: PropsNav) {
  const pathname = usePathname();
  const i = pages.findIndex((p) => p.href === pathname);
  const courante = pages[i];
  const precedente = pages[i - 1];
  const suivante = pages[i + 1];
  return (
    <>
      {courante && (
        <div className="-mx-5 flex h-11 items-center justify-between border-t border-nuit-800 bg-nuit-950 lg:hidden">
          {precedente ? (
            <Link
              href={precedente.href}
              aria-label={avecPage(libelles.precedente_aria, precedente.label)}
              className="grid size-11 place-items-center text-nuit-300"
            >
              <ChevronLeft
                aria-hidden="true"
                className="size-[18px]"
                strokeWidth={1.75}
              />
            </Link>
          ) : (
            <span className="size-11" />
          )}
          <span className="font-code text-xs tracking-[0.08em] text-nuit-100">
            <span className="text-or-500">{numero2(courante.numero)}</span>{" "}
            {libelles.sur_total} · {courante.label}
          </span>
          {suivante ? (
            <Link
              href={suivante.href}
              aria-label={avecPage(libelles.suivante_aria, suivante.label)}
              className="grid size-11 place-items-center text-nuit-300"
            >
              <ChevronRight
                aria-hidden="true"
                className="size-[18px]"
                strokeWidth={1.75}
              />
            </Link>
          ) : (
            <span className="size-11" />
          )}
        </div>
      )}
    </>
  );
}

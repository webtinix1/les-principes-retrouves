"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_ENTREES, type NavPage } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const LIEN =
  "flex min-h-[44px] items-center rounded px-2 py-1.5 text-blanc-casse/80 transition-colors hover:text-or lg:min-h-0";

/**
 * Navigation principale : 5 entrées (dont deux familles déroulantes) visibles
 * dès 1024px ; en dessous, panneau déroulant groupé par familles.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [groupe, setGroupe] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Ferme menus et panneau au changement de page (ajustement d'état pendant le rendu).
  const [cheminPrecedent, setCheminPrecedent] = useState(pathname);
  if (cheminPrecedent !== pathname) {
    setCheminPrecedent(pathname);
    setOpen(false);
    setGroupe(null);
  }

  // Clic extérieur ou Échap : referme la famille ouverte.
  useEffect(() => {
    if (!groupe) return;
    const clic = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setGroupe(null);
    };
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGroupe(null);
    };
    document.addEventListener("mousedown", clic);
    document.addEventListener("keydown", touche);
    return () => {
      document.removeEventListener("mousedown", clic);
      document.removeEventListener("keydown", touche);
    };
  }, [groupe]);

  const lienPage = (p: NavPage, className?: string) => {
    const active = isActive(pathname, p.href);
    return (
      <Link
        href={p.href}
        aria-current={active ? "page" : undefined}
        className={cn(LIEN, active && "text-or", className)}
      >
        {p.label}
      </Link>
    );
  };

  return (
    <>
      <button
        type="button"
        className="ml-auto grid size-11 place-items-center text-blanc-casse lg:hidden"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <nav
        ref={navRef}
        id="site-nav"
        aria-label="Navigation principale"
        className={cn(
          "font-ui text-sm",
          // Mobile/tablette : panneau déroulant ; desktop (≥1024px) : barre horizontale.
          "absolute inset-x-0 top-full z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-y border-or/20 bg-bleu-nuit lg:static lg:z-auto lg:ml-auto lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent",
          open ? "block" : "hidden lg:block",
        )}
      >
        <ul className="flex flex-col gap-1 p-4 lg:flex-row lg:items-center lg:gap-x-3 lg:p-0">
          {NAV_ENTREES.map((entree) => {
            if (entree.type === "lien") {
              return <li key={entree.page.page_id}>{lienPage(entree.page)}</li>;
            }
            const ouvert = groupe === entree.label;
            const actif = entree.pages.some((p) => isActive(pathname, p.href));
            const idPanneau = `groupe-${entree.label.toLowerCase()}`;
            return (
              <li key={entree.label} className="lg:relative">
                {/* Mobile : intitulé de famille + liens à plat. */}
                <p className="mt-3 px-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-or/80 lg:hidden">
                  {entree.label}
                </p>
                <ul className="lg:hidden">
                  {entree.pages.map((p) => (
                    <li key={p.page_id}>{lienPage(p, "pl-4")}</li>
                  ))}
                </ul>

                {/* Desktop : famille déroulante. */}
                <button
                  type="button"
                  aria-expanded={ouvert}
                  aria-controls={idPanneau}
                  onClick={() => setGroupe(ouvert ? null : entree.label)}
                  className={cn(
                    LIEN,
                    "hidden gap-1 lg:inline-flex",
                    (actif || ouvert) && "text-or",
                  )}
                >
                  {entree.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("size-4 transition-transform", ouvert && "rotate-180")}
                  />
                </button>
                <ul
                  id={idPanneau}
                  className={cn(
                    "absolute top-full left-0 z-50 mt-3 hidden min-w-60 rounded-xl border border-or/30 bg-bleu-nuit p-2",
                    ouvert && "lg:block",
                  )}
                >
                  {entree.pages.map((p) => (
                    <li key={p.page_id}>{lienPage(p, "px-3 py-2")}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

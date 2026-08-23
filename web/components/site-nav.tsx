"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_PAGES } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="ml-auto grid size-11 place-items-center text-blanc-casse xl:hidden"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <nav
        id="site-nav"
        aria-label="Navigation principale"
        className={cn(
          "font-ui text-sm xl:text-[0.8rem]",
          // Mobile/tablette : panneau déroulant ; desktop (≥1280px) : barre horizontale
          "absolute inset-x-0 top-full z-50 border-t border-or/20 bg-bleu-nuit shadow-lg shadow-black/30 xl:static xl:z-auto xl:border-0 xl:bg-transparent xl:shadow-none",
          open ? "block" : "hidden xl:block",
        )}
      >
        <ul className="flex flex-col gap-1 p-4 xl:flex-row xl:flex-nowrap xl:items-center xl:justify-end xl:gap-x-4 xl:whitespace-nowrap xl:p-0">
          {NAV_PAGES.map((p) => {
            const active = isActive(pathname, p.href);
            return (
              <li key={p.page_id}>
                <Link
                  href={p.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    // Cible tactile ≥ 44px dans le panneau mobile ; compacte en barre desktop.
                    "flex min-h-[44px] items-center rounded px-2 py-1.5 text-blanc-casse/80 transition-colors hover:text-or focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or xl:min-h-0",
                    active && "text-or",
                  )}
                >
                  {p.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

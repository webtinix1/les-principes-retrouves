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
        className="ml-auto p-2 text-blanc-casse lg:hidden"
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
          "font-ui text-sm",
          // Mobile : panneau déroulant ; desktop : barre horizontale
          "absolute inset-x-0 top-full border-t border-or/20 bg-bleu-nuit lg:static lg:border-0 lg:bg-transparent",
          open ? "block" : "hidden lg:block",
        )}
      >
        <ul className="flex flex-col gap-1 p-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-end lg:gap-x-5 lg:gap-y-1 lg:p-0">
          {NAV_PAGES.map((p) => {
            const active = isActive(pathname, p.href);
            return (
              <li key={p.page_id}>
                <Link
                  href={p.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded px-2 py-1.5 text-blanc-casse/80 transition-colors hover:text-or focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or",
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

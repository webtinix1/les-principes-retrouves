"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type LienNav = { page_id: string; label: string; href: string };

/**
 * Navigation du prototype V16 : boutons-liens alignés à droite, page active
 * marquée (aria-current), bouton « Menu ☰ » sous 850 px qui ouvre la liste.
 */
export function NavigationV16({ pages, menu, aria }: { pages: LienNav[]; menu: string; aria: string }) {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [chemin, setChemin] = useState(pathname);
  if (chemin !== pathname) {
    setChemin(pathname);
    setOuvert(false);
  }
  const actif = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
  return (
    <>
      <button className="menu-toggle" type="button" aria-expanded={ouvert} aria-controls="nav" onClick={() => setOuvert((v) => !v)}>
        {menu}
      </button>
      <nav id="nav" aria-label={aria} className={ouvert ? "open" : undefined}>
        {pages.map((p) => (
          <Link key={p.page_id} href={p.href} aria-current={actif(p.href) ? "page" : undefined}>
            {p.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

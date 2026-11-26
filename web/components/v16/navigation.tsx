"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type LienNav = { page_id: string; label: string; href: string };

/**
 * Navigation du prototype V16 : boutons-liens alignés à droite, page active
 * marquée (aria-current), bouton « Menu ☰ » sur petit écran qui ouvre la liste.
 * Menu ouvert : la page ne défile plus, Échap ou un clic à l'extérieur le ferme.
 */
export function NavigationV16({ pages, menu, aria }: { pages: LienNav[]; menu: string; aria: string }) {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [chemin, setChemin] = useState(pathname);
  const bouton = useRef<HTMLButtonElement>(null);
  if (chemin !== pathname) {
    setChemin(pathname);
    setOuvert(false);
  }

  useEffect(() => {
    if (!ouvert) return;
    const racine = document.documentElement;
    racine.classList.add("menu-ouvert");
    const touche = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOuvert(false);
      bouton.current?.focus();
    };
    const clic = (e: MouseEvent) => {
      const entete = bouton.current?.closest("header");
      if (entete && !entete.contains(e.target as Node)) setOuvert(false);
    };
    document.addEventListener("keydown", touche);
    document.addEventListener("mousedown", clic);
    return () => {
      racine.classList.remove("menu-ouvert");
      document.removeEventListener("keydown", touche);
      document.removeEventListener("mousedown", clic);
    };
  }, [ouvert]);

  const actif = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
  return (
    <>
      <button
        ref={bouton}
        className="menu-toggle"
        type="button"
        aria-expanded={ouvert}
        aria-controls="nav"
        onClick={() => setOuvert((v) => !v)}
      >
        {menu}
      </button>
      <nav id="nav" aria-label={aria} className={ouvert ? "open" : undefined}>
        {pages.map((p) => (
          <Link key={p.page_id} href={p.href} aria-current={actif(p.href) ? "page" : undefined}
            onClick={() => setOuvert(false)}
          >
            {p.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

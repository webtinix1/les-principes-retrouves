"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type PageVoisine = { href: string; titre: string };

/**
 * Liens vers la page précédente et la page suivante, dans l'ordre du menu.
 * Affichés seulement sur les pages du menu ; la dernière renvoie au début.
 */
export function PagesVoisines({
  pages,
  libelles,
}: {
  pages: PageVoisine[];
  libelles: { aria: string; precedente: string; suivante: string; retourDebut: string };
}) {
  const pathname = usePathname();
  const i = pages.findIndex((p) => p.href === pathname);
  if (i < 0) return null;
  const precedente = pages[i - 1];
  const suivante = pages[i + 1];
  return (
    <nav className="pages-voisines" aria-label={libelles.aria}>
      <div className="wrap">
        {precedente ? (
          <Link href={precedente.href} rel="prev" className="voisine voisine-precedente">
            <span className="voisine-sens">
              <span aria-hidden="true">← </span>
              {libelles.precedente}
            </span>
            <span className="voisine-titre">{precedente.titre}</span>
          </Link>
        ) : (
          <span />
        )}
        {suivante ? (
          <Link href={suivante.href} rel="next" className="voisine voisine-suivante">
            <span className="voisine-sens">
              {libelles.suivante}
              <span aria-hidden="true"> →</span>
            </span>
            <span className="voisine-titre">{suivante.titre}</span>
          </Link>
        ) : (
          <Link href={pages[0].href} className="voisine voisine-suivante">
            <span className="voisine-sens">
              {libelles.retourDebut}
              <span aria-hidden="true"> ↑</span>
            </span>
            <span className="voisine-titre">{pages[0].titre}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

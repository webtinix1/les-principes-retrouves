"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { numero2, type PageCanonique } from "@/lib/navigation";

/** Libellés de la pagination, lus côté serveur dans le back-office (cf. layout du site). */
export type LibellesPagination = {
  nav_aria: string;
  precedente: string;
  suivante: string;
  retour_debut: string;
};

/**
 * Pagination canonique de fin de page : « ← 08 Concepts | 10 Déclaration → ».
 * Posée par le layout sous le contenu des 10 pages du menu (sauf l'Accueil,
 * qui a sa propre sortie vers l'Institution). Remplace le bloc de dépannage
 * « Page précédente / suivante » et le bouton « Sommaire » flottant.
 */
export function PaginationCanonique({
  pages,
  libelles,
}: {
  /** Les dix pages canoniques (libellés et titres éditables). */
  pages: PageCanonique[];
  libelles: LibellesPagination;
}) {
  const pathname = usePathname();
  const i = pages.findIndex((p) => p.href === pathname);
  if (i <= 0) return null;
  const precedente = pages[i - 1];
  const suivante = pages[i + 1];

  return (
    <div className="surface-claire bg-papier px-5 pb-20 lg:px-6 xl:px-10">
      <nav
        aria-label={libelles.nav_aria}
        className="mx-auto grid max-w-[1280px] grid-cols-2 border-t border-encre border-b border-b-filet"
      >
        <Link
          href={precedente.href}
          className="group flex flex-col gap-1.5 border-r border-filet py-6 pr-4 sm:pr-6"
        >
          <span className="font-code text-[11.5px] text-encre-3">
            <span aria-hidden="true">← </span>
            {numero2(precedente.numero)}
            <span className="hidden sm:inline"> · {libelles.precedente}</span>
          </span>
          <span className="font-titre text-lg text-encre group-hover:underline group-hover:decoration-or-500 group-hover:underline-offset-4 sm:text-[26px]">
            {precedente.titre}
          </span>
        </Link>
        {suivante ? (
          <Link
            href={suivante.href}
            className="group flex flex-col items-end gap-1.5 py-6 pl-4 text-right sm:pl-6"
          >
            <span className="font-code text-[11.5px] text-encre-3">
              <span className="hidden sm:inline">{libelles.suivante} · </span>
              {numero2(suivante.numero)}
              <span aria-hidden="true"> →</span>
            </span>
            <span className="font-titre text-lg text-encre group-hover:underline group-hover:decoration-or-500 group-hover:underline-offset-4 sm:text-[26px]">
              {suivante.titre}
            </span>
          </Link>
        ) : (
          <Link
            href={pages[0].href}
            className="group flex flex-col items-end gap-1.5 py-6 pl-4 text-right sm:pl-6"
          >
            <span className="font-code text-[11.5px] text-encre-3">
              {libelles.retour_debut} · {numero2(pages[0].numero)}<span aria-hidden="true"> →</span>
            </span>
            <span className="font-titre text-lg text-encre group-hover:underline group-hover:decoration-or-500 group-hover:underline-offset-4 sm:text-[26px]">
              {pages[0].titre}
            </span>
          </Link>
        )}
      </nav>
    </div>
  );
}

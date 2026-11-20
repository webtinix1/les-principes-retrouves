"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type EntreeActe = { id: string; numero: string; label: string };

/**
 * Sommaire latéral collant de la Déclaration (ordinateur) : liste des actes,
 * l'entrée de la section en cours de lecture est soulignée d'or
 * (`aria-current="location"`).
 */
export function SommaireActes({
  entrees,
  titre = "Sur cette page",
  ariaLabel = "Les actes de la Déclaration",
}: {
  entrees: EntreeActe[];
  /** Libellés éditables (declaration.sommaire.titre / declaration.sommaire.aria). */
  titre?: string;
  ariaLabel?: string;
}) {
  const [courant, setCourant] = useState<string | null>(null);

  useEffect(() => {
    const cibles = entrees
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    if (cibles.length === 0) return;

    const calculer = () => {
      // La section courante est la dernière dont le haut a franchi le tiers de l'écran.
      const seuil = window.innerHeight / 3;
      let actif: string | null = null;
      for (const el of cibles) {
        if (el.getBoundingClientRect().top <= seuil) actif = el.id;
      }
      setCourant(actif);
    };

    calculer();
    window.addEventListener("scroll", calculer, { passive: true });
    window.addEventListener("resize", calculer);
    return () => {
      window.removeEventListener("scroll", calculer);
      window.removeEventListener("resize", calculer);
    };
  }, [entrees]);

  return (
    <nav aria-label={ariaLabel} className="flex flex-col">
      <span className="pb-2.5 font-code text-[11.5px] text-encre-3">{titre}</span>
      <ol className="border-b border-filet-doux">
        {entrees.map((e) => {
          const actif = e.id === courant;
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                aria-current={actif ? "location" : undefined}
                className={cn(
                  "grid min-h-11 grid-cols-[34px_1fr] items-baseline gap-2 border-t border-filet-doux py-2 font-ui text-[14px] leading-snug transition-colors hover:text-encre",
                  actif
                    ? "text-encre underline decoration-or-500 decoration-2 underline-offset-[5px]"
                    : "text-encre-2",
                )}
              >
                <span className={cn("font-code text-[11.5px]", actif ? "text-or-700" : "text-encre-3")}>
                  {e.numero}
                </span>
                {e.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

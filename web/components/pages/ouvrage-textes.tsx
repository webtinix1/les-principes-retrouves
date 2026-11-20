import Link from "next/link";

import { dureeLecture } from "@/content/lectures";
import type { TexteLecture } from "@/content/lectures";
import { intertitres } from "@/components/lecture";
import { BadgeAcces } from "@/components/editorial";
import { libelle, libellesLecture, remplacer } from "@/lib/lecture";
import { cn } from "@/lib/utils";

/**
 * Lignes de texte des pages de l’Ouvrage (diptyque de /ouvrage et sommaires
 * /ouvrage/[tome]) : numéro, titre, sous-titre, temps de lecture, sections.
 * Libellés : Site › Lecture des tomes (content/blocs/site_lecture.ts).
 */

export const numeroTexte = (n: number) => String(n).padStart(2, "0");

/**
 * Formateur « 11 min de lecture · 7 sections » (sections affichées à partir
 * de 2) ; `long = false` → « 11 min · 7 sections ».
 */
export async function formateurMeta(): Promise<(texte: TexteLecture, long?: boolean) => string> {
  const l = await libellesLecture();
  return (texte, long = true) => {
    const n = intertitres(texte).length;
    const duree = remplacer(long ? l["meta.minutes_long"] : l["meta.minutes"], { min: dureeLecture(texte) });
    return n >= 2 ? `${duree} · ${remplacer(l["meta.sections"], { n })}` : duree;
  };
}

/** « 11 min de lecture · 7 sections » (sections affichées à partir de 2). */
export async function metaTexte(texte: TexteLecture, long = true) {
  return (await formateurMeta())(texte, long);
}

/** Ligne compacte (cartes du diptyque) : numéro, titre, durée. */
export async function LigneTexteCompacte({
  href,
  rang,
  texte,
}: {
  href: string;
  rang: number;
  texte: TexteLecture;
}) {
  const duree = await libelle("meta.minutes_compact", { min: dureeLecture(texte) });
  return (
    <li>
      <Link
        href={href}
        className="group grid min-h-11 grid-cols-[28px_minmax(0,1fr)_auto] items-baseline gap-x-2.5 border-t border-filet-doux py-3"
      >
        <span className="font-code text-[11.5px] text-or-700">{numeroTexte(rang)}</span>
        <span className="font-ui text-[15px] leading-snug text-encre group-hover:text-lien group-hover:underline group-hover:underline-offset-[3px]">
          {texte.titre}
        </span>
        <span className="font-code text-[11.5px] whitespace-nowrap text-encre-3">
          {duree}
        </span>
      </Link>
    </li>
  );
}

/** Ligne complète (sommaire d’un tome) : lien vers la page de lecture. */
export async function LigneTexte({
  href,
  rang,
  texte,
  className,
}: {
  href: string;
  rang: number;
  texte: TexteLecture;
  className?: string;
}) {
  const [meta, lire] = await Promise.all([metaTexte(texte), libelle("ligne.lire")]);
  return (
    <li className={cn("rv", className)}>
      <Link
        href={href}
        className="group grid grid-cols-[36px_minmax(0,1fr)] gap-x-3 border-t border-filet py-6 md:grid-cols-[56px_minmax(0,1fr)_auto] md:items-start md:gap-x-6 md:py-7"
      >
        <span className="pt-1 font-code text-[13px] text-or-700 md:text-sm">{numeroTexte(rang)}</span>
        <span className="flex min-w-0 flex-col gap-1.5">
          <span className="font-titre text-[1.3125rem] leading-[1.25] font-medium text-encre group-hover:underline group-hover:decoration-or-500 group-hover:decoration-2 group-hover:underline-offset-[5px] md:text-[1.5rem]">
            {texte.titre}
          </span>
          {texte.sous_titre && (
            <span className="font-texte text-[16.5px] leading-[1.5] text-encre-2 italic">
              {texte.sous_titre}
            </span>
          )}
          <span className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-code text-[12px] text-encre-3">{meta}</span>
            <span className="md:hidden">
              <BadgeAcces libre />
            </span>
          </span>
        </span>
        <span className="hidden flex-col items-end gap-3 md:flex">
          <BadgeAcces libre />
          <span className="font-ui text-[15px] font-semibold text-lien">
            {lire} <span className="arr" aria-hidden="true">→</span>
          </span>
        </span>
      </Link>
    </li>
  );
}

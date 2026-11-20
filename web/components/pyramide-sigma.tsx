"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Pyramide de Σ — un vrai triangle à bords droits, en tranches empilées
 * (forme validée par le client), redessiné selon la maquette de la refonte :
 * chaque tranche est un vrai <button> découpé en clip-path ; la tranche
 * active passe en Or Maât ; sa définition s'affiche dessous (aria-live).
 * Axes « Mouvement descendant / ascendant » de part et d'autre, avec un
 * point d'or qui les parcourt.
 *
 * Les niveaux et leurs définitions sont ceux du composant validé (6 niveaux),
 * éditables depuis le back-office (page Accueil) : la page les passe en props.
 */

/** Niveau de la pyramide — textes éditables (registre « accueil.niveaux_pyramide »). */
export type NiveauPyramide = {
  /** Symbole affiché dans la tranche (vide : symbole de repli). */
  symbole: string;
  /** Libellé de la tranche (retour à la ligne pour couper la ligne). */
  libelle: string;
  nom: string;
  formule: string;
  definition: string;
  /** Entrée complète (page Concepts). */
  source_libelle: string;
  source_lien: string;
};

/** Libellés d'interface de la pyramide (registre « accueil.pyramide.* »). */
export type TextesPyramide = {
  titre: string;
  consigne: string;
  axe_descendant: string;
  axe_descendant_legende: string;
  axe_ascendant: string;
  axe_ascendant_legende: string;
  groupe_lecture: string;
  /** Marqueurs {n} et {total}. */
  position: string;
  symbole_vide: string;
  lien_entree: string;
};

/** Hauteur de chaque tranche (px) sur ordinateur / mobile, du sommet à la base. */
const HAUTEURS: [number, number][] = [
  [120, 104],
  [64, 56],
  [48, 44],
  [64, 56],
  [64, 56],
  [64, 56],
];
const hauteur = (i: number): [number, number] => HAUTEURS[i] ?? [64, 56];

const ECART = 3;

/** Découpe trapézoïdale de chaque tranche, en %, sur un triangle parfait. */
function decoupes(hauteurs: number[]) {
  const total = hauteurs.reduce((a, b) => a + b, 0) + ECART * (hauteurs.length - 1);
  let y = 0;
  return hauteurs.map((h) => {
    const haut = y / total;
    const bas = (y + h) / total;
    y += h + ECART;
    const g = (f: number) => (50 - 50 * f).toFixed(2);
    const d = (f: number) => (50 + 50 * f).toFixed(2);
    return `polygon(${g(haut)}% 0, ${d(haut)}% 0, ${d(bas)}% 100%, ${g(bas)}% 100%)`;
  });
}

const dl = (ms: number) => ({ "--dl": `${ms}ms` }) as React.CSSProperties;

export function PyramideSigma({
  className,
  niveaux,
  textes,
}: {
  className?: string;
  niveaux: NiveauPyramide[];
  textes: TextesPyramide;
}) {
  const [actif, setActif] = useState(0);
  const NIVEAUX = niveaux;
  const n = NIVEAUX[Math.min(actif, NIVEAUX.length - 1)];
  const CLIP_ORDI = decoupes(NIVEAUX.map((_, i) => hauteur(i)[0]));
  const CLIP_MOBILE = decoupes(NIVEAUX.map((_, i) => hauteur(i)[1]));
  if (!n) return null;

  return (
    <figure aria-labelledby="pyr-titre" className={cn("m-0 flex flex-col gap-7", className)}>
      <figcaption className="m-fade flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between" style={dl(400)}>
        <span id="pyr-titre" className="font-titre text-[22px] text-white">
          {textes.titre}
        </span>
        <span className="font-ui text-[13.5px] text-nuit-300">
          {textes.consigne}
        </span>
      </figcaption>

      <div className="grid grid-cols-[minmax(0,1fr)] justify-center gap-3 sm:grid-cols-[96px_minmax(0,440px)_96px] md:grid-cols-[110px_440px_110px]">
        {/* Axe descendant */}
        <div aria-hidden="true" className="m-fade hidden flex-col items-end gap-2.5 text-right sm:flex" style={dl(1400)}>
          <span className="font-code text-[10.5px] leading-normal tracking-[0.1em] text-or-300 uppercase">
            {textes.axe_descendant}
          </span>
          <span className="font-ui text-xs text-nuit-300">{textes.axe_descendant_legende}</span>
          <span className="relative mr-1.5 w-px flex-1 bg-or-filet">
            <span className="point-flux flux-desc" />
          </span>
          <svg width="13" height="9" viewBox="0 0 13 9">
            <path d="M0 0h13L6.5 9z" fill="#D4AF37" />
          </svg>
        </div>

        {/* Tranches */}
        <div role="group" aria-label={textes.groupe_lecture} className="relative flex flex-col gap-[3px]">
          <span aria-hidden="true" className="halo top-[70px]" />
          {NIVEAUX.map((niv, i) => {
            const on = i === actif;
            return (
              <button
                key={i}
                type="button"
                aria-pressed={on}
                aria-controls="pyr-def"
                onClick={() => setActif(i)}
                onMouseEnter={() => setActif(i)}
                onFocus={() => setActif(i)}
                className="group m-slice relative block w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-or-500 [--h:var(--hm)] sm:[--h:var(--ho)]"
                style={
                  {
                    "--dl": `${(NIVEAUX.length - 1 - i) * 140 + 500}ms`,
                    "--ho": `${hauteur(i)[0]}px`,
                    "--hm": `${hauteur(i)[1]}px`,
                    height: "var(--h)",
                  } as React.CSSProperties
                }
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 transition-[background-color,filter] duration-[450ms] ease-[var(--ease-sortie)] group-hover:brightness-[1.18] [clip-path:var(--cm)] sm:[clip-path:var(--co)]",
                    on ? "bg-or-500" : i === 2 ? "bg-nuit-850" : "bg-nuit-900",
                  )}
                  style={{ "--co": CLIP_ORDI[i], "--cm": CLIP_MOBILE[i] } as React.CSSProperties}
                />
                <span
                  className={cn(
                    "relative flex h-full flex-col items-center gap-[3px] transition-transform duration-[450ms] ease-[var(--ease-sortie)]",
                    i === 0 ? "justify-end pb-3" : "justify-center",
                    on && "scale-[1.08]",
                  )}
                >
                  {niv.symbole && (
                    <span
                      className={cn(
                        "leading-none",
                        i === 0 ? "font-titre text-[34px]" : i === 1 ? "font-code text-[13px]" : "font-titre text-2xl",
                        on ? "text-nuit-950" : "text-or-300",
                      )}
                    >
                      {niv.symbole}
                    </span>
                  )}
                  <span
                    className={cn(
                      "text-center font-ui text-[10.5px] leading-tight tracking-[0.08em] whitespace-pre-line uppercase",
                      i === 0 && "sr-only",
                      on ? "text-nuit-950" : "text-nuit-200",
                    )}
                  >
                    {niv.libelle}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Axe ascendant */}
        <div aria-hidden="true" className="m-fade hidden flex-col items-start gap-2.5 sm:flex" style={dl(1400)}>
          <svg width="13" height="9" viewBox="0 0 13 9">
            <path d="M0 9h13L6.5 0z" fill="#D4AF37" />
          </svg>
          <span className="relative ml-1.5 w-px flex-1 bg-or-filet">
            <span className="point-flux flux-asc" />
          </span>
          <span className="font-code text-[10.5px] leading-normal tracking-[0.1em] text-or-300 uppercase">
            {textes.axe_ascendant}
          </span>
          <span className="font-ui text-xs text-nuit-300">{textes.axe_ascendant_legende}</span>
        </div>
      </div>

      {/* Définition du niveau actif */}
      <div id="pyr-def" aria-live="polite" className="relative min-h-[230px] pt-6">
        <span aria-hidden="true" className="m-draw absolute inset-x-0 top-0 h-px bg-or-500" style={dl(1600)} />
        <div key={actif} className="m-swap grid gap-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-7">
          <div className="flex flex-row items-baseline gap-4 sm:flex-col sm:gap-2.5">
            <span className="font-code text-[11.5px] tracking-[0.12em] text-or-500 uppercase">
              {textes.position
                .split("{n}").join(String(actif + 1))
                .split("{total}").join(String(NIVEAUX.length))}
            </span>
            <span aria-hidden="true" className="font-titre text-[44px] leading-none text-white">
              {n.symbole || textes.symbole_vide}
            </span>
            <span className="font-code text-sm text-or-300">{n.formule}</span>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-titre text-[26px] font-medium text-white">{n.nom}</h2>
            <p className="font-texte text-[17px] leading-[1.65] text-nuit-100">
              {n.definition.charAt(0).toUpperCase() + n.definition.slice(1)}
            </p>
            <Link href={n.source_lien} className="inline-flex min-h-11 items-center gap-1 self-start font-ui text-sm font-medium text-or-300 underline underline-offset-[3px]">
              {n.source_libelle} · {textes.lien_entree} <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </figure>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Suivi de lecture (client) : pourcentage lu du texte (#texte), barre de
 * position mobile « TOME I · 3 / 4 · Sommaire », copie de la référence.
 */

function abonner(rappel: () => void) {
  window.addEventListener("scroll", rappel, { passive: true });
  window.addEventListener("resize", rappel);
  return () => {
    window.removeEventListener("scroll", rappel);
    window.removeEventListener("resize", rappel);
  };
}

function progression() {
  const el = document.getElementById("texte");
  if (!el) return 0;
  const r = el.getBoundingClientRect();
  const parcours = r.height - window.innerHeight * 0.6;
  if (parcours <= 0) return 100;
  const p = ((window.innerHeight * 0.4 - r.top) / parcours) * 100;
  return Math.round(Math.min(100, Math.max(0, p)));
}

function useProgression() {
  return useSyncExternalStore(abonner, progression, () => 0);
}

/** « Vous lisez · 34 % » dans le rail des textes ; {p} = pourcentage. */
export function PourcentageLu({ libelle }: { libelle: string }) {
  const p = useProgression();
  return (
    <span className="flex items-center font-code text-[11.5px] text-or-700">
      <span className="vivant" aria-hidden="true" />
      {libelle.replace("{p}", String(p))}
    </span>
  );
}

export type TexteRecueil = { titre: string; href: string; meta: string };

/** Libellés de la barre mobile (Site › Lecture des tomes), {tome} déjà rempli. */
export type LibellesBarreLecture = {
  /** « Textes du Tome I » (lecteurs d’écran). */
  aria: string;
  /** « Sommaire » (bouton). */
  sommaire: string;
  /** « Sommaire du Tome I » (lien). */
  sommaireTome: string;
  /** « Progression de la lecture » (lecteurs d’écran). */
  progression: string;
};

/**
 * Barre mobile collée sous l'en-tête : position dans le tome, liste des
 * textes à la demande, progression de lecture.
 */
export function BarreLectureMobile({
  etiquette,
  index,
  textes,
  sommaire,
  libelles,
}: {
  etiquette: string;
  index: number;
  textes: TexteRecueil[];
  sommaire: string;
  libelles: LibellesBarreLecture;
}) {
  const [ouvert, setOuvert] = useState(false);
  const p = useProgression();

  useEffect(() => {
    if (!ouvert) return;
    const echap = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", echap);
    return () => document.removeEventListener("keydown", echap);
  }, [ouvert]);

  return (
    <div className="surface-sombre sticky top-16 z-40 bg-nuit-950 lg:hidden">
      <button
        type="button"
        aria-expanded={ouvert}
        aria-controls="textes-tome"
        onClick={() => setOuvert((v) => !v)}
        className="flex h-11 w-full items-center justify-center gap-2 border-t border-nuit-800 font-code text-xs tracking-[0.08em] text-nuit-100 uppercase"
      >
        {etiquette} · <span className="text-or-500">{index + 1}</span> / {textes.length} · {libelles.sommaire}
        {ouvert ? (
          <ChevronUp aria-hidden="true" className="size-4" strokeWidth={1.75} />
        ) : (
          <ChevronDown aria-hidden="true" className="size-4" strokeWidth={1.75} />
        )}
      </button>
      <div
        role="progressbar"
        aria-label={libelles.progression}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={p}
        className="h-[3px] bg-nuit-800"
      >
        <span className="block h-full bg-or-500 transition-[width] duration-150" style={{ width: `${p}%` }} />
      </div>
      {ouvert && (
        <nav id="textes-tome" aria-label={libelles.aria} className="m-panel border-t border-nuit-800 px-5 pb-5">
          <ol>
            {textes.map((t, i) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  aria-current={i === index ? "page" : undefined}
                  onClick={() => setOuvert(false)}
                  className={cn(
                    "grid min-h-12 grid-cols-[28px_1fr] items-center gap-2 border-b border-nuit-800 py-2 font-ui text-[15px] text-nuit-100",
                    i === index && "text-or-500",
                  )}
                >
                  <span className="font-code text-[11.5px] text-nuit-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex flex-col">
                    {t.titre}
                    <span className="font-code text-[11px] text-nuit-300">{t.meta}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <Link href={sommaire} className="mt-3 flex min-h-11 items-center font-ui text-sm font-medium text-or-300 underline underline-offset-[3px]">
            {libelles.sommaireTome}
          </Link>
        </nav>
      )}
    </div>
  );
}

/** Bouton « Copier la référence ». */
export function CopierReference({
  texte,
  copier,
  copiee,
}: {
  texte: string;
  /** « Copier la référence ». */
  copier: string;
  /** « Référence copiée ». */
  copiee: string;
}) {
  const [copie, setCopie] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(texte);
          setCopie(true);
          setTimeout(() => setCopie(false), 2500);
        } catch {
          setCopie(false);
        }
      }}
      className="btn min-h-10 self-start rounded-[2px] border border-encre bg-transparent px-3.5 font-ui text-[13.5px] font-semibold text-encre hover:bg-encre hover:text-papier active:scale-[.97]"
    >
      <span aria-live="polite">{copie ? copiee : copier}</span>
    </button>
  );
}

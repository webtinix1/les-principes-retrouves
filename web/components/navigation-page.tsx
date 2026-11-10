"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUp, List, X } from "lucide-react";
import { NAV_PAGES } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Repères des pages longues : sommaire « Sur cette page » (construit à partir
 * des intertitres H2 du contenu) et bouton de retour en haut.
 * Absent quand la page porte déjà son propre sommaire (pages de lecture).
 */

type Intertitre = { id: string; texte: string };

function slug(texte: string) {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/** Lit les H2 du contenu principal et leur attribue une ancre si besoin. */
function lireIntertitres(): Intertitre[] {
  const main = document.getElementById("contenu");
  if (!main || main.querySelector('nav[aria-label="Dans ce texte"]')) return [];
  const vus = new Set<string>();
  return [...main.querySelectorAll<HTMLHeadingElement>("h2")]
    .filter((h) => !h.closest("nav, [data-hors-sommaire]"))
    .map((h) => {
      const texte = (h.textContent ?? "").trim();
      if (!h.id) {
        let id = slug(texte) || "section";
        while (vus.has(id) || document.getElementById(id)) id += "-2";
        h.id = id;
      }
      vus.add(h.id);
      return { id: h.id, texte };
    });
}

export function ReperesPage() {
  const pathname = usePathname();
  const [intertitres, setIntertitres] = useState<Intertitre[]>([]);
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);

  // Fermeture du sommaire au changement de page.
  const [cheminPrecedent, setCheminPrecedent] = useState(pathname);
  if (cheminPrecedent !== pathname) {
    setCheminPrecedent(pathname);
    setOuvert(false);
  }

  useEffect(() => {
    // Hors du rendu (setTimeout plutôt que rAF, suspendu dans un onglet masqué).
    const minuteur = window.setTimeout(() => setIntertitres(lireIntertitres()), 0);
    return () => window.clearTimeout(minuteur);
  }, [pathname]);

  useEffect(() => {
    const surDefilement = () => setDefile(window.scrollY > 600);
    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, []);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  const avecSommaire = intertitres.length >= 3;
  // L'accueil relève du Fronton : aucun ajout.
  if (pathname === "/accueil" || (!avecSommaire && !defile)) return null;

  const bouton =
    "presse inline-flex h-11 items-center gap-2 rounded-xl border border-or/50 bg-bleu-nuit-profond px-4 font-ui text-sm text-blanc-casse transition-colors hover:border-or hover:text-or";

  return (
    <div className="surface-sombre fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      {ouvert && avecSommaire && (
        <nav
          id="sommaire-page"
          aria-label="Sur cette page"
          className="max-h-[60vh] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-or/40 bg-bleu-nuit-profond p-4"
        >
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-or">Sur cette page</p>
          <ol className="mt-3 space-y-1">
            {intertitres.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  onClick={() => setOuvert(false)}
                  className="block rounded px-2 py-2 font-sans text-sm leading-snug text-blanc-casse/85 hover:text-or"
                >
                  {t.texte}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex gap-2">
        {avecSommaire && (
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="sommaire-page"
            onClick={() => setOuvert((v) => !v)}
            className={bouton}
          >
            {ouvert ? (
              <X aria-hidden="true" className="size-4" />
            ) : (
              <List aria-hidden="true" className="size-4" />
            )}
            Sommaire
          </button>
        )}
        {defile && (
          <a href="#contenu" className={cn(bouton, "px-3")} aria-label="Revenir en haut de la page">
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Bloc de fin de page : page précédente / suivante dans l'ordre canonique du
 * menu. Rendu sur les pages du menu uniquement (hors accueil, qui relève du
 * Fronton, et hors sous-pages qui ont leur propre navigation).
 */
export function PageSuivante() {
  const pathname = usePathname();
  const i = NAV_PAGES.findIndex((p) => p.href === pathname);
  if (i <= 0) return null;
  const precedente = NAV_PAGES[i - 1];
  const suivante = NAV_PAGES[i + 1];

  const carte =
    "presse group flex flex-col gap-1 rounded-xl border border-bleu-nuit-profond/10 bg-blanc p-5 transition-colors hover:border-or";

  return (
    <nav
      aria-label="Poursuivre la lecture"
      data-hors-sommaire
      className="surface-claire border-t border-bleu-nuit-profond/10 bg-gris-clair px-6 py-12"
    >
      <div className="mx-auto grid w-full max-w-5xl gap-4 sm:grid-cols-2">
        <Link href={precedente.href} className={carte}>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-or">
            ← Page précédente
          </span>
          <span className="font-heading text-xl font-semibold text-bleu-nuit-profond group-hover:text-bleu-academique">
            {precedente.label}
          </span>
        </Link>
        {suivante && (
          <Link href={suivante.href} className={cn(carte, "sm:items-end sm:text-right")}>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-or">
              Page suivante →
            </span>
            <span className="font-heading text-xl font-semibold text-bleu-nuit-profond group-hover:text-bleu-academique">
              {suivante.label}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}

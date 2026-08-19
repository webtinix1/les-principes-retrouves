"use client";

import { useEffect } from "react";

/**
 * Révélation douce des blocs au défilement (mobile). Reprise fidèle du script
 * d'origine : amélioration progressive — sans JS, tout reste visible (les
 * styles `.js-motion` ne s'appliquent que lorsque cette classe est posée).
 *
 * Composant sans rendu : il opère sur le `.fronton-root` qui l'englobe.
 */
export function FrontonReveal() {
  useEffect(() => {
    const racine = document.querySelector<HTMLElement>(".fronton-root");
    if (!racine) return;
    racine.classList.add("js-motion");

    const blocs = racine.querySelectorAll<HTMLElement>(
      ".header, .dedicaces, .left-col, .left-text, .seuil, .footer",
    );

    if (!("IntersectionObserver" in window)) {
      blocs.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    blocs.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}

"use client";

import { useState } from "react";

/** Bouton « Copier la référence » des pages de lecture (/ouvrage/<tome>/<texte>). */
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
      className="btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(texte);
          setCopie(true);
          setTimeout(() => setCopie(false), 2500);
        } catch {
          setCopie(false);
        }
      }}
    >
      <span aria-live="polite">{copie ? copiee : copier}</span>
    </button>
  );
}

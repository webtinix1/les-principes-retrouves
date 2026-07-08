"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Pyramide de Σ — SVG animé (pulsation du sommet + double respiration).
 * Reprise du code SVG et des animations du DOCUMENT DE SYNTHÈSE FINAL.
 * Chaque niveau est survolable / focusable au clavier : sa définition
 * s'affiche dans la légende accessible sous la figure.
 */

type Niveau = { id: string; label: string; definition: string };

const NIVEAUX: Record<string, Niveau> = {
  sigma: {
    id: "sigma",
    label: "Σ — Substratum Commun",
    definition:
      "Σ — Substratum Commun : l'Unité Structurelle Absolue, antérieure à toute manifestation et à toute connaissance.",
  },
  polarites: {
    id: "polarites",
    label: "π₁ ↔ π₂ — Polarités",
    definition:
      "π₁ ↔ π₂ — Polarités complémentaires : distinction (π₁) et relation (π₂), en tension simultanée.",
  },
  charniere: {
    id: "charniere",
    label: "Charnière Ontologique",
    definition:
      "Charnière Ontologique : seuil critique de conversion du principiel en phénoménal.",
  },
  voile: {
    id: "voile",
    label: "[V] — Voile Ontologique",
    definition:
      "[V] Voile Ontologique : condition universelle et nécessaire de toute manifestation.",
  },
  filtrage: {
    id: "filtrage",
    label: "[F] — Filtrage Sélectif",
    definition:
      "[F] Filtrage Sélectif : tri institutionnel qui sédimente le savoir ordinaire.",
  },
  monde: {
    id: "monde",
    label: "Monde Observable (S)",
    definition:
      "Monde Observable (S) : fragmentation phénoménale, base de la remontée épistémologique.",
  },
};

export function PyramideSigma({ className }: { className?: string }) {
  const [actif, setActif] = useState<Niveau | null>(null);

  const survol = (n: Niveau) => ({
    tabIndex: 0,
    role: "button",
    "aria-label": n.label,
    className: "cursor-help outline-none [&:focus-visible_rect]:stroke-blanc [&:focus-visible_polygon]:stroke-blanc",
    onMouseEnter: () => setActif(n),
    onFocus: () => setActif(n),
    onMouseLeave: () => setActif((c) => (c?.id === n.id ? null : c)),
    onBlur: () => setActif((c) => (c?.id === n.id ? null : c)),
  });

  return (
    <figure className={cn("flex flex-col items-center gap-4", className)}>
      <svg
        viewBox="0 0 400 500"
        className="h-auto w-full max-w-[320px]"
        role="img"
        aria-label="Pyramide de Σ : de l'Unité Structurelle (sommet) au Monde Observable (base), traversée par la double respiration ontologique et épistémologique."
      >
        {/* Double flèche verticale — descendante (ontologique) et ascendante (épistémologique) */}
        <line
          x1="200" y1="60" x2="200" y2="440"
          stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="8,4" opacity="0.35"
          className="flow-ontologique"
        />
        <line
          x1="200" y1="440" x2="200" y2="60"
          stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="8,4" opacity="0.45"
          className="flow-epistemologique"
        />
        <polygon points="200,60 195,70 205,70" fill="#D4AF37" opacity="0.9" />
        <polygon points="200,440 195,430 205,430" fill="#D4AF37" opacity="0.6" />

        {/* Sommet : Σ (Substratum Commun) */}
        <g {...survol(NIVEAUX.sigma)}>
          <polygon points="200,40 160,100 240,100" fill="#D4AF37" opacity="0.9" className="pyramid-sigma" />
          <text x="200" y="80" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-fira)" fontSize="24" fontWeight="bold">Σ</text>
        </g>

        {/* Polarités π₁ ↔ π₂ */}
        <g {...survol(NIVEAUX.polarites)}>
          <rect x="120" y="110" width="160" height="40" rx="4" fill="#D4AF37" opacity="0.7" />
          <text x="160" y="135" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-fira)" fontSize="18" fontWeight="bold">π₁</text>
          <line x1="175" y1="130" x2="225" y2="130" stroke="#1E3A8A" strokeWidth="2" />
          <polygon points="175,130 180,127 180,133" fill="#1E3A8A" />
          <polygon points="225,130 220,127 220,133" fill="#1E3A8A" />
          <text x="240" y="135" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-fira)" fontSize="18" fontWeight="bold">π₂</text>
        </g>

        {/* Charnière Ontologique */}
        <g {...survol(NIVEAUX.charniere)}>
          <rect x="100" y="160" width="200" height="35" rx="4" fill="#D4AF37" opacity="0.6" />
          <text x="200" y="182" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="12" fontWeight="600">CHARNIÈRE ONTOLOGIQUE</text>
        </g>

        {/* Manifestation (transition, non interactive) */}
        <rect x="80" y="205" width="240" height="35" rx="4" fill="#D4AF37" opacity="0.5" />
        <text x="200" y="227" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="12">MANIFESTATION</text>

        {/* Voile [V] */}
        <g {...survol(NIVEAUX.voile)}>
          <rect x="60" y="250" width="280" height="35" rx="4" fill="#D4AF37" opacity="0.4" />
          <text x="200" y="272" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-fira)" fontSize="16" fontWeight="bold">[V]</text>
          <text x="200" y="285" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="9">Voile Ontologique</text>
        </g>

        {/* Filtrage [F] */}
        <g {...survol(NIVEAUX.filtrage)}>
          <rect x="40" y="295" width="320" height="35" rx="4" fill="#D4AF37" opacity="0.35" />
          <text x="200" y="317" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-fira)" fontSize="16" fontWeight="bold">[F]</text>
          <text x="200" y="330" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="9">Filtrage Sélectif</text>
        </g>

        {/* Monde Observable (S) */}
        <g {...survol(NIVEAUX.monde)}>
          <rect x="20" y="340" width="360" height="50" rx="4" fill="#D4AF37" opacity="0.3" />
          <text x="200" y="365" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="14" fontWeight="600">MONDE OBSERVABLE (S)</text>
          <text x="200" y="380" textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="10">Fragmentation phénoménale</text>
        </g>

        {/* Sens de la double respiration : discrètes, aux extrémités de l'axe */}
        <text x="200" y="30" textAnchor="middle" fill="#D4AF37" fontFamily="var(--font-inter)" fontSize="9" opacity="0.7">↑ épistémologique</text>
        <text x="200" y="470" textAnchor="middle" fill="#D4AF37" fontFamily="var(--font-inter)" fontSize="9" opacity="0.7">↓ ontologique</text>
      </svg>

      {/* Légende accessible : définition du niveau survolé / focalisé */}
      <figcaption
        aria-live="polite"
        className="min-h-[3rem] max-w-md text-center font-ui text-sm text-blanc-casse/80"
      >
        {actif ? actif.definition : "Survolez ou parcourez au clavier chaque niveau de la Pyramide pour en révéler la définition."}
      </figcaption>
    </figure>
  );
}

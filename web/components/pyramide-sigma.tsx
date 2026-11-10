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

/**
 * Géométrie : un vrai triangle à bords droits, découpé en tranches empilées.
 * Chaque tranche suit exactement les deux côtés de la pyramide (pas de
 * marches) ; un interstice de 3 unités les sépare visuellement.
 */
const CX = 300;
const SOMMET = 40;
const BASE = 510;
const DEMI_BASE = 290;
/** Limites verticales des 7 tranches (Σ, π, charnière, manifestation, V, F, S). */
const LIMITES = [SOMMET, 125, 185, 250, 310, 375, 440, BASE];
const INTERSTICE = 1.5;

const demiLargeur = (y: number) => (DEMI_BASE * (y - SOMMET)) / (BASE - SOMMET);

/** Points du polygone de la tranche i (triangle pour le sommet, trapèze ensuite). */
function tranche(i: number) {
  const haut = i === 0 ? SOMMET : LIMITES[i] + INTERSTICE;
  const bas = LIMITES[i + 1] - INTERSTICE;
  const h = demiLargeur(haut);
  const b = demiLargeur(bas);
  return i === 0
    ? `${CX},${haut} ${CX + b},${bas} ${CX - b},${bas}`
    : `${CX - h},${haut} ${CX + h},${haut} ${CX + b},${bas} ${CX - b},${bas}`;
}

const milieu = (i: number) => (LIMITES[i] + LIMITES[i + 1]) / 2;

export function PyramideSigma({ className }: { className?: string }) {
  const [actif, setActif] = useState<Niveau | null>(null);

  // Survol (souris) + focus (clavier) + clic/tap (tactile) : au doigt, ni survol
  // ni focus n'existent, d'où le onClick qui bascule le niveau actif.
  const interactif = (n: Niveau) => ({
    tabIndex: 0,
    role: "button",
    "aria-label": n.label,
    "aria-pressed": actif?.id === n.id,
    className: "cursor-pointer outline-none [&:focus-visible_polygon]:stroke-blanc [&:focus-visible_polygon]:stroke-2",
    onMouseEnter: () => setActif(n),
    onFocus: () => setActif(n),
    onMouseLeave: () => setActif((c) => (c?.id === n.id ? null : c)),
    onBlur: () => setActif((c) => (c?.id === n.id ? null : c)),
    onClick: () => setActif((c) => (c?.id === n.id ? null : n)),
  });

  return (
    <figure className={cn("flex flex-col items-center gap-4", className)}>
      <svg
        viewBox="0 0 600 570"
        className="h-auto w-full max-w-[600px]"
        role="img"
        aria-label="Pyramide de Σ : de l'Unité Structurelle (sommet) au Monde Observable (base), traversée par la double respiration ontologique et épistémologique."
      >
        {/* Double flèche verticale — descendante (ontologique) et ascendante (épistémologique) */}
        <line
          x1={CX} y1={SOMMET + 12} x2={CX} y2={BASE + 22}
          stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="8,4" opacity="0.45"
          className="flow-epistemologique"
        />
        <polygon points={`${CX},${BASE + 30} ${CX - 5},${BASE + 20} ${CX + 5},${BASE + 20}`} fill="#D4AF37" opacity="0.7" />

        {/* Sommet : Σ (Substratum Commun) */}
        <g {...interactif(NIVEAUX.sigma)}>
          <polygon points={tranche(0)} fill="#D4AF37" className="pyramid-sigma" />
          <text x={CX} y={milieu(0) + 24} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-fira)" fontSize="34" fontWeight="bold">Σ</text>
        </g>

        {/* Polarités π₁ ↔ π₂ */}
        <g {...interactif(NIVEAUX.polarites)}>
          <polygon points={tranche(1)} fill="#D4AF37" opacity="0.92" />
          <text x={CX - 42} y={milieu(1) + 8} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-fira)" fontSize="22" fontWeight="bold">π₁</text>
          <line x1={CX - 24} y1={milieu(1)} x2={CX + 24} y2={milieu(1)} stroke="#1E3A8A" strokeWidth="2" />
          <polygon points={`${CX - 24},${milieu(1)} ${CX - 18},${milieu(1) - 4} ${CX - 18},${milieu(1) + 4}`} fill="#1E3A8A" />
          <polygon points={`${CX + 24},${milieu(1)} ${CX + 18},${milieu(1) - 4} ${CX + 18},${milieu(1) + 4}`} fill="#1E3A8A" />
          <text x={CX + 42} y={milieu(1) + 8} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-fira)" fontSize="22" fontWeight="bold">π₂</text>
        </g>

        {/* Charnière Ontologique */}
        <g {...interactif(NIVEAUX.charniere)}>
          <polygon points={tranche(2)} fill="#D4AF37" opacity="0.86" />
          <text x={CX} y={milieu(2) + 6} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="14" fontWeight="700">CHARNIÈRE ONTOLOGIQUE</text>
        </g>

        {/* Manifestation (transition, non interactive) */}
        <polygon points={tranche(3)} fill="#D4AF37" opacity="0.8" />
        <text x={CX} y={milieu(3) + 6} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="17" fontWeight="600">MANIFESTATION</text>

        {/* Voile [V] */}
        <g {...interactif(NIVEAUX.voile)}>
          <polygon points={tranche(4)} fill="#D4AF37" opacity="0.75" />
          <text x={CX} y={milieu(4) - 2} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-fira)" fontSize="20" fontWeight="bold">[V]</text>
          <text x={CX} y={milieu(4) + 18} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="15" fontWeight="500">Voile Ontologique</text>
        </g>

        {/* Filtrage [F] */}
        <g {...interactif(NIVEAUX.filtrage)}>
          <polygon points={tranche(5)} fill="#D4AF37" opacity="0.7" />
          <text x={CX} y={milieu(5) - 2} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-fira)" fontSize="20" fontWeight="bold">[F]</text>
          <text x={CX} y={milieu(5) + 18} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="15" fontWeight="500">Filtrage Sélectif</text>
        </g>

        {/* Monde Observable (S) */}
        <g {...interactif(NIVEAUX.monde)}>
          <polygon points={tranche(6)} fill="#D4AF37" opacity="0.65" />
          <text x={CX} y={milieu(6) - 2} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="20" fontWeight="700">MONDE OBSERVABLE (S)</text>
          <text x={CX} y={milieu(6) + 20} textAnchor="middle" fill="#1E3A8A" fontFamily="var(--font-inter)" fontSize="16" fontWeight="500">Fragmentation phénoménale</text>
        </g>

        {/* Sens de la double respiration : discrètes, aux extrémités de l'axe */}
        <text x={CX} y={SOMMET - 14} textAnchor="middle" fill="#D4AF37" fontFamily="var(--font-inter)" fontSize="12" opacity="0.8">↑ épistémologique</text>
        <text x={CX} y={BASE + 50} textAnchor="middle" fill="#D4AF37" fontFamily="var(--font-inter)" fontSize="12" opacity="0.8">↓ ontologique</text>
      </svg>

      {/* Légende accessible : définition du niveau survolé / focalisé */}
      <figcaption
        aria-live="polite"
        className="min-h-[3rem] max-w-md text-center font-ui text-sm text-blanc-casse/80"
      >
        {actif ? actif.definition : "Touchez, survolez ou parcourez au clavier chaque niveau de la Pyramide pour en révéler la définition."}
      </figcaption>
    </figure>
  );
}

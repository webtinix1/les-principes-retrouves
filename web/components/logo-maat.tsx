import { cn } from "@/lib/utils";

/**
 * Logo « Plume de Maât » — plume dorée centrale = Σ (Unité Structurelle),
 * aile gauche = π₁ (distinction), aile droite = π₂ (relation).
 * L'animation de déploiement au survol est portée par `.site-logo` (globals.css).
 */
export function LogoMaat({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={cn("site-logo__mark", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g
        className="maat-wing"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="4.5"
        strokeLinecap="round"
      >
        <path d="M92 56 C 66 44, 42 46, 18 54" />
        <path d="M92 64 C 64 56, 40 60, 14 72" />
        <path d="M92 72 C 66 68, 44 76, 22 90" />
        <path d="M92 80 C 70 80, 52 88, 34 102" />
        <path d="M108 56 C 134 44, 158 46, 182 54" />
        <path d="M108 64 C 136 56, 160 60, 186 72" />
        <path d="M108 72 C 134 68, 156 76, 178 90" />
        <path d="M108 80 C 130 80, 148 88, 166 102" />
      </g>
      <g>
        <path
          d="M100 14 C 110 44, 110 100, 100 130 C 90 100, 90 44, 100 14 Z"
          fill="#D4AF37"
        />
        <line x1="100" y1="24" x2="100" y2="122" stroke="#1a252f" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

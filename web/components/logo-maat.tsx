import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo « Plume de Maât » — plume dorée aux ailes déployées (Σ / π₁ / π₂).
 * Fichier fourni : public/logo/plume-ailes-transparent.png (560×270, transparent).
 * L'animation de déploiement au survol est portée par `.site-logo` (globals.css).
 */
export function LogoMaat({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/plume-ailes-transparent.png"
      alt=""
      width={560}
      height={270}
      priority
      unoptimized
      className={cn("site-logo__mark w-auto", className)}
    />
  );
}

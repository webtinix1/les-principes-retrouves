"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/contenu", label: "Contenu" },
  { href: "/admin/commandes", label: "Commandes" },
  { href: "/admin/codes", label: "Codes d'accès" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/ressources", label: "Ressources" },
];

/** Détermine la section active (le tableau de bord n'est actif que sur `/admin` exact). */
function estActif(href: string, pathname: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-x-4 gap-y-1 font-ui text-sm">
      {NAV.map((n) => {
        const actif = estActif(n.href, pathname);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={actif ? "page" : undefined}
            className={cn(
              "border-b-2 border-transparent pb-0.5 transition-colors",
              actif
                ? "border-or font-semibold text-or"
                : "text-blanc-casse/80 hover:text-or",
            )}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

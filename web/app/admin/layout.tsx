import Link from "next/link";
import { LogoMaat } from "@/components/logo-maat";

export const metadata = {
  title: "Back-office",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/contenu", label: "Contenu" },
  { href: "/admin/commandes", label: "Commandes" },
  { href: "/admin/codes", label: "Codes d'accès" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/ressources", label: "Ressources" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gris-clair text-bleu-nuit-profond">
      <header className="bg-gradient-to-r from-bleu-nuit-profond to-bleu-academique text-blanc-casse">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3">
          <Link href="/admin" className="flex items-center gap-2">
            <LogoMaat className="h-8 w-auto" />
            <span className="font-heading text-sm font-semibold text-blanc">
              Back-office
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 font-ui text-sm">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-blanc-casse/80 hover:text-or">
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/accueil" className="ml-auto font-ui text-xs text-blanc-casse/60 hover:text-or">
            ↗ Voir le site
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}

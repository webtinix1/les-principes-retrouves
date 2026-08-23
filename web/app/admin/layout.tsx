import Link from "next/link";
import { LogoMaat } from "@/components/logo-maat";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Back-office",
  robots: { index: false, follow: false },
};

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
          <AdminNav />
          <Link href="/accueil" className="ml-auto font-ui text-xs text-blanc-casse/60 hover:text-or">
            ↗ Voir le site
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}

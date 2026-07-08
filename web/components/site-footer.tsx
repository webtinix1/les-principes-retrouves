import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/navigation";

/** Pied de page (Server Component). Fond Bleu Nuit profond réservé au footer. */
export function SiteFooter() {
  return (
    <footer className="mt-auto bg-bleu-nuit-profond text-blanc-casse/80">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="font-ui text-sm leading-relaxed">
            © 2026 Gaudéric MAMBOU — Recherche indépendante.
            <br />
            Institut de Brazzaville, République du Congo.
          </p>
          <ul className="flex flex-col gap-2 font-ui text-sm md:items-end">
            {FOOTER_LINKS.map((l) => (
              <li key={l.page_id}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-or focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 border-t border-blanc-casse/10 pt-6 font-ui text-xs leading-relaxed text-blanc-casse/50">
          Les contenus théoriques sont diffusés à titre de référence académique.
          Toute citation doit respecter les normes universitaires en vigueur.
        </p>
      </div>
    </footer>
  );
}

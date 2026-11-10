import Link from "next/link";
import { FOOTER_LINKS, NAV_ENTREES, type NavPage } from "@/lib/navigation";

const LIEN =
  "inline-flex min-h-8 items-center transition-colors hover:text-or focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or";

/** Colonnes du plan du site : chaque famille du menu, puis les liens directs. */
const COLONNES: { titre: string; pages: NavPage[] }[] = [
  ...NAV_ENTREES.flatMap((e) => (e.type === "groupe" ? [{ titre: e.label, pages: e.pages }] : [])),
  {
    titre: "Parcours",
    pages: NAV_ENTREES.flatMap((e) => (e.type === "lien" ? [e.page] : [])),
  },
];

/** Pied de page (Server Component). Fond Bleu Nuit profond réservé au footer. */
export function SiteFooter() {
  return (
    <footer className="surface-sombre mt-auto bg-bleu-nuit-profond text-blanc-casse/80">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="font-ui text-sm leading-relaxed">
            <p className="font-heading text-base font-semibold text-blanc">
              Les Principes Retrouvés
            </p>
            <p className="mt-2">
              © 2026 Gaudéric MAMBOU — Recherche indépendante.
              <br />
              Institut de Brazzaville, République du Congo.
            </p>
            <p className="mt-4">
              <a href="mailto:contact@lesprincipesretrouves.cg" className={LIEN}>
                contact@lesprincipesretrouves.cg
              </a>
            </p>
          </div>
          {COLONNES.map((col) => (
            <nav key={col.titre} aria-label={col.titre}>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-or">{col.titre}</p>
              <ul className="mt-3 space-y-1 font-ui text-sm">
                {col.pages.map((p) => (
                  <li key={p.page_id}>
                    <Link href={p.href} className={LIEN}>
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-blanc-casse/10 pt-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[60ch] font-ui text-xs leading-relaxed text-blanc-casse/70">
            Les contenus théoriques sont diffusés à titre de référence académique.
            Toute citation doit respecter les normes universitaires en vigueur.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-ui text-sm">
            {FOOTER_LINKS.map((l) => (
              <li key={l.page_id + l.label}>
                <Link href={l.href} className={LIEN}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

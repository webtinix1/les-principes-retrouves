import Link from "next/link";
import { LogoMaat } from "@/components/logo-maat";
import { numero2 } from "@/lib/navigation";
import { getNavigation } from "@/lib/navigation-textes";

const LIEN =
  "flex min-h-8 items-center gap-2.5 font-ui text-[14.5px] text-nuit-100 transition-colors hover:text-or-300 hover:underline";

/**
 * Pied de page (Server Component) : marque, plan du site par famille, liens légaux.
 * Textes : back-office, global « Site — Navigation et pied de page ».
 */
export async function SiteFooter() {
  const { familles, footer, textes: t } = await getNavigation();
  const legaux = footer.filter((l) => l.href !== "/transmission#contact");
  return (
    <footer className="surface-sombre mt-auto border-t border-nuit-800 bg-nuit-pied text-nuit-100">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-12 px-5 pt-14 pb-10 lg:gap-14 lg:px-6 lg:pt-[72px] xl:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[4fr_2fr_2fr_2fr_2fr] lg:gap-8">
          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
            <LogoMaat className="h-[31px] self-start" />
            <p className="font-titre text-xl text-white">{t["marque.nom"]}</p>
            <p className="font-ui text-sm leading-relaxed text-nuit-300">
              {t["pied.adresse"]}
              <br />
              <a href={`mailto:${t["pied.email"]}`} className="hover:text-or-300 hover:underline">
                {t["pied.email"]}
              </a>
            </p>
          </div>
          {familles.map((f) => (
            <nav key={f.id} aria-label={f.titre} className="flex flex-col gap-1.5">
              <p className="pb-2 font-code text-[11.5px] uppercase tracking-[0.14em] text-or-500">
                {f.id === "Le Seuil" ? t["pied.colonne_seuil"] : f.titre}
              </p>
              {f.id === "Le Seuil" && (
                <Link href="/" className={LIEN}>
                  {t["pied.fronton"]}
                </Link>
              )}
              {f.pages.map((p) => (
                <Link key={p.page_id} href={p.href} className={LIEN}>
                  <span className="font-code text-[11px] text-nuit-num">{numero2(p.numero)}</span>
                  {p.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-6 border-t border-nuit-800 pt-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <p className="max-w-[560px] font-ui text-[13px] leading-relaxed text-nuit-300">
            {t["pied.mentions"]}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {legaux.map((l) => (
              <li key={l.page_id}>
                <Link href={l.href} className={`${LIEN} text-[13.5px]`}>
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

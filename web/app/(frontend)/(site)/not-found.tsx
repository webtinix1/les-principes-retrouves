import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getTextes } from "@/lib/contenu";
import { numero2 } from "@/lib/navigation";
import { getNavigation } from "@/lib/navigation-textes";

/**
 * Page 404, dans le gabarit du site : sur papier, avec le plan des dix pages.
 * Textes : back-office, global « Site — Interface » (section « Page introuvable »).
 */
export default async function PageIntrouvable() {
  const textes = await getTextes("site_interface");
  const t = (cle: string) => textes[`erreur404.${cle}`];
  const { pages } = await getNavigation();
  return (
    <section className="surface-claire bg-papier px-5 pt-14 pb-20 md:pt-24 md:pb-28 lg:px-6 xl:px-10">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col gap-5 lg:col-span-6">
          <span className="font-code text-xs tracking-[0.14em] text-or-700 uppercase">{t("surtitre")}</span>
          <h1 className="font-titre text-[2.25rem] leading-[1.08] font-medium text-encre md:text-[3.75rem]">
            {t("titre")}
          </h1>
          <p className="max-w-[560px] font-texte text-lg leading-[1.7] text-encre-2">
            {t("texte")}
          </p>
          <div className="mt-2 flex flex-wrap gap-3.5">
            <Link href="/accueil" className={buttonVariants({ variant: "or-plein", size: "cta" })}>
              {t("accueil")}
            </Link>
            <Link href="/ouvrage" className={buttonVariants({ variant: "or", size: "cta" })}>
              {t("tomes")}
            </Link>
          </div>
        </div>
        <nav aria-label={t("plan")} className="lg:col-span-4 lg:col-start-9">
          <span className="font-code text-[11.5px] text-encre-3">{t("plan")}</span>
          <ol className="mt-2.5 border-b border-filet-doux">
            {pages.map((p) => (
              <li key={p.page_id}>
                <Link
                  href={p.href}
                  className="glisse grid min-h-11 grid-cols-[28px_1fr] items-center border-t border-filet-doux font-ui text-[14.5px] text-encre-2 hover:text-encre hover:underline"
                >
                  <span className="font-code text-[11.5px] text-encre-3">{numero2(p.numero)}</span>
                  {p.titre}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

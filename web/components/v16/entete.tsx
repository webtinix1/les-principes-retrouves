import Link from "next/link";
import { getNavigation } from "@/lib/navigation-textes";
import { NavigationV16 } from "@/components/v16/navigation";

/** En-tête du prototype V16 : filet doré, marque en losange, navigation. */
export async function EnteteV16() {
  const { pages, textes: t } = await getNavigation();
  return (
    <>
      <div className="topline" />
      <header>
        <div className="header-inner">
          <Link className="brand" href="/" aria-label={t["marque.logo_aria"]}>
            <div className="brand-mark" aria-hidden="true">
              <span>{t["v16.marque_symbole"]}</span>
            </div>
            <div>
              <div className="brand-name">{t["v16.marque_nom"]}</div>
              <div className="brand-sub">{t["v16.marque_devise"]}</div>
            </div>
          </Link>
          <NavigationV16
            pages={pages.flatMap((p) => {
              const lien = { page_id: p.page_id, label: p.label, href: p.href };
              // La librairie suit « Ouvrages » au menu, hors de l'ordre de lecture des pages.
              return p.page_id === "ouvrage"
                ? [lien, { page_id: "librairie", label: t["menu.librairie"] || "Librairie", href: "/librairie" }]
                : [lien];
            })}
            menu={t["v16.menu"]}
            aria={t["entete.nav_aria"]}
          />
        </div>
      </header>
    </>
  );
}

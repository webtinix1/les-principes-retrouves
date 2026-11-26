import Link from "next/link";
import { getTextes } from "@/lib/contenu";
import { numero2 } from "@/lib/navigation";
import { getNavigation } from "@/lib/navigation-textes";
import "./pages-annexes.css";

/**
 * Page 404 dans l'allure du prototype maître V16 : bandeau `.page-head`, puis
 * les deux accès principaux et le plan du site en carte.
 * Textes : back-office, global « Site — Interface » (section « Page introuvable »).
 */
export default async function PageIntrouvable() {
  const textes = await getTextes("site_interface");
  const t = (cle: string) => textes[`erreur404.${cle}`];
  const { pages } = await getNavigation();
  return (
    <section className="page fade annexe-v16">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t("surtitre")}</div>
          <h1>{t("titre")}</h1>
          <p>{t("texte")}</p>
        </div>
      </div>
      <div className="content">
        <div className="wrap annexe-colonnes">
          <div>
            <div className="annexe-actions">
              <Link href="/accueil" className="btn">
                {t("accueil")}
              </Link>
              <Link href="/ouvrage" className="btn secondary">
                {t("tomes")}
              </Link>
            </div>
          </div>
          <nav aria-label={t("plan")} className="card annexe-plan">
            <div className="tag">{t("plan")}</div>
            <ol>
              {pages.map((p) => (
                <li key={p.page_id}>
                  <Link href={p.href}>
                    <span className="num">{numero2(p.numero)}</span>
                    {p.titre}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

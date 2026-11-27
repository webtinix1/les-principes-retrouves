import Link from "next/link";
import { getTextes, remplir } from "@/lib/contenu";
import { getOuvrage } from "@/lib/librairie/donnees";
import { pageMetadata } from "@/lib/seo";
import "./librairie.css";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("librairie");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/librairie" });
}

/** La librairie : accès aux fiches des deux ouvrages. */
export default async function LibrairiePage() {
  const [t, o, tomes] = await Promise.all([
    getTextes("librairie"),
    getTextes("ouvrage"),
    Promise.all((["tome-i", "tome-ii"] as const).map((x) => getOuvrage(x))),
  ]);
  const description: Record<string, string> = { "tome-i": o["tome_i.description"], "tome-ii": o["tome_ii.description"] };

  return (
    <section className="page fade" id="page-librairie">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["index.surtitre"]}</div>
          <h1>{t["index.titre"]}</h1>
          <p>{t["index.texte"]}</p>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <div className="lib-index">
            {tomes.map(
              (ouvrage) =>
                ouvrage && (
                  <article key={ouvrage.tome} className="card book-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={o[ouvrage.tome === "tome-i" ? "tome_i.couverture_alt" : "tome_ii.couverture_alt"]}
                      className="book-cover"
                      src={ouvrage.couverture.url}
                      width={ouvrage.couverture.largeur}
                      height={ouvrage.couverture.hauteur}
                    />
                    <div className="tag">{ouvrage.etiquette}</div>
                    <h2 className="titre-h3">{ouvrage.titre_complet}</h2>
                    <p>{description[ouvrage.tome]}</p>
                    <p>
                      <Link href={`/librairie/${ouvrage.tome}`}>
                        {remplir(t["index.voir_fiche"], { tome: ouvrage.etiquette })}
                      </Link>
                    </p>
                  </article>
                ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { GrilleCartes, type CarteV16 } from "@/components/carte-concept";
import { getListe, getTextes } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";
import "./concepts.css";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("concepts");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/concepts" });
}

/**
 * Concepts et vocabulaire de recherche — conforme au prototype maître V16.
 * Chaque concept porte une ancre stable (`/concepts#maat`).
 */
export default async function ConceptsPage() {
  const [t, plans, socle, mesure, juridique, operateurs] = await Promise.all([
    getTextes("concepts"),
    getListe<CarteV16>("concepts.v16_plans"),
    getListe<CarteV16>("concepts.v16_socle"),
    getListe<CarteV16>("concepts.v16_mesure"),
    getListe<CarteV16>("concepts.v16_juridique"),
    getListe<{ terme: string; texte: string }>("concepts.v16_operateurs"),
  ]);

  return (
    <section className="page fade" id="page-concepts">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["v16_tete.surtitre"]}</div>
          <h1>{t["v16_tete.titre"]}</h1>
          <p>{t["v16_tete.intro"]}</p>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <p className="lead">{t["v16_ouverture.chapeau"]}</p>

          <h3>{t["v16_plans.titre"]}</h3>
          <GrilleCartes cartes={plans} />

          <h3>{t["v16_socle.titre"]}</h3>
          <GrilleCartes cartes={socle} />

          <h3>{t["v16_genese.titre"]}</h3>
          <div className="excerpt" id="crgi">
            <div className="tag">{t["v16_genese.surtitre"]}</div>
            <div className="equation">{t["v16_genese.sequence"]}</div>
            <p>{t["v16_genese.texte"]}</p>
          </div>

          <h3>{t["v16_mesure.titre"]}</h3>
          <GrilleCartes cartes={mesure} />

          <h3>{t["v16_cascade.titre"]}</h3>
          <article className="card" id="cascade_entropique">
            <h3>{t["v16_cascade.carte_titre"]}</h3>
            <p>{t["v16_cascade.carte_p1"]}</p>
            <p>{t["v16_cascade.carte_p2"]}</p>
          </article>
          <h3>{t["v16_juridique.titre"]}</h3>
          <GrilleCartes cartes={juridique} />

          <h3 id="science_metamoderne">{t["v16_metamoderne.titre"]}</h3>
          <p>{t["v16_metamoderne.texte"]}</p>
          <p className="note">{t["v16_metamoderne.note"]}</p>

          <h3 id="ellipse_methodologique">{t["v16_ellipse.titre"]}</h3>
          <p>{t["v16_ellipse.texte"]}</p>

          <h3>{t["v16_diagnostic.titre"]}</h3>
          <p>{t["v16_diagnostic.p1"]}</p>
          <p>{t["v16_diagnostic.p2"]}</p>

          <h3>{t["v16_declin.titre"]}</h3>
          <p>{t["v16_declin.texte"]}</p>

          <h3>{t["v16_operateurs.titre"]}</h3>
          {operateurs.map((o, i) => (
            <p key={i}>
              <strong>{o.terme}</strong> : {o.texte}
            </p>
          ))}
          <p>{t["v16_operateurs.conclusion"]}</p>
          <h3>{t["v16_cascade_juridique.titre"]}</h3>
          <div className="equation">{t["v16_cascade_juridique.sequence"]}</div>
          <p>{t["v16_cascade_juridique.texte"]}</p>
          <h3 id="proactivite_guide">{t["v16_proactivite.titre"]}</h3>
          <div className="equation">{t["v16_proactivite.sequence"]}</div>
          <p>{t["v16_proactivite.texte"]}</p>
        </div>
      </div>
      <div className="major-section">
        <h2>{t["v16_canon.titre"]}</h2>
        <p>{t["v16_canon.p1"]}</p>
        <p>{t["v16_canon.p2"]}</p>
      </div>
      <div className="major-section">
        <h2>{t["v16_livre.titre"]}</h2>
        <p>{t["v16_livre.p1"]}</p>
        <p>{t["v16_livre.p2"]}</p>
      </div>
    </section>
  );
}

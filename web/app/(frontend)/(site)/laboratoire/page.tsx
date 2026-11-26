import { GrilleCartes, type CarteV16 } from "@/components/carte-concept";
import { getListe, getTextes } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("laboratoire");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/laboratoire" });
}

/** Le Laboratoire — conforme au prototype maître V16. */
export default async function LaboratoirePage() {
  const [t, requetes, fondements, notions, operateurs] = await Promise.all([
    getTextes("laboratoire"),
    getListe<CarteV16>("laboratoire.v16_requetes"),
    getListe<CarteV16>("laboratoire.v16_fondements"),
    getListe<{ terme: string; texte: string }>("laboratoire.v16_notions"),
    getListe<CarteV16>("laboratoire.v16_operateurs"),
  ]);

  return (
    <section className="page fade" id="page-laboratoire">
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

          <h2 className="titre-h3">{t["v16_s1.titre"]}</h2>
          <p>{t["v16_s1.texte"]}</p>
          <GrilleCartes cartes={requetes} />
          <div className="band">
            <strong>{t["v16_s1.constat_intitule"]}</strong> {t["v16_s1.constat_texte"]}
          </div>

          <h2 className="titre-h3">{t["v16_s2.titre"]}</h2>
          <p>{t["v16_s2.p1"]}</p>
          <p>{t["v16_s2.p2"]}</p>

          <h2 className="titre-h3">{t["v16_s3.titre"]}</h2>
          <p>{t["v16_s3.p1"]}</p>
          <p>{t["v16_s3.p2"]}</p>
          <GrilleCartes cartes={fondements} />

          <h2 className="titre-h3">{t["v16_s4.titre"]}</h2>
          <p>{t["v16_s4.p1"]}</p>
          <ul>
            {notions.map((n, i) => (
              <li key={i}>
                <strong>{n.terme}</strong> {n.texte}
              </li>
            ))}
          </ul>
          <p>{t["v16_s4.p2"]}</p>

          <h2 className="titre-h3">{t["v16_s5.titre"]}</h2>
          <p>{t["v16_s5.p1"]}</p>
          <div className="band">
            <strong>{t["v16_s5.encadre"]}</strong>
          </div>

          <h2 className="titre-h3">{t["v16_operateurs.titre"]}</h2>
          <p>{t["v16_operateurs.intro"]}</p>
          <GrilleCartes cartes={operateurs} />
          <p className="caption">{t["v16_operateurs.legende"]}</p>

          <h2 className="titre-h3">{t["v16_cascade.titre"]}</h2>
          <div className="equation">{t["v16_cascade.sequence"]}</div>
          <p>{t["v16_cascade.texte"]}</p>

          <h2 className="titre-h3">{t["v16_guide.titre"]}</h2>
          <div className="equation">{t["v16_guide.sequence"]}</div>
          <p>{t["v16_guide.texte"]}</p>
        </div>
      </div>
      <div className="major-section">
        <h2>{t["v16_demarche.titre"]}</h2>
        <p>{t["v16_demarche.p1"]}</p>
        <p>{t["v16_demarche.p2"]}</p>
        <p>{t["v16_demarche.p3"]}</p>
      </div>
    </section>
  );
}

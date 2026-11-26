import { GrilleCartes, type CarteV16 } from "@/components/carte-concept";
import { getListe, getTextes } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("transmission");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/transmission" });
}

/** De l’Organon à la Nouvelle Thèbes — conforme au prototype maître V16. */
export default async function TransmissionPage() {
  const [t, supports, atlas, bibliotheques] = await Promise.all([
    getTextes("transmission"),
    getListe<CarteV16>("transmission.v16_supports"),
    getListe<CarteV16>("transmission.v16_atlas"),
    getListe<CarteV16>("transmission.v16_bibliotheques"),
  ]);

  return (
    <section className="page fade" id="page-transmission">
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
          <div className="equation">{t["v16_ouverture.sequence"]}</div>

          <h2 className="titre-h3">{t["v16_supports.titre"]}</h2>
          <GrilleCartes cartes={supports} />

          <h2 className="titre-h3">{t["v16_thebes.titre"]}</h2>
          <p>{t["v16_thebes.texte"]}</p>
          <GrilleCartes cartes={atlas} />

          <h2 className="titre-h3">{t["v16_bibliotheques.titre"]}</h2>
          <GrilleCartes cartes={bibliotheques} />

          <h2 className="titre-h3">{t["v16_rencontre.titre"]}</h2>
          <p>{t["v16_rencontre.p1"]}</p>
          <p>{t["v16_rencontre.p2"]}</p>

          <h2 className="titre-h3">{t["v16_rupture.titre"]}</h2>
          <p>{t["v16_rupture.p1"]}</p>
          <p>{t["v16_rupture.p2"]}</p>

          <div className="band">
            <h2>{t["v16_bande.titre"]}</h2>
            <p>{t["v16_bande.p1"]}</p>
            <div className="equation">{t["v16_bande.sequence"]}</div>
            <p>{t["v16_bande.p2"]}</p>
          </div>
          <h2 className="titre-h3">{t["v16_matrice.titre"]}</h2>
          <p>{t["v16_matrice.texte"]}</p>
        </div>
      </div>
      <div className="major-section">
        <h2>{t["v16_capacite.titre"]}</h2>
        <p>{t["v16_capacite.p1"]}</p>
        <p>{t["v16_capacite.p2"]}</p>
        <p>{t["v16_capacite.p3"]}</p>
      </div>
      <div className="major-section">
        <h2>{t["v16_horizon.titre"]}</h2>
        <p>{t["v16_horizon.p1"]}</p>
        <p>{t["v16_horizon.p2"]}</p>
        <p>{t["v16_horizon.p3"]}</p>
      </div>
    </section>
  );
}

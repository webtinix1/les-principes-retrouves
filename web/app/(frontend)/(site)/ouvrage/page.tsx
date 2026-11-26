import { getRecueils, getVenteOuvrages, type OffreTome } from "@/lib/cms";
import { getTextes } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";
import { OuvrageLecteur } from "@/components/pages/ouvrage-lecteur";
import "./ouvrage.css";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("ouvrage");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/ouvrage" });
}

/**
 * Bouton d'achat d'une carte : lien vers la page produit (Boutique › Vente des
 * ouvrages) ; tant qu'aucun lien n'est saisi, bouton inactif comme dans le prototype.
 */
function BoutonAchat({ offre, libelle }: { offre?: OffreTome; libelle: string }) {
  if (offre) {
    return (
      <a className="btn-primary" href={offre.lien} target="_blank" rel="noopener noreferrer">
        {libelle}
      </a>
    );
  }
  return (
    <button className="btn-primary" type="button" aria-disabled="true">
      {libelle}
    </button>
  );
}

/** Les ouvrages — le diptyque, prototype maître V16 (section « page-ouvrage »). */
export default async function OuvragePage() {
  const [t, recueils, vente] = await Promise.all([getTextes("ouvrage"), getRecueils(), getVenteOuvrages()]);
  const libelleTome: Record<string, string> = { "tome-i": t["lecteur.tome_i"], "tome-ii": t["lecteur.tome_ii"] };

  return (
    <section className="page fade" id="page-ouvrage">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["entete.surtitre"]}</div>
          <h1>{t["entete.titre"]}</h1>
          <p>{t["entete.texte"]}</p>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <p className="lead">{t["intro.chapeau"]}</p>
          <div className="status-key">{t["intro.statuts"]}</div>
          <div className="grid">
            <article className="card book-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t["tome_i.couverture_alt"]}
                className="book-cover"
                src="/v16/couverture-tome-i.webp"
                width={730}
                height={1024}
              />
              <div className="tag">{t["tome_i.rubrique"]}</div>
              <h2 className="titre-h3">{t["tome_i.titre"]}</h2>
              <p>{t["tome_i.description"]}</p>
              <div className="price">
                {t["tome_i.prix"]} <small>{t["tome_i.prix_format"]}</small>
              </div>
              <p className="note">{t["tome_i.note"]}</p>
              <BoutonAchat offre={vente["tome-i"]} libelle={t["tome_i.bouton"]} />
            </article>
            <article className="card book-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t["tome_ii.couverture_alt"]}
                className="book-cover"
                src="/v16/couverture-tome-ii.webp"
                width={694}
                height={1024}
              />
              <div className="tag">{t["tome_ii.rubrique"]}</div>
              <p className="author-designation">{t["tome_ii.auteur"]}</p>
              <h2 className="titre-h3">{t["tome_ii.titre"]}</h2>
              <p>
                <em>{t["tome_ii.sous_titre"]}</em>
              </p>
              <p>{t["tome_ii.description"]}</p>
              <div className="price">
                {t["tome_ii.prix"]} <small>{t["tome_ii.prix_format"]}</small>
              </div>
              <p className="note">{t["tome_ii.note"]}</p>
              <BoutonAchat offre={vente["tome-ii"]} libelle={t["tome_ii.bouton"]} />
            </article>
          </div>
          <OuvrageLecteur
            tomes={recueils.map((r) => ({
              tome: r.tome,
              libelle: libelleTome[r.tome] ?? r.etiquette,
              textes: r.parties.flatMap((p) => p.textes),
            }))}
            libelles={{
              titre: t["lecteur.titre"],
              chapeau: t["lecteur.chapeau"],
              tomesAria: t["lecteur.tomes_aria"],
              consigne: t["lecteur.consigne"],
              textesAria: t["lecteur.textes_aria"],
              lireIntegral: t["lecteur.lire_integral"],
              ouvrirIntegral: t["lecteur.ouvrir_integral"],
              retour: t["lecteur.retour"],
            }}
          />
          <p className="note">{t["lecteur.note"]}</p>
        </div>
      </div>
      <div className="major-section">
        <h2>{t["diptyque.titre"]}</h2>
        <p>{t["diptyque.tome_i"]}</p>
        <p>{t["diptyque.tome_ii"]}</p>
        <p>{t["diptyque.corpus"]}</p>
      </div>
    </section>
  );
}

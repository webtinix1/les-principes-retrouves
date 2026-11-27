import Link from "next/link";
import { notFound } from "next/navigation";
import { getTextes, remplir } from "@/lib/contenu";
import { formaterEuro, getOuvrage, imprimeOuvert } from "@/lib/librairie/donnees";
import { pageMetadata } from "@/lib/seo";
import "../librairie.css";

export const revalidate = 3600;

export function generateStaticParams() {
  return [{ tome: "tome-i" }, { tome: "tome-ii" }];
}

export async function generateMetadata({ params }: { params: Promise<{ tome: string }> }) {
  const { tome } = await params;
  const ouvrage = await getOuvrage(tome);
  if (!ouvrage) return {};
  const o = await getTextes("ouvrage");
  return pageMetadata({
    title: `${ouvrage.titre_complet} — ${ouvrage.etiquette}`,
    description: o[ouvrage.tome === "tome-i" ? "tome_i.description" : "tome_ii.description"],
    path: `/librairie/${ouvrage.tome}`,
  });
}

/**
 * Fiche commerciale d'un tome. Présentation et apport doctrinal : textes de la
 * page « Les ouvrages », repris tels quels. Deux circuits distincts : édition
 * numérique (Chariow) et édition imprimée (commande sur le site).
 */
export default async function FicheOuvragePage({ params }: { params: Promise<{ tome: string }> }) {
  const { tome } = await params;
  const ouvrage = await getOuvrage(tome);
  if (!ouvrage) notFound();

  const [t, o] = await Promise.all([getTextes("librairie"), getTextes("ouvrage")]);
  const cle = ouvrage.tome === "tome-i" ? "tome_i" : "tome_ii";
  const presentation = o[`${cle}.description`];
  const apport = o[ouvrage.tome === "tome-i" ? "diptyque.tome_i" : "diptyque.tome_ii"];
  const alt = o[`${cle}.couverture_alt`];

  const biblio = [
    ...(ouvrage.reference_editoriale
      ? [{ libelle: t["fiche.biblio_reference"], valeur: ouvrage.reference_editoriale }]
      : []),
    ...ouvrage.bibliographie,
  ];
  const conditions = {
    numerique: ouvrage.conditions.numerique ?? t["conditions.numerique"],
    imprime: ouvrage.conditions.imprime ?? t["conditions.imprime"],
    livraison: ouvrage.conditions.livraison ?? t["conditions.livraison"],
  };
  const imprimeOk = imprimeOuvert(ouvrage);

  return (
    <section className="page fade" id="page-librairie">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{remplir(t["fiche.surtitre"], { tome: ouvrage.etiquette })}</div>
          <h1>{ouvrage.titre_complet}</h1>
          {ouvrage.sous_titre && <p>{ouvrage.sous_titre}</p>}
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <nav className="lib-retour" aria-label={t["fiche.retour"]}>
            <Link href="/ouvrage">{t["fiche.retour"]}</Link>
            <Link href={`/ouvrage/${ouvrage.tome}`}>{remplir(t["fiche.lien_lecture"], { tome: ouvrage.etiquette })}</Link>
          </nav>

          <div className="lib-fiche">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="lib-couverture"
              src={ouvrage.couverture.url}
              alt={alt}
              width={ouvrage.couverture.largeur}
              height={ouvrage.couverture.hauteur}
            />
            <div>
              <p className="lib-auteur" data-testid="auteur">
                {ouvrage.auteur}
              </p>
              <h2>{t["fiche.presentation"]}</h2>
              <p>{presentation}</p>
              <h2>{t["fiche.apport"]}</h2>
              <p>{apport}</p>
              {biblio.length > 0 && (
                <>
                  <h2>{t["fiche.biblio"]}</h2>
                  <dl className="lib-biblio">
                    {biblio.map((b) => (
                      <div key={b.libelle} style={{ display: "contents" }}>
                        <dt>{b.libelle}</dt>
                        <dd>{b.valeur}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </div>
          </div>

          <h2>{t["fiche.formats"]}</h2>
          <div className="lib-formats">
            <article className="card lib-format" data-format="numerique" aria-labelledby="fmt-num">
              <h3 id="fmt-num">{t["fiche.num_titre"]}</h3>
              <p>{t["fiche.num_texte"]}</p>
              <dl>
                <div>
                  <dt>{t["fiche.num_prix"]}</dt>
                  <dd>{ouvrage.numerique.prix !== null ? formaterEuro(ouvrage.numerique.prix) : "—"}</dd>
                </div>
              </dl>
              {ouvrage.numerique.lien ? (
                <a className="btn" href={ouvrage.numerique.lien} target="_blank" rel="noopener noreferrer">
                  {t["fiche.num_bouton"]}
                </a>
              ) : (
                <p className="note">{t["fiche.num_indisponible"]}</p>
              )}
            </article>

            <article className="card lib-format" data-format="imprime" aria-labelledby="fmt-imp">
              <h3 id="fmt-imp">{t["fiche.imp_titre"]}</h3>
              <p>{t["fiche.imp_texte"]}</p>
              <dl>
                <div>
                  <dt>{t["fiche.imp_prix"]}</dt>
                  <dd>{ouvrage.imprime.prix !== null ? formaterEuro(ouvrage.imprime.prix) : "—"}</dd>
                </div>
                <div>
                  <dt>{t["fiche.frais_titre"]}</dt>
                  <dd style={{ font: "13px var(--sans)", maxWidth: "16rem" }}>{t["fiche.frais_texte"]}</dd>
                </div>
              </dl>
              {imprimeOk ? (
                <Link className="btn" href={`/librairie/${ouvrage.tome}/commande`}>
                  {t["fiche.imp_bouton"]}
                </Link>
              ) : (
                <p className="note">{t["fiche.imp_indisponible"]}</p>
              )}
            </article>
          </div>

          <div className="lib-conditions">
            <h2>{t["fiche.conditions"]}</h2>
            <h3>{t["fiche.cond_numerique"]}</h3>
            <p>{conditions.numerique}</p>
            <h3>{t["fiche.cond_imprime"]}</h3>
            <p>{conditions.imprime}</p>
            <h3>{t["fiche.cond_livraison"]}</h3>
            <p>{conditions.livraison}</p>
            <p>
              <Link href="/librairie/reclamation">{t["fiche.reclamation"]}</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

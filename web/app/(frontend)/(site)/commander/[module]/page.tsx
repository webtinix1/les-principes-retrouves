import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightLeft, CreditCard, Smartphone } from "lucide-react";
import { CheckoutForm } from "@/components/checkout-form";
import { BoucleAcces } from "@/components/pages/commande-boucle";
import { getModule, isPurchasable } from "@/lib/commerce";
import { regimesDisponibles } from "@/lib/payment";
import { pageMetadata } from "@/lib/seo";
import { getListe, getTexte, getTextes } from "@/lib/contenu";
import "../../pages-annexes.css";

// Lecture de la disponibilité du paiement à l'exécution (env serveur).
export const dynamic = "force-dynamic";

// Le titre accepte le marqueur {module} (titre du module), facultatif.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleId } = await params;
  const formation = await getModule(moduleId);
  return pageMetadata({
    title: await getTexte("site_interface.commander.seo.titre", { module: formation?.titre ?? "" }),
    description: await getTexte("site_interface.commander.seo.description"),
    path: "/commander",
  });
}

/**
 * Icônes des moyens de paiement, dans l'ordre de la liste éditable
 * « Inscription — moyens de paiement » (back-office, « Site — Interface »).
 */
const ICONES_MOYENS = [Smartphone, CreditCard, ArrowRightLeft];

/** Inscription à un module, dans l'allure du prototype maître V16. */
export default async function CommanderPage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleId } = await params;
  const formation = await getModule(moduleId);
  if (!formation) notFound();

  const purchasable = isPurchasable(formation);
  // Régimes réellement achetables (produit publié + mappé). Vide → paiement pas
  // encore branché : on montre « bientôt » plutôt qu'un formulaire voué à l'échec.
  const regimes = purchasable ? regimesDisponibles(formation.id) : [];
  const ouvert = !purchasable || regimes.length > 0;

  // Textes d'interface : back-office, global « Site — Interface ».
  const textes = await getTextes("site_interface");
  const t = (cle: string) => textes[`commander.${cle}`];
  const aria = textes["fil_ariane.aria"];
  const moyens = await getListe<{ titre: string; detail: string }>("site_interface.commander_moyens");
  const etapes = await getListe<{ texte: string }>(
    purchasable ? "site_interface.commander_etapes_paiement" : "site_interface.commander_etapes_devis",
  );

  return (
    <section className="page fade annexe-v16">
      <div className="page-head">
        <div className="wrap">
          <nav aria-label={aria} className="eyebrow">
            <Link href="/transmission">{t("fil_transmission")}</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span aria-current="page">{formation.numero}</span>
          </nav>
          <h1>{formation.titre}</h1>
          <p>{formation.public_cible}</p>
          <dl className="annexe-meta">
            <div>
              <dt>{t("duree")}</dt>
              <dd>{formation.duree}</dd>
            </div>
            {formation.prerequis && (
              <div>
                <dt>{t("prerequis")}</dt>
                <dd>{formation.prerequis}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="content">
        <div className="wrap annexe-colonnes">
          {/* Colonne principale : ce que l'on reçoit, puis le formulaire */}
          <div>
            {formation.livrables.length > 0 && (
              <>
                <div className="kicker">{t("ce_que_vous_recevez")}</div>
                <ul className="annexe-liste">
                  {formation.livrables.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </>
            )}
            <p>
              <Link href="/transmission" className="btn secondary">
                {t("voir_programme")} <span aria-hidden="true">→</span>
              </Link>
            </p>

            <div id="formulaire" className="card">
              {!ouvert ? (
                <>
                  <h2>{t("bientot_titre")}</h2>
                  <p>{t("bientot_texte")}</p>
                  <Link href="#contacts-officiels" className="btn">
                    {t("bientot_lien")}
                  </Link>
                </>
              ) : (
                <>
                  <h2>{purchasable ? t("formulaire_titre") : t("devis_titre")}</h2>
                  {!purchasable && <p>{formation.tarif_devis}</p>}
                  <CheckoutForm
                    module_id={formation.id}
                    module_titre={formation.titre}
                    purchasable={purchasable}
                    tarif_b2b={formation.tarif_b2b}
                    tarif_b2c={formation.tarif_b2c}
                    tarif_devis={formation.tarif_devis}
                    regimes={regimes}
                  />
                </>
              )}
            </div>
          </div>

          {/* Colonne latérale : réassurance et boucle d'accès */}
          <aside className="annexe-lateral">
            {ouvert && (
              <div className="card">
                <div className="tag">{t("apres_demande")}</div>
                <ol className="annexe-liste">
                  {etapes.map((e, i) => (
                    <li key={i}>{e.texte}</li>
                  ))}
                </ol>
              </div>
            )}

            {purchasable && (
              <div className="card">
                <div className="tag">{t("paiement_securise")}</div>
                <dl className="annexe-moyens">
                  {moyens.map(({ titre: dt, detail: dd }, i) => {
                    const Icone = ICONES_MOYENS[i % ICONES_MOYENS.length];
                    return (
                      <div key={i}>
                        <dt>
                          <Icone aria-hidden="true" width={18} height={18} strokeWidth={1.75} />
                          {dt}
                        </dt>
                        <dd>{dd}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            )}

            <div className="card">
              <BoucleAcces courante={0} />
            </div>

            {ouvert && (
              <p className="note">
                {t("question")}{" "}
                <Link href="#contacts-officiels" className="annexe-lien">
                  {t("question_lien")}
                </Link>
              </p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

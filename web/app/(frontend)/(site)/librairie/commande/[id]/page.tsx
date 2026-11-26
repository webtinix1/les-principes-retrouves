import Link from "next/link";
import { notFound } from "next/navigation";
import { getTextes, remplir } from "@/lib/contenu";
import { actualiserPaiement } from "@/lib/librairie/commande";
import { formaterEuro } from "@/lib/librairie/donnees";
import { payloadClient } from "@/lib/payload";
import "../../librairie.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Suivi de commande", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Suivi d'une commande imprimée : l'identifiant (UUID) vaut jeton de consultation. */
export default async function SuiviCommandePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();

  // Retour du prestataire : on revérifie le paiement avant d'afficher l'état.
  await actualiserPaiement(id);

  const payload = await payloadClient();
  const c = await payload.findByID({ collection: "commandes-ouvrages", id, depth: 0, disableErrors: true });
  if (!c) notFound();

  const t = await getTextes("librairie");
  const message = t[`suivi.${c.statut === "en_attente_paiement" ? "attente" : c.statut}`];

  return (
    <section className="page fade" id="page-librairie">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["suivi.surtitre"]}</div>
          <h1>{remplir(t["suivi.titre"], { numero: c.numero ?? "" })}</h1>
          <p data-testid="statut">
            {t["suivi.statut"]} : {t[`suivi.libelle_${c.statut}`]}
          </p>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <p className="lead">{message}</p>
          <dl className="lib-biblio">
            <dt>{c.titre}</dt>
            <dd>
              {c.quantite} × {formaterEuro(c.prix_unitaire)}
            </dd>
            <dt>{t["suivi.total"]}</dt>
            <dd>{formaterEuro(c.total)}</dd>
            {(c.transporteur || c.numero_suivi) && (
              <>
                <dt>{t["suivi.transporteur"]}</dt>
                <dd>{c.transporteur ?? "—"}</dd>
                <dt>{t["suivi.numero_suivi"]}</dt>
                <dd>{c.numero_suivi ?? "—"}</dd>
              </>
            )}
          </dl>
          <p>
            <Link href="/librairie/reclamation">{t["suivi.reclamation"]}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

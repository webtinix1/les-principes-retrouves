import Link from "next/link";
import { notFound } from "next/navigation";
import { LibrairieCommandeForm } from "@/components/librairie-commande-form";
import { getListe, getTextes, remplir } from "@/lib/contenu";
import { getOuvrage, getReglages, imprimeOuvert } from "@/lib/librairie/donnees";
import "../../librairie.css";

// Prix et grille de livraison lus à chaque requête.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ tome: string }> }) {
  const { tome } = await params;
  const [ouvrage, t] = await Promise.all([getOuvrage(tome), getTextes("librairie")]);
  return {
    title: remplir(t["commande.seo_titre"], { tome: ouvrage?.etiquette ?? "" }),
    robots: { index: false },
  };
}

/** Commande de l'édition imprimée d'un tome — circuit distinct de l'édition numérique. */
export default async function CommandeImprimePage({ params }: { params: Promise<{ tome: string }> }) {
  const { tome } = await params;
  const ouvrage = await getOuvrage(tome);
  if (!ouvrage) notFound();

  const [t, reglages, pays] = await Promise.all([
    getTextes("librairie"),
    getReglages(),
    getListe<{ code: string; libelle: string }>("site_formulaires.pays"),
  ]);
  const ouvert = imprimeOuvert(ouvrage) && ouvrage.imprime.prix !== null;
  const texte = (cle: string) => t[`commande.${cle}`];

  return (
    <section className="page fade" id="page-librairie">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{remplir(texte("surtitre"), { tome: ouvrage.etiquette })}</div>
          <h1>{texte("titre")}</h1>
          <p>{texte("intro")}</p>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <nav className="lib-retour">
            <Link href={`/librairie/${ouvrage.tome}`}>{texte("retour")}</Link>
          </nav>
          {ouvert ? (
            <LibrairieCommandeForm
              tome={ouvrage.tome}
              titre={ouvrage.titre_complet}
              prix={ouvrage.imprime.prix as number}
              zones={reglages.zones.map((z) => ({
                nom: z.nom,
                pays: z.pays.split(",").map((p) => p.trim().toUpperCase()),
                frais_premier: z.frais_premier,
                frais_supplementaire: z.frais_supplementaire,
                delai: z.delai ?? null,
              }))}
              pays={pays.map((p) => ({ code: p.code, libelle: p.libelle }))}
              t={{
                ouvrage: texte("ouvrage"),
                quantite: texte("quantite"),
                coordonnees: texte("coordonnees"),
                nom: texte("nom"),
                email: texte("email"),
                telephone: texte("telephone"),
                adresse_titre: texte("adresse_titre"),
                adresse1: texte("adresse1"),
                adresse2: texte("adresse2"),
                code_postal: texte("code_postal"),
                ville: texte("ville"),
                pays: texte("pays"),
                recap: texte("recap"),
                recap_exemplaires: texte("recap_exemplaires"),
                recap_livraison: texte("recap_livraison"),
                recap_total: texte("recap_total"),
                recap_delai: texte("recap_delai"),
                livraison_indisponible: texte("livraison_indisponible"),
                consentement: texte("consentement"),
                bouton: texte("bouton"),
                traitement: texte("traitement"),
                erreur: texte("erreur"),
              }}
            />
          ) : (
            <p className="note">{texte("ferme")}</p>
          )}
        </div>
      </div>
    </section>
  );
}

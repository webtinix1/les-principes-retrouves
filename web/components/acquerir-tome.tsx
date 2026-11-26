import type { OffreTome } from "@/lib/cms";
import { libelle } from "@/lib/lecture";

/**
 * Bouton « Acquérir le Tome … » (allure `.btn` du prototype V16) : ouvre la
 * page produit Chariow dans un nouvel onglet. N'affiche rien tant que le lien
 * n'est pas renseigné dans le back-office (Boutique › Vente des ouvrages).
 */
export async function AcquerirTome({
  offre,
  etiquette,
  className,
  mention = true,
}: {
  offre?: OffreTome;
  /** « Tome I », « Tome II ». */
  etiquette: string;
  className?: string;
  /** Ligne « Paiement sécurisé via Chariow » sous le bouton. */
  mention?: boolean;
}) {
  if (!offre) return null;
  const [bouton, nouvelOnglet, paiement] = await Promise.all([
    libelle("acquerir.bouton", { tome: etiquette }),
    libelle("acquerir.nouvel_onglet"),
    libelle("acquerir.paiement"),
  ]);
  return (
    <div className={className ? `ouvrage-achat ${className}` : "ouvrage-achat"}>
      <a href={offre.lien} target="_blank" rel="noopener noreferrer" className="btn">
        {bouton}
        {offre.prix && ` · ${offre.prix}`}
        <span className="sr-only"> {nouvelOnglet}</span>
      </a>
      {mention && (
        <p className="note">
          {offre.format ? `${offre.format} · ` : ""}
          {paiement}
        </p>
      )}
    </div>
  );
}

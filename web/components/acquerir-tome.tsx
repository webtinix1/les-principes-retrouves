import { ExternalLink } from "lucide-react";
import type { OffreTome } from "@/lib/cms";
import { buttonVariants } from "@/components/ui/button";
import { libelle } from "@/lib/lecture";
import { cn } from "@/lib/utils";

/**
 * Bouton « Acquérir le Tome … » : ouvre la page produit Chariow dans un nouvel
 * onglet. N'affiche rien tant que le lien n'est pas renseigné dans le
 * back-office (Boutique › Vente des ouvrages).
 */
export async function AcquerirTome({
  offre,
  etiquette,
  variante = "or-plein",
  className,
  mention = true,
}: {
  offre?: OffreTome;
  /** « Tome I », « Tome II ». */
  etiquette: string;
  variante?: "or-plein" | "or" | "nuit";
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
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <a
        href={offre.lien}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: variante, size: "cta" })}
      >
        {bouton}
        {offre.prix && <span className="font-normal">· {offre.prix}</span>}
        <ExternalLink aria-hidden="true" className="size-4" strokeWidth={1.75} />
        <span className="sr-only">{nouvelOnglet}</span>
      </a>
      {mention && (
        <span className="font-ui text-[13px] text-encre-3 in-[.surface-sombre]:text-nuit-300">
          {offre.format ? `${offre.format} · ` : ""}{paiement}
        </span>
      )}
    </div>
  );
}

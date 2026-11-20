import { AccesFormClient } from "@/components/acces-form-client";
import { getTextesFormulaires, textesDe } from "@/components/formulaires-textes";
import { getTextes } from "@/lib/contenu";

/**
 * Saisie / gestion du code d'accès (Server Component) : charge les textes du
 * back-office (« Site — Formulaires », niveaux de « Site — Interface ») et rend
 * le formulaire client. Mêmes propriétés qu'auparavant.
 */
export async function AccesForm({ niveauActif }: { niveauActif: string | null }) {
  const [{ textes }, interfaceTextes] = await Promise.all([getTextesFormulaires(), getTextes("site_interface")]);
  return (
    <AccesFormClient
      niveauActif={niveauActif}
      t={textesDe(textes, "acces")}
      niveaux={textesDe(interfaceTextes, "niveau")}
    />
  );
}

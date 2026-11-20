import { CheckoutFormClient, type Props } from "@/components/checkout-form-client";
import { getTextesFormulaires, textesDe } from "@/components/formulaires-textes";

/**
 * Formulaire d'inscription (Server Component) : charge les textes du
 * back-office (« Site — Formulaires ») et rend le formulaire client. Mêmes
 * propriétés qu'auparavant.
 */
export async function CheckoutForm(props: Props) {
  const { textes, pays } = await getTextesFormulaires();
  return <CheckoutFormClient {...props} t={textesDe(textes, "commun", "inscription")} pays={pays} />;
}

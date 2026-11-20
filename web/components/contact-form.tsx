import { ContactFormClient } from "@/components/contact-form-client";
import { getTextesFormulaires, textesDe } from "@/components/formulaires-textes";

/**
 * Formulaire de contact (Server Component) : charge les textes du back-office
 * (« Site — Formulaires ») et rend le formulaire client.
 */
export async function ContactForm() {
  const { textes } = await getTextesFormulaires();
  return <ContactFormClient t={textesDe(textes, "commun", "contact")} />;
}

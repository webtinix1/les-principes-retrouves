import type { CollectionConfig } from "payload";
import { connecte } from "../access";
import { STATUT_MESSAGE } from "@/lib/libelles";

const options = (table: Record<string, string>) =>
  Object.entries(table).map(([value, label]) => ({ value, label }));

/** Messages reçus via le formulaire de contact (Secrétariat International). */
export const MessagesContact: CollectionConfig = {
  slug: "messages-contact",
  typescript: { interface: "MessageContact" },
  labels: { singular: "Message", plural: "Messages de contact" },
  admin: {
    useAsTitle: "sujet",
    group: "Secrétariat",
    defaultColumns: ["sujet", "nom", "email", "statut", "createdAt"],
  },
  defaultSort: "-createdAt",
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  fields: [
    {
      name: "statut",
      type: "select",
      label: "Statut",
      defaultValue: "nouveau",
      required: true,
      options: options(STATUT_MESSAGE),
      admin: { position: "sidebar" },
    },
    { name: "nom", type: "text", label: "Nom", required: true },
    { name: "email", type: "email", label: "E-mail", required: true },
    { name: "organisation", type: "text", label: "Organisation" },
    { name: "sujet", type: "text", label: "Sujet", required: true },
    { name: "message", type: "textarea", label: "Message", required: true },
    {
      name: "consent_rgpd",
      type: "checkbox",
      label: "Consentement RGPD",
      defaultValue: false,
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "source",
      type: "text",
      label: "Source",
      defaultValue: "site",
      admin: { position: "sidebar", readOnly: true },
    },
  ],
};

export { options };

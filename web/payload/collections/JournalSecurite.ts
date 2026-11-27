import type { CollectionConfig } from "payload";
import { accesAdministrateur, accesGestion } from "../access";
import { EVENEMENTS_SECURITE } from "@/lib/espace/securite";

/** Journal technique de sécurité de l'Espace utilisateurs (écrit par le serveur uniquement). */
export const JournalSecurite: CollectionConfig = {
  slug: "journal-securite",
  labels: { singular: "Événement de sécurité", plural: "Journal de sécurité" },
  admin: {
    useAsTitle: "evenement",
    group: "Espace utilisateurs",
    defaultColumns: ["evenement", "lecteur", "detail", "createdAt"],
    description: "Conservé 12 mois. L'adresse IP n'est jamais enregistrée en clair.",
  },
  defaultSort: "-createdAt",
  access: { read: accesGestion, create: () => false, update: () => false, delete: accesAdministrateur },
  fields: [
    { name: "evenement", type: "select", label: "Événement", required: true, index: true, options: EVENEMENTS_SECURITE },
    { name: "lecteur", type: "relationship", relationTo: "lecteurs", label: "Compte", index: true },
    { name: "empreinte_ip", type: "text", label: "Empreinte de l'adresse IP" },
    { name: "detail", type: "text", label: "Précision" },
  ],
};

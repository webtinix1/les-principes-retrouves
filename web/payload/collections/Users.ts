import type { CollectionConfig } from "payload";

/** Comptes du back-office (Secrétariat). Authentification native Payload. */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utilisateur", plural: "Utilisateurs" },
  admin: { useAsTitle: "email", group: "Administration" },
  auth: {
    // Verrouillage après 5 échecs pendant 10 min (anti brute-force).
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  fields: [{ name: "nom", type: "text", label: "Nom" }],
};

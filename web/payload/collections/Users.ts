import type { CollectionConfig } from "payload";
import { accesAdministrateur, estAdministrateur, estAdmin } from "../access";

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
  access: {
    // Chacun voit sa propre fiche ; seul l'administrateur gère l'ensemble des comptes.
    read: ({ req }) => {
      if (!estAdmin(req)) return false;
      return estAdministrateur(req) ? true : { id: { equals: req.user!.id } };
    },
    create: accesAdministrateur,
    update: ({ req }) => {
      if (!estAdmin(req)) return false;
      return estAdministrateur(req) ? true : { id: { equals: req.user!.id } };
    },
    delete: accesAdministrateur,
  },
  fields: [
    { name: "nom", type: "text", label: "Nom" },
    {
      name: "role",
      type: "select",
      label: "Rôle",
      required: true,
      defaultValue: "administrateur",
      options: [
        { value: "administrateur", label: "Administrateur (tous droits)" },
        { value: "gestionnaire", label: "Gestionnaire (comptes, demandes, export, statistiques)" },
        { value: "secretariat", label: "Secrétariat (suivi des demandes)" },
      ],
      access: { update: ({ req }) => estAdministrateur(req) },
      admin: { position: "sidebar" },
    },
  ],
};

import type { CollectionConfig } from "payload";
import { connecte } from "../access";
import { revaliderChemins } from "../revalidation";

const chemins = () => revaliderChemins(["/ouvrage"]);

/** Les Autorités de Convergence (ancrage doctrinal du Diptyque — page L'Ouvrage). */
export const Autorites: CollectionConfig = {
  slug: "autorites",
  labels: { singular: "Autorité de convergence", plural: "Autorités de convergence" },
  admin: { useAsTitle: "nom", group: "Doctrine", defaultColumns: ["nom", "pays", "ordre"] },
  defaultSort: "ordre",
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  hooks: { afterChange: [chemins], afterDelete: [chemins] },
  fields: [
    {
      name: "autorite_id",
      type: "text",
      label: "Identifiant",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    { name: "ordre", type: "number", label: "Ordre", defaultValue: 0, admin: { position: "sidebar" } },
    {
      type: "row",
      fields: [
        { name: "nom", type: "text", label: "Nom", required: true },
        { name: "pays", type: "text", label: "Pays", required: true },
      ],
    },
    { name: "apport", type: "textarea", label: "Apport", required: true },
  ],
};

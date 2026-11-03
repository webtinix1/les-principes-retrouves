import type { CollectionConfig } from "payload";
import { connecte } from "../access";
import { revaliderChemins } from "../revalidation";

const chemins = () => revaliderChemins(["/concepts"]);

/** Strates du vocabulaire stabilisé (regroupement des concepts). */
export const Strates: CollectionConfig = {
  slug: "strates",
  labels: { singular: "Strate", plural: "Strates" },
  admin: { useAsTitle: "titre", group: "Doctrine", defaultColumns: ["titre", "sous_titre", "ordre"] },
  defaultSort: "ordre",
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  hooks: { afterChange: [chemins], afterDelete: [chemins] },
  fields: [
    {
      name: "strate_id",
      type: "text",
      label: "Identifiant",
      required: true,
      unique: true,
      admin: { position: "sidebar", description: "Ancre de la page (#…). Ne pas renommer." },
    },
    { name: "ordre", type: "number", label: "Ordre", defaultValue: 0, admin: { position: "sidebar" } },
    { name: "titre", type: "text", label: "Titre", required: true },
    { name: "sous_titre", type: "text", label: "Sous-titre", required: true },
    {
      name: "concepts",
      type: "join",
      label: "Concepts",
      collection: "concepts",
      on: "strate",
      defaultSort: "numero",
    },
  ],
};

/** Les concepts stabilisés : définition d'autorité et portée opératoire. */
export const Concepts: CollectionConfig = {
  slug: "concepts",
  labels: { singular: "Concept", plural: "Concepts stabilisés" },
  admin: { useAsTitle: "titre", group: "Doctrine", defaultColumns: ["numero", "titre", "strate"] },
  defaultSort: "numero",
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  hooks: { afterChange: [chemins], afterDelete: [chemins] },
  fields: [
    {
      name: "concept_id",
      type: "text",
      label: "Identifiant",
      required: true,
      unique: true,
      admin: { position: "sidebar", description: "Ancre de la page (#…). Ne pas renommer." },
    },
    { name: "numero", type: "number", label: "Numéro", required: true, admin: { position: "sidebar" } },
    {
      name: "strate",
      type: "relationship",
      relationTo: "strates",
      label: "Strate",
      required: true,
      admin: { position: "sidebar" },
    },
    { name: "titre", type: "text", label: "Titre", required: true },
    { name: "definition", type: "textarea", label: "Définition d'autorité", required: true },
    { name: "portee", type: "textarea", label: "Portée opératoire", required: true },
  ],
};

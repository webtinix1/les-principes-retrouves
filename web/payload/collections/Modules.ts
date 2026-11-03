import type { CollectionConfig } from "payload";
import { connecte } from "../access";
import { options } from "./MessagesContact";
import { NIVEAU_CODE } from "@/lib/libelles";
import { revaliderChemins } from "../revalidation";

const chemins = () => revaliderChemins(["/transmission"]);

/**
 * Modules de formation (page Transmission + tunnel de commande). Le tarif
 * affiché est aussi le montant enregistré sur la commande ; le produit Chariow
 * correspondant reste déclaré dans CHARIOW_PRODUCT_MAP (clé = identifiant).
 */
export const Modules: CollectionConfig = {
  slug: "modules",
  labels: { singular: "Module de formation", plural: "Modules de formation" },
  admin: {
    useAsTitle: "titre",
    group: "Formation",
    defaultColumns: ["numero", "titre", "tarif_b2b", "tarif_b2c"],
  },
  defaultSort: "ordre",
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  hooks: { afterChange: [chemins], afterDelete: [chemins] },
  fields: [
    {
      name: "module_id",
      type: "text",
      label: "Identifiant",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description:
          "Clé stable (ex. fondements_organon) — utilisée par les URL de commande et CHARIOW_PRODUCT_MAP. Ne pas renommer.",
      },
    },
    { name: "ordre", type: "number", label: "Ordre", defaultValue: 0, admin: { position: "sidebar" } },
    {
      name: "niveau",
      type: "select",
      label: "Niveau d'accès débloqué",
      required: true,
      options: options(NIVEAU_CODE),
      admin: { position: "sidebar" },
    },
    {
      type: "row",
      fields: [
        { name: "numero", type: "text", label: "Numéro", required: true },
        { name: "titre", type: "text", label: "Titre", required: true },
      ],
    },
    { name: "public_cible", type: "textarea", label: "Public cible", required: true },
    { name: "duree", type: "text", label: "Durée", required: true },
    { name: "prerequis", type: "textarea", label: "Prérequis", required: true },
    {
      name: "sessions",
      type: "array",
      label: "Sessions",
      labels: { singular: "Session", plural: "Sessions" },
      fields: [
        { name: "titre", type: "text", label: "Titre", required: true },
        {
          name: "points",
          type: "array",
          label: "Points",
          labels: { singular: "Point", plural: "Points" },
          fields: [{ name: "texte", type: "text", label: "Point", required: true }],
        },
      ],
    },
    {
      name: "livrables",
      type: "array",
      label: "Livrables",
      labels: { singular: "Livrable", plural: "Livrables" },
      fields: [{ name: "texte", type: "text", label: "Livrable", required: true }],
    },
    {
      type: "collapsible",
      label: "Tarifs",
      fields: [
        {
          type: "row",
          fields: [
            { name: "tarif_b2b", type: "text", label: "Tarif institutionnel (B2B)" },
            { name: "tarif_b2c", type: "text", label: "Tarif individuel (B2C)" },
          ],
        },
        {
          name: "tarif_devis",
          type: "text",
          label: "Mention « sur devis »",
          admin: { description: "Renseigner uniquement pour un module sans tarif en ligne." },
        },
        { name: "cta_label", type: "text", label: "Libellé du bouton", required: true },
      ],
    },
  ],
};

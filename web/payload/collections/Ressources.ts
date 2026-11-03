import type { CollectionConfig } from "payload";
import { connecte } from "../access";
import { options } from "./MessagesContact";
import { NIVEAU_CODE } from "@/lib/libelles";
import { revaliderChemins } from "../revalidation";

/**
 * Arsenal opérationnel du Laboratoire Doctrinal : Working Papers et pièces
 * opératoires. Le résumé est en accès libre ; le PDF intégral est servi par
 * /api/download/<ressource_id> aux détenteurs d'un code de niveau suffisant,
 * une fois la ressource marquée disponible.
 */
export const Ressources: CollectionConfig = {
  slug: "ressources",
  labels: { singular: "Ressource", plural: "Ressources (Laboratoire)" },
  admin: {
    useAsTitle: "reference",
    group: "Laboratoire",
    defaultColumns: ["reference", "categorie", "niveau_requis", "is_available"],
  },
  defaultSort: "ordre",
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  hooks: {
    afterChange: [() => revaliderChemins(["/laboratoire"])],
    afterDelete: [() => revaliderChemins(["/laboratoire"])],
  },
  fields: [
    {
      name: "ressource_id",
      type: "text",
      label: "Identifiant",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Clé stable (ex. wp_01) — sert à l'URL de téléchargement. Ne pas renommer.",
      },
    },
    {
      name: "categorie",
      type: "select",
      label: "Catégorie",
      required: true,
      options: [
        { value: "working_paper", label: "Working Paper" },
        { value: "piece_operatoire", label: "Pièce opératoire" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "ordre", type: "number", label: "Ordre", defaultValue: 0, admin: { position: "sidebar" } },
    {
      name: "niveau_requis",
      type: "select",
      label: "Niveau requis",
      required: true,
      options: options(NIVEAU_CODE),
      admin: { position: "sidebar" },
    },
    {
      name: "is_available",
      type: "checkbox",
      label: "Téléchargement disponible",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "fichier",
      type: "upload",
      label: "PDF intégral",
      relationTo: "documents",
      admin: {
        position: "sidebar",
        description: "Sans fichier, un document d'attente est servi.",
      },
    },
    { name: "reference", type: "text", label: "Référence", required: true },
    { name: "titre", type: "text", label: "Titre", required: true },
    {
      type: "row",
      fields: [
        { name: "classification", type: "text", label: "Classification", required: true },
        { name: "volume", type: "text", label: "Volume", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "statut", type: "text", label: "Statut", required: true },
        { name: "soumission", type: "text", label: "Soumission" },
      ],
    },
    { name: "resume_label", type: "text", label: "Intitulé du résumé", required: true },
    {
      name: "resume",
      type: "array",
      label: "Résumé (paragraphes)",
      labels: { singular: "Paragraphe", plural: "Paragraphes" },
      fields: [{ name: "texte", type: "textarea", label: "Paragraphe", required: true }],
    },
    {
      name: "concepts_mobilises",
      type: "array",
      label: "Concepts mobilisés",
      labels: { singular: "Concept", plural: "Concepts" },
      fields: [{ name: "texte", type: "text", label: "Concept", required: true }],
    },
  ],
};

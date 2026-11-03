import path from "path";
import type { CollectionConfig } from "payload";
import { connecte } from "../access";

/**
 * PDF intégraux protégés (Working Papers, guide, arrêt). Stockés HORS de
 * `public/` : seul le back-office les lit directement ; les visiteurs passent
 * par /api/download/<ressource>, qui vérifie le code d'accès.
 *
 * DOCUMENTS_DIR doit pointer sur un volume persistant en production.
 */
export const DOCUMENTS_DIR =
  process.env.DOCUMENTS_DIR ?? path.resolve(process.cwd(), "protected/documents");

export const Documents: CollectionConfig = {
  slug: "documents",
  labels: { singular: "Document protégé", plural: "Documents protégés" },
  admin: { group: "Laboratoire", useAsTitle: "filename" },
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  upload: {
    staticDir: DOCUMENTS_DIR,
    mimeTypes: ["application/pdf"],
  },
  fields: [{ name: "description", type: "text", label: "Description" }],
};

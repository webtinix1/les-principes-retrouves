import path from "path";
import type { CollectionConfig, CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { connecte } from "../access";
import { revaliderChemins } from "../revalidation";

/**
 * Images du blog (couvertures et illustrations). Stockées sur le volume
 * persistant (/app/data/medias en production) et servies publiquement par
 * /api/medias/file/<fichier>.
 */
export const MEDIAS_DIR = process.env.MEDIAS_DIR ?? path.resolve(process.cwd(), "data/medias");

export const Medias: CollectionConfig = {
  slug: "medias",
  labels: { singular: "Image", plural: "Images" },
  admin: { group: "Blog", useAsTitle: "alt", defaultColumns: ["filename", "alt", "createdAt"] },
  access: { read: () => true, create: connecte, update: connecte, delete: connecte },
  upload: {
    staticDir: MEDIAS_DIR,
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    imageSizes: [{ name: "carte", width: 800, withoutEnlargement: true }],
    adminThumbnail: "carte",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Description de l’image (accessibilité)",
      required: true,
      maxLength: 200,
    },
  ],
};

/** Adresse lisible d'un article : « Les principes retrouvés ! » → « les-principes-retrouves ». */
export function slugifier(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

type DocArticle = { slug?: string | null };

const revaliderArticle: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  const chemins = ["/", "/blog", `/blog/${(doc as DocArticle).slug}`];
  const avant = (previousDoc as DocArticle | undefined)?.slug;
  if (avant && avant !== (doc as DocArticle).slug) chemins.push(`/blog/${avant}`);
  revaliderChemins(chemins);
  return doc;
};

const revaliderSuppression: CollectionAfterDeleteHook = ({ doc }) => {
  revaliderChemins(["/", "/blog", `/blog/${(doc as DocArticle).slug}`]);
  return doc;
};

/**
 * Articles du blog. Le Fronton met en avant trois articles publiés : ceux
 * cochés « Mis en avant » (les plus récents d'abord), complétés au besoin par
 * les derniers parus. Tous les articles publiés figurent sur /blog.
 */
export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: "Article", plural: "Articles" },
  admin: {
    group: "Blog",
    useAsTitle: "titre",
    defaultColumns: ["titre", "statut", "mis_en_avant", "date_publication"],
    description:
      "Seuls les articles « Publié » apparaissent sur le site. Le Fronton affiche 3 articles : ceux cochés « Mis en avant », complétés par les plus récents.",
  },
  defaultSort: "-date_publication",
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && typeof data.titre === "string") data.slug = slugifier(data.titre);
        else if (data?.slug) data.slug = slugifier(String(data.slug));
        return data;
      },
    ],
    afterChange: [revaliderArticle],
    afterDelete: [revaliderSuppression],
  },
  fields: [
    { name: "titre", type: "text", label: "Titre", required: true, maxLength: 200 },
    {
      name: "chapo",
      type: "textarea",
      label: "Résumé (chapô)",
      required: true,
      maxLength: 400,
      admin: { description: "Deux ou trois phrases, affichées sur le Fronton et la liste du blog." },
    },
    { name: "image", type: "upload", relationTo: "medias", label: "Image de couverture" },
    { name: "corps", type: "richText", label: "Texte de l’article", required: true },
    {
      name: "statut",
      type: "select",
      label: "Statut",
      required: true,
      defaultValue: "brouillon",
      options: [
        { label: "Brouillon", value: "brouillon" },
        { label: "Publié", value: "publie" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "mis_en_avant",
      type: "checkbox",
      label: "Mis en avant sur le Fronton",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "date_publication",
      type: "date",
      label: "Date de publication",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" } },
    },
    {
      name: "auteur",
      type: "text",
      label: "Auteur",
      maxLength: 120,
      admin: { position: "sidebar" },
    },
    {
      name: "slug",
      type: "text",
      label: "Adresse (/blog/…)",
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "Rempli automatiquement depuis le titre." },
    },
  ],
};

import type { Field, GlobalConfig } from "payload";
import { cheminsOuvrage } from "@/content/lectures";
import { connecte } from "../access";
import { revaliderChemins } from "../revalidation";

/**
 * Les deux tomes — métadonnées des recueils de lecture libre : étiquette,
 * titre, présentation, parties du sommaire et plan complet. Les textes
 * eux-mêmes sont dans la collection « Textes des tomes ».
 *
 * Amorcé au premier démarrage depuis `content/lectures/index.ts` (TOME_I,
 * TOME_II), qui reste la source de repli quand la base est injoignable.
 */

function tome(nom: "tome_i" | "tome_ii", libelle: string, slugTome: string): Field {
  return {
    name: nom,
    type: "group",
    label: libelle,
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "etiquette",
            type: "text",
            label: "Étiquette",
            admin: { width: "30%", placeholder: "ex. Tome I" },
          },
          { name: "titre", type: "text", label: "Titre", admin: { width: "70%" } },
        ],
      },
      { name: "sous_titre", type: "textarea", label: "Sous-titre" },
      {
        name: "presentation",
        type: "array",
        label: "Présentation (sommaire du tome)",
        labels: { singular: "Paragraphe", plural: "Paragraphes" },
        admin: {
          description: "Paragraphes d’introduction du sommaire. Le premier sert aussi de description pour Google.",
        },
        fields: [{ name: "texte", type: "textarea", label: "Paragraphe", required: true }],
      },
      {
        name: "parties",
        type: "array",
        label: "Parties du sommaire",
        labels: { singular: "Partie", plural: "Parties" },
        admin: {
          description: `Groupes de textes, dans l’ordre. Un texte est rangé dans une partie par son numéro (champ « Partie » de « Textes des tomes » : 1 = la première ligne ci-dessous). Sommaire : /ouvrage/${slugTome}.`,
        },
        fields: [
          { name: "titre", type: "text", label: "Titre", required: true },
          { name: "description", type: "textarea", label: "Description" },
        ],
      },
      {
        name: "plan",
        type: "array",
        label: "Plan complet du tome",
        labels: { singular: "Ligne du plan", plural: "Lignes du plan" },
        admin: {
          description:
            "Facultatif. Une ligne commençant par « Partie » ouvre un groupe. Pour un chapitre en accès libre, indiquez l’adresse (slug) de son texte.",
        },
        fields: [
          {
            type: "row",
            fields: [
              { name: "titre", type: "text", label: "Titre", required: true, admin: { width: "70%" } },
              {
                name: "libre",
                type: "text",
                label: "Texte en accès libre (slug)",
                admin: { width: "30%", placeholder: "ex. chapitre-i", description: "Vide = réservé à l’ouvrage." },
              },
            ],
          },
        ],
      },
    ],
  };
}

export const Recueils: GlobalConfig = {
  slug: "recueils",
  label: "Les deux tomes",
  admin: {
    group: "Ouvrage",
    description:
      "Titres, présentation, parties et plan des deux tomes en lecture libre. Laisser le titre d’un tome vide fait revenir ses textes d’origine.",
  },
  access: { read: connecte, update: connecte },
  versions: { max: 20 },
  hooks: {
    // L'Ouvrage, les sommaires et tous les textes des tomes.
    // (y compris les textes ajoutés dans le back-office, absents du code).
    afterChange: [
      async ({ req }) => {
        const chemins = new Set(cheminsOuvrage());
        try {
          const { docs } = await req.payload.find({
            collection: "textes-lecture",
            pagination: false,
            depth: 0,
            select: { tome: true, slug: true },
            req,
          });
          for (const d of docs) chemins.add(`/ouvrage/${d.tome}/${d.slug}`);
        } catch {
          /* collection indisponible : les chemins du code suffisent */
        }
        revaliderChemins([...chemins]);
      },
    ],
  },
  fields: [tome("tome_i", "Tome I", "tome-i"), tome("tome_ii", "Tome II", "tome-ii")],
};

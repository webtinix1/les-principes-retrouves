import type { Field, GlobalConfig, TextFieldSingleValidation } from "payload";
import { cheminsOuvrage } from "@/content/lectures";
import { connecte } from "../access";
import { revaliderChemins } from "../revalidation";

/**
 * Vente des ouvrages — liens d'achat des tomes (pages produit Chariow).
 *
 * L'auteur crée chaque tome comme produit sur Chariow, copie le lien de la
 * page produit et le colle ici. Tant qu'un lien est vide, aucun bouton
 * d'achat n'apparaît pour ce tome sur le site ; dès qu'il est renseigné, le
 * bouton « Acquérir le Tome … » s'affiche (L'Ouvrage, sommaire du tome,
 * fin de chaque texte en lecture libre) et ouvre la page Chariow.
 */

/** Lien vide accepté ; sinon une adresse https complète. */
const validerLien: TextFieldSingleValidation = (valeur) => {
  if (!valeur || !valeur.trim()) return true;
  try {
    const url = new URL(valeur.trim());
    return url.protocol === "https:" || "Le lien doit commencer par https://";
  } catch {
    return "Collez l’adresse complète de la page produit, par exemple https://…";
  }
};

function tome(nom: "tome_i" | "tome_ii", libelle: string): Field {
  return {
    name: nom,
    type: "group",
    label: libelle,
    fields: [
      {
        name: "lien_achat",
        type: "text",
        label: "Lien d’achat (page produit Chariow)",
        validate: validerLien,
        admin: {
          placeholder: "https://…",
          description:
            "Laisser vide tant que le produit n’est pas en vente : le bouton d’achat reste masqué.",
        },
      },
      {
        type: "row",
        fields: [
          {
            name: "prix",
            type: "text",
            label: "Prix affiché (facultatif)",
            admin: { placeholder: "ex. 35 €", width: "50%" },
          },
          {
            name: "format",
            type: "text",
            label: "Format (facultatif)",
            admin: { placeholder: "ex. Livre numérique (PDF)", width: "50%" },
          },
        ],
      },
    ],
  };
}

export const VenteOuvrages: GlobalConfig = {
  slug: "vente-ouvrages",
  label: "Vente des ouvrages",
  admin: {
    group: "Boutique",
    description:
      "Liens d’achat des tomes sur Chariow. Un bouton « Acquérir » apparaît sur le site pour chaque tome dont le lien est renseigné.",
  },
  access: { read: connecte, update: connecte },
  versions: { max: 20 },
  hooks: {
    // L'Ouvrage, les sommaires et tous les textes des tomes.
    afterChange: [() => revaliderChemins(cheminsOuvrage())],
  },
  fields: [tome("tome_i", "Tome I — L’Organon"), tome("tome_ii", "Tome II")],
};

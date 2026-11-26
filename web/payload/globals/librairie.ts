import type { GlobalConfig } from "payload";
import { connecte } from "../access";
import { revaliderChemins } from "../revalidation";

/**
 * Librairie › Réglages — grille des frais de livraison par zone, taux de
 * conversion euro → franc CFA (paiement en XAF) et adresse de notification.
 */
export const LibrairieReglages: GlobalConfig = {
  slug: "librairie-reglages",
  label: "Librairie — réglages",
  admin: {
    group: "Librairie",
    description: "Frais de livraison par zone. Une zone sans frais renseignés n’est pas proposée à la commande.",
  },
  access: { read: connecte, update: connecte },
  hooks: { afterChange: [() => revaliderChemins(["/librairie", "/librairie/tome-i", "/librairie/tome-ii"])] },
  fields: [
    {
      name: "zones",
      type: "array",
      label: "Zones de livraison",
      labels: { singular: "Zone", plural: "Zones" },
      admin: { initCollapsed: true },
      fields: [
        { name: "nom", type: "text", label: "Nom de la zone", required: true },
        {
          name: "pays",
          type: "text",
          label: "Pays (codes ISO séparés par des virgules)",
          required: true,
          admin: { description: "Ex. CG ou FR,BE,CH. Le code * désigne tous les autres pays (à placer en dernière zone)." },
        },
        {
          type: "row",
          fields: [
            { name: "frais_premier", type: "number", label: "Frais — premier exemplaire (€)", min: 0 },
            { name: "frais_supplementaire", type: "number", label: "Frais — exemplaire supplémentaire (€)", min: 0 },
          ],
        },
        { name: "delai", type: "text", label: "Délai de livraison indicatif", admin: { placeholder: "ex. 7 à 14 jours après expédition" } },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "taux_xaf",
          type: "number",
          label: "Francs CFA pour 1 € (paiement en XAF)",
          defaultValue: 655.957,
          required: true,
          admin: { description: "Parité fixe du franc CFA (BEAC) : 655,957." },
        },
        {
          name: "email_notification",
          type: "email",
          label: "E-mail de notification des commandes",
          admin: { description: "Vide = adresse du formulaire de contact." },
        },
      ],
    },
  ],
};

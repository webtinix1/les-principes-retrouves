import type { CollectionConfig, Field, TextFieldSingleValidation } from "payload";
import { connecte } from "../access";
import { revaliderChemins } from "../revalidation";
import {
  AUTEUR_DESIGNATION,
  STATUT_COMMANDE_OUVRAGE,
  STATUT_PAIEMENT,
  STATUT_RECLAMATION,
  STATUT_VENTE,
  TOMES,
  options,
} from "@/lib/librairie/statuts";

/**
 * Librairie (Lot 3) — administration des produits, commandes imprimées,
 * paiements, ventes numériques (Chariow), acheteurs et réclamations.
 * Tout est réservé aux comptes du back-office ; le site écrit via l'API locale.
 */

const acces = { read: connecte, create: connecte, update: connecte, delete: connecte };
const GROUPE = "Librairie";

const lienHttps: TextFieldSingleValidation = (valeur) => {
  if (!valeur || !valeur.trim()) return true;
  try {
    return new URL(valeur.trim()).protocol === "https:" || "Le lien doit commencer par https://";
  } catch {
    return "Collez l’adresse complète, par exemple https://…";
  }
};

const zone = (name: string, label: string, rows = 4): Field => ({
  name,
  type: "textarea",
  label,
  admin: { rows },
});

export const Ouvrages: CollectionConfig = {
  slug: "ouvrages",
  typescript: { interface: "OuvrageProduit" },
  labels: { singular: "Ouvrage (produit)", plural: "Ouvrages (produits)" },
  admin: {
    useAsTitle: "titre_complet",
    group: GROUPE,
    defaultColumns: ["tome", "titre_complet", "updatedAt"],
    description:
      "Fiche commerciale de chaque tome : titre, prix des deux formats, liens et conditions. La présentation et l’apport doctrinal se modifient dans Pages › Les ouvrages.",
  },
  access: acces,
  hooks: {
    afterChange: [() => revaliderChemins(["/librairie", "/librairie/tome-i", "/librairie/tome-ii"])],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "tome",
          type: "select",
          label: "Tome",
          required: true,
          unique: true,
          options: options(TOMES),
          admin: { width: "30%" },
        },
        {
          name: "reference_editoriale",
          type: "text",
          label: "Référence éditoriale",
          admin: { width: "70%", placeholder: "ex. V128" },
        },
      ],
    },
    { name: "titre_complet", type: "text", label: "Titre complet", required: true },
    { name: "sous_titre", type: "text", label: "Sous-titre (facultatif)" },
    {
      name: "auteur",
      type: "text",
      label: "Désignation de l’auteur",
      required: true,
      defaultValue: AUTEUR_DESIGNATION,
    },
    {
      type: "collapsible",
      label: "Couverture",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "couverture_url",
          type: "text",
          label: "Fichier de la couverture",
          admin: { description: "Chemin dans le site, ex. /v16/couverture-tome-i.webp" },
        },
        {
          type: "row",
          fields: [
            { name: "couverture_largeur", type: "number", label: "Largeur (px)" },
            { name: "couverture_hauteur", type: "number", label: "Hauteur (px)" },
          ],
        },
      ],
    },
    {
      name: "bibliographie",
      type: "array",
      label: "Informations bibliographiques",
      labels: { singular: "Information", plural: "Informations" },
      admin: { description: "Ex. Éditeur, date, pagination, ISBN — uniquement ce qui est établi." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "libelle", type: "text", label: "Libellé", required: true },
            { name: "valeur", type: "text", label: "Valeur", required: true },
          ],
        },
      ],
    },
    {
      name: "numerique",
      type: "group",
      label: "Édition numérique (PDF) — vendue sur Chariow",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "prix",
              type: "number",
              label: "Prix affiché (€)",
              min: 0,
              admin: { description: "Doit être identique au prix du produit dans Chariow." },
            },
            {
              name: "produit_chariow",
              type: "text",
              label: "Identifiant du produit Chariow",
              admin: { description: "Ex. prd_xxxx. Rattache les ventes reçues de Chariow à ce tome." },
            },
          ],
        },
        {
          name: "lien_chariow",
          type: "text",
          label: "Lien d’achat (page produit Chariow)",
          validate: lienHttps,
          admin: {
            placeholder: "https://…",
            description:
              "Laisser vide tant que le produit n’est pas en vente. À défaut, le lien saisi dans Boutique › Vente des ouvrages est utilisé.",
          },
        },
        zone("note_interne", "Note interne (version du PDF téléversé dans Chariow, date de remplacement…)", 2),
      ],
    },
    {
      name: "imprime",
      type: "group",
      label: "Édition imprimée — impression à la demande",
      fields: [
        {
          type: "row",
          fields: [
            { name: "actif", type: "checkbox", label: "Ouvrir les commandes", defaultValue: false },
            {
              name: "prix",
              type: "number",
              label: "Prix de l’exemplaire (€)",
              min: 0,
              admin: { description: "Vide = « Prix non encore déterminé » : aucune commande possible." },
            },
            { name: "poids_g", type: "number", label: "Poids (g)", min: 0 },
          ],
        },
        {
          name: "delai_production",
          type: "text",
          label: "Délai d’impression indicatif",
          admin: { placeholder: "ex. 10 à 15 jours ouvrés" },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Conditions d’achat et de livraison (propres au tome ; vide = conditions générales de la librairie)",
      admin: { initCollapsed: true },
      fields: [
        zone("conditions_numerique", "Conditions — édition numérique"),
        zone("conditions_imprime", "Conditions — édition imprimée"),
        zone("conditions_livraison", "Livraison"),
      ],
    },
  ],
};

export const Acheteurs: CollectionConfig = {
  slug: "acheteurs",
  typescript: { interface: "AcheteurLibrairie" },
  labels: { singular: "Acheteur", plural: "Acheteurs" },
  admin: {
    useAsTitle: "email",
    group: GROUPE,
    defaultColumns: ["email", "nom", "pays", "origine", "updatedAt"],
  },
  defaultSort: "-updatedAt",
  access: acces,
  fields: [
    { name: "email", type: "email", label: "E-mail", required: true, unique: true, index: true },
    {
      type: "row",
      fields: [
        { name: "nom", type: "text", label: "Nom" },
        { name: "telephone", type: "text", label: "Téléphone" },
        { name: "pays", type: "text", label: "Pays" },
      ],
    },
    {
      name: "origine",
      type: "select",
      label: "Origine",
      options: [
        { value: "imprime", label: "Commande imprimée" },
        { value: "numerique", label: "Vente numérique (Chariow)" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "nombre_achats", type: "number", label: "Nombre d’achats", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};

export const CommandesOuvrages: CollectionConfig = {
  slug: "commandes-ouvrages",
  typescript: { interface: "CommandeOuvrage" },
  labels: { singular: "Commande d’ouvrage imprimé", plural: "Commandes d’ouvrages imprimés" },
  admin: {
    useAsTitle: "numero",
    group: GROUPE,
    defaultColumns: ["numero", "tome", "quantite", "total", "statut", "buyer_nom", "createdAt"],
    description: "Ordre des statuts : Payée › En impression › Expédiée › Livrée. Renseigner le suivi à l’expédition.",
  },
  defaultSort: "-createdAt",
  access: acces,
  hooks: {
    // Courriel à l'acheteur au passage à « Expédiée » (une seule fois).
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        if (operation === "update" && doc.statut === "expediee" && previousDoc?.statut !== "expediee") {
          const { envoyerExpedition } = await import("@/lib/librairie/commande");
          await envoyerExpedition(doc);
        }
        return doc;
      },
    ],
  },
  fields: [
    {
      name: "statut",
      type: "select",
      label: "Statut",
      required: true,
      defaultValue: "en_attente_paiement",
      options: options(STATUT_COMMANDE_OUVRAGE),
      admin: { position: "sidebar" },
    },
    {
      name: "numero",
      type: "text",
      label: "Numéro de commande",
      unique: true,
      index: true,
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      type: "row",
      fields: [
        { name: "tome", type: "select", label: "Tome", required: true, options: options(TOMES) },
        { name: "titre", type: "text", label: "Titre commandé", required: true },
        { name: "quantite", type: "number", label: "Quantité", required: true, min: 1 },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "prix_unitaire", type: "number", label: "Prix unitaire (€)", required: true },
        { name: "frais_livraison", type: "number", label: "Frais de livraison (€)", required: true },
        { name: "total", type: "number", label: "Total (€)", required: true },
      ],
    },
    {
      type: "collapsible",
      label: "Acheteur",
      fields: [
        {
          type: "row",
          fields: [
            { name: "buyer_nom", type: "text", label: "Nom", required: true },
            { name: "buyer_email", type: "email", label: "E-mail", required: true },
            { name: "buyer_telephone", type: "text", label: "Téléphone", required: true },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Adresse de livraison",
      fields: [
        { name: "adresse_ligne1", type: "text", label: "Adresse", required: true },
        { name: "adresse_ligne2", type: "text", label: "Complément" },
        {
          type: "row",
          fields: [
            { name: "code_postal", type: "text", label: "Code postal" },
            { name: "ville", type: "text", label: "Ville", required: true },
            { name: "pays", type: "text", label: "Pays (ISO)", required: true },
          ],
        },
        { name: "zone_livraison", type: "text", label: "Zone de livraison appliquée" },
      ],
    },
    {
      type: "collapsible",
      label: "Paiement",
      fields: [
        {
          type: "row",
          fields: [
            { name: "payment_provider", type: "text", label: "Prestataire" },
            { name: "payment_ref", type: "text", label: "Référence de paiement", index: true },
          ],
        },
        { name: "date_paiement", type: "date", label: "Payée le", admin: { date: { pickerAppearance: "dayAndTime" } } },
      ],
    },
    {
      type: "collapsible",
      label: "Suivi d’expédition",
      fields: [
        {
          type: "row",
          fields: [
            { name: "transporteur", type: "text", label: "Transporteur" },
            { name: "numero_suivi", type: "text", label: "Numéro de suivi" },
            { name: "date_expedition", type: "date", label: "Expédiée le" },
          ],
        },
        zone("note_interne", "Note interne (imprimeur, incident…)", 3),
      ],
    },
    {
      type: "row",
      fields: [
        { name: "courriel_acheteur", type: "text", label: "Courriel à l’acheteur", admin: { readOnly: true } },
        { name: "courriel_auteur", type: "text", label: "Courriel à Gaudéric MAMBOU", admin: { readOnly: true } },
      ],
    },
  ],
};

export const PaiementsOuvrages: CollectionConfig = {
  slug: "paiements-ouvrages",
  typescript: { interface: "PaiementOuvrage" },
  labels: { singular: "Paiement", plural: "Paiements" },
  admin: {
    useAsTitle: "reference",
    group: GROUPE,
    defaultColumns: ["reference", "prestataire", "montant", "devise", "statut", "createdAt"],
  },
  defaultSort: "-createdAt",
  access: acces,
  fields: [
    {
      name: "statut",
      type: "select",
      label: "Statut",
      required: true,
      defaultValue: "initie",
      options: options(STATUT_PAIEMENT),
      admin: { position: "sidebar" },
    },
    { name: "reference", type: "text", label: "Référence (transaction)", required: true, unique: true, index: true },
    { name: "commande", type: "relationship", relationTo: "commandes-ouvrages", label: "Commande", required: true },
    {
      type: "row",
      fields: [
        { name: "prestataire", type: "text", label: "Prestataire", required: true },
        { name: "montant", type: "number", label: "Montant", required: true },
        { name: "devise", type: "text", label: "Devise", required: true },
      ],
    },
    { name: "moyen", type: "text", label: "Moyen de paiement (si connu)" },
    { name: "detail", type: "textarea", label: "Réponse du prestataire", admin: { readOnly: true } },
  ],
};

export const VentesNumeriques: CollectionConfig = {
  slug: "ventes-numeriques",
  typescript: { interface: "VenteNumerique" },
  labels: { singular: "Vente numérique (Chariow)", plural: "Ventes numériques (Chariow)" },
  admin: {
    useAsTitle: "vente_id",
    group: GROUPE,
    defaultColumns: ["vente_id", "tome", "montant", "devise", "statut", "buyer_email", "date_vente"],
    description:
      "Ventes reçues automatiquement de Chariow (notifications Pulses). La référence reste le tableau de bord Chariow.",
  },
  defaultSort: "-date_vente",
  access: acces,
  fields: [
    {
      name: "statut",
      type: "select",
      label: "Statut",
      required: true,
      defaultValue: "payee",
      options: options(STATUT_VENTE),
      admin: { position: "sidebar" },
    },
    { name: "vente_id", type: "text", label: "Identifiant de vente Chariow", required: true, unique: true, index: true },
    {
      name: "livraison_id",
      type: "text",
      label: "Dernière notification traitée",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      type: "row",
      fields: [
        { name: "tome", type: "select", label: "Tome", options: options(TOMES) },
        { name: "produit", type: "text", label: "Produit Chariow" },
        { name: "date_vente", type: "date", label: "Date", admin: { date: { pickerAppearance: "dayAndTime" } } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "montant", type: "number", label: "Montant payé" },
        { name: "devise", type: "text", label: "Devise" },
        { name: "frais", type: "number", label: "Frais Chariow" },
        { name: "net", type: "number", label: "Net dû" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "buyer_nom", type: "text", label: "Acheteur" },
        { name: "buyer_email", type: "email", label: "E-mail" },
        { name: "buyer_pays", type: "text", label: "Pays" },
      ],
    },
  ],
};

export const Reclamations: CollectionConfig = {
  slug: "reclamations",
  typescript: { interface: "ReclamationLibrairie" },
  labels: { singular: "Réclamation", plural: "Réclamations" },
  admin: { useAsTitle: "objet", group: GROUPE, defaultColumns: ["objet", "nom", "email", "statut", "createdAt"] },
  defaultSort: "-createdAt",
  access: acces,
  fields: [
    {
      name: "statut",
      type: "select",
      label: "Statut",
      required: true,
      defaultValue: "nouvelle",
      options: options(STATUT_RECLAMATION),
      admin: { position: "sidebar" },
    },
    {
      type: "row",
      fields: [
        { name: "nom", type: "text", label: "Nom", required: true },
        { name: "email", type: "email", label: "E-mail", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "reference", type: "text", label: "Numéro de commande ou de vente" },
        { name: "objet", type: "text", label: "Objet", required: true },
      ],
    },
    { name: "message", type: "textarea", label: "Message", required: true },
    zone("reponse_interne", "Suite donnée (note interne)", 3),
  ],
};

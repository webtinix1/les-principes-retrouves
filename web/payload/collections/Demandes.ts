import type { CollectionConfig, Field } from "payload";
import { accesAdministrateur, accesSecretariat } from "../access";
import { NATURES_SERVICE, STATUTS_DEMANDE, TYPES_COLLABORATION } from "@/lib/espace-libelles";
import { genererReference } from "@/lib/espace/reference";

const verrou = { update: () => false, create: () => false };

/** Champs communs aux demandes de service et aux propositions de collaboration. */
function champsCommuns(prefixe: "SRV" | "COL"): Field[] {
  return [
    {
      name: "reference",
      type: "text",
      label: "Identifiant de la demande",
      unique: true,
      index: true,
      admin: { position: "sidebar", readOnly: true },
      hooks: { beforeValidate: [({ value }) => value || genererReference(prefixe)] },
    },
    {
      name: "statut",
      type: "select",
      label: "Statut de traitement",
      required: true,
      defaultValue: "nouvelle",
      options: STATUTS_DEMANDE.map((o) => ({ value: o.value, label: o.label })),
      admin: { position: "sidebar" },
    },
    {
      name: "lecteur",
      type: "relationship",
      relationTo: "lecteurs",
      label: "Compte lecteur",
      index: true,
      access: verrou,
      admin: { position: "sidebar", readOnly: true, description: "Vide si la demande a été envoyée sans compte." },
    },
    { name: "nom", type: "text", label: "Nom et prénom(s)", maxLength: 250, access: verrou },
    { name: "email", type: "email", label: "Adresse électronique", access: verrou },
  ];
}

const apres: Field[] = [
  {
    name: "note_interne",
    type: "textarea",
    label: "Note interne (jamais communiquée)",
    admin: { description: "Suivi du traitement, réservé à l'administration." },
  },
  {
    name: "anonymise",
    type: "checkbox",
    label: "Anonymisée",
    defaultValue: false,
    access: verrou,
    admin: { position: "sidebar", readOnly: true, description: "Cochée après suppression du compte lié." },
  },
];

const acces = {
  read: accesSecretariat,
  create: () => false, // création uniquement par les routes du site (API locale)
  update: accesSecretariat,
  delete: accesAdministrateur,
};

export const DemandesService: CollectionConfig = {
  slug: "demandes-service",
  labels: { singular: "Demande de service", plural: "Demandes de service" },
  admin: {
    useAsTitle: "reference",
    group: "Espace utilisateurs",
    defaultColumns: ["reference", "nature", "nom", "email", "statut", "createdAt"],
    listSearchableFields: ["reference", "nom", "email"],
  },
  defaultSort: "-createdAt",
  access: acces,
  fields: [
    ...champsCommuns("SRV"),
    {
      name: "nature",
      type: "select",
      label: "Nature de la demande",
      required: true,
      options: NATURES_SERVICE.map((o) => ({ value: o.value, label: o.label })),
      access: verrou,
    },
    { name: "message", type: "textarea", label: "Message", required: true, maxLength: 5000, access: verrou },
    ...apres,
  ],
};

export const PropositionsCollaboration: CollectionConfig = {
  slug: "propositions-collaboration",
  labels: { singular: "Proposition de collaboration", plural: "Propositions de collaboration" },
  admin: {
    useAsTitle: "reference",
    group: "Espace utilisateurs",
    defaultColumns: ["reference", "type_collaboration", "nom", "email", "statut", "createdAt"],
    listSearchableFields: ["reference", "nom", "email", "institution"],
  },
  defaultSort: "-createdAt",
  access: acces,
  fields: [
    ...champsCommuns("COL"),
    { name: "institution", type: "text", label: "Institution", maxLength: 200, access: verrou },
    {
      name: "type_collaboration",
      type: "select",
      label: "Type de collaboration",
      required: true,
      options: TYPES_COLLABORATION.map((o) => ({ value: o.value, label: o.label })),
      access: verrou,
    },
    { name: "presentation", type: "textarea", label: "Présentation de la proposition", required: true, maxLength: 5000, access: verrou },
    ...apres,
  ],
};

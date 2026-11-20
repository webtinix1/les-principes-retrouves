import type { Block, CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from "payload";
import { cheminsOuvrage } from "@/content/lectures";
import { connecte } from "../access";
import { revaliderChemins } from "../revalidation";

/**
 * Textes des tomes en lecture libre (/ouvrage/<tome>/<texte>) : un document
 * par texte, découpé en blocs (paragraphes, intertitres, formules, listes,
 * citations, notes). Les métadonnées des tomes (titres, présentation, parties,
 * plan) sont dans le global « Les deux tomes » (payload/globals/recueils.ts).
 *
 * Amorcée au premier démarrage depuis `content/lectures/*` (payload/seed.ts),
 * qui reste la source de repli quand la base est injoignable (build).
 */

type DocTexte = { tome?: string | null; slug?: string | null };

const cheminTexte = (d?: DocTexte | null) => (d?.tome && d?.slug ? [`/ouvrage/${d.tome}/${d.slug}`] : []);

const apresEnregistrement: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  revaliderChemins([
    ...new Set([
      ...cheminsOuvrage(),
      `/ouvrage/${doc.tome}`,
      ...cheminTexte(doc as DocTexte),
      ...cheminTexte(previousDoc as DocTexte),
    ]),
  ]);
};

const apresSuppression: CollectionAfterDeleteHook = ({ doc }) => {
  revaliderChemins([...new Set([...cheminsOuvrage(), ...cheminTexte(doc as DocTexte)])]);
};

/* ── Blocs d'un texte (miroir de BlocLecture, content/lectures/types.ts) ── */

const paragraphe: Block = {
  slug: "paragraphe",
  labels: { singular: "Paragraphe", plural: "Paragraphes" },
  fields: [{ name: "texte", type: "textarea", label: "Texte", required: true }],
};

const intertitre: Block = {
  slug: "intertitre",
  labels: { singular: "Intertitre", plural: "Intertitres" },
  fields: [
    { name: "texte", type: "text", label: "Intertitre", required: true },
    {
      type: "row",
      fields: [
        {
          name: "niveau",
          type: "select",
          label: "Niveau",
          defaultValue: "3",
          options: [
            { label: "Section (niveau 3)", value: "3" },
            { label: "Sous-section (niveau 4)", value: "4" },
          ],
          admin: { width: "50%" },
        },
        {
          name: "ancre",
          type: "text",
          label: "Ancre (#…)",
          admin: {
            width: "50%",
            description:
              "Identifiant du lien direct vers cette section (ex. 1-le-probleme). Les sections de niveau 3 avec ancre forment le sommaire « Dans ce texte ».",
          },
        },
      ],
    },
  ],
};

const formule: Block = {
  slug: "formule",
  labels: { singular: "Formule", plural: "Formules" },
  fields: [
    {
      name: "texte",
      type: "text",
      label: "Formule",
      required: true,
      admin: { description: "Formule ou chaîne opératoire (ex. K → M → K′ → Σ), affichée en police à chasse fixe." },
    },
  ],
};

const liste: Block = {
  slug: "liste",
  labels: { singular: "Liste", plural: "Listes" },
  fields: [
    { name: "ordonnee", type: "checkbox", label: "Liste numérotée", defaultValue: false },
    {
      name: "items",
      type: "array",
      label: "Éléments",
      labels: { singular: "Élément", plural: "Éléments" },
      minRows: 1,
      fields: [{ name: "texte", type: "textarea", label: "Élément", required: true }],
    },
  ],
};

const citation: Block = {
  slug: "citation",
  labels: { singular: "Citation", plural: "Citations" },
  fields: [
    {
      name: "texte",
      type: "textarea",
      label: "Citation",
      required: true,
      admin: { description: "Sans guillemets : ils sont ajoutés automatiquement." },
    },
    { name: "source", type: "text", label: "Source" },
  ],
};

const note: Block = {
  slug: "note",
  labels: { singular: "Note", plural: "Notes" },
  fields: [{ name: "texte", type: "textarea", label: "Note", required: true }],
};

export const TextesLecture: CollectionConfig = {
  slug: "textes-lecture",
  labels: { singular: "Texte d’un tome", plural: "Textes des tomes" },
  admin: {
    useAsTitle: "titre",
    group: "Ouvrage",
    defaultColumns: ["titre", "tome", "partie", "ordre", "slug"],
    description:
      "Textes en lecture libre des tomes. Leur place dans le sommaire est donnée par le tome, la partie et l’ordre ; les titres des parties se modifient dans « Les deux tomes ».",
  },
  defaultSort: "ordre",
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  hooks: { afterChange: [apresEnregistrement], afterDelete: [apresSuppression] },
  // Deux tomes peuvent avoir un texte de même adresse (avant-propos…) :
  // l'adresse est unique au sein d'un tome.
  indexes: [{ fields: ["tome", "slug"], unique: true }],
  fields: [
    {
      name: "tome",
      type: "select",
      label: "Tome",
      required: true,
      index: true,
      options: [
        { label: "Tome I", value: "tome-i" },
        { label: "Tome II", value: "tome-ii" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "partie",
      type: "number",
      label: "Partie",
      required: true,
      defaultValue: 1,
      min: 1,
      admin: {
        position: "sidebar",
        step: 1,
        description:
          "Numéro de la partie du sommaire du tome (1 = première partie listée dans « Les deux tomes »). Tome II : 1 = Textes liminaires, 2 = Chapitres en accès libre.",
      },
    },
    {
      name: "ordre",
      type: "number",
      label: "Ordre",
      required: true,
      defaultValue: 0,
      admin: { position: "sidebar", step: 1, description: "Rang du texte au sein de sa partie (croissant)." },
    },
    {
      name: "slug",
      type: "text",
      label: "Adresse (slug)",
      required: true,
      index: true,
      admin: {
        position: "sidebar",
        description:
          "Fin de l’adresse de la page : /ouvrage/<tome>/<slug>. Minuscules, chiffres et tirets. Changer l’adresse casse les liens existants.",
      },
      validate: (valeur: string | null | undefined) =>
        !valeur || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(valeur) || "Minuscules, chiffres et tirets uniquement (ex. chapitre-i).",
    },
    { name: "titre", type: "text", label: "Titre", required: true },
    { name: "sous_titre", type: "text", label: "Sous-titre" },
    {
      type: "collapsible",
      label: "Exergue",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "exergue",
          type: "textarea",
          label: "Exergue",
          admin: { description: "Citation d’ouverture, sans guillemets. Laisser vide pour ne rien afficher." },
        },
        { name: "exergue_source", type: "text", label: "Source de l’exergue" },
      ],
    },
    {
      name: "blocs",
      type: "blocks",
      label: "Corps du texte",
      labels: { singular: "Bloc", plural: "Blocs" },
      blocks: [paragraphe, intertitre, formule, liste, citation, note],
    },
  ],
};

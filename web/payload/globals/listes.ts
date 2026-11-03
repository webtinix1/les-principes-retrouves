import type { Field } from "payload";
import { NIVEAUX, MOUVEMENT_ORGANIQUE, CANON, AUTORITES } from "@/content/institution";
import { NIVEAUX_ACCES, PROGRESSION } from "@/content/working-papers";

/**
 * Listes structurées portées par les globals de page (en plus des blocs de
 * texte du registre). Chaque liste :
 *  - est amorcée depuis les données d'origine du code (`content/*.ts`) ;
 *  - revient aux données d'origine si on la vide entièrement dans l'admin.
 *
 * NB : `id` est réservé par Payload dans les tableaux → `niveau_id`, `champ_id`.
 */

const texte = (label: string, required = true): Field => ({
  name: "texte",
  type: "textarea",
  label,
  required,
  admin: { rows: 2 },
});

export const LISTES_PAR_PAGE: Record<string, Field[]> = {
  institution: [
    {
      name: "niveaux",
      type: "array",
      label: "Architecture à sept niveaux",
      labels: { singular: "Niveau", plural: "Niveaux" },
      admin: { initCollapsed: true },
      fields: [
        {
          type: "row",
          fields: [
            { name: "numero", type: "text", label: "Numéro", required: true },
            { name: "niveau_id", type: "text", label: "Identifiant", required: true },
          ],
        },
        { name: "titre", type: "text", label: "Titre", required: true },
        { name: "fonction", type: "text", label: "Fonction", required: true },
        { name: "question_fondamentale", type: "text", label: "Question fondamentale", required: true },
        {
          name: "corps",
          type: "array",
          label: "Corps (paragraphes)",
          labels: { singular: "Paragraphe", plural: "Paragraphes" },
          fields: [texte("Paragraphe")],
        },
        { name: "equation", type: "text", label: "Équation (facultatif)" },
        {
          name: "liste",
          type: "array",
          label: "Liste (facultatif)",
          labels: { singular: "Élément", plural: "Éléments" },
          fields: [texte("Élément")],
        },
        { name: "maxime", type: "textarea", label: "Maxime (facultatif)", admin: { rows: 2 } },
      ],
    },
    {
      name: "mouvement_organique",
      type: "array",
      label: "Le mouvement organique",
      labels: { singular: "Élément", plural: "Éléments" },
      fields: [texte("Élément")],
    },
    {
      name: "champs_autorites",
      type: "array",
      label: "Autorités de convergence, par champ",
      labels: { singular: "Champ", plural: "Champs" },
      admin: { initCollapsed: true },
      fields: [
        {
          type: "row",
          fields: [
            { name: "champ_id", type: "text", label: "Identifiant", required: true },
            { name: "champ", type: "text", label: "Intitulé du champ", required: true },
          ],
        },
        {
          name: "autorites",
          type: "array",
          label: "Autorités",
          labels: { singular: "Autorité", plural: "Autorités" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "nom", type: "text", label: "Nom", required: true },
                { name: "origine", type: "text", label: "Origine", required: true },
              ],
            },
            { name: "motif", type: "textarea", label: "Motif", required: true, admin: { rows: 2 } },
          ],
        },
      ],
    },
    {
      name: "canon",
      type: "array",
      label: "Le Canon de la Découverte",
      labels: { singular: "Principe", plural: "Principes" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "numero", type: "number", label: "Numéro", required: true },
            { name: "titre", type: "text", label: "Titre", required: true },
          ],
        },
        { name: "glose", type: "textarea", label: "Glose", required: true, admin: { rows: 2 } },
      ],
    },
  ],
  laboratoire: [
    {
      name: "niveaux_acces",
      type: "array",
      label: "Politique d'accès — niveaux",
      labels: { singular: "Niveau", plural: "Niveaux" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "numero", type: "text", label: "Numéro", required: true },
            { name: "titre", type: "text", label: "Titre", required: true },
          ],
        },
        { name: "description", type: "textarea", label: "Description", required: true, admin: { rows: 3 } },
      ],
    },
    {
      name: "progression",
      type: "array",
      label: "Progression logique de l'arsenal",
      labels: { singular: "Étape", plural: "Étapes" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "reference", type: "text", label: "Référence", required: true },
            { name: "role", type: "text", label: "Rôle", required: true },
            { name: "prerequis", type: "text", label: "Prérequis", required: true },
          ],
        },
      ],
    },
  ],
};

const lignes = (a?: string[]) => (a ?? []).map((t) => ({ texte: t }));

/** Valeurs d'amorçage (données d'origine), par page puis par liste. */
export const AMORCE_LISTES: Record<string, Record<string, unknown[]>> = {
  institution: {
    niveaux: NIVEAUX.map((n) => ({
      numero: n.numero,
      niveau_id: n.id,
      titre: n.titre,
      fonction: n.fonction,
      question_fondamentale: n.question_fondamentale,
      corps: lignes(n.corps),
      equation: n.equation,
      liste: lignes(n.liste),
      maxime: n.maxime,
    })),
    mouvement_organique: lignes(MOUVEMENT_ORGANIQUE),
    champs_autorites: AUTORITES.map((c) => ({ champ_id: c.id, champ: c.champ, autorites: c.autorites })),
    canon: CANON,
  },
  laboratoire: {
    niveaux_acces: NIVEAUX_ACCES,
    progression: PROGRESSION,
  },
};

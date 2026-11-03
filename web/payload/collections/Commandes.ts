import type { CollectionConfig, PayloadRequest } from "payload";
import { connecte } from "../access";
import { options } from "./MessagesContact";
import { STATUT_COMMANDE, REGIME_TARIF } from "@/lib/libelles";

function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

/** Export CSV de toutes les commandes (bouton au-dessus de la liste). */
async function exportCsv(req: PayloadRequest): Promise<Response> {
  if (!req.user) return Response.json({ error: "Non autorisé." }, { status: 401 });

  const { docs } = await req.payload.find({
    collection: "commandes",
    sort: "-createdAt",
    pagination: false,
    depth: 0,
    req,
  });
  const codes = await req.payload.find({
    collection: "codes-acces",
    pagination: false,
    depth: 0,
    req,
  });
  const codeParCommande = new Map(
    codes.docs.map((c) => [String(c.commande), c.code] as const),
  );

  const entetes = [
    "date", "module", "regime", "montant", "devise",
    "nom", "email", "organisation", "statut", "code_acces", "reference_paiement",
  ];
  const lignes = docs.map((c) =>
    [
      c.createdAt,
      c.module_titre,
      c.tarif_type,
      c.montant,
      c.devise,
      c.buyer_nom,
      c.buyer_email,
      c.buyer_organisation ?? "",
      c.statut,
      codeParCommande.get(String(c.id)) ?? "",
      c.payment_ref ?? "",
    ].map(csvCell).join(","),
  );
  const csv = "﻿" + [entetes.map(csvCell).join(","), ...lignes].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="commandes.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}

/**
 * Commande d'un module de formation (achat invité, sans compte). Créée par le
 * tunnel de commande ; conserve les infos acheteur = historique.
 */
export const Commandes: CollectionConfig = {
  slug: "commandes",
  labels: { singular: "Commande", plural: "Commandes" },
  admin: {
    useAsTitle: "module_titre",
    group: "Formation",
    defaultColumns: ["module_titre", "buyer_nom", "montant", "statut", "createdAt"],
    components: {
      beforeListTable: ["@/payload/components/ExportCommandes#ExportCommandes"],
    },
  },
  defaultSort: "-createdAt",
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  endpoints: [{ path: "/export", method: "get", handler: exportCsv }],
  fields: [
    {
      name: "statut",
      type: "select",
      label: "Statut",
      required: true,
      defaultValue: "en_attente",
      options: options(STATUT_COMMANDE),
      admin: { position: "sidebar" },
    },
    {
      type: "row",
      fields: [
        { name: "module_id", type: "text", label: "Identifiant du module", required: true },
        { name: "module_titre", type: "text", label: "Module", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "tarif_type",
          type: "select",
          label: "Régime",
          required: true,
          options: options(REGIME_TARIF),
        },
        { name: "montant", type: "text", label: "Montant", required: true },
        { name: "devise", type: "text", label: "Devise", defaultValue: "EUR", required: true },
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
          ],
        },
        {
          type: "row",
          fields: [
            { name: "buyer_organisation", type: "text", label: "Organisation" },
            { name: "buyer_telephone", type: "text", label: "Téléphone" },
            { name: "buyer_pays", type: "text", label: "Pays (ISO)" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "payment_provider", type: "text", label: "Prestataire de paiement", defaultValue: "mock" },
        { name: "payment_ref", type: "text", label: "Référence de paiement", index: true },
      ],
    },
    {
      name: "code_acces",
      type: "join",
      label: "Code d'accès émis",
      collection: "codes-acces",
      on: "commande",
    },
  ],
};

import type { CollectionConfig, PayloadRequest } from "payload";
import {
  accesAdministrateur,
  accesGestion,
  champGestion,
  estAdmin,
  estGestion,
  estSecretariat,
} from "../access";
import { DOMAINES_INTERET } from "@/lib/espace-libelles";
import { urlSite, corpsHtml } from "@/lib/espace/mails";
import { journaliser } from "@/lib/espace/securite";

/** Import différé : `lib/contenu` dépend de la configuration Payload (import circulaire sinon). */
const texte = async (cle: string, valeurs?: Record<string, string | number>) =>
  (await import("@/lib/contenu")).getTexte(cle, valeurs);

const csv = (v: unknown) => `"${(v === null || v === undefined ? "" : String(v)).replace(/"/g, '""')}"`;

/** Export CSV des comptes : réservé aux rôles habilités, chaque export est journalisé. */
async function exporter(req: PayloadRequest): Promise<Response> {
  if (!estGestion(req)) return Response.json({ error: "Non autorisé." }, { status: 403 });
  const { docs } = await req.payload.find({
    collection: "lecteurs",
    limit: 0,
    depth: 0,
    pagination: false,
    sort: "createdAt",
  });
  await journaliser(req.payload, "export_comptes", { detail: `${docs.length} comptes` });
  const entetes = ["nom", "prenoms", "email", "pays", "ville", "profession", "domaine_interet", "verifie", "inscription"];
  const lignes = docs.map((d) =>
    [d.nom, d.prenoms, d.email, d.pays, d.ville, d.profession, d.domaine_interet, d._verified ? "oui" : "non", d.createdAt]
      .map(csv)
      .join(";"),
  );
  return new Response("﻿" + [entetes.map(csv).join(";"), ...lignes].join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="comptes-lecteurs-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

/** Les routes natives publiques sont remplacées : seules celles du site (anti-robots, débit) servent. */
const fermee = () => Response.json({ error: "Non disponible." }, { status: 404 });
const ROUTES_FERMEES = [
  { path: "/", method: "post" as const },
  { path: "/login", method: "post" as const },
  { path: "/forgot-password", method: "post" as const },
  { path: "/reset-password", method: "post" as const },
  { path: "/unlock", method: "post" as const },
  { path: "/first-register", method: "post" as const },
  { path: "/refresh-token", method: "post" as const },
];

/** Comptes du public (lecteurs) — distincts des administrateurs (`users`). */
export const Lecteurs: CollectionConfig = {
  slug: "lecteurs",
  labels: { singular: "Compte lecteur", plural: "Comptes lecteurs" },
  admin: {
    useAsTitle: "email",
    group: "Espace utilisateurs",
    defaultColumns: ["email", "nom", "prenoms", "pays", "ville", "_verified", "createdAt"],
    listSearchableFields: ["email", "nom", "prenoms", "pays", "ville"],
    components: { beforeListTable: ["@/payload/components/OutilsLecteurs#OutilsLecteurs"] },
  },
  defaultSort: "-createdAt",
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 7 * 24 * 3600,
    verify: {
      generateEmailSubject: () => texte("utilisateurs.mail.verification_objet"),
      generateEmailHTML: async (args) => {
        const lien = `${urlSite()}/espace-utilisateurs/verification?token=${encodeURIComponent(String(args?.token))}`;
        return corpsHtml(await texte("utilisateurs.mail.verification_corps", { lien }), lien);
      },
    },
    forgotPassword: {
      expiration: 60 * 60 * 1000,
      generateEmailSubject: () => texte("utilisateurs.mail.reinitialisation_objet"),
      generateEmailHTML: async (args) => {
        const lien = `${urlSite()}/espace-utilisateurs/reinitialisation?token=${encodeURIComponent(String(args?.token))}`;
        return corpsHtml(await texte("utilisateurs.mail.reinitialisation_corps", { lien }), lien);
      },
    },
  },
  access: {
    read: ({ req }) => {
      if (estSecretariat(req)) return true;
      return req.user?.collection === "lecteurs" ? { id: { equals: req.user.id } } : false;
    },
    // Création : uniquement par les routes du site (API locale) ou un gestionnaire.
    create: accesGestion,
    update: ({ req }) => {
      if (estGestion(req)) return true;
      return req.user?.collection === "lecteurs" ? { id: { equals: req.user.id } } : false;
    },
    delete: accesAdministrateur,
    admin: () => false,
    unlock: accesGestion,
  },
  endpoints: [
    { path: "/export", method: "get", handler: exporter },
    ...ROUTES_FERMEES.map((r) => ({ ...r, handler: fermee })),
  ],
  hooks: {
    // Un compte lecteur ne se vérifie ni ne se rattache de ressources lui-même.
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === "update" && !estAdmin(req) && req.user) {
          delete data._verified;
          delete data.ressources_accessibles;
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "nom", type: "text", label: "Nom", required: true, maxLength: 100, index: true },
    { name: "prenoms", type: "text", label: "Prénom(s)", required: true, maxLength: 150 },
    { name: "pays", type: "text", label: "Pays de résidence", required: true, maxLength: 100, index: true },
    { name: "ville", type: "text", label: "Ville de résidence", required: true, maxLength: 100, index: true },
    { name: "profession", type: "text", label: "Profession ou institution", maxLength: 200 },
    {
      name: "domaine_interet",
      type: "select",
      label: "Domaine d'intérêt",
      options: DOMAINES_INTERET.map((o) => ({ value: o.value, label: o.label })),
    },
    {
      type: "row",
      fields: [
        {
          name: "information_acceptee_le",
          type: "date",
          label: "Information sur les données acceptée le",
          admin: { readOnly: true, date: { pickerAppearance: "dayAndTime" } },
        },
        {
          name: "version_information",
          type: "text",
          label: "Version de l'information",
          admin: { readOnly: true },
        },
      ],
    },
    {
      name: "ressources_accessibles",
      type: "relationship",
      relationTo: "ressources",
      hasMany: true,
      label: "Ressources accessibles",
      admin: { position: "sidebar", description: "Ressources affichées dans l'Espace lecteur de ce compte." },
      access: { create: champGestion, update: champGestion },
    },
  ],
};

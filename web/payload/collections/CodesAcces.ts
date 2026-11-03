import type { CollectionConfig, PayloadRequest } from "payload";
import { connecte } from "../access";
import { options } from "./MessagesContact";
import { NIVEAU_CODE } from "@/lib/libelles";
import { sendMail } from "@/lib/email";

/** Renvoie le code par e-mail à l'acheteur (bouton dans la fiche du code). */
async function renvoyer(req: PayloadRequest): Promise<Response> {
  if (!req.user) return Response.json({ error: "Non autorisé." }, { status: 401 });
  const id = req.routeParams?.id as string | undefined;
  if (!id) return Response.json({ error: "Identifiant manquant." }, { status: 400 });

  const code = await req.payload.findByID({
    collection: "codes-acces",
    id,
    depth: 1,
    req,
  });
  const commande = typeof code.commande === "object" ? code.commande : null;
  const titre = commande?.module_titre ?? "votre formation";

  const statut = await sendMail({
    to: code.email,
    subject: `Votre code d'accès — ${titre}`,
    text:
      `Bonjour ${commande?.buyer_nom ?? ""},\n\n` +
      `Rappel de votre code d'accès pour « ${titre} » : ${code.code}\n\n` +
      `Institut de Brazzaville`,
  });
  return Response.json({ statut });
}

/** Code d'accès émis après paiement, débloquant les téléchargements. */
export const CodesAcces: CollectionConfig = {
  slug: "codes-acces",
  typescript: { interface: "CodeAcces" },
  labels: { singular: "Code d'accès", plural: "Codes d'accès" },
  admin: {
    useAsTitle: "code",
    group: "Formation",
    defaultColumns: ["code", "niveau", "email", "revoked", "createdAt"],
  },
  defaultSort: "-createdAt",
  access: { read: connecte, create: connecte, update: connecte, delete: connecte },
  endpoints: [{ path: "/:id/renvoyer", method: "post", handler: renvoyer }],
  fields: [
    { name: "code", type: "text", label: "Code", required: true, unique: true, index: true },
    {
      name: "niveau",
      type: "select",
      label: "Niveau débloqué",
      required: true,
      options: options(NIVEAU_CODE),
    },
    { name: "email", type: "email", label: "E-mail", required: true },
    {
      name: "commande",
      type: "relationship",
      label: "Commande",
      relationTo: "commandes",
      required: true,
      unique: true,
    },
    {
      name: "revoked",
      type: "checkbox",
      label: "Révoqué",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    { name: "expires_at", type: "date", label: "Expire le", admin: { position: "sidebar" } },
    {
      name: "used_at",
      type: "date",
      label: "Première utilisation",
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "renvoyer",
      type: "ui",
      admin: {
        position: "sidebar",
        components: { Field: "@/payload/components/RenvoyerCode#RenvoyerCode" },
      },
    },
  ],
};

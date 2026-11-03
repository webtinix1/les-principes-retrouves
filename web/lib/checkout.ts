import { payloadClient } from "@/lib/payload";
import { generateAccessCode, getModule } from "@/lib/commerce";
import { sendMail } from "@/lib/email";
import type { CodeAcces } from "@/payload-types";

/**
 * Finalise une commande payée : passe le statut à "paye", émet le code d'accès
 * et notifie l'acheteur. Idempotent (si un code existe déjà, il est renvoyé).
 * Appelé par api/checkout (paiement immédiat mock) et par les webhooks.
 */
export async function finalizePaidCommande(
  commande_id: string,
  payment_ref: string,
): Promise<CodeAcces> {
  const payload = await payloadClient();
  const commande = await payload.findByID({ collection: "commandes", id: commande_id, depth: 0 });

  const existant = await payload.find({
    collection: "codes-acces",
    where: { commande: { equals: commande_id } },
    limit: 1,
    depth: 0,
  });
  if (existant.docs[0]) return existant.docs[0];

  const mod = await getModule(commande.module_id);
  const niveau = (mod?.niveau ?? "module_i") as CodeAcces["niveau"];

  // Transaction : statut payé + code émis, ou rien.
  const req = { transactionID: await payload.db.beginTransaction() ?? undefined };
  let created: CodeAcces;
  try {
    await payload.update({
      collection: "commandes",
      id: commande_id,
      data: { statut: "paye", payment_ref },
      req,
    });
    created = await payload.create({
      collection: "codes-acces",
      data: {
        code: generateAccessCode(),
        niveau,
        email: commande.buyer_email,
        commande: commande_id,
      },
      req,
    });
    if (req.transactionID) await payload.db.commitTransaction(req.transactionID);
  } catch (err) {
    if (req.transactionID) await payload.db.rollbackTransaction(req.transactionID);
    throw err;
  }

  await sendMail({
    to: commande.buyer_email,
    subject: `Votre code d'accès — ${commande.module_titre}`,
    text:
      `Bonjour ${commande.buyer_nom},\n\n` +
      `Votre inscription à « ${commande.module_titre} » est confirmée.\n` +
      `Votre code d'accès : ${created.code}\n\n` +
      `Ce code débloque les ressources associées sur le Laboratoire Doctrinal.\n\n` +
      `Institut de Brazzaville`,
  });

  return created;
}

import { prisma } from "@/lib/prisma";
import { niveauForModule, generateAccessCode } from "@/lib/commerce";
import { sendMail } from "@/lib/email";

/**
 * Finalise une commande payée : passe le statut à "paye", émet le code d'accès
 * et notifie l'acheteur. Idempotent (si un code existe déjà, il est renvoyé).
 * Appelé par api/checkout (paiement immédiat mock) et par le webhook CinetPay.
 */
export async function finalizePaidCommande(commande_id: string, payment_ref: string) {
  const commande = await prisma.commande.findUnique({
    where: { id: commande_id },
    include: { code_acces: true },
  });
  if (!commande) throw new Error("Commande introuvable.");
  if (commande.code_acces) return commande.code_acces;

  const code = generateAccessCode();
  const niveau = niveauForModule(commande.module_id);

  const [, created] = await prisma.$transaction([
    prisma.commande.update({
      where: { id: commande_id },
      data: { statut: "paye", payment_ref },
    }),
    prisma.codeAcces.create({
      data: { code, niveau, email: commande.buyer_email, commande_id },
    }),
  ]);

  await sendMail({
    to: commande.buyer_email,
    subject: `Votre code d'accès — ${commande.module_titre}`,
    text:
      `Bonjour ${commande.buyer_nom},\n\n` +
      `Votre inscription à « ${commande.module_titre} » est confirmée.\n` +
      `Votre code d'accès : ${code}\n\n` +
      `Ce code débloque les ressources associées sur le Laboratoire Doctrinal.\n\n` +
      `Institut de Brazzaville`,
  });

  return created;
}

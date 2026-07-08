"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/email";

export async function setCommandeStatut(formData: FormData) {
  const id = String(formData.get("id"));
  const statut = String(formData.get("statut"));
  await prisma.commande.update({ where: { id }, data: { statut } });
  revalidatePath("/admin/commandes");
  revalidatePath("/admin");
}

export async function setCodeRevoked(formData: FormData) {
  const id = String(formData.get("id"));
  const revoked = String(formData.get("revoked")) === "true";
  await prisma.codeAcces.update({ where: { id }, data: { revoked } });
  revalidatePath("/admin/codes");
}

export async function resendCode(formData: FormData) {
  const id = String(formData.get("id"));
  const code = await prisma.codeAcces.findUnique({
    where: { id },
    include: { commande: true },
  });
  if (code) {
    await sendMail({
      to: code.email,
      subject: `Votre code d'accès — ${code.commande.module_titre}`,
      text:
        `Bonjour ${code.commande.buyer_nom},\n\n` +
        `Rappel de votre code d'accès pour « ${code.commande.module_titre} » : ${code.code}\n\n` +
        `Institut de Brazzaville`,
    });
  }
  revalidatePath("/admin/codes");
}

export async function setMessageStatut(formData: FormData) {
  const id = String(formData.get("id"));
  const statut = String(formData.get("statut"));
  await prisma.contactMessage.update({ where: { id }, data: { statut } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function setRessourceDispo(formData: FormData) {
  const ressource_id = String(formData.get("ressource_id"));
  const is_available = String(formData.get("is_available")) === "true";
  await prisma.ressourceEtat.upsert({
    where: { ressource_id },
    create: { ressource_id, is_available },
    update: { is_available },
  });
  revalidatePath("/admin/ressources");
}

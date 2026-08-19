"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { BLOC_PAR_CLE, CHEMIN_PAR_CLE } from "@/content/blocs";
import { sanitizeContenu, contenuEnTexte } from "@/lib/contenu/sanitize";
import { lireTexteOrigine } from "@/lib/contenu/extraction";

/** Clé acceptée uniquement si elle est déclarée au registre (`content/blocs/`). */
const CleSchema = z.string().refine((c) => BLOC_PAR_CLE.has(c), {
  message: "Clé de bloc inconnue.",
});

const EnregistrerSchema = z.object({
  cle: CleSchema,
  valeur: z.string().max(60_000),
});

/** Rafraîchit la page publique concernée + la liste du back-office. */
function revalider(cle: string) {
  const chemin = CHEMIN_PAR_CLE.get(cle);
  if (chemin) revalidatePath(chemin);
  revalidatePath("/admin/contenu");
}

/**
 * Sauve le texte d'origine comme première version, la première fois qu'un bloc
 * est réécrit. L'historique contient ainsi toujours le texte du code : on peut
 * y revenir même après plusieurs réécritures successives.
 */
async function archiverOrigineSiPremiereFois(cle: string) {
  const dejaSurcharge = await prisma.contenuBloc.findUnique({
    where: { cle },
    select: { cle: true },
  });
  if (dejaSurcharge) return;

  try {
    const origine = await lireTexteOrigine(cle);
    await prisma.contenuBlocVersion.create({ data: { cle, valeur: origine } });
  } catch {
    // Page injoignable : on n'empêche pas l'enregistrement pour autant.
    // « Revenir au texte d'origine » reste disponible (il supprime la surcharge).
  }
}

export async function enregistrerBloc(formData: FormData) {
  const parsed = EnregistrerSchema.safeParse({
    cle: formData.get("cle"),
    valeur: formData.get("valeur"),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Requête invalide.");
  }

  const { cle, valeur } = parsed.data;
  const def = BLOC_PAR_CLE.get(cle)!;

  // Les blocs « simple » sont du texte brut : on retire toute balise.
  const propre =
    def.type === "riche" ? sanitizeContenu(valeur) : contenuEnTexte(valeur);

  if (!propre) {
    throw new Error("Le texte ne peut pas être vide.");
  }

  await archiverOrigineSiPremiereFois(cle);

  await prisma.contenuBloc.upsert({
    where: { cle },
    create: { cle, valeur: propre },
    update: { valeur: propre },
  });
  await prisma.contenuBlocVersion.create({ data: { cle, valeur: propre } });

  revalider(cle);
  redirect(`/admin/contenu/${encodeURIComponent(cle)}?enregistre=1`);
}

/** Supprime la surcharge : la page réaffiche le texte d'origine (le JSX). */
export async function reinitialiserBloc(formData: FormData) {
  const cle = CleSchema.parse(formData.get("cle"));

  await prisma.contenuBloc.deleteMany({ where: { cle } });

  revalider(cle);
  redirect(`/admin/contenu/${encodeURIComponent(cle)}?reinitialise=1`);
}

/** Réapplique une version de l'historique comme texte courant. */
export async function restaurerVersion(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  const version = await prisma.contenuBlocVersion.findUnique({ where: { id } });
  if (!version) throw new Error("Version introuvable.");

  const cle = CleSchema.parse(version.cle);

  await prisma.contenuBloc.upsert({
    where: { cle },
    create: { cle, valeur: version.valeur },
    update: { valeur: version.valeur },
  });
  await prisma.contenuBlocVersion.create({
    data: { cle, valeur: version.valeur },
  });

  revalider(cle);
  redirect(`/admin/contenu/${encodeURIComponent(cle)}?restaure=1`);
}

import { NextResponse } from "next/server";
import { payloadClient } from "@/lib/payload";
import { proteger, erreur } from "@/lib/espace/protection";
import { schemaProfil, schemaSuppression } from "@/lib/espace/schemas";
import { journaliser } from "@/lib/espace/securite";
import { fermerSession, lecteurCourant } from "@/lib/espace/session";

export const runtime = "nodejs";

/** Modification des coordonnées et préférences du compte connecté. */
export async function PATCH(request: Request) {
  const lecteur = await lecteurCourant();
  if (!lecteur) return erreur("connexion_requise", 401);
  const p = await proteger(request, schemaProfil, { nom: "compte", limite: 30, fenetreMs: 3_600_000 });
  if ("reponse" in p) return p.reponse;

  const payload = await payloadClient();
  const d = p.data;
  await payload.update({
    collection: "lecteurs",
    id: lecteur.id,
    data: {
      nom: d.nom,
      prenoms: d.prenoms,
      pays: d.pays,
      ville: d.ville,
      profession: d.profession || null,
      domaine_interet: d.domaine_interet || null,
    },
  });
  await journaliser(payload, "profil_modifie", { request, lecteur: lecteur.id });
  return NextResponse.json({ ok: true });
}

/**
 * Suppression du compte, après confirmation par le mot de passe. Les demandes
 * rattachées sont anonymisées (nom et e-mail retirés, message conservé).
 */
export async function DELETE(request: Request) {
  const lecteur = await lecteurCourant();
  if (!lecteur) return erreur("connexion_requise", 401);
  const p = await proteger(request, schemaSuppression, { nom: "suppression", limite: 5, fenetreMs: 3_600_000 });
  if ("reponse" in p) return p.reponse;

  const payload = await payloadClient();
  try {
    await payload.login({ collection: "lecteurs", data: { email: lecteur.email, password: p.data.mot_de_passe } });
  } catch {
    return erreur("identifiants", 401);
  }

  for (const collection of ["demandes-service", "propositions-collaboration"] as const) {
    await payload.update({
      collection,
      where: { lecteur: { equals: lecteur.id } },
      data: { nom: null, email: null, lecteur: null, anonymise: true } as never,
    });
  }
  await fermerSession(lecteur);
  await payload.delete({ collection: "lecteurs", id: lecteur.id });
  await journaliser(payload, "compte_supprime", { request });
  return NextResponse.json({ ok: true });
}

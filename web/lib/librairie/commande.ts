import { randomBytes } from "crypto";
import type { Payload } from "payload";
import { payloadClient } from "@/lib/payload";
import { sendMail } from "@/lib/email";
import { siteConfig } from "@/lib/site-config";
import { getTexte } from "@/lib/contenu";
import type { CommandeOuvrage } from "@/payload-types";
import { cinetpayInitialiser, cinetpayVerifier } from "@/lib/payment/cinetpay-api";
import {
  arrondi2,
  calculerFrais,
  enXaf,
  formaterEuro,
  getOuvrage,
  getReglages,
  imprimeOuvert,
  trouverZone,
} from "./donnees";

export type DonneesCommande = {
  tome: string;
  quantite: number;
  nom: string;
  email: string;
  telephone: string;
  adresse1: string;
  adresse2?: string;
  code_postal?: string;
  ville: string;
  pays: string;
};

export class ErreurCommande extends Error {
  constructor(
    message: string,
    readonly statut = 422,
  ) {
    super(message);
  }
}

/** Prestataire de l'édition imprimée : LIBRAIRIE_PAIEMENT=cinetpay, sinon simulé (jamais en production). */
export function prestataireImprime(): "cinetpay" | "mock" {
  return process.env.LIBRAIRIE_PAIEMENT === "cinetpay" ? "cinetpay" : "mock";
}

const lienSuivi = (id: string) => new URL(`/librairie/commande/${id}`, siteConfig.url).toString();

function numeroCommande(): string {
  const d = new Date();
  const mois = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}`;
  return `LP-${mois}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

async function noterAcheteur(
  payload: Payload,
  a: { email: string; nom?: string; telephone?: string; pays?: string; origine: "imprime" | "numerique" },
) {
  const email = a.email.trim().toLowerCase();
  const { docs } = await payload.find({
    collection: "acheteurs",
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
  });
  if (docs[0]) {
    await payload.update({
      collection: "acheteurs",
      id: docs[0].id,
      data: { nom: a.nom || docs[0].nom, telephone: a.telephone || docs[0].telephone, pays: a.pays || docs[0].pays },
    });
  } else {
    await payload.create({ collection: "acheteurs", data: { ...a, email, nombre_achats: 0 } });
  }
  return email;
}

/** Incrémente le nombre d'achats d'un acheteur (appelé au paiement confirmé). */
export async function compterAchat(
  payload: Payload,
  a: { email: string; nom?: string; telephone?: string; pays?: string; origine: "imprime" | "numerique" },
) {
  const email = await noterAcheteur(payload, a);
  const { docs } = await payload.find({
    collection: "acheteurs",
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
  });
  if (docs[0]) {
    await payload.update({
      collection: "acheteurs",
      id: docs[0].id,
      data: { nombre_achats: (docs[0].nombre_achats ?? 0) + 1 },
    });
  }
}

/**
 * Enregistre la commande, puis initie le paiement.
 * Retourne l'adresse où envoyer l'acheteur (page du prestataire, ou page de suivi si paiement simulé).
 */
export async function creerCommande(d: DonneesCommande): Promise<{ redirect: string; id: string }> {
  const ouvrage = await getOuvrage(d.tome);
  if (!ouvrage) throw new ErreurCommande("Ouvrage inconnu.", 404);
  if (!imprimeOuvert(ouvrage) || ouvrage.imprime.prix === null) {
    throw new ErreurCommande("L’édition imprimée n’est pas ouverte à la commande.", 409);
  }
  const reglages = await getReglages();
  const zone = trouverZone(reglages.zones, d.pays);
  const frais = calculerFrais(zone, d.quantite);
  if (!zone || frais === null) {
    throw new ErreurCommande(await getTexte("librairie.commande.livraison_indisponible"));
  }

  const prestataire = prestataireImprime();
  if (prestataire === "mock" && process.env.NODE_ENV === "production" && process.env.LIBRAIRIE_PAIEMENT_SIMULE !== "oui") {
    throw new ErreurCommande("Le paiement en ligne n’est pas encore ouvert.", 503);
  }

  const prixUnitaire = ouvrage.imprime.prix;
  const total = arrondi2(prixUnitaire * d.quantite + frais);
  const payload = await payloadClient();
  const numero = numeroCommande();

  const commande = await payload.create({
    collection: "commandes-ouvrages",
    data: {
      numero,
      statut: "en_attente_paiement",
      tome: ouvrage.tome,
      titre: ouvrage.titre_complet,
      quantite: d.quantite,
      prix_unitaire: prixUnitaire,
      frais_livraison: frais,
      total,
      buyer_nom: d.nom,
      buyer_email: d.email.trim().toLowerCase(),
      buyer_telephone: d.telephone,
      adresse_ligne1: d.adresse1,
      adresse_ligne2: d.adresse2 || undefined,
      code_postal: d.code_postal || undefined,
      ville: d.ville,
      pays: d.pays.toUpperCase(),
      zone_livraison: zone.nom,
      payment_provider: prestataire,
    },
  });
  await noterAcheteur(payload, {
    email: d.email,
    nom: d.nom,
    telephone: d.telephone,
    pays: d.pays,
    origine: "imprime",
  });

  const reference = `${numero}-${randomBytes(2).toString("hex").toUpperCase()}`;
  const montantXaf = enXaf(total, reglages.taux_xaf);
  await payload.create({
    collection: "paiements-ouvrages",
    data: {
      reference,
      commande: commande.id,
      prestataire,
      montant: prestataire === "cinetpay" ? montantXaf : total,
      devise: prestataire === "cinetpay" ? "XAF" : "EUR",
      statut: "initie",
    },
  });
  await payload.update({ collection: "commandes-ouvrages", id: commande.id, data: { payment_ref: reference } });

  if (prestataire === "mock") {
    await confirmerPaiement(commande.id, reference, "Paiement simulé (recette)");
    return { id: commande.id, redirect: `/librairie/commande/${commande.id}` };
  }

  try {
    const { url } = await cinetpayInitialiser({
      transaction_id: reference,
      amount: montantXaf,
      currency: "XAF",
      description: `${numero} — ${ouvrage.etiquette}`,
      return_url: lienSuivi(commande.id),
      notify_url: new URL("/api/librairie/paiement/notification", siteConfig.url).toString(),
      nom: d.nom,
      email: d.email,
      telephone: d.telephone,
      adresse: d.adresse1,
      ville: d.ville,
      pays: d.pays,
      code_postal: d.code_postal,
    });
    return { id: commande.id, redirect: url };
  } catch (err) {
    console.error("[librairie] initialisation du paiement:", err);
    await payload.update({ collection: "commandes-ouvrages", id: commande.id, data: { statut: "annulee" } });
    throw new ErreurCommande("Le paiement n’a pas pu être initié. Merci de réessayer.", 502);
  }
}

/** Paiement accepté : commande payée, courriels. Idempotent. */
export async function confirmerPaiement(commandeId: string, reference: string, detail: string, moyen?: string) {
  const payload = await payloadClient();
  const commande = await payload.findByID({ collection: "commandes-ouvrages", id: commandeId, depth: 0 });
  if (commande.statut !== "en_attente_paiement") return commande;

  const maj = await payload.update({
    collection: "commandes-ouvrages",
    id: commandeId,
    data: { statut: "payee", date_paiement: new Date().toISOString() },
  });
  const paiements = await payload.find({
    collection: "paiements-ouvrages",
    where: { reference: { equals: reference } },
    limit: 1,
    depth: 0,
  });
  if (paiements.docs[0]) {
    await payload.update({
      collection: "paiements-ouvrages",
      id: paiements.docs[0].id,
      data: { statut: "accepte", detail, moyen },
    });
  }
  await compterAchat(payload, {
    email: commande.buyer_email,
    nom: commande.buyer_nom,
    telephone: commande.buyer_telephone,
    pays: commande.pays,
    origine: "imprime",
  });
  await envoyerConfirmations(maj);
  return maj;
}

/** Interroge le prestataire pour une commande en attente (retour de paiement, notification). */
export async function actualiserPaiement(commandeId: string): Promise<void> {
  const payload = await payloadClient();
  const commande = await payload
    .findByID({ collection: "commandes-ouvrages", id: commandeId, depth: 0, disableErrors: true })
    .catch(() => null);
  if (!commande || commande.statut !== "en_attente_paiement" || commande.payment_provider !== "cinetpay") return;
  const reference = commande.payment_ref;
  if (!reference) return;
  try {
    const s = await cinetpayVerifier(reference);
    if (s.accepte) await confirmerPaiement(commandeId, reference, s.brut, s.moyen);
    else if (s.refuse) {
      const p = await payload.find({
        collection: "paiements-ouvrages",
        where: { reference: { equals: reference } },
        limit: 1,
        depth: 0,
      });
      if (p.docs[0]) {
        await payload.update({
          collection: "paiements-ouvrages",
          id: p.docs[0].id,
          data: { statut: "refuse", detail: s.brut },
        });
      }
    }
  } catch (err) {
    console.error("[librairie] vérification du paiement:", err);
  }
}

async function destinataireAuteur(): Promise<string> {
  const r = await getReglages();
  return r.email_notification || process.env.LIBRAIRIE_AUTEUR_EMAIL || process.env.CONTACT_INBOX_EMAIL || "";
}

function journaliser(quoi: string, resultat: "sent" | "skipped" | "error") {
  if (resultat !== "sent") console.warn(`[librairie] courriel ${quoi} : ${resultat}`);
  return resultat;
}

async function envoyerConfirmations(c: CommandeOuvrage) {
  const payload = await payloadClient();
  const valeurs = {
    numero: c.numero ?? "",
    nom: c.buyer_nom,
    email: c.buyer_email,
    telephone: c.buyer_telephone,
    quantite: c.quantite,
    titre: c.titre,
    total: formaterEuro(c.total),
    lien: lienSuivi(c.id),
    adresse: [c.adresse_ligne1, c.adresse_ligne2, [c.code_postal, c.ville].filter(Boolean).join(" "), c.pays]
      .filter(Boolean)
      .join(", "),
    admin: new URL(`/admin/collections/commandes-ouvrages/${c.id}`, siteConfig.url).toString(),
  };
  const acheteur = journaliser(
    "acheteur",
    await sendMail({
      to: c.buyer_email,
      subject: await getTexte("librairie.mail.acheteur_objet", valeurs),
      text: await getTexte("librairie.mail.acheteur_corps", valeurs),
    }),
  );
  const dest = await destinataireAuteur();
  const auteur = dest
    ? journaliser(
        "auteur",
        await sendMail({
          to: dest,
          subject: await getTexte("librairie.mail.auteur_objet", valeurs),
          text: await getTexte("librairie.mail.auteur_corps", valeurs),
          replyTo: c.buyer_email,
        }),
      )
    : "skipped";
  await payload.update({
    collection: "commandes-ouvrages",
    id: c.id,
    data: { courriel_acheteur: acheteur, courriel_auteur: auteur },
  });
}

/** Courriel d'expédition (déclenché au passage du statut à « Expédiée »). */
export async function envoyerExpedition(c: CommandeOuvrage) {
  const suivi = [c.transporteur, c.numero_suivi].filter(Boolean).join(" — ");
  const valeurs = {
    numero: c.numero ?? "",
    nom: c.buyer_nom,
    suivi: suivi ? `Transporteur et suivi : ${suivi}` : "",
    lien: lienSuivi(c.id),
  };
  journaliser(
    "expédition",
    await sendMail({
      to: c.buyer_email,
      subject: await getTexte("librairie.mail.expedition_objet", valeurs),
      text: await getTexte("librairie.mail.expedition_corps", valeurs),
    }),
  );
}

export { lienSuivi };

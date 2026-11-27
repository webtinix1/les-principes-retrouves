import { cache } from "react";
import { payloadClient } from "@/lib/payload";
import { getVenteOuvrages } from "@/lib/cms";
import { AUTEUR_DESIGNATION, TOMES, type TomeId } from "./statuts";

/**
 * Lecture des produits de la librairie. Repli sur les valeurs d'origine si la
 * base est injoignable (build sans base) ou si la fiche n'existe pas encore.
 */

export type Zone = {
  nom: string;
  pays: string;
  frais_premier: number | null;
  frais_supplementaire: number | null;
  delai?: string | null;
};

export type Ouvrage = {
  tome: TomeId;
  etiquette: string;
  reference_editoriale?: string;
  titre_complet: string;
  sous_titre?: string;
  auteur: string;
  couverture: { url: string; largeur: number; hauteur: number };
  bibliographie: { libelle: string; valeur: string }[];
  numerique: { prix: number | null; lien: string | null; produit_chariow?: string };
  imprime: { actif: boolean; prix: number | null; delai?: string };
  conditions: { numerique?: string; imprime?: string; livraison?: string };
};

export type Reglages = { zones: Zone[]; taux_xaf: number; email_notification?: string };

/** Valeurs d'origine des deux fiches (amorce du back-office et repli). */
export const OUVRAGES_ORIGINE: Record<TomeId, Omit<Ouvrage, "numerique" | "imprime" | "conditions"> & { prix_pdf: number }> = {
  "tome-i": {
    tome: "tome-i",
    etiquette: TOMES["tome-i"],
    reference_editoriale: "V128",
    titre_complet: "Les Principes Retrouvés — Maât : théorie de l’intelligibilité",
    auteur: AUTEUR_DESIGNATION,
    couverture: { url: "/v16/couverture-tome-i.webp", largeur: 730, hauteur: 1024 },
    bibliographie: [{ libelle: "Édition", valeur: "Édition numérique stabilisée Pré-BAT, sans ISBN" }],
    prix_pdf: 69,
  },
  "tome-ii": {
    tome: "tome-ii",
    etiquette: TOMES["tome-ii"],
    titre_complet: "La saisine d’office, l’autosaisine et l’action positive du juge constitutionnel",
    sous_titre:
      "Théorie générale et formalisation d’un principe universel de proactivité judiciaire encadrée.",
    auteur: AUTEUR_DESIGNATION,
    couverture: { url: "/v16/couverture-tome-ii.webp", largeur: 694, hauteur: 1024 },
    bibliographie: [],
    prix_pdf: 59,
  },
};

/** Grille de livraison initiale : zones nommées, tarifs à fournir. */
export const ZONES_ORIGINE: Zone[] = [
  { nom: "Congo-Brazzaville", pays: "CG", frais_premier: null, frais_supplementaire: null },
  {
    nom: "Afrique centrale et de l’Ouest",
    pays: "CD,CM,GA,GQ,TD,CF,AO,SN,CI,BF,ML,BJ,TG,NE,GN",
    frais_premier: null,
    frais_supplementaire: null,
  },
  {
    nom: "Europe",
    pays: "FR,BE,CH,LU,DE,ES,IT,PT,NL,GB,IE,AT",
    frais_premier: null,
    frais_supplementaire: null,
  },
  { nom: "Reste du monde", pays: "*", frais_premier: null, frais_supplementaire: null },
];

const nombre = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
const texte = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v.trim() : undefined);

export const getOuvrage = cache(async (tome: string): Promise<Ouvrage | null> => {
  if (tome !== "tome-i" && tome !== "tome-ii") return null;
  const origine = OUVRAGES_ORIGINE[tome];
  const vente = (await getVenteOuvrages().catch(() => ({}) as Awaited<ReturnType<typeof getVenteOuvrages>>))[tome];
  const repli: Ouvrage = {
    ...origine,
    numerique: { prix: origine.prix_pdf, lien: vente?.lien ?? null },
    imprime: { actif: false, prix: null },
    conditions: {},
  };
  try {
    const payload = await payloadClient();
    const { docs } = await payload.find({
      collection: "ouvrages",
      where: { tome: { equals: tome } },
      limit: 1,
      depth: 0,
    });
    const d = docs[0];
    if (!d) return repli;
    return {
      tome,
      etiquette: TOMES[tome],
      reference_editoriale: texte(d.reference_editoriale),
      titre_complet: d.titre_complet,
      sous_titre: texte(d.sous_titre),
      auteur: texte(d.auteur) ?? AUTEUR_DESIGNATION,
      couverture: {
        url: texte(d.couverture_url) ?? origine.couverture.url,
        largeur: nombre(d.couverture_largeur) ?? origine.couverture.largeur,
        hauteur: nombre(d.couverture_hauteur) ?? origine.couverture.hauteur,
      },
      bibliographie: (d.bibliographie ?? []).map((b) => ({ libelle: b.libelle, valeur: b.valeur })),
      numerique: {
        prix: nombre(d.numerique?.prix),
        lien: texte(d.numerique?.lien_chariow) ?? vente?.lien ?? null,
        produit_chariow: texte(d.numerique?.produit_chariow),
      },
      imprime: {
        actif: Boolean(d.imprime?.actif),
        prix: nombre(d.imprime?.prix),
        delai: texte(d.imprime?.delai_production),
      },
      conditions: {
        numerique: texte(d.conditions_numerique),
        imprime: texte(d.conditions_imprime),
        livraison: texte(d.conditions_livraison),
      },
    };
  } catch (err) {
    if (process.env.NEXT_PHASE !== "phase-production-build") {
      console.warn("[librairie] fiche indisponible, valeurs d'origine servies.", (err as Error).message);
    }
    return repli;
  }
});

export const getReglages = cache(async (): Promise<Reglages> => {
  try {
    const payload = await payloadClient();
    const g = await payload.findGlobal({ slug: "librairie-reglages", depth: 0 });
    return {
      zones: (g.zones ?? []).map((z) => ({
        nom: z.nom,
        pays: z.pays,
        frais_premier: nombre(z.frais_premier),
        frais_supplementaire: nombre(z.frais_supplementaire),
        delai: texte(z.delai) ?? null,
      })),
      taux_xaf: nombre(g.taux_xaf) ?? 655.957,
      email_notification: texte(g.email_notification),
    };
  } catch {
    return { zones: ZONES_ORIGINE, taux_xaf: 655.957 };
  }
});

/** Un tome est-il commandable en version imprimée ? */
export const imprimeOuvert = (o: Ouvrage) => o.imprime.actif && o.imprime.prix !== null && o.imprime.prix > 0;

/** Zone applicable à un pays : correspondance exacte, sinon zone « * ». */
export function trouverZone(zones: Zone[], pays: string): Zone | null {
  const code = pays.trim().toUpperCase();
  const liste = (z: Zone) => z.pays.split(",").map((p) => p.trim().toUpperCase());
  return (
    zones.find((z) => liste(z).includes(code)) ?? zones.find((z) => liste(z).includes("*")) ?? null
  );
}

/** Frais de livraison d'une zone pour n exemplaires, ou null si la zone n'a pas de tarif. */
export function calculerFrais(zone: Zone | null, quantite: number): number | null {
  if (!zone || zone.frais_premier === null) return null;
  const supp = zone.frais_supplementaire ?? zone.frais_premier;
  return arrondi2(zone.frais_premier + supp * Math.max(0, quantite - 1));
}

export const arrondi2 = (n: number) => Math.round(n * 100) / 100;

export const formaterEuro = (n: number) =>
  `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n)} €`;

/** Montant en francs CFA : parité fixe, arrondi au multiple de 5 supérieur (exigence CinetPay). */
export const enXaf = (euros: number, taux: number) => Math.ceil((euros * taux) / 5) * 5;

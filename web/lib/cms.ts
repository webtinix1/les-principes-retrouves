import { cache } from "react";
import { payloadClient } from "@/lib/payload";
import { MODULES as MODULES_CODE, type Module } from "@/content/modules";
import { STRATES as STRATES_CODE, type Strate } from "@/content/concepts";
import { AUTORITES as AUTORITES_CODE, type Autorite } from "@/content/autorites";
import {
  WORKING_PAPERS as WP_CODE,
  PIECES_OPERATOIRES as PIECES_CODE,
  type Ressource,
} from "@/content/working-papers";
import {
  NIVEAUX as NIVEAUX_CODE,
  MOUVEMENT_ORGANIQUE as MOUVEMENT_CODE,
  CANON as CANON_CODE,
  AUTORITES as CHAMPS_AUTORITES_CODE,
  type Niveau,
  type PrincipeCanon,
  type ChampAutorites,
} from "@/content/institution";
import {
  NIVEAUX_ACCES as NIVEAUX_ACCES_CODE,
  PROGRESSION as PROGRESSION_CODE,
  type NiveauAcces,
  type EtapeProgression,
} from "@/content/working-papers";

/**
 * Lecture des listes éditoriales gérées dans Payload, exposées sous les mêmes
 * types que les données d'origine (`content/*.ts`) : les pages n'ont pas à
 * connaître Payload.
 *
 * Repli : si la base est injoignable (build Docker, sans base), on sert les
 * données d'origine du code — celles-là mêmes qui ont amorcé Payload. Le
 * conteneur revalide ensuite les pages au démarrage.
 */

async function ouRepli<T>(lire: () => Promise<T>, repli: T, quoi: string): Promise<T> {
  try {
    return await lire();
  } catch (err) {
    if (process.env.NEXT_PHASE !== "phase-production-build") {
      console.warn(`[cms] ${quoi} : base injoignable, données du code servies.`, (err as Error).message);
    }
    return repli;
  }
}

const textes = (a?: { texte: string }[] | null) => (a ?? []).map((x) => x.texte);

export type ModuleCms = Module & { niveau: string };

export const getModules = cache(
  (): Promise<ModuleCms[]> =>
    ouRepli(
      async () => {
        const payload = await payloadClient();
        const { docs } = await payload.find({
          collection: "modules",
          sort: "ordre",
          pagination: false,
          depth: 0,
        });
        return docs.map((m) => ({
          id: m.module_id,
          niveau: m.niveau,
          numero: m.numero,
          titre: m.titre,
          public_cible: m.public_cible,
          duree: m.duree,
          prerequis: m.prerequis,
          sessions: (m.sessions ?? []).map((s) => ({ titre: s.titre, points: textes(s.points) })),
          livrables: textes(m.livrables),
          tarif_b2b: m.tarif_b2b || null,
          tarif_b2c: m.tarif_b2c || null,
          tarif_devis: m.tarif_devis || null,
          cta_label: m.cta_label,
        }));
      },
      MODULES_CODE.map((m) => ({ ...m, niveau: NIVEAU_MODULE_CODE[m.id] ?? "inconnu" })),
      "modules",
    ),
);

/** Niveaux d'origine, pour le repli sans base uniquement. */
const NIVEAU_MODULE_CODE: Record<string, string> = {
  fondements_organon: "module_i",
  laboratoire_proactivite_juridique: "module_ii",
  strategie_architectonique_systemique: "module_iii",
};

export const getStrates = cache(
  (): Promise<Strate[]> =>
    ouRepli(
      async () => {
        const payload = await payloadClient();
        const [strates, concepts] = await Promise.all([
          payload.find({ collection: "strates", sort: "ordre", pagination: false, depth: 0 }),
          payload.find({ collection: "concepts", sort: "numero", pagination: false, depth: 0 }),
        ]);
        return strates.docs.map((s) => ({
          id: s.strate_id,
          titre: s.titre,
          sous_titre: s.sous_titre,
          concepts: concepts.docs
            .filter((c) => (typeof c.strate === "object" ? c.strate.id : c.strate) === s.id)
            .map((c) => ({
              numero: c.numero,
              id: c.concept_id,
              titre: c.titre,
              definition: c.definition,
              portee: c.portee,
            })),
        }));
      },
      STRATES_CODE,
      "concepts",
    ),
);

export const getAutorites = cache(
  (): Promise<Autorite[]> =>
    ouRepli(
      async () => {
        const payload = await payloadClient();
        const { docs } = await payload.find({
          collection: "autorites",
          sort: "ordre",
          pagination: false,
          depth: 0,
        });
        return docs.map((a) => ({ id: a.autorite_id, nom: a.nom, pays: a.pays, apport: a.apport }));
      },
      AUTORITES_CODE,
      "autorités",
    ),
);

export type RessourceCms = Ressource & {
  categorie: "working_paper" | "piece_operatoire";
  niveau_requis: "module_i" | "module_ii" | "module_iii";
  is_available: boolean;
  /** Chemin disque du PDF téléversé (null → document d'attente). */
  fichier: string | null;
};

export const getRessources = cache(
  (): Promise<RessourceCms[]> =>
    ouRepli<RessourceCms[]>(
      async () => {
        const payload = await payloadClient();
        const { docs } = await payload.find({
          collection: "ressources",
          sort: "ordre",
          pagination: false,
          depth: 1,
        });
        return docs.map((r) => ({
          id: r.ressource_id,
          categorie: r.categorie,
          niveau_requis: r.niveau_requis,
          is_available: Boolean(r.is_available),
          fichier: typeof r.fichier === "object" && r.fichier?.filename ? r.fichier.filename : null,
          reference: r.reference,
          titre: r.titre,
          classification: r.classification,
          volume: r.volume,
          statut: r.statut,
          soumission: r.soumission || undefined,
          resume_label: r.resume_label,
          resume: textes(r.resume),
          concepts_mobilises: r.concepts_mobilises?.length ? textes(r.concepts_mobilises) : undefined,
        }));
      },
      [
        ...WP_CODE.map((r) => ({ ...r, categorie: "working_paper" as const })),
        ...PIECES_CODE.map((r) => ({ ...r, categorie: "piece_operatoire" as const })),
      ].map((r) => ({
        ...r,
        niveau_requis: (["guide_technique", "arret_pilote"].includes(r.id) ? "module_ii" : "module_i") as RessourceCms["niveau_requis"],
        is_available: false,
        fichier: null,
      })),
      "ressources",
    ),
);

/* ── Listes structurées portées par les globals de page ─────────────────── */

type Ligne = Record<string, unknown>;

async function lireListes(slug: "contenu-institution" | "contenu-laboratoire"): Promise<Ligne> {
  const payload = await payloadClient();
  return (await payload.findGlobal({ slug, depth: 0 })) as unknown as Ligne;
}

/** Liste du back-office, ou les données d'origine si elle est vide. */
function liste<T>(valeur: unknown, conversion: (l: Ligne) => T, origine: T[]): T[] {
  return Array.isArray(valeur) && valeur.length > 0 ? (valeur as Ligne[]).map(conversion) : origine;
}

const chaine = (v: unknown) => (typeof v === "string" ? v : "");
/** Champ facultatif : vide → absent (les pages testent sa présence). */
const facultatif = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);
const sousTextes = (v: unknown) => (Array.isArray(v) ? (v as Ligne[]).map((x) => chaine(x.texte)) : []);

export type ListesInstitution = {
  niveaux: Niveau[];
  mouvement_organique: string[];
  canon: PrincipeCanon[];
  champs_autorites: ChampAutorites[];
};

export const getListesInstitution = cache(
  (): Promise<ListesInstitution> => {
    const origine: ListesInstitution = {
      niveaux: NIVEAUX_CODE,
      mouvement_organique: MOUVEMENT_CODE,
      canon: CANON_CODE,
      champs_autorites: CHAMPS_AUTORITES_CODE,
    };
    return ouRepli(
      async () => {
        const g = await lireListes("contenu-institution");
        return {
          niveaux: liste(
            g.niveaux,
            (n) => {
              const l = sousTextes(n.liste);
              return {
                numero: chaine(n.numero),
                id: chaine(n.niveau_id),
                titre: chaine(n.titre),
                fonction: chaine(n.fonction),
                question_fondamentale: chaine(n.question_fondamentale),
                corps: sousTextes(n.corps),
                equation: facultatif(n.equation),
                liste: l.length ? l : undefined,
                maxime: facultatif(n.maxime),
              };
            },
            origine.niveaux,
          ),
          mouvement_organique: liste(g.mouvement_organique, (x) => chaine(x.texte), origine.mouvement_organique),
          canon: liste(
            g.canon,
            (c) => ({ numero: Number(c.numero), titre: chaine(c.titre), glose: chaine(c.glose) }),
            origine.canon,
          ),
          champs_autorites: liste(
            g.champs_autorites,
            (c) => ({
              id: chaine(c.champ_id),
              champ: chaine(c.champ),
              autorites: Array.isArray(c.autorites)
                ? (c.autorites as Ligne[]).map((a) => ({
                    nom: chaine(a.nom),
                    origine: chaine(a.origine),
                    motif: chaine(a.motif),
                  }))
                : [],
            }),
            origine.champs_autorites,
          ),
        };
      },
      origine,
      "listes de l'Institution",
    );
  },
);

export type ListesLaboratoire = {
  niveaux_acces: NiveauAcces[];
  progression: EtapeProgression[];
};

export const getListesLaboratoire = cache(
  (): Promise<ListesLaboratoire> => {
    const origine: ListesLaboratoire = {
      niveaux_acces: NIVEAUX_ACCES_CODE,
      progression: PROGRESSION_CODE,
    };
    return ouRepli(
      async () => {
        const g = await lireListes("contenu-laboratoire");
        return {
          niveaux_acces: liste(
            g.niveaux_acces,
            (n) => ({ numero: chaine(n.numero), titre: chaine(n.titre), description: chaine(n.description) }),
            origine.niveaux_acces,
          ),
          progression: liste(
            g.progression,
            (e) => ({ reference: chaine(e.reference), role: chaine(e.role), prerequis: chaine(e.prerequis) }),
            origine.progression,
          ),
        };
      },
      origine,
      "listes du Laboratoire",
    );
  },
);

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
import { RECUEILS as RECUEILS_CODE, type BlocLecture, type Recueil, type TexteLecture } from "@/content/lectures";

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

/* ── Vente des ouvrages (liens d'achat Chariow) ─────────────────────────── */

export type OffreTome = { lien: string; prix?: string; format?: string };
export type VenteOuvrages = Partial<Record<"tome-i" | "tome-ii", OffreTome>>;

/** Offre d'un tome : présente seulement si un lien d'achat est renseigné. */
function offre(v: unknown): OffreTome | undefined {
  const g = (v ?? {}) as Ligne;
  const lien = typeof g.lien_achat === "string" ? g.lien_achat.trim() : "";
  if (!lien.startsWith("https://")) return undefined;
  return { lien, prix: facultatif(g.prix), format: facultatif(g.format) };
}

/** Liens d'achat des tomes saisis dans le back-office (Boutique › Vente des ouvrages). */
export const getVenteOuvrages = cache(
  (): Promise<VenteOuvrages> =>
    ouRepli<VenteOuvrages>(
      async () => {
        const payload = await payloadClient();
        const g = (await payload.findGlobal({ slug: "vente-ouvrages", depth: 0 })) as unknown as Ligne;
        return { "tome-i": offre(g.tome_i), "tome-ii": offre(g.tome_ii) };
      },
      {},
      "vente des ouvrages",
    ),
);

/* ── Les deux tomes : recueils et textes en lecture libre ───────────────── */

type TomeId = Recueil["tome"];

const CLE_GROUPE: Record<TomeId, "tome_i" | "tome_ii"> = { "tome-i": "tome_i", "tome-ii": "tome_ii" };

/** Bloc de la collection « textes-lecture » → bloc de lecture (content/lectures/types.ts). */
function blocLecture(b: Ligne): BlocLecture | null {
  const x = chaine(b.texte);
  switch (b.blockType) {
    case "paragraphe":
      return { t: "p", x };
    case "intertitre":
      return { t: "h", x, n: b.niveau === "4" ? 4 : 3, id: facultatif(b.ancre) };
    case "formule":
      return { t: "f", x };
    case "liste":
      return { t: b.ordonnee ? "ol" : "ul", items: sousTextes(b.items) };
    case "citation":
      return { t: "cite", x, source: chaine(b.source) };
    case "note":
      return { t: "note", x };
    default:
      return null;
  }
}

function texteLecture(d: Ligne): TexteLecture {
  return {
    slug: chaine(d.slug),
    titre: chaine(d.titre),
    sous_titre: facultatif(d.sous_titre) ?? null,
    exergue: facultatif(d.exergue),
    exergue_source: facultatif(d.exergue_source),
    blocs: Array.isArray(d.blocs)
      ? (d.blocs as Ligne[]).map(blocLecture).filter((b): b is BlocLecture => b !== null)
      : [],
  };
}

/**
 * Un recueil depuis Payload. Métadonnées : le global « recueils » (si le titre
 * du tome est renseigné), sinon le code. Textes : la collection, rangés par
 * partie puis par ordre ; un tome sans aucun texte en base garde ceux du code.
 * Les parties sans texte ne sont pas affichées.
 */
function recueilCms(code: Recueil, g: Ligne | undefined, docs: Ligne[]): Recueil {
  const meta = g && facultatif(g.titre) ? g : undefined;
  const titresParties =
    meta && Array.isArray(meta.parties) && meta.parties.length > 0
      ? (meta.parties as Ligne[]).map((p) => ({ titre: chaine(p.titre), description: chaine(p.description) }))
      : code.parties.map((p) => ({ titre: p.titre, description: p.description }));

  let parties: Recueil["parties"];
  if (docs.length === 0) {
    parties = code.parties.map((p, i) => ({ ...p, ...(titresParties[i] ?? {}) }));
  } else {
    const ranges = titresParties.map((p) => ({ ...p, textes: [] as TexteLecture[] }));
    const tries = [...docs].sort(
      (a, b) => Number(a.partie ?? 1) - Number(b.partie ?? 1) || Number(a.ordre ?? 0) - Number(b.ordre ?? 0),
    );
    for (const d of tries) {
      // Numéro de partie hors limites : dernière partie.
      const i = Math.min(Math.max(1, Math.trunc(Number(d.partie) || 1)), ranges.length) - 1;
      ranges[i].textes.push(texteLecture(d));
    }
    parties = ranges;
  }
  parties = parties.filter((p) => p.textes.length > 0);

  if (!meta) return { ...code, parties };
  const plan = Array.isArray(meta.plan)
    ? (meta.plan as Ligne[]).map((l) => ({ titre: chaine(l.titre), libre: facultatif(l.libre) }))
    : [];
  const presentation = sousTextes(meta.presentation).filter((p) => p.trim());
  return {
    tome: code.tome,
    etiquette: facultatif(meta.etiquette) ?? code.etiquette,
    titre: chaine(meta.titre),
    sous_titre: chaine(meta.sous_titre),
    presentation,
    parties,
    plan: plan.length > 0 ? plan : undefined,
  };
}

/**
 * Les deux tomes en lecture libre (Ouvrage › Les deux tomes et Textes des
 * tomes), sous la forme de `content/lectures` — qui sert de repli sans base.
 */
export const getRecueils = cache(
  (): Promise<Recueil[]> =>
    ouRepli(
      async () => {
        const payload = await payloadClient();
        const [g, { docs }] = await Promise.all([
          payload.findGlobal({ slug: "recueils", depth: 0 }),
          payload.find({
            collection: "textes-lecture",
            sort: "ordre",
            pagination: false,
            depth: 0,
          }),
        ]);
        const global = g as unknown as Ligne;
        const lignes = docs as unknown as Ligne[];
        return RECUEILS_CODE.map((code) =>
          recueilCms(
            code,
            global[CLE_GROUPE[code.tome]] as Ligne | undefined,
            lignes.filter((d) => d.tome === code.tome),
          ),
        );
      },
      RECUEILS_CODE,
      "recueils des tomes",
    ),
);

export async function getRecueil(tome: string): Promise<Recueil | undefined> {
  return (await getRecueils()).find((r) => r.tome === tome);
}

/** Textes d'un tome dans l'ordre de lecture (toutes parties confondues). */
export async function getTextesDe(tome: string): Promise<TexteLecture[]> {
  const recueil = await getRecueil(tome);
  return recueil ? recueil.parties.flatMap((p) => p.textes) : [];
}

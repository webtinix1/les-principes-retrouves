import type { Payload } from "payload";
import { amorcerLibrairie } from "@/lib/librairie/amorce";
import { PAGES_BLOCS } from "@/content/blocs";
import ORIGINE from "@/content/blocs/origine.json";
import { MODULES } from "@/content/modules";
import { STRATES } from "@/content/concepts";
import { AUTORITES } from "@/content/autorites";
import { WORKING_PAPERS, PIECES_OPERATOIRES } from "@/content/working-papers";
import { RECUEILS, type BlocLecture, type Recueil } from "@/content/lectures";
import { nomChamp, slugGlobal } from "./globals/contenu";
import { AMORCE_LISTES } from "./globals/listes";

/**
 * Amorçage idempotent, exécuté au démarrage du serveur (onInit) :
 *  - 1er compte admin depuis PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD ;
 *  - collections éditoriales vides → remplies depuis `content/*.ts` ;
 *  - pages jamais enregistrées → remplies avec le texte d'origine
 *    (`content/blocs/origine.json`, extrait du rendu JSX).
 * Rien n'est jamais écrasé : seul ce qui est vide est amorcé.
 */

type Origine = Record<string, { lexical?: unknown; html?: string; texte?: string }>;

/** Niveau d'accès débloqué par chaque module (historique : lib/commerce.ts). */
const NIVEAU_MODULE: Record<string, "module_i" | "module_ii" | "module_iii"> = {
  fondements_organon: "module_i",
  laboratoire_proactivite_juridique: "module_ii",
  strategie_architectonique_systemique: "module_iii",
};

/** Niveau requis par ressource (historique : lib/access.ts). */
const NIVEAU_RESSOURCE: Record<string, "module_i" | "module_ii" | "module_iii"> = {
  wp_01: "module_i",
  wp_02: "module_i",
  wp_03: "module_i",
  guide_technique: "module_ii",
  arret_pilote: "module_ii",
};

async function estVide(payload: Payload, collection: Parameters<Payload["count"]>[0]["collection"]) {
  const { totalDocs } = await payload.count({ collection });
  return totalDocs === 0;
}

async function amorcerAdmin(payload: Payload) {
  const email = process.env.PAYLOAD_ADMIN_EMAIL;
  const password = process.env.PAYLOAD_ADMIN_PASSWORD;
  if (!email || !password || !(await estVide(payload, "users"))) return;
  await payload.create({ collection: "users", data: { email, password, nom: "Administrateur" } });
  payload.logger.info(`[amorçage] compte administrateur créé : ${email}`);
}

async function amorcerCollections(payload: Payload) {
  if (await estVide(payload, "modules")) {
    for (const [ordre, m] of MODULES.entries()) {
      await payload.create({
        collection: "modules",
        data: {
          module_id: m.id,
          ordre,
          niveau: NIVEAU_MODULE[m.id] ?? "module_i",
          numero: m.numero,
          titre: m.titre,
          public_cible: m.public_cible,
          duree: m.duree,
          prerequis: m.prerequis,
          sessions: m.sessions.map((s) => ({
            titre: s.titre,
            points: s.points.map((texte) => ({ texte })),
          })),
          livrables: m.livrables.map((texte) => ({ texte })),
          tarif_b2b: m.tarif_b2b,
          tarif_b2c: m.tarif_b2c,
          tarif_devis: m.tarif_devis,
          cta_label: m.cta_label,
        },
      });
    }
    payload.logger.info(`[amorçage] ${MODULES.length} modules`);
  }

  if (await estVide(payload, "strates")) {
    for (const [ordre, s] of STRATES.entries()) {
      const strate = await payload.create({
        collection: "strates",
        data: { strate_id: s.id, ordre, titre: s.titre, sous_titre: s.sous_titre },
      });
      for (const c of s.concepts) {
        await payload.create({
          collection: "concepts",
          data: {
            concept_id: c.id,
            numero: c.numero,
            strate: strate.id,
            titre: c.titre,
            definition: c.definition,
            portee: c.portee,
          },
        });
      }
    }
    payload.logger.info(`[amorçage] ${STRATES.length} strates et leurs concepts`);
  }

  if (await estVide(payload, "autorites")) {
    for (const [ordre, a] of AUTORITES.entries()) {
      await payload.create({
        collection: "autorites",
        data: { autorite_id: a.id, ordre, nom: a.nom, pays: a.pays, apport: a.apport },
      });
    }
    payload.logger.info(`[amorçage] ${AUTORITES.length} autorités`);
  }

  if (await estVide(payload, "ressources")) {
    const toutes = [
      ...WORKING_PAPERS.map((r) => ({ r, categorie: "working_paper" as const })),
      ...PIECES_OPERATOIRES.map((r) => ({ r, categorie: "piece_operatoire" as const })),
    ];
    for (const [ordre, { r, categorie }] of toutes.entries()) {
      await payload.create({
        collection: "ressources",
        data: {
          ressource_id: r.id,
          categorie,
          ordre,
          niveau_requis: NIVEAU_RESSOURCE[r.id] ?? "module_i",
          is_available: false,
          reference: r.reference,
          titre: r.titre,
          classification: r.classification,
          volume: r.volume,
          statut: r.statut,
          soumission: r.soumission,
          resume_label: r.resume_label,
          resume: r.resume.map((texte) => ({ texte })),
          concepts_mobilises: (r.concepts_mobilises ?? []).map((texte) => ({ texte })),
        },
      });
    }
    payload.logger.info(`[amorçage] ${toutes.length} ressources`);
  }
}

/**
 * Textes des pages : chaque champ encore vide reçoit son texte d'origine,
 * champ par champ (un champ déjà saisi n'est jamais écrasé). Les listes du
 * registre vides reçoivent leurs données d'origine.
 */
async function amorcerPages(payload: Payload) {
  const origine = ORIGINE as Origine;
  for (const page of PAGES_BLOCS) {
    const slug = slugGlobal(page);
    const actuel = (await payload.findGlobal({ slug, depth: 0 })) as unknown as Record<string, unknown>;

    const data: Record<string, unknown> = {};
    for (const bloc of page.blocs) {
      const champ = nomChamp(bloc.cle);
      if (actuel[champ] != null && actuel[champ] !== "") continue;
      const o = origine[bloc.cle];
      if (bloc.type === "riche") {
        if (o?.lexical) data[champ] = o.lexical;
      } else {
        const texte = bloc.defaut ?? o?.texte;
        if (texte) data[champ] = texte;
      }
    }
    for (const liste of page.listes ?? []) {
      const existant = actuel[liste.nom];
      if (Array.isArray(existant) && existant.length > 0) continue;
      data[liste.nom] = liste.origine.map((el) =>
        Object.fromEntries(
          Object.entries(el).map(([k, v]) => [k, Array.isArray(v) ? v.map((texte) => ({ texte })) : v]),
        ),
      );
    }
    if (Object.keys(data).length === 0) continue;
    await payload.updateGlobal({ slug, data: data as never });
    payload.logger.info(`[amorçage] ${page.chemin} (${page.page}) : ${Object.keys(data).length} champ(s)`);
  }
}

/** Listes structurées des pages : chaque liste vide reçoit les données d'origine. */
async function amorcerListes(payload: Payload) {
  for (const page of PAGES_BLOCS) {
    const listes = AMORCE_LISTES[page.page];
    if (!listes) continue;
    const slug = slugGlobal(page);
    const actuel = (await payload.findGlobal({ slug, depth: 0 })) as unknown as Record<string, unknown>;
    const data: Record<string, unknown> = {};
    for (const [nom, valeur] of Object.entries(listes)) {
      const existant = actuel[nom];
      if (!Array.isArray(existant) || existant.length === 0) data[nom] = valeur;
    }
    if (Object.keys(data).length === 0) continue;
    await payload.updateGlobal({ slug, data: data as never });
    payload.logger.info(`[amorçage] listes de ${page.chemin} : ${Object.keys(data).join(", ")}`);
  }
}

/** Bloc de lecture (content/lectures) → bloc de la collection « textes-lecture ». */
function blocPayload(b: BlocLecture) {
  switch (b.t) {
    case "p":
      return { blockType: "paragraphe" as const, texte: b.x };
    case "h":
      return { blockType: "intertitre" as const, texte: b.x, niveau: b.n === 4 ? ("4" as const) : ("3" as const), ancre: b.id };
    case "f":
      return { blockType: "formule" as const, texte: b.x };
    case "ol":
    case "ul":
      return { blockType: "liste" as const, ordonnee: b.t === "ol", items: b.items.map((texte) => ({ texte })) };
    case "cite":
      return { blockType: "citation" as const, texte: b.x, source: b.source };
    case "note":
      return { blockType: "note" as const, texte: b.x };
  }
}

/**
 * Textes des tomes (Ouvrage › Textes des tomes) : collection vide → les textes
 * de `content/lectures`, avec leur partie (1, 2…) et leur ordre de lecture.
 */
async function amorcerTextesLecture(payload: Payload) {
  if (!(await estVide(payload, "textes-lecture"))) return;
  let n = 0;
  for (const recueil of RECUEILS) {
    for (const [iPartie, partie] of recueil.parties.entries()) {
      for (const [ordre, t] of partie.textes.entries()) {
        await payload.create({
          collection: "textes-lecture",
          data: {
            tome: recueil.tome,
            partie: iPartie + 1,
            ordre,
            slug: t.slug,
            titre: t.titre,
            sous_titre: t.sous_titre ?? undefined,
            etiquette: t.etiquette,
            extrait: t.extrait,
            exergue: t.exergue,
            exergue_source: t.exergue_source,
            blocs: t.blocs.map(blocPayload),
          },
        });
        n++;
      }
    }
  }
  payload.logger.info(`[amorçage] ${n} textes des tomes`);
}

/** Métadonnées d'un tome pour le global « recueils ». */
function groupeRecueil(r: Recueil) {
  return {
    etiquette: r.etiquette,
    titre: r.titre,
    sous_titre: r.sous_titre,
    presentation: r.presentation.map((texte) => ({ texte })),
    parties: r.parties.map((p) => ({ titre: p.titre, description: p.description })),
    plan: (r.plan ?? []).map((l) => ({ titre: l.titre, libre: l.libre ?? "" })),
  };
}

/** Les deux tomes (Ouvrage › Les deux tomes) : chaque tome sans titre reçoit ses données d'origine. */
async function amorcerRecueils(payload: Payload) {
  const actuel = (await payload.findGlobal({ slug: "recueils", depth: 0 })) as unknown as Record<
    string,
    { titre?: string | null } | undefined
  >;
  const data: Record<string, unknown> = {};
  for (const r of RECUEILS) {
    const groupe = r.tome === "tome-i" ? "tome_i" : "tome_ii";
    if (!actuel[groupe]?.titre) data[groupe] = groupeRecueil(r);
  }
  if (Object.keys(data).length === 0) return;
  await payload.updateGlobal({ slug: "recueils", data: data as never });
  payload.logger.info(`[amorçage] les deux tomes : ${Object.keys(data).join(", ")}`);
}

export async function amorcer(payload: Payload): Promise<void> {
  try {
    await amorcerAdmin(payload);
    await amorcerCollections(payload);
    await amorcerTextesLecture(payload);
    await amorcerRecueils(payload);
    await amorcerPages(payload);
    await amorcerListes(payload);
    await amorcerLibrairie(payload);
  } catch (err) {
    payload.logger.error({ err }, "[amorçage] échec");
  }
}

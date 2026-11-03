import type { Payload } from "payload";
import { PAGES_BLOCS } from "@/content/blocs";
import ORIGINE from "@/content/blocs/origine.json";
import { MODULES } from "@/content/modules";
import { STRATES } from "@/content/concepts";
import { AUTORITES } from "@/content/autorites";
import { WORKING_PAPERS, PIECES_OPERATOIRES } from "@/content/working-papers";
import { nomChamp, slugGlobal } from "./globals/contenu";

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

async function amorcerPages(payload: Payload) {
  const origine = ORIGINE as Origine;
  for (const page of PAGES_BLOCS) {
    const slug = slugGlobal(page);
    const actuel = (await payload.findGlobal({ slug, depth: 0 })) as unknown as Record<string, unknown>;
    const dejaSaisi = page.blocs.some((b) => actuel[nomChamp(b.cle)] != null);
    if (dejaSaisi) continue;

    const data: Record<string, unknown> = {};
    for (const bloc of page.blocs) {
      const o = origine[bloc.cle];
      if (!o) continue;
      data[nomChamp(bloc.cle)] = bloc.type === "riche" ? o.lexical : o.texte;
    }
    await payload.updateGlobal({ slug, data });
    payload.logger.info(`[amorçage] page ${page.chemin}`);
  }
}

export async function amorcer(payload: Payload): Promise<void> {
  try {
    await amorcerAdmin(payload);
    await amorcerCollections(payload);
    await amorcerPages(payload);
  } catch (err) {
    payload.logger.error({ err }, "[amorçage] échec");
  }
}

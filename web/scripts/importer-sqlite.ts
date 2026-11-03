/**
 * Import ONE-SHOT de l'ancienne base SQLite (Prisma) dans Payload/PostgreSQL.
 *
 * Reprend : messages de contact, commandes, codes d'accès, disponibilité des
 * ressources, et les textes réécrits dans l'ancien back-office (ContenuBloc).
 * Idempotent pour les données métier (dédoublonnage par code d'accès, par
 * e-mail+date pour les messages et les commandes) ; les textes importés
 * écrasent le texte d'amorçage.
 *
 * Usage (base PostgreSQL déjà migrée et amorcée — serveur démarré une fois) :
 *   SQLITE_FILE=/chemin/prod.db yarn import:sqlite
 */
import "dotenv/config";
import { createClient } from "@libsql/client";
import { JSDOM } from "jsdom";
import { getPayload, type Payload } from "payload";
import { convertHTMLToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import config from "@payload-config";
import { BLOC_PAR_CLE, PAGE_PAR_CLE } from "@/content/blocs";
import { nomChamp, slugGlobal } from "@/payload/globals/contenu";
import { editeurProse } from "@/payload/editeur";

type Ligne = Record<string, unknown>;
const str = (v: unknown) => (v == null ? undefined : String(v));
const date = (v: unknown) => (v == null ? undefined : new Date(Number(v) || String(v)).toISOString());

/** Décode les entités HTML d'un texte court (les surcharges « simples » en contenaient). */
function texteBrut(html: string): string {
  return new JSDOM(`<p>${html}</p>`).window.document.body.textContent?.trim() ?? html;
}

async function premier(payload: Payload, collection: "commandes" | "messages-contact" | "codes-acces", where: Ligne) {
  const { docs } = await payload.find({ collection, where: where as never, limit: 1, depth: 0 });
  return docs[0];
}

const fichier = process.env.SQLITE_FILE;
if (!fichier) {
  console.error("SQLITE_FILE manquant (chemin du prod.db à importer).");
  process.exit(1);
}

const db = createClient({ url: `file:${fichier}` });
const lignes = async (table: string): Promise<Ligne[]> => {
  try {
    return (await db.execute(`SELECT * FROM "${table}"`)).rows as unknown as Ligne[];
  } catch {
    console.warn(`Table ${table} absente — ignorée.`);
    return [];
  }
};

const payload = await getPayload({ config });
const bilan: Record<string, number> = {};
const compter = (k: string) => (bilan[k] = (bilan[k] ?? 0) + 1);

// 1. Messages de contact
for (const m of await lignes("ContactMessage")) {
  const createdAt = date(m.created_at);
  if (await premier(payload, "messages-contact", { email: { equals: m.email }, createdAt: { equals: createdAt } })) continue;
  await payload.create({
    collection: "messages-contact",
    data: {
      nom: String(m.nom),
      email: String(m.email),
      organisation: str(m.organisation),
      sujet: String(m.sujet),
      message: String(m.message),
      consent_rgpd: Boolean(m.consent_rgpd),
      statut: (str(m.statut) ?? "nouveau") as "nouveau",
      source: str(m.source) ?? "site",
      createdAt,
    },
  });
  compter("messages");
}

// 2. Commandes (ancien id cuid → nouvel id UUID)
const idCommande = new Map<string, string>();
for (const c of await lignes("Commande")) {
  const createdAt = date(c.created_at);
  const existant = await premier(payload, "commandes", {
    buyer_email: { equals: c.buyer_email },
    createdAt: { equals: createdAt },
  });
  if (existant) {
    idCommande.set(String(c.id), existant.id);
    continue;
  }
  const doc = await payload.create({
    collection: "commandes",
    data: {
      module_id: String(c.module_id),
      module_titre: String(c.module_titre),
      tarif_type: String(c.tarif_type) as "b2b",
      montant: String(c.montant),
      devise: str(c.devise) ?? "EUR",
      buyer_nom: String(c.buyer_nom),
      buyer_email: String(c.buyer_email),
      buyer_organisation: str(c.buyer_organisation),
      buyer_telephone: str(c.buyer_telephone),
      buyer_pays: str(c.buyer_pays),
      payment_provider: str(c.payment_provider) ?? "mock",
      payment_ref: str(c.payment_ref),
      statut: String(c.statut) as "paye",
      createdAt,
    },
  });
  idCommande.set(String(c.id), doc.id);
  compter("commandes");
}

// 3. Codes d'accès
for (const k of await lignes("CodeAcces")) {
  if (await premier(payload, "codes-acces", { code: { equals: k.code } })) continue;
  const commande = idCommande.get(String(k.commande_id));
  if (!commande) {
    console.warn(`Code ${k.code} : commande ${k.commande_id} introuvable — ignoré.`);
    continue;
  }
  await payload.create({
    collection: "codes-acces",
    data: {
      code: String(k.code),
      niveau: String(k.niveau) as "module_i",
      email: String(k.email),
      commande,
      revoked: Boolean(k.revoked),
      expires_at: date(k.expires_at),
      used_at: date(k.used_at),
      createdAt: date(k.created_at),
    },
  });
  compter("codes");
}

// 4. Disponibilité des ressources
for (const r of await lignes("RessourceEtat")) {
  const { docs } = await payload.find({
    collection: "ressources",
    where: { ressource_id: { equals: r.ressource_id } },
    limit: 1,
  });
  if (!docs[0]) continue;
  await payload.update({
    collection: "ressources",
    id: docs[0].id,
    data: { is_available: Boolean(r.is_available) },
  });
  compter("ressources");
}

// 5. Textes réécrits dans l'ancien back-office
const editorConfig = await editorConfigFactory.fromEditor({ config: payload.config, editor: editeurProse });
const parGlobal = new Map<string, Ligne>();
for (const b of await lignes("ContenuBloc")) {
  const cle = String(b.cle);
  const valeur = String(b.valeur);
  const [prefixe, id, champ] = cle.split(".");

  const page = PAGE_PAR_CLE.get(cle);
  const def = BLOC_PAR_CLE.get(cle);
  if (page && def) {
    const slug = slugGlobal(page);
    const data = parGlobal.get(slug) ?? {};
    data[nomChamp(cle)] =
      def.type === "riche"
        ? convertHTMLToLexical({ editorConfig, html: valeur, JSDOM })
        : texteBrut(valeur);
    parGlobal.set(slug, data);
    compter("textes de page");
    continue;
  }

  // Anciennes clés de liste, désormais champs de collections.
  const texte = texteBrut(valeur);
  if (prefixe === "concepts" && (champ === "definition" || champ === "portee")) {
    const { docs } = await payload.find({ collection: "concepts", where: { concept_id: { equals: id } }, limit: 1 });
    if (docs[0]) {
      await payload.update({ collection: "concepts", id: docs[0].id, data: { [champ]: texte } });
      compter("textes de concepts");
      continue;
    }
  }
  if (prefixe === "modules" && ["public_cible", "duree", "prerequis"].includes(champ)) {
    const { docs } = await payload.find({ collection: "modules", where: { module_id: { equals: id } }, limit: 1 });
    if (docs[0]) {
      await payload.update({ collection: "modules", id: docs[0].id, data: { [champ]: texte } });
      compter("textes de modules");
      continue;
    }
  }
  if (prefixe === "ressources") {
    const { docs } = await payload.find({ collection: "ressources", where: { ressource_id: { equals: id } }, limit: 1, depth: 0 });
    const doc = docs[0];
    const n = /^resume_(\d+)$/.exec(champ)?.[1];
    if (doc && champ === "titre") {
      await payload.update({ collection: "ressources", id: doc.id, data: { titre: texte } });
      compter("textes de ressources");
      continue;
    }
    if (doc && n && doc.resume?.[Number(n) - 1]) {
      const resume = doc.resume.map((p, i) => (i === Number(n) - 1 ? { ...p, texte } : p));
      await payload.update({ collection: "ressources", id: doc.id, data: { resume } });
      compter("textes de ressources");
      continue;
    }
  }
  console.warn(`Texte « ${cle} » sans destination — ignoré.`);
}
for (const [slug, data] of parGlobal) {
  await payload.updateGlobal({ slug: slug as never, data: data as never });
}

console.log("Import terminé :", bilan);
process.exit(0);

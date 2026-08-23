#!/usr/bin/env node
/**
 * Construit CHARIOW_PRODUCT_MAP à partir des produits PUBLIÉS du dashboard Chariow.
 *
 * L'API Chariow est en lecture seule sur les produits : ils sont créés et publiés
 * au dashboard. Ce script lit `GET /v1/products`, associe chaque produit publié à
 * un (module, régime) par convention de nommage, et imprime le JSON prêt à coller
 * dans `CHARIOW_PRODUCT_MAP` (.env serveur).
 *
 * Convention de nommage attendue dans le dashboard :
 *   « Module I — … (B2B) », « Module I — … (B2C) », « Module II — … (B2B) », …
 * (le numéro romain + le régime entre parenthèses suffisent).
 *
 * Usage : CHARIOW_API_KEY=sk_... node scripts/chariow-map.mjs
 */

const KEY = process.env.CHARIOW_API_KEY;
if (!KEY) {
  console.error("CHARIOW_API_KEY manquant dans l'environnement.");
  process.exit(1);
}

// Numéro de module (dans le nom du produit) → module_id du code (content/modules.ts).
const MODULE_PAR_NUMERO = {
  I: "fondements_organon",
  II: "laboratoire_proactivite_juridique",
  // Module III est « sur devis » : pas de produit Chariow.
};

function analyserNom(nom) {
  const num = nom.match(/module\s+(III|II|I)\b/i)?.[1]?.toUpperCase();
  const regime = /\bB2B\b/i.test(nom) ? "b2b" : /\bB2C\b/i.test(nom) ? "b2c" : null;
  return { module_id: num ? MODULE_PAR_NUMERO[num] : null, regime, num };
}

async function tousLesProduits() {
  const out = [];
  let url = "https://api.chariow.com/v1/products";
  while (url) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${KEY}` } });
    if (!res.ok) throw new Error(`GET /products → HTTP ${res.status}`);
    const j = await res.json();
    out.push(...(j.data ?? []));
    url = j.pagination?.next_page_url ?? null;
  }
  return out;
}

const produits = await tousLesProduits();
const map = {};
const ignores = [];

for (const p of produits) {
  const publie = p.status === "published" || p.status === "active";
  const { module_id, regime, num } = analyserNom(p.name);
  if (!publie || !module_id || !regime) {
    ignores.push(
      `  - ${p.id}  [${p.status}]  « ${p.name} »` +
        (!publie ? "  → non publié" : !module_id ? `  → module « ${num ?? "?"} » non reconnu` : "  → régime B2B/B2C absent du nom"),
    );
    continue;
  }
  (map[module_id] ??= {})[regime] = p.id;
}

console.log(`\n${produits.length} produit(s) lu(s).`);
if (ignores.length) {
  console.log(`\nNon retenus (à publier / renommer au dashboard) :`);
  console.log(ignores.join("\n"));
}

const attendus = ["fondements_organon", "laboratoire_proactivite_juridique"];
const manquants = attendus.flatMap((m) =>
  ["b2b", "b2c"].filter((r) => !map[m]?.[r]).map((r) => `${m}/${r}`),
);

console.log(`\nCHARIOW_PRODUCT_MAP (à coller dans .env, sur une seule ligne) :`);
console.log(`CHARIOW_PRODUCT_MAP=${JSON.stringify(map)}`);

if (manquants.length) {
  console.log(`\n⚠ Incomplet — il manque : ${manquants.join(", ")}`);
  console.log(`  Publie les produits correspondants au dashboard, puis relance ce script.`);
  process.exit(2);
}
console.log(`\n✓ Complet : les 4 produits (Modules I & II × B2B/B2C) sont mappés.`);

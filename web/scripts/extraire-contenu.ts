/**
 * Génère `content/blocs/origine.json` : le texte d'origine de chaque bloc
 * éditable, tel que rendu par le JSX des pages, converti pour Payload.
 *
 *   - bloc riche  → { lexical, html }  (état Lexical + son rendu HTML normalisé)
 *   - bloc simple → { texte }
 *
 * Ce fichier sert à (1) amorcer les pages dans Payload, (2) reconnaître au rendu
 * un bloc resté identique à l'origine, pour lequel on sert le JSX d'origine —
 * typographie fine comprise — plutôt que sa version re-sérialisée.
 *
 * Usage (serveur de dev lancé, pages NON encore modifiées dans Payload) :
 *   yarn contenu:extraire                      # lit http://127.0.0.1:3000
 *   CONTENU_JSON=dump.json yarn contenu:extraire   # ou un dump { cle: { html, text } }
 */
import "dotenv/config";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { JSDOM } from "jsdom";
import { parse } from "node-html-parser";
import { getPayload } from "payload";
import { convertHTMLToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import config from "@payload-config";
import { PAGES_BLOCS, BLOC_PAR_CLE } from "@/content/blocs";
import { editeurProse } from "@/payload/editeur";
import { lexicalEnHtml } from "@/lib/contenu/lexical";

type Brut = Record<string, { html: string; text: string }>;

async function depuisServeur(base: string): Promise<Brut> {
  const brut: Brut = {};
  for (const page of PAGES_BLOCS) {
    const html = await (await fetch(`${base}${page.chemin}`, { cache: "no-store" })).text();
    for (const n of parse(html).querySelectorAll("[data-bloc]")) {
      brut[n.getAttribute("data-bloc")!] = { html: n.innerHTML.trim(), text: n.textContent.trim() };
    }
  }
  return brut;
}

async function main() {
  const dump = process.env.CONTENU_JSON;
  const brut: Brut = dump
    ? JSON.parse(await readFile(dump, "utf8"))
      : await depuisServeur(process.env.SITE_LOCAL ?? "http://127.0.0.1:3000");

  const payload = await getPayload({ config });
  const editorConfig = await editorConfigFactory.fromEditor({
    config: payload.config,
    editor: editeurProse,
  });

  const sortie: Record<string, unknown> = {};
  const manquants: string[] = [];
  for (const [cle, def] of BLOC_PAR_CLE) {
    const b = brut[cle];
    if (!b) {
      manquants.push(cle);
      continue;
    }
    if (def.type === "riche") {
      const lexical = convertHTMLToLexical({ editorConfig, html: b.html, JSDOM });
      sortie[cle] = { lexical, html: lexicalEnHtml(lexical) };
    } else {
      sortie[cle] = { texte: b.text.replace(/\s+/g, " ").trim() };
    }
  }

  const fichier = path.resolve(process.cwd(), "content/blocs/origine.json");
  await writeFile(fichier, JSON.stringify(sortie, null, 1) + "\n");
  console.log(`${Object.keys(sortie).length} blocs écrits dans ${fichier}`);
  if (manquants.length) console.warn("Blocs absents du rendu :", manquants.join(", "));
  process.exit(0);
}

// `payload run` importe le module sans attendre une promesse : top-level await.
try {
  await main();
} catch (err) {
  console.error(err);
  process.exit(1);
}

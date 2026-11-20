import sanitizeHtml from "sanitize-html";

/**
 * Liste blanche calibrée sur la typographie réellement employée par les pages
 * doctrinales (inventaire du 2026-08-19 : strong, li, h3, ul, em, blockquote,
 * a, h4, ol, br). Tout le reste est retiré à l'enregistrement : le back-office
 * ne doit jamais pouvoir injecter de mise en forme hors du design system, ni
 * de HTML actif (script, style, iframe, attributs on*).
 */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "em",
    "ul",
    "ol",
    "li",
    "h2",
    "h3",
    "h4",
    "blockquote",
    "a",
    "sup",
    "sub",
    "cite",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  // Pas de lien protocole-relatif (//evil.tld) ni de href vide.
  allowProtocolRelative: false,
  // Les liens externes ne doivent pas exposer l'onglet d'origine.
  transformTags: {
    a: (nom, attribs) => {
      const href = attribs.href ?? "";
      const externe = /^https?:\/\//i.test(href);
      const { target: _t, rel: _r, ...reste } = attribs;
      return {
        tagName: nom,
        attribs: externe
          ? { ...reste, target: "_blank", rel: "noopener noreferrer" }
          : reste,
      };
    },
    // L'éditeur produit du <b>/<i> selon les navigateurs : on normalise.
    b: "strong",
    i: "em",
  },
  // Liens vides laissés par l'éditeur (on ne filtre QUE <a> : appliqué aux
  // balises conteneurs, exclusiveFilter supprimerait des blocs encore pleins).
  exclusiveFilter: (frame) => frame.tag === "a" && !frame.text.trim(),
};

/** Assainit un fragment HTML issu du back-office. À appeler AVANT toute écriture. */
export function sanitizeContenu(html: string): string {
  return sanitizeHtml(html, OPTIONS).trim();
}

/**
 * Ancre stable d'un intertitre, déduite de son texte : « 7. Annulation,
 * report, remboursement » → « annulation-report-remboursement ». La
 * numérotation de tête est ignorée, les accents retirés. Même fonction pour le
 * JSX d'origine et pour le HTML du back-office : les ancres du sommaire
 * correspondent toujours aux intertitres rendus.
 */
export function ancreTitre(texte: string): string {
  return (
    texte
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/^\s*\d+\s*[.)°-]?\s*/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

/** Libellé de sommaire d'un intertitre : son texte sans la numérotation de tête. */
export function libelleTitre(texte: string): string {
  return texte.replace(/^\s*\d+\s*[.)°-]?\s+/, "").trim();
}

const ENTITES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

/** Texte d'un fragment HTML (balises retirées, entités courantes décodées). */
function texteHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
      if (e[0] === "#") {
        const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : m;
      }
      return ENTITES[e.toLowerCase()] ?? m;
    })
    .replace(/\s+/g, " ")
    .trim();
}

export type TitreAncre = { niveau: 2 | 3; id: string; texte: string };

/**
 * Pose un `id` stable (cf. `ancreTitre`) sur chaque <h2>/<h3> d'un HTML assaini
 * (le back-office ne conserve pas les attributs des intertitres) et renvoie
 * les intertitres rencontrés, dans l'ordre. Les doublons reçoivent un suffixe
 * « -2 », « -3 »… Le HTML d'entrée doit être passé par `sanitizeContenu`.
 */
export function ancrerTitres(html: string): { html: string; titres: TitreAncre[] } {
  const vus = new Map<string, number>();
  const titres: TitreAncre[] = [];
  const sortie = html.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (_m, n: string, attributs: string | undefined, interieur: string) => {
      const texte = texteHtml(interieur);
      const base = ancreTitre(texte);
      const rang = (vus.get(base) ?? 0) + 1;
      vus.set(base, rang);
      const id = rang === 1 ? base : `${base}-${rang}`;
      titres.push({ niveau: n === "2" ? 2 : 3, id, texte });
      const autres = (attributs ?? "").replace(/\sid\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
      return `<h${n} id="${id}"${autres}>${interieur}</h${n}>`;
    },
  );
  return { html: sortie, titres };
}

/** Version texte brut (aperçus, longueurs, recherche dans le back-office). */
export function contenuEnTexte(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}

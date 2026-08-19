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

/** Version texte brut (aperçus, longueurs, recherche dans le back-office). */
export function contenuEnTexte(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}

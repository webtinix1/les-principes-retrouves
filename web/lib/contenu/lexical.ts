import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { sanitizeContenu } from "./sanitize";

/**
 * Rendu HTML d'un champ riche Payload (Lexical), passé par la même liste
 * blanche que l'ancien back-office : rien hors du design system, aucun HTML
 * actif. Espaces normalisés pour que la comparaison avec le texte d'origine
 * (`content/blocs/origine.json`) soit stable.
 */
export function lexicalEnHtml(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const html = convertLexicalToHTML({
    data: data as SerializedEditorState,
    disableContainer: true,
  });
  return normaliserHtml(sanitizeContenu(html));
}

export function normaliserHtml(html: string): string {
  return html.replace(/\s+/g, " ").replace(/> </g, "><").trim();
}

/** Vrai si l'état Lexical ne contient aucun texte (champ vidé dans l'admin). */
export function lexicalEstVide(data: unknown): boolean {
  return lexicalEnHtml(data).replace(/<[^>]+>/g, "").trim() === "";
}

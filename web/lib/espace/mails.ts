import type { Payload } from "payload";

/** Adresse publique du site (liens des e-mails). */
export function urlSite(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

const echapper = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Corps HTML minimal : un paragraphe par ligne, {lien} devient un lien cliquable. */
export function corpsHtml(texte: string, lien?: string): string {
  const paragraphes = texte
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const e = echapper(l);
      const el = lien ? echapper(lien) : "";
      const ancre = `<a href="${el}">${el}</a>`;
      return `<p>${lien ? (e.includes("{lien}") ? e.replace("{lien}", ancre) : e.replace(el, ancre)) : e}</p>`;
    });
  return paragraphes.join("");
}

/** Envoie un e-mail dont l'objet et le corps sont des textes éditables du registre. */
export async function envoyerModele(
  payload: Payload,
  a: string,
  modele: string,
  valeurs: Record<string, string | number> = {},
): Promise<boolean> {
  try {
    const { getTexte } = await import("@/lib/contenu");
    const [subject, texte] = await Promise.all([
      getTexte(`utilisateurs.mail.${modele}_objet`, valeurs),
      getTexte(`utilisateurs.mail.${modele}_corps`, valeurs),
    ]);
    const lien = typeof valeurs.lien === "string" ? valeurs.lien : undefined;
    await payload.sendEmail({
      to: a,
      subject,
      text: texte,
      html: corpsHtml(texte.replace(lien ?? "\u0000", "{lien}"), lien),
    });
    return true;
  } catch (err) {
    payload.logger.error({ err }, `[espace] e-mail « ${modele} » non envoyé`);
    return false;
  }
}

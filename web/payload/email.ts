import type { EmailAdapter, SendEmailOptions } from "payload";

/**
 * Adaptateur e-mail Payload → API Resend (même compte que le formulaire de
 * contact, cf. lib/email.ts). Sert aux e-mails du back-office : mot de passe
 * oublié, notifications Payload.
 *
 * Actif seulement si RESEND_API_KEY et RESEND_FROM sont renseignés ; sinon
 * Payload écrit les e-mails dans les logs (comportement par défaut).
 * RESEND_FROM accepte "adresse@domaine" ou "Nom <adresse@domaine>".
 */

type Adresse = { name: string; address: string };
type Destinataire = SendEmailOptions["to"];

function analyserFrom(valeur: string): Adresse {
  const m = /^\s*(.*?)\s*<\s*([^>]+)\s*>\s*$/.exec(valeur);
  return m
    ? { name: m[1].replace(/^"|"$/g, ""), address: m[2] }
    : { name: "Les Principes Retrouvés", address: valeur.trim() };
}

function formater(a: unknown): string {
  if (!a) return "";
  if (typeof a === "string") return a;
  const { name, address } = a as Adresse;
  return name ? `${name} <${address}>` : address;
}

/** Liste d'adresses, ou `undefined` si vide (Resend refuse les tableaux vides). */
function liste(d: Destinataire): string[] | undefined {
  if (!d) return undefined;
  const adresses = (Array.isArray(d) ? d : [d]).map(formater).filter(Boolean);
  return adresses.length ? adresses : undefined;
}

export function emailResend(): EmailAdapter | undefined {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return undefined;

  const expediteur = analyserFrom(from);

  return () => ({
    name: "resend",
    defaultFromAddress: expediteur.address,
    defaultFromName: expediteur.name,
    async sendEmail(message) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: formater(message.from) || formater(expediteur),
          to: liste(message.to),
          cc: liste(message.cc),
          bcc: liste(message.bcc),
          reply_to: liste(message.replyTo as Destinataire),
          subject: message.subject,
          html: typeof message.html === "string" ? message.html : undefined,
          text: typeof message.text === "string" ? message.text : undefined,
        }),
      });
      if (!res.ok) {
        throw new Error(`Resend : envoi refusé (${res.status}) ${await res.text()}`);
      }
      return res.json();
    },
  });
}

/**
 * Adaptateur choisi par EMAIL_TRANSPORT :
 *  - « resend »  : envoi réel (RESEND_API_KEY et RESEND_FROM requis) ;
 *  - « fichier » : écrit chaque message dans .dev-emails/ (tests ; refusé en production) ;
 *  - « console » : affiche le message dans les logs du serveur (défaut local).
 * Sans EMAIL_TRANSPORT : Resend s'il est configuré, sinon la console.
 */
export function emailAdapter(): EmailAdapter {
  const mode = (process.env.EMAIL_TRANSPORT || "").toLowerCase();
  const resend = emailResend();
  if (mode === "resend" || (!mode && resend)) {
    if (resend) return resend;
    console.warn("[e-mail] EMAIL_TRANSPORT=resend sans RESEND_API_KEY / RESEND_FROM : repli sur la console.");
  }
  const parFichier = mode === "fichier" && process.env.NODE_ENV !== "production";
  return () => ({
    name: parFichier ? "fichier" : "console",
    defaultFromAddress: "contact@lesprincipesretrouves.com",
    defaultFromName: "Les Principes Retrouvés",
    async sendEmail(message) {
      const a = Array.isArray(message.to) ? message.to.map(formater).join(", ") : formater(message.to);
      const html = typeof message.html === "string" ? message.html : "";
      // Les e-mails natifs de Payload (vérification…) n'ont qu'un corps HTML : version texte lisible.
      const texte =
        typeof message.text === "string" && message.text
          ? message.text
          : html
              .replace(/<a [^>]*href="([^"]+)"[^>]*>[^<]*<\/a>/g, "$1")
              .replace(/<\/p>/g, "\n")
              .replace(/<[^>]+>/g, "")
              .replace(/&amp;/g, "&");
      console.log(`\n[e-mail] À : ${a}\n[e-mail] Objet : ${message.subject}\n${texte}\n`);
      if (parFichier) {
        const { mkdir, writeFile } = await import("node:fs/promises");
        await mkdir(".dev-emails", { recursive: true });
        await writeFile(
          `.dev-emails/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`,
          JSON.stringify({ to: a, subject: message.subject, text: texte, html: message.html }, null, 2),
        );
      }
      return { ok: true };
    },
  });
}

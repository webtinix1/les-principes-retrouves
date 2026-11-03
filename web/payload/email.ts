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

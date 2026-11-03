import { NextResponse } from "next/server";
import { payloadClient } from "@/lib/payload";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit, clientIp, reponse429 } from "@/lib/rate-limit";

export const runtime = "nodejs";

/** Vérifie le jeton Cloudflare Turnstile si la clé secrète est configurée. */
async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // pas de captcha configuré → on n'exige rien (mode dégradé)
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      },
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/** Envoie une notification e-mail via Resend si la configuration est présente. */
async function sendEmail(input: {
  nom: string;
  email: string;
  organisation?: string;
  sujet: string;
  message: string;
}): Promise<"sent" | "skipped" | "error"> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX_EMAIL;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !to || !from) return "skipped";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: input.email,
        subject: `[Contact] ${input.sujet}`,
        text: `Nom : ${input.nom}\nE-mail : ${input.email}\nOrganisation : ${input.organisation ?? "—"}\n\n${input.message}`,
      }),
    });
    return res.ok ? "sent" : "error";
  } catch {
    return "error";
  }
}

export async function POST(request: Request) {
  // Anti-spam : 5 envois / 10 min par IP (en complément de Turnstile).
  const limite = rateLimit("contact", clientIp(request), 5, 10 * 60_000);
  if (!limite.ok) return reponse429(limite.retryApres);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Données invalides.";
    return NextResponse.json({ ok: false, error: first }, { status: 422 });
  }
  const data = parsed.data;

  const captchaOk = await verifyTurnstile(data.turnstile_token);
  if (!captchaOk) {
    return NextResponse.json(
      { ok: false, error: "Vérification anti-spam échouée. Merci de réessayer." },
      { status: 400 },
    );
  }

  // Persistance (source de vérité, durable via volume Docker)
  try {
    const payload = await payloadClient();
    await payload.create({
      collection: "messages-contact",
      data: {
        nom: data.nom,
        email: data.email,
        organisation: data.organisation || null,
        sujet: data.sujet,
        message: data.message,
        consent_rgpd: data.consent_rgpd,
        statut: "nouveau",
        source: "site",
      },
    });
  } catch (err) {
    console.error("[contact] échec persistance:", err);
    return NextResponse.json(
      { ok: false, error: "Une erreur est survenue. Merci de réessayer plus tard." },
      { status: 500 },
    );
  }

  // Notification e-mail (best-effort ; n'échoue pas la requête)
  const emailStatus = await sendEmail(data);
  if (emailStatus === "error") {
    console.warn("[contact] message enregistré mais e-mail non envoyé.");
  }

  return NextResponse.json({ ok: true });
}

/**
 * Envoi d'e-mail transactionnel via Resend (best-effort).
 * Retourne "sent" | "skipped" (non configuré) | "error".
 * Ne lève jamais : l'appelant décide de la criticité.
 */
export async function sendMail(input: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<"sent" | "skipped" | "error"> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return "skipped";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: input.to,
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
      }),
    });
    return res.ok ? "sent" : "error";
  } catch {
    return "error";
  }
}

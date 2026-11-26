import { NextResponse } from "next/server";
import { z } from "zod";
import { payloadClient } from "@/lib/payload";
import { sendMail } from "@/lib/email";
import { getReglages } from "@/lib/librairie/donnees";
import { clientIp, rateLimit, reponse429 } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  nom: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  reference: z.string().trim().max(60).optional().or(z.literal("")),
  objet: z.string().trim().min(3).max(160),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(request: Request) {
  const limite = rateLimit("librairie-reclamation", clientIp(request), 5, 10 * 60_000);
  if (!limite.ok) return reponse429(limite.retryApres);

  let corps: unknown;
  try {
    corps = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  const parsed = schema.safeParse(corps);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Données invalides." }, { status: 422 });
  }
  const d = parsed.data;

  const payload = await payloadClient();
  await payload.create({
    collection: "reclamations",
    data: { statut: "nouvelle", nom: d.nom, email: d.email, objet: d.objet, message: d.message, reference: d.reference || "" },
  });

  const dest =
    (await getReglages()).email_notification || process.env.LIBRAIRIE_AUTEUR_EMAIL || process.env.CONTACT_INBOX_EMAIL || "";
  if (dest) {
    await sendMail({
      to: dest,
      subject: `[Librairie] ${d.objet}`,
      text: `${d.nom} <${d.email}>\nRéférence : ${d.reference || "—"}\n\n${d.message}`,
      replyTo: d.email,
    });
  }
  return NextResponse.json({ ok: true });
}

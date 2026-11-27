import { redirect } from "next/navigation";
import { payloadClient } from "@/lib/payload";
import { journaliser } from "@/lib/espace/securite";

export const dynamic = "force-dynamic";

/**
 * Lien reçu par e-mail : vérifie l'adresse puis renvoie vers l'Espace utilisateurs
 * (panneau de connexion) avec le résultat.
 */
export default async function VerificationPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  let ok = false;
  if (token && token.length < 200) {
    const payload = await payloadClient();
    try {
      ok = await payload.verifyEmail({ collection: "lecteurs", token });
      if (ok) await journaliser(payload, "verification");
    } catch {
      ok = false;
    }
  }
  redirect(`/espace-utilisateurs?panneau=connexion&verifie=${ok ? "1" : "0"}`);
}

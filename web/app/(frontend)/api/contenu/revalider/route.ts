import { revalidatePath } from "next/cache";
import { CHEMINS_EDITABLES } from "@/content/blocs";
import { payloadClient } from "@/lib/payload";

/** Pages qui lisent Payload et sont prérendues au build (sans base). */
const CHEMINS = [...new Set([...CHEMINS_EDITABLES, "/transmission", "/concepts", "/ouvrage"])];

/**
 * Initialisation de Payload + revalidation des pages porteuses de contenu.
 *
 * POURQUOI — les pages sont prérendues au build Docker, où aucune base n'est
 * joignable. Le HTML bâti contient donc les textes du code. Sans cet appel,
 * les textes du back-office n'apparaîtraient qu'à l'expiration du cache.
 *
 * L'entrypoint appelle cette route une fois le serveur prêt, avec un jeton
 * tiré au hasard au démarrage et partagé par le seul processus du conteneur :
 * rien à configurer, et la route reste inutilisable de l'extérieur. Elle
 * répond 503 tant que la base n'est pas joignable (l'entrypoint réessaie).
 */
export async function POST(request: Request) {
  const attendu = process.env.CONTENU_REVALIDATE_TOKEN;
  if (!attendu) {
    return Response.json(
      { erreur: "Revalidation non configurée." },
      { status: 503 },
    );
  }

  const fourni = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (fourni !== attendu) {
    return Response.json({ erreur: "Non autorisé." }, { status: 401 });
  }

  // Migrations + amorçage (onInit) avant toute revalidation.
  try {
    const payload = await payloadClient();
    await payload.count({ collection: "users" });
  } catch {
    return Response.json({ erreur: "Base injoignable." }, { status: 503 });
  }

  for (const chemin of CHEMINS) {
    revalidatePath(chemin);
  }

  return Response.json({ revalide: CHEMINS });
}

import { revalidatePath } from "next/cache";
import { CHEMINS_EDITABLES } from "@/content/blocs";

/**
 * Revalidation des pages porteuses de blocs éditables.
 *
 * POURQUOI — les pages sont prérendues au build Docker, où aucune base n'existe
 * (l'entrypoint migre le volume au démarrage). Le HTML bâti contient donc les
 * textes d'origine. Sans cet appel, les réécritures du back-office
 * disparaîtraient du site à chaque redéploiement.
 *
 * L'entrypoint appelle cette route une fois le serveur prêt, avec un jeton
 * tiré au hasard au démarrage et partagé par le seul processus du conteneur :
 * rien à configurer côté client, et la route reste inutilisable de l'extérieur.
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

  for (const chemin of CHEMINS_EDITABLES) {
    revalidatePath(chemin);
  }

  return Response.json({ revalide: CHEMINS_EDITABLES });
}

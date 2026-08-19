import { parse } from "node-html-parser";
import { CHEMIN_PAR_CLE } from "@/content/blocs";

/**
 * Récupération du texte D'ORIGINE d'un bloc (celui codé en JSX dans la page).
 *
 * Le back-office en a besoin pour amorcer l'éditeur sur un bloc jamais modifié.
 * Comme le texte par défaut n'existe qu'en JSX, on le relit là où il est rendu :
 * la page publique, où `BlocProse`/`BlocTexte` posent un attribut `data-bloc`.
 * On lit donc exactement ce que le visiteur voit — aucune copie à maintenir.
 *
 * L'appel vise la boucle locale (même conteneur) plutôt que le domaine public :
 * pas d'aller-retour par Traefik, et cela fonctionne avant la mise en DNS.
 */

function basesCandidates(): string[] {
  const port = process.env.PORT ?? "3000";
  const bases = [`http://127.0.0.1:${port}`];
  const publique = process.env.NEXT_PUBLIC_SITE_URL;
  if (publique) bases.push(publique.replace(/\/$/, ""));
  return bases;
}

export class BlocIntrouvableError extends Error {}

/**
 * HTML interne du bloc tel que rendu par la page publique.
 * @throws BlocIntrouvableError si la page est injoignable ou le bloc absent.
 */
export async function lireTexteOrigine(cle: string): Promise<string> {
  const chemin = CHEMIN_PAR_CLE.get(cle);
  if (!chemin) throw new BlocIntrouvableError(`Clé inconnue du registre : ${cle}`);

  let dernierEchec = "page injoignable";

  for (const base of basesCandidates()) {
    let html: string;
    try {
      const reponse = await fetch(`${base}${chemin}`, {
        cache: "no-store",
        headers: { "user-agent": "back-office/contenu" },
      });
      if (!reponse.ok) {
        dernierEchec = `réponse ${reponse.status} sur ${chemin}`;
        continue;
      }
      html = await reponse.text();
    } catch {
      dernierEchec = `connexion refusée sur ${base}`;
      continue;
    }

    const noeud = parse(html).querySelector(`[data-bloc="${cle}"]`);
    if (!noeud) {
      dernierEchec = `bloc « ${cle} » absent du rendu de ${chemin}`;
      continue;
    }
    return noeud.innerHTML.trim();
  }

  throw new BlocIntrouvableError(dernierEchec);
}

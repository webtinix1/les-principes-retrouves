import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BLOC_PAR_CLE, CHEMIN_PAR_CLE, PAGES_BLOCS } from "@/content/blocs";
import { EditeurContenu } from "@/components/admin/editeur-contenu";
import { BoutonSoumettre } from "@/components/admin/bouton-soumettre";
import { contenuEnTexte } from "@/lib/contenu/sanitize";
import { lireTexteOrigine } from "@/lib/contenu/extraction";
import {
  enregistrerBloc,
  reinitialiserBloc,
  restaurerVersion,
} from "@/app/admin/contenu/actions";

export const dynamic = "force-dynamic";

const MESSAGES: Record<string, string> = {
  enregistre: "Modification enregistrée et publiée sur le site.",
  reinitialise: "Le texte d'origine est de nouveau affiché sur le site.",
  restaure: "Version restaurée et publiée sur le site.",
};

export default async function AdminContenuBloc({
  params,
  searchParams,
}: {
  params: Promise<{ cle: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { cle: cleBrute } = await params;
  const cle = decodeURIComponent(cleBrute);
  const def = BLOC_PAR_CLE.get(cle);
  if (!def) notFound();

  const chemin = CHEMIN_PAR_CLE.get(cle)!;
  const page = PAGES_BLOCS.find((p) => p.chemin === chemin)!;

  const [surcharge, versions, params_] = await Promise.all([
    prisma.contenuBloc.findUnique({ where: { cle } }),
    prisma.contenuBlocVersion.findMany({
      where: { cle },
      orderBy: { created_at: "desc" },
      take: 20,
    }),
    searchParams,
  ]);

  // Bloc jamais modifié : on amorce l'éditeur avec le texte rendu par la page.
  let valeurInitiale = surcharge?.valeur ?? "";
  let avertissement: string | null = null;
  if (!surcharge) {
    try {
      valeurInitiale = await lireTexteOrigine(cle);
    } catch (e) {
      avertissement =
        "Le texte d'origine n'a pas pu être chargé depuis la page " +
        `(${e instanceof Error ? e.message : "erreur inconnue"}). ` +
        "Enregistrer maintenant remplacerait le texte du site par un contenu vide : " +
        "réessaie plus tard.";
    }
  }

  // Bloc « texte court » : le champ est un simple <textarea>, qui afficherait
  // les entités HTML (« L&#x27;Horizon ») telles quelles. On décode en texte
  // brut. Les blocs riches gardent leur HTML (Tiptap le décode à l'affichage).
  if (def.type === "simple" && valeurInitiale) {
    valeurInitiale = contenuEnTexte(valeurInitiale);
  }

  const message = Object.keys(MESSAGES).find((k) => params_[k] === "1");

  return (
    <div>
      <nav className="font-ui text-xs text-bleu-nuit-profond/50">
        <Link href="/admin/contenu" className="hover:text-or">
          Contenu des pages
        </Link>{" "}
        / {page.titre}
      </nav>

      <h1 className="mt-2 font-heading text-2xl font-bold">{def.label}</h1>
      <p className="mt-1 font-ui text-sm text-bleu-nuit-profond/60">
        {def.aide ? `${def.aide} — ` : ""}
        <Link href={chemin} className="text-bleu-academique hover:text-or">
          voir la page ↗
        </Link>
      </p>

      {message ? (
        <p className="mt-4 rounded border-l-4 border-green-600 bg-green-50 p-3 font-sans text-sm text-green-900">
          {MESSAGES[message]}
        </p>
      ) : null}

      {avertissement ? (
        <p className="mt-4 rounded border-l-4 border-red-600 bg-red-50 p-3 font-sans text-sm text-red-900">
          {avertissement}
        </p>
      ) : null}

      <form action={enregistrerBloc} className="mt-6">
        <input type="hidden" name="cle" value={cle} />
        <EditeurContenu type={def.type} valeurInitiale={valeurInitiale} />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <BoutonSoumettre
            variante="primaire"
            enCours="Publication…"
            className="px-5 py-2 text-sm font-semibold"
          >
            Enregistrer et publier
          </BoutonSoumettre>
          <Link
            href="/admin/contenu"
            className="font-ui text-sm text-bleu-nuit-profond/60 hover:text-or"
          >
            Annuler
          </Link>
        </div>
      </form>

      {surcharge ? (
        <form action={reinitialiserBloc} className="mt-8 border-t border-bleu-nuit-profond/10 pt-6">
          <input type="hidden" name="cle" value={cle} />
          <p className="font-sans text-sm text-bleu-nuit-profond/70">
            Ce bloc a été modifié le{" "}
            {surcharge.updated_at.toLocaleString("fr-FR")}.
          </p>
          <div className="mt-2">
            <BoutonSoumettre
              variante="danger"
              enCours="Restauration…"
              confirmer="Revenir au texte d'origine ? La version actuellement publiée sera remplacée par le texte du code (récupérable dans l'historique)."
              className="px-4 py-2 text-sm"
            >
              Revenir au texte d&apos;origine
            </BoutonSoumettre>
          </div>
        </form>
      ) : null}

      {versions.length > 0 ? (
        <section className="mt-8 border-t border-bleu-nuit-profond/10 pt-6">
          <h2 className="font-heading text-lg font-semibold">Historique</h2>
          <p className="mt-1 font-ui text-xs text-bleu-nuit-profond/50">
            20 dernières versions. La plus ancienne est le texte d&apos;origine.
          </p>
          <ul className="mt-3 divide-y divide-bleu-nuit-profond/5 rounded border border-bleu-nuit-profond/10 bg-white">
            {versions.map((v, i) => (
              <li key={v.id} className="flex flex-wrap items-start justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs text-bleu-nuit-profond/50">
                    {v.created_at.toLocaleString("fr-FR")}
                    {i === versions.length - 1 && versions.length > 1
                      ? " — texte d'origine"
                      : ""}
                  </p>
                  <p className="mt-1 line-clamp-2 font-sans text-sm text-bleu-nuit-profond/80">
                    {v.valeur.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 220)}
                  </p>
                </div>
                <form action={restaurerVersion}>
                  <input type="hidden" name="id" value={v.id} />
                  <BoutonSoumettre
                    variante="neutre"
                    enCours="…"
                    confirmer="Republier cette version ? Elle remplacera le texte actuellement en ligne."
                  >
                    Restaurer
                  </BoutonSoumettre>
                </form>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

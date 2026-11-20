import { Clock, Download, Lock, LockOpen } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { RessourceCms } from "@/lib/cms";
import { getTextes, remplir } from "@/lib/contenu";
import { cn } from "@/lib/utils";

/** Libellé d'un niveau d'accès (« module_i » → « Module I »), textes du back-office. */
export function libelleNiveau(t: Record<string, string>, niveau: string): string | undefined {
  return ["module_i", "module_ii", "module_iii"].includes(niveau) ? t[`niveau.${niveau}`] : undefined;
}

/** Badge d'état du document intégral : icône + trait (plein / pointillé) + libellé. */
function BadgeEtat({
  etat,
  niveau,
  t,
}: {
  etat: "ouvert" | "reserve" | "attente";
  niveau: string;
  t: Record<string, string>;
}) {
  if (etat === "ouvert") {
    return (
      <span className="inline-flex h-[26px] items-center gap-1.5 rounded-[2px] border border-succes px-2.5 font-ui text-[12.5px] font-semibold whitespace-nowrap text-succes">
        <LockOpen aria-hidden="true" className="size-[13px]" strokeWidth={2} />
        {t["ressource.debloque"]}
      </span>
    );
  }
  return (
    <span className="inline-flex h-[26px] items-center gap-1.5 rounded-[2px] border border-dashed border-filet-fort px-2.5 font-ui text-[12.5px] font-medium whitespace-nowrap text-encre-3">
      {etat === "reserve" ? (
        <Lock aria-hidden="true" className="size-[13px]" strokeWidth={2} />
      ) : (
        <Clock aria-hidden="true" className="size-[13px]" strokeWidth={2} />
      )}
      {etat === "reserve" ? niveau : t["ressource.en_preparation"]}
    </span>
  );
}

const ACTION_INACTIVE =
  "inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-[2px] border border-dashed border-filet-fort px-[22px] py-2 text-center font-ui text-[15px] font-medium text-encre-3 sm:w-auto";

/** Carte d'une ressource (Working Paper ou pièce opératoire). */
export async function CarteRessource({
  ressource,
  unlocked,
  available,
}: {
  ressource: RessourceCms;
  unlocked: boolean;
  available: boolean;
}) {
  // Textes d'interface : back-office, global « Site — Interface ».
  const t = await getTextes("site_interface");
  const niveauLabel = libelleNiveau(t, ressource.niveau_requis) ?? t["niveau.inconnu"];
  const etat = available && unlocked ? "ouvert" : !available ? "attente" : "reserve";
  return (
    <article className="rv flex flex-col rounded-[4px] border border-filet bg-blanc text-encre">
      <header className="flex flex-col gap-3 border-b border-filet-doux p-6 md:px-10 md:pt-9 md:pb-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-code text-xs tracking-[0.14em] text-or-700 uppercase">{ressource.reference}</p>
          <BadgeEtat etat={etat} niveau={niveauLabel} t={t} />
        </div>
        <h3 className="max-w-[860px] font-titre text-[1.375rem] leading-[1.3] font-medium text-balance text-encre md:text-[1.625rem]">
          {ressource.titre}
        </h3>
      </header>

      <div className="grid gap-8 p-6 md:px-10 md:py-8 lg:grid-cols-12 lg:gap-x-6">
        <dl className="flex flex-col self-start border-b border-filet-doux font-ui text-sm leading-normal lg:col-span-4">
          <div className="border-t border-filet-doux py-2.5">
            <dt className="inline font-semibold text-encre">{`${t["ressource.classification"]} `}</dt>
            <dd className="inline text-encre-2">{ressource.classification}</dd>
          </div>
          <div className="border-t border-filet-doux py-2.5">
            <dt className="inline font-semibold text-encre">{`${t["ressource.volume"]} `}</dt>
            <dd className="inline text-encre-2">{ressource.volume}</dd>
          </div>
          <div className="border-t border-filet-doux py-2.5">
            <dt className="inline font-semibold text-encre">{`${t["ressource.statut"]} `}</dt>
            <dd className="inline text-encre-2">{ressource.statut}</dd>
          </div>
          {ressource.soumission && (
            <div className="border-t border-filet-doux py-2.5">
              <dt className="inline font-semibold text-encre">{`${t["ressource.soumission"]} `}</dt>
              <dd className="inline text-encre-2 italic">{ressource.soumission}</dd>
            </div>
          )}
        </dl>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
          <div>
            <p className="font-code text-xs tracking-[0.14em] text-encre-3 uppercase">
              {ressource.resume_label} {t["ressource.resume_suffixe"]}
            </p>
            <div className="mt-3 flex max-w-[680px] flex-col gap-3 font-texte text-[17px] leading-[1.7] text-encre">
              {ressource.resume.map((paragraphe, i) => (
                <p key={i} className="text-pretty">{paragraphe}</p>
              ))}
            </div>
          </div>

          {ressource.concepts_mobilises && (
            <div>
              <p className="font-code text-xs tracking-[0.14em] text-encre-3 uppercase">{t["ressource.concepts_mobilises"]}</p>
              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-[18px] font-ui text-[15px] leading-[1.5] text-encre-2 marker:text-encre-3">
                {ressource.concepts_mobilises.map((concept, i) => (
                  <li key={i}>{concept}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Le résumé exécutif ci-dessus est en accès libre. Téléchargement de l'intégral : conditionné. */}
      <footer className="mt-auto flex flex-col gap-3 border-t border-filet-doux p-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 md:px-10">
        {etat === "ouvert" ? (
          <a
            href={`/api/download/${ressource.id}`}
            className={cn(buttonVariants({ variant: "nuit", size: "cta" }), "w-full sm:w-auto")}
          >
            <Download aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
            {t["ressource.telecharger"]}
          </a>
        ) : etat === "attente" ? (
          <span aria-disabled="true" className={ACTION_INACTIVE}>
            {t["ressource.bientot"]}
          </span>
        ) : (
          <span aria-disabled="true" className={ACTION_INACTIVE} title={remplir(t["ressource.reserve_titre"], { niveau: niveauLabel })}>
            <Lock aria-hidden="true" className="size-[18px] shrink-0" strokeWidth={1.75} />
            {remplir(t["ressource.reserve"], { niveau: niveauLabel })}
          </span>
        )}
        {available && !unlocked && (
          <a
            href="#code"
            className="flex min-h-11 items-center font-ui text-sm text-lien underline underline-offset-[3px] hover:text-encre"
          >
            {t["ressource.saisir_code"]}
          </a>
        )}
      </footer>
    </article>
  );
}

/** Progression logique de l'arsenal : chaîne verticale numérotée, sur papier. */
export function ChaineProgression({
  etapes,
}: {
  etapes: { reference: string; role: string; prerequis: string }[];
}) {
  return (
    <ol className="flex max-w-[680px] flex-col border-t-2 border-encre">
      {etapes.map((etape, i) => {
        const derniere = i === etapes.length - 1;
        return (
          <li
            key={etape.reference}
            className="rv relative grid grid-cols-[32px_minmax(0,1fr)] gap-x-4 border-b border-filet-doux py-4"
          >
            {!derniere && (
              <span aria-hidden="true" className="absolute top-[38px] -bottom-[18px] left-[15px] z-10 w-px bg-encre" />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-20 flex size-8 items-center justify-center rounded-full border font-code text-xs",
                derniere ? "border-or-700 bg-or-500 text-nuit-950" : "border-encre bg-papier text-encre",
              )}
            >
              {i + 1}
            </span>
            <p className="self-center font-ui text-[15px] leading-[1.5] text-encre">
              <span className="font-code text-[14px] font-medium text-or-700">{etape.reference}</span>
              {" : "}
              <span className="font-semibold">{etape.role}</span>
              {etape.prerequis !== "—" && (
                <span className="text-encre-3">
                  {" "}
                  → {etape.prerequis}
                </span>
              )}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

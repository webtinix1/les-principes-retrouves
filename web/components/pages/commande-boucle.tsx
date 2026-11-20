import { getListe, getTexte } from "@/lib/contenu";
import { cn } from "@/lib/utils";

/**
 * Rappel de la boucle d'accès (dessinée en grand sur Transmission) :
 * S’inscrire → Valider → Recevoir le code EBZ-XXXX-XXXX → Saisir le code au
 * Laboratoire. Version compacte, verticale, pour les colonnes latérales de
 * l'inscription, de la confirmation de commande et du champ de code du
 * Laboratoire. L'étape courante est marquée (`aria-current="step"`), jamais par
 * la couleur seule (point plein, graisse, mention « Vous êtes ici »).
 * Textes : back-office, global « Site — Interface » (liste « Boucle d’accès »).
 */
const CODE = "EBZ-XXXX-XXXX";

export async function BoucleAcces({
  courante,
  className,
}: {
  /** Index (0 à 3) de l'étape où se trouve le visiteur ; absent : aucune. */
  courante?: number;
  className?: string;
}) {
  const etapes = await getListe<{ repere: string; texte: string }>("site_interface.boucle_etapes");
  const ici_libelle = await getTexte("site_interface.boucle.ici");
  const aria = await getTexte("site_interface.boucle.aria");
  const legende = await getTexte("site_interface.boucle.legende");
  return (
    <figure aria-label={aria} className={cn("m-0 flex flex-col gap-4", className)}>
      <ol className="relative flex flex-col">
        {etapes.map(({ repere: cap, texte }, i) => {
          const ici = i === courante;
          const derniere = i === etapes.length - 1;
          return (
            <li
              key={cap}
              aria-current={ici ? "step" : undefined}
              className="m-rise relative grid grid-cols-[24px_minmax(0,1fr)] gap-x-3 pb-5 last:pb-0"
              style={{ "--dl": `${200 + i * 120}ms` } as React.CSSProperties}
            >
              {!derniere && (
                <span aria-hidden="true" className="absolute top-[18px] bottom-0 left-[11px] w-px bg-encre" />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  "relative mt-[3px] flex size-[22px] items-center justify-center rounded-full border font-code text-[11px]",
                  ici ? "border-or-700 bg-or-500 text-nuit-950" : "border-encre bg-papier text-encre",
                )}
              >
                {i + 1}
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="flex flex-wrap items-center gap-x-2 font-code text-[11.5px] text-encre-3">
                  {cap}
                  {ici && <span className="font-ui text-[12px] font-semibold text-or-700">{ici_libelle}</span>}
                </span>
                <span
                  className={cn(
                    "font-ui text-[15px] leading-snug text-encre",
                    ici ? "font-semibold" : "font-medium text-encre-2",
                  )}
                >
                  {texte.includes(CODE) ? (
                    <>
                      {texte.slice(0, texte.indexOf(CODE))}
                      <span className="font-code font-medium whitespace-nowrap">{CODE}</span>
                      {texte.slice(texte.indexOf(CODE) + CODE.length)}
                    </>
                  ) : (
                    texte
                  )}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
      <figcaption className="border-t border-filet-doux pt-3 font-code text-[11.5px] leading-[1.5] text-encre-3">
        {legende}
      </figcaption>
    </figure>
  );
}

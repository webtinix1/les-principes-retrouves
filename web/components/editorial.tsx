import Link from "next/link";
import { Lock, LockOpen } from "lucide-react";
import { numero2 } from "@/lib/navigation";
import { getPageCanonique } from "@/lib/navigation-textes";
import { getTexte } from "@/lib/contenu";
import { cn } from "@/lib/utils";

/**
 * Composants éditoriaux du design system de la refonte (planche
 * « Composants ») : ouverture de page, sommaire, exergue, citation, formule,
 * article numéroté, badges, fil d'Ariane, formule de clôture.
 * Textes d'interface : back-office, global « Site — Interface » (et
 * « Site — Navigation » pour le surtitre « 04 / 10 · Fondements »).
 */

const style = (dl: number) => ({ "--dl": `${dl}ms` }) as React.CSSProperties;

export type EntreeSommaire = { id: string; label: string };

/** « Sur cette page » : entrées numérotées vers les intertitres. */
export async function SurCettePage({
  entrees,
  className,
}: {
  entrees: EntreeSommaire[];
  className?: string;
}) {
  if (entrees.length < 2) return null;
  const titreSommaire = await getTexte("site_interface.sommaire.titre");
  return (
    <nav aria-label={titreSommaire} className={cn("flex flex-col", className)}>
      <span className="pb-2.5 font-code text-[11.5px] text-encre-3">{titreSommaire}</span>
      <ol className="border-b border-filet-doux">
        {entrees.map((e, i) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className="glisse grid min-h-11 grid-cols-[22px_1fr] items-baseline gap-2.5 border-t border-filet-doux py-2.5 font-ui text-[14.5px] leading-snug text-encre-2 hover:text-encre hover:underline hover:decoration-or-500 hover:decoration-2 hover:underline-offset-[5px]"
            >
              <span className="font-code text-[11.5px] text-encre-3">{i + 1}</span>
              {e.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Ouverture d'une page canonique, sur papier : surtitre « 04 / 10 ·
 * Fondements », titre (mot à mot), sous-titre en italique, actions et
 * sommaire « Sur cette page » dans la colonne de droite.
 */
export async function OuverturePage({
  page_id,
  titre,
  sousTitre,
  surtitre,
  actions,
  sommaire,
  children,
}: {
  page_id: string;
  titre: React.ReactNode;
  sousTitre?: React.ReactNode;
  /** Remplace le surtitre automatique. */
  surtitre?: string;
  actions?: React.ReactNode;
  sommaire?: EntreeSommaire[];
  /** Exergue ou chapeau sous l'ouverture. */
  children?: React.ReactNode;
}) {
  const p = await getPageCanonique(page_id);
  const surTotal = await getTexte("site_navigation.position.sur_total");
  const mots = typeof titre === "string" ? titre.split(" ") : null;
  return (
    <section className="surface-claire border-b border-filet bg-papier px-5 pt-10 pb-14 md:pt-[72px] md:pb-24 lg:px-6 xl:px-10">
      <div className="mx-auto grid max-w-[1280px] gap-x-6 gap-y-10 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-8">
          <span className="m-rise font-code text-xs uppercase tracking-[0.14em] text-or-700" style={style(100)}>
            {surtitre ?? `${numero2(p.numero)} ${surTotal} · ${p.nomFamille}`}
          </span>
          <h1 className="font-titre text-[2.25rem] leading-[1.08] font-medium text-balance text-encre md:text-[3.75rem] md:leading-[1.05]">
            {mots
              ? mots.map((m, i) => (
                  <span key={i}>
                    <span className="mot" style={style(220 + i * 80)}>
                      {m}
                    </span>
                    {i < mots.length - 1 && " "}
                  </span>
                ))
              : titre}
          </h1>
          {sousTitre && (
            <p className="m-rise font-texte text-[1.1875rem] leading-[1.45] text-encre-2 italic md:text-[1.4375rem]" style={style(380)}>
              {sousTitre}
            </p>
          )}
          {actions && (
            <div className="m-rise mt-2 flex flex-wrap gap-3.5" style={style(520)}>
              {actions}
            </div>
          )}
        </div>
        {sommaire && sommaire.length >= 2 && (
          <div className="m-rise lg:col-span-3 lg:col-start-10 lg:self-end" style={style(650)}>
            <SurCettePage entrees={sommaire} />
          </div>
        )}
        {children && <div className="lg:col-span-9">{children}</div>}
      </div>
    </section>
  );
}

/** Exergue — une par page, sous le titre : filet or qui se trace, Lora italique. */
export function Exergue({
  children,
  source,
  className,
}: {
  children: React.ReactNode;
  source?: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("relative m-0 flex flex-col gap-2.5 pt-7", className)}>
      <span aria-hidden="true" className="m-draw absolute inset-x-0 top-0 h-px bg-or-500" style={style(800)} />
      <blockquote className="m-rise font-texte text-[1.1875rem] leading-[1.6] text-encre italic md:text-[1.3125rem]" style={style(950)}>
        {children}
      </blockquote>
      {source && <figcaption className="font-code text-[11.5px] text-encre-3">{source}</figcaption>}
    </figure>
  );
}

/** Citation dans le texte — retrait, sans or. */
export function Citation({
  children,
  source,
  className,
}: {
  children: React.ReactNode;
  source?: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("my-8 flex flex-col gap-2 py-1 pl-6", className)}>
      <blockquote className="font-texte text-[1.0625rem] leading-[1.65] text-encre-2">{children}</blockquote>
      {source && <figcaption className="font-code text-[11.5px] text-encre-3">{source}</figcaption>}
    </figure>
  );
}

/** Formule en bloc — Fira Code, fond papier 2, filets dessus et dessous, légende. */
export function Formule({
  children,
  legende,
  lecture,
  className,
}: {
  children: React.ReactNode;
  legende?: React.ReactNode;
  /** Lecture à voix haute (aria-label), si la formule seule est ambiguë. */
  lecture?: string;
  className?: string;
}) {
  return (
    <div
      role={lecture ? "math" : undefined}
      aria-label={lecture}
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y border-filet bg-papier-2 px-5 py-[18px]",
        className,
      )}
    >
      <span className="font-code text-lg font-medium text-encre md:text-xl">{children}</span>
      {legende && <span className="font-code text-[11.5px] text-encre-3">{legende}</span>}
    </div>
  );
}

/** Article numéroté : numéro romain en marge (or 700), étiquette, titre H3. */
export function ArticleNumerote({
  id,
  romain,
  etiquette,
  titre,
  children,
  className,
}: {
  id?: string;
  romain: string;
  etiquette?: React.ReactNode;
  titre: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      id={id}
      className={cn("rv grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-filet pt-6 md:grid-cols-[64px_minmax(0,1fr)]", className)}
    >
      <span className="font-titre text-[28px] leading-none text-or-700 md:text-4xl">{romain}</span>
      <div className="flex min-w-0 flex-col gap-2">
        {etiquette && (
          <span className="font-code text-xs uppercase tracking-[0.14em] text-encre-3">{etiquette}</span>
        )}
        <h3 className="font-titre text-[1.3125rem] leading-[1.3] font-medium text-encre md:text-[1.375rem]">{titre}</h3>
        {children && <div className="mt-1">{children}</div>}
      </div>
    </article>
  );
}

/** Badges de statut : jamais la couleur seule (icône, trait plein / pointillé, libellé). */
export async function BadgeAcces({ libre }: { libre: boolean }) {
  const libelle = await getTexte(libre ? "site_interface.badge.acces_libre" : "site_interface.badge.dans_ouvrage");
  return libre ? (
    <span className="inline-flex h-[26px] items-center gap-1.5 rounded-[2px] border border-succes px-2.5 font-ui text-[12.5px] font-semibold whitespace-nowrap text-succes">
      <LockOpen aria-hidden="true" className="size-[13px]" strokeWidth={2} />
      {libelle}
    </span>
  ) : (
    <span className="inline-flex h-[26px] items-center gap-1.5 rounded-[2px] border border-dashed border-filet-fort px-2.5 font-ui text-[12.5px] font-medium whitespace-nowrap text-encre-3">
      <Lock aria-hidden="true" className="size-[13px]" strokeWidth={2} />
      {libelle}
    </span>
  );
}

/** Fil d'Ariane. Le dernier élément est la page courante. */
export async function FilAriane({ items }: { items: { label: string; href?: string }[] }) {
  const aria = await getTexte("site_interface.fil_ariane.aria");
  return (
    <nav aria-label={aria} className="font-ui text-sm text-encre-3">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href ? (
              <Link href={it.href} className="text-encre-2 underline underline-offset-[3px] hover:text-encre">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-encre">
                {it.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Formule de clôture des pages doctrinales (« … Il demande à être éprouvé. »),
 * centrée, filet or qui se trace, avant la pagination canonique.
 */
export function Cloture({ children, suite }: { children: React.ReactNode; suite?: React.ReactNode }) {
  return (
    <section className="surface-claire bg-papier px-5 pt-20 pb-14 lg:px-6 xl:px-10">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
        <span aria-hidden="true" className="rv-draw h-0.5 w-[120px] origin-center bg-or-500" />
        <div className="rv font-texte text-xl leading-[1.5] text-encre italic md:text-2xl">{children}</div>
        {suite}
      </div>
    </section>
  );
}

/** Intertitre de section dans la grille 3 + 7 colonnes (titre à gauche, texte à droite). */
export function BlocSection({
  id,
  titre,
  children,
  className,
  bordure = true,
}: {
  id?: string;
  titre: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bordure?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "surface-claire bg-papier px-5 pb-14 md:pb-24 lg:px-6 xl:px-10",
        !bordure && "pt-14 md:pt-24",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-[1280px] gap-x-6 gap-y-6 lg:grid-cols-12",
          bordure && "border-t border-filet pt-14 md:pt-24",
        )}
      >
        <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:col-span-3 lg:text-[1.875rem]">
          {titre}
        </h2>
        <div className="min-w-0 lg:col-span-8 lg:col-start-4">{children}</div>
      </div>
    </section>
  );
}

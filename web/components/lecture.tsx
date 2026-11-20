import Link from "next/link";
import type { BlocLecture, TexteLecture } from "@/content/lectures";
import type { Concept, Strate } from "@/content/concepts";
import { libelle } from "@/lib/lecture";
import { cn } from "@/lib/utils";

/**
 * Rendu des textes en lecture libre (Tome I et Tome II), selon la planche
 * « Lecture » de la refonte : colonne calme de 680 px, Lora 19/1,75,
 * intertitres Playfair, formules en Fira Code sur papier 2, citations en
 * retrait sans or. Le texte lui-même n'est jamais modifié.
 */

function Bloc({ bloc }: { bloc: BlocLecture }) {
  switch (bloc.t) {
    case "h":
      return bloc.n === 4 ? (
        <h4 id={bloc.id} className="mt-10 mb-3 font-titre text-xl font-medium text-encre">
          {bloc.x}
        </h4>
      ) : (
        <h3
          id={bloc.id}
          className="mt-14 mb-5 font-titre text-[1.5rem] leading-[1.3] font-medium text-balance text-encre md:text-[1.625rem]"
        >
          {bloc.x}
        </h3>
      );
    case "f":
      return (
        <p className="my-7 overflow-x-auto border-y border-filet bg-papier-2 px-5 py-4 text-center font-code text-[0.95rem] font-medium text-encre [font-variant-ligatures:none] md:text-[1.0625rem]">
          {bloc.x}
        </p>
      );
    case "ol":
    case "ul": {
      const Liste = bloc.t === "ol" ? "ol" : "ul";
      return (
        <Liste
          className={cn(
            "my-5 space-y-2.5 pl-6 marker:text-encre-3",
            bloc.t === "ol" ? "list-decimal marker:font-code marker:text-[0.85em]" : "list-disc",
          )}
        >
          {bloc.items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </Liste>
      );
    }
    case "cite":
      return (
        <figure className="my-8 flex flex-col gap-2 py-1 pl-6">
          <blockquote className="text-[1.0625rem] leading-[1.65] text-encre-2">
            «&#8239;{bloc.x}&#8239;»
          </blockquote>
          <figcaption className="font-code text-[11.5px] text-encre-3">{bloc.source}</figcaption>
        </figure>
      );
    case "note":
      return <p className="font-ui !text-sm !leading-relaxed text-encre-3">{bloc.x}</p>;
    default:
      return <p>{bloc.x}</p>;
  }
}

/** Corps d'un texte, dans la colonne de lecture. */
export function CorpsLecture({ texte }: { texte: TexteLecture }) {
  return (
    <div className="prose-lecture max-w-[680px]">
      {texte.exergue && (
        <figure className="relative mb-12 flex flex-col gap-2.5 pt-6">
          <span aria-hidden="true" className="m-draw absolute inset-x-0 top-0 h-px bg-or-500" />
          <blockquote className="text-[1.25rem] leading-[1.55] text-encre italic md:text-[1.3125rem]">
            «&#8239;{texte.exergue}&#8239;»
          </blockquote>
          {texte.exergue_source && (
            <figcaption className="font-code text-[11.5px] text-encre-3">{texte.exergue_source}</figcaption>
          )}
        </figure>
      )}
      {texte.blocs.map((bloc, i) => (
        <Bloc key={i} bloc={bloc} />
      ))}
    </div>
  );
}

/** Intertitres de premier niveau d'un texte (pour le sommaire interne). */
export function intertitres(texte: TexteLecture) {
  return texte.blocs.filter(
    (b): b is Extract<BlocLecture, { t: "h" }> => b.t === "h" && b.n !== 4 && !!b.id,
  );
}

/** Sommaire interne : liens vers chaque intertitre du texte. */
export async function SommaireTexte({ texte, className }: { texte: TexteLecture; className?: string }) {
  const titres = intertitres(texte);
  if (titres.length < 2) return null;
  const aria = await libelle("outils.dans_ce_texte");
  return (
    <nav aria-label={aria} className={cn("font-ui", className)}>
      <ol className="flex flex-col">
        {titres.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              className="glisse flex min-h-9 items-center py-1 text-[13.5px] leading-snug text-encre-2 hover:text-encre hover:underline"
            >
              {t.x}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Nom d'usage d'un concept : son titre sans la précision entre parenthèses. */
const nomConcept = (c: Concept) => c.titre.replace(/\s*\(.*\)\s*$/, "").trim();

/**
 * Notions de ce texte : les concepts stabilisés dont le nom apparaît dans le
 * texte, dans l'ordre des Concepts (6 au plus). Les strates viennent du
 * back-office (`getStrates()` de lib/cms.ts).
 */
export function notionsDuTexte(texte: TexteLecture, strates: Strate[]) {
  const corps = texte.blocs
    .map((b) => ("items" in b ? b.items.join(" ") : b.x))
    .join(" ")
    .toLocaleLowerCase("fr");
  return strates.flatMap((s) => s.concepts)
    .filter((c) => corps.includes(nomConcept(c).toLocaleLowerCase("fr")))
    .slice(0, 6)
    .map((c) => ({ id: c.id, numero: c.numero, nom: nomConcept(c) }));
}

/** Liste des notions, reliées à leur entrée dans les Concepts. */
export async function NotionsTexte({ notions }: { notions: ReturnType<typeof notionsDuTexte> }) {
  if (notions.length === 0) return null;
  const titre = await libelle("outils.notions");
  return (
    <div className="flex flex-col gap-1.5">
      <span className="pb-1.5 font-code text-xs tracking-[0.14em] text-encre-3 uppercase">{titre}</span>
      {notions.map((n) => (
        <Link
          key={n.id}
          href={`/concepts#${n.id}`}
          className="glisse flex min-h-9 items-baseline gap-2.5 font-ui text-[14.5px] text-lien underline underline-offset-[3px]"
        >
          <span className="font-code text-[11.5px] text-encre-3 no-underline">{String(n.numero).padStart(2, "0")}</span>
          {n.nom}
        </Link>
      ))}
    </div>
  );
}

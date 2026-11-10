import Link from "next/link";
import type { BlocLecture, TexteLecture } from "@/content/lectures";
import { cn } from "@/lib/utils";

/**
 * Rendu des textes en lecture libre (Tome I et Tome II).
 * Colonne de lecture « revue » : mesure ~70 caractères, corps Lora, intertitres
 * Playfair ancrés (sommaire), formules en Fira Code, citations sans barre latérale.
 */

function Bloc({ bloc }: { bloc: BlocLecture }) {
  switch (bloc.t) {
    case "h":
      return bloc.n === 4 ? (
        <h4 id={bloc.id} className="mt-10 font-heading text-lg font-semibold">
          {bloc.x}
        </h4>
      ) : (
        <h3
          id={bloc.id}
          className="mt-14 font-heading text-2xl font-semibold tracking-[-0.01em] text-balance before:mb-3 before:block before:h-0.5 before:w-8 before:bg-or before:content-['']"
        >
          {bloc.x}
        </h3>
      );
    case "f":
      return (
        <p className="my-6 overflow-x-auto rounded-lg border border-bleu-nuit-profond/10 bg-blanc px-4 py-3 text-center font-mono text-[0.95rem] text-bleu-academique">
          {bloc.x}
        </p>
      );
    case "ol":
    case "ul": {
      const Liste = bloc.t === "ol" ? "ol" : "ul";
      return (
        <Liste
          className={cn(
            "mt-4 space-y-2 pl-6 marker:text-or",
            bloc.t === "ol" ? "list-decimal marker:font-mono" : "list-disc",
          )}
        >
          {bloc.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Liste>
      );
    }
    case "cite":
      return (
        <figure className="my-8 border-y border-or/40 py-6">
          <blockquote className="font-heading text-xl italic leading-snug text-balance">
            «&nbsp;{bloc.x}&nbsp;»
          </blockquote>
          <figcaption className="mt-3 font-ui text-sm text-bleu-nuit-profond/75">
            — {bloc.source}
          </figcaption>
        </figure>
      );
    case "note":
      return <p className="mt-3 font-ui text-sm text-bleu-nuit-profond/75">{bloc.x}</p>;
    default:
      return <p className="mt-4">{bloc.x}</p>;
  }
}

/** Corps d'un texte, dans la colonne de lecture. */
export function CorpsLecture({ texte }: { texte: TexteLecture }) {
  return (
    <div className="max-w-[70ch] font-sans text-[1.0625rem] leading-[1.75] text-bleu-nuit-profond [&>p:first-child]:mt-0">
      {texte.exergue && (
        <figure className="mb-10 border-y border-or/40 py-6">
          <blockquote className="font-heading text-xl italic leading-snug text-balance">
            «&nbsp;{texte.exergue}&nbsp;»
          </blockquote>
          {texte.exergue_source && (
            <figcaption className="mt-3 font-ui text-sm text-bleu-nuit-profond/75">
              — {texte.exergue_source}
            </figcaption>
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
export function SommaireTexte({ texte }: { texte: TexteLecture }) {
  const titres = intertitres(texte);
  if (titres.length < 2) return null;
  return (
    <nav aria-label="Dans ce texte" className="font-ui text-sm">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-or">
        Dans ce texte
      </p>
      <ol className="mt-3 space-y-1 border-t border-bleu-nuit-profond/10 pt-3">
        {titres.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              className="block rounded py-1 leading-snug text-bleu-nuit-profond/80 transition-colors hover:text-bleu-academique hover:underline hover:underline-offset-4"
            >
              {t.x}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Lien de navigation vers le texte précédent / suivant. */
export function LienTexte({
  href,
  sens,
  titre,
}: {
  href: string;
  sens: "precedent" | "suivant";
  titre: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "presse group flex flex-col gap-1 rounded-xl border border-bleu-nuit-profond/10 bg-blanc p-5 transition-colors hover:border-or",
        sens === "suivant" && "sm:items-end sm:text-right",
      )}
    >
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-or">
        {sens === "precedent" ? "← Texte précédent" : "Texte suivant →"}
      </span>
      <span className="font-heading text-lg font-semibold text-bleu-nuit-profond group-hover:text-bleu-academique">
        {titre}
      </span>
    </Link>
  );
}

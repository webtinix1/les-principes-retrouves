import { Fragment } from "react";
import type { BlocLecture, TexteLecture } from "@/content/lectures";

/**
 * Rendu des textes des tomes selon le prototype maître V16 : intertitres
 * `p.source-heading`, paragraphes `p.source-paragraph`. Composant pur (sans
 * accès aux données) : utilisé par le lecteur client de /ouvrage et par les
 * pages /ouvrage/<tome>/<texte>. Le texte lui-même n'est jamais modifié.
 */

/** « a≠b » : le signe ≠ porte son libellé pour les lecteurs d'écran, comme dans le prototype. */
function AvecDifferent({ x }: { x: string }) {
  if (!x.includes("≠")) return <>{x}</>;
  return (
    <>
      {x.split("≠").map((morceau, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span aria-label="différent de" className="neq">
              ≠
            </span>
          )}
          {morceau}
        </Fragment>
      ))}
    </>
  );
}

function Bloc({ bloc, niveau }: { bloc: BlocLecture; niveau: number }) {
  switch (bloc.t) {
    case "h":
      // Intertitre : élément <p> du prototype, annoncé comme titre aux lecteurs d'écran.
      return (
        <p className="source-heading" id={bloc.id} role="heading" aria-level={niveau}>
          {bloc.x}
        </p>
      );
    case "f":
      return (
        <p className="source-paragraph">
          <AvecDifferent x={bloc.x} />
        </p>
      );
    case "ol":
    case "ul": {
      const Liste = bloc.t;
      return (
        <Liste className="source-paragraph">
          {bloc.items.map((item, i) => (
            <li key={i}>
              <AvecDifferent x={item} />
            </li>
          ))}
        </Liste>
      );
    }
    case "cite":
      return (
        <blockquote className="source-paragraph">
          «&#8239;{bloc.x}&#8239;»{bloc.source && <> — {bloc.source}</>}
        </blockquote>
      );
    case "note":
      return <p className="source-paragraph note">{bloc.x}</p>;
    default:
      return (
        <p className="source-paragraph">
          <AvecDifferent x={bloc.x} />
        </p>
      );
  }
}

/** Lecture intégrale d'un texte (corps de `.full-reading-body`). */
export function CorpsLecture({ texte, niveau = 2 }: { texte: TexteLecture; niveau?: number }) {
  return (
    <>
      {texte.exergue && (
        <p className="source-paragraph">
          «&#8239;{texte.exergue}&#8239;»{texte.exergue_source && <> — {texte.exergue_source}</>}
        </p>
      )}
      {texte.blocs.map((bloc, i) => (
        <Bloc key={i} bloc={bloc} niveau={niveau} />
      ))}
    </>
  );
}

/** Extrait d'un texte (`article.excerpt.interactive-excerpt` du prototype). */
export function ExtraitTexte({ texte, style }: { texte: TexteLecture; style?: React.CSSProperties }) {
  return (
    <article className="excerpt interactive-excerpt" style={style}>
      <div className="tag">{texte.etiquette ?? ""}</div>
      <h3>{texte.titre}</h3>
      {texte.extrait && <p>{`« ${texte.extrait} »`}</p>}
    </article>
  );
}

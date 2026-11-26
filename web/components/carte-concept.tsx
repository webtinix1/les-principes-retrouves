/**
 * Cartes `.card` du prototype maître V16 (pages Laboratoire, Concepts,
 * Transmission) : surtitre doré facultatif, titre, paragraphes. Les données
 * viennent des listes éditables du registre (`getListe`).
 */

type Valeur = string | string[] | undefined;

export type CarteV16 = Record<string, string | string[]>;

const texte = (v: Valeur) => (Array.isArray(v) ? v.join(" ") : (v ?? "")).trim();
const lignes = (v: Valeur) => (Array.isArray(v) ? v : v ? [v] : []).filter((l) => l.trim());

/** Une carte. Une ancre (`ancre`) devient son `id` : liens `/concepts#maat`. */
export function Carte({ carte }: { carte: CarteV16 }) {
  const ancre = texte(carte.ancre);
  const tag = texte(carte.tag);
  return (
    <article className="card" id={ancre || undefined}>
      {tag ? <div className="tag">{tag}</div> : null}
      <h3>{texte(carte.titre)}</h3>
      {lignes(carte.paragraphes).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </article>
  );
}

/** Grille `.grid` de cartes. */
export function GrilleCartes({ cartes }: { cartes: CarteV16[] }) {
  return (
    <div className="grid">
      {cartes.map((c, i) => (
        <Carte key={i} carte={c} />
      ))}
    </div>
  );
}

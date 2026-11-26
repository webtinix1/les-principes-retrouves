import Link from "next/link";
import { getTexte } from "@/lib/contenu";
import "@/app/(frontend)/(site)/pages-annexes.css";

export type EntreeSommaire = { id: string; label: string };

/**
 * Gabarit des pages légales (mentions, confidentialité, CGV) dans l'allure du
 * prototype maître V16 : bandeau `.page-head` (fil d'Ariane en surtitre,
 * titre, sous-titre éventuel), puis `.content > .wrap` avec le sommaire en
 * carte à gauche (ordinateur) et la colonne de lecture.
 */
export async function GabaritLegal({
  titre,
  sousTitre,
  avertissement,
  sommaire,
  children,
}: {
  titre: string;
  sousTitre?: React.ReactNode;
  /** Mention provisoire (document en cours de finalisation). */
  avertissement?: React.ReactNode;
  sommaire: EntreeSommaire[];
  children: React.ReactNode;
}) {
  const [accueil, aria, titreSommaire] = await Promise.all([
    getTexte("site_interface.legal.fil_accueil"),
    getTexte("site_interface.fil_ariane.aria"),
    getTexte("site_interface.sommaire.titre"),
  ]);
  return (
    <section className="page fade annexe-v16">
      <div className="page-head">
        <div className="wrap">
          <nav aria-label={aria} className="eyebrow">
            <Link href="/accueil">{accueil}</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span aria-current="page">{titre}</span>
          </nav>
          <h1>{titre}</h1>
          {sousTitre && <p>{sousTitre}</p>}
        </div>
      </div>
      <div className="content">
        <div className="wrap annexe-colonnes annexe-colonnes--sommaire">
          <div>
            {sommaire.length > 0 && (
              <nav aria-label={titreSommaire} className="card annexe-sommaire">
                <div className="tag">{titreSommaire}</div>
                <ol>
                  {sommaire.map((e) => (
                    <li key={e.id}>
                      <a href={`#${e.id}`}>{e.label}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
          <div className="annexe-texte">
            {avertissement && (
              <div role="note" className="annexe-avertissement">
                {avertissement}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Classes des intertitres, listes et liens du texte légal. La mise en forme
 * vient de `pages-annexes.css` (`.annexe-texte`), commune au JSX d'origine et
 * au HTML du back-office.
 */
export const H2_LEGAL = "";
export const LISTE_LEGALE = "";
export const LIEN_LEGAL = "";
export const CODE_LEGAL = "annexe-code";

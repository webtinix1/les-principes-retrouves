"use client";

import { useRef, useState } from "react";
import type { TexteLecture } from "@/content/lectures";
import { CorpsLecture, ExtraitTexte } from "@/components/lecture";

/**
 * Lecteur des textes de la page Les ouvrages (prototype maître V16, script de
 * fin de page « initBookSelectors ») : onglets TOME I / TOME II, liste des
 * textes du tome, extrait du texte choisi, bouton « Lire le texte intégral »
 * qui affiche la lecture intégrale seule avec une barre de retour.
 *
 * Comme dans le prototype, tous les extraits et lectures intégrales sont dans
 * la page ; seul le texte choisi est affiché.
 */

export type TomeLecteur = {
  /** "tome-i", "tome-ii". */
  tome: string;
  /** Onglet et intertitre (« TOME I »). */
  libelle: string;
  textes: TexteLecture[];
};

export type LibellesLecteur = {
  titre: string;
  chapeau: string;
  tomesAria: string;
  consigne: string;
  textesAria: string;
  lireIntegral: string;
  ouvrirIntegral: string;
  retour: string;
};

const cleDe = (tome: string, slug: string) => `${tome}/${slug}`;

export function OuvrageLecteur({ tomes, libelles }: { tomes: TomeLecteur[]; libelles: LibellesLecteur }) {
  const premier = tomes.find((t) => t.textes.length > 0);
  const [tomeCourant, setTomeCourant] = useState(premier?.tome ?? "");
  const [choix, setChoix] = useState(premier?.textes[0] ? cleDe(premier.tome, premier.textes[0].slug) : "");
  const [integral, setIntegral] = useState(false);
  const racine = useRef<HTMLDivElement>(null);

  /** Après un choix, amène le texte choisi à l’écran (utile sur mobile, où la liste est longue). */
  function montrer(selecteur: string) {
    requestAnimationFrame(() => {
      const cible = racine.current?.querySelector<HTMLElement>(selecteur);
      if (!cible) return;
      const haut = cible.getBoundingClientRect().top;
      if (haut < 90 || haut > window.innerHeight * 0.75) {
        const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        cible.scrollIntoView({ behavior: reduit ? "auto" : "smooth", block: "start" });
      }
    });
  }

  const visibles = tomes.find((t) => t.tome === tomeCourant)?.textes ?? [];
  const selection = tomes
    .flatMap((t) => t.textes.map((x) => ({ cle: cleDe(t.tome, x.slug), texte: x })))
    .find((x) => x.cle === choix);
  const aUnIntegral = !!selection && selection.texte.blocs.length > 0;

  function choisirTome(tome: string) {
    setTomeCourant(tome);
    const t = tomes.find((x) => x.tome === tome);
    if (t?.textes[0]) setChoix(cleDe(tome, t.textes[0].slug));
    setIntegral(false);
  }

  return (
    <div ref={racine} className={integral ? "reading-library is-full-reading" : "reading-library"}>
      <div className="ouvrage-full-reader-bar" style={{ display: integral ? "flex" : "none" }}>
        <button
          type="button"
          onClick={() => {
            setIntegral(false);
            montrer(".ouvrage-reader-controls");
          }}
        >
          {libelles.retour}
        </button>
        <strong>{integral ? selection?.texte.titre : ""}</strong>
      </div>
      <h2>{libelles.titre}</h2>
      <div className="ouvrage-reader-controls" style={{ display: integral ? "none" : "block" }}>
        <div className="ouvrage-tome-tabs" role="group" aria-label={libelles.tomesAria}>
          {tomes.map((t) => (
            <button
              key={t.tome}
              type="button"
              data-tome={t.tome}
              aria-pressed={t.tome === tomeCourant}
              onClick={() => choisirTome(t.tome)}
            >
              {t.libelle}
            </button>
          ))}
        </div>
        <p className="ouvrage-reader-instruction">{libelles.consigne}</p>
        <div className="ouvrage-text-list" role="group" aria-label={libelles.textesAria}>
          {visibles.map((x) => {
            const cle = cleDe(tomeCourant, x.slug);
            return (
              <button
                key={cle}
                type="button"
                aria-pressed={cle === choix}
                onClick={() => {
                  setChoix(cle);
                  setIntegral(false);
                  montrer(".ouvrage-selected-action");
                }}
              >
                {x.titre}
              </button>
            );
          })}
        </div>
        <div className="ouvrage-selected-action">
          <span className="ouvrage-selected-label">{selection?.texte.titre}</span>
          <button
            type="button"
            className="ouvrage-read-full"
            style={{ display: aUnIntegral ? "inline-block" : "none" }}
            onClick={() => {
              if (!aUnIntegral) return;
              setIntegral(true);
              montrer(".ouvrage-full-reader-bar");
            }}
          >
            {libelles.lireIntegral}
          </button>
        </div>
      </div>
      <p className="lead">{libelles.chapeau}</p>
      {tomes.map((t) => (
        <TomeTextes
          key={t.tome}
          tome={t}
          choix={choix}
          integral={integral}
          ouvrirIntegral={libelles.ouvrirIntegral}
        />
      ))}
    </div>
  );
}

function TomeTextes({
  tome,
  choix,
  integral,
  ouvrirIntegral,
}: {
  tome: TomeLecteur;
  choix: string;
  integral: boolean;
  ouvrirIntegral: string;
}) {
  return (
    <>
      {/* Intertitre du tome masqué tant qu’aucun de ses textes n’est affiché. */}
      <h2 hidden={!choix.startsWith(tome.tome + "/")}>{tome.libelle}</h2>
      {tome.textes.map((x) => (
        <ExtraitTexte
          key={x.slug}
          texte={x}
          style={{ display: !integral && cleDe(tome.tome, x.slug) === choix ? "block" : "none" }}
        />
      ))}
      {tome.textes.map((x) => {
        const ouvert = integral && cleDe(tome.tome, x.slug) === choix;
        return (
          <details
            key={x.slug}
            className="full-reading"
            id={`full-${tome.tome}-${x.slug}`}
            open={ouvert}
            style={{ display: ouvert ? "block" : "none" }}
          >
            <summary>
              <span>{x.titre}</span>
              <small>{ouvrirIntegral}</small>
            </summary>
            <div className="full-reading-body">
              <CorpsLecture texte={x} niveau={3} />
            </div>
          </details>
        );
      })}
    </>
  );
}

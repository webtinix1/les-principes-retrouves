"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ModuleComparable = {
  id: string;
  numero: string;
  titre: string;
  public_cible: string;
  duree: string;
  prerequis: string;
  tarif_b2b: string | null;
  tarif_b2c: string | null;
  tarif_devis: string | null;
  acces: string;
  sessions: { titre: string; points: string[] }[];
  livrables: string[];
  cta_label: string;
};

/** Sépare « Sur Devis Uniquement (de 5 000 € à 20 000 €…) » en titre et précision. */
function devis(t: string) {
  const i = t.indexOf("(");
  return i < 0 ? { titre: t, precision: "" } : { titre: t.slice(0, i).trim(), precision: t.slice(i) };
}

/** Libellés du tableau (back-office, « Site — Interface », clés « comparaison.* » sans préfixe). */
export type LibellesComparaison = Record<string, string>;

function Programme({ m, t }: { m: ModuleComparable; t: LibellesComparaison }) {
  if (m.sessions.length === 0 && m.livrables.length === 0) return <span>—</span>;
  return (
    <details className="group">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 font-ui text-[14.5px] font-semibold text-lien [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">{t.programme_ouvrir}</span>
        <span className="hidden group-open:inline">{t.programme_fermer}</span>
        <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-2 flex flex-col gap-4">
        {m.sessions.map((s) => (
          <div key={s.titre}>
            <p className="font-ui text-sm font-semibold text-encre">{s.titre}</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 font-ui text-[13.5px] leading-snug text-encre-2 marker:text-encre-3">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
        {m.livrables.length > 0 && (
          <div>
            <p className="font-ui text-sm font-semibold text-encre">{t.livrables}</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 font-ui text-[13.5px] leading-snug text-encre-2 marker:text-encre-3">
              {m.livrables.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </details>
  );
}

function Inscription({ m, pleine }: { m: ModuleComparable; pleine?: boolean }) {
  return (
    <Link
      href={`/commander/${m.id}`}
      className={cn(buttonVariants({ variant: m.tarif_devis ? "or" : "nuit", size: "cta" }), pleine && "w-full")}
    >
      {m.cta_label}
    </Link>
  );
}

const TH = "w-[200px] border-t border-filet px-5 py-[18px] text-left align-top font-ui text-sm font-semibold text-encre";
const TD = "border-t border-l border-filet px-5 py-[18px] align-top font-ui text-[15px] leading-[1.55] text-encre-2";
const PRIX = "font-titre text-[30px] text-encre";

/**
 * Comparaison des trois modules : tableau sur ordinateur, onglets I · II · III
 * sur mobile. Le régime B2B / B2C se choisit sur le formulaire d'inscription.
 */
export function ModulesComparaisonClient({
  modules,
  t,
}: {
  modules: ModuleComparable[];
  t: LibellesComparaison;
}) {
  const [actif, setActif] = useState(0);
  const m = modules[actif];

  return (
    <>
      {/* Ordinateur */}
      <div className="rv hidden overflow-hidden rounded-[4px] border border-filet bg-blanc lg:block">
        <table className="w-full table-fixed border-collapse">
          <caption className="sr-only">{t.legende}</caption>
          <thead>
            <tr>
              <td className="w-[200px] px-5 py-7 align-bottom font-code text-[11.5px] text-encre-3">{t.comparer}</td>
              {modules.map((mod, i) => {
                const fort = i === modules.length - 1;
                return (
                  <th
                    key={mod.id}
                    scope="col"
                    className={cn(
                      "border-l border-filet px-5 py-7 text-left align-top",
                      fort && "surface-sombre bg-nuit-950",
                    )}
                  >
                    <span className={cn("block pb-2.5 font-code text-xs tracking-[0.14em] uppercase", fort ? "text-or-500" : "text-or-700")}>
                      {mod.numero}
                    </span>
                    <span className={cn("font-titre text-2xl leading-[1.25] font-medium", fort ? "text-white" : "text-encre")}>
                      {mod.titre}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className={TH}>{t.public_cible}</th>
              {modules.map((mod) => <td key={mod.id} className={TD}>{mod.public_cible}</td>)}
            </tr>
            <tr>
              <th scope="row" className={TH}>{t.duree}</th>
              {modules.map((mod) => <td key={mod.id} className={TD}>{mod.duree}</td>)}
            </tr>
            <tr>
              <th scope="row" className={TH}>{t.prerequis}</th>
              {modules.map((mod) => <td key={mod.id} className={TD}>{mod.prerequis}</td>)}
            </tr>
            <tr className="bg-papier">
              <th scope="row" className={TH}>{t.regime_b2b}</th>
              {modules.map((mod) =>
                mod.tarif_devis ? (
                  <td key={mod.id} rowSpan={2} className={cn(TD, "align-middle")}>
                    <span className="font-titre text-[22px] leading-[1.35] text-encre">{devis(mod.tarif_devis).titre}</span>
                    <br />
                    <span className="text-[14.5px]">{devis(mod.tarif_devis).precision}</span>
                  </td>
                ) : (
                  <td key={mod.id} className={TD}><span className={PRIX}>{mod.tarif_b2b}</span></td>
                ),
              )}
            </tr>
            <tr className="bg-papier">
              <th scope="row" className={TH}>{t.regime_b2c}</th>
              {modules.map((mod) =>
                mod.tarif_devis ? null : (
                  <td key={mod.id} className={TD}><span className={PRIX}>{mod.tarif_b2c}</span></td>
                ),
              )}
            </tr>
            <tr>
              <th scope="row" className={TH}>{t.acces}</th>
              {modules.map((mod) => <td key={mod.id} className={TD}>{mod.acces}</td>)}
            </tr>
            <tr>
              <th scope="row" className={TH}>{t.programme}</th>
              {modules.map((mod) => <td key={mod.id} className={TD}><Programme m={mod} t={t} /></td>)}
            </tr>
            <tr>
              <td className="border-t border-filet" />
              {modules.map((mod) => (
                <td key={mod.id} className={cn(TD, "pb-7")}>
                  <Inscription m={mod} pleine />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile : onglets */}
      <div className="lg:hidden">
        <div role="tablist" aria-label={t.onglets_aria} className="grid grid-cols-3 border border-encre">
          {modules.map((mod, i) => (
            <button
              key={mod.id}
              type="button"
              role="tab"
              id={`onglet-${mod.id}`}
              aria-selected={i === actif}
              aria-controls="panneau-module"
              onClick={() => setActif(i)}
              className={cn(
                "min-h-12 font-ui text-sm font-semibold",
                i > 0 && "border-l border-encre",
                i === actif ? "bg-nuit-950 text-papier" : "bg-blanc text-encre",
              )}
            >
              {mod.numero}
            </button>
          ))}
        </div>
        <div
          key={m.id}
          id="panneau-module"
          role="tabpanel"
          aria-labelledby={`onglet-${m.id}`}
          className="m-swap mt-4 flex flex-col gap-5 rounded-[4px] border border-filet bg-blanc p-5"
        >
          <h3 className="font-titre text-[1.375rem] leading-[1.25] font-medium text-encre">{m.titre}</h3>
          <dl className="flex flex-col gap-4 font-ui text-[15px] leading-[1.55]">
            {[
              [t.public_cible, m.public_cible],
              [t.duree, m.duree],
              [t.prerequis, m.prerequis],
              [t.acces, m.acces],
            ].map(([dt, dd]) => (
              <div key={dt} className="border-t border-filet pt-3">
                <dt className="text-sm font-semibold text-encre">{dt}</dt>
                <dd className="mt-1 text-encre-2">{dd}</dd>
              </div>
            ))}
            <div className="border-t border-filet bg-papier p-3">
              <dt className="text-sm font-semibold text-encre">{t.tarifs}</dt>
              {m.tarif_devis ? (
                <dd className="mt-1 text-encre-2">
                  <span className="font-titre text-xl text-encre">{devis(m.tarif_devis).titre}</span>{" "}
                  {devis(m.tarif_devis).precision}
                </dd>
              ) : (
                <dd className="mt-2 grid grid-cols-2 gap-3">
                  <span className="flex flex-col">
                    <span className="font-titre text-[26px] text-encre">{m.tarif_b2b}</span>
                    <span className="text-[13px] text-encre-3">{t.regime_b2b}</span>
                  </span>
                  <span className="flex flex-col">
                    <span className="font-titre text-[26px] text-encre">{m.tarif_b2c}</span>
                    <span className="text-[13px] text-encre-3">{t.regime_b2c}</span>
                  </span>
                </dd>
              )}
            </div>
          </dl>
          <Programme m={m} t={t} />
          <Inscription m={m} pleine />
        </div>
      </div>
    </>
  );
}

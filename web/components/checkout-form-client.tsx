"use client";

import { useState } from "react";
import { CircleAlert, ShieldCheck } from "lucide-react";
import { CASE, CHAMP, LIBELLE, LIGNE_CASE, MESSAGE_ERREUR, OBLIGATOIRE } from "@/components/champs";
import { cn } from "@/lib/utils";

export type Regime = "b2b" | "b2c";

export type Props = {
  module_id: string;
  module_titre: string;
  purchasable: boolean;
  tarif_b2b: string | null;
  tarif_b2c: string | null;
  tarif_devis: string | null;
  /** Régimes réellement achetables (produit Chariow publié + mappé). */
  regimes?: Regime[];
};

/** Étoile des champs obligatoires (le libellé « * » final reste dans le texte du back-office). */
const etoile = (libelle: string) =>
  libelle.endsWith(" *") ? (
    <>
      {libelle.slice(0, -2)} <span aria-hidden="true" className={OBLIGATOIRE}>*</span>
    </>
  ) : (
    libelle
  );

/**
 * Formulaire d'inscription (client). Les textes viennent du back-office
 * (« Site — Formulaires ») via le wrapper serveur `CheckoutForm` (checkout-form.tsx) :
 * clés « commun.* » et « inscription.* » sans préfixe, et la liste des pays.
 */
export function CheckoutFormClient({
  t,
  pays,
  ...props
}: Props & { t: Record<string, string>; pays: { code: string; libelle: string }[] }) {
  const REGIME_LABEL: Record<Regime, string> = { b2b: t.regime_b2b, b2c: t.regime_b2c };
  const regimes: Regime[] = props.regimes ?? ["b2b", "b2c"];
  const tarif: Record<Regime, string | null> = {
    b2b: props.tarif_b2b,
    b2c: props.tarif_b2c,
  };

  const [etat, setEtat] = useState<"idle" | "envoi" | "erreur">("idle");
  const [erreur, setErreur] = useState("");
  // Régime sélectionné : pilote le récapitulatif affiché près du bouton.
  const [regime, setRegime] = useState<Regime>(regimes[0] ?? "b2b");

  const montant = tarif[regime];
  const regimeLabel = REGIME_LABEL[regime];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat("envoi");
    setErreur("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      module_id: props.module_id,
      tarif_type: props.purchasable ? String(fd.get("tarif_type") ?? "b2c") : "devis",
      buyer_nom: String(fd.get("buyer_nom") ?? ""),
      buyer_email: String(fd.get("buyer_email") ?? ""),
      buyer_organisation: String(fd.get("buyer_organisation") ?? ""),
      buyer_telephone: String(fd.get("buyer_telephone") ?? ""),
      buyer_pays: String(fd.get("buyer_pays") ?? "CG"),
      consent_rgpd: fd.get("consent_rgpd") === "on",
    };
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = (await res.json()) as { ok: boolean; error?: string; redirect?: string };
      if (res.ok && d.ok && d.redirect) {
        window.location.assign(d.redirect);
        return;
      }
      setEtat("erreur");
      setErreur(d.error ?? t.erreur);
    } catch {
      setEtat("erreur");
      setErreur(t.indisponible);
    }
  }

  return (
    <form onSubmit={onSubmit} aria-busy={etat === "envoi"} className="flex flex-col gap-[22px]">
      {props.purchasable && (
        <fieldset>
          <legend className={LIBELLE}>
            {etoile(regimes.length > 1 ? t.regime_choix : t.regime)}
          </legend>
          {/* Sélecteur segmenté : de vrais boutons radio (même nom, mêmes valeurs), mis en forme. */}
          <div className={cn("mt-1.5 grid", regimes.length > 1 && "grid-cols-2")}>
            {regimes.map((r, i) => (
              <label
                key={r}
                className={cn(
                  "relative flex min-h-11 cursor-pointer flex-col items-center justify-center gap-0.5 border border-encre bg-blanc px-3 py-2.5 text-center font-ui text-encre transition-colors",
                  "has-[:checked]:bg-nuit-950 has-[:checked]:text-papier",
                  "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-nuit-950",
                  i === 0 ? "rounded-l-[2px]" : "-ml-px",
                  i === regimes.length - 1 && "rounded-r-[2px]",
                )}
              >
                <input
                  type="radio"
                  name="tarif_type"
                  value={r}
                  checked={regime === r}
                  onChange={() => setRegime(r)}
                  className="sr-only"
                />
                <span className="text-[14.5px] leading-tight font-semibold">{REGIME_LABEL[r]}</span>
                <span className="font-code text-[13px]">{tarif[r] ?? "—"}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="buyer_nom" className={LIBELLE}>{etoile(t.nom)}</label>
          <input id="buyer_nom" name="buyer_nom" required maxLength={120} className={CHAMP} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="buyer_email" className={LIBELLE}>{etoile(t.email)}</label>
          <input id="buyer_email" name="buyer_email" type="email" required maxLength={200} className={CHAMP} autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="buyer_organisation" className={LIBELLE}>{t.organisation}</label>
        <input id="buyer_organisation" name="buyer_organisation" maxLength={160} className={CHAMP} autoComplete="organization" />
      </div>

      {props.purchasable && (
        <div className="grid gap-5 sm:grid-cols-[1fr_12rem]">
          <div>
            <label htmlFor="buyer_telephone" className={LIBELLE}>{etoile(t.telephone)}</label>
            <input
              id="buyer_telephone"
              name="buyer_telephone"
              type="tel"
              required
              maxLength={30}
              placeholder={t.telephone_exemple}
              className={CHAMP}
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="buyer_pays" className={LIBELLE}>{t.pays}</label>
            <select id="buyer_pays" name="buyer_pays" defaultValue="CG" className={CHAMP}>
              {pays.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.libelle}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <label className={LIGNE_CASE}>
        <input type="checkbox" name="consent_rgpd" required className={CASE} />
        <span>{t.consentement}</span>
      </label>

      {props.purchasable && montant && (
        <div key={regime} className="m-swap border-l-[3px] border-[#D4AF37] bg-[#eee9dc] px-5 py-4">
          <p className="font-code text-xs tracking-[0.14em] text-encre-3 uppercase">
            {t.recapitulatif}
          </p>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <div className="font-ui text-[15px] text-encre">
              {props.module_titre}
              <span className="block text-sm text-encre-3">
                {t.regime} {regimeLabel}
              </span>
            </div>
            <p className="font-code text-2xl font-medium text-encre">
              {montant}
            </p>
          </div>
        </div>
      )}

      {etat === "erreur" && (
        <p role="alert" className={MESSAGE_ERREUR}>
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
          {erreur}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-filet-doux pt-4">
        {props.purchasable && (
          <p className="flex items-center gap-1.5 font-ui text-sm text-encre-2">
            <ShieldCheck aria-hidden="true" className="size-[18px] shrink-0 text-succes" strokeWidth={1.75} />
            {t.paiement_securise}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-code text-[11.5px] text-encre-3">{t.champ_obligatoire}</span>
          <button
            type="submit"
            disabled={etat === "envoi"}
            aria-busy={etat === "envoi"}
            className="btn w-full sm:w-auto"
          >
            {etat === "envoi"
              ? t.traitement
              : props.purchasable
                ? `${t.payer}${montant ? ` — ${montant}` : ""}`
                : t.devis}
          </button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Regime = "b2b" | "b2c";

type Props = {
  module_id: string;
  module_titre: string;
  purchasable: boolean;
  tarif_b2b: string | null;
  tarif_b2c: string | null;
  tarif_devis: string | null;
  /** Régimes réellement achetables (produit Chariow publié + mappé). */
  regimes?: Regime[];
};

const REGIME_LABEL: Record<Regime, string> = {
  b2b: "Institutionnel (B2B)",
  b2c: "Individuel (B2C)",
};

const champ =
  "mt-1 w-full rounded-md border border-bleu-nuit-profond/15 bg-white px-3 py-2 font-sans text-sm text-bleu-nuit-profond outline-none focus-visible:border-or focus-visible:ring-2 focus-visible:ring-or/40";
const label =
  "font-ui text-xs font-semibold uppercase tracking-wide text-bleu-nuit-profond/70";

export function CheckoutForm(props: Props) {
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
        window.location.href = d.redirect;
        return;
      }
      setEtat("erreur");
      setErreur(d.error ?? "Une erreur est survenue.");
    } catch {
      setEtat("erreur");
      setErreur("Le service est momentanément indisponible.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {props.purchasable && (
        <fieldset>
          <legend className={label}>
            {regimes.length > 1 ? "Régime tarifaire *" : "Régime"}
          </legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {regimes.map((r) => (
              <label
                key={r}
                className="flex cursor-pointer items-start gap-3 rounded-md border border-bleu-nuit-profond/15 bg-white p-3 font-sans text-sm has-[:checked]:border-or has-[:checked]:ring-2 has-[:checked]:ring-or/30"
              >
                <input
                  type="radio"
                  name="tarif_type"
                  value={r}
                  checked={regime === r}
                  onChange={() => setRegime(r)}
                  className="mt-1 accent-[var(--color-or)]"
                />
                <span>
                  <span className="font-semibold">{REGIME_LABEL[r]}</span>
                  <span className="mt-0.5 block font-mono text-or">{tarif[r] ?? "—"}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="buyer_nom" className={label}>Nom *</label>
          <input id="buyer_nom" name="buyer_nom" required maxLength={120} className={champ} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="buyer_email" className={label}>E-mail *</label>
          <input id="buyer_email" name="buyer_email" type="email" required maxLength={200} className={champ} autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="buyer_organisation" className={label}>Organisation</label>
        <input id="buyer_organisation" name="buyer_organisation" maxLength={160} className={champ} autoComplete="organization" />
      </div>

      {props.purchasable && (
        <div className="grid gap-5 sm:grid-cols-[1fr_7rem]">
          <div>
            <label htmlFor="buyer_telephone" className={label}>Téléphone *</label>
            <input
              id="buyer_telephone"
              name="buyer_telephone"
              type="tel"
              required
              maxLength={30}
              placeholder="Ex. 06 000 00 00"
              className={champ}
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="buyer_pays" className={label}>Pays</label>
            <select id="buyer_pays" name="buyer_pays" defaultValue="CG" className={champ}>
              <option value="CG">Congo (CG)</option>
              <option value="CD">RD Congo (CD)</option>
              <option value="CM">Cameroun (CM)</option>
              <option value="CI">Côte d&apos;Ivoire (CI)</option>
              <option value="SN">Sénégal (SN)</option>
              <option value="BJ">Bénin (BJ)</option>
              <option value="FR">France (FR)</option>
            </select>
          </div>
        </div>
      )}

      <label className="flex items-start gap-3 font-sans text-sm text-bleu-nuit-profond/80">
        <input type="checkbox" name="consent_rgpd" required className="mt-1 size-4 accent-[var(--color-or)]" />
        <span>
          J&apos;accepte que mes données soient conservées aux fins de gestion de
          mon inscription, conformément à la politique de confidentialité.
        </span>
      </label>

      {props.purchasable && montant && (
        <div className="rounded-md border border-or/40 bg-or/5 p-4">
          <p className="font-ui text-xs font-semibold uppercase tracking-wide text-bleu-nuit-profond/60">
            Récapitulatif
          </p>
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <div className="font-sans text-sm text-bleu-nuit-profond/80">
              {props.module_titre}
              <span className="block text-bleu-nuit-profond/60">
                Régime {regimeLabel}
              </span>
            </div>
            <p className="font-mono text-2xl font-semibold text-bleu-nuit-profond">
              {montant}
            </p>
          </div>
        </div>
      )}

      {etat === "erreur" && (
        <p role="alert" className="font-ui text-sm text-red-700">{erreur}</p>
      )}

      {props.purchasable && (
        <p className="flex items-center gap-1.5 font-ui text-xs text-bleu-nuit-profond/70">
          Paiement sécurisé (Mobile Money
          &amp; carte) via Chariow.
        </p>
      )}

      <button
        type="submit"
        disabled={etat === "envoi"}
        className={cn(
          buttonVariants({ variant: props.purchasable ? "or-plein" : "or", size: "cta" }),
          "w-full disabled:opacity-60",
        )}
      >
        {etat === "envoi"
          ? "Traitement…"
          : props.purchasable
            ? `Procéder au paiement${montant ? ` — ${montant}` : ""}`
            : "Demander un devis"}
      </button>
    </form>
  );
}

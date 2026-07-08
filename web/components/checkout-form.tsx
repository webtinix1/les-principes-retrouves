"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  module_id: string;
  purchasable: boolean;
  tarif_b2b: string | null;
  tarif_b2c: string | null;
  tarif_devis: string | null;
};

const champ =
  "mt-1 w-full rounded-md border border-bleu-nuit-profond/15 bg-white px-3 py-2 font-sans text-sm text-bleu-nuit-profond outline-none focus-visible:border-or focus-visible:ring-2 focus-visible:ring-or/40";
const label =
  "font-ui text-xs font-semibold uppercase tracking-wide text-bleu-nuit-profond/70";

export function CheckoutForm(props: Props) {
  const [etat, setEtat] = useState<"idle" | "envoi" | "erreur">("idle");
  const [erreur, setErreur] = useState("");

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
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {props.purchasable && (
        <fieldset>
          <legend className={label}>Régime tarifaire *</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-bleu-nuit-profond/15 bg-white p-3 font-sans text-sm has-[:checked]:border-or has-[:checked]:ring-2 has-[:checked]:ring-or/30">
              <input type="radio" name="tarif_type" value="b2b" defaultChecked className="mt-1 accent-[var(--color-or)]" />
              <span>
                <span className="font-semibold">Institutionnel (B2B)</span>
                <span className="mt-0.5 block font-mono text-or">{props.tarif_b2b ?? "—"}</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-bleu-nuit-profond/15 bg-white p-3 font-sans text-sm has-[:checked]:border-or has-[:checked]:ring-2 has-[:checked]:ring-or/30">
              <input type="radio" name="tarif_type" value="b2c" className="mt-1 accent-[var(--color-or)]" />
              <span>
                <span className="font-semibold">Individuel (B2C)</span>
                <span className="mt-0.5 block font-mono text-or">{props.tarif_b2c ?? "—"}</span>
              </span>
            </label>
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

      <label className="flex items-start gap-3 font-sans text-sm text-bleu-nuit-profond/80">
        <input type="checkbox" name="consent_rgpd" required className="mt-1 size-4 accent-[var(--color-or)]" />
        <span>
          J&apos;accepte que mes données soient conservées aux fins de gestion de
          mon inscription, conformément à la politique de confidentialité.
        </span>
      </label>

      {etat === "erreur" && (
        <p role="alert" className="font-ui text-sm text-red-700">{erreur}</p>
      )}

      <button
        type="submit"
        disabled={etat === "envoi"}
        className={cn(buttonVariants({ variant: "or", size: "cta" }), "disabled:opacity-60")}
      >
        {etat === "envoi"
          ? "Traitement…"
          : props.purchasable
            ? "Procéder au paiement"
            : "Demander un devis"}
      </button>

      {props.purchasable && (
        <p className="font-ui text-xs text-bleu-nuit-profond/50">
          Paiement sécurisé (Mobile Money & carte) via CinetPay.
        </p>
      )}
    </form>
  );
}

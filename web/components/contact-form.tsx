"use client";

import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Etat = "idle" | "envoi" | "succes" | "erreur";

export function ContactForm() {
  const [etat, setEtat] = useState<Etat>("idle");
  const [erreur, setErreur] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  // Chargement du script Turnstile (une seule fois) si une clé publique est configurée.
  useEffect(() => {
    if (!SITE_KEY || document.getElementById("cf-turnstile-script")) return;
    const s = document.createElement("script");
    s.id = "cf-turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat("envoi");
    setErreur("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      nom: String(fd.get("nom") ?? ""),
      email: String(fd.get("email") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      sujet: String(fd.get("sujet") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent_rgpd: fd.get("consent_rgpd") === "on",
      turnstile_token: String(fd.get("cf-turnstile-response") ?? ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) {
        setEtat("succes");
        formRef.current?.reset();
      } else {
        setEtat("erreur");
        setErreur(data.error ?? "Une erreur est survenue.");
      }
    } catch {
      setEtat("erreur");
      setErreur("Le service est momentanément indisponible.");
    }
  }

  if (etat === "succes") {
    return (
      <div
        role="status"
        className="surface-claire rounded-xl border border-or/50 bg-gris-clair p-6 text-bleu-nuit-profond"
      >
        <p className="font-heading text-lg font-semibold">Message transmis.</p>
        <p className="mt-2 font-sans text-sm">
          Le Secrétariat International accusera réception de votre demande. Merci.
        </p>
      </div>
    );
  }

  const champ =
    "mt-1 w-full rounded-md border border-bleu-nuit-profond/15 bg-white px-3 py-2 font-sans text-sm text-bleu-nuit-profond outline-none focus-visible:border-or focus-visible:ring-2 focus-visible:ring-or/40";
  const label = "font-ui text-xs font-semibold uppercase tracking-wide text-bleu-nuit-profond/70";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={label}>Nom *</label>
          <input id="nom" name="nom" required maxLength={120} className={champ} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className={label}>E-mail *</label>
          <input id="email" name="email" type="email" required maxLength={200} className={champ} autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="organisation" className={label}>Organisation</label>
        <input id="organisation" name="organisation" maxLength={160} className={champ} autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="sujet" className={label}>Sujet *</label>
        <input id="sujet" name="sujet" required maxLength={160} className={champ} />
      </div>
      <div>
        <label htmlFor="message" className={label}>Message *</label>
        <textarea id="message" name="message" required rows={6} maxLength={5000} className={champ} />
      </div>

      <label className="flex items-start gap-3 font-sans text-sm text-bleu-nuit-profond/80">
        <input type="checkbox" name="consent_rgpd" required className="mt-1 size-4 accent-[var(--color-or)]" />
        <span>
          J&apos;accepte que mes données soient traitées aux fins de traitement de
          ma demande, conformément à la politique de confidentialité.
        </span>
      </label>

      {/* Widget anti-spam Cloudflare Turnstile (actif si la clé publique est configurée) */}
      {SITE_KEY ? (
        <div className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="light" />
      ) : (
        <p className="font-ui text-xs text-bleu-nuit-profond/50">
          {/* PLACEHOLDER: protection anti-spam Turnstile activée dès configuration de la clé */}
          Protection anti-spam activée prochainement.
        </p>
      )}

      {etat === "erreur" && (
        <p role="alert" className="font-ui text-sm text-red-700">{erreur}</p>
      )}

      <button
        type="submit"
        disabled={etat === "envoi"}
        className={cn(buttonVariants({ variant: "or", size: "cta" }), "disabled:opacity-60")}
      >
        {etat === "envoi" ? "Envoi…" : "Transmettre au Secrétariat"}
      </button>
    </form>
  );
}

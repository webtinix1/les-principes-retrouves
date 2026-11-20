"use client";

import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CASE, CHAMP, LIBELLE, LIGNE_CASE, MESSAGE_ERREUR, OBLIGATOIRE, ZONE_TEXTE } from "@/components/champs";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Etat = "idle" | "envoi" | "succes" | "erreur";

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
 * Formulaire de contact (client). Les textes viennent du back-office
 * (« Site — Formulaires ») via le wrapper serveur `ContactForm` (contact-form.tsx) :
 * clés « commun.* » et « contact.* », sans préfixe.
 */
export function ContactFormClient({ t }: { t: Record<string, string> }) {
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
        setErreur(data.error ?? t.erreur);
      }
    } catch {
      setEtat("erreur");
      setErreur(t.indisponible);
    }
  }

  if (etat === "succes") {
    return (
      <div
        role="status"
        className="m-swap rounded-[4px] border border-succes bg-papier p-6 text-encre"
      >
        <p className="font-titre text-[22px] font-medium">{t.succes_titre}</p>
        <p className="mt-2 font-ui text-[15px] text-encre-2">
          {t.succes_texte}
        </p>
      </div>
    );
  }


  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-[22px]">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={LIBELLE}>{etoile(t.nom)}</label>
          <input id="nom" name="nom" required maxLength={120} className={CHAMP} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className={LIBELLE}>{etoile(t.email)}</label>
          <input id="email" name="email" type="email" required maxLength={200} className={CHAMP} autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="organisation" className={LIBELLE}>{t.organisation} <span className="font-normal text-encre-3">{t.facultatif}</span></label>
        <input id="organisation" name="organisation" maxLength={160} className={CHAMP} autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="sujet" className={LIBELLE}>{etoile(t.objet)}</label>
        <input id="sujet" name="sujet" required maxLength={160} className={CHAMP} />
      </div>
      <div>
        <label htmlFor="message" className={LIBELLE}>{etoile(t.message)}</label>
        <textarea id="message" name="message" required rows={6} maxLength={5000} className={ZONE_TEXTE} />
      </div>

      <label className={LIGNE_CASE}>
        <input type="checkbox" name="consent_rgpd" required className={CASE} />
        <span>{t.consentement}</span>
      </label>

      {/* Widget anti-spam Cloudflare Turnstile (actif si la clé publique est configurée) */}
      {SITE_KEY ? (
        <div className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="light" />
      ) : null}

      {etat === "erreur" && (
        <p role="alert" className={MESSAGE_ERREUR}>{erreur}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-filet-doux pt-4">
        <span className="font-code text-[11.5px] text-encre-3">{t.champ_obligatoire}</span>
        <button
          type="submit"
          disabled={etat === "envoi"}
          aria-busy={etat === "envoi"}
          className={cn(buttonVariants({ variant: "or-plein", size: "cta" }), "disabled:opacity-60")}
        >
          {etat === "envoi" ? t.envoi : t.bouton}
        </button>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, LockOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CHAMP, LIBELLE, MESSAGE_ERREUR } from "@/components/champs";
import { cn } from "@/lib/utils";

/**
 * Saisie / gestion du code d'accès (débloque les téléchargements conditionnés).
 * Les textes viennent du back-office via le wrapper serveur `AccesForm`
 * (acces-form.tsx) : clés « acces.* » de « Site — Formulaires » sans préfixe,
 * et libellés des niveaux (« Site — Interface »).
 */
export function AccesFormClient({
  niveauActif,
  t,
  niveaux,
}: {
  niveauActif: string | null;
  t: Record<string, string>;
  /** « module_i » → « Module I »… */
  niveaux: Record<string, string>;
}) {
  const router = useRouter();
  const [etat, setEtat] = useState<"idle" | "envoi">("idle");
  const [erreur, setErreur] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat("envoi");
    setErreur("");
    const code = String(new FormData(e.currentTarget).get("code") ?? "");
    try {
      const res = await fetch("/api/acces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const d = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && d.ok) {
        router.refresh();
      } else {
        setErreur(d.error ?? t.erreur);
      }
    } catch {
      setErreur(t.indisponible);
    } finally {
      setEtat("idle");
    }
  }

  async function onRemove() {
    await fetch("/api/acces", { method: "DELETE" });
    router.refresh();
  }

  if (niveauActif) {
    return (
      <div
        role="status"
        className="m-swap flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-[4px] border border-succes bg-papier px-5 py-4"
      >
        <span className="flex items-center gap-2.5 font-ui text-[15px] font-semibold text-encre">
          <LockOpen aria-hidden="true" className="size-[18px] shrink-0 text-succes" strokeWidth={1.75} />
          {t.actif.split("{niveau}").join(niveaux[niveauActif] ?? niveauActif)}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="flex min-h-11 items-center font-ui text-sm text-lien underline underline-offset-[3px] hover:text-encre"
        >
          {t.retirer}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2" aria-busy={etat === "envoi"}>
      <label htmlFor="code" className={LIBELLE}>{t.code}</label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <input
          id="code"
          name="code"
          required
          placeholder={t.exemple}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          aria-invalid={erreur ? true : undefined}
          aria-describedby={erreur ? "code-erreur" : undefined}
          className={cn(CHAMP, "mt-0 font-code tracking-[0.08em] uppercase placeholder:normal-case sm:max-w-[300px]")}
        />
        <button
          type="submit"
          disabled={etat === "envoi"}
          className={cn(buttonVariants({ variant: "or-plein", size: "cta" }), "disabled:opacity-60")}
        >
          {etat === "envoi" ? t.verification : t.debloquer}
        </button>
      </div>
      {erreur && (
        <p id="code-erreur" role="alert" className={cn(MESSAGE_ERREUR, "m-swap")}>
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
          {erreur}
        </p>
      )}
    </form>
  );
}

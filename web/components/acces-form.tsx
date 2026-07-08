"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NIVEAU_LABEL: Record<string, string> = {
  module_i: "Module I",
  module_ii: "Module II",
  module_iii: "Module III",
};

/** Saisie / gestion du code d'accès (débloque les téléchargements conditionnés). */
export function AccesForm({ niveauActif }: { niveauActif: string | null }) {
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
        setErreur(d.error ?? "Code invalide.");
      }
    } catch {
      setErreur("Service momentanément indisponible.");
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
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded bg-or/15 px-3 py-1 font-ui text-sm font-semibold text-bleu-nuit-profond">
          Accès actif — {NIVEAU_LABEL[niveauActif] ?? niveauActif}
        </span>
        <button
          onClick={onRemove}
          className="font-ui text-xs text-bleu-nuit-profond/60 underline underline-offset-4 hover:text-or"
        >
          Retirer le code
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="w-full sm:max-w-xs">
        <label htmlFor="code" className="sr-only">Code d&apos;accès</label>
        <input
          id="code"
          name="code"
          required
          placeholder="EBZ-XXXX-XXXX"
          className="w-full rounded-md border border-blanc-casse/30 bg-white/5 px-3 py-2 font-mono text-sm text-blanc-casse placeholder:text-blanc-casse/40 outline-none focus-visible:border-or focus-visible:ring-2 focus-visible:ring-or/40"
        />
        {erreur && <p role="alert" className="mt-1 font-ui text-xs text-red-300">{erreur}</p>}
      </div>
      <button
        type="submit"
        disabled={etat === "envoi"}
        className={cn(buttonVariants({ variant: "or", size: "cta" }), "disabled:opacity-60")}
      >
        {etat === "envoi" ? "Vérification…" : "Débloquer"}
      </button>
    </form>
  );
}

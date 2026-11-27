"use client";

import { useState } from "react";

/** Formulaire de question ou de réclamation (textes issus du back-office). */
export function LibrairieReclamationForm({ t }: { t: Record<string, string> }) {
  const [etat, setEtat] = useState<"idle" | "envoi" | "ok" | "erreur">("idle");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat("envoi");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/librairie/reclamation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      setEtat(res.ok ? "ok" : "erreur");
    } catch {
      setEtat("erreur");
    }
  }

  if (etat === "ok") {
    return (
      <p className="lib-succes" role="status" data-testid="reclamation-ok">
        {t.succes}
      </p>
    );
  }
  return (
    <form className="lib-form" onSubmit={envoyer} aria-busy={etat === "envoi"} data-testid="form-reclamation">
      <div className="lib-rang">
        <label>
          {t.nom}
          <input name="nom" required maxLength={120} autoComplete="name" />
        </label>
        <label>
          {t.email}
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
      </div>
      <label>
        {t.reference}
        <input name="reference" maxLength={60} />
      </label>
      <label>
        {t.objet}
        <input name="objet" required minLength={3} maxLength={160} />
      </label>
      <label>
        {t.message}
        <textarea name="message" required minLength={10} maxLength={4000} />
      </label>
      {etat === "erreur" && (
        <p className="lib-erreur" role="alert">
          {t.erreur}
        </p>
      )}
      <button type="submit" className="btn" disabled={etat === "envoi"}>
        {t.bouton}
      </button>
    </form>
  );
}

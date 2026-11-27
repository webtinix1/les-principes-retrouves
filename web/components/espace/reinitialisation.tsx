"use client";

import Link from "next/link";
import { useState } from "react";

export function FormulaireReinitialisation({ t, token }: { t: Record<string, string>; token: string }) {
  const [envoi, setEnvoi] = useState(false);
  const [etat, setEtat] = useState<"ok" | "lien" | "mot_de_passe" | "generique" | null>(token ? null : "lien");

  async function soumettre(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setEnvoi(true);
    try {
      const res = await fetch("/api/espace/reinitialisation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, nouveau_mot_de_passe: String(fd.get("nouveau_mot_de_passe") ?? "") }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string };
      setEtat(res.ok && data.ok ? "ok" : data.code === "lien_invalide" ? "lien" : data.code === "mot_de_passe" ? "mot_de_passe" : "generique");
    } catch {
      setEtat("generique");
    } finally {
      setEnvoi(false);
    }
  }

  const lienConnexion = (
    <p>
      <Link href="/espace-utilisateurs?panneau=connexion">{t["connexion.titre"]}</Link>
    </p>
  );

  if (etat === "ok") {
    return (
      <>
        <p role="status" className="etat">{t["reinit.succes"]}</p>
        {lienConnexion}
      </>
    );
  }
  if (etat === "lien") {
    return (
      <>
        <p role="alert" className="etat erreur">{t["reinit.invalide"]}</p>
        {lienConnexion}
      </>
    );
  }
  return (
    <section className="user-panel active">
      <form className="user-form" onSubmit={soumettre}>
        <label className="full">
          {t["reinit.champ"]}
          <input name="nouveau_mot_de_passe" type="password" required minLength={10} autoComplete="new-password" />
          <span className="aide">{t["inscription.mot_de_passe_aide"]}</span>
        </label>
        {etat ? (
          <p role="alert" className="etat erreur full">
            {etat === "mot_de_passe" ? t["message.erreur_mot_de_passe"] : t["message.erreur_generique"]}
          </p>
        ) : null}
        <div className="full">
          <button type="submit" disabled={envoi}>
            {envoi ? t["message.envoi"] : t["reinit.bouton"]}
          </button>
        </div>
      </form>
    </section>
  );
}

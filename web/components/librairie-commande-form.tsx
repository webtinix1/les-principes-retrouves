"use client";

import { useMemo, useState } from "react";

export type ZoneClient = {
  nom: string;
  pays: string[];
  frais_premier: number | null;
  frais_supplementaire: number | null;
  delai: string | null;
};

type Props = {
  tome: string;
  titre: string;
  prix: number;
  zones: ZoneClient[];
  pays: { code: string; libelle: string }[];
  t: Record<string, string>;
};

const euro = (n: number) =>
  `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n)} €`;

/** Formulaire de commande de l'édition imprimée (le serveur recalcule tous les montants). */
export function LibrairieCommandeForm({ tome, titre, prix, zones, pays, t }: Props) {
  const [quantite, setQuantite] = useState(1);
  const [codePays, setCodePays] = useState("CG");
  const [etat, setEtat] = useState<"idle" | "envoi" | "erreur">("idle");
  const [erreur, setErreur] = useState("");

  const zone = useMemo(
    () => zones.find((z) => z.pays.includes(codePays)) ?? zones.find((z) => z.pays.includes("*")) ?? null,
    [zones, codePays],
  );
  const frais =
    zone && zone.frais_premier !== null
      ? Math.round((zone.frais_premier + (zone.frais_supplementaire ?? zone.frais_premier) * (quantite - 1)) * 100) / 100
      : null;
  const sousTotal = Math.round(prix * quantite * 100) / 100;

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (frais === null) return;
    setEtat("envoi");
    setErreur("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/librairie/commande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tome,
          quantite,
          nom: fd.get("nom"),
          email: fd.get("email"),
          telephone: fd.get("telephone"),
          adresse1: fd.get("adresse1"),
          adresse2: fd.get("adresse2"),
          code_postal: fd.get("code_postal"),
          ville: fd.get("ville"),
          pays: codePays,
          consentement: fd.get("consentement") === "on",
        }),
      });
      const d = (await res.json()) as { ok: boolean; redirect?: string; error?: string };
      if (res.ok && d.ok && d.redirect) {
        window.location.assign(d.redirect);
        return;
      }
      setErreur(d.error ?? t.erreur);
    } catch {
      setErreur(t.erreur);
    }
    setEtat("erreur");
  }

  return (
    <form className="lib-form" onSubmit={envoyer} aria-busy={etat === "envoi"} data-testid="form-commande">
      <fieldset>
        <legend>{t.ouvrage}</legend>
        <p style={{ margin: 0 }}>
          <strong>{titre}</strong> — {euro(prix)}
        </p>
        <label>
          {t.quantite}
          <input
            name="quantite"
            type="number"
            min={1}
            max={20}
            required
            value={quantite}
            onChange={(e) => setQuantite(Math.min(20, Math.max(1, Math.trunc(Number(e.target.value)) || 1)))}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>{t.coordonnees}</legend>
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
          {t.telephone}
          <input name="telephone" type="tel" required maxLength={30} autoComplete="tel" />
        </label>
      </fieldset>

      <fieldset>
        <legend>{t.adresse_titre}</legend>
        <label>
          {t.adresse1}
          <input name="adresse1" required maxLength={200} autoComplete="address-line1" />
        </label>
        <label>
          {t.adresse2}
          <input name="adresse2" maxLength={200} autoComplete="address-line2" />
        </label>
        <div className="lib-rang">
          <label>
            {t.code_postal}
            <input name="code_postal" maxLength={20} autoComplete="postal-code" />
          </label>
          <label>
            {t.ville}
            <input name="ville" required maxLength={120} autoComplete="address-level2" />
          </label>
        </div>
        <label>
          {t.pays}
          <select name="pays" value={codePays} onChange={(e) => setCodePays(e.target.value)} autoComplete="country">
            {pays.map((p) => (
              <option key={p.code} value={p.code}>
                {p.libelle}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <div className="lib-recap" aria-live="polite" data-testid="recap">
        <strong>{t.recap}</strong>
        <dl>
          <div>
            <dt>
              {t.recap_exemplaires} ({quantite} × {euro(prix)})
            </dt>
            <dd>{euro(sousTotal)}</dd>
          </div>
          <div>
            <dt>
              {t.recap_livraison}
              {zone ? ` — ${zone.nom}` : ""}
            </dt>
            <dd data-testid="frais">{frais === null ? "—" : euro(frais)}</dd>
          </div>
          <div className="lib-total">
            <dt>{t.recap_total}</dt>
            <dd data-testid="total">{frais === null ? "—" : euro(sousTotal + frais)}</dd>
          </div>
        </dl>
        {zone?.delai && frais !== null && (
          <p className="note">
            {t.recap_delai} {zone.delai}
          </p>
        )}
      </div>

      {frais === null && (
        <p className="lib-erreur" role="alert">
          {t.livraison_indisponible}
        </p>
      )}

      <label className="lib-case">
        <input type="checkbox" name="consentement" required />
        <span>{t.consentement}</span>
      </label>

      {etat === "erreur" && (
        <p className="lib-erreur" role="alert">
          {erreur}
        </p>
      )}

      <button type="submit" className="btn" disabled={etat === "envoi" || frais === null}>
        {etat === "envoi" ? t.traitement : t.bouton}
      </button>
    </form>
  );
}

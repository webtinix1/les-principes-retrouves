/**
 * Outils au-dessus de la liste des comptes lecteurs : export CSV (rôles
 * habilités, contrôlé côté serveur) et statistiques agrégées par pays / ville.
 * Liens bruts (pas <Link>) : l'export est un téléchargement servi par une route API.
 */
export function OutilsLecteurs() {
  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "0.75rem" }}>
      {/* eslint-disable @next/next/no-html-link-for-pages */}
      <a className="btn btn--style-secondary btn--size-small" href="/api/lecteurs/export">
        Exporter en CSV
      </a>
      <a className="btn btn--style-secondary btn--size-small" href="/admin/statistiques-lecteurs">
        Statistiques par pays et par ville
      </a>
      {/* eslint-enable @next/next/no-html-link-for-pages */}
    </div>
  );
}

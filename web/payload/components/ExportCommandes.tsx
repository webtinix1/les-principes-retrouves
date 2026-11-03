/**
 * Lien d'export CSV affiché au-dessus de la liste des commandes. Lien brut
 * (pas <Link>) : c'est un téléchargement servi par une route API.
 */
export function ExportCommandes() {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className="btn btn--style-secondary btn--size-small" href="/api/commandes/export">
        Exporter en CSV
      </a>
    </div>
  );
}

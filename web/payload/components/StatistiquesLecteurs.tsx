import type { AdminViewServerProps } from "payload";
import { DefaultTemplate } from "@payloadcms/next/templates";
import { Gutter } from "@payloadcms/ui";
import { estGestion } from "../access";

type Ligne = { cle: string; total: number };

function compter(valeurs: string[]): Ligne[] {
  const m = new Map<string, number>();
  for (const v of valeurs) {
    const k = v.trim() || "—";
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].map(([cle, total]) => ({ cle, total })).sort((a, b) => b.total - a.total || a.cle.localeCompare(b.cle));
}

function Tableau({ titre, lignes }: { titre: string; lignes: Ligne[] }) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>{titre}</h2>
      <table style={{ borderCollapse: "collapse", minWidth: 320 }}>
        <tbody>
          {lignes.map((l) => (
            <tr key={l.cle}>
              <td style={{ padding: "4px 24px 4px 0" }}>{l.cle}</td>
              <td style={{ padding: "4px 0", textAlign: "right" }}>{l.total}</td>
            </tr>
          ))}
          {lignes.length === 0 && (
            <tr>
              <td>Aucun compte vérifié.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

/** Statistiques agrégées des comptes vérifiés, par pays puis par ville (données déclaratives). */
export async function StatistiquesLecteurs({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, visibleEntities, permissions } = initPageResult;
  const habilite = estGestion(req);
  let contenu: React.ReactNode = <p>Accès réservé aux rôles habilités.</p>;

  if (habilite) {
    const { docs } = await req.payload.find({
      collection: "lecteurs",
      limit: 0,
      pagination: false,
      depth: 0,
      select: { pays: true, ville: true, _verified: true },
      where: { _verified: { equals: true } },
    });
    const parPays = compter(docs.map((d) => d.pays));
    const parVille = compter(docs.map((d) => `${d.ville}, ${d.pays}`));
    contenu = (
      <>
        <p>Comptes vérifiés : {docs.length}. Données déclaratives, sans géolocalisation.</p>
        <Tableau titre="Par pays" lignes={parPays} />
        <Tableau titre="Par ville" lignes={parVille} />
      </>
    );
  }

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user || undefined}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        <h1>Statistiques des comptes lecteurs</h1>
        {contenu}
      </Gutter>
    </DefaultTemplate>
  );
}

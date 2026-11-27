import { getTextes } from "@/lib/contenu";
import { FormulaireReinitialisation } from "@/components/espace/reinitialisation";
import "../espace.css";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false } };

/** Page ouverte par le lien du courrier « mot de passe oublié ». */
export default async function ReinitialisationPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const [t, { token }] = await Promise.all([getTextes("utilisateurs"), searchParams]);
  return (
    <section className="page fade" id="page-utilisateurs">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["tete.surtitre"]}</div>
          <h1>{t["reinit.titre"]}</h1>
        </div>
      </div>
      <div className="content">
        <div className="wrap espace-v16">
          <FormulaireReinitialisation t={t} token={token ?? ""} />
        </div>
      </div>
    </section>
  );
}

import { LibrairieReclamationForm } from "@/components/librairie-reclamation-form";
import { getTextes } from "@/lib/contenu";
import "../librairie.css";

export async function generateMetadata() {
  const t = await getTextes("librairie");
  return { title: t["reclamation.seo_titre"], robots: { index: false } };
}

export default async function ReclamationPage() {
  const t = await getTextes("librairie");
  const r = (cle: string) => t[`reclamation.${cle}`];
  return (
    <section className="page fade" id="page-librairie">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["index.surtitre"]}</div>
          <h1>{r("titre")}</h1>
          <p>{r("intro")}</p>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <LibrairieReclamationForm
            t={{
              nom: r("nom"),
              email: r("email"),
              reference: r("reference"),
              objet: r("objet"),
              message: r("message"),
              bouton: r("bouton"),
              succes: r("succes"),
              erreur: r("erreur"),
            }}
          />
        </div>
      </div>
    </section>
  );
}

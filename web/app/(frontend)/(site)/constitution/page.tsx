import { Fragment } from "react";
import { BlocV16 } from "@/components/v16/bloc-v16";
import { getListe, getTextes } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("constitution");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/constitution" });
}

type Article = { titre: string; texte: string };

/** Constitution méthodologique — conforme au prototype maître V16 (section « page-constitution »). */
export default async function Constitution() {
  const [t, articles] = await Promise.all([
    getTextes("constitution"),
    getListe<Article>("constitution.articles_methode"),
  ]);
  return (
    <section className="page fade" id="page-constitution">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["entete.eyebrow"]}</div>
          <h1>{t["entete.titre"]}</h1>
          <p>{t["entete.intro"]}</p>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <p className="lead">{t["introduction.lead"]}</p>
          {articles.map((a, i) => (
            <Fragment key={i}>
              <h3>{a.titre}</h3>
              <p>{a.texte}</p>
            </Fragment>
          ))}
          <p className="note">{t["introduction.note"]}</p>
          <h3>{t["degradation.titre"]}</h3>
          <BlocV16 cle="constitution.degradation.corps">
            <p>
              La recherche diagnostique une dynamique de dégradation organique ou sociale lorsque la différenciation cesse
              de reconstruire l’unité : spécialisation, segmentation, fragmentation, désarticulation, perte de
              l’intelligibilité commune, désorientation et décomposition. Les conséquences ultimes de cette cascade
              entropique peuvent être le chaos — Isfet. Elle ne concerne pas seulement la connaissance : elle peut
              affecter l’organisation de la Cité et toute organisation structurelle.
            </p>
            <p>
              Le diagnostic a une portée prévisionnelle : il identifie une dynamique et ses conséquences possibles afin de
              rendre perceptibles les conditions d’une correction. Il ne présente pas le chaos comme une fatalité déjà
              accomplie. La reconnaissance de l’écart ouvre la possibilité d’une restauration avant que la
              désorganisation et le chaos ne se consolident.
            </p>
          </BlocV16>
        </div>
      </div>
      <div className="major-section">
        <h2>{t["regles.titre"]}</h2>
        <BlocV16 cle="constitution.regles.corps">
          <p>
            La Constitution méthodologique distingue les propositions démontrées, les hypothèses en cours d’examen, les
            recherches ouvertes et les perspectives. Elle interdit de présenter une conclusion comme acquise avant que les
            exigences de démonstration propres à son domaine aient été satisfaites.
          </p>
          <p>
            Le Canon de la découverte en sept principes, développé dans le Tome I, expose la dynamique intellectuelle de
            la découverte. La présente Constitution en rappelle les exigences de conduite : explicitation des prémisses,
            nécessité des transitions, reconstruction des relations, non-imposition des conclusions et démonstration
            catégorique.
          </p>
          <p>
            Aucune institution, aucun auteur et aucune tradition ne se soustraient à la discussion, à la critique
            documentaire ou à l’épreuve de cohérence. L’ancrage kémitique de la recherche ne dispense jamais de la
            contextualisation historique.
          </p>
        </BlocV16>
      </div>
    </section>
  );
}

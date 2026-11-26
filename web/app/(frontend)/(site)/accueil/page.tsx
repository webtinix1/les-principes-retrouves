import Link from "next/link";
import { BlocV16 } from "@/components/v16/bloc-v16";
import { getListe, getTextes } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";
import "./accueil.css";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("accueil");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/accueil" });
}

type Tome = {
  etiquette: string;
  designation: string;
  titre: string;
  texte: string;
  signature: string;
  bouton: string;
  lien: string;
};

/** L'Accueil — conforme au prototype maître V16 (section « page-accueil »). */
export default async function Accueil() {
  const [t, tomes] = await Promise.all([getTextes("accueil"), getListe<Tome>("accueil.tomes")]);
  return (
    <section className="page fade" id="page-accueil">
      <div className="fronton-bottom">
        <div className="wrap">
          <div className="eyebrow">{t["entree.eyebrow"]}</div>
          <p className="diptyque">{t["entree.diptyque"]}</p>
          <div className="hero-actions">
            <Link className="btn" href="/ouvrage">
              {t["entree.bouton_tome_i"]}
            </Link>
            <Link className="btn secondary" href="/ouvrage">
              {t["entree.bouton_tome_ii"]}
            </Link>
            <Link className="btn secondary" href="/institution">
              {t["entree.bouton_architecture"]}
            </Link>
          </div>
          <div className="fronton-date">
            {t["entree.signature_auteur"]}
            <br />
            {t["entree.signature_lieu"]}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <p className="lead">{t["introduction.lead"]}</p>

          <div className="band">
            <div className="tag">{t["diagnostic.tag"]}</div>
            <h3>{t["diagnostic.titre"]}</h3>
            <BlocV16 cle="accueil.diagnostic.corps">
              <p>
                Les Principes Retrouvés diagnostiquent une dynamique de dégradation : spécialisation → segmentation →
                fragmentation → désarticulation → perte de l’intelligibilité commune → désorientation → décomposition
                organique.
              </p>
              <p>
                La cascade entropique ne concerne pas seulement la connaissance. Elle peut affecter les institutions, les
                compétences, les mécanismes de décision, l’organisation de la Cité et, plus largement, toute organisation
                structurelle. Ses conséquences ultimes peuvent être le chaos — Isfet.
              </p>
              <p>
                La reconnaître, c’est rechercher les conditions d’une correction avant que la désorganisation et le chaos
                ne se consolident.
              </p>
            </BlocV16>
          </div>

          <h3>{t["ellipse.titre"]}</h3>
          <p>{t["ellipse.texte"]}</p>
          <div className="equation">{t["ellipse.equation"]}</div>
          <p>{t["ellipse.suite"]}</p>

          <h3>{t["rupture.titre"]}</h3>
          <BlocV16 cle="accueil.rupture.corps">
            <p>
              Ni l’Occident ni la science contemporaine ne constituent l’origine absolue de l’intelligibilité. Les
              Principes Retrouvés interrogent l’occidentalisation du savoir lorsqu’une trajectoire historique particulière
              est érigée en mesure exclusive de l’universel. La critique ne vise ni les sciences produites en Occident ni
              leurs chercheurs ; elle vise le monopole épistémique qui marginalise d’autres matrices intellectuelles et
              naturalise une généalogie particulière.
            </p>
            <p>
              Décoloniser le savoir ne consiste donc pas seulement à déplacer les lieux de production scientifique. Il
              faut aussi examiner les critères qui font reconnaître certaines connaissances comme universelles, tandis que
              d’autres sont reléguées ou rendues invisibles.
            </p>
          </BlocV16>

          <div className="card">
            <div className="tag">{t["socle.tag"]}</div>
            <h3>{t["socle.titre"]}</h3>
            <BlocV16 cle="accueil.socle.corps">
              <p>
                Les questions que le droit contemporain formule en termes d’ordre juste, de responsabilité fonctionnelle,
                de correction du tort et de restauration de la cohérence avaient déjà été pensées et pratiquement prises
                en charge dans la matrice kémitique de Maât. Les Principes Retrouvés entreprennent d’en restituer la
                portée principielle et les opérateurs, puis de les reconstruire dans le langage conceptuel contemporain,
                sans confondre les institutions anciennes avec les juridictions modernes.
              </p>
              <p>
                Maât constitue le socle principiel ; Σ en est la formalisation structurelle contemporaine. La pyramide
                canonique exprime l’Architecture Préalable d’Intelligibilité.
              </p>
            </BlocV16>
            <Link className="bouton-natif" href="/declaration">
              {t["socle.bouton"]}
            </Link>
          </div>

          <div className="card">
            <div className="tag">{t["science.tag"]}</div>
            <h3>{t["science.titre"]}</h3>
            <BlocV16 cle="accueil.science.corps">
              <p>
                La Science Métamoderne ne désigne pas une discipline supplémentaire. Elle travaille sur le réel à un
                niveau supérieur d’intelligibilité et prend en charge la pluralité des sciences, leurs objets, leurs
                méthodes, leurs résultats et leurs relations. Elle coordonne les connaissances différenciées et les
                réintègre dans une unité structurelle, sans fusionner les disciplines.
              </p>
              <p>
                Elle mobilise un ensemble d’instruments théoriques, conceptuels et formels : le Référentiel
                d’Intelligibilité (R), l’écart structurel Δ(R,K), le principe de Non-Perte, la Méthode M et le mouvement
                de reconstruction :
              </p>
            </BlocV16>
            <div className="equation">{t["science.equation_1"]}</div>
            <p>{t["science.mesure"]}</p>
            <div className="equation">{t["science.equation_2"]}</div>
            <Link className="bouton-natif" href="/note-epistemologique">
              {t["science.bouton"]}
            </Link>
          </div>

          <h3>{t["diptyque_fondateur.titre"]}</h3>
          <div className="grid">
            {tomes.map((tome, i) => (
              <article className="card" key={i}>
                <div className="tag">{tome.etiquette}</div>
                {tome.designation ? <p className="author-designation">{tome.designation}</p> : null}
                <h3>{tome.titre}</h3>
                <p>{tome.texte}</p>
                {tome.signature ? (
                  <p>
                    <strong>{tome.signature}</strong>
                  </p>
                ) : null}
                <Link className="bouton-natif" href={tome.lien || "/ouvrage"}>
                  {tome.bouton}
                </Link>
              </article>
            ))}
          </div>

          <div className="band">
            <h3>{t["transmission.titre"]}</h3>
            <BlocV16 cle="accueil.transmission.corps">
              <p>
                La transmission ne consiste pas à diffuser seulement des résultats ou des ouvrages. Elle consiste à
                transmettre la capacité de reconnaître les anomalies, de retrouver les relations, de reconstruire les
                principes et de soumettre les propositions à l’épreuve.
              </p>
              <p>
                Depuis Brazzaville, Les Principes Retrouvés entendent contribuer à la reconstruction de l’universel, sans
                substituer un monopole à un autre. L’universel n’a pas de centre géographique : il doit se démontrer par
                la nécessité logique de sa structure.
              </p>
            </BlocV16>
            <Link className="bouton-natif" href="/transmission">
              {t["transmission.bouton"]}
            </Link>
          </div>

          <div className="card">
            <div className="tag">{t["rencontre.tag"]}</div>
            <h3>{t["rencontre.titre"]}</h3>
            <p>{t["rencontre.texte"]}</p>
          </div>
        </div>
      </div>
      <div className="major-section">
        <h2>{t["livre.titre"]}</h2>
        <BlocV16 cle="accueil.livre.corps">
          <p>
            Les Principes Retrouvés ne se limitent pas à la juxtaposition de disciplines ni à l’accumulation indéfinie de
            résultats. L’ambition du Livre des livres, ou Livre encyclopédique universel, est de rechercher et de
            formaliser les conditions communes de leur intelligibilité.
          </p>
          <p>
            Cette unité ne procède pas d’une fusion des sciences. Les domaines physiques, chimiques, biologiques, minéraux
            et sociaux conservent la spécificité de leurs objets, de leurs méthodes et de leurs exigences de
            démonstration. La recherche porte sur les relations structurelles qui permettent de les rapporter à une
            intelligibilité commune.
          </p>
          <p>
            Le diptyque publié constitue le premier corpus démonstratif de cette ambition : le Tome I établit la théorie
            de l’intelligibilité ; le Tome II en confronte la portée dans le champ du droit constitutionnel. Le programme
            encyclopédique est plus vaste que ces deux ouvrages.
          </p>
        </BlocV16>
      </div>
      <div className="major-section">
        <h2>{t["brazzaville.titre"]}</h2>
        <BlocV16 cle="accueil.brazzaville.corps">
          <p>
            L’entreprise se déploie depuis Brazzaville, en République du Congo. Ce lieu n’est ni un simple repère
            biographique ni un nouveau centre exclusif de l’universel. Il manifeste la possibilité de produire une
            réflexion théorique autonome depuis un espace africain, de réexaminer les généalogies du savoir et de
            déplacer le lieu depuis lequel se formulent les questions fondamentales.
          </p>
          <p>
            La portée décoloniale de la démarche tient à ce déplacement et à la reconstruction critique des conditions de
            l’universalité. Elle ne substitue pas une prétention hégémonique à une autre : l’universel se démontre par la
            nécessité logique de sa structure.
          </p>
        </BlocV16>
      </div>
    </section>
  );
}

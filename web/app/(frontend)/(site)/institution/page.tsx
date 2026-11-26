import { BlocV16 } from "@/components/v16/bloc-v16";
import { getListe, getTextes } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("institution");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/institution" });
}

type CarteNiveau = { etiquette: string; titre: string; texte: string };

/** Institution — conforme au prototype maître V16 (section « page-institution »). */
export default async function Institution() {
  const [t, niveaux] = await Promise.all([
    getTextes("institution"),
    getListe<CarteNiveau>("institution.cartes_niveaux"),
  ]);
  return (
    <section className="page fade" id="page-institution">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["entete.eyebrow"]}</div>
          <h1>{t["entete.titre"]}</h1>
          <p>{t["entete.intro"]}</p>
        </div>
      </div>
      <p className="author-designation">{t["entete.auteur"]}</p>
      <div className="maat-emblem-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="maat-emblem maat-emblem--compact"
          src="/v16/embleme-maat.webp"
          alt={t["entete.embleme_alt"]}
          width={1600}
          height={892}
          loading="lazy"
        />
      </div>
      <div className="content">
        <div className="wrap">
          <div className="band">
            <div className="tag">{t["horizon.tag"]}</div>
            <h2>{t["horizon.titre"]}</h2>
            <BlocV16 cle="institution.horizon.corps">
              <p>
                La Science Métamoderne ne désigne pas une discipline supplémentaire venant s’ajouter aux sciences
                constituées. Elle travaille sur le réel à un niveau supérieur d’intelligibilité et prend en charge la
                pluralité des sciences, leurs objets, leurs méthodes, leurs résultats et leurs relations.
              </p>
              <p>
                Elle coordonne les connaissances différenciées et les réintègre dans l’unité structurelle du réel et de la
                connaissance, sans fusionner les disciplines ni abolir leurs méthodes propres. La réintégration constitue
                son opération propre.
              </p>
            </BlocV16>
            <div className="equation">{t["horizon.equation"]}</div>
            <p>{t["horizon.suite"]}</p>
          </div>

          <h3>{t["rupture.titre"]}</h3>
          <BlocV16 cle="institution.rupture.corps">
            <p>
              Les Principes Retrouvés contestent le monopole qui ferait d’une généalogie historique particulière la mesure
              exclusive de l’universel. Cette rupture ne vise ni l’Occident comme civilisation ni les sciences produites
              dans les espaces occidentaux. Elle vise l’occidentalisation exclusive du savoir et les critères de
              légitimation qui marginalisent d’autres matrices intellectuelles.
            </p>
            <p>
              Depuis Brazzaville, le programme entend contribuer à la reconstruction de conditions communes
              d’intelligibilité, ouvertes à l’examen et à la discussion.
            </p>
          </BlocV16>

          <p className="lead">{t["programme.lead"]}</p>
          <div className="status-key">{t["programme.statuts"]}</div>

          <div className="band">
            <h3>{t["maat_droit.titre"]}</h3>
            <BlocV16 cle="institution.maat_droit.corps">
              <p>
                Les questions du droit contemporain relatives à l’ordre juste, à la responsabilité attachée à la fonction,
                à la correction du tort et à la restauration de l’ordre avaient déjà été conceptualisées et pratiquement
                prises en charge dans la matrice kémitique de Maât. Le Tome II entreprend d’en reconstruire les
                opérateurs et d’en éprouver la portée dans le champ constitutionnel contemporain.
              </p>
              <p>
                Il ne s’agit pas d’assimiler les institutions anciennes aux juridictions modernes, mais de restituer une
                matrice principielle et de reconstruire ses fonctions dans le langage juridique actuel.
              </p>
            </BlocV16>
          </div>

          <p>{t["science.texte"]}</p>
          <h3>{t["quatre_niveaux.titre"]}</h3>
          <div className="grid">
            {niveaux.map((n, i) => (
              <article className="card" key={i}>
                <div className="tag">{n.etiquette}</div>
                <h3>{n.titre}</h3>
                <p>{n.texte}</p>
              </article>
            ))}
          </div>

          <h3>{t["prolongements.titre"]}</h3>
          <p>{t["prolongements.texte"]}</p>
          <div className="band">
            <BlocV16 cle="institution.prolongements.chantier">
              <strong>Chantier prospectif distinct :</strong> le principe vital universel et le dépassement du « mythe de
              l’inanimé » relèvent d’un ouvrage et d’un développement spécifiques. Ils appartiennent à l’horizon du
              programme, mais ne doivent pas être présentés comme des démonstrations déjà contenues dans les Tomes I et
              II.
            </BlocV16>
          </div>

          <h3>{t["brazzaville.titre"]}</h3>
          <p>{t["brazzaville.texte"]}</p>
          <p className="note">{t["brazzaville.note"]}</p>
        </div>
      </div>
      <div className="major-section">
        <h2>{t["ecole.titre"]}</h2>
        <BlocV16 cle="institution.ecole.corps">
          <p>
            L’École de pensée de Brazzaville constitue un espace de recherche, de structuration et de transmission
            consacré à l’intelligibilité. Sa vocation première est de transmettre l’architecture qui permet de reconnaître,
            de relier et de reconstruire les savoirs ; elle ne se réduit pas à l’enseignement d’un corpus supplémentaire
            au sens classique.
          </p>
          <p>
            L’Organon désigne l’instrument intellectuel et méthodologique de cette reconstruction. L’École en organise la
            transmission, la discussion et la mise à l’épreuve. La Cité du Savoir en constitue le milieu documentaire et
            institutionnel ; la Nouvelle Thèbes en exprime l’horizon architectural.
          </p>
          <p>
            L’Institut, lorsqu’il est présenté comme infrastructure, organise les recherches, publications, archives,
            rencontres et transmissions. Il conserve et diffuse le corpus ; il ne crée pas la vérité des propositions et ne
            revendique aucun monopole de contrôle ou de certification.
          </p>
        </BlocV16>
      </div>
      <div className="major-section">
        <h2>{t["corpus.titre"]}</h2>
        <BlocV16 cle="institution.corpus.corps">
          <p>
            Les Tomes I et II constituent le premier corpus démonstratif publié. Le programme de recherche est plus vaste
            : il peut accueillir des hypothèses, des recherches en cours et des prolongements, à condition que leur statut
            soit explicitement indiqué.
          </p>
          <p>
            La Science Métamoderne est présentée comme une science de l’unité et un Organon de réintégration des
            connaissances différenciées. Ses développements doivent demeurer soumis à la discussion et à l’épreuve ; ils
            ne sont pas tous réputés démontrés par la seule publication du diptyque.
          </p>
        </BlocV16>
      </div>
    </section>
  );
}

import { BlocProseV16 } from "@/components/v16/bloc-prose-v16";
import { getTextes } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("manifeste");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/manifeste" });
}

/** Manifeste intellectuel — conforme au prototype maître V16. */
export default async function ManifestePage() {
  const t = await getTextes("manifeste");
  return (
    <section className="page fade" id="page-manifeste">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["entete.surtitre"]}</div>
          <h1>{t["entete.titre"]}</h1>
          <p>{t["entete.chapo"]}</p>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <BlocProseV16 cle="manifeste.introduction" classeSurcharge="lead">
            <p className="lead">
              Les Principes Retrouvés constituent une rupture épistémologique contre l’occidentalisation exclusive du
              savoir. Ni l’Occident ni la science contemporaine ne constituent l’origine absolue de l’intelligibilité.
              La question n’est pas de récuser les sciences modernes, mais de contester le monopole qui érigerait une
              trajectoire historique particulière en mesure exclusive de l’universel.
            </p>
          </BlocProseV16>

          <h3>{t["declin.titre"]}</h3>
          <BlocProseV16 cle="manifeste.declin.corps">
            <p>
              Lorsque la spécialisation ne s’accompagne plus d’une reconstruction des relations, la fragmentation peut
              devenir désarticulation, puis perte de l’intelligibilité commune. Les Principes Retrouvés diagnostiquent
              cette dynamique de dégradation organique ou sociale : spécialisation → segmentation → fragmentation →
              désarticulation → désorientation → décomposition, dont les conséquences ultimes peuvent être le chaos —
              Isfet.
            </p>
            <p>
              Ce diagnostic porte sur une dynamique et ses conséquences possibles ; il ne présente pas le chaos comme
              une fatalité déjà accomplie. Il appelle à reconnaître les écarts et à rechercher les conditions de
              correction avant leur consolidation.
            </p>
          </BlocProseV16>

          <h3>{t["formalisation.titre"]}</h3>
          <BlocProseV16 cle="manifeste.formalisation.intro">
            <p>
              La formalisation est le terme d’une genèse articulée, non son origine absolue. Sa possibilité présuppose
              des opérations antérieures :
            </p>
          </BlocProseV16>
          <div className="equation">{t["formalisation.formule"]}</div>
          <BlocProseV16 cle="manifeste.formalisation.suite">
            <p>
              L’enfant voit avant de nommer, saisit avant de décrire, distingue avant de définir, reconnaît avant de
              formaliser. Voir → saisir → distinguer → reconnaître → nommer. Une équation exprime une relation ; elle
              ne crée pas l’ordre dont elle procède.
            </p>
          </BlocProseV16>

          <h3>{t["ellipse.titre"]}</h3>
          <BlocProseV16 cle="manifeste.ellipse.corps">
            <p>
              L’ellipse méthodologique désigne l’effacement des médiations par lesquelles le phénomène est observé, la
              relation reconnue, l’organisation pensée, puis la forme déterminée ou formalisée. Cette genèse est
              ensuite oubliée, comme si la formalisation était le point de départ.
            </p>
            <p>
              Qui détermine les conditions d’intelligibilité à partir desquelles les connaissances sont constituées,
              évaluées et reconnues ? Décoloniser le savoir ne consiste pas seulement à déplacer les lieux de
              production scientifique. Il faut examiner les critères qui font reconnaître certaines connaissances comme
              universelles, tandis que d’autres sont marginalisées.
            </p>
          </BlocProseV16>

          <h3>{t["brazzaville.titre"]}</h3>
          <BlocProseV16 cle="manifeste.brazzaville.corps">
            <p>
              Depuis Brazzaville, Les Principes Retrouvés entendent rechercher et formaliser les conditions communes
              d’intelligibilité, sans substituer un monopole à un autre ni réduire les sciences à un langage unique.
              L’universel n’a pas de centre géographique. Il doit se démontrer par la nécessité logique de sa
              structure.
            </p>
            <p>
              La Science Métamoderne se veut une arme épistémologique contre l’occidentalisation du savoir : non
              contre une civilisation ni contre les sciences produites en Occident, mais contre le monopole qui
              érigerait une trajectoire particulière en mesure exclusive de l’universel.
            </p>
          </BlocProseV16>

          <h3>{t["maat.titre"]}</h3>
          <BlocProseV16 cle="manifeste.maat.corps">
            <p>
              Kemet constitue le point de départ intellectuel majeur de cette recherche. Maât désigne le principe
              d’ordre juste, de vérité, de rectitude et de cohérence structurelle. Σ en constitue la formalisation
              structurelle contemporaine. Cette articulation n’est ni une simple référence culturelle ni une identité
              rétrospective entre les institutions anciennes et les catégories modernes : elle fonde une
              reconstruction théorique dont les sources et les médiations doivent être établies.
            </p>
          </BlocProseV16>

          <h3>{t["metamoderne.titre"]}</h3>
          <BlocProseV16 cle="manifeste.metamoderne.intro">
            <p>
              La Science Métamoderne ne désigne pas une discipline supplémentaire. Elle travaille sur le réel à un
              niveau supérieur d’intelligibilité et prend en charge la pluralité des sciences, leurs objets, leurs
              méthodes, leurs résultats et leurs relations. Elle coordonne les connaissances différenciées et les
              réintègre dans une unité structurelle, sans fusionner les disciplines.
            </p>
            <p>
              Elle mobilise le Référentiel d’Intelligibilité (R), l’écart structurel Δ(R,K), le principe de
              Non-Perte et le mouvement reconstructif :
            </p>
          </BlocProseV16>
          <div className="equation">{t["metamoderne.formule"]}</div>
          <BlocProseV16 cle="manifeste.metamoderne.suite">
            <p>
              La mesure structurelle porte sur la cohérence des manifestations relativement à un référentiel
              explicite ; elle ne prétend pas mesurer directement le principe lui-même.
            </p>
          </BlocProseV16>

          <h3>{t["proactivite.titre"]}</h3>
          <BlocProseV16 cle="manifeste.proactivite.corps">
            <p>
              Le Tome II examine comment les questions du droit contemporain — clôture procédurale, effectivité
              constitutionnelle, chose jugée, correction et responsabilité juridictionnelle — peuvent être
              reconstruites à partir de la matrice kémitique de Maât. Il développe des catégories propres : Fiction de
              clôture, Syllogisme Dégradé, Syllogisme Réel, chose jugée structurelle et Impérium de la rectification.
            </p>
            <p>
              La nécessité de répondre à une anomalie ne crée jamais, à elle seule, une compétence juridictionnelle.
              La proactivité judiciaire demeure encadrée par le droit applicable, le contradictoire, la motivation, la
              proportionnalité et la non-substitution.
            </p>
          </BlocProseV16>

          <h3>{t["examen.titre"]}</h3>
          <BlocProseV16 cle="manifeste.examen.corps">
            <p>
              Les Principes Retrouvés ne demandent pas une adhésion préalable. Ils proposent une reconstruction de
              l’intelligibilité qui doit être discutée, confrontée aux sources et éprouvée. La force de la rupture ne
              dispense pas de démontrer les propositions qui la composent.
            </p>
          </BlocProseV16>
        </div>
      </div>
      <div className="major-section">
        <h2>{t["universel.titre"]}</h2>
        <BlocProseV16 cle="manifeste.universel.corps">
          <p>
            L’histoire dominante des sciences a souvent présenté une expérience historique particulière comme la norme
            de l’organisation universelle du savoir. Les Principes Retrouvés proposent de réexaminer cette généalogie :
            non pour inverser une hiérarchie et installer une autre exclusivité, mais pour rouvrir les conditions de
            formulation et de démonstration de l’universel.
          </p>
          <p>
            Brazzaville est le lieu depuis lequel cette reconstruction est énoncée et travaillée. Cet ancrage africain
            affirme la possibilité d’une production théorique autonome, sans faire de la géographie un critère de
            vérité. L’universel n’a pas de centre géographique ; il se démontre par la nécessité logique de sa
            structure.
          </p>
          <p>
            La matrice kémitique de Maât est mobilisée à partir de matériaux historiques, lexicaux et institutionnels
            contextualisés. Les catégories contemporaines sont reconstruites avec prudence : elles ne sont pas
            projetées rétrospectivement sur les institutions anciennes.
          </p>
        </BlocProseV16>
      </div>
    </section>
  );
}

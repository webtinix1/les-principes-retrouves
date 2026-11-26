import { BlocProseV16 } from "@/components/v16/bloc-prose-v16";
import { getTextes } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("declaration");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/declaration" });
}

/** Déclaration sur Maât — conforme au prototype maître V16. */
export default async function DeclarationPage() {
  const t = await getTextes("declaration");
  return (
    <section className="page fade" id="page-declaration">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["entete.surtitre"]}</div>
          <h1>{t["entete.titre"]}</h1>
          <p>{t["entete.chapo"]}</p>
        </div>
      </div>
      <p className="author-designation">{t["auteur"]}</p>
      <div className="maat-emblem-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="maat-emblem maat-emblem--compact"
          src="/v16/embleme-maat.webp"
          alt={t["embleme_alt"]}
          width={1600}
          height={892}
          loading="lazy"
        />
      </div>
      <div className="content">
        <div className="wrap">
          <BlocProseV16 cle="declaration.introduction" classeSurcharge="lead">
            <p className="lead">
              La présente déclaration expose la place de Maât dans l’architecture intellectuelle des Principes
              Retrouvés. Maât n’y est ni une référence culturelle décorative, ni un simple équivalent ancien de la
              justice contemporaine, ni une notion que l’on pourrait réduire à une valeur morale isolée. Elle est
              mobilisée comme principe d’intelligibilité au niveau principiel, à partir de la matrice kémitique et dans
              le cadre d’une reconstruction théorique contemporaine.
            </p>
          </BlocProseV16>

          <h3>{t["kemet.titre"]}</h3>
          <BlocProseV16 cle="declaration.kemet.corps">
            <p>
              La recherche prend Kemet comme point de départ intellectuel majeur. Elle examine les matériaux
              historiques, lexicaux et institutionnels relatifs à Maât, en tenant compte de leurs contextes et sans
              leur attribuer rétrospectivement les catégories du droit ou de la science contemporains.
            </p>
            <p>
              Dans cette reconstruction, Maât renvoie à l’ordre, à la vérité, à la justice, à la rectitude et à
              l’équilibre. Ces dimensions ne sont pas juxtaposées comme une simple liste de valeurs : elles permettent
              d’interroger la cohérence d’un ordre et les conditions de sa préservation ou de sa restauration.
            </p>
          </BlocProseV16>

          <h3>{t["sigma.titre"]}</h3>
          <BlocProseV16 cle="declaration.sigma.intro">
            <p>
              Maât désigne le principe d’intelligibilité au niveau principiel. Σ en constitue la formalisation
              structurelle contemporaine comme Substratum Commun. Cette distinction ne pose pas deux réalités
              séparées ; elle distingue le principe de sa formalisation dans l’architecture théorique de l’ouvrage.
            </p>
          </BlocProseV16>
          <div className="thesis">{t["sigma.these"]}</div>
          <BlocProseV16 cle="declaration.sigma.suite">
            <p>
              La pyramide de Maât–Σ exprime l’Architecture Préalable d’Intelligibilité. Elle ne doit être confondue ni
              avec le Cycle de Reconstitution Génétique de l’Intelligibilité, ni avec la Méthode M, qui intervient
              dans le mouvement reconstructif.
            </p>
          </BlocProseV16>

          <h3>{t["restauration.titre"]}</h3>
          <BlocProseV16 cle="declaration.restauration.corps">
            <p>
              La recherche examine les rapports entre l’ordre juste, la responsabilité attachée à une fonction et la
              possibilité de redresser un ordre compromis. Elle s’appuie sur des matériaux kémitiques identifiables,
              tout en distinguant constamment les données historiques des catégories reconstruites pour les besoins de
              l’analyse contemporaine.
            </p>
            <p>
              Cette précaution interdit deux raccourcis : présenter les institutions de Kemet comme des juridictions
              constitutionnelles modernes, ou prétendre que les concepts actuels seraient simplement déjà formulés
              dans les textes anciens. La relation est une reconstruction fonctionnelle et doctrinale, non une
              identité institutionnelle.
            </p>
          </BlocProseV16>

          <h3>{t["decolonisation.titre"]}</h3>
          <BlocProseV16 cle="declaration.decolonisation.corps">
            <p>
              Restituer à Maât sa portée principielle participe à la critique de l’européanisation exclusive de la
              pensée scientifique. Il ne s’agit pas d’inverser une hiérarchie pour en installer une autre, mais de
              rouvrir la généalogie de l’intelligibilité, de rendre examinables les matrices historiques du savoir et
              de contester qu’une seule trajectoire puisse épuiser l’universel.
            </p>
            <p>
              Cette démarche refuse le relativisme : elle ne renonce ni à la vérité ni à l’unité de la connaissance.
              Elle soutient que l’universalité doit être reconstruite et éprouvée, et non confondue avec la domination
              historique d’une tradition particulière.
            </p>
          </BlocProseV16>

          <h3>{t["examen.titre"]}</h3>
          <BlocProseV16 cle="declaration.examen.corps">
            <p>
              La place accordée à Maât dans Les Principes Retrouvés constitue une proposition théorique qui doit être
              examinée à partir des sources, de la cohérence de son articulation avec Σ, de sa capacité explicative et
              de ses conséquences méthodologiques. Elle n’appelle aucune adhésion préalable et ne se soustrait ni à la
              critique historique ni à la discussion scientifique.
            </p>
          </BlocProseV16>
          <div className="band">
            <strong>{t["examen.encadre"]}</strong>
          </div>

          <h3>{t["desarticulation.titre"]}</h3>
          <BlocProseV16 cle="declaration.desarticulation.corps">
            <p>
              La recherche associe à la matrice de Maât un diagnostic contemporain : une organisation peut se
              désarticuler lorsque la différenciation de ses parties n’est plus accompagnée de la reconstruction de
              leurs relations. La cascade entropique nomme cette dynamique possible. Elle ne constitue pas une
              fatalité ni une loi physique transposée sans démonstration ; elle sert à interroger les conditions de
              cohérence et de restauration d’un ensemble.
            </p>
            <p>
              Dans le domaine de la connaissance, cette question rejoint celle de l’ellipse méthodologique : la
              formalisation d’un résultat ne doit pas faire oublier les médiations qui rendent sa genèse intelligible.
              La restauration suppose donc de reconnaître les écarts, de restituer les relations et de justifier les
              opérations de reconstruction.
            </p>
          </BlocProseV16>

          <h3>{t["demonstration.titre"]}</h3>
          <BlocProseV16 cle="declaration.demonstration.corps">
            <p>
              La portée universelle revendiquée par Les Principes Retrouvés ne procède ni de leur lieu d’énonciation
              ni de leur ancrage kémitique pris isolément. Elle dépend de la cohérence de l’architecture proposée, de
              la qualité des sources mobilisées, de la précision des médiations reconstruites et de la capacité des
              propositions à soutenir l’examen critique.
            </p>
            <p>
              La transmission de cette œuvre doit préserver cette exigence : ne pas neutraliser la rupture
              intellectuelle, ne pas transformer l’ambition en proclamation, et ne pas présenter comme acquis ce qui
              demeure à éprouver. L’ouverture à la critique est une condition de la prétention à l’universel.
            </p>
          </BlocProseV16>

          <h3>{t["droit.titre"]}</h3>
          <BlocProseV16 cle="declaration.droit.corps">
            <p>
              La recherche soutient que des questions aujourd’hui formulées par le droit contemporain — ordre juste,
              responsabilité attachée à la fonction, correction du tort, restauration de l’ordre lésé et prévention de
              la dégradation — avaient déjà été conceptualisées et pratiquement prises en charge dans la matrice
              kémitique de Maât. L’enjeu n’est pas d’identifier les institutions anciennes aux juridictions modernes,
              mais de restituer les opérateurs de cette matrice et de reconstruire leur portée dans les catégories
              juridiques contemporaines.
            </p>
            <p>
              Dans le laboratoire juridique, cette reconstruction mobilise notamment Ir Maât, Oupet, Serekh et Isfet.
              Ces termes sont présentés comme des opérateurs de la reconstruction doctrinale et doivent être examinés
              à partir de leurs contextes historiques propres.
            </p>
          </BlocProseV16>
          <h3>{t["reintegration.titre"]}</h3>
          <BlocProseV16 cle="declaration.reintegration.corps">
            <p>
              La Science Métamoderne prend en charge la pluralité des sciences à un niveau supérieur d’intelligibilité.
              Elle ne les fusionne pas : elle coordonne leurs connaissances différenciées et les réintègre dans une
              unité structurelle. Le Référentiel d’Intelligibilité (R), l’écart Δ(R,K), la Non-Perte et la Méthode M
              constituent les instruments de cette ambition reconstructive.
            </p>
          </BlocProseV16>
          <h3>{t["transmission.titre"]}</h3>
          <BlocProseV16 cle="declaration.transmission.corps">
            <p>
              La vocation de l’œuvre est de transmettre la capacité de reconstruire : retrouver les relations,
              restituer les médiations, identifier les principes et éprouver les propositions. L’ancrage à Brazzaville
              rend visible une provenance africaine de la production théorique sans faire de la géographie un critère
              de vérité.
            </p>
          </BlocProseV16>
        </div>
      </div>
      <div className="major-section">
        <h2>{t["universel.titre"]}</h2>
        <BlocProseV16 cle="declaration.universel.corps">
          <p>
            Le projet prend appui sur la matrice kémitique de Maât tout en distinguant les sources historiques de leur
            reconstruction contemporaine. Maât désigne le principe d’intelligibilité au niveau principiel ; Σ en
            constitue la formalisation structurelle contemporaine comme Substratum Commun.
          </p>
          <p>
            L’ancrage à Brazzaville affirme la possibilité d’une production théorique depuis un espace africain, hors
            de toute prétention à un monopole géographique de l’universel. Il s’agit de réexaminer les généalogies du
            savoir et de contribuer à la reconstruction de conditions communes d’intelligibilité.
          </p>
          <p>
            L’ambition du Livre des livres demeure ouverte : elle se mesure à la capacité de relier des connaissances
            différenciées sans les confondre, et à la possibilité de soumettre chaque proposition à la critique et à la
            démonstration.
          </p>
        </BlocProseV16>
      </div>
    </section>
  );
}

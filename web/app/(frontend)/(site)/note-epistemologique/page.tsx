import { BlocProseV16 } from "@/components/v16/bloc-prose-v16";
import { getListe, getTextes } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";
import "./note.css";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("note_epistemologique");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/note-epistemologique" });
}

/** Note épistémologique — conforme au prototype maître V16. */
export default async function NoteEpistemologiquePage() {
  const [t, principes] = await Promise.all([
    getTextes("note_epistemologique"),
    getListe<{ texte: string }>("note_epistemologique.canon_sept_principes"),
  ]);
  return (
    <section className="page fade" id="page-note">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["entete.surtitre"]}</div>
          <h1>{t["entete.titre"]}</h1>
          <p>{t["entete.chapo"]}</p>
        </div>
      </div>
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
          <BlocProseV16 cle="note_epistemologique.introduction" classeSurcharge="lead">
            <p className="lead">
              Le point de départ n’est pas une formule isolée ni une méthode appliquée après coup. C’est l’
              <strong>Architecture Préalable d’Intelligibilité</strong> : l’ordre principiel qui rend possibles la
              manifestation, la différenciation, la relation et la connaissance.
            </p>
          </BlocProseV16>

          <h2 className="titre-h3">{t["architecture.titre"]}</h2>
          <BlocProseV16 cle="note_epistemologique.architecture.corps">
            <p>
              L’Architecture Préalable ne se constitue pas au moment de la découverte. Elle est la structure profonde
              qui oriente le regard, rend certaines anomalies perceptibles et rend la question scientifique pensable.
              L’hypothèse est ponctuelle ; l’Architecture Préalable est cumulative. L’hypothèse répond à une question ;
              l’Architecture Préalable rend cette question possible.
            </p>
          </BlocProseV16>
          <div className="band">{t["architecture.encadre"]}</div>

          <h2 className="titre-h3">{t["ordre.titre"]}</h2>
          <div className="equation">{t["ordre.formule"]}</div>
          <BlocProseV16 cle="note_epistemologique.ordre.corps">
            <p>
              Σ désigne l’unité structurelle principielle ; π₁, la différenciation ; π₂, la corrélation ; V, le Voile
              comme condition de manifestation ; F, le Filtrage comme sélection ; S, les manifestations ; K, le savoir
              constitué. Le Voile et le Filtrage ne sont pas interchangeables : le Voile conditionne la manifestation ;
              le Filtrage sélectionne et organise les éléments manifestés.
            </p>
          </BlocProseV16>

          <h2 className="titre-h3">{t["crgi.titre"]}</h2>
          <BlocProseV16 cle="note_epistemologique.crgi.intro">
            <p>
              La pyramide expose l’Architecture Préalable. Le Cycle de Reconstitution Génétique de l’Intelligibilité
              (CRGI) remplit une autre fonction : il restitue les opérations par lesquelles une connaissance se
              constitue.
            </p>
          </BlocProseV16>
          <div className="equation">{t["crgi.formule"]}</div>
          <BlocProseV16 cle="note_epistemologique.crgi.suite">
            <p>
              La formalisation est un moment de cette genèse, non son point de départ. La symbolisation conserve sa
              place propre. Le cycle génétique ne doit pas être confondu avec l’architecture ontologique de la
              pyramide.
            </p>
          </BlocProseV16>

          <h2 className="titre-h3">{t["reconstruction.titre"]}</h2>
          <div className="thesis">{t["reconstruction.these"]}</div>
          <BlocProseV16 cle="note_epistemologique.reconstruction.corps">
            <p>
              La Méthode M travaille à partir du savoir disponible et de ses fragments pour reconstruire les relations
              et les principes devenus obscurcis. Le principe de Non-Perte n’est pas une promesse de récupération
              immédiate ou infaillible : dispersion ne signifie pas annihilation ; inaccessibilité ne signifie pas
              inexistence.
            </p>
          </BlocProseV16>
          <div className="equation">{t["reconstruction.formule"]}</div>
          <BlocProseV16 cle="note_epistemologique.reconstruction.suite">
            <p>
              K est le savoir constitué ; M organise la reconstruction ; K′ désigne la connaissance réorganisée ; Σ
              indique la direction de la remontée vers l’intelligibilité principielle.
            </p>
          </BlocProseV16>

          <h2 className="titre-h3">{t["metrologie.titre"]}</h2>
          <div className="manifesto-banner">
            <h2 className="manifesto-title">{t["metrologie.bandeau_titre"]}</h2>
            <div className="manifesto-line">{t["metrologie.bandeau_ligne"]}</div>
          </div>
          <BlocProseV16 cle="note_epistemologique.metrologie.corps">
            <p>
              La rupture ne signifie ni la disparition des sciences expérimentales ni la négation de la puissance de
              leurs instruments. La mesure instrumentale demeure pleinement opératoire dans son domaine ; elle cesse
              d’être érigée en frontière universelle de la mesurabilité. La question n’est plus seulement : quelle
              quantité l’instrument permet-il de relever ? Elle devient aussi : quelle grandeur structurelle peut être
              déterminée relativement à un référentiel explicite ?
            </p>
          </BlocProseV16>
          <div className="equation">{t["metrologie.formule"]}</div>
          <BlocProseV16 cle="note_epistemologique.metrologie.suite">
            <p>
              La mesure structurelle porte sur la cohérence des manifestations relativement à un Référentiel
              d’Intelligibilité explicite. Elle ne prétend pas mesurer directement le principe lui-même. Elle examine
              la fidélité, les écarts et les insuffisances structurelles des manifestations par rapport aux conditions
              d’intelligibilité définies par le référentiel.
            </p>
          </BlocProseV16>

          <h2 className="titre-h3">{t["mecanisme.titre"]}</h2>
          <div className="equation">{t["mecanisme.formule"]}</div>
          <BlocProseV16 cle="note_epistemologique.mecanisme.corps">
            <p>
              <strong>A</strong> désigne l’Architecture Préalable ; <strong>R</strong>, le Référentiel
              d’Intelligibilité ; <strong>K</strong>, l’état du savoir disponible ; <strong>Δ(R,K)</strong>, l’écart
              structurel entre ce savoir et les conditions d’intelligibilité formulées par le référentiel ;{" "}
              <strong>M</strong>, la Méthode de reconstruction ; <strong>K′</strong>, le savoir reconstruit.
            </p>
            <p>
              R ne se confond pas avec Σ et ne mesure pas directement le principe. Il constitue une projection
              opératoire de l’Architecture dans l’exercice de la recherche. Ses critères, ses opérations et sa
              prétention à l’universalité doivent eux-mêmes pouvoir être explicités, justifiés et discutés. Toute
              réalité non observable n’est pas automatiquement mesurable.
            </p>
          </BlocProseV16>
          <div className="quote">{t["mecanisme.citation"]}</div>

          <h2 className="titre-h3">{t["organon.titre"]}</h2>
          <BlocProseV16 cle="note_epistemologique.organon.corps">
            <p>
              La Science Métamoderne ne désigne pas une discipline supplémentaire venant s’ajouter aux sciences
              constituées. Elle coordonne leurs connaissances à un niveau supérieur d’intelligibilité, sans fusionner
              les disciplines, abolir leurs objets particuliers ni réduire leur autonomie. M reconstruit ; l’Organon
              organise l’unité méthodologique ; la Science Métamoderne en déploie l’architecture générale.
            </p>
          </BlocProseV16>
          <div className="band">
            <strong>{t["organon.encadre"]}</strong>
          </div>
          <p className="note">{t["organon.note"]}</p>

          <h2 className="titre-h3">{t["cascade.titre"]}</h2>
          <BlocProseV16 cle="note_epistemologique.cascade.intro">
            <p>
              La cascade entropique désigne la dynamique par laquelle la différenciation des parties, lorsqu’elle
              n’est plus accompagnée d’un travail de réintégration, peut produire une perte progressive
              d’intelligibilité commune. Elle peut être décrite par la séquence :
            </p>
          </BlocProseV16>
          <div className="equation">{t["cascade.formule"]}</div>
          <BlocProseV16 cle="note_epistemologique.cascade.suite">
            <p>
              Cette séquence ne transforme pas une analogie en loi physique et ne signifie pas que toute
              spécialisation conduit nécessairement au chaos. Elle constitue un schème diagnostique : elle permet
              d’identifier les médiations qui se défont et de rechercher les conditions d’une reconstruction. Dans le
              domaine de la connaissance, elle attire l’attention sur l’écart entre multiplication des résultats et
              capacité de les réintégrer dans une intelligibilité commune.
            </p>
          </BlocProseV16>

          <h2 className="titre-h3">{t["ellipse.titre"]}</h2>
          <BlocProseV16 cle="note_epistemologique.ellipse.corps">
            <p>
              L’ellipse méthodologique apparaît lorsque le raisonnement passe du phénomène à la formalisation en
              comprimant ou en occultant les opérations qui rendent ce passage intelligible. Le CRGI répond à cette
              difficulté en restituant la séquence des opérations : saisie de la relation, interprétation,
              détermination et symbolisation précèdent la formalisation dans la genèse exposée.
            </p>
            <p>
              La critique ne porte pas sur l’usage de l’équation ni sur la puissance des instruments. Elle porte sur
              la prétention éventuelle à faire de la formalisation le point de départ absolu de toute connaissance. Le
              résultat formalisé doit être rapporté à sa genèse, à son référentiel et aux opérations qui l’ont rendu
              possible.
            </p>
          </BlocProseV16>

          <h2 className="titre-h3">{t["crise.titre"]}</h2>
          <BlocProseV16 cle="note_epistemologique.crise.corps">
            <p>
              La cascade entropique formule le risque de désarticulation ; l’ellipse méthodologique identifie l’une
              des formes possibles de cette désarticulation dans la production du savoir ; l’Architecture Préalable,
              le CRGI et la Méthode M constituent des registres distincts de la reconstruction proposée. Leur
              articulation doit être démontrée et ne peut être présumée par la seule proximité des termes.
            </p>
          </BlocProseV16>

          <h2 className="titre-h3">{t["unite.titre"]}</h2>
          <BlocProseV16 cle="note_epistemologique.unite.corps">
            <p>
              La Science Métamoderne ne désigne pas une discipline supplémentaire. Elle travaille sur le réel à un
              niveau supérieur d’intelligibilité et prend en charge la pluralité des sciences, leurs objets, leurs
              méthodes, leurs résultats et leurs relations. Elle coordonne les connaissances différenciées et les
              réintègre dans une unité structurelle, sans fusionner les disciplines.
            </p>
            <p>
              Elle ne se substitue donc pas aux sciences constituées. Elle examine les conditions communes qui
              permettent de rapporter leurs résultats à une intelligibilité structurelle et de comprendre leurs
              relations.
            </p>
          </BlocProseV16>
          <div className="equation">{t["unite.formule"]}</div>
          <BlocProseV16 cle="note_epistemologique.unite.suite">
            <p>
              Le Référentiel d’Intelligibilité (R) examine la cohérence du savoir constitué (K). L’écart Δ(R,K) révèle
              une insuffisance qui appelle examen et reconstruction. Le principe de Non-Perte commande de rechercher
              les principes dont les traces subsistent dans les savoirs fragmentés. Le mouvement reconstructif
              s’écrit :
            </p>
          </BlocProseV16>
          <div className="equation">{t["unite.formule_2"]}</div>

          <div className="band">
            <h3>{t["acte_deces.titre"]}</h3>
            <BlocProseV16 cle="note_epistemologique.acte_deces.corps">
              <p>
                Une grandeur doit-elle nécessairement être palpable, observable ou directement quantifiable par un
                instrument pour relever de la science ?
              </p>
              <p>
                Il ne s’agit pas d’abolir les sciences expérimentales, mais de récuser la prétention de leur régime de
                mesure à épuiser toutes les possibilités de détermination rationnelle.
              </p>
              <p>
                <strong>Une grandeur n’est pas nécessairement une quantité.</strong>
              </p>
            </BlocProseV16>
          </div>
          <h2 className="titre-h3">{t["grandeur.titre"]}</h2>
          <BlocProseV16 cle="note_epistemologique.grandeur.corps">
            <p>
              La mesure instrumentale demeure pleinement opératoire dans son domaine. La rupture consiste à récuser la
              prétention de son régime à épuiser toutes les possibilités de détermination rationnelle. Une grandeur
              structurelle peut être examinée relativement à un référentiel explicite, sans prétendre mesurer
              directement le principe lui-même.
            </p>
            <p>
              Cette exigence s’applique également au Référentiel d’Intelligibilité : ses critères, ses opérations et
              sa prétention à l’universalité doivent eux-mêmes être explicités, justifiés et discutés. Aucun cadre
              théorique ne saurait s’exempter de l’examen qu’il applique aux autres.
            </p>
          </BlocProseV16>
        </div>
      </div>
      <div className="major-section">
        <h2>{t["canon_sept.titre"]}</h2>
        <BlocProseV16 cle="note_epistemologique.canon_sept.intro">
          <p>
            Le Canon formalise le protocole de remontée qui conduit du monde observable vers l’Architecture Préalable
            d’Intelligibilité. Il ne constitue pas une recette mécanique : il expose les exigences de la découverte et
            de la reconstruction.
          </p>
        </BlocProseV16>
        <ul>
          {principes.map((p, i) => (
            <li key={i}>{p.texte}</li>
          ))}
        </ul>
        <BlocProseV16 cle="note_epistemologique.canon_sept.conclusion">
          <p>
            Le Canon relie découverte, reconstruction et démonstration sans les confondre. Il exige que les
            transitions soient justifiées et que les propositions demeurent évaluables selon les exigences de leur
            domaine.
          </p>
        </BlocProseV16>
      </div>
      <div className="major-section">
        <h2>{t["livre.titre"]}</h2>
        <BlocProseV16 cle="note_epistemologique.livre.corps">
          <p>
            La Science Métamoderne ne désigne pas une science supplémentaire venant s’ajouter aux sciences constituées.
            Elle désigne la science considérée à partir du niveau supérieur d’intelligibilité que révèle la
            généralisation suprême. Elle travaille sur le même objet que les sciences constituées — le réel — et à un
            autre niveau d’intelligibilité. Elle prend également en charge la pluralité des sciences, leurs objets
            particuliers, leurs méthodes, leurs résultats et leurs relations.
          </p>
          <p>
            Elle coordonne les sciences constituées à ce niveau et réintègre leurs connaissances différenciées dans
            l’unité structurelle du réel et de la connaissance. La réintégration n’est donc pas une étape qui
            conduirait ensuite à la Science Métamoderne : elle est l’opération constitutive par laquelle celle-ci
            accomplit sa fonction de science de l’unité. Cette unité est une condition nécessaire à toute connaissance
            effective, car elle permet de rapporter les résultats particuliers à l’architecture commune qui leur donne
            sens et cohérence.
          </p>
          <p>
            La diversité demeure dans les phénomènes étudiés : physique, chimie, biologie et sciences sociales ne
            deviennent pas une seule discipline. L’unité recherchée porte sur les conditions structurelles
            d’intelligibilité, non sur l’effacement des objets ou des méthodes.
          </p>
        </BlocProseV16>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Section, Container, Prose, TitreSection } from "@/components/section";
import { Carte, Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import {
  NIVEAUX,
  MOUVEMENT_ORGANIQUE,
  CANON,
  AUTORITES,
} from "@/content/institution";

export const metadata = pageMetadata({
  title: "L'Institution",
  description:
    "L'École de Brazzaville et le Programme de recherche de la Science Métamoderne : architecture à sept niveaux, souveraineté du démontré, privilège optique.",
  path: "/institution",
});

/** PAGE 2 — L'INSTITUTION (L'École de Brazzaville). */
export default function Institution() {
  return (
    <>
      {/* HERO ------------------------------------------------------------- */}
      <Section tone="profond" className="py-20 sm:py-28">
        <Container className="max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-semibold uppercase tracking-[0.08em] text-blanc sm:text-5xl">
            L'Institution
          </h1>
          <p className="mt-5 font-heading text-xl italic text-or sm:text-2xl">
            L'École de Brazzaville et le Programme de recherche de la Science
            Métamoderne
          </p>
          <blockquote className="mt-10 font-heading text-lg italic text-blanc-casse sm:text-xl">
            « La Science Métamoderne n'est pas d'abord un ensemble de
            connaissances ; elle est une méthode d'institution durable de
            l'intelligibilité. »
          </blockquote>
        </Container>
      </Section>

      {/* SECTION 1 — L'OBJET UNIQUE : L'INTELLIGIBILITÉ ------------------- */}
      <Section tone="clair">
        <Container>
          <TitreSection>L'objet unique — l'Intelligibilité</TitreSection>
          <Prose className="mt-8">
            <p>
              L'École de Brazzaville a pour objet unique et souverain{" "}
              <strong>l'Intelligibilité elle-même</strong>.
            </p>
            <p>
              Elle ne se substitue à aucune science particulière. Elle ne juge
              pas, ne remplace pas et ne valide pas les disciplines
              scientifiques constituées. Elle reconnaît pleinement leur
              autonomie, leurs méthodes propres et leurs résultats.
            </p>
            <p>
              Son objet est d'un autre ordre. Elle cherche à mettre au jour les
              structures générales d'intelligibilité qui semblent traverser les
              processus de découverte, indépendamment des objets particuliers
              étudiés par chaque discipline. Elle{" "}
              <strong>formalise et restitue</strong> les conditions géométriques,
              cybernétiques et rationnelles qui rendent simultanément possibles :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>L'apparition des phénomènes ;</li>
              <li>Leur compréhension par l'esprit humain ;</li>
              <li>La connaissance cognitive que nous en prenons ;</li>
              <li>L'articulation des savoirs entre disciplines.</li>
            </ul>
            <p>
              Cette démarche ne constitue pas une discipline supplémentaire venant
              s'ajouter à la fragmentation académique. Elle est une{" "}
              <strong>nouvelle architecture de la pensée</strong> et un{" "}
              <strong>Organon de réintégration</strong>. Elle ne se contente pas
              de décrire les conditions de possibilité des savoirs (épistémologie
              descriptive) ; elle fournit au chercheur — quelle que soit sa
              discipline — un Canon de reconstruction lui permettant de remonter
              activement de ses anomalies vers les principes qui les rendent
              possibles.
            </p>
          </Prose>

          <div className="mx-auto mt-8 max-w-[68ch]">
            <p className="font-ui text-sm font-semibold uppercase tracking-wide text-or">
              Formule canonique de démarcation
            </p>
            <blockquote className="mt-3 border-l-4 border-or pl-4 font-heading text-lg italic">
              « Le métamodernisme culturel cherche à dépasser le conflit entre
              l'unité et la multiplicité ; la Science Métamoderne cherche à
              comprendre ce qui rend possible leur intelligibilité commune. »
            </blockquote>
          </div>

          <Prose className="mt-8">
            <p>
              Cette distinction opère par changement de niveau logique (au sens de
              la théorie des types de Bertrand Russell et de la systémique de
              Pierre Delattre) :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>
                Le métamodernisme culturel reste à l'intérieur de la tension
                (niveau phénoménal) ;
              </li>
              <li>
                La Science Métamoderne s'extrait de l'oscillation pour en
                modéliser la mécanique (niveau principiel).
              </li>
            </ul>
          </Prose>
        </Container>
      </Section>

      {/* SECTION 2 — ARCHITECTURE INSTITUTIONNELLE À SEPT NIVEAUX --------- */}
      <Section tone="gris">
        <Container>
          <TitreSection>L'architecture institutionnelle à sept niveaux</TitreSection>
          <Prose className="mt-8">
            <p>
              Conformément à la Constitution Scientifique de l'École de
              Brazzaville, le Programme de recherche s'organise selon une
              architecture constitutive à sept niveaux, chacun répondant à une
              fonction spécifique dans l'élaboration, la transmission et le
              développement de la connaissance :
            </p>
          </Prose>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {NIVEAUX.map((niveau) => (
              <Carte key={niveau.id} className="flex flex-col">
                <p className="font-ui text-sm font-semibold uppercase tracking-wide text-or/90">
                  Niveau {niveau.numero}
                </p>
                <h3 className="mt-1 font-heading text-xl font-semibold">
                  {niveau.titre}
                </h3>
                <dl className="mt-3 space-y-1 text-sm">
                  <div>
                    <dt className="inline font-ui font-semibold">Fonction : </dt>
                    <dd className="inline">{niveau.fonction}</dd>
                  </div>
                  <div>
                    <dt className="inline font-ui font-semibold">
                      Question fondamentale :{" "}
                    </dt>
                    <dd className="inline italic">
                      {niveau.question_fondamentale}
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 space-y-3 font-sans text-sm leading-relaxed">
                  {niveau.corps.map((paragraphe, index) => (
                    <p key={index}>{paragraphe}</p>
                  ))}
                </div>
                {niveau.equation ? (
                  <p className="mt-3 font-mono text-base text-or">
                    {niveau.equation}
                  </p>
                ) : null}
                {niveau.liste ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                    {niveau.liste.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {niveau.maxime ? (
                  <p className="mt-4 border-l-2 border-or pl-3 font-heading text-sm italic">
                    « {niveau.maxime} »
                  </p>
                ) : null}
              </Carte>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-[68ch]">
            <p className="font-sans leading-relaxed">
              <strong>
                Ces sept niveaux ne sont pas juxtaposés. Ils forment un seul
                mouvement organique, analogue aux fonctions vitales d'un organisme
                vivant :
              </strong>
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6 font-sans">
              {MOUVEMENT_ORGANIQUE.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* SECTION 3 — LE PRINCIPE DE SOUVERAINETÉ DU DÉMONTRÉ ------------- */}
      <Section tone="clair">
        <Container>
          <TitreSection>Le Principe de Souveraineté du Démontré</TitreSection>
          <Prose className="mt-8">
            <p>
              Le Principe de Souveraineté du Démontré constitue le premier article
              de la Constitution Scientifique de l'École de Brazzaville. Il
              s'énonce ainsi :
            </p>
          </Prose>

          <Encadre className="mx-auto mt-8 max-w-3xl">
            <h3 className="font-heading text-lg font-semibold uppercase tracking-wide text-or">
              Principe de Souveraineté du Démontré
            </h3>
            <div className="mt-4 space-y-3 font-sans italic leading-relaxed">
              <p>
                Dans la Science Métamoderne, le Programme de recherche peut être
                plus vaste que le Corpus.
              </p>
              <p>Les hypothèses peuvent précéder les démonstrations.</p>
              <p>Les intuitions peuvent orienter les recherches.</p>
              <p>
                Les perspectives peuvent ouvrir de nouveaux champs
                d'investigation.
              </p>
              <p>
                Mais aucune proposition ne devient constitutive du Corpus tant
                qu'elle n'a pas atteint le degré de démonstration exigé par la
                Constitution méthodologique de la Science Métamoderne.
              </p>
              <p>
                Ainsi, la croissance du savoir ne dépend ni de l'autorité de son
                auteur, ni de l'ancienneté d'une intuition, ni de la force d'une
                conviction.
              </p>
              <p>
                Elle dépend exclusivement de la qualité de sa démonstration, de sa
                résistance à la critique et de son intégration progressive dans un
                corpus scientifiquement stabilisé.
              </p>
            </div>
          </Encadre>

          <Prose className="mt-8">
            <p>
              Ce principe est redoutable. Il protège définitivement l'École contre
              toute accusation de dogmatisme. Il interdit à tout censeur de
              reprocher de ne pas avoir tout publié : ce qui n'est pas dans le
              Corpus n'y est pas parce qu'il n'a pas encore satisfait aux
              exigences de la Constitution, non parce qu'il n'existe pas.
            </p>
            <p>
              Toute découverte scientifique possède deux temporalités distinctes :
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              <li>
                Le temps de sa démonstration, qui dépend du travail scientifique ;
              </li>
              <li>
                Le temps de sa réception, qui dépend de l'histoire des communautés
                savantes et des conditions historiques, culturelles et cognitives
                de sa transmission.
              </li>
            </ul>
            <p>
              Une science durable doit posséder une théorie de la publication
              aussi rigoureuse que sa théorie de la découverte.
            </p>
          </Prose>
        </Container>
      </Section>

      {/* SECTION 4 — LE PRIVILÈGE OPTIQUE DE BRAZZAVILLE ----------------- */}
      <Section tone="gris">
        <Container>
          <TitreSection>Le Privilège Optique de Brazzaville</TitreSection>
          <Prose className="mt-8">
            <p>
              Penser la refondation de l'intelligibilité depuis Brazzaville et
              l'Afrique subsaharienne ne constitue pas un repli identitaire, mais
              l'affirmation d'un <strong>Privilège Optique</strong> partagé par une
              lignée de précurseurs sur les cinq continents.
            </p>
            <p>
              Écrit depuis Brazzaville, ce travail ne revendique aucune centralité
              géographique. Le locus énonciatif du Fronton n'est pas un grief
              identitaire ; il est un privilège optique, une position de moindre
              adhérence cognitive aux routines positivistes des centres académiques
              dominants. L'universel n'a pas de centre. Il se démontre par la
              nécessité interne de sa structure.
            </p>
            <p>
              La désoccidentalisation méthodologique opérée ici n'est pas une
              démarche identitaire ou militante ; elle est strictement
              épistémologique. Elle vise à arracher les fondements rationnels
              endogènes au folklore pour restituer leur portée logico-mathématique
              originelle.
            </p>
          </Prose>

          <div className="mx-auto mt-10 max-w-[68ch]">
            <h3 className="font-heading text-xl font-semibold">
              L'Universalité de la Lignée des Précurseurs
            </h3>
            <p className="mt-4 font-sans leading-relaxed">
              En s'appuyant sur les ruptures épistémologiques de{" "}
              <strong>René Thom</strong> (France),{" "}
              <strong>Pierre Delattre</strong> (Belgique),{" "}
              <strong>Jean-Paul Benzécri</strong> (France),{" "}
              <strong>Claude Bernard</strong> (France),{" "}
              <strong>Georges Duhamel</strong> (France),{" "}
              <strong>Jules Carles</strong> (France),{" "}
              <strong>Thomas Kuhn</strong> (États-Unis),{" "}
              <strong>Ludwig von Bertalanffy</strong> (Autriche),{" "}
              <strong>Samir Amin</strong> (Égypte/France),{" "}
              <strong>Cheikh Anta Diop</strong> (Sénégal),{" "}
              <strong>Jan Assmann</strong> (Allemagne) et{" "}
              <strong>Théophile Obenga</strong> (Congo), cette démarche s'assimile à
              ces esprits qui, d'Europe en Amérique, de l'Inde à l'Afrique, ont su
              identifier les angles morts du réductionnisme.
            </p>
            <p className="mt-4 font-sans font-semibold leading-relaxed">
              Ce n'est pas la position géographique qui donne la vue. C'est la
              moindre adhérence cognitive aux routines positivistes, une posture
              partagée par tous ces savants à travers les cinq continents.
            </p>
          </div>

          <h3 className="mx-auto mt-12 max-w-[68ch] font-ui text-sm font-semibold uppercase tracking-wide text-or">
            Les autorités de convergence épistémologique
          </h3>
          <div className="mt-6 space-y-8">
            {AUTORITES.map((champ) => (
              <div key={champ.id}>
                <p className="mx-auto max-w-[68ch] font-heading text-lg font-semibold italic">
                  {champ.champ} :
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {champ.autorites.map((autorite) => (
                    <Carte key={autorite.nom}>
                      <p className="font-heading font-semibold">
                        {autorite.nom}{" "}
                        <span className="font-sans text-sm font-normal text-bleu-nuit-profond/70">
                          ({autorite.origine})
                        </span>
                      </p>
                      <p className="mt-2 font-sans text-sm leading-relaxed">
                        {autorite.motif}
                      </p>
                    </Carte>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 5 — LA DÉMARCHE ÉPISTÉMOLOGIQUE ------------------------- */}
      <Section tone="clair">
        <Container>
          <TitreSection>La démarche épistémologique</TitreSection>
          <Prose className="mt-8">
            <p>La Science Métamoderne applique l'équation systémique :</p>
          </Prose>
          <p className="mx-auto mt-4 max-w-[68ch] font-mono text-lg text-or">
            Σ = M(F(V(Σ)))
          </p>
          <Prose className="mt-6">
            <p>
              Elle démontre comment le Substratum Commun (Σ), altéré par le Voile
              Ontologique (V) et le Filtrage institutionnel (F), peut être
              mathématiquement recalculé et restauré par la Méthode Reconstructive
              (M).
            </p>
            <p>
              Dans le champ de la régulation des systèmes complexes, de la justice
              et de l'équité procédurale, l'équation universelle se transpose sous
              sa forme anthropologique et cybernétique originelle :
            </p>
          </Prose>
          <p className="mx-auto mt-4 max-w-[68ch] font-mono text-lg text-or">
            Maât = M(F(V(Maât)))
          </p>
          <Prose className="mt-6">
            <p>
              Cette transposition n'est pas une analogie poétique. Elle est la
              démonstration que les principes qui gouvernent l'intelligibilité du
              réel gouvernent également l'intelligibilité des systèmes normatifs.
              La Maât, réhabilitée hors de toute assignation folklorique et adossée
              aux travaux de Jan Assmann et Théophile Obenga, est l'opérateur
              universel de non-contradiction structurelle.
            </p>
          </Prose>

          <h3 className="mx-auto mt-10 max-w-[68ch] font-heading text-xl font-semibold">
            La démarche épistémologique obéit au Canon de la Découverte en sept
            principes :
          </h3>
          <ol className="mx-auto mt-6 max-w-[68ch] space-y-4">
            {CANON.map((principe) => (
              <li key={principe.numero} className="flex gap-4">
                <span className="font-mono text-lg text-or">
                  {principe.numero}.
                </span>
                <p className="font-sans leading-relaxed">
                  <strong>{principe.titre}</strong> : {principe.glose}
                </p>
              </li>
            ))}
          </ol>

          <Prose className="mt-8">
            <p>
              Ce Canon ne décrit pas la science depuis l'extérieur ; il fournit au
              chercheur — quelle que soit sa discipline — un Organon de
              réintégration lui permettant de remonter activement de ses anomalies
              vers les principes qui les rendent possibles.
            </p>
          </Prose>
        </Container>
      </Section>

      {/* SECTION 6 — APPEL À L'ÉPREUVE ----------------------------------- */}
      <Section tone="nuit">
        <Container className="max-w-3xl text-center">
          <TitreSection filet={false} className="text-blanc">
            Appel à l'épreuve
          </TitreSection>
          <blockquote className="mt-8 font-heading text-xl italic leading-relaxed text-blanc-casse">
            « La Science Métamoderne ne demande aucune adhésion préalable. Elle
            invite à une enquête. Elle ne sollicite pas une croyance. Elle propose
            une méthode.
            <br />
            Ce travail ne demande pas à être accepté sur autorité. Il demande à
            être éprouvé. »
          </blockquote>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/constitution"
              className={cn(buttonVariants({ variant: "or", size: "cta" }))}
            >
              Lire la Constitution Scientifique →
            </Link>
            <Link
              href="/manifeste"
              className={cn(buttonVariants({ variant: "ligne", size: "cta" }))}
            >
              Découvrir le Manifeste →
            </Link>
            <Link
              href="/ouvrage"
              className={cn(buttonVariants({ variant: "ligne", size: "cta" }))}
            >
              Explorer l'Ouvrage →
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

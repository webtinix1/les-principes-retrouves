import Link from "next/link";
import { Section, Container, TitreSection } from "@/components/section";
import { BlocProse } from "@/components/bloc";
import { Carte, Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "La Déclaration de Brazzaville",
  description:
    "Manifeste public de l'École de Brazzaville : préambule et huit actes inauguraux, scellés à Brazzaville en juillet 2026.",
  path: "/declaration",
});

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

/** PAGE 10 — LA DÉCLARATION DE BRAZZAVILLE (Manifeste Public de l'École de Brazzaville). */
export default function DeclarationDeBrazzaville() {
  return (
    <>
      {/* ——— HERO — plein écran, solennel ——— */}
      <Section
        tone="profond"
        className="flex min-h-[80vh] items-center py-24 sm:py-32"
      >
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="font-heading text-3xl font-bold uppercase tracking-[0.08em] text-or sm:text-5xl">
              La Déclaration de Brazzaville
            </h1>
            <p className="mt-6 font-sans text-lg italic text-blanc-casse sm:text-xl">
              Manifeste Public de l'École de Brazzaville
            </p>

            <blockquote className="mt-12 max-w-[800px] font-heading text-xl italic text-or sm:text-2xl">
              « La Science Métamoderne n'est pas d'abord un ensemble de
              connaissances ; elle est une méthode d'institution durable de
              l'intelligibilité. »
            </blockquote>

            <p className="mt-12 max-w-2xl font-sans italic text-blanc-casse/90">
              « Ce travail ne demande pas à être accepté sur autorité. Il demande
              à être éprouvé. »
            </p>

            <Link
              href="#preambule"
              className={cn(buttonVariants({ variant: "or", size: "cta" }), "mt-12")}
            >
              Lire la déclaration intégrale ↓
            </Link>
          </div>
        </Container>
      </Section>

      {/* ——— SECTION 1 — PRÉAMBULE : LE CONSTAT HISTORIQUE ——— */}
      <Section tone="clair" id="preambule">
        <Container>
          <TitreSection>Préambule — le constat historique</TitreSection>
          <BlocProse cle="declaration.preambule.corps" className="mt-8">
            <p>
              L'époque contemporaine dispose d'une puissance descriptive et
              technique sans précédent. Les instruments d'observation se
              perfectionnent, les données s'accumulent, les disciplines se
              spécialisent et les publications se multiplient. Chaque domaine du
              savoir produit quotidiennement des résultats nouveaux, affine ses
              méthodes et étend son territoire d'investigation.
            </p>
            <p>
              Pourtant, à mesure que les connaissances progressent, une
              difficulté plus profonde se dessine. Nous savons davantage, mais
              nous comprenons de moins en moins ce qui relie ce que nous savons.
              Nous multiplions les observations sans parvenir à restituer leur
              unité. Nous perfectionnons les descriptions sans toujours accéder
              aux structures qui les rendent possibles. Nous savons comment les
              choses fonctionnent sans toujours comprendre pourquoi elles
              tiennent ensemble.
            </p>
            <p>
              Ainsi s'installe progressivement un paradoxe : nous mesurons sans
              connaître l'unité du mesurable ; nous décrivons sans connaître la
              structure ; nous accumulons les savoirs sans toujours restituer les
              conditions qui rendent leur coexistence intelligible. Le problème
              n'est pas l'absence de connaissances. Le problème est celui de leur
              intelligibilité globale.
            </p>
            <p>
              Cette crise n'est pas une crise du savoir. Elle est une crise de la
              réflexion sur le savoir. Elle procède d'un déplacement plus profond
              de l'activité scientifique elle-même, qui a progressivement
              abandonné la quête des conditions de possibilité au profit d'une
              efficacité sans conscience.
            </p>
            <p>
              Face à ce constat, une nécessité s'impose : réinstituer les
              conditions de possibilité de toute production durable
              d'intelligibilité.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* ——— ACTE I — LA PROCLAMATION DE L'ÉCOLE ——— */}
      <Section tone="academique">
        <Container>
          <TitreSection>Acte I</TitreSection>
          <h3 className="mt-3 font-heading text-xl font-semibold text-or sm:text-2xl">
            La proclamation de l'École
          </h3>
          <BlocProse cle="declaration.acte_i.corps" className="mt-8 text-blanc">
            <p>
              Par la présente Déclaration, est instituée l'
              <strong>École de Brazzaville</strong>, communauté scientifique
              internationale consacrée à l'étude de l'intelligibilité elle-même.
            </p>
            <p>
              Cette École ne se constitue ni comme une doctrine close, ni comme
              un système figé, ni comme une école de pensée au sens sectaire du
              terme. Elle se constitue comme un{" "}
              <strong>Programme de recherche permanent</strong>, régi par une
              Constitution méthodologique explicite, ouvert à la critique, à la
              discussion, à la vérification et à l'enrichissement par la
              communauté scientifique internationale.
            </p>
            <p>
              L'École de Brazzaville ne revendique aucune centralité
              géographique. Le locus énonciatif de Brazzaville n'est pas un grief
              identitaire ; il est un <strong>privilège optique</strong>, une
              position de moindre adhérence cognitive aux routines positivistes
              des centres académiques dominants. L'universel n'a pas de centre.
              Il se démontre par la nécessité interne de sa structure.
            </p>
            <p>
              Cette proclamation ne constitue pas un acte de fondation au sens
              classique. Elle est la reconnaissance publique d'une architecture
              cognitive qui s'est progressivement constituée, formalisée et
              stabilisée au cours d'un parcours intellectuel s'étendant sur plus
              de trente-cinq ans, depuis les premiers manuscrits fondateurs
              rédigés entre 1988 et 1992 jusqu'à l'institutionnalisation
              constitutionnelle de 2026.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* ——— ACTE II — L'OBJET UNIQUE : L'INTELLIGIBILITÉ ——— */}
      <Section tone="clair">
        <Container>
          <TitreSection>Acte II</TitreSection>
          <h3 className="mt-3 font-heading text-xl font-semibold sm:text-2xl">
            L'objet unique : l'intelligibilité
          </h3>
          <BlocProse cle="declaration.acte_ii.corps" className="mt-8">
            <p>
              L'École de Brazzaville a pour objet unique et souverain{" "}
              <strong>l'Intelligibilité elle-même</strong>.
            </p>
            <p>
              Elle ne se substitue à aucune science particulière. Elle ne juge
              pas, ne remplace pas et ne valide pas les disciplines scientifiques
              constituées. Elle reconnaît pleinement leur autonomie, leurs
              méthodes propres et leurs résultats.
            </p>
            <p>
              Son objet est d'un autre ordre. Elle cherche à mettre au jour les
              structures générales d'intelligibilité qui semblent traverser les
              processus de découverte, indépendamment des objets particuliers
              étudiés par chaque discipline. Elle{" "}
              <strong>formalise et restitue</strong> les conditions géométriques,
              cybernétiques et rationnelles qui rendent simultanément possibles :
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>L'apparition des phénomènes ;</li>
              <li>Leur compréhension par l'esprit humain ;</li>
              <li>La connaissance cognitive que nous en prenons ;</li>
              <li>L'articulation des savoirs entre disciplines.</li>
            </ul>
            <p>
              Cette démarche ne constitue pas une discipline supplémentaire
              venant s'ajouter à la fragmentation académique. Elle est une{" "}
              <strong>nouvelle architecture de la pensée</strong> et un{" "}
              <strong>Organon de réintégration</strong>. Elle ne se contente pas
              de décrire les conditions de possibilité des savoirs (épistémologie
              descriptive) ; elle fournit au chercheur — quelle que soit sa
              discipline — un Canon de reconstruction lui permettant de remonter
              activement de ses anomalies vers les principes qui les rendent
              possibles.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* ——— ACTE III — LA SCIENCE MÉTAMODERNE ——— */}
      <Section tone="nuit">
        <Container>
          <TitreSection>Acte III</TitreSection>
          <h3 className="mt-3 font-heading text-xl font-semibold text-or sm:text-2xl">
            La Science Métamoderne
          </h3>
          <BlocProse cle="declaration.acte_iii.intro" className="mt-8">
            <p>
              La présente recherche institue la{" "}
              <strong>Science Métamoderne</strong>, définie comme la science des
              conditions qui rendent simultanément possibles l'apparition des
              phénomènes, leur intelligibilité et la connaissance que nous en
              prenons.
            </p>

            <p className="font-heading font-semibold text-or">
              Formule canonique de démarcation
            </p>
            <blockquote className="border-l-4 border-or pl-4 font-heading italic text-blanc-casse">
              « Le métamodernisme culturel cherche à dépasser le conflit entre
              l'unité et la multiplicité ; la Science Métamoderne cherche à
              comprendre ce qui rend possible leur intelligibilité commune. »
            </blockquote>

            <p>
              Cette distinction opère par changement de niveau logique (au sens de
              la théorie des types de Bertrand Russell et de la systémique de
              Pierre Delattre) :
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                Le métamodernisme culturel reste à l'intérieur de la tension
                (niveau phénoménal) ;
              </li>
              <li>
                La Science Métamoderne s'extrait de l'oscillation pour en
                modéliser la mécanique (niveau principiel).
              </li>
            </ul>

            <p>Elle applique l'équation systémique :</p>
          </BlocProse>

          <p className="mt-6 text-center font-mono text-xl text-or sm:text-2xl">
            Σ = M(F(V(Σ)))
          </p>

          <BlocProse cle="declaration.acte_iii.equation" className="mt-6">
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
          </BlocProse>

          <p className="mt-6 text-center font-mono text-xl text-or sm:text-2xl">
            Maât = M(F(V(Maât)))
          </p>

          <BlocProse cle="declaration.acte_iii.transposition" className="mt-6">
            <p>
              Cette transposition n'est pas une analogie poétique. Elle est la
              démonstration que les principes qui gouvernent l'intelligibilité du
              réel gouvernent également l'intelligibilité des systèmes normatifs.
              La Maât, réhabilitée hors de toute assignation folklorique et
              adossée aux travaux de Jan Assmann et Théophile Obenga, est
              l'opérateur universel de non-contradiction structurelle.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* ——— ACTE IV — L'ARCHITECTURE INSTITUTIONNELLE ——— */}
      <Section tone="clair">
        <Container>
          <TitreSection>Acte IV</TitreSection>
          <h3 className="mt-3 font-heading text-xl font-semibold sm:text-2xl">
            L'architecture institutionnelle
          </h3>
          <BlocProse cle="declaration.acte_iv.corps" className="mt-8">
            <p>
              L'École de Brazzaville s'organise selon une architecture
              constitutive à quatre niveaux, chacun répondant à une fonction
              spécifique dans l'élaboration, la transmission et le développement
              de la connaissance :
            </p>
          </BlocProse>

          <div className="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-2">
            <Carte>
              <p className="font-ui text-sm font-semibold uppercase tracking-[0.15em] text-or">
                Niveau I
              </p>
              <h4 className="mt-1 font-heading text-lg font-semibold">
                Le Programme de Recherche (Le Principe)
              </h4>
              <p className="mt-3 font-sans leading-relaxed">
                Le Programme de Recherche constitue le cœur intellectuel de la
                Science Métamoderne. Il définit son objet, ses questions
                fondamentales, ses hypothèses directrices, ses principes
                méthodologiques et ses axes de développement. Il répond à la
                question fondamentale : <em>Que cherchons-nous à comprendre ?</em>
              </p>
              <p className="mt-3 font-sans leading-relaxed">
                Son objet est l'intelligibilité. Sa vocation est de rendre
                progressivement intelligibles les conditions générales de
                production de la connaissance.
              </p>
            </Carte>

            <Carte>
              <p className="font-ui text-sm font-semibold uppercase tracking-[0.15em] text-or">
                Niveau II
              </p>
              <h4 className="mt-1 font-heading text-lg font-semibold">
                L'Institut de Brazzaville (L'Institution)
              </h4>
              <p className="mt-3 font-sans leading-relaxed">
                L'Institut constitue l'infrastructure scientifique du Programme.
                Il organise les recherches, les publications, les archives, les
                formations, les colloques, les partenariats scientifiques et les
                laboratoires. Il répond à la question :{" "}
                <em>Comment cette recherche est-elle organisée ?</em>
              </p>
              <p className="mt-3 font-sans leading-relaxed">
                L'Institut exerce un monopole de contrôle et de certification sur
                le Noyau Démontré de la Science Métamoderne. Il est le seul
                habilité à sceller les concepts structurels stabilisés et à
                valider les protocoles de remontée reconstructive.
              </p>
            </Carte>

            <Carte>
              <p className="font-ui text-sm font-semibold uppercase tracking-[0.15em] text-or">
                Niveau III
              </p>
              <h4 className="mt-1 font-heading text-lg font-semibold">
                L'École de Brazzaville (La Communauté)
              </h4>
              <p className="mt-3 font-sans leading-relaxed">
                L'École désigne la communauté des chercheurs qui participent
                librement au Programme de Recherche. Elle ne repose sur aucune
                adhésion personnelle. Elle repose uniquement sur l'acceptation
                d'une même discipline intellectuelle : primauté de la
                démonstration, discussion critique permanente, stabilité du
                vocabulaire, distinction entre hypothèse, démonstration et
                programme, révision continue des concepts.
              </p>
              <p className="mt-3 font-sans leading-relaxed">
                L'École n'est donc pas une doctrine. Elle est une communauté de
                recherche. Elle répond à la question :{" "}
                <em>Qui fait vivre cette recherche ?</em>
              </p>
            </Carte>

            <Carte>
              <p className="font-ui text-sm font-semibold uppercase tracking-[0.15em] text-or">
                Niveau IV
              </p>
              <h4 className="mt-1 font-heading text-lg font-semibold">
                Le Corpus Scientifique (La Mémoire Génétique)
              </h4>
              <p className="mt-3 font-sans leading-relaxed">
                Le Corpus scientifique rassemble de manière étanche les travaux
                validés issus du programme de recherche. Il comprend les ouvrages
                fondateurs (<em>Les Principes Retrouvés</em>, Tome I et Tome II),
                les Working Papers, les développements doctrinaux, les concepts
                structurels stabilisés, les applications disciplinaires et les
                actes de colloques.
              </p>
              <p className="mt-3 font-sans leading-relaxed">
                Dans cette architecture globale,{" "}
                <em>Les Principes Retrouvés</em> constituent le premier traité
                systématique de la Science Métamoderne. Ils établissent le Noyau
                Démontré à partir duquel pourront être développées, selon les
                mêmes exigences de la méthode, les recherches ultérieures. Ils ne
                constituent donc ni un aboutissement, ni une clôture. Ils
                inaugurent un programme de recherche appelé à produire
                progressivement de nouvelles démonstrations dans les différents
                domaines de la connaissance.
              </p>
            </Carte>
          </div>
        </Container>
      </Section>

      {/* ——— ACTE V — LE PRINCIPE DE FÉCONDITÉ SCIENTIFIQUE ——— */}
      <Section tone="gris">
        <Container>
          <TitreSection>Acte V</TitreSection>
          <h3 className="mt-3 font-heading text-xl font-semibold sm:text-2xl">
            Le principe de fécondité scientifique
          </h3>

          <Encadre className="mx-auto mt-8 max-w-[68ch]">
            <p className="font-sans leading-relaxed">
              Une théorie ne devient véritablement scientifique que lorsqu'elle
              est capable de produire davantage qu'elle-même. Sa valeur ne réside
              pas seulement dans les démonstrations qu'elle contient, mais dans sa
              capacité à rendre possibles de nouvelles démonstrations, de nouveaux
              concepts, de nouvelles théories et de nouvelles applications.
            </p>
          </Encadre>

          <BlocProse cle="declaration.acte_v.corps" className="mt-8">
            <p>
              <em>Les Principes Retrouvés</em> constituent, à cet égard, le
              premier Organon de la Science Métamoderne. Ils n'ont pas pour
              vocation de clore la recherche. Ils ont pour fonction d'en inaugurer
              une forme nouvelle de continuité.
            </p>
            <p>
              Les travaux ultérieurs ne viendront donc pas répéter ce premier
              corpus. Ils auront pour mission d'en prolonger les principes, d'en
              éprouver la méthode, d'en enrichir les concepts et d'en étendre
              progressivement le domaine d'application, selon les mêmes exigences
              de démonstration, de critique et de vérification.
            </p>
            <p>
              Le Programme de recherche de Brazzaville comporte déjà plusieurs
              chantiers théoriques dont les démonstrations seront publiées
              progressivement à mesure qu'elles atteindront le degré de
              formalisation et de vérification exigé par ses propres principes
              méthodologiques, et selon le rythme où la communauté scientifique
              sera en mesure de les recevoir et de les éprouver. Ces axes ne
              constituent pas des promesses dogmatiques. Ils définissent des
              terrains d'application où la Méthode M est appelée à déployer ses
              protocoles de recherche :
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong>Les sciences du vivant</strong> : mécanismes de régulation
                cellulaire, réplication virale, loi organogénétique et
                réconciliation du lamarco-darwinisme ;
              </li>
              <li>
                <strong>La physique fondamentale</strong> : phénomènes nucléaires,
                limites de l'univers matériel, théorie de la transposition
                d'échelle ;
              </li>
              <li>
                <strong>Les sciences de la complexité</strong> : transformations
                de la matière et répercussions sur le biotope ;
              </li>
              <li>
                <strong>La théorie de l'information</strong> : modélisation des
                flux de connaissance et formalisation de la remontée
                reconstructive dans les systèmes numériques.
              </li>
            </ul>
          </BlocProse>
        </Container>
      </Section>

      {/* ——— ACTE VI — LE PRIVILÈGE OPTIQUE DE BRAZZAVILLE ——— */}
      <Section tone="academique">
        <Container>
          <TitreSection>Acte VI</TitreSection>
          <h3 className="mt-3 font-heading text-xl font-semibold text-or sm:text-2xl">
            Le privilège optique de Brazzaville
          </h3>
          <BlocProse cle="declaration.acte_vi.corps" className="mt-8 text-blanc">
            <p>
              Penser la refondation de l'intelligibilité depuis Brazzaville et
              l'Afrique subsaharienne ne constitue pas un repli identitaire, mais
              l'affirmation d'un <strong>Privilège Optique</strong> partagé par
              une lignée de précurseurs sur les cinq continents.
            </p>
            <p>
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
              <strong>Théophile Obenga</strong> (Congo), cette démarche
              s'assimile à ces esprits qui, d'Europe en Amérique, de l'Inde à
              l'Afrique, ont su identifier les angles morts du réductionnisme.
            </p>
            <p>
              Ce n'est pas la position géographique qui donne la vue, c'est la
              moindre adhérence cognitive aux routines positivistes, une posture
              partagée par tous ces savants à travers les cinq continents.
            </p>
            <p>
              La désoccidentalisation méthodologique opérée ici n'est pas une
              démarche identitaire ou militante ; elle est strictement
              épistémologique. Elle vise à arracher les fondements rationnels
              endogènes au folklore pour restituer leur portée logico-mathématique
              originelle. L'universel n'a pas de centre géographique exclusif. Il
              ne dépend ni de la validation des centres académiques dominants, ni
              des circuits de légitimation formels : l'universel se démontre par
              la puissance explicative de sa méthode.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* ——— ACTE VII — LE PACTE ÉTHIQUE AVEC LA COMMUNAUTÉ SCIENTIFIQUE ——— */}
      <Section tone="clair">
        <Container>
          <TitreSection>Acte VII</TitreSection>
          <h3 className="mt-3 font-heading text-xl font-semibold sm:text-2xl">
            Le pacte éthique avec la communauté scientifique
          </h3>
          <BlocProse cle="declaration.acte_vii.corps" className="mt-8">
            <p>
              La Science Métamoderne ne demande aucune adhésion préalable. Elle
              n'invite pas à une croyance. Elle propose une méthode. Elle ne
              prétend pas clore la recherche. Elle ouvre un espace où la recherche
              peut se poursuivre selon des règles explicites, discutables et
              continuellement perfectibles.
            </p>
            <p>
              <em>Les Principes Retrouvés</em> ne marquent pas l'achèvement d'une
              théorie. Ils constituent l'acte fondateur d'un programme de
              recherche appelé à produire, par la même méthode et sous les mêmes
              exigences, une série de démonstrations nouvelles dans les différents
              champs de la connaissance.
            </p>
            <p>
              La Science Métamoderne n'est pas encore un paradigme accepté ; elle
              est désormais une proposition suffisamment formalisée pour qu'il
              devienne difficile de la rejeter sans l'examiner sérieusement. Elle
              ne revendique ni autorité personnelle, ni privilège doctrinal. Elle
              exige seulement que sa valeur soit mesurée à la qualité de ses
              démonstrations et à la fécondité de son Programme de recherche.
            </p>
            <p>
              La critique n'est pas extérieure au Programme de Brazzaville. Elle
              constitue l'un des mécanismes normaux de son développement. Toute
              objection argumentée est accueillie comme une occasion de préciser
              les concepts, d'améliorer les démonstrations ou de réviser les
              hypothèses lorsque cela est nécessaire. La solidité d'une théorie ne
              se mesure pas à sa résistance à toute critique, mais à sa capacité à
              intégrer la discussion sans perdre sa cohérence.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* ——— ACTE VIII — LA FORMULE DE CLÔTURE ÉTHIQUE ——— */}
      <Section tone="profond">
        <Container>
          <TitreSection>Acte VIII</TitreSection>
          <h3 className="mt-3 font-heading text-xl font-semibold text-or sm:text-2xl">
            La formule de clôture éthique
          </h3>
          <BlocProse cle="declaration.acte_viii.corps" className="mt-8">
            <p>
              Nous avons longtemps cherché à savoir ce qu'était la Science
              Métamoderne. Aujourd'hui, nous pouvons répondre en une seule
              phrase :
            </p>
          </BlocProse>

          <blockquote className="mx-auto mt-8 max-w-[700px] text-center font-heading text-xl italic text-or sm:text-2xl">
            « La Science Métamoderne n'est pas d'abord un ensemble de
            connaissances ; elle est une méthode d'institution durable de
            l'intelligibilité. »
          </blockquote>

          <BlocProse cle="declaration.acte_viii.synthese" className="mt-8">
            <p>Cette formulation rassemble tout ce qui a été établi :</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Elle n'est pas une discipline concurrente ;</li>
              <li>Elle n'est pas une encyclopédie ;</li>
              <li>Elle n'est pas un système clos ;</li>
              <li>Elle n'est pas une doctrine figée.</li>
            </ul>
            <p>
              Elle est une manière d'instituer durablement la recherche de
              l'intelligibilité.
            </p>
            <p>
              Sa véritable ambition n'est pas de clore le savoir. Elle est d'en
              réinstituer les conditions de développement.
            </p>
            <p>
              Elle ne promet ni révélation définitive ni autorité particulière ;
              elle définit une exigence de travail. Et c'est précisément cette
              exigence qui peut faire d'un premier Organon non la fin d'une œuvre,
              mais le commencement d'une tradition scientifique.
            </p>
            <p className="font-heading text-lg font-semibold text-or">
              Ce travail ne demande pas à être accepté sur autorité. Il demande à
              être éprouvé.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* ——— DISPOSITION FINALE ET APPEL À L'ÉPREUVE ——— */}
      <Section tone="nuit">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <TitreSection filet={false} className="text-or">
              Disposition finale et appel à l'épreuve
            </TitreSection>
            <p className="mt-6 font-ui text-sm uppercase tracking-[0.15em] text-blanc-casse/80">
              Locus : Brazzaville — Juillet 2026
            </p>
            <p className="mt-4 font-ui text-sm uppercase tracking-[0.12em] text-blanc-casse/70">
              [ Scellé et proclamé pour la communauté scientifique
              internationale ]
            </p>
            <Link
              href="/institution"
              className={cn(buttonVariants({ variant: "or", size: "cta" }), "mt-10")}
            >
              Accéder à l'Institut de Brazzaville →
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

import Link from "next/link";
import { BlocProse } from "@/components/bloc";
import { Cloture, Exergue, Formule, OuverturePage } from "@/components/editorial";
import { SommaireActes, type EntreeActe } from "@/components/pages/declaration-sommaire";
import { Carte, Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { getTextes, remplir } from "@/lib/contenu";

export async function generateMetadata() {
  const t = await getTextes("declaration");
  return pageMetadata({
    title: t["seo.titre"],
    description: t["seo.description"],
    path: "/declaration",
  });
}

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

/**
 * Paragraphes des cartes de l'Acte IV, rendus via BlocProse : les classes
 * d'origine sont reportées sur `[&_p]` (même typographie pour le texte saisi
 * dans le back-office) et la prose par défaut est neutralisée.
 */
const NIVEAU_TEXTE =
  "mt-3 max-w-none [&_p]:mt-3 [&_p]:font-ui [&_p]:text-[15.5px] [&_p]:leading-[1.6] [&_p]:text-encre-2 [&_p]:text-wrap";

/** Actes de la Déclaration : ancre, numéro romain (« — » hors actes), clé du titre. */
const ACTES_DEF: [id: string, numero: string, cleTitre: string][] = [
  ["preambule", "—", "sommaire.preambule"],
  ["acte-i", "I", "acte_i.titre"],
  ["acte-ii", "II", "acte_ii.titre"],
  ["acte-iii", "III", "acte_iii.titre"],
  ["acte-iv", "IV", "acte_iv.titre"],
  ["acte-v", "V", "acte_v.titre"],
  ["acte-vi", "VI", "acte_vi.titre"],
  ["acte-vii", "VII", "acte_vii.titre"],
  ["acte-viii", "VIII", "acte_viii.titre"],
  ["appel", "—", "appel.titre"],
];

/**
 * Acte de la Déclaration : numéro romain en marge (or texte), puis l'intitulé
 * « Acte N » et son titre, réunis dans un H2.
 */
function Acte({
  id,
  romain,
  intitule,
  titre,
  children,
}: {
  id: string;
  romain: string;
  /** « Acte N » (declaration.sommaire.acte). */
  intitule: string;
  titre: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-titre`}
      className="grid grid-cols-1 gap-x-4 border-t border-filet pt-8 md:grid-cols-[64px_minmax(0,1fr)] md:pt-10"
    >
      {/* Numéro en marge (tablette et ordinateur) ; sur mobile, l'intitulé « Acte N » suffit. */}
      <span aria-hidden="true" className="hidden font-titre text-4xl leading-none text-or-700 md:block">
        {romain}
      </span>
      <div className="flex min-w-0 flex-col gap-6">
        <h2 id={`${id}-titre`} className="flex flex-col gap-2">
          <span className="font-code text-xs tracking-[0.14em] text-or-700 md:text-encre-3">{intitule}</span>
          <span className="font-titre text-[1.5rem] leading-[1.22] font-medium text-balance text-encre md:text-[1.875rem]">
            {titre}
          </span>
        </h2>
        {children}
      </div>
    </article>
  );
}

/** PAGE 10 — LA DÉCLARATION DE BRAZZAVILLE (Manifeste Public de l'École de Brazzaville). */
export default async function DeclarationDeBrazzaville() {
  const t = await getTextes("declaration");
  const intitule = (numero: string) => remplir(t["sommaire.acte"], { numero });

  /** Sommaire des actes (sommaire d'ouverture et liste latérale collante). */
  const ACTES: EntreeActe[] = ACTES_DEF.map(([id, numero, cle]) => ({ id, numero, label: t[cle] }));
  const SOMMAIRE = ACTES.map((a) => ({
    id: a.id,
    label: a.numero === "—" ? a.label : `${intitule(a.numero)} · ${a.label}`,
  }));

  /** Propriétés communes d'un acte : ancre, numéro, intitulé et titre éditables. */
  const acte = (id: string, romain: string, cle: string) => ({
    id,
    romain,
    intitule: intitule(romain),
    titre: t[`${cle}.titre`],
  });

  return (
    <>
      <OuverturePage
        page_id="declaration"
        titre={t["hero.titre"]}
        sousTitre={t["hero.sous_titre"]}
        sommaire={SOMMAIRE}
        actions={
          <Link href="#preambule" className={buttonVariants({ variant: "or-plein", size: "cta" })}>
            {t["hero.bouton"]}
          </Link>
        }
      >
        <Exergue>{t["hero.exergue"]}</Exergue>
      </OuverturePage>

      <section className="surface-claire bg-papier px-5 pt-14 pb-14 md:pt-24 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-x-6 lg:grid-cols-12">
          {/* Liste des actes, collante (ordinateur) */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-6">
              <SommaireActes entrees={ACTES} titre={t["sommaire.titre"]} ariaLabel={t["sommaire.aria"]} />
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-16 md:gap-24 lg:col-span-8 lg:col-start-5">
      {/* ——— SECTION 1 — PRÉAMBULE : LE CONSTAT HISTORIQUE ——— */}
      <section id="preambule" aria-labelledby="preambule-titre" className="flex flex-col gap-6">
          <h2
            id="preambule-titre"
            className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre md:text-[2.125rem]"
          >
            {t["preambule.titre"]}
          </h2>
          <BlocProse cle="declaration.preambule.corps">
            <p>
              L’époque contemporaine dispose d’une puissance descriptive et
              technique sans précédent. Les instruments d’observation se
              perfectionnent, les données s’accumulent, les disciplines se
              spécialisent et les publications se multiplient. Chaque domaine du
              savoir produit quotidiennement des résultats nouveaux, affine ses
              méthodes et étend son territoire d’investigation.
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
              Ainsi s’installe progressivement un paradoxe : nous mesurons sans
              connaître l’unité du mesurable ; nous décrivons sans connaître la
              structure ; nous accumulons les savoirs sans toujours restituer les
              conditions qui rendent leur coexistence intelligible. Le problème
              n’est pas l’absence de connaissances. Le problème est celui de leur
              intelligibilité globale.
            </p>
            <p>
              Cette crise n’est pas une crise du savoir. Elle est une crise de la
              réflexion sur le savoir. Elle procède d’un déplacement plus profond
              de l’activité scientifique elle-même, qui a progressivement
              abandonné la quête des conditions de possibilité au profit d’une
              efficacité sans conscience.
            </p>
            <p>
              Face à ce constat, une nécessité s’impose : réinstituer les
              conditions de possibilité de toute production durable
              d’intelligibilité.
            </p>
          </BlocProse>
      </section>

      {/* ——— ACTE I — LA PROCLAMATION DE L'ÉCOLE ——— */}
      <Acte {...acte("acte-i", "I", "acte_i")}>
          <BlocProse cle="declaration.acte_i.corps">
            <p>
              Par la présente Déclaration, est instituée l’
              <strong>École de Brazzaville</strong>, communauté scientifique
              internationale consacrée à l’étude de l’intelligibilité elle-même.
            </p>
            <p>
              Cette École ne se constitue ni comme une doctrine close, ni comme
              un système figé, ni comme une école de pensée au sens sectaire du
              terme. Elle se constitue comme un{" "}
              <strong>Programme de recherche permanent</strong>, régi par une
              Constitution méthodologique explicite, ouvert à la critique, à la
              discussion, à la vérification et à l’enrichissement par la
              communauté scientifique internationale.
            </p>
            <p>
              L’École de Brazzaville ne revendique aucune centralité
              géographique. Le locus énonciatif de Brazzaville n’est pas un grief
              identitaire ; il est un <strong>privilège optique</strong>, une
              position de moindre adhérence cognitive aux routines positivistes
              des centres académiques dominants. L’universel n’a pas de centre.
              Il se démontre par la nécessité interne de sa structure.
            </p>
            <p>
              Cette proclamation ne constitue pas un acte de fondation au sens
              classique. Elle est la reconnaissance publique d’une architecture
              cognitive qui s’est progressivement constituée, formalisée et
              stabilisée au cours d’un parcours intellectuel s’étendant sur plus
              de trente-cinq ans, depuis les premiers manuscrits fondateurs
              rédigés entre 1988 et 1992 jusqu’à l’institutionnalisation
              constitutionnelle de 2026.
            </p>
          </BlocProse>
      </Acte>

      {/* ——— ACTE II — L'OBJET UNIQUE : L'INTELLIGIBILITÉ ——— */}
      <Acte {...acte("acte-ii", "II", "acte_ii")}>
          <BlocProse cle="declaration.acte_ii.corps">
            <p>
              L’École de Brazzaville a pour objet unique et souverain{" "}
              <strong>l’Intelligibilité elle-même</strong>.
            </p>
            <p>
              Elle ne se substitue à aucune science particulière. Elle ne juge
              pas, ne remplace pas et ne valide pas les disciplines scientifiques
              constituées. Elle reconnaît pleinement leur autonomie, leurs
              méthodes propres et leurs résultats.
            </p>
            <p>
              Son objet est d’un autre ordre. Elle cherche à mettre au jour les
              structures générales d’intelligibilité qui semblent traverser les
              processus de découverte, indépendamment des objets particuliers
              étudiés par chaque discipline. Elle{" "}
              <strong>formalise et restitue</strong> les conditions géométriques,
              cybernétiques et rationnelles qui rendent simultanément possibles :
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>L’apparition des phénomènes ;</li>
              <li>Leur compréhension par l’esprit humain ;</li>
              <li>La connaissance cognitive que nous en prenons ;</li>
              <li>L’articulation des savoirs entre disciplines.</li>
            </ul>
            <p>
              Cette démarche ne constitue pas une discipline supplémentaire
              venant s’ajouter à la fragmentation académique. Elle est une{" "}
              <strong>nouvelle architecture de la pensée</strong> et un{" "}
              <strong>Organon de réintégration</strong>. Elle ne se contente pas
              de décrire les conditions de possibilité des savoirs (épistémologie
              descriptive) ; elle fournit au chercheur — quelle que soit sa
              discipline — un Canon de reconstruction lui permettant de remonter
              activement de ses anomalies vers les principes qui les rendent
              possibles.
            </p>
          </BlocProse>
      </Acte>

      {/* ——— ACTE III — LA SCIENCE MÉTAMODERNE ——— */}
      <Acte {...acte("acte-iii", "III", "acte_iii")}>
          <BlocProse cle="declaration.acte_iii.intro">
            <p>
              La présente recherche institue la{" "}
              <strong>Science Métamoderne</strong>, définie comme la science des
              conditions qui rendent simultanément possibles l’apparition des
              phénomènes, leur intelligibilité et la connaissance que nous en
              prenons.
            </p>

            <p className="mt-8 font-code text-[13px] text-or-700">
              Formule canonique de démarcation
            </p>
            <blockquote className="mt-3 pl-6 italic text-encre-2">
              « Le métamodernisme culturel cherche à dépasser le conflit entre
              l’unité et la multiplicité ; la Science Métamoderne cherche à
              comprendre ce qui rend possible leur intelligibilité commune. »
            </blockquote>

            <p>
              Cette distinction opère par changement de niveau logique (au sens de
              la théorie des types de Bertrand Russell et de la systémique de
              Pierre Delattre) :
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                Le métamodernisme culturel reste à l’intérieur de la tension
                (niveau phénoménal) ;
              </li>
              <li>
                La Science Métamoderne s’extrait de l’oscillation pour en
                modéliser la mécanique (niveau principiel).
              </li>
            </ul>

            <p>Elle applique l’équation systémique :</p>
          </BlocProse>

          <Formule className="max-w-[680px]">{t["acte_iii.formule_sigma"]}</Formule>

          <BlocProse cle="declaration.acte_iii.equation">
            <p>
              Elle démontre comment le Substratum Commun (Σ), altéré par le Voile
              Ontologique (V) et le Filtrage institutionnel (F), peut être
              mathématiquement recalculé et restauré par la Méthode Reconstructive
              (M).
            </p>
            <p>
              Dans le champ de la régulation des systèmes complexes, de la justice
              et de l’équité procédurale, l’équation universelle se transpose sous
              sa forme anthropologique et cybernétique originelle :
            </p>
          </BlocProse>

          <Formule className="max-w-[680px]">{t["acte_iii.formule_maat"]}</Formule>

          <BlocProse cle="declaration.acte_iii.transposition">
            <p>
              Cette transposition n’est pas une analogie poétique. Elle est la
              démonstration que les principes qui gouvernent l’intelligibilité du
              réel gouvernent également l’intelligibilité des systèmes normatifs.
              La Maât, réhabilitée hors de toute assignation folklorique et
              adossée aux travaux de Jan Assmann et Théophile Obenga, est
              l’opérateur universel de non-contradiction structurelle.
            </p>
          </BlocProse>
      </Acte>

      {/* ——— ACTE IV — L'ARCHITECTURE INSTITUTIONNELLE ——— */}
      <Acte {...acte("acte-iv", "IV", "acte_iv")}>
          <BlocProse cle="declaration.acte_iv.corps">
            <p>
              L’École de Brazzaville s’organise selon une architecture
              constitutive à quatre niveaux, chacun répondant à une fonction
              spécifique dans l’élaboration, la transmission et le développement
              de la connaissance :
            </p>
          </BlocProse>

          <div className="grid gap-4 xl:grid-cols-2">
            <Carte>
              <p className="font-code text-xs tracking-[0.14em] text-or-700">
                {t["acte_iv.niveau_i_etiquette"]}
              </p>
              <h3 className="mt-2 font-titre text-[1.25rem] leading-[1.3] font-medium text-encre">
                {t["acte_iv.niveau_i_titre"]}
              </h3>
              <BlocProse cle="declaration.acte_iv.niveau_i_corps" className={NIVEAU_TEXTE}>
              <p className="mt-3 font-ui text-[15.5px] leading-[1.6] text-encre-2">
                Le Programme de Recherche constitue le cœur intellectuel de la
                Science Métamoderne. Il définit son objet, ses questions
                fondamentales, ses hypothèses directrices, ses principes
                méthodologiques et ses axes de développement. Il répond à la
                question fondamentale : <em>Que cherchons-nous à comprendre ?</em>
              </p>
              <p className="mt-3 font-ui text-[15.5px] leading-[1.6] text-encre-2">
                Son objet est l’intelligibilité. Sa vocation est de rendre
                progressivement intelligibles les conditions générales de
                production de la connaissance.
              </p>
              </BlocProse>
            </Carte>

            <Carte>
              <p className="font-code text-xs tracking-[0.14em] text-or-700">
                {t["acte_iv.niveau_ii_etiquette"]}
              </p>
              <h3 className="mt-2 font-titre text-[1.25rem] leading-[1.3] font-medium text-encre">
                {t["acte_iv.niveau_ii_titre"]}
              </h3>
              <BlocProse cle="declaration.acte_iv.niveau_ii_corps" className={NIVEAU_TEXTE}>
              <p className="mt-3 font-ui text-[15.5px] leading-[1.6] text-encre-2">
                L’Institut constitue l’infrastructure scientifique du Programme.
                Il organise les recherches, les publications, les archives, les
                formations, les colloques, les partenariats scientifiques et les
                laboratoires. Il répond à la question :{" "}
                <em>Comment cette recherche est-elle organisée ?</em>
              </p>
              <p className="mt-3 font-ui text-[15.5px] leading-[1.6] text-encre-2">
                L’Institut exerce un monopole de contrôle et de certification sur
                le Noyau Démontré de la Science Métamoderne. Il est le seul
                habilité à sceller les concepts structurels stabilisés et à
                valider les protocoles de remontée reconstructive.
              </p>
              </BlocProse>
            </Carte>

            <Carte>
              <p className="font-code text-xs tracking-[0.14em] text-or-700">
                {t["acte_iv.niveau_iii_etiquette"]}
              </p>
              <h3 className="mt-2 font-titre text-[1.25rem] leading-[1.3] font-medium text-encre">
                {t["acte_iv.niveau_iii_titre"]}
              </h3>
              <BlocProse cle="declaration.acte_iv.niveau_iii_corps" className={NIVEAU_TEXTE}>
              <p className="mt-3 font-ui text-[15.5px] leading-[1.6] text-encre-2">
                L’École désigne la communauté des chercheurs qui participent
                librement au Programme de Recherche. Elle ne repose sur aucune
                adhésion personnelle. Elle repose uniquement sur l’acceptation
                d’une même discipline intellectuelle : primauté de la
                démonstration, discussion critique permanente, stabilité du
                vocabulaire, distinction entre hypothèse, démonstration et
                programme, révision continue des concepts.
              </p>
              <p className="mt-3 font-ui text-[15.5px] leading-[1.6] text-encre-2">
                L’École n’est donc pas une doctrine. Elle est une communauté de
                recherche. Elle répond à la question :{" "}
                <em>Qui fait vivre cette recherche ?</em>
              </p>
              </BlocProse>
            </Carte>

            <Carte>
              <p className="font-code text-xs tracking-[0.14em] text-or-700">
                {t["acte_iv.niveau_iv_etiquette"]}
              </p>
              <h3 className="mt-2 font-titre text-[1.25rem] leading-[1.3] font-medium text-encre">
                {t["acte_iv.niveau_iv_titre"]}
              </h3>
              <BlocProse cle="declaration.acte_iv.niveau_iv_corps" className={NIVEAU_TEXTE}>
              <p className="mt-3 font-ui text-[15.5px] leading-[1.6] text-encre-2">
                Le Corpus scientifique rassemble de manière étanche les travaux
                validés issus du programme de recherche. Il comprend les ouvrages
                fondateurs (<em>Les Principes Retrouvés</em>, Tome I et Tome II),
                les Working Papers, les développements doctrinaux, les concepts
                structurels stabilisés, les applications disciplinaires et les
                actes de colloques.
              </p>
              <p className="mt-3 font-ui text-[15.5px] leading-[1.6] text-encre-2">
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
              </BlocProse>
            </Carte>
          </div>
      </Acte>

      {/* ——— ACTE V — LE PRINCIPE DE FÉCONDITÉ SCIENTIFIQUE ——— */}
      <Acte {...acte("acte-v", "V", "acte_v")}>
          <div className="max-w-[680px] border-y border-filet bg-papier-2 px-5 py-6 md:px-7">
            <p className="font-texte text-[1.125rem] leading-[1.7] text-encre italic md:text-[1.1875rem]">
              {t["acte_v.encadre"]}
            </p>
          </div>

          <BlocProse cle="declaration.acte_v.corps">
            <p>
              <em>Les Principes Retrouvés</em> constituent, à cet égard, le
              premier Organon de la Science Métamoderne. Ils n’ont pas pour
              vocation de clore la recherche. Ils ont pour fonction d’en inaugurer
              une forme nouvelle de continuité.
            </p>
            <p>
              Les travaux ultérieurs ne viendront donc pas répéter ce premier
              corpus. Ils auront pour mission d’en prolonger les principes, d’en
              éprouver la méthode, d’en enrichir les concepts et d’en étendre
              progressivement le domaine d’application, selon les mêmes exigences
              de démonstration, de critique et de vérification.
            </p>
            <p>
              Le Programme de recherche de Brazzaville comporte déjà plusieurs
              chantiers théoriques dont les démonstrations seront publiées
              progressivement à mesure qu’elles atteindront le degré de
              formalisation et de vérification exigé par ses propres principes
              méthodologiques, et selon le rythme où la communauté scientifique
              sera en mesure de les recevoir et de les éprouver. Ces axes ne
              constituent pas des promesses dogmatiques. Ils définissent des
              terrains d’application où la Méthode M est appelée à déployer ses
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
                limites de l’univers matériel, théorie de la transposition
                d’échelle ;
              </li>
              <li>
                <strong>Les sciences de la complexité</strong> : transformations
                de la matière et répercussions sur le biotope ;
              </li>
              <li>
                <strong>La théorie de l’information</strong> : modélisation des
                flux de connaissance et formalisation de la remontée
                reconstructive dans les systèmes numériques.
              </li>
            </ul>
          </BlocProse>
      </Acte>

      {/* ——— ACTE VI — LE PRIVILÈGE OPTIQUE DE BRAZZAVILLE ——— */}
      <Acte {...acte("acte-vi", "VI", "acte_vi")}>
          <BlocProse cle="declaration.acte_vi.corps">
            <p>
              Penser la refondation de l’intelligibilité depuis Brazzaville et
              l’Afrique subsaharienne ne constitue pas un repli identitaire, mais
              l’affirmation d’un <strong>Privilège Optique</strong> partagé par
              une lignée de précurseurs sur les cinq continents.
            </p>
            <p>
              En s’appuyant sur les ruptures épistémologiques de{" "}
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
              s’assimile à ces esprits qui, d’Europe en Amérique, de l’Inde à
              l’Afrique, ont su identifier les angles morts du réductionnisme.
            </p>
            <p>
              Ce n’est pas la position géographique qui donne la vue, c’est la
              moindre adhérence cognitive aux routines positivistes, une posture
              partagée par tous ces savants à travers les cinq continents.
            </p>
            <p>
              La désoccidentalisation méthodologique opérée ici n’est pas une
              démarche identitaire ou militante ; elle est strictement
              épistémologique. Elle vise à arracher les fondements rationnels
              endogènes au folklore pour restituer leur portée logico-mathématique
              originelle. L’universel n’a pas de centre géographique exclusif. Il
              ne dépend ni de la validation des centres académiques dominants, ni
              des circuits de légitimation formels : l’universel se démontre par
              la puissance explicative de sa méthode.
            </p>
          </BlocProse>
      </Acte>

      {/* ——— ACTE VII — LE PACTE ÉTHIQUE AVEC LA COMMUNAUTÉ SCIENTIFIQUE ——— */}
      <Acte {...acte("acte-vii", "VII", "acte_vii")}>
          <BlocProse cle="declaration.acte_vii.corps">
            <p>
              La Science Métamoderne ne demande aucune adhésion préalable. Elle
              n’invite pas à une croyance. Elle propose une méthode. Elle ne
              prétend pas clore la recherche. Elle ouvre un espace où la recherche
              peut se poursuivre selon des règles explicites, discutables et
              continuellement perfectibles.
            </p>
            <p>
              <em>Les Principes Retrouvés</em> ne marquent pas l’achèvement d’une
              théorie. Ils constituent l’acte fondateur d’un programme de
              recherche appelé à produire, par la même méthode et sous les mêmes
              exigences, une série de démonstrations nouvelles dans les différents
              champs de la connaissance.
            </p>
            <p>
              La Science Métamoderne n’est pas encore un paradigme accepté ; elle
              est désormais une proposition suffisamment formalisée pour qu’il
              devienne difficile de la rejeter sans l’examiner sérieusement. Elle
              ne revendique ni autorité personnelle, ni privilège doctrinal. Elle
              exige seulement que sa valeur soit mesurée à la qualité de ses
              démonstrations et à la fécondité de son Programme de recherche.
            </p>
            <p>
              La critique n’est pas extérieure au Programme de Brazzaville. Elle
              constitue l’un des mécanismes normaux de son développement. Toute
              objection argumentée est accueillie comme une occasion de préciser
              les concepts, d’améliorer les démonstrations ou de réviser les
              hypothèses lorsque cela est nécessaire. La solidité d’une théorie ne
              se mesure pas à sa résistance à toute critique, mais à sa capacité à
              intégrer la discussion sans perdre sa cohérence.
            </p>
          </BlocProse>
      </Acte>

      {/* ——— ACTE VIII — LA FORMULE DE CLÔTURE ÉTHIQUE ——— */}
      <Acte {...acte("acte-viii", "VIII", "acte_viii")}>
          <BlocProse cle="declaration.acte_viii.corps">
            <p>
              Nous avons longtemps cherché à savoir ce qu’était la Science
              Métamoderne. Aujourd’hui, nous pouvons répondre en une seule
              phrase :
            </p>
          </BlocProse>

          {/* L'encadré fort de la page : la maxime de la Déclaration. */}
          <Encadre className="rv">
            <blockquote className="font-titre text-[1.375rem] leading-[1.4] text-or-500 italic md:text-[1.75rem]">
              {t["hero.exergue"]}
            </blockquote>
          </Encadre>

          <BlocProse cle="declaration.acte_viii.synthese">
            <p>Cette formulation rassemble tout ce qui a été établi :</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Elle n’est pas une discipline concurrente ;</li>
              <li>Elle n’est pas une encyclopédie ;</li>
              <li>Elle n’est pas un système clos ;</li>
              <li>Elle n’est pas une doctrine figée.</li>
            </ul>
            <p>
              Elle est une manière d’instituer durablement la recherche de
              l’intelligibilité.
            </p>
            <p>
              Sa véritable ambition n’est pas de clore le savoir. Elle est d’en
              réinstituer les conditions de développement.
            </p>
            <p>
              Elle ne promet ni révélation définitive ni autorité particulière ;
              elle définit une exigence de travail. Et c’est précisément cette
              exigence qui peut faire d’un premier Organon non la fin d’une œuvre,
              mais le commencement d’une tradition scientifique.
            </p>
            <p className="font-titre text-[1.25rem] leading-[1.4] font-medium text-encre">
              Ce travail ne demande pas à être accepté sur autorité. Il demande à
              être éprouvé.
            </p>
          </BlocProse>
      </Acte>

      {/* ——— DISPOSITION FINALE ET APPEL À L'ÉPREUVE ——— */}
      <section
        id="appel"
        aria-labelledby="appel-titre"
        className="flex flex-col gap-4 border-t border-filet pt-8 md:pt-10"
      >
        <h2
          id="appel-titre"
          className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre md:text-[2.125rem]"
        >
          {t["appel.titre"]}
        </h2>
        <p className="font-code text-[13px] tracking-[0.06em] text-or-700">
          {t["appel.locus"]}
        </p>
        <p className="font-code text-[13px] tracking-[0.06em] text-encre-3">
          {t["appel.sceau"]}
        </p>
      </section>
          </div>
        </div>
      </section>

      <Cloture
        suite={
          <Link
            href="/institution"
            className={cn(buttonVariants({ variant: "or-plein", size: "cta" }), "mt-2")}
          >
            {t["cloture.bouton"]}
          </Link>
        }
      >
        {t["cloture.texte"]}
      </Cloture>
    </>
  );
}

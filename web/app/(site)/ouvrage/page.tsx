import Link from "next/link";

import { AUTORITES } from "@/content/autorites";
import { Carte, Encadre } from "@/components/primitives";
import { Section, Container, Prose, TitreSection } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "L'Ouvrage",
  description:
    "Le Diptyque du Noyau Démontré : Tome I (l'Organon) et Tome II (le Laboratoire Juridique), textes liminaires et les douze autorités de convergence.",
  path: "/ouvrage",
});

/** PAGE 6 — L'OUVRAGE (version actualisée) : Le Diptyque du Noyau Démontré. */
export default function OuvragePage() {
  return (
    <>
      {/* Hero */}
      <Section tone="profond" className="text-center">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-blanc sm:text-5xl">
            L'OUVRAGE
          </h1>
          <p className="mt-4 font-sans text-lg italic text-or">
            Les Principes Retrouvés — De l'axiomatique pure à l'application
            juridictionnelle
          </p>
          <blockquote className="mt-6 font-heading text-lg italic text-blanc-casse">
            « Ce diptyque ne constitue pas une théorie supplémentaire parmi les
            théories existantes. Il inaugure un Programme de recherche consacré à
            l'étude de l'intelligibilité elle-même. »
          </blockquote>
        </Container>
      </Section>

      {/* Section 1 — Introduction au diptyque */}
      <Section tone="clair">
        <Container>
          <TitreSection>Introduction au diptyque</TitreSection>
          <Prose className="mt-8">
            <p>
              <em>Les Principes Retrouvés</em> ne se présentent ni comme une
              doctrine achevée, ni comme un système clos, ni comme une
              philosophie supplémentaire des sciences. Ils se constituent comme
              le <strong>premier traité systématique</strong> issu d'un
              Programme Général de Recherche ayant pour objet l'intelligibilité
              elle-même.
            </p>
            <p>
              L'architecture de l'ensemble repose sur une symétrie rigoureuse
              entre deux mouvements complémentaires :
            </p>
            <p>
              <strong>Le Tome I</strong> pose l'ontologie et l'épistémologie
              fondamentales. Il formalise la matrice Σ et déploie le Canon de la
              Découverte en sept principes. Il constitue l'<strong>Organon</strong>{" "}
              — l'instrument de recherche de second ordre qui permet au
              chercheur, quelle que soit sa discipline, de remonter de ses
              anomalies vers les principes qui les rendent possibles.
            </p>
            <p>
              <strong>Le Tome II</strong> transpose cette axiomatique dans le
              laboratoire du droit constitutionnel. Il formule le{" "}
              <strong>Théorème de la Validité Inversée</strong> et codifie la
              Proactivité Judiciaire Encadrée. Il constitue le terrain d'essai
              clinique où la méthode est éprouvée sur les pathologies
              systémiques de l'État de droit.
            </p>
            <p>
              Ensemble, ces deux volumes ne clôturent pas la recherche. Ils
              ouvrent un espace où la recherche peut se poursuivre selon des
              règles explicites, discutables et continuellement perfectibles. Si
              cette démarche est fondée, <em>Les Principes Retrouvés</em> ne
              marquent pas l'achèvement d'une théorie. Ils constituent l'acte
              fondateur d'un programme de recherche appelé à produire, par la
              même méthode et sous les mêmes exigences, une série de
              démonstrations nouvelles dans les différents champs de la
              connaissance.
            </p>
          </Prose>
        </Container>
      </Section>

      {/* Section 2 — Présentation symétrique du diptyque */}
      <Section tone="gris">
        <Container>
          <TitreSection>Présentation symétrique du diptyque</TitreSection>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Colonne gauche — Tome I */}
            <Carte>
              <p className="font-ui text-sm font-semibold uppercase tracking-wide text-or">
                Tome I
              </p>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                L'Organon
              </h3>
              <p className="mt-2 font-sans text-sm italic text-bleu-nuit-profond/70">
                Science de l'Intelligibilité — Traité d'épistémologie
                fondamentale et de métaphysique logico-mathématique
              </p>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed">
                <p className="font-heading text-lg italic">
                  Pourquoi le monde produit-il de plus en plus de données et de
                  moins en moins de sens ?
                </p>
                <p>
                  De l'astronomie à la biologie, de la gestion de l'État aux
                  sciences normatives, la rationalité contemporaine traverse une
                  crise invisible mais profonde : l'hyperspécialisation a
                  fragmenté la connaissance. Chaque discipline s'est murée dans
                  son jargon, s'avérant structurellement incapable de communiquer
                  avec les domaines limitrophes. Nous mesurons tout, nous
                  calculons tout, mais nous ne comprenons plus comment le Tout
                  tient ensemble. C'est la « misère théorique » de notre époque.
                </p>
                <p>
                  Né au cœur de l'École de Brazzaville, ce livre pose les
                  fondements d'une rupture épistémologique majeure : la Science
                  Métamoderne, ayant pour objet unique l'intelligibilité
                  elle-même. Étrangère aux postures esthétiques et aux
                  oscillations sensibles du métamodernisme culturel, elle
                  s'impose comme la première tentative systématique de faire de
                  l'intelligibilité le centre de gravité d'une science générale.
                </p>
                <p>
                  À travers la formulation de son Équation Cyclique Universelle{" "}
                  <span className="font-mono text-or">Σ = M(F(V(Σ)))</span>, cette
                  recherche démontre que le Réel n'est pas un chaos aléatoire,
                  mais une structure unifiée dont les lois préexistent à
                  l'observation. Le Substratum Commun (Σ) ne s'impose pas comme un
                  objet observé, mais comme une condition de possibilité déduite
                  par nécessité heuristique : la cohérence du réel et de la
                  connaissance devient difficilement pensable sans lui.
                </p>
                <p>
                  Contre la méthode empirique classique et la triade dialectique
                  hégélienne, cet ouvrage réhabilite la primauté absolue du
                  cerveau sur le laboratoire et déploie le Canon de la Découverte
                  en sept principes. Il ne décrit pas la science depuis
                  l'extérieur ; il fournit au chercheur — quelle que soit sa
                  discipline — un Organon de réintégration lui permettant de
                  remonter activement de ses anomalies vers les principes qui les
                  rendent possibles.
                </p>
                <p>
                  S'assimilant à la lignée des précurseurs universels qui,
                  d'Europe en Amérique, de l'Inde à l'Afrique, ont su identifier
                  les angles morts du réductionnisme — René Thom, Pierre
                  Delattre, Jean-Paul Benzécri, Claude Bernard, Georges Duhamel,
                  Jules Carles, Thomas Kuhn, Ludwig von Bertalanffy, Samir Amin,
                  Cheikh Anta Diop, Jan Assmann, Théophile Obenga — ce travail ne
                  sollicite pas la permission des paradigmes saturés. Il ne
                  demande pas à être accepté sur autorité.
                </p>
                <p className="font-heading italic">Il demande à être éprouvé.</p>
              </div>
            </Carte>

            {/* Colonne droite — Tome II */}
            <Carte>
              <p className="font-ui text-sm font-semibold uppercase tracking-wide text-or">
                Tome II
              </p>
              <h3 className="mt-1 font-heading text-2xl font-semibold">
                Le Laboratoire Juridique
              </h3>
              <p className="mt-2 font-sans text-sm italic text-bleu-nuit-profond/70">
                La Proactivité Encadrée — Application opératoire de la matrice Σ
                au contentieux constitutionnel positif
              </p>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed">
                <p className="font-heading text-lg italic">
                  Le droit constitutionnel n'est plus capable de nous protéger.
                  Comment le réparer ?
                </p>
                <p>
                  Enfermé dans le cul-de-sac du positivisme abstrait, le
                  constitutionnalisme moderne s'est transformé en une simple
                  bureaucratie textuelle. Les cours de justice et les parlements
                  excellent à vérifier la conformité des procédures, mais restent
                  aveugles aux injustices réelles qui consument la société.
                </p>
                <p>
                  Sous prétexte de neutralité, le formalisme kelsénien est devenu
                  le complice silencieux de l'invisibilisation des violations du
                  pacte social.
                </p>
                <p>
                  Dans ce second volume, cette recherche transforme le droit en
                  un véritable laboratoire systémique et formule une loi
                  implacable, le Théorème de la Validité Inversée :{" "}
                  <span className="font-mono text-or">V(S) = C(S) × E(S)</span>.
                  L'annulation de l'effectivité sémantique emporte
                  mathématiquement l'invalidation absolue de la validité globale.
                  Une Constitution de papier ne vaut rien si ses promesses ne sont
                  pas concrètement vécues sur le terrain.
                </p>
                <p>
                  S'appuyant sur l'isomorphisme de l'archipel des laboratoires
                  mondiaux — de la Public Interest Litigation indienne à l'Estado
                  de Cosas Inconstitucional colombien, du contrôle de
                  conventionnalité ex officio mexicain aux constitutions
                  transformatives sud-africaine et kenyane, de l'autosaisine
                  béninoise à l'Existenzminimum allemand, jusqu'à la dissidence
                  constructive américaine et à la lecture corrective canadienne —
                  cet ouvrage réhabilite la Maât, science universelle de la
                  non-contradiction structurelle de Rang A.
                </p>
                <p>
                  Ce traité dote le praticien abandonné à son propre dénuement
                  d'un arsenal d'action infaillible, démontrant pourquoi
                  l'autosaisine et la saisine d'office du juge constitutionnel
                  face à l'Urgence Caractérisée (Gravité Systémique,
                  Irréparabilité des droits, Carence Chronique du législateur)
                  constituent une obligation cybernétique de rétroaction négative
                  face à l'entropie de l'Isfet.
                </p>
                <p>
                  L'analyse clinique du procès de Nelson Mandela à Rivonia
                  (1963-1964) fournit l'illustration historique suprême de la
                  collision entre le Syllogisme Dégradé de la Cour de Pretoria et
                  le Syllogisme Réel de la Majeure universelle de la dignité
                  humaine.
                </p>
                <p>
                  Écrit depuis Brazzaville, ce travail ne revendique aucune
                  centralité géographique. Le locus énonciatif du Fronton n'est
                  pas un grief identitaire ; il est un privilège optique, une
                  position de moindre adhérence aux routines cognitives des
                  centres académiques dominants. L'universel n'a pas de centre. Il
                  se démontre par la nécessité interne de sa structure.
                </p>
                <p className="font-heading italic">
                  Ce livre ne demande pas à être accepté sur autorité. Il exige
                  d'être éprouvé.
                </p>
              </div>
            </Carte>
          </div>
        </Container>
      </Section>

      {/* Section 3 — Les textes liminaires du diptyque */}
      <Section tone="clair">
        <Container>
          <TitreSection>Les textes liminaires du diptyque</TitreSection>
          <Prose className="mt-6">
            <p>
              Le diptyque est encadré par des textes liminaires qui en
              garantissent la réception et la cohérence :
            </p>
          </Prose>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Carte>
              <h3 className="font-heading text-xl font-semibold">
                Avant-propos du Tome I
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed">
                Introduction générale à la démarche métamoderne, posant les
                fondements de la rupture épistémologique et annonçant le
                Programme de recherche.
              </p>
            </Carte>
            <Carte>
              <h3 className="font-heading text-xl font-semibold">
                Avant-propos du Tome II (enrichi)
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed">
                Fait le pont entre l'Organon théorique et le Laboratoire
                Juridique. Annonce le passage de la Pyramide de Σ à la Balance de
                la Maât. Présente le Théorème de la Validité Inversée comme
                application de l'équation cyclique au champ juridique. Intègre le
                cas Mandela à Rivonia comme illustration historique suprême.
              </p>
            </Carte>
            <Carte>
              <h3 className="font-heading text-xl font-semibold">
                Conclusion Générale du Tome I
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed">
                Scelle l'édifice du Tome I en récapitulant l'ascension des 7
                Parties. Verrouille le statut de Σ comme nécessité heuristique.
                Intègre la Note de Confinement Épistémologique sur la preuve
                microscopique réservée au Programme d'Expansion.
              </p>
            </Carte>
            <Carte>
              <h3 className="font-heading text-xl font-semibold">
                Conclusion Générale du Tome II — Le Verdict de la Balance
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed">
                Scelle l'édifice du Tome II en récapitulant la remontée du cas
                concret de Brazzaville vers l'universalité du Principe. Articule
                les deux tomes comme un seul mouvement organique, régi par la
                double respiration du réel et de la connaissance.
              </p>
            </Carte>
          </div>
        </Container>
      </Section>

      {/* Section 4 — L'ancrage doctrinal : les 12 Autorités de Convergence */}
      <Section tone="gris">
        <Container>
          <TitreSection>
            L'ancrage doctrinal — Les 12 Autorités de Convergence
          </TitreSection>
          <Prose className="mt-6">
            <p>
              L'œuvre ne naît pas du vide. Elle dialogue avec les plus hautes
              autorités scientifiques et juridiques pour instituer un nouveau
              cadre d'intelligibilité. L'ancrage doctrinal s'articule autour de
              trois champs épistémiques complémentaires : l'épistémologie et la
              systémique, les sciences du vivant et du transformisme, la
              décolonisation épistémique et la réhabilitation des matrices
              endogènes.
            </p>
          </Prose>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {AUTORITES.map((autorite) => (
              <Carte key={autorite.id}>
                <h3 className="font-heading text-lg font-semibold">
                  {autorite.nom}
                </h3>
                <p className="mt-1 font-ui text-sm font-semibold text-or">
                  {autorite.pays}
                </p>
                <p className="mt-3 font-sans text-base leading-relaxed">
                  {autorite.apport}
                </p>
              </Carte>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 5 — Le Programme de recherche : Noyau et Expansion */}
      <Section tone="nuit">
        <Container>
          <TitreSection>
            Le Programme de recherche — Noyau et Expansion
          </TitreSection>
          <Prose className="mt-6 text-blanc-casse">
            <p>
              Conformément au Principe de Souveraineté du Démontré scellé dans la
              Constitution Scientifique de l'École, l'ouvrage distingue
              rigoureusement deux niveaux :
            </p>
          </Prose>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Encadre>
              <h3 className="font-heading text-xl font-semibold text-or">
                Le Noyau Démontré
              </h3>
              <p className="mt-1 font-sans text-sm italic text-blanc-casse/70">
                Les Principes Retrouvés
              </p>
              <ul className="mt-4 space-y-3 font-sans text-base leading-relaxed">
                <li>
                  <strong>L'Axiomatique pure :</strong> la modélisation de la
                  matrice Σ et de ses polarités simultanées (π₁ ↔ π₂).
                </li>
                <li>
                  <strong>Le Canon de la Découverte :</strong> le protocole de la
                  remontée inductive-rationnelle en sept principes.
                </li>
                <li>
                  <strong>Le Laboratoire Juridique :</strong> le Théorème de la
                  Validité Inversée et la codification de la Proactivité
                  Judiciaire Encadrée.
                </li>
              </ul>
            </Encadre>
            <Encadre>
              <h3 className="font-heading text-xl font-semibold text-or">
                Le Programme d'Expansion
              </h3>
              <p className="mt-1 font-sans text-sm italic text-blanc-casse/70">
                Les chantiers émergents
              </p>
              <ul className="mt-4 space-y-3 font-sans text-base leading-relaxed">
                <li>
                  <strong>Sciences du vivant :</strong> régulation cellulaire,
                  réplication virale, loi organogénétique, lamarco-darwinisme.
                </li>
                <li>
                  <strong>Physique fondamentale :</strong> phénomènes nucléaires,
                  limites de l'univers matériel, théorie de la transposition
                  d'échelle.
                </li>
                <li>
                  <strong>Sciences de la complexité :</strong> transformations de
                  la matière et répercussions sur le biotope.
                </li>
                <li>
                  <strong>Théorie de l'information :</strong> modélisation des
                  flux de connaissance.
                </li>
              </ul>
            </Encadre>
          </div>
          <Prose className="mt-8 text-blanc-casse">
            <p>
              Ces axes ne constituent pas des promesses dogmatiques. Ils
              définissent des terrains d'application où la Méthode M est appelée
              à déployer ses protocoles de recherche, selon les mêmes exigences
              de démonstration, de critique et de vérification qui ont présidé à
              l'élaboration des présents travaux.
            </p>
          </Prose>
        </Container>
      </Section>

      {/* Section 6 — Appel à l'épreuve */}
      <Section tone="academique" className="text-center">
        <Container className="max-w-2xl">
          <blockquote className="font-heading text-xl italic text-blanc-casse sm:text-2xl">
            « La Science Métamoderne ne demande aucune adhésion préalable. Elle
            invite à une enquête. Elle ne sollicite pas une croyance. Elle
            propose une méthode. »
          </blockquote>
          <div className="mt-8 flex justify-center">
            <Link
              href="/laboratoire"
              className={cn(buttonVariants({ variant: "or", size: "cta" }))}
            >
              Accéder au Laboratoire Doctrinal
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

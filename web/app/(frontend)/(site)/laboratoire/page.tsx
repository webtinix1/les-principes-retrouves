import Link from "next/link";
import { cookies } from "next/headers";
import { Lock } from "lucide-react";

import { Section, Container, TitreSection } from "@/components/section";
import { BlocProse } from "@/components/bloc";
import { Carte, Encadre } from "@/components/primitives";
import { AccesForm } from "@/components/acces-form";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getListesLaboratoire, getRessources, type RessourceCms } from "@/lib/cms";
import { ACCESS_COOKIE, niveauDebloque, validerCode } from "@/lib/access";

export const dynamic = "force-dynamic";

const NIVEAU_LABEL: Record<string, string> = {
  module_i: "Module I",
  module_ii: "Module II",
  module_iii: "Module III",
};

export const metadata = pageMetadata({
  title: "Laboratoire Doctrinal",
  description:
    "L'Arsenal Opérationnel de l'Institut de Brazzaville : trois Working Papers fondateurs, Guide Technique d'Invocation et Arrêt Pilote, sous politique d'accès hybride.",
  path: "/laboratoire",
});

/* Gating par code d'accès actif. Les PDF intégraux, la disponibilité et le
   niveau requis se règlent dans le back-office (Laboratoire → Ressources). */

/** Carte d'une ressource (Working Paper ou pièce opératoire). */
function CarteRessource({
  ressource,
  unlocked,
  available,
}: {
  ressource: RessourceCms;
  unlocked: boolean;
  available: boolean;
}) {
  const niveauLabel = NIVEAU_LABEL[ressource.niveau_requis] ?? "un module";
  return (
    <Carte className="flex flex-col">
      <p className="font-mono text-sm text-or">{ressource.reference}</p>
      <h3 className="mt-2 font-heading text-xl font-semibold text-bleu-academique">
        {ressource.titre}
      </h3>

      <dl className="mt-4 space-y-1 font-ui text-sm text-bleu-nuit-profond/80">
        <div>
          <dt className="inline font-semibold">Classification : </dt>
          <dd className="inline">{ressource.classification}</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Volume : </dt>
          <dd className="inline">{ressource.volume}</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Statut : </dt>
          <dd className="inline">{ressource.statut}</dd>
        </div>
        {ressource.soumission && (
          <div>
            <dt className="inline font-semibold">Soumission : </dt>
            <dd className="inline italic">{ressource.soumission}</dd>
          </div>
        )}
      </dl>

      <div className="mt-5">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-bleu-nuit-profond/60">
          {ressource.resume_label} (accès libre)
        </p>
        <div className="mt-2 space-y-3 font-sans text-base leading-relaxed">
          {ressource.resume.map((paragraphe, i) => (
            <p key={i}>{paragraphe}</p>
          ))}
        </div>
      </div>

      {ressource.concepts_mobilises && (
        <div className="mt-5">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-bleu-nuit-profond/60">
            Concepts mobilisés
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 font-sans text-sm">
            {ressource.concepts_mobilises.map((concept, i) => (
              <li key={i}>{concept}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Le résumé exécutif ci-dessus est en accès libre. Téléchargement de l'intégral : conditionné. */}
      <div className="mt-auto pt-6">
        {available && unlocked ? (
          <a
            href={`/api/download/${ressource.id}`}
            className={cn(buttonVariants({ variant: "or", size: "cta" }), "w-full sm:w-auto")}
          >
            Télécharger le document intégral (PDF)
          </a>
        ) : !available ? (
          <span
            aria-disabled="true"
            className={cn(
              buttonVariants({ variant: "ligne", size: "cta" }),
              "pointer-events-none w-full text-bleu-nuit-profond/50 sm:w-auto",
            )}
          >
            Document intégral — bientôt disponible
          </span>
        ) : (
          <span
            aria-disabled="true"
            className={cn(
              buttonVariants({ variant: "ligne", size: "cta" }),
              "pointer-events-none w-full text-bleu-nuit-profond/50 sm:w-auto",
            )}
            title={`Accès réservé (${niveauLabel})`}
          >
            <Lock aria-hidden="true" className="mr-2" />
            Réservé aux participants — {niveauLabel}
          </span>
        )}
      </div>
      {available && !unlocked && (
        <p className="mt-2 font-ui text-xs text-bleu-nuit-profond/60">
          Saisissez votre code d&apos;accès (section « Politique d&apos;accès ») pour débloquer.
        </p>
      )}
    </Carte>
  );
}

/** PAGE 7 — LABORATOIRE DOCTRINAL (Version finale avec politique d'accès hybride). */
export default async function LaboratoirePage() {
  // État d'accès de la session (code d'accès + disponibilité des ressources).
  const code = (await cookies()).get(ACCESS_COOKIE)?.value;
  const res = code ? await validerCode(code) : null;
  const niveauActif = res && res.valid ? res.niveau : null;

  const [ressources, { niveaux_acces: NIVEAUX_ACCES, progression: PROGRESSION }] =
    await Promise.all([getRessources(), getListesLaboratoire()]);
  const WORKING_PAPERS = ressources.filter((r) => r.categorie === "working_paper");
  const PIECES_OPERATOIRES = ressources.filter((r) => r.categorie === "piece_operatoire");
  const etatRessource = (r: RessourceCms) => ({
    available: r.is_available,
    unlocked: niveauActif ? niveauDebloque(niveauActif, r) : false,
  });

  return (
    <>
      {/* Hero */}
      <Section tone="profond" className="text-center">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-blanc sm:text-5xl">
            Laboratoire Doctrinal
          </h1>
          <p className="mt-4 font-sans text-lg italic text-or">
            L'Arsenal Opérationnel de l'Institut de Brazzaville
          </p>
          <blockquote className="mt-6 font-heading text-lg italic text-blanc-casse">
            « L'intelligibilité théorique se valide par son opérationnalité en
            arène contentieuse. »
          </blockquote>
        </Container>
      </Section>

      {/* Section 1 — Introduction au Laboratoire */}
      <Section tone="clair">
        <Container>
          <BlocProse cle="laboratoire.introduction.corps">
            <p>
              Ce Laboratoire ne propose pas de simples commentaires académiques.
              Il met à disposition des praticiens mondiaux — juristes,
              magistrats, chercheurs, avocats — les instruments concrets de la
              Méthode Reconstructive (Méthode M).
            </p>
            <p>
              Les documents ci-dessous sont conçus pour armer l'intelligence du
              chercheur et du praticien face aux fictions de clôture des
              paradigmes saturés. Ils matérialisent le passage de l'Organon
              théorique (Tome I) au Laboratoire pratique (Tome II), en offrant
              des protocoles de détection, de qualification et d'action face aux
              anomalies structurelles.
            </p>
            <p>
              Chaque pièce est soumise aux mêmes exigences de démonstration qui
              ont présidé à l'élaboration des <em>Principes Retrouvés</em>.
              Aucune ne sollicite une adhésion préalable ; chacune demande à être
              éprouvée dans la rigueur de son application.
            </p>
          </BlocProse>
        </Container>
      </Section>

      {/* Politique d'accès hybride — présentée comme INFORMATION */}
      <Section tone="gris">
        <Container>
          <TitreSection>Politique d'accès hybride</TitreSection>
          <BlocProse cle="laboratoire.acces_hybride.corps" className="mt-6 max-w-none">
            <p>
              Conformément au{" "}
              <strong>Principe de Souveraineté du Démontré</strong> et à la
              distinction des deux temporalités (temps de la démonstration /
              temps de la réception), l'accès à l'arsenal obéit à une logique de
              compartimentation sémantique à trois niveaux.
            </p>
          </BlocProse>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {NIVEAUX_ACCES.map((niveau) => (
              <Carte key={niveau.numero} className="bg-blanc-casse">
                <p className="font-mono text-sm text-or">{niveau.numero}</p>
                <h3 className="mt-1 font-heading text-lg font-semibold text-bleu-academique">
                  {niveau.titre}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed">
                  {niveau.description}
                </p>
              </Carte>
            ))}
          </div>
          <p className="mt-8 font-sans text-base italic text-bleu-nuit-profond/80">
            L'arsenal se déploie en cinq ressources souveraines, articulées selon
            une progression logique.
          </p>

          {/* Saisie du code d'accès (débloque les téléchargements conditionnés) */}
          <div className="mt-8 border-l-4 border-or bg-bleu-nuit p-6 text-blanc-casse">
            <h3 className="font-heading text-lg font-semibold text-or">
              Accès conditionné — votre code
            </h3>
            <p className="mt-2 font-sans text-sm text-blanc-casse/80">
              Les participants aux modules de formation reçoivent un code d'accès
              qui débloque les documents intégraux. Saisissez-le ci-dessous.
            </p>
            <div className="mt-4">
              <AccesForm niveauActif={niveauActif} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 2 — Les trois Working Papers fondateurs */}
      <Section tone="clair">
        <Container>
          <TitreSection>Les trois Working Papers fondateurs</TitreSection>
          <div className="mt-8 grid gap-8">
            {WORKING_PAPERS.map((ressource) => (
              <CarteRessource key={ressource.id} ressource={ressource} {...etatRessource(ressource)} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 3 — Les deux pièces opératoires */}
      <Section tone="gris">
        <Container>
          <TitreSection>Les deux pièces opératoires</TitreSection>
          <div className="mt-8 grid gap-8">
            {PIECES_OPERATOIRES.map((ressource) => (
              <CarteRessource key={ressource.id} ressource={ressource} {...etatRessource(ressource)} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 4 — La progression logique de l'arsenal */}
      <Section tone="nuit">
        <Container>
          <TitreSection className="text-blanc-casse">
            La progression logique de l'arsenal
          </TitreSection>
          <BlocProse cle="laboratoire.progression.corps" className="mt-6 max-w-none text-blanc-casse/90">
            <p>
              L'arsenal se déploie selon une progression rigoureuse qui respecte
              l'architecture constitutive de la Science Métamoderne. Chaque pièce
              s'appuie sur la précédente, formant un édifice doctrinal cohérent et
              opposable. Elle respecte également le{" "}
              <strong>Principe de Souveraineté du Démontré</strong> : l'accès aux
              outils opérationnels est subordonné à la maîtrise préalable des
              fondements épistémologiques.
            </p>
          </BlocProse>
          <Encadre className="mt-8">
            <ol className="space-y-3 font-mono text-sm text-blanc-casse">
              {PROGRESSION.map((etape, i) => (
                <li key={etape.reference}>
                  <span className="text-or">{etape.reference}</span>
                  {" : "}
                  {etape.role}
                  {etape.prerequis !== "—" && (
                    <span className="text-blanc-casse/70">
                      {" "}
                      → {etape.prerequis}
                    </span>
                  )}
                  {i < PROGRESSION.length - 1 && (
                    <span className="mt-1 block text-or/60" aria-hidden="true">
                      ↓
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Encadre>
        </Container>
      </Section>

      {/* Section 5 — Appel à l'épreuve + CTA */}
      <Section tone="academique" className="text-center">
        <Container className="max-w-2xl">
          <p className="font-heading text-xl italic text-blanc">
            « Les outils présentés dans ce Laboratoire ne demandent pas à être
            acceptés sur autorité. Ils demandent à être éprouvés dans la rigueur
            de leur application. »
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/concepts"
              className={cn(buttonVariants({ variant: "or", size: "cta" }))}
            >
              Consulter les Concepts Stabilisés
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

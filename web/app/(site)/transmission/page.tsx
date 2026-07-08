import Link from "next/link";
import { MODULES } from "@/content/modules";
import { Section, Container, Prose, TitreSection } from "@/components/section";
import { Carte, Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Transmission & Inscriptions",
  description:
    "L'enseignement, l'arsenal opérationnel et le secrétariat international : trois modules de formation, la boucle vertueuse et les coordonnées de l'Institut.",
  path: "/transmission",
});

/**
 * PAGE 9 — TRANSMISSION & INSCRIPTIONS (Version finale).
 * L'Enseignement, l'Arsenal Opérationnel et le Secrétariat International.
 * Transcription fidèle du DOCUMENT DE SYNTHÈSE FINAL (Page 9).
 * Le paiement (CinetPay) est reporté au Lot 4 : les boutons d'inscription
 * sont des placeholders inactifs.
 */
export default function TransmissionPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="profond" className="text-center">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-or sm:text-5xl">
            Transmission &amp; Inscriptions
          </h1>
          <p className="mt-4 font-sans text-lg italic text-blanc-casse/80">
            L'émancipation intellectuelle et l'arsenal de Rang A
          </p>
          <blockquote className="mt-8 font-heading text-lg italic leading-relaxed text-blanc-casse">
            « L'esprit humain, trop longtemps livré à son propre sort, abandonné
            à son propre dénuement face à l'émiettement du savoir et à la fiction
            de clôture des disciplines, trouve ici les conditions de sa
            souveraineté retrouvée. L'Institut de Brazzaville ne propose pas une
            adhésion à un dogme, mais la mise à disposition d'un Organon de
            réintégration. Acquérir cet arsenal, c'est cesser de subir la
            fragmentation pour commencer à calculer la cohérence. »
          </blockquote>
        </Container>
      </Section>

      {/* Section 1 — L'argumentaire de la souveraineté */}
      <Section tone="clair">
        <Container>
          <TitreSection>L'argumentaire de la souveraineté</TitreSection>
          <Prose className="mt-8">
            <p>
              La science contemporaine a progressivement abandonné le chercheur
              à son propre sort. Enfermé dans des disciplines cloisonnées, soumis
              à un positivisme dogmatique qui sacralise la procédure au détriment
              de la substance, l'esprit humain est devenu structurellement
              aveugle aux architectures profondes qui rendent le réel
              intelligible. Le savoir ordinaire (K) s'est transformé en une
              poussière de faits orphelins, incapable de restituer la complétude
              du système.
            </p>
            <p>
              Face à cette violence institutionnelle, la Science Métamoderne ne
              propose pas une énième théorie spéculative. Elle déploie un{" "}
              <strong>arsenal opératoire de Rang A</strong>.
            </p>
            <p>
              L'Institut de Brazzaville a pour vocation de former des esprits
              souverains, capables d'opérer la{" "}
              <strong>Désadhérence Réflexive</strong> face aux fictions de
              clôture académiques, de détecter les anomalies structurelles, et de
              remonter activement vers les conditions de possibilité de la
              connaissance et de la justice.
            </p>
            <p>
              La transmission de cet arsenal n'est pas un acte de prosélytisme.
              C'est un acte de <strong>souveraineté épistémique</strong>. En
              s'appropriant la Méthode Reconstructive (Méthode M), le praticien —
              qu'il soit juriste, magistrat, chercheur ou avocat — cesse d'être
              le spectateur passif d'un droit asphyxiant pour devenir l'opérateur
              vivant de la rectification systémique. Il acquiert la capacité de
              calculer la cohérence là où les doctrines officielles ne produisent
              que le silence.
            </p>
          </Prose>
        </Container>
      </Section>

      {/* Section 1 bis — La boucle vertueuse */}
      <Section tone="nuit">
        <Container>
          <Encadre>
            <TitreSection className="text-or">
              La Boucle Vertueuse : Formation → Accès à l'Arsenal
            </TitreSection>
            <div className="mt-6 max-w-[68ch] font-sans text-base leading-relaxed text-blanc-casse [&_p]:mt-4 [&_p:first-child]:mt-0 [&_strong]:font-semibold">
              <p>
                Conformément au{" "}
                <strong>Principe de Souveraineté du Démontré</strong> et à la
                distinction des deux temporalités (temps de la démonstration /
                temps de la réception), l'accès à l'arsenal opérationnel du
                Laboratoire Doctrinal est strictement conditionné à la maîtrise
                préalable des fondements épistémologiques.
              </p>
              <p>
                Cette politique d'accès hybride garantit la qualité de la
                réception et la rigueur de l'application. Elle crée une boucle
                vertueuse où la formation n'est pas seulement un apport théorique,
                mais la clé d'accès à l'arsenal opérationnel complet de l'École.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="font-ui text-sm font-semibold uppercase tracking-wide text-or">
                  Niveau 1 — Accès libre (diffusion doctrinale)
                </h3>
                <ul className="mt-3 space-y-1.5 font-sans text-sm text-blanc-casse/90">
                  <li>Résumés exécutifs des Working Papers</li>
                  <li>Présentation des Concepts Stabilisés</li>
                  <li>Extraits de l'Arrêt Pilote (considérants uniquement)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-ui text-sm font-semibold uppercase tracking-wide text-or">
                  Niveau 2 — Accès conditionné par l'inscription aux modules
                </h3>
                <ul className="mt-3 space-y-1.5 font-sans text-sm text-blanc-casse/90">
                  <li>
                    Module I validé → Accès aux Working Papers intégraux (WP-01,
                    WP-02, WP-03)
                  </li>
                  <li>
                    Module II validé → Accès au Guide Technique d'Invocation
                    intégral + Arrêt Pilote intégral commenté
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-ui text-sm font-semibold uppercase tracking-wide text-or">
                  Niveau 3 — Accès premium (Module III)
                </h3>
                <ul className="mt-3 space-y-1.5 font-sans text-sm text-blanc-casse/90">
                  <li>Modèles d'actes juridictionnels personnalisés</li>
                  <li>Conseil stratégique sur mesure</li>
                  <li>Accès privilégié au Programme de Recherche</li>
                </ul>
              </div>
            </div>

            <p className="mt-8 font-sans text-sm italic text-blanc-casse/80">
              Cette architecture respecte la doctrine scellée : l'universel n'a
              pas de centre géographique, mais il a une exigence de rigueur.
              L'accès aux outils opérationnels est subordonné à la maîtrise
              préalable des fondements épistémologiques.
            </p>
          </Encadre>
        </Container>
      </Section>

      {/* Section 2 — La grille des modules de formation */}
      <Section tone="gris" id="inscription">
        <Container>
          <TitreSection>La grille des modules de formation</TitreSection>
          <Prose className="mt-8">
            <p>
              L'accès à la transmission de la Science Métamoderne obéit à une
              stricte compartimentation sémantique et financière, interdisant
              toute imposition arbitraire. La double tarification garantit
              l'universalité de la transmission tout en préservant l'autonomie
              institutionnelle de l'École.
            </p>
          </Prose>

          {/* PLACEHOLDER: tunnel d'inscription + paiement CinetPay au Lot 4 */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {MODULES.map((module) => (
              <Carte key={module.id} className="flex flex-col">
                <p className="font-mono text-xs uppercase tracking-widest text-or">
                  {module.numero}
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold">
                  {module.titre}
                </h3>

                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="font-ui font-semibold text-bleu-nuit-profond">
                      Public cible
                    </dt>
                    <dd className="mt-1 font-sans text-bleu-nuit-profond/80">
                      {module.public_cible}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-ui font-semibold text-bleu-nuit-profond">
                      Durée
                    </dt>
                    <dd className="mt-1 font-sans text-bleu-nuit-profond/80">
                      {module.duree}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-ui font-semibold text-bleu-nuit-profond">
                      Prérequis
                    </dt>
                    <dd className="mt-1 font-sans text-bleu-nuit-profond/80">
                      {module.prerequis}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5">
                  <p className="font-ui text-sm font-semibold text-bleu-nuit-profond">
                    Contenu doctrinal détaillé
                  </p>
                  <div className="mt-3 space-y-4">
                    {module.sessions.map((session) => (
                      <div key={session.titre}>
                        <p className="font-ui text-sm font-semibold text-bleu-nuit-profond">
                          {session.titre}
                        </p>
                        <ul className="mt-1.5 space-y-1 border-l border-or/40 pl-3 font-sans text-[0.8rem] text-bleu-nuit-profond/75">
                          {session.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-ui text-sm font-semibold text-bleu-nuit-profond">
                    Livrables
                  </p>
                  <ul className="mt-2 space-y-1 font-sans text-[0.8rem] text-bleu-nuit-profond/75">
                    {module.livrables.map((livrable) => (
                      <li key={livrable}>{livrable}</li>
                    ))}
                  </ul>
                </div>

                {/* Tarifs — mis en évidence (font-ui) */}
                <div className="mt-6 border-t border-or/30 pt-4">
                  <p className="font-ui text-sm font-semibold text-bleu-nuit-profond">
                    Tarifs
                  </p>
                  {module.tarif_devis ? (
                    <p className="mt-2 font-ui text-lg font-semibold text-bleu-nuit-profond">
                      {module.tarif_devis}
                    </p>
                  ) : (
                    <dl className="mt-2 space-y-1.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="font-sans text-sm text-bleu-nuit-profond/80">
                          Régime Institutionnel (B2B)
                        </dt>
                        <dd className="font-ui text-lg font-semibold text-bleu-nuit-profond">
                          {module.tarif_b2b}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="font-sans text-sm text-bleu-nuit-profond/80">
                          Régime Dérogatoire Individuel (B2C)
                        </dt>
                        <dd className="font-ui text-lg font-semibold text-bleu-nuit-profond">
                          {module.tarif_b2c}
                        </dd>
                      </div>
                    </dl>
                  )}
                </div>

                {/* CTA d'inscription — placeholder inactif (paiement au Lot 4) */}
                <div className="mt-6 flex flex-col gap-2">
                  <span
                    aria-disabled="true"
                    role="button"
                    className={cn(
                      buttonVariants({ variant: "or", size: "cta" }),
                      "pointer-events-none w-full cursor-not-allowed opacity-60",
                    )}
                  >
                    {module.cta_label}
                  </span>
                  <p className="font-sans text-xs italic text-bleu-nuit-profond/60">
                    Inscription en ligne bientôt disponible.
                  </p>
                </div>
              </Carte>
            ))}
          </div>
        </Container>
      </Section>

      {/* Moyens de paiement prévus — information, sans formulaire */}
      <Section tone="academique">
        <Container className="max-w-3xl text-center">
          <TitreSection filet={false} className="text-blanc">
            Passerelle de paiement sécurisée et souveraine
          </TitreSection>
          <Prose className="mt-6 text-blanc-casse">
            <p>
              L'Institut de Brazzaville a intégré le protocole asynchrone de
              CinetPay pour garantir la fluidité, la traçabilité et la sécurité
              des transactions financières à l'échelle internationale. Cette
              souveraineté technique est la condition matérielle de notre
              indépendance épistémique.
            </p>
          </Prose>
          <ul className="mx-auto mt-6 max-w-[68ch] space-y-2 font-sans text-sm text-blanc-casse/90">
            <li>
              <strong className="font-ui text-or">
                Mobile Money (Zone CEMAC et Afrique)
              </strong>{" "}
              : MTN, Airtel, Orange, Moov.
            </li>
            <li>
              <strong className="font-ui text-or">
                Cartes Bancaires Internationales
              </strong>{" "}
              : Visa, Mastercard (Europe, Amériques, Asie, Afrique).
            </li>
            <li>
              <strong className="font-ui text-or">Devises</strong> : Euro (EUR)
              et Franc CFA (XAF), avec conversion automatique au taux officiel.
            </li>
          </ul>
          <p className="mx-auto mt-6 max-w-[68ch] font-sans text-sm italic text-blanc-casse/70">
            Aucun frais n'est indexé sur le principe de non-imposition de
            l'École. Les fonds collectés alimentent exclusivement le Programme de
            Recherche, les archives numériques et la formation des chercheurs
            indépendants du Sud global.
          </p>
        </Container>
      </Section>

      {/* Section 4 — Secrétariat International */}
      <Section tone="clair" id="contact">
        <Container>
          <TitreSection>Secrétariat International</TitreSection>
          <p className="mt-3 pl-4 font-sans text-lg italic text-bleu-nuit-profond/70">
            Coordonnées et Liaison Scientifique
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Carte>
              <h3 className="font-heading text-lg font-semibold">
                Le Siège — Institut de Brazzaville
              </h3>
              <p className="mt-3 font-sans text-sm text-bleu-nuit-profond/85">
                Autorité Épistémique Suprême de la Science Métamoderne
              </p>
              <p className="mt-1 font-sans text-sm text-bleu-nuit-profond/85">
                Brazzaville, République du Congo
              </p>
              <p className="mt-3 font-sans text-sm italic text-bleu-nuit-profond/70">
                Siège de l'Autorité de Certification et du Corpus Fondateur
              </p>
            </Carte>

            <Carte>
              <h3 className="font-heading text-lg font-semibold">
                L'Antenne de Recherche — Liaison Scientifique et Académique
              </h3>
              <p className="mt-3 font-sans text-sm text-bleu-nuit-profond/85">
                Dakar, Sénégal
              </p>
              <p className="mt-3 font-sans text-sm italic text-bleu-nuit-profond/70">
                Pôle de recherche interdisciplinaire et de dialogue avec les
                écoles de pensée africaines
              </p>
            </Carte>
          </div>

          <div className="mt-8">
            <p className="font-ui text-sm font-semibold text-bleu-nuit-profond">
              Contact numérique
            </p>
            <ul className="mt-3 space-y-1.5 font-sans text-sm text-bleu-nuit-profond/85">
              <li>
                Email :{" "}
                <a
                  href="mailto:contact@lesprincipesretrouves.cg"
                  className="font-mono text-or underline-offset-4 hover:underline"
                >
                  contact@lesprincipesretrouves.cg
                </a>
              </li>
              <li>
                Portail :{" "}
                <span className="font-mono text-or">
                  www.lesprincipesretrouves.cg
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* Appel à l'épreuve */}
      <Section tone="profond" className="text-center">
        <Container className="max-w-2xl">
          <p className="font-heading text-lg italic leading-relaxed text-blanc-casse">
            « Ces concepts ne demandent pas à être acceptés sur autorité. Ils
            demandent à être éprouvés dans la rigueur de leur application. »
          </p>
          <div className="mt-8">
            <Link
              href="/declaration"
              className={cn(buttonVariants({ variant: "or", size: "cta" }))}
            >
              Déposer une déclaration d'épreuve
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

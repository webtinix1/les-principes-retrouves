import Link from "next/link";
import { notFound } from "next/navigation";

import { RECUEILS, dureeLecture, getRecueil } from "@/content/lectures";
import { intertitres } from "@/components/lecture";
import { Etiquette } from "@/components/primitives";
import { Section, Container, TitreSection } from "@/components/section";
import { pageMetadata } from "@/lib/seo";

/** Sommaire d'un tome : les textes ouverts à la lecture, un lien par texte. */

export const dynamicParams = false;

export function generateStaticParams() {
  return RECUEILS.map((r) => ({ tome: r.tome }));
}

export async function generateMetadata({ params }: { params: Promise<{ tome: string }> }) {
  const { tome } = await params;
  const recueil = getRecueil(tome);
  if (!recueil) return {};
  return pageMetadata({
    title: `${recueil.etiquette} — ${recueil.titre} : textes en accès libre`,
    description: recueil.presentation[0],
    path: `/ouvrage/${recueil.tome}`,
  });
}

export default async function SommaireTomePage({
  params,
}: {
  params: Promise<{ tome: string }>;
}) {
  const { tome } = await params;
  const recueil = getRecueil(tome);
  if (!recueil) notFound();

  // Numérotation continue des textes d'une partie à l'autre.
  const debuts = recueil.parties.map((_, i) =>
    recueil.parties.slice(0, i).reduce((n, p) => n + p.textes.length, 0),
  );
  return (
    <>
      <Section tone="profond">
        <Container className="max-w-3xl">
          <nav aria-label="Fil d'Ariane" className="font-ui text-sm text-blanc-casse/75">
            <Link href="/ouvrage" className="hover:text-or hover:underline">
              L&apos;Ouvrage
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{recueil.etiquette}</span>
          </nav>
          <Etiquette className="mt-8">{recueil.etiquette} · Accès libre</Etiquette>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-[-0.02em] text-blanc sm:text-5xl">
            {recueil.titre}
          </h1>
          <p className="mt-4 font-sans text-lg italic text-or">{recueil.sous_titre}</p>
          <div className="mt-6 space-y-3 font-sans text-base leading-relaxed text-blanc-casse/90">
            {recueil.presentation.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {recueil.parties.map((partie, iPartie) => (
        <Section key={partie.titre} tone={iPartie % 2 === 0 ? "clair" : "gris"}>
          <Container className="max-w-4xl">
            <TitreSection>{partie.titre}</TitreSection>
            <p className="mt-3 font-sans text-base text-bleu-nuit-profond/80">
              {partie.description}
            </p>
            <ol className="mt-8 grid gap-4">
              {partie.textes.map((texte, iTexte) => {
                const rang = debuts[iPartie] + iTexte + 1;
                const sections = intertitres(texte).length;
                return (
                  <li key={texte.slug}>
                    <Link
                      href={`/ouvrage/${recueil.tome}/${texte.slug}`}
                      className="presse group grid gap-4 rounded-xl border border-bleu-nuit-profond/10 bg-blanc p-6 transition-colors hover:border-or sm:grid-cols-[3rem_1fr_auto] sm:items-baseline"
                    >
                      <span className="font-mono text-sm text-or" aria-hidden="true">
                        {String(rang).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-heading text-xl font-semibold text-bleu-nuit-profond group-hover:text-bleu-academique">
                          {texte.titre}
                        </span>
                        {texte.sous_titre && (
                          <span className="mt-1 block font-sans text-sm italic text-bleu-nuit-profond/75">
                            {texte.sous_titre}
                          </span>
                        )}
                      </span>
                      <span className="font-ui text-sm text-bleu-nuit-profond/75">
                        {dureeLecture(texte)}&nbsp;min de lecture
                        {sections > 1 && <> · {sections}&nbsp;sections</>}
                        <span className="ml-2 text-or" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </Container>
        </Section>
      ))}

      {recueil.plan && (
        <Section tone="clair">
          <Container className="max-w-4xl">
            <TitreSection>Plan du {recueil.etiquette}</TitreSection>
            <p className="mt-3 max-w-[70ch] font-sans text-base text-bleu-nuit-profond/80">
              Les chapitres marqués «&nbsp;Accès libre&nbsp;» se lisent en ligne. Les autres
              chapitres, les démonstrations successives et les annexes restent réservés à
              l&apos;ouvrage.
            </p>
            <ol className="mt-8 divide-y divide-bleu-nuit-profond/10 border-y border-bleu-nuit-profond/10">
              {recueil.plan.map((ligne) => {
                const partie = ligne.titre.startsWith("Partie");
                return (
                  <li
                    key={ligne.titre}
                    className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    {partie ? (
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-bleu-nuit-profond/75">
                        {ligne.titre}
                      </span>
                    ) : ligne.libre ? (
                      <Link
                        href={`/ouvrage/${recueil.tome}/${ligne.libre}`}
                        className="font-sans text-base text-bleu-academique underline-offset-4 hover:underline"
                      >
                        {ligne.titre}
                      </Link>
                    ) : (
                      <span className="font-sans text-base text-bleu-nuit-profond/80">
                        {ligne.titre}
                      </span>
                    )}
                    {!partie && (
                      <span
                        className={
                          ligne.libre
                            ? "inline-flex w-fit shrink-0 items-center gap-1.5 border border-or bg-or/15 px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-bleu-nuit-profond"
                            : "inline-flex w-fit shrink-0 items-center gap-1.5 border border-bleu-nuit-profond/20 px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-bleu-nuit-profond/75"
                        }
                      >
                        <span aria-hidden="true">{ligne.libre ? "✓" : "§"}</span>
                        {ligne.libre ? "Accès libre" : "Dans l’ouvrage"}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </Container>
        </Section>
      )}
    </>
  );
}

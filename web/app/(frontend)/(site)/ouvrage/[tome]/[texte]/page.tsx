import Link from "next/link";
import { notFound } from "next/navigation";

import { RECUEILS, dureeLecture, getRecueil, textesDe } from "@/content/lectures";
import { CorpsLecture, LienTexte, SommaireTexte, intertitres } from "@/components/lecture";
import { Etiquette } from "@/components/primitives";
import { Section, Container } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Lecture d'un texte ouvert (liminaire ou chapitre en accès libre). */

export const dynamicParams = false;

export function generateStaticParams() {
  return RECUEILS.flatMap((r) => textesDe(r).map((t) => ({ tome: r.tome, texte: t.slug })));
}

function trouver(tome: string, slug: string) {
  const recueil = getRecueil(tome);
  if (!recueil) return null;
  const textes = textesDe(recueil);
  const index = textes.findIndex((t) => t.slug === slug);
  if (index < 0) return null;
  return { recueil, textes, index, texte: textes[index] };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tome: string; texte: string }>;
}) {
  const { tome, texte: slug } = await params;
  const trouve = trouver(tome, slug);
  if (!trouve) return {};
  const { recueil, texte } = trouve;
  const premier = texte.blocs.find((b) => b.t === "p");
  return pageMetadata({
    title: `${texte.titre} — ${recueil.etiquette}`,
    description:
      premier && "x" in premier ? premier.x.slice(0, 155).replace(/\s\S*$/, "") + "…" : recueil.sous_titre,
    path: `/ouvrage/${recueil.tome}/${texte.slug}`,
  });
}

export default async function LecturePage({
  params,
}: {
  params: Promise<{ tome: string; texte: string }>;
}) {
  const { tome, texte: slug } = await params;
  const trouve = trouver(tome, slug);
  if (!trouve) notFound();
  const { recueil, textes, index, texte } = trouve;
  const precedent = textes[index - 1];
  const suivant = textes[index + 1];
  const aSommaire = intertitres(texte).length >= 2;
  const base = `/ouvrage/${recueil.tome}`;

  return (
    <>
      <Section tone="profond" className="py-12 sm:py-16">
        <Container>
          <nav aria-label="Fil d'Ariane" className="font-ui text-sm text-blanc-casse/75">
            <Link href="/ouvrage" className="hover:text-or hover:underline">
              L&apos;Ouvrage
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href={base} className="hover:text-or hover:underline">
              {recueil.etiquette}
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{texte.titre}</span>
          </nav>
          <Etiquette className="mt-8">
            {recueil.etiquette} · Texte {index + 1} sur {textes.length}
          </Etiquette>
          <h1 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-[-0.02em] text-balance text-blanc sm:text-5xl">
            {texte.titre}
          </h1>
          {texte.sous_titre && (
            <p className="mt-4 max-w-3xl font-sans text-lg italic text-or">{texte.sous_titre}</p>
          )}
          <p className="mt-6 font-ui text-sm text-blanc-casse/75">
            {dureeLecture(texte)}&nbsp;min de lecture · Accès libre
          </p>
        </Container>
      </Section>

      <Section tone="clair">
        <Container
          className={cn(
            "max-w-6xl",
            aSommaire && "lg:grid lg:grid-cols-[16rem_1fr] lg:gap-14",
          )}
        >
          {aSommaire && (
            <aside className="mb-10 lg:mb-0">
              <div className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
                <SommaireTexte texte={texte} />
              </div>
            </aside>
          )}
          <article className="min-w-0">
            <CorpsLecture texte={texte} />

            <p className="mt-14 max-w-[70ch] border-t border-bleu-nuit-profond/10 pt-6 font-ui text-sm text-bleu-nuit-profond/75">
              Extrait destiné à la présentation publique. La version intégrale du{" "}
              {recueil.etiquette} demeure réservée à l&apos;acquisition de l&apos;ouvrage.
              Toute citation doit respecter les normes universitaires en vigueur.
            </p>

            <nav
              aria-label="Textes du recueil"
              className="mt-10 grid max-w-[70ch] gap-4 sm:grid-cols-2"
            >
              {precedent ? (
                <LienTexte href={`${base}/${precedent.slug}`} sens="precedent" titre={precedent.titre} />
              ) : (
                <span className="hidden sm:block" />
              )}
              {suivant && (
                <LienTexte href={`${base}/${suivant.slug}`} sens="suivant" titre={suivant.titre} />
              )}
            </nav>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={base}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "font-ui")}
              >
                Sommaire du {recueil.etiquette}
              </Link>
              <Link
                href="/ouvrage"
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "font-ui")}
              >
                Retour à l&apos;Ouvrage
              </Link>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}

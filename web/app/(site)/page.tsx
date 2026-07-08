import Link from "next/link";
import { PyramideSigma } from "@/components/pyramide-sigma";
import { Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pageMetadata, JsonLd, organizationJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Le Seuil — Inauguration d'une Autre Ère de la Connaissance",
  description:
    "Le Fronton de la Science Métamoderne. Σ = M(F(V(Σ))) : le réel est voilé pour tous, filtré pour certains, et reconstructible par la méthode.",
  path: "/",
});

/** PAGE 1 — LE SEUIL (Fronton de la Science Métamoderne). */
export default function LeSeuil() {
  return (
    <section className="relative overflow-hidden bg-bleu-nuit-profond px-6 py-20 text-blanc-casse sm:py-28">
      <JsonLd data={organizationJsonLd()} />

      {/* Filigrane du Fronton — SVG inline (vectoriel, sans requête réseau) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <svg
          viewBox="0 0 200 140"
          className="w-[min(140%,1100px)] max-w-none opacity-[0.05]"
          fill="none"
        >
          <g stroke="#D4AF37" strokeWidth="4.5" strokeLinecap="round">
            <path d="M92 56 C 66 44, 42 46, 18 54" />
            <path d="M92 64 C 64 56, 40 60, 14 72" />
            <path d="M92 72 C 66 68, 44 76, 22 90" />
            <path d="M92 80 C 70 80, 52 88, 34 102" />
            <path d="M108 56 C 134 44, 158 46, 182 54" />
            <path d="M108 64 C 136 56, 160 60, 186 72" />
            <path d="M108 72 C 134 68, 156 76, 178 90" />
            <path d="M108 80 C 130 80, 148 88, 166 102" />
          </g>
          <path
            d="M100 14 C 110 44, 110 100, 100 130 C 90 100, 90 44, 100 14 Z"
            fill="#D4AF37"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Dédicace */}
        <p className="font-heading text-lg font-medium uppercase tracking-[0.12em] text-or">
          À l&apos;Esprit Humain Souverain, à la Conscience Retrouvée de Kemet, à
          l&apos;Effectivité sans Faille de l&apos;Ordre Juste.
        </p>

        {/* Pyramide de Σ */}
        <PyramideSigma className="anim-fade-in-up mt-12 [animation-delay:0.1s]" />

        {/* Équations */}
        <div className="anim-fade-in-up mt-10 space-y-2 font-mono text-lg text-or [animation-delay:0.25s]">
          <p>Σ = M(F(V(Σ)))</p>
          <p>Maât = M(F(V(Maât)))</p>
        </div>

        {/* Citation centrale */}
        <blockquote className="anim-fade-in-up mt-10 max-w-2xl font-heading text-xl italic text-blanc-casse [animation-delay:0.4s] sm:text-2xl">
          « Ce qui structure le Réel ne peut disparaître : l&apos;Univers ne
          s&apos;anéantit pas, il s&apos;occulte. »
        </blockquote>

        {/* Titre de section */}
        <h1 className="mt-16 font-heading text-2xl font-semibold uppercase tracking-[0.1em] text-blanc sm:text-3xl">
          Science Métamoderne : la science de l&apos;intelligibilité
        </h1>
        <p className="mt-4 font-sans text-lg italic text-blanc-casse/80">
          « Le réel est voilé pour tous, filtré pour certains, et reconstructible
          par la méthode. »
        </p>

        {/* Encadré Axiome */}
        <Encadre className="anim-fade-in-up mt-12 text-left [animation-delay:0.55s]">
          <h2 className="font-heading text-lg font-semibold text-or">
            Axiome Absolu de Non-Perte
          </h2>
          <p className="mt-3 font-sans leading-relaxed">
            L&apos;Unité Structurelle (Σ / Maât) préexiste à l&apos;expérience.
            Elle traverse la fragmentation du Voile (V), survit à l&apos;opacité
            du Filtrage (F), et se réactive intégralement par la puissance
            correctrice de la Méthode M.
          </p>
        </Encadre>

        {/* Formule de clôture */}
        <p className="anim-fade-in-up mt-12 font-heading text-lg italic text-or [animation-delay:0.7s]">
          « Ce travail ne demande pas à être accepté sur autorité. Il demande à
          être éprouvé. »
        </p>

        {/* Locus */}
        <p className="mt-8 font-ui text-sm uppercase tracking-[0.15em] text-blanc-casse/60">
          Locus : Brazzaville — Juillet 2026
        </p>

        {/* CTA */}
        <Link
          href="/institution"
          className={cn(buttonVariants({ variant: "or", size: "cta" }), "mt-10")}
        >
          Entrer dans l&apos;Institut de Brazzaville →
        </Link>
      </div>
    </section>
  );
}

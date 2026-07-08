import { Button } from "@/components/ui/button";

/**
 * Page de vérification du socle (Lot 0).
 * Provisoire : valide le rendu de la palette de marque, des 4 polices
 * (Playfair / Lora / Fira Code / Inter) et des composants shadcn.
 * Sera remplacée par « Le Seuil » (Fronton + pyramide Σ) au Lot 1-2.
 */
export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero sombre — Bleu Nuit profond + Or Maât */}
      <section className="bg-bleu-nuit-profond text-blanc px-6 py-24 text-center">
        <p className="font-ui text-sm uppercase tracking-[0.15em] text-blanc-casse/70">
          École de Brazzaville — Science Métamoderne
        </p>
        <h1 className="font-heading text-5xl font-bold text-or mt-4">
          Les Principes Retrouvés
        </h1>
        <p className="font-sans italic text-xl text-blanc-casse mt-4">
          Inauguration d&apos;une Autre Ère de la Connaissance
        </p>
        <p className="font-mono text-or text-lg mt-8">Σ = M(F(V(Σ)))</p>
        <blockquote className="font-heading italic text-blanc-casse max-w-2xl mx-auto mt-8">
          « Ce qui structure le Réel ne peut disparaître : l&apos;Univers ne
          s&apos;anéantit pas, il s&apos;occulte. »
        </blockquote>
        <div className="mt-10">
          <Button className="bg-or text-bleu-academique hover:bg-or/90 font-ui">
            Franchir le Seuil
          </Button>
        </div>
      </section>

      {/* Section claire — Blanc Cassé + corps Lora */}
      <section className="bg-blanc-casse text-bleu-nuit-profond px-6 py-16 max-w-3xl mx-auto">
        <h2 className="font-heading text-3xl font-semibold border-l-4 border-or pl-4">
          Vérification du socle
        </h2>
        <p className="font-sans mt-6 leading-relaxed">
          Cette page provisoire confirme que la palette de marque, les quatre
          polices auto-hébergées et les composants shadcn sont opérationnels.
          Corps de texte en <strong>Lora</strong>, titres en{" "}
          <span className="font-heading">Playfair Display</span>, interface en{" "}
          <span className="font-ui">Inter</span>, équations en{" "}
          <span className="font-mono">Fira Code</span>.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <span className="size-12 rounded bg-bleu-nuit-profond" title="Bleu Nuit profond" />
          <span className="size-12 rounded bg-bleu-academique" title="Bleu Académique" />
          <span className="size-12 rounded bg-bleu-nuit" title="Bleu Nuit" />
          <span className="size-12 rounded bg-or" title="Or Maât" />
          <span className="size-12 rounded border bg-blanc-casse" title="Blanc Cassé" />
          <span className="size-12 rounded bg-gris-clair" title="Gris Clair" />
        </div>
      </section>
    </main>
  );
}

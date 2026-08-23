import { notFound } from "next/navigation";
import { Section, Container } from "@/components/section";
import { CheckoutForm } from "@/components/checkout-form";
import { getModule, isPurchasable } from "@/lib/commerce";
import { regimesDisponibles } from "@/lib/payment";
import { pageMetadata } from "@/lib/seo";

// Lecture de la disponibilité du paiement à l'exécution (env serveur).
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Inscription",
  description: "Inscription à un module de formation de l'Institut de Brazzaville.",
  path: "/commander",
});

export default async function CommanderPage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleId } = await params;
  const module = getModule(moduleId);
  if (!module) notFound();

  const purchasable = isPurchasable(module);
  // Régimes réellement achetables (produit publié + mappé). Vide → paiement pas
  // encore branché : on montre « bientôt » plutôt qu'un formulaire voué à l'échec.
  const regimes = purchasable ? regimesDisponibles(module.id) : [];
  const ouvert = !purchasable || regimes.length > 0;

  return (
    <Section tone="clair">
      <Container className="max-w-2xl">
        <p className="font-ui text-sm uppercase tracking-[0.15em] text-or">
          {module.numero}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-bleu-nuit-profond sm:text-4xl">
          {module.titre}
        </h1>
        <p className="mt-4 font-sans text-sm text-bleu-nuit-profond/75">
          {module.public_cible}
        </p>
        <p className="mt-2 font-sans text-sm text-bleu-nuit-profond/75">
          <span className="font-semibold">Durée :</span> {module.duree}
        </p>

        <div className="mt-10 border-l-4 border-or bg-gris-clair p-6">
          {!ouvert ? (
            <>
              <h2 className="font-heading text-xl font-semibold text-bleu-nuit-profond">
                Inscriptions bientôt ouvertes
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-bleu-nuit-profond/80">
                Le paiement en ligne de ce module est en cours d&apos;activation.
                Les inscriptions ouvriront très prochainement. Pour être informé
                de l&apos;ouverture ou réserver votre place dès maintenant,
                écrivez au Secrétariat International.
              </p>
              <a
                href="/transmission#contact"
                className="mt-5 inline-block font-ui text-sm font-semibold text-bleu-academique underline underline-offset-4 hover:text-or"
              >
                Contacter le Secrétariat →
              </a>
            </>
          ) : (
            <>
              <h2 className="font-heading text-xl font-semibold text-bleu-nuit-profond">
                {purchasable ? "Formulaire d'inscription" : "Demande de devis"}
              </h2>
              {!purchasable && (
                <p className="mt-2 font-sans text-sm text-bleu-nuit-profond/75">
                  {module.tarif_devis}
                </p>
              )}
              <div className="mt-6">
                <CheckoutForm
                  module_id={module.id}
                  module_titre={module.titre}
                  purchasable={purchasable}
                  tarif_b2b={module.tarif_b2b}
                  tarif_b2c={module.tarif_b2c}
                  tarif_devis={module.tarif_devis}
                  regimes={regimes}
                />
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}

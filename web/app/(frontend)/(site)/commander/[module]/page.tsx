import Link from "next/link";
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
  const formation = await getModule(moduleId);
  if (!formation) notFound();

  const purchasable = isPurchasable(formation);
  // Régimes réellement achetables (produit publié + mappé). Vide → paiement pas
  // encore branché : on montre « bientôt » plutôt qu'un formulaire voué à l'échec.
  const regimes = purchasable ? regimesDisponibles(formation.id) : [];
  const ouvert = !purchasable || regimes.length > 0;

  return (
    <Section tone="clair">
      <Container className="max-w-2xl">
        <p className="font-ui text-sm uppercase tracking-[0.15em] text-or">
          {formation.numero}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-bleu-nuit-profond sm:text-4xl">
          {formation.titre}
        </h1>
        <p className="mt-4 font-sans text-sm text-bleu-nuit-profond/75">
          {formation.public_cible}
        </p>
        <p className="mt-2 font-sans text-sm text-bleu-nuit-profond/75">
          <span className="font-semibold">Durée :</span> {formation.duree}
        </p>
        {formation.prerequis && (
          <p className="mt-2 font-sans text-sm text-bleu-nuit-profond/75">
            <span className="font-semibold">Prérequis :</span> {formation.prerequis}
          </p>
        )}
        {formation.livrables.length > 0 && (
          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-or">
              Ce que vous recevez
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 font-sans text-sm text-bleu-nuit-profond/80">
              {formation.livrables.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        )}
        <Link
          href="/transmission#inscription"
          className="mt-4 inline-block font-ui text-sm text-bleu-academique underline underline-offset-4 hover:text-or"
        >
          Voir le programme détaillé des sessions
        </Link>

        <div className="mt-10 surface-claire rounded-xl border border-or/50 bg-gris-clair p-6">
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
                  {formation.tarif_devis}
                </p>
              )}
              <div className="mt-6">
                <CheckoutForm
                  module_id={formation.id}
                  module_titre={formation.titre}
                  purchasable={purchasable}
                  tarif_b2b={formation.tarif_b2b}
                  tarif_b2c={formation.tarif_b2c}
                  tarif_devis={formation.tarif_devis}
                  regimes={regimes}
                />
              </div>
            </>
          )}
        </div>

        {ouvert && (
          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-or">
              Après votre demande
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 font-sans text-sm text-bleu-nuit-profond/80">
              {purchasable ? (
                <>
                  <li>Vous réglez en ligne sur la passerelle de paiement sécurisée.</li>
                  <li>
                    Une fois le paiement validé, votre code d’accès s’affiche et vous est
                    envoyé par e-mail.
                  </li>
                  <li>Ce code débloque les ressources associées sur le Laboratoire Doctrinal.</li>
                </>
              ) : (
                <>
                  <li>Votre demande est transmise au Secrétariat International.</li>
                  <li>Le Secrétariat International vous recontacte à l’adresse e-mail indiquée.</li>
                </>
              )}
            </ol>
            <p className="mt-4 font-sans text-sm text-bleu-nuit-profond/75">
              Une question&nbsp;?{" "}
              <Link
                href="/transmission#contact"
                className="text-bleu-academique underline underline-offset-4 hover:text-or"
              >
                Écrire au Secrétariat International
              </Link>
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}

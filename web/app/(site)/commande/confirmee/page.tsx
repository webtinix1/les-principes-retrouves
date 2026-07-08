import Link from "next/link";
import { Section, Container } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Confirmation",
  robots: { index: false },
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const commande = c
    ? await prisma.commande.findUnique({
        where: { id: c },
        include: { code_acces: true },
      })
    : null;

  return (
    <Section tone="clair">
      <Container className="max-w-2xl">
        {!commande ? (
          <div className="border-l-4 border-or bg-gris-clair p-6">
            <h1 className="font-heading text-2xl font-semibold text-bleu-nuit-profond">
              Commande introuvable
            </h1>
            <p className="mt-2 font-sans text-sm text-bleu-nuit-profond/75">
              Le lien de confirmation est invalide ou a expiré.
            </p>
          </div>
        ) : commande.statut === "devis_demande" ? (
          <div className="border-l-4 border-or bg-gris-clair p-6">
            <h1 className="font-heading text-2xl font-semibold text-bleu-nuit-profond">
              Demande de devis transmise
            </h1>
            <p className="mt-3 font-sans text-sm text-bleu-nuit-profond/80">
              Votre demande concernant « {commande.module_titre} » a été
              enregistrée. Le Secrétariat International vous recontactera à
              l&apos;adresse {commande.buyer_email}.
            </p>
          </div>
        ) : commande.code_acces ? (
          <div className="border-l-4 border-or bg-gris-clair p-6">
            <h1 className="font-heading text-2xl font-semibold text-bleu-nuit-profond">
              Inscription confirmée
            </h1>
            <p className="mt-3 font-sans text-sm text-bleu-nuit-profond/80">
              Votre inscription à « {commande.module_titre} » est confirmée. Votre
              code d&apos;accès, également envoyé à {commande.buyer_email}, débloque
              les ressources associées sur le Laboratoire Doctrinal.
            </p>
            <p className="mt-6 font-ui text-xs font-semibold uppercase tracking-wide text-bleu-nuit-profond/60">
              Votre code d&apos;accès
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold text-or">
              {commande.code_acces.code}
            </p>
            <div className="mt-8">
              <Link
                href="/laboratoire"
                className={cn(buttonVariants({ variant: "or", size: "cta" }))}
              >
                Accéder au Laboratoire Doctrinal
              </Link>
            </div>
          </div>
        ) : (
          <div className="border-l-4 border-or bg-gris-clair p-6">
            <h1 className="font-heading text-2xl font-semibold text-bleu-nuit-profond">
              Paiement en cours
            </h1>
            <p className="mt-3 font-sans text-sm text-bleu-nuit-profond/80">
              Votre commande « {commande.module_titre} » est en attente de
              confirmation de paiement. Votre code d&apos;accès vous sera envoyé à{" "}
              {commande.buyer_email} dès validation.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}

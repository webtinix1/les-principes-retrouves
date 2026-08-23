"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

/**
 * Bouton de soumission du back-office avec état « en cours » (Emil : un clic doit
 * répondre). `useFormStatus` lit l'état d'envoi de la Server Action du <form>
 * parent : pendant `pending`, le bouton se désactive et change de libellé — ce
 * qui empêche aussi le double-clic (double e-mail, double version en historique).
 *
 * `confirmer` ajoute une confirmation avant envoi, réservée aux actions dont la
 * conséquence part chez un tiers ou détruit une donnée vivante (révocation,
 * retour au texte d'origine).
 */

type Variante = "primaire" | "neutre" | "danger";

const VARIANTES: Record<Variante, string> = {
  primaire:
    "bg-bleu-nuit-profond text-blanc-casse hover:bg-bleu-nuit focus-visible:ring-2 focus-visible:ring-or/50",
  neutre:
    "border border-bleu-nuit-profond/20 text-bleu-nuit-profond hover:bg-gris-clair focus-visible:ring-2 focus-visible:ring-bleu-academique/40",
  danger:
    "border border-red-300 text-red-700 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-400/50",
};

type Props = {
  children: React.ReactNode;
  /** Libellé affiché pendant l'envoi. Défaut : « … » ajouté au libellé. */
  enCours?: string;
  /** Message de confirmation ; si l'utilisateur refuse, l'envoi est annulé. */
  confirmer?: string;
  variante?: Variante;
  className?: string;
};

export function BoutonSoumettre({
  children,
  enCours,
  confirmer,
  variante = "primaire",
  className,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      onClick={(e) => {
        if (confirmer && !window.confirm(confirmer)) e.preventDefault();
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded px-3 py-1.5 font-ui text-xs font-medium outline-none transition-colors disabled:cursor-progress disabled:opacity-60",
        VARIANTES[variante],
        className,
      )}
    >
      {pending ? (enCours ?? "…") : children}
    </button>
  );
}

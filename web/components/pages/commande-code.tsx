"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Code d'accès affiché en grand, avec un bouton de copie (purement pratique). */
export function CodeAcces({
  code,
  libelles,
}: {
  code: string;
  /** Libellés du bouton (back-office, « Site — Interface »), lus par le parent serveur. */
  libelles: { copier: string; copie: string };
}) {
  const [copie, setCopie] = useState(false);

  async function copier() {
    try {
      await navigator.clipboard.writeText(code);
      setCopie(true);
      setTimeout(() => setCopie(false), 2400);
    } catch {
      /* presse-papiers indisponible : le code reste sélectionnable */
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-code text-[1.625rem] font-medium tracking-[0.06em] break-all text-encre select-all md:text-[2rem]">
        {code}
      </p>
      <button
        type="button"
        onClick={copier}
        className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-[2px] border border-encre px-4 font-ui text-sm font-semibold text-encre transition-colors hover:bg-encre hover:text-papier sm:self-auto"
      >
        {copie ? (
          <Check aria-hidden="true" className="size-4" strokeWidth={2} />
        ) : (
          <Copy aria-hidden="true" className="size-4" strokeWidth={1.75} />
        )}
        <span aria-live="polite">{copie ? libelles.copie : libelles.copier}</span>
      </button>
    </div>
  );
}

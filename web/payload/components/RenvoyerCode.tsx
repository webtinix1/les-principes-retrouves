"use client";

import { useState } from "react";
import { Button, useDocumentInfo } from "@payloadcms/ui";

const MESSAGES: Record<string, string> = {
  sent: "Code renvoyé par e-mail.",
  skipped: "E-mail non configuré (RESEND_API_KEY / RESEND_FROM) : rien n'a été envoyé.",
  error: "Échec de l'envoi de l'e-mail.",
};

/** Bouton « Renvoyer le code » de la fiche d'un code d'accès. */
export function RenvoyerCode() {
  const { id } = useDocumentInfo();
  const [etat, setEtat] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);

  if (!id) return null;

  async function renvoyer() {
    setEnvoi(true);
    setEtat(null);
    try {
      const res = await fetch(`/api/codes-acces/${id}/renvoyer`, {
        method: "POST",
        credentials: "include",
      });
      const data = (await res.json()) as { statut?: string };
      setEtat(MESSAGES[data.statut ?? "error"] ?? MESSAGES.error);
    } catch {
      setEtat(MESSAGES.error);
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <Button buttonStyle="secondary" size="small" onClick={renvoyer} disabled={envoi}>
        {envoi ? "Envoi…" : "Renvoyer le code à l'acheteur"}
      </Button>
      {etat && <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>{etat}</p>}
    </div>
  );
}

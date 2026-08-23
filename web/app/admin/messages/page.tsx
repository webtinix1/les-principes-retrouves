import { prisma } from "@/lib/prisma";
import { setMessageStatut } from "@/app/admin/actions";
import { BoutonSoumettre } from "@/components/admin/bouton-soumettre";
import { STATUT_MESSAGE, libelle } from "@/lib/libelles";

export const dynamic = "force-dynamic";

const STATUTS = ["nouveau", "traite", "archive"];

function dateFr(d: Date) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short", timeZone: "Africa/Brazzaville" }).format(d);
}

export default async function AdminMessages() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { created_at: "desc" } });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">
        Messages <span className="font-mono text-lg text-bleu-nuit-profond/50">({messages.length})</span>
      </h1>

      <div className="mt-6 space-y-4">
        {messages.map((m) => (
          <article key={m.id} className="rounded border border-bleu-nuit-profond/10 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{m.sujet}</p>
                <p className="text-sm text-bleu-nuit-profond/70">
                  {m.nom} · {m.email}
                  {m.organisation ? ` · ${m.organisation}` : ""}
                </p>
              </div>
              <span className="font-mono text-xs text-bleu-nuit-profond/50">{dateFr(m.created_at)}</span>
            </div>
            <p className="mt-3 whitespace-pre-wrap font-sans text-sm text-bleu-nuit-profond/85">{m.message}</p>
            <form action={setMessageStatut} className="mt-4 flex items-center gap-2">
              <input type="hidden" name="id" value={m.id} />
              <select name="statut" defaultValue={m.statut} className="rounded border border-bleu-nuit-profond/15 bg-white px-2 py-1 text-xs">
                {STATUTS.map((s) => <option key={s} value={s}>{libelle(STATUT_MESSAGE, s)}</option>)}
              </select>
              <BoutonSoumettre variante="primaire" enCours="…">Enregistrer</BoutonSoumettre>
              <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.sujet)}`} className="ml-2 text-xs text-bleu-academique underline underline-offset-4 hover:text-or">Répondre</a>
            </form>
          </article>
        ))}
        {messages.length === 0 && (
          <p className="rounded border border-bleu-nuit-profond/10 bg-white p-6 text-center text-bleu-nuit-profond/50">Aucun message.</p>
        )}
      </div>
    </div>
  );
}

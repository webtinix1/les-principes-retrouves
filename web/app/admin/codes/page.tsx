import { prisma } from "@/lib/prisma";
import { setCodeRevoked, resendCode } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function dateFr(d: Date) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeZone: "Africa/Brazzaville" }).format(d);
}

export default async function AdminCodes() {
  const codes = await prisma.codeAcces.findMany({
    orderBy: { created_at: "desc" },
    include: { commande: true },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">
        Codes d&apos;accès <span className="font-mono text-lg text-bleu-nuit-profond/50">({codes.length})</span>
      </h1>

      <div className="mt-6 overflow-x-auto rounded border border-bleu-nuit-profond/10 bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-gris-clair font-ui text-xs uppercase tracking-wide text-bleu-nuit-profond/60">
            <tr>
              <th className="p-3">Émis le</th>
              <th className="p-3">Code</th>
              <th className="p-3">Niveau</th>
              <th className="p-3">Bénéficiaire</th>
              <th className="p-3">État</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bleu-nuit-profond/5">
            {codes.map((c) => (
              <tr key={c.id} className="align-top">
                <td className="p-3 font-mono text-xs whitespace-nowrap text-bleu-nuit-profond/70">{dateFr(c.created_at)}</td>
                <td className="p-3 font-mono font-semibold text-bleu-nuit-profond">{c.code}</td>
                <td className="p-3 uppercase">{c.niveau}</td>
                <td className="p-3">
                  <div>{c.email}</div>
                  <div className="text-bleu-nuit-profond/50">{c.commande.module_titre}</div>
                </td>
                <td className="p-3">
                  {c.revoked ? (
                    <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">révoqué</span>
                  ) : (
                    <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">actif</span>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    <form action={setCodeRevoked}>
                      <input type="hidden" name="id" value={c.id} />
                      <input type="hidden" name="revoked" value={c.revoked ? "false" : "true"} />
                      <button className="rounded border border-bleu-nuit-profond/20 px-2 py-1 text-xs hover:bg-gris-clair">
                        {c.revoked ? "Réactiver" : "Révoquer"}
                      </button>
                    </form>
                    <form action={resendCode}>
                      <input type="hidden" name="id" value={c.id} />
                      <button className="rounded border border-bleu-nuit-profond/20 px-2 py-1 text-xs hover:bg-gris-clair">
                        Renvoyer l&apos;e-mail
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {codes.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center text-bleu-nuit-profond/50">Aucun code émis.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

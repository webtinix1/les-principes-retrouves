import { textesDe } from "@/components/formulaires-textes";
import { ModulesComparaisonClient, type ModuleComparable } from "@/components/modules-comparaison-client";
import { getTextes } from "@/lib/contenu";

export type { ModuleComparable } from "@/components/modules-comparaison-client";

/**
 * Comparaison des trois modules (Server Component) : charge les libellés du
 * back-office (« Site — Interface », section « tableau comparatif ») et rend
 * le tableau / les onglets client. Mêmes propriétés qu'auparavant.
 */
export async function ModulesComparaison({ modules }: { modules: ModuleComparable[] }) {
  const textes = await getTextes("site_interface");
  return <ModulesComparaisonClient modules={modules} t={textesDe(textes, "comparaison")} />;
}

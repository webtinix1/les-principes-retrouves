import { randomBytes } from "crypto";
import { getModules, type ModuleCms } from "@/lib/cms";

export async function getModule(id: string): Promise<ModuleCms | undefined> {
  return (await getModules()).find((m) => m.id === id);
}

/** Un module est achetable en ligne s'il a un tarif (Module I & II). Module III = devis. */
export function isPurchasable(m: ModuleCms): boolean {
  return Boolean(m.tarif_b2b || m.tarif_b2c);
}

/** Tarif affiché selon le régime choisi. */
export function tarifFor(m: ModuleCms, tarif_type: "b2b" | "b2c" | "devis"): string {
  if (tarif_type === "b2b") return m.tarif_b2b ?? "—";
  if (tarif_type === "b2c") return m.tarif_b2c ?? "—";
  return m.tarif_devis ?? "Sur devis";
}

/** Génère un code d'accès lisible, ex. EBZ-A1B2-C3D4. */
export function generateAccessCode(): string {
  const raw = randomBytes(4).toString("hex").toUpperCase();
  return `EBZ-${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
}

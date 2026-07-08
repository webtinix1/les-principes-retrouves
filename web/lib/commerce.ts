import { randomBytes } from "crypto";
import { MODULES, type Module } from "@/content/modules";

/** Correspondance module → niveau d'accès débloqué. */
const NIVEAU: Record<string, string> = {
  fondements_organon: "module_i",
  laboratoire_proactivite_juridique: "module_ii",
  strategie_architectonique_systemique: "module_iii",
};

export function getModule(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function niveauForModule(module_id: string): string {
  return NIVEAU[module_id] ?? "inconnu";
}

/** Un module est achetable en ligne s'il a un tarif (Module I & II). Module III = devis. */
export function isPurchasable(m: Module): boolean {
  return Boolean(m.tarif_b2b || m.tarif_b2c);
}

/** Tarif affiché selon le régime choisi. */
export function tarifFor(m: Module, tarif_type: "b2b" | "b2c" | "devis"): string {
  if (tarif_type === "b2b") return m.tarif_b2b ?? "—";
  if (tarif_type === "b2c") return m.tarif_b2c ?? "—";
  return m.tarif_devis ?? "Sur devis";
}

/** Génère un code d'accès lisible, ex. EBZ-A1B2-C3D4. */
export function generateAccessCode(): string {
  const raw = randomBytes(4).toString("hex").toUpperCase();
  return `EBZ-${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
}

import { randomInt } from "node:crypto";

/** Alphabet sans caractères ambigus (0/O, 1/I). */
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/** Identifiant de demande lisible : « SRV-2026-K7M3QF », « COL-2026-… ». */
export function genererReference(prefixe: "SRV" | "COL"): string {
  let suffixe = "";
  for (let i = 0; i < 6; i++) suffixe += ALPHABET[randomInt(ALPHABET.length)];
  return `${prefixe}-${new Date().getFullYear()}-${suffixe}`;
}

import { getPayload, type Payload } from "payload";
import config from "@payload-config";

/**
 * Client Payload (API locale, sans HTTP). Singleton géré par Payload.
 * L'API locale contourne le contrôle d'accès : réservée au code serveur.
 */
export function payloadClient(): Promise<Payload> {
  return getPayload({ config });
}

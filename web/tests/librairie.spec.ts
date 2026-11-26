import { createHmac } from "crypto";
import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * Recette automatisée de la librairie (Lot 3) : parcours numérique (Chariow) et
 * parcours imprimé (commande, paiement simulé, suivi, expédition).
 *
 * Serveur déjà démarré, paiement SIMULÉ (LIBRAIRIE_PAIEMENT non défini) :
 *   BASE=http://localhost:3005 ADMIN_EMAIL=… ADMIN_PASSWORD=… \
 *   [CHARIOW_PULSE_SECRET=<même valeur que le serveur>] npx playwright test tests/librairie.spec.ts
 */
const BASE = process.env.BASE ?? "http://localhost:3005";
const EMAIL = process.env.ADMIN_EMAIL ?? "admin@example.com";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "admin-dev-123";
const LIEN_CHARIOW = "https://chariow.example/produit-test-tome-i";
const AUTEUR = "Gaudéric MAMBOU — Juriste, Chercheur indépendant en épistémologie juridique";

test.describe.configure({ mode: "serial", timeout: 300_000 });

type Doc = Record<string, unknown> & { id: string };
let jeton = "";
let ouvrageId = "";
let ouvrageAvant: Doc;
let reglagesAvant: { zones?: Record<string, unknown>[] };

const entetes = () => ({ Authorization: `JWT ${jeton}` });

async function api(request: APIRequestContext, methode: "get" | "post" | "patch", chemin: string, data?: unknown) {
  const res = await request[methode](`${BASE}/api${chemin}`, { headers: entetes(), data });
  expect(res.ok(), `${methode.toUpperCase()} ${chemin} → ${res.status()}`).toBe(true);
  return res.json();
}

test.beforeAll(async ({ request }) => {
  test.setTimeout(240_000); // première compilation à froid du serveur de développement
  const login = await request.post(`${BASE}/api/users/login`, { data: { email: EMAIL, password: PASSWORD } });
  expect(login.ok(), "connexion administrateur").toBe(true);
  jeton = (await login.json()).token;

  const liste = await api(request, "get", "/ouvrages?where[tome][equals]=tome-i&limit=1&depth=0");
  ouvrageAvant = liste.docs[0];
  ouvrageId = ouvrageAvant.id;
  await api(request, "patch", `/ouvrages/${ouvrageId}`, {
    numerique: { ...(ouvrageAvant.numerique as object), lien_chariow: LIEN_CHARIOW, produit_chariow: "prd_test_tome_i" },
    imprime: { actif: true, prix: 30, delai_production: "10 à 15 jours ouvrés" },
  });

  reglagesAvant = await api(request, "get", "/globals/librairie-reglages?depth=0");
  const zones = (reglagesAvant.zones ?? []).map((z) =>
    z.pays === "CG" ? { ...z, frais_premier: 5, frais_supplementaire: 2, delai: "7 à 14 jours" } : { ...z, frais_premier: null, frais_supplementaire: null },
  );
  await api(request, "post", "/globals/librairie-reglages", { zones });
});

test.afterAll(async ({ request }) => {
  test.setTimeout(180_000);
  if (!ouvrageAvant) return;
  // Remise de l'état d'origine : édition imprimée fermée, sans lien d'essai.
  await api(request, "patch", `/ouvrages/${ouvrageId}`, {
    numerique: ouvrageAvant.numerique,
    imprime: ouvrageAvant.imprime,
  });
  await api(request, "post", "/globals/librairie-reglages", { zones: reglagesAvant.zones ?? [] });
});

test("fiche du tome : couverture, auteur exact, formats et prix distincts", async ({ page }) => {
  await page.goto(`${BASE}/librairie/tome-i`);
  await expect(page.getByTestId("auteur")).toHaveText(AUTEUR);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Maât : théorie de l’intelligibilité");

  // Couverture sans déformation : rapport affiché = rapport du fichier.
  const img = page.locator("img.lib-couverture");
  await expect(img).toBeVisible();
  const [nat, rendu] = await img.evaluate((el: HTMLImageElement) => [
    el.naturalWidth / el.naturalHeight,
    el.getBoundingClientRect().width / el.getBoundingClientRect().height,
  ]);
  expect(Math.abs(nat - rendu)).toBeLessThan(0.02);

  // Deux formats, deux prix, mention de livraison séparée.
  const num = page.locator('[data-format="numerique"]');
  const imp = page.locator('[data-format="imprime"]');
  await expect(num).toContainText("69 €");
  await expect(imp).toContainText("30 €");
  await expect(imp).toContainText("Frais de livraison");

  // Aucun lien vers un PDF sur la fiche.
  expect(await page.locator('a[href$=".pdf" i]').count()).toBe(0);
});

test("circuit numérique : le bouton mène au parcours Chariow du tome", async ({ page }) => {
  await page.goto(`${BASE}/librairie/tome-i`);
  const bouton = page.getByRole("link", { name: "Acheter la version numérique" });
  await expect(bouton).toHaveAttribute("href", LIEN_CHARIOW);
  await expect(bouton).toHaveAttribute("target", "_blank");
  await expect(bouton).toHaveAttribute("rel", /noopener/);
});

test("Chariow : une notification signée enregistre la vente (idempotente)", async ({ request }) => {
  const secret = process.env.CHARIOW_PULSE_SECRET;
  test.skip(!secret, "CHARIOW_PULSE_SECRET absent : webhook non testable.");
  const venteId = `sal_test_${Date.now()}`;
  const corps = JSON.stringify({
    event: "successful.sale",
    sale: {
      id: venteId,
      amount: { value: 69, currency: "EUR" },
      settlement: { amount: 60, fee: 9 },
      status: "completed",
      completed_at: new Date().toISOString(),
    },
    product: { id: "prd_test_tome_i", name: "Tome I — PDF" },
    customer: { name: "Acheteur Test", email: `chariow-${Date.now()}@example.com`, country: "FR" },
  });
  const signature = `sha256=${createHmac("sha256", secret!).update(corps).digest("hex")}`;
  const envoyer = (sig: string) =>
    request.post(`${BASE}/api/webhook/chariow-ventes`, {
      headers: { "content-type": "application/json", "x-chariow-signature": sig, "x-pulse-delivery-id": "dlv_1", "x-pulse-event": "successful.sale" },
      data: corps,
    });

  expect((await envoyer("sha256=" + "0".repeat(64))).status()).toBe(401);
  expect((await envoyer(signature)).ok()).toBe(true);
  const rejeu = await (await envoyer(signature)).json();
  expect(rejeu.doublon).toBe(true);

  const ventes = await api(request, "get", `/ventes-numeriques?where[vente_id][equals]=${venteId}&depth=0`);
  expect(ventes.totalDocs).toBe(1);
  expect(ventes.docs[0].tome).toBe("tome-i");
  expect(ventes.docs[0].statut).toBe("payee");
});

test("circuit imprimé : commande, paiement, suivi jusqu'à l'expédition", async ({ page, request }) => {
  const email = `acheteur-${Date.now()}@example.com`;
  await page.goto(`${BASE}/librairie/tome-i`);
  await page.getByRole("link", { name: "Commander l’édition imprimée" }).click();
  await page.waitForURL(/\/librairie\/tome-i\/commande$/, { timeout: 90_000 }); // compilation à froid en dev

  await page.getByLabel("Nombre d’exemplaires").fill("2");
  await page.getByLabel("Nom complet").fill("Acheteuse de Recette");
  await page.getByLabel("Adresse e-mail").fill(email);
  await page.getByLabel("Téléphone").fill("+242 06 000 00 00");
  await page.getByLabel("Adresse", { exact: true }).fill("12 avenue de la Recette");
  await page.getByLabel("Ville").fill("Brazzaville");
  await page.getByLabel("Pays").selectOption("CG");

  // 2 × 30 € + (5 € + 2 €) de livraison.
  await expect(page.getByTestId("frais")).toHaveText("7 €");
  await expect(page.getByTestId("total")).toHaveText("67 €");

  // Un pays sans tarif n'est pas proposé : message et bouton inactif.
  await page.getByLabel("Pays").selectOption("FR");
  await expect(page.getByRole("alert").first()).toContainText("n’est pas encore proposée");
  await expect(page.getByRole("button", { name: "Payer la commande" })).toBeDisabled();
  await page.getByLabel("Pays").selectOption("CG");

  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Payer la commande" }).click();

  // Paiement simulé : retour sur la page de suivi, commande payée.
  await page.waitForURL(/\/librairie\/commande\/[0-9a-f-]{36}$/, { timeout: 180_000, waitUntil: "commit" });
  await expect(page.getByTestId("statut")).toContainText("Payée", { timeout: 120_000 });
  const id = page.url().split("/").pop()!;

  const commande = await api(request, "get", `/commandes-ouvrages/${id}?depth=0`);
  expect(commande.numero).toMatch(/^LP-\d{6}-[0-9A-F]{6}$/);
  expect(commande.total).toBe(67);
  expect(commande.frais_livraison).toBe(7);
  expect(commande.quantite).toBe(2);
  expect(commande.statut).toBe("payee");

  const paiements = await api(request, "get", `/paiements-ouvrages?where[commande][equals]=${id}&depth=0`);
  expect(paiements.docs[0].statut).toBe("accepte");
  const acheteurs = await api(request, "get", `/acheteurs?where[email][equals]=${encodeURIComponent(email)}&depth=0`);
  expect(acheteurs.totalDocs).toBe(1);

  // Suivi administratif : impression puis expédition avec numéro de suivi.
  await api(request, "patch", `/commandes-ouvrages/${id}`, { statut: "en_impression" });
  await page.reload();
  await expect(page.getByTestId("statut")).toContainText("En impression", { timeout: 120_000 });
  await api(request, "patch", `/commandes-ouvrages/${id}`, { statut: "expediee", transporteur: "Transporteur Test", numero_suivi: "TRK123" });
  await page.reload();
  await expect(page.getByTestId("statut")).toContainText("Expédiée", { timeout: 120_000 });
  await expect(page.getByText("TRK123")).toBeVisible();
});

test("l'API refuse une commande sans tarif de livraison ou invalide", async ({ request }) => {
  const base = {
    tome: "tome-i", quantite: 1, nom: "Test Recette", email: "x@example.com", telephone: "0600000000",
    adresse1: "1 rue Test", ville: "Paris", consentement: true,
  };
  const sansTarif = await request.post(`${BASE}/api/librairie/commande`, { data: { ...base, pays: "FR" } });
  expect(sansTarif.status()).toBe(422);
  const sansConsentement = await request.post(`${BASE}/api/librairie/commande`, { data: { ...base, pays: "CG", consentement: false } });
  expect(sansConsentement.status()).toBe(422);
});

test("réclamation : le message est enregistré", async ({ page, request }) => {
  await page.goto(`${BASE}/librairie/reclamation`);
  await page.getByLabel("Nom complet").fill("Lectrice de Recette");
  await page.getByLabel("Adresse e-mail").fill("lectrice@example.com");
  await page.getByLabel("Objet").fill("Question de recette");
  await page.getByLabel("Message").fill("Message de test de la recette automatisée.");
  await page.getByRole("button", { name: "Envoyer" }).click();
  await expect(page.getByTestId("reclamation-ok")).toBeVisible({ timeout: 90_000 });
  const r = await api(request, "get", "/reclamations?where[objet][equals]=Question de recette&depth=0");
  expect(r.totalDocs).toBeGreaterThan(0);
});

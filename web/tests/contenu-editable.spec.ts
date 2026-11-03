import { test, expect, type Page } from "@playwright/test";

/**
 * Parcours complet d'édition de contenu depuis le back-office Payload :
 * modifier → enregistrer → vérifier sur le site → vider le champ → retour au
 * texte d'origine (JSX) au pixel près.
 *
 * Lancer avec le serveur déjà démarré :
 *   BASE=http://localhost:3000 ADMIN_EMAIL=… ADMIN_PASSWORD=… npx playwright test tests/contenu-editable.spec.ts
 */

// localhost (et non 127.0.0.1) : en dev, Next bloque ses ressources aux autres origines.
const BASE = process.env.BASE ?? "http://localhost:3000";
const EMAIL = process.env.ADMIN_EMAIL ?? "admin@example.com";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "admin-dev-123";
const CLE = "manifeste.diagnostic.corps";
const PAGE_ADMIN = `${BASE}/admin/globals/contenu-manifeste`;
const PHRASE = "Phrase ajoutée par la recette automatisée.";

async function connexion(page: Page) {
  await page.goto(`${BASE}/admin/login`);
  await page.fill('input[name="email"]', EMAIL);
  await page.fill('input[name="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/admin\/?$/);
}

/** Éditeur Lexical du champ « Le diagnostic — corps de texte ». */
function editeur(page: Page) {
  return page
    .locator(".field-type.rich-text-lexical")
    .filter({ hasText: "Le diagnostic — corps de texte" })
    .locator("[contenteditable='true']");
}

async function enregistrer(page: Page) {
  await page.getByRole("button", { name: "Sauvegarder" }).click();
  await expect(page.getByText(/mis à jour avec succès/i)).toBeVisible();
}

test("le back-office modifie un bloc, le publie, puis revient au texte d'origine", async ({
  page,
}) => {
  test.setTimeout(180_000);

  // Texte d'origine, tel que servi au visiteur.
  await page.goto(`${BASE}/manifeste`);
  const htmlOrigine = await page.locator(`[data-bloc="${CLE}"]`).innerHTML();
  expect(htmlOrigine).toContain("La science contemporaine");
  expect(htmlOrigine).not.toContain(PHRASE);

  await connexion(page);

  // L'éditeur est amorcé avec le texte réellement affiché sur la page.
  await page.goto(PAGE_ADMIN);
  await expect(editeur(page)).toContainText("La science contemporaine");

  // Ajout d'une phrase en fin de bloc, puis enregistrement.
  await editeur(page).click();
  await page.keyboard.press("Control+End");
  await page.keyboard.press("Enter");
  await page.keyboard.type(PHRASE);
  await enregistrer(page);

  // La page publique porte la modification.
  await page.goto(`${BASE}/manifeste`);
  await expect(page.locator(`[data-bloc="${CLE}"]`)).toContainText(PHRASE);

  // Champ vidé → retour au JSX d'origine, à l'identique.
  await page.goto(PAGE_ADMIN);
  await editeur(page).click();
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Delete");
  await enregistrer(page);

  await page.goto(`${BASE}/manifeste`);
  expect(await page.locator(`[data-bloc="${CLE}"]`).innerHTML()).toBe(htmlOrigine);
});

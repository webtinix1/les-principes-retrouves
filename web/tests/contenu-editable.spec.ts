import { test, expect } from "@playwright/test";

/**
 * Parcours complet d'édition de contenu depuis le back-office :
 * modifier → publier → vérifier sur le site → revenir au texte d'origine.
 *
 * Lancer avec le serveur déjà démarré :
 *   BASE=http://127.0.0.1:3100 npx playwright test tests/contenu-editable.spec.ts
 */

const BASE = process.env.BASE ?? "http://127.0.0.1:3100";
const CLE = "manifeste.diagnostic.corps";
const PHRASE = "Phrase ajoutée par la recette automatisée.";

/** Rend la recette rejouable : repart toujours du texte d'origine. */
test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE}/admin/contenu/${encodeURIComponent(CLE)}`);
  const retour = page.getByRole("button", { name: "Revenir au texte d'origine" });
  if (await retour.isVisible()) {
    await retour.click();
    await expect(page.getByText("Le texte d'origine est de nouveau")).toBeVisible();
  }
});

test("le back-office modifie un bloc, le publie, puis restaure l'original", async ({
  page,
}) => {
  // Texte d'origine, tel que servi au visiteur avant toute modification.
  await page.goto(`${BASE}/manifeste`);
  const bloc = page.locator(`[data-bloc="${CLE}"]`);
  const origine = (await bloc.innerText()).trim();
  expect(origine).toContain("La science contemporaine");
  expect(origine).not.toContain(PHRASE);

  // Le bloc est listé et signalé « texte d'origine ».
  await page.goto(`${BASE}/admin/contenu`);
  const ligne = page.locator(`a[href*="${encodeURIComponent(CLE)}"]`);
  await expect(ligne).toContainText("texte d'origine");
  await ligne.click();

  // L'éditeur est amorcé avec le texte réellement affiché sur la page.
  const editeur = page.locator(".ProseMirror");
  await expect(editeur).toContainText("La science contemporaine");

  // Ajout d'une phrase en fin de bloc, puis publication.
  await editeur.click();
  await page.keyboard.press("Control+End");
  await page.keyboard.press("Enter");
  await page.keyboard.type(PHRASE);
  await page.getByRole("button", { name: "Enregistrer et publier" }).click();
  await expect(page.getByText("Modification enregistrée")).toBeVisible();

  // La page publique porte la modification.
  await page.goto(`${BASE}/manifeste`);
  await expect(page.locator(`[data-bloc="${CLE}"]`)).toContainText(PHRASE);

  // L'historique conserve une entrée marquée « texte d'origine ».
  await page.goto(`${BASE}/admin/contenu/${encodeURIComponent(CLE)}`);
  await expect(
    page.locator("li").filter({ hasText: "— texte d'origine" }),
  ).toHaveCount(1);

  // Retour à l'original.
  await page.getByRole("button", { name: "Revenir au texte d'origine" }).click();
  await expect(page.getByText("Le texte d'origine est de nouveau")).toBeVisible();

  await page.goto(`${BASE}/manifeste`);
  const apres = (await page.locator(`[data-bloc="${CLE}"]`).innerText()).trim();
  expect(apres).not.toContain(PHRASE);
  expect(apres).toBe(origine);
});

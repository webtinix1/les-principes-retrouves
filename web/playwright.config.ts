import { defineConfig } from "@playwright/test";

/** Tests de bout en bout (serveur déjà démarré, cf. tests/*.spec.ts et la CI). */
export default defineConfig({
  testDir: "tests",
  expect: { timeout: 90_000 },
  reporter: process.env.CI ? [["list"], ["github"]] : "list",
  use: {
    trace: "retain-on-failure",
    // PW_CHANNEL=chrome : utilise le Chrome installé (aucun navigateur à télécharger).
    ...(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {}),
    // Navigateur local déjà installé (PW_CHROMIUM_PATH), sinon celui de Playwright.
    ...(process.env.PW_CHROMIUM_PATH ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } } : {}),
  },
});

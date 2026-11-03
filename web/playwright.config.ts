import { defineConfig } from "@playwright/test";

/** Tests de bout en bout (serveur déjà démarré, cf. tests/*.spec.ts et la CI). */
export default defineConfig({
  testDir: "tests",
  reporter: process.env.CI ? [["list"], ["github"]] : "list",
  use: { trace: "retain-on-failure" },
});

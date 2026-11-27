import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * Recette du blog : un article publié apparaît sur /blog, sur sa page et parmi
 * les trois articles du Fronton (mis en avant) ; un brouillon n'apparaît nulle part.
 *
 *   BASE=http://localhost:3006 ADMIN_EMAIL=… ADMIN_PASSWORD=… npx playwright test tests/blog.spec.ts
 */
const BASE = process.env.BASE ?? "http://localhost:3006";
const EMAIL = process.env.ADMIN_EMAIL ?? "admin@example.com";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "admin-dev-123";

test.describe.configure({ mode: "serial", timeout: 240_000 });

const suffixe = Date.now().toString(36);
const PUBLIE = `Recette du blog ${suffixe}`;
const BROUILLON = `Brouillon de recette ${suffixe}`;
let jeton = "";
const crees: string[] = [];

const corps = (texte: string) => ({
  root: {
    type: "root",
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr",
    children: [
      {
        type: "paragraph",
        version: 1,
        format: "",
        indent: 0,
        direction: "ltr",
        textFormat: 0,
        children: [{ type: "text", version: 1, text: texte, format: 0, detail: 0, mode: "normal", style: "" }],
      },
    ],
  },
});

async function creer(request: APIRequestContext, data: Record<string, unknown>) {
  const res = await request.post(`${BASE}/api/articles`, { headers: { Authorization: `JWT ${jeton}` }, data });
  expect(res.ok(), `création d'article → ${res.status()}`).toBe(true);
  const { doc } = await res.json();
  crees.push(doc.id);
  return doc as { id: string; slug: string };
}

test.beforeAll(async ({ request }) => {
  test.setTimeout(240_000);
  const login = await request.post(`${BASE}/api/users/login`, { data: { email: EMAIL, password: PASSWORD } });
  expect(login.ok(), "connexion administrateur").toBe(true);
  jeton = (await login.json()).token;
});

test.afterAll(async ({ request }) => {
  for (const id of crees) {
    await request.delete(`${BASE}/api/articles/${id}`, { headers: { Authorization: `JWT ${jeton}` } });
  }
});

test("article publié : blog, page de l'article et Fronton ; brouillon invisible", async ({ page, request }) => {
  const article = await creer(request, {
    titre: PUBLIE,
    chapo: "Résumé de l’article de recette.",
    corps: corps("Corps de l’article de recette."),
    statut: "publie",
    mis_en_avant: true,
    date_publication: new Date().toISOString(),
  });
  await creer(request, {
    titre: BROUILLON,
    chapo: "Ne doit pas apparaître.",
    corps: corps("Brouillon."),
    statut: "brouillon",
    mis_en_avant: true,
  });
  expect(article.slug).toBe(`recette-du-blog-${suffixe}`);

  await page.goto(`${BASE}/blog`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Le blog");
  await expect(page.getByRole("link", { name: PUBLIE, exact: true })).toBeVisible();
  await expect(page.getByText(BROUILLON)).toHaveCount(0);

  await page.getByRole("link", { name: PUBLIE, exact: true }).click();
  await expect(page).toHaveURL(`${BASE}/blog/${article.slug}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(PUBLIE);
  await expect(page.getByText("Corps de l’article de recette.")).toBeVisible();

  await page.goto(`${BASE}/`);
  const une = page.locator(".fronton-blog");
  await expect(une.getByRole("link", { name: PUBLIE, exact: true })).toBeVisible();
  expect(await une.locator(".blog-carte").count()).toBeLessThanOrEqual(3);
  await expect(une.getByText(BROUILLON)).toHaveCount(0);
  await expect(une.getByRole("link", { name: /Tous les articles du blog/ })).toHaveAttribute("href", "/blog");

  // Pied de page : lien vers le blog.
  await expect(page.locator("footer").getByRole("link", { name: "Le blog" })).toHaveAttribute("href", "/blog");

  // Brouillon : page introuvable.
  const r = await request.get(`${BASE}/blog/brouillon-de-recette-${suffixe}`);
  expect(r.status()).toBe(404);
});

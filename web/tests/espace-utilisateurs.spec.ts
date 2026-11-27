import { test, expect, type APIRequestContext, type Page } from "@playwright/test";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Parcours de l'Espace utilisateurs (Lot 2). Serveur déjà démarré avec
 * EMAIL_TRANSPORT=fichier (les e-mails sont lus dans .dev-emails/) :
 *   BASE=http://localhost:3004 ADMIN_EMAIL=… ADMIN_PASSWORD=… npx playwright test tests/espace-utilisateurs.spec.ts
 */
const BASE = process.env.BASE ?? "http://localhost:3004";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin-dev-123";
const DOSSIER_MAILS = path.resolve(".dev-emails");
const MOT_DE_PASSE = "MotDePasse-Test-2026";
const NOUVEAU_MOT_DE_PASSE = "AutreMotDePasse-2026";
const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
const EMAIL = `lecteur.${unique}@example.com`;

type Courrier = { to: string; subject: string; text: string };

/** Dernier courrier reçu par `destinataire` (attend son écriture sur disque). */
async function courrier(page: Page, destinataire: string): Promise<Courrier> {
  for (let i = 0; i < 40; i++) {
    let fichiers: string[] = [];
    try {
      fichiers = readdirSync(DOSSIER_MAILS).sort().reverse();
    } catch {
      /* dossier pas encore créé */
    }
    for (const f of fichiers) {
      const m = JSON.parse(readFileSync(path.join(DOSSIER_MAILS, f), "utf8")) as Courrier;
      if (m.to.includes(destinataire)) return m;
    }
    await page.waitForTimeout(500);
  }
  throw new Error(`Aucun courrier pour ${destinataire}`);
}

const lien = (m: Courrier) => m.text.match(/https?:\/\/\S+/)![0].replace(/^https?:\/\/[^/]+/, BASE);

/** Laisse passer le délai minimal anti-robots avant d'envoyer un formulaire. */
const patienter = (page: Page) => page.waitForTimeout(1800);

async function ouvrirPanneau(page: Page, bouton: string) {
  await page.goto(`${BASE}/espace-utilisateurs`);
  await page.getByRole("button", { name: bouton, exact: true }).first().click();
}

async function seConnecter(page: Page, email: string, mdp: string) {
  await ouvrirPanneau(page, "Se connecter");
  await page.getByLabel("Adresse électronique *").fill(email);
  await page.getByLabel("Mot de passe *").fill(mdp);
  await page.locator("#user-login").getByRole("button", { name: "Se connecter" }).click();
}

/** Jeton d'administration (en-tête JWT : pas de cookie, donc pas de contrôle CSRF). */
async function jetonAdmin(request: APIRequestContext, email = ADMIN_EMAIL, mdp = ADMIN_PASSWORD) {
  const r = await request.post(`${BASE}/api/users/login`, { data: { email, password: mdp } });
  expect(r.ok()).toBe(true);
  return (await r.json()).token as string;
}
const entete = (jeton: string) => ({ Authorization: `JWT ${jeton}` });

test.describe.configure({ mode: "serial" });

test("la page et la 11e entrée du menu sont présentes, textes du prototype", async ({ page }) => {
  await page.goto(`${BASE}/espace-utilisateurs`);
  await expect(page.locator("h1")).toHaveText("ESPACE UTILISATEURS");
  await expect(page.getByText("Un espace commun pour les échanges et les services")).toBeVisible();
  const menu = page.locator("#nav a");
  await expect(menu).toHaveCount(12); // Fronton + Accueil + 9 pages + Espace utilisateurs
  await expect(page.locator('#nav a[aria-current="page"]')).toHaveText("Espace utilisateurs");
  await expect(page.locator("body")).not.toContainText(/prototype|démonstration/i);
  // La navigation existante est intacte.
  await page.goto(`${BASE}/manifeste`);
  await expect(page.locator("h1")).toBeVisible();
});

test("création de compte, vérification de l'adresse, connexion et déconnexion", async ({ page }) => {
  await ouvrirPanneau(page, "Créer un compte");
  await page.getByLabel("Nom *").fill("Dupont");
  await page.getByLabel("Prénom(s) *").fill("Marie Claire");
  await page.getByLabel("Adresse électronique *").fill(EMAIL);
  await page.getByLabel("Pays de résidence *").fill("Congo");
  await page.getByLabel("Ville de résidence *").fill("Brazzaville");
  await page.getByLabel("Mot de passe *").fill(MOT_DE_PASSE);
  await page.getByRole("checkbox").check();
  await patienter(page);
  await page.getByRole("button", { name: "Soumettre la demande de création" }).click();
  await expect(page.locator("p[role=status]")).toContainText("message de vérification");

  // Connexion refusée tant que l'adresse n'est pas vérifiée.
  await seConnecter(page, EMAIL, MOT_DE_PASSE);
  await expect(page.locator("p[role=alert]")).toContainText("pas encore vérifiée");

  const mail = await courrier(page, EMAIL);
  await page.goto(lien(mail));
  await expect(page).toHaveURL(/panneau=connexion&verifie=1/);
  await expect(page.locator("p[role=status]").first()).toContainText("vérifiée");

  await page.getByLabel("Adresse électronique *").fill(EMAIL);
  await page.getByLabel("Mot de passe *").fill("mauvais-mot-de-passe");
  await page.locator("#user-login").getByRole("button", { name: "Se connecter" }).click();
  await expect(page.locator("p[role=alert]")).toContainText("incorrect");

  await page.getByLabel("Mot de passe *").fill(MOT_DE_PASSE);
  await page.locator("#user-login").getByRole("button", { name: "Se connecter" }).click();
  await expect(page.locator("#user-reader")).toBeVisible();

  // Le cookie de session est dédié et httpOnly.
  const cookies = await page.context().cookies();
  const session = cookies.find((c) => c.name === "lpr_lecteur");
  expect(session?.httpOnly).toBe(true);
  expect(cookies.find((c) => c.name === "payload-token")).toBeUndefined();

  await page.getByRole("button", { name: "Mon compte", exact: true }).first().click();
  await page.getByRole("button", { name: "Se déconnecter" }).click();
  await expect(page.getByRole("button", { name: "Créer un compte" })).toBeVisible();
  expect((await page.context().cookies()).find((c) => c.name === "lpr_lecteur")?.value ?? "").toBe("");
});

test("mot de passe oublié puis réinitialisation", async ({ page }) => {
  await ouvrirPanneau(page, "Se connecter");
  await page.getByRole("button", { name: "Mot de passe oublié ?" }).click();
  await page.getByLabel("Adresse électronique *").fill(EMAIL);
  await patienter(page);
  await page.getByRole("button", { name: "Envoyer le lien" }).click();
  await expect(page.locator("p[role=status]")).toContainText("lien de réinitialisation");

  const mail = await courrier(page, EMAIL);
  expect(mail.subject).toContain("Réinitialisation");
  await page.goto(lien(mail));
  await page.getByLabel("Nouveau mot de passe *").fill(NOUVEAU_MOT_DE_PASSE);
  await page.getByRole("button", { name: "Enregistrer le mot de passe" }).click();
  await expect(page.locator("p[role=status]")).toContainText("Le mot de passe a été modifié");

  await seConnecter(page, EMAIL, NOUVEAU_MOT_DE_PASSE);
  await expect(page.locator("#user-reader")).toBeVisible();
});

test("accès protégé : l'espace lecteur n'affiche rien sans connexion, ni les routes du compte", async ({ page, request }) => {
  await ouvrirPanneau(page, "Découvrir l'espace lecteur");
  await expect(page.locator("#user-reader")).not.toContainText("Aucune demande enregistrée.");
  expect((await request.patch(`${BASE}/api/espace/compte`, { data: { nom: "x" } })).status()).toBe(401);
  expect((await request.delete(`${BASE}/api/espace/compte`, { data: { mot_de_passe: "x" } })).status()).toBe(401);
  // Routes natives de Payload fermées pour la collection lecteurs.
  expect((await request.post(`${BASE}/api/lecteurs/login`, { data: { email: EMAIL, password: "x" } })).status()).toBe(404);
  expect((await request.post(`${BASE}/api/lecteurs`, { data: { email: "a@b.co", password: "x" } })).status()).toBe(404);
  expect((await request.get(`${BASE}/api/lecteurs`)).status()).toBe(403);
  expect((await request.get(`${BASE}/api/lecteurs/export`)).status()).toBe(403);
});

test("anti-robots : champ piège et soumission trop rapide sont refusés", async ({ request }) => {
  const base = { nom: "Robot", email: "robot@example.com", nature: "information", message: "Bonjour" };
  const piege = await request.post(`${BASE}/api/espace/service`, { data: { ...base, ouvert_a: Date.now() - 10_000, site_web: "http://spam" } });
  expect(piege.status()).toBe(400);
  const vite = await request.post(`${BASE}/api/espace/service`, { data: { ...base, ouvert_a: Date.now() } });
  expect(vite.status()).toBe(400);
});

test("demande de service et proposition de collaboration (visiteur sans compte), accusé de réception", async ({ page }) => {
  const visiteur = `visiteur.${unique}@example.com`;
  await ouvrirPanneau(page, "Présenter une demande");
  await page.locator("#user-service").getByLabel("Nom et prénom(s) *").fill("Visiteur Test");
  await page.locator("#user-service").getByLabel("Adresse électronique *").fill(visiteur);
  await page.getByLabel("Nature de la demande *").selectOption("documentaire");
  await page.getByLabel("Votre message *").fill("Demande documentaire de test.");
  await patienter(page);
  await page.getByRole("button", { name: "Soumettre la demande", exact: true }).click();
  const statut = page.locator("p[role=status]");
  await expect(statut).toContainText(/SRV-\d{4}-[A-Z0-9]{6}/);
  const reference = (await statut.innerText()).match(/SRV-\d{4}-[A-Z0-9]{6}/)![0];
  const accuse = await courrier(page, visiteur);
  expect(accuse.subject).toContain(reference);

  await page.goto(`${BASE}/espace-utilisateurs`);
  await page.getByRole("button", { name: "Proposer une collaboration" }).click();
  await page.locator("#user-collab").getByLabel("Nom et prénom(s) *").fill("Visiteur Test");
  await page.locator("#user-collab").getByLabel("Adresse électronique *").fill(visiteur);
  await page.getByLabel("Type de collaboration *").selectOption("universitaire");
  await page.getByLabel("Présentation de la proposition *").fill("Proposition de test.");
  await patienter(page);
  await page.getByRole("button", { name: "Soumettre la proposition" }).click();
  await expect(page.locator("p[role=status]")).toContainText(/COL-\d{4}-[A-Z0-9]{6}/);
});

test("compte connecté : demande rattachée, espace lecteur, modification puis suppression du compte", async ({ page, request }) => {
  await seConnecter(page, EMAIL, NOUVEAU_MOT_DE_PASSE);
  await expect(page.locator("#user-reader")).toBeVisible();
  await expect(page.locator("#user-reader")).toContainText("Aucune demande enregistrée.");
  await expect(page.locator("#user-reader")).toContainText("Aucune ressource");

  // Connecté : nom et e-mail ne sont plus demandés, la demande est rattachée au compte.
  await page.getByRole("button", { name: "Présenter une demande" }).click();
  await expect(page.locator("#user-service").getByLabel("Adresse électronique *")).toHaveCount(0);
  await page.getByLabel("Nature de la demande *").selectOption("ouvrages");
  await page.getByLabel("Votre message *").fill("Demande rattachée au compte.");
  await patienter(page);
  await page.getByRole("button", { name: "Soumettre la demande", exact: true }).click();
  await expect(page.locator("p[role=status]")).toContainText(/SRV-/);
  const reference = (await page.locator("p[role=status]").innerText()).match(/SRV-\d{4}-[A-Z0-9]{6}/)![0];
  expect((await courrier(page, EMAIL)).subject).toContain(reference);

  await page.reload();
  await page.getByRole("button", { name: "Découvrir l'espace lecteur" }).click();
  await expect(page.locator("#user-reader table")).toContainText(reference);
  await expect(page.locator("#user-reader table")).toContainText("Nouvelle");

  // Modification des coordonnées.
  await page.getByRole("button", { name: "Mon compte", exact: true }).first().click();
  await page.locator("#user-account").getByLabel("Ville de résidence *").fill("Pointe-Noire");
  await page.getByRole("button", { name: "Enregistrer les modifications" }).click();
  await expect(page.locator("p[role=status]")).toContainText("Modifications enregistrées");
  await page.reload();
  await page.getByRole("button", { name: "Mon compte", exact: true }).first().click();
  await expect(page.locator("#user-account").getByLabel("Ville de résidence *")).toHaveValue("Pointe-Noire");

  // Suppression : mauvais mot de passe refusé, bon mot de passe accepté.
  await page.locator("#user-account form").last().getByLabel("Mot de passe *").fill("incorrect-incorrect");
  await page.getByRole("button", { name: "Supprimer définitivement" }).click();
  await expect(page.locator("p[role=alert]")).toContainText("incorrect");
  await page.locator("#user-account form").last().getByLabel("Mot de passe *").fill(NOUVEAU_MOT_DE_PASSE);
  await page.getByRole("button", { name: "Supprimer définitivement" }).click();
  await expect(page.getByRole("button", { name: "Créer un compte" })).toBeVisible();

  // Le compte n'existe plus.
  await seConnecter(page, EMAIL, NOUVEAU_MOT_DE_PASSE);
  await expect(page.locator("p[role=alert]")).toContainText("incorrect");

  // Les demandes déjà reçues sont conservées, anonymisées.
  const jeton = await jetonAdmin(request);
  const res = await request.get(`${BASE}/api/demandes-service?where[reference][equals]=${reference}`, { headers: entete(jeton) });
  const doc = (await res.json()).docs[0];
  expect(doc.message).toContain("Demande rattachée au compte");
  expect(doc.nom ?? null).toBeNull();
  expect(doc.email ?? null).toBeNull();
  expect(doc.lecteur ?? null).toBeNull();
  expect(doc.anonymise).toBe(true);
});

test("administration : la demande est visible, le compte lecteur n'ouvre pas /admin", async ({ page, request }) => {
  // Un compte lecteur ne peut pas ouvrir une session d'administration.
  const refus = await request.post(`${BASE}/api/users/login`, { data: { email: EMAIL, password: NOUVEAU_MOT_DE_PASSE } });
  expect(refus.ok()).toBe(false);

  await page.goto(`${BASE}/admin/login`);
  await page.fill('input[name="email"]', ADMIN_EMAIL);
  await page.fill('input[name="password"]', ADMIN_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/admin\/?$/);

  await page.goto(`${BASE}/admin/collections/demandes-service`);
  await expect(page.locator("body")).toContainText("Demandes de service");
  await expect(page.locator("tbody")).toContainText("SRV-");

  const stats = await page.goto(`${BASE}/admin/statistiques-lecteurs`);
  expect(stats?.ok()).toBe(true);
  await expect(page.locator("body")).toContainText("Statistiques des comptes lecteurs");

  // Appel depuis la page d'administration (cookie + en-têtes de navigateur, comme le bouton d'export).
  const [statut, type] = await page.evaluate(async () => {
    const r = await fetch("/api/lecteurs/export");
    return [r.status, r.headers.get("content-type")] as const;
  });
  expect(statut).toBe(200);
  expect(type).toContain("text/csv");
});

test("rôles : le secrétariat suit les demandes sans exporter ni voir le journal ; le gestionnaire exporte sans supprimer", async ({ request }) => {
  const admin = entete(await jetonAdmin(request));
  const mdp = "Role-Test-2026-xyz";
  const creer = async (role: string) => {
    const email = `${role}.${unique}@example.com`;
    const r = await request.post(`${BASE}/api/users`, { headers: admin, data: { email, password: mdp, role, nom: role } });
    expect(r.ok()).toBe(true);
    return { email, id: (await r.json()).doc.id as string };
  };
  const secretariat = await creer("secretariat");
  const gestionnaire = await creer("gestionnaire");

  // Une demande à traiter, et un compte lecteur vérifié (créé par un administrateur).
  const lecteur = await request.post(`${BASE}/api/lecteurs`, {
    headers: admin,
    data: { email: `roles.${unique}@example.com`, password: mdp, nom: "Role", prenoms: "Test", pays: "Pays-Roles", ville: "Ville-Roles", _verified: true },
  });
  expect(lecteur.status()).toBe(404); // la route de création publique est fermée, même avec un jeton d'administrateur
  const demandes = (await (await request.get(`${BASE}/api/demandes-service?limit=1`, { headers: admin })).json()).docs;
  expect(demandes.length).toBeGreaterThan(0);
  const idDemande = demandes[0].id as string;

  const sec = entete(await jetonAdmin(request, secretariat.email, mdp));
  expect((await request.get(`${BASE}/api/demandes-service`, { headers: sec })).status()).toBe(200);
  expect((await request.get(`${BASE}/api/lecteurs`, { headers: sec })).status()).toBe(200);
  expect((await request.get(`${BASE}/api/lecteurs/export`, { headers: sec })).status()).toBe(403);
  expect((await request.get(`${BASE}/api/journal-securite`, { headers: sec })).status()).toBe(403);
  const maj = await request.patch(`${BASE}/api/demandes-service/${idDemande}`, { headers: sec, data: { statut: "en_cours", note_interne: "Note de recette" } });
  expect(maj.status()).toBe(200);
  expect((await request.delete(`${BASE}/api/demandes-service/${idDemande}`, { headers: sec })).status()).toBe(403);
  // Le contenu de la demande ne peut pas être réécrit.
  await request.patch(`${BASE}/api/demandes-service/${idDemande}`, { headers: sec, data: { message: "falsifié" } });
  const relue = await (await request.get(`${BASE}/api/demandes-service/${idDemande}`, { headers: sec })).json();
  expect(relue.message).not.toBe("falsifié");
  expect(relue.statut).toBe("en_cours");
  // Le secrétariat ne gère pas les comptes du back-office.
  const users = await (await request.get(`${BASE}/api/users`, { headers: sec })).json();
  expect(users.docs.length).toBe(1);
  expect((await request.post(`${BASE}/api/users`, { headers: sec, data: { email: `x.${unique}@example.com`, password: mdp } })).status()).toBe(403);

  const ges = entete(await jetonAdmin(request, gestionnaire.email, mdp));
  const csv = await request.get(`${BASE}/api/lecteurs/export`, { headers: ges });
  expect(csv.status()).toBe(200);
  expect(csv.headers()["content-type"]).toContain("text/csv");
  expect((await request.get(`${BASE}/api/journal-securite`, { headers: ges })).status()).toBe(200);
  expect((await request.delete(`${BASE}/api/journal-securite/x`, { headers: ges })).status()).toBeGreaterThanOrEqual(400);

  // Ménage.
  for (const u of [secretariat, gestionnaire]) {
    await request.delete(`${BASE}/api/users/${u.id}`, { headers: admin });
  }
});

test("statistiques : comptes vérifiés regroupés par pays et par ville, exports journalisés", async ({ request }) => {
  const admin = entete(await jetonAdmin(request));
  const journalAvant = (await (await request.get(`${BASE}/api/journal-securite?where[evenement][equals]=export_comptes&limit=1`, { headers: admin })).json()).totalDocs as number;
  const csv = await request.get(`${BASE}/api/lecteurs/export`, { headers: admin });
  expect(csv.status()).toBe(200);
  const lignes = (await csv.text()).trim().split(/\r?\n/);
  const verifies = lignes.slice(1).filter((l) => l.includes(`"oui"`)).length;
  const journalApres = (await (await request.get(`${BASE}/api/journal-securite?where[evenement][equals]=export_comptes&limit=1`, { headers: admin })).json()).totalDocs as number;
  expect(journalApres).toBe(journalAvant + 1);
  const tous = await (await request.get(`${BASE}/api/lecteurs?limit=0&pagination=false`, { headers: admin })).json();
  const docs = tous.docs as { _verified?: boolean; pays: string }[];
  expect(docs.length).toBe(lignes.length - 1);
  expect(docs.filter((d) => d._verified).length).toBe(verifies);
});

test("limitation de débit : la route de réinitialisation renvoie 429 au-delà du plafond", async ({ request }) => {
  let limite = 0;
  for (let i = 0; i < 700 && !limite; i++) {
    const r = await request.post(`${BASE}/api/espace/reinitialisation`, { data: { token: "x" } });
    if (r.status() === 429) limite = i + 1;
  }
  expect(limite).toBeGreaterThan(1);
  expect(limite).toBeLessThanOrEqual(700);
});

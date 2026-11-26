/**
 * Crée une migration Payload en répondant « create » à toutes les questions
 * « table créée ou renommée ? » de drizzle-kit (choix par défaut), lorsque le
 * terminal n'est pas interactif. À n'utiliser que quand AUCUNE table n'est
 * réellement renommée (ex. : refonte où les anciens contenus sont abandonnés).
 *
 *   node scripts/migration-sans-renommage.mjs <nom_de_migration>
 */
const nom = process.argv[2];
if (!nom) {
  console.error("Usage : node scripts/migration-sans-renommage.mjs <nom_de_migration>");
  process.exit(1);
}
process.stdin.isTTY = true;
process.stdin.setRawMode = () => process.stdin;
const entree = setInterval(
  () => process.stdin.emit("keypress", "\r", { name: "return", ctrl: false, meta: false, shift: false, sequence: "\r" }),
  250,
);
process.argv = [process.argv[0], "payload", "migrate:create", nom];
try {
  await import("../node_modules/payload/bin.js");
} finally {
  clearInterval(entree);
}

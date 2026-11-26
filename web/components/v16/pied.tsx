import Link from "next/link";
import { getListe } from "@/lib/contenu";
import { getNavigation } from "@/lib/navigation-textes";

type Contact = { titre: string; texte: string; lien: string; aria: string };

/** Pied de page du prototype V16 : contacts officiels, signature, liens légaux. */
export async function PiedV16() {
  const { footer, textes: t } = await getNavigation();
  const contacts = await getListe<Contact>("site_navigation.contacts");
  const legaux = footer.filter((l) => !l.href.includes("#"));
  return (
    <footer>
      <section className="contact-area" id="contacts-officiels" aria-labelledby="contacts-title">
        <h2 id="contacts-title">{t["v16.contact_titre"]}</h2>
        <p className="contact-intro">{t["v16.contact_intro"]}</p>
        <div className="contact-grid">
          {contacts.map((c) =>
            c.lien ? (
              <a
                key={c.titre}
                className="contact-item"
                href={c.lien}
                aria-label={c.aria || undefined}
                {...(c.lien.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <strong>{c.titre}</strong>
                <small>{c.texte}</small>
              </a>
            ) : (
              <div key={c.titre} className="contact-item pending" aria-label={c.aria || undefined}>
                <strong>{c.titre}</strong>
                <small>{c.texte}</small>
              </div>
            ),
          )}
        </div>
      </section>
      <div className="footer-inner">
        <div>
          <strong>{t["v16.signature_nom"]}</strong>
          <br />
          <small>{t["v16.signature_devise"]}</small>
        </div>
        <div>
          <small>
            {t["v16.auteur"]}
            <br />
            {t["v16.lieu"]}
          </small>
        </div>
      </div>
      <div className="footer-inner footer-legal">
        {legaux.map((l) => (
          <Link key={l.href} href={l.href}>
            <small>{l.label}</small>
          </Link>
        ))}
      </div>
    </footer>
  );
}

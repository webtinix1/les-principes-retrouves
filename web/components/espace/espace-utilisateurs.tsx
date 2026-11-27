"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export type DemandeLecteur = {
  reference: string;
  type: "service" | "collaboration";
  nature: string;
  date: string;
  statut: string;
};
export type RessourceLecteur = { reference: string; titre: string };
export type LecteurResume = {
  email: string;
  nom: string;
  prenoms: string;
  pays: string;
  ville: string;
  profession: string;
  domaine_interet: string;
};

type Panneau =
  | "inscription"
  | "connexion"
  | "oubli"
  | "service"
  | "collaboration"
  | "lecteur"
  | "donnees"
  | "compte";

type Props = {
  t: Record<string, string>;
  panneauInitial?: string;
  lecteur: LecteurResume | null;
  demandes: DemandeLecteur[];
  ressources: RessourceLecteur[];
  /** Message à afficher en tête (retour d'un lien de vérification). */
  message?: string;
};

const NATURES = ["information", "documentaire", "institutionnelle", "ouvrages", "autre"];
const COLLABORATIONS = ["scientifique", "universitaire", "institutionnelle", "editoriale", "autre"];
const INTERETS = ["recherche", "droit", "epistemologie", "ouvrages", "autre"];
const PANNEAUX: Panneau[] = ["inscription", "connexion", "oubli", "service", "collaboration", "lecteur", "donnees", "compte"];

type Etat = { type: "ok" | "erreur"; texte: string } | null;

/** Hook d'envoi JSON : champ piège, horodatage d'ouverture, jeton Turnstile. */
function useEnvoi(t: Record<string, string>) {
  const [envoi, setEnvoi] = useState(false);
  const [etat, setEtat] = useState<Etat>(null);
  const ouvertA = useRef(0);
  useEffect(() => {
    ouvertA.current = Date.now();
  }, []);

  async function envoyer(
    e: FormEvent<HTMLFormElement>,
    url: string,
    options: { methode?: string; extra?: Record<string, unknown>; transformer?: (d: Record<string, unknown>) => Record<string, unknown>; succes: (reponse: Record<string, unknown>) => void },
  ) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    let corps: Record<string, unknown> = {};
    fd.forEach((v, k) => {
      corps[k] = typeof v === "string" ? v : "";
    });
    for (const c of form.querySelectorAll<HTMLInputElement>("input[type=checkbox]")) corps[c.name] = c.checked;
    corps.ouvert_a = ouvertA.current;
    corps.turnstile_token = String(fd.get("cf-turnstile-response") ?? "");
    corps = { ...corps, ...options.extra };
    if (options.transformer) corps = options.transformer(corps);
    setEnvoi(true);
    setEtat(null);
    try {
      const res = await fetch(url, {
        method: options.methode ?? "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corps),
      });
      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      if (res.ok && data.ok) {
        options.succes(data);
      } else {
        const code = typeof data.code === "string" ? data.code : "generique";
        setEtat({ type: "erreur", texte: t[`message.erreur_${code}`] ?? t["message.erreur_generique"] });
      }
    } catch {
      setEtat({ type: "erreur", texte: t["message.erreur_generique"] });
    } finally {
      setEnvoi(false);
    }
  }
  return { envoi, etat, setEtat, envoyer };
}

function Piege() {
  return (
    <div className="piege" aria-hidden="true">
      <label>
        Site web
        <input type="text" name="site_web" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Turnstile() {
  useEffect(() => {
    if (!SITE_KEY || document.getElementById("cf-turnstile-script")) return;
    const s = document.createElement("script");
    s.id = "cf-turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);
  return SITE_KEY ? <div className="cf-turnstile full" data-sitekey={SITE_KEY} data-theme="light" /> : null;
}

function Etat({ etat }: { etat: Etat }) {
  if (!etat) return null;
  return (
    <p role={etat.type === "erreur" ? "alert" : "status"} className={`etat full ${etat.type === "erreur" ? "erreur" : ""}`}>
      {etat.texte}
    </p>
  );
}

function Champ({
  label,
  name,
  type = "text",
  requis,
  defaut,
  autoComplete,
  aide,
  minLength,
  full,
}: {
  label: string;
  name: string;
  type?: string;
  requis?: boolean;
  defaut?: string;
  autoComplete?: string;
  aide?: string;
  minLength?: number;
  full?: boolean;
}) {
  return (
    <label className={full ? "full" : undefined}>
      {label}
      <input name={name} type={type} required={requis} defaultValue={defaut} autoComplete={autoComplete} minLength={minLength} />
      {aide ? <span className="aide">{aide}</span> : null}
    </label>
  );
}

function Liste({ t, prefixe, valeurs, vide, name, requis, defaut, label }: { t: Record<string, string>; prefixe: string; valeurs: string[]; vide: string; name: string; requis?: boolean; defaut?: string; label: string }) {
  return (
    <label className="full">
      {label}
      <select name={name} required={requis} defaultValue={defaut ?? ""}>
        <option value="">{vide}</option>
        {valeurs.map((v) => (
          <option key={v} value={v}>
            {t[`${prefixe}.${v}`]}
          </option>
        ))}
      </select>
    </label>
  );
}

function PanneauUtilisateur({ id, titre, children }: { id: string; titre: string; children: ReactNode }) {
  return (
    <section className="user-panel active" id={id} aria-labelledby={`${id}-titre`}>
      <h2 id={`${id}-titre`}>{titre}</h2>
      {children}
    </section>
  );
}

export function EspaceUtilisateurs({ t, panneauInitial, lecteur, demandes, ressources, message }: Props) {
  const router = useRouter();
  const depart = PANNEAUX.includes(panneauInitial as Panneau) ? (panneauInitial as Panneau) : null;
  const [panneau, setPanneau] = useState<Panneau | null>(depart);
  const panneauRef = useRef<HTMLDivElement>(null);

  const ouvrir = (p: Panneau | null) => {
    setPanneau(p);
    if (p) setTimeout(() => panneauRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const inscription = useEnvoi(t);
  const connexion = useEnvoi(t);
  const oubli = useEnvoi(t);
  const service = useEnvoi(t);
  const collab = useEnvoi(t);
  const compte = useEnvoi(t);
  const suppression = useEnvoi(t);
  const [deconnecte, setDeconnecte] = useState(false);

  async function deconnexion() {
    await fetch("/api/espace/deconnexion", { method: "POST" });
    setDeconnecte(true);
    setPanneau(null);
    router.refresh();
  }

  const libelleBouton = (envoi: boolean, normal: string) => (envoi ? t["message.envoi"] : normal);
  const confirme = (texte: string, reference: string) => texte.replace("{reference}", reference);

  return (
    <div className="espace-v16">
      {message ? (
        <p role="status" className="etat">
          {message}
        </p>
      ) : null}

      <div className="user-intro">
        <h2>{t["intro.titre"]}</h2>
        <p>{t["intro.texte"]}</p>
      </div>

      <div className="user-grid">
        <article className="user-card">
          <h3>{t["carte_compte.titre"]}</h3>
          <p>{t["carte_compte.texte"]}</p>
          <div className="user-actions">
            {lecteur && !deconnecte ? (
              <button type="button" onClick={() => ouvrir("compte")}>
                {t["moncompte.titre"]}
              </button>
            ) : (
              <>
                <button type="button" onClick={() => ouvrir("inscription")}>
                  {t["carte_compte.creer"]}
                </button>
                <button className="secondary" type="button" onClick={() => ouvrir("connexion")}>
                  {t["carte_compte.connexion"]}
                </button>
              </>
            )}
          </div>
        </article>
        <article className="user-card">
          <h3>{t["carte_services.titre"]}</h3>
          <p>{t["carte_services.texte"]}</p>
          <div className="user-actions">
            <button type="button" onClick={() => ouvrir("service")}>
              {t["carte_services.bouton"]}
            </button>
          </div>
        </article>
        <article className="user-card">
          <h3>{t["carte_collaborations.titre"]}</h3>
          <p>{t["carte_collaborations.texte"]}</p>
          <div className="user-actions">
            <button type="button" onClick={() => ouvrir("collaboration")}>
              {t["carte_collaborations.bouton"]}
            </button>
          </div>
        </article>
        <article className="user-card">
          <h3>{t["carte_lecteur.titre"]}</h3>
          <p>{t["carte_lecteur.texte"]}</p>
          <div className="user-actions">
            <button className="secondary" type="button" onClick={() => ouvrir("lecteur")}>
              {t["carte_lecteur.bouton"]}
            </button>
          </div>
        </article>
        <article className="user-card">
          <h3>{t["carte_donnees.titre"]}</h3>
          <p>{t["carte_donnees.texte"]}</p>
          <div className="user-actions">
            <button className="secondary" type="button" onClick={() => ouvrir("donnees")}>
              {t["carte_donnees.bouton"]}
            </button>
          </div>
        </article>
      </div>

      <div ref={panneauRef} style={{ scrollMarginTop: 90 }}>
        {panneau === "inscription" && (
          <PanneauUtilisateur id="user-register" titre={t["inscription.titre"]}>
            {inscription.etat?.type === "ok" ? (
              <p role="status" className="etat">{inscription.etat.texte}</p>
            ) : (
              <>
                <p>{t["inscription.intro"]}</p>
                <form
                  className="user-form"
                  onSubmit={(e) =>
                    inscription.envoyer(e, "/api/espace/inscription", {
                      succes: () => inscription.setEtat({ type: "ok", texte: t["message.inscription_ok"] }),
                    })
                  }
                >
                  <Champ label={t["inscription.nom"]} name="nom" requis autoComplete="family-name" />
                  <Champ label={t["inscription.prenoms"]} name="prenoms" requis autoComplete="given-name" />
                  <Champ label={t["inscription.email"]} name="email" type="email" requis autoComplete="email" />
                  <Champ label={t["inscription.pays"]} name="pays" requis autoComplete="country-name" />
                  <Champ label={t["inscription.ville"]} name="ville" requis />
                  <Champ label={t["inscription.profession"]} name="profession" />
                  <Liste t={t} prefixe="opt.interet" valeurs={INTERETS} vide={t["inscription.interet_choisir"]} name="domaine_interet" label={t["inscription.interet"]} />
                  <Champ
                    label={t["inscription.mot_de_passe"]}
                    name="mot_de_passe"
                    type="password"
                    requis
                    minLength={10}
                    autoComplete="new-password"
                    aide={t["inscription.mot_de_passe_aide"]}
                    full
                  />
                  <div className="full privacy-note">
                    <strong>{t["inscription.protection_titre"]}</strong> {t["inscription.protection"]}
                  </div>
                  <label className="full">
                    <span>
                      <input type="checkbox" name="consentement" required /> {t["inscription.consentement"]}
                    </span>
                  </label>
                  <Piege />
                  <Turnstile />
                  <Etat etat={inscription.etat} />
                  <div className="full">
                    <button type="submit" disabled={inscription.envoi}>
                      {libelleBouton(inscription.envoi, t["inscription.bouton"])}
                    </button>
                  </div>
                </form>
              </>
            )}
          </PanneauUtilisateur>
        )}

        {panneau === "connexion" && (
          <PanneauUtilisateur id="user-login" titre={t["connexion.titre"]}>
            <form
              className="user-form"
              onSubmit={(e) =>
                connexion.envoyer(e, "/api/espace/connexion", {
                  succes: () => {
                    setDeconnecte(false);
                    setPanneau("lecteur");
                    router.refresh();
                  },
                })
              }
            >
              <Champ label={t["connexion.email"]} name="email" type="email" requis autoComplete="username" />
              <Champ label={t["connexion.mot_de_passe"]} name="mot_de_passe" type="password" requis autoComplete="current-password" />
              <Etat etat={connexion.etat} />
              <div className="full user-actions">
                <button type="submit" disabled={connexion.envoi}>
                  {libelleBouton(connexion.envoi, t["connexion.bouton"])}
                </button>
                <button type="button" className="lien-bouton" onClick={() => ouvrir("oubli")}>
                  {t["connexion.oubli"]}
                </button>
              </div>
            </form>
          </PanneauUtilisateur>
        )}

        {panneau === "oubli" && (
          <PanneauUtilisateur id="user-oubli" titre={t["oubli.titre"]}>
            {oubli.etat?.type === "ok" ? (
              <p role="status" className="etat">{oubli.etat.texte}</p>
            ) : (
              <form
                className="user-form"
                onSubmit={(e) =>
                  oubli.envoyer(e, "/api/espace/oubli", {
                    succes: () => oubli.setEtat({ type: "ok", texte: t["oubli.confirmation"] }),
                  })
                }
              >
                <Champ label={t["connexion.email"]} name="email" type="email" requis autoComplete="username" full />
                <Piege />
                <Turnstile />
                <Etat etat={oubli.etat} />
                <div className="full">
                  <button type="submit" disabled={oubli.envoi}>
                    {libelleBouton(oubli.envoi, t["oubli.bouton"])}
                  </button>
                </div>
              </form>
            )}
          </PanneauUtilisateur>
        )}

        {panneau === "service" && (
          <PanneauUtilisateur id="user-service" titre={t["service.titre"]}>
            {service.etat?.type === "ok" ? (
              <p role="status" className="etat" data-reference>{service.etat.texte}</p>
            ) : (
              <form
                className="user-form"
                onSubmit={(e) =>
                  service.envoyer(e, "/api/espace/service", {
                    succes: (r) => service.setEtat({ type: "ok", texte: confirme(t["message.demande_ok"], String(r.reference)) }),
                  })
                }
              >
                {!lecteur || deconnecte ? (
                  <>
                    <Champ label={t["service.nom"]} name="nom" requis autoComplete="name" />
                    <Champ label={t["service.email"]} name="email" type="email" requis autoComplete="email" />
                  </>
                ) : null}
                <Liste t={t} prefixe="opt.nature" valeurs={NATURES} vide={t["service.nature_choisir"]} name="nature" requis label={t["service.nature"]} />
                <label className="full">
                  {t["service.message"]}
                  <textarea name="message" rows={5} required maxLength={5000} />
                </label>
                <Piege />
                <Turnstile />
                <Etat etat={service.etat} />
                <div className="full">
                  <button type="submit" disabled={service.envoi}>
                    {libelleBouton(service.envoi, t["service.bouton"])}
                  </button>
                </div>
              </form>
            )}
          </PanneauUtilisateur>
        )}

        {panneau === "collaboration" && (
          <PanneauUtilisateur id="user-collab" titre={t["collaboration.titre"]}>
            {collab.etat?.type === "ok" ? (
              <p role="status" className="etat" data-reference>{collab.etat.texte}</p>
            ) : (
              <form
                className="user-form"
                onSubmit={(e) =>
                  collab.envoyer(e, "/api/espace/collaboration", {
                    succes: (r) => collab.setEtat({ type: "ok", texte: confirme(t["message.collaboration_ok"], String(r.reference)) }),
                  })
                }
              >
                {!lecteur || deconnecte ? (
                  <>
                    <Champ label={t["collaboration.nom"]} name="nom" requis autoComplete="name" />
                    <Champ label={t["collaboration.email"]} name="email" type="email" requis autoComplete="email" />
                  </>
                ) : null}
                <Champ label={t["collaboration.institution"]} name="institution" />
                <Liste t={t} prefixe="opt.collaboration" valeurs={COLLABORATIONS} vide={t["collaboration.type_choisir"]} name="type_collaboration" requis label={t["collaboration.type"]} />
                <label className="full">
                  {t["collaboration.presentation"]}
                  <textarea name="presentation" rows={5} required maxLength={5000} />
                </label>
                <Piege />
                <Turnstile />
                <Etat etat={collab.etat} />
                <div className="full">
                  <button type="submit" disabled={collab.envoi}>
                    {libelleBouton(collab.envoi, t["collaboration.bouton"])}
                  </button>
                </div>
              </form>
            )}
          </PanneauUtilisateur>
        )}

        {panneau === "lecteur" && (
          <PanneauUtilisateur id="user-reader" titre={t["lecteur.titre"]}>
            <p>{t["lecteur.texte"]}</p>
            {lecteur && !deconnecte ? (
              <>
                <h3 className="sous-titre" style={{ fontSize: "1.1rem", color: "var(--navy)" }}>{t["lecteur.demandes"]}</h3>
                {demandes.length === 0 ? (
                  <p>{t["lecteur.aucune_demande"]}</p>
                ) : (
                  <table className="demandes">
                    <thead>
                      <tr>
                        <th>{t["lecteur.col_identifiant"]}</th>
                        <th>{t["lecteur.col_nature"]}</th>
                        <th>{t["lecteur.col_date"]}</th>
                        <th>{t["lecteur.col_statut"]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demandes.map((d) => (
                        <tr key={d.reference}>
                          <td>{d.reference}</td>
                          <td>{d.type === "service" ? t[`opt.nature.${d.nature}`] : t[`opt.collaboration.${d.nature}`]}</td>
                          <td>{new Date(d.date).toLocaleDateString("fr-FR")}</td>
                          <td>{t[`opt.statut.${d.statut}`]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <h3 className="sous-titre" style={{ fontSize: "1.1rem", color: "var(--navy)" }}>{t["lecteur.ressources"]}</h3>
                {ressources.length === 0 ? (
                  <p>{t["lecteur.aucune_ressource"]}</p>
                ) : (
                  <ul>
                    {ressources.map((r) => (
                      <li key={r.reference}>
                        {r.reference} — {r.titre}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <div className="user-actions">
                <button type="button" onClick={() => ouvrir("connexion")}>
                  {t["connexion.bouton"]}
                </button>
              </div>
            )}
          </PanneauUtilisateur>
        )}

        {panneau === "compte" && lecteur && !deconnecte && (
          <PanneauUtilisateur id="user-account" titre={t["moncompte.titre"]}>
            <p>
              {t["moncompte.identifie"]} <strong>{lecteur.email}</strong>
            </p>
            <form
              className="user-form"
              onSubmit={(e) =>
                compte.envoyer(e, "/api/espace/compte", {
                  methode: "PATCH",
                  succes: () => {
                    compte.setEtat({ type: "ok", texte: t["moncompte.enregistre"] });
                    router.refresh();
                  },
                })
              }
            >
              <Champ label={t["inscription.nom"]} name="nom" requis defaut={lecteur.nom} autoComplete="family-name" />
              <Champ label={t["inscription.prenoms"]} name="prenoms" requis defaut={lecteur.prenoms} autoComplete="given-name" />
              <Champ label={t["inscription.pays"]} name="pays" requis defaut={lecteur.pays} autoComplete="country-name" />
              <Champ label={t["inscription.ville"]} name="ville" requis defaut={lecteur.ville} />
              <Champ label={t["inscription.profession"]} name="profession" defaut={lecteur.profession} />
              <Liste t={t} prefixe="opt.interet" valeurs={INTERETS} vide={t["inscription.interet_choisir"]} name="domaine_interet" defaut={lecteur.domaine_interet} label={t["inscription.interet"]} />
              <Etat etat={compte.etat} />
              <div className="full user-actions">
                <button type="submit" disabled={compte.envoi}>
                  {libelleBouton(compte.envoi, t["moncompte.enregistrer"])}
                </button>
                <button type="button" className="secondary" onClick={deconnexion}>
                  {t["moncompte.deconnexion"]}
                </button>
              </div>
            </form>

            <div className="zone-danger">
              <h3 className="sous-titre" style={{ fontSize: "1.1rem", color: "var(--navy)" }}>{t["moncompte.suppression_titre"]}</h3>
              <p>{t["moncompte.suppression_texte"]}</p>
              <form
                className="user-form"
                onSubmit={(e) =>
                  suppression.envoyer(e, "/api/espace/compte", {
                    methode: "DELETE",
                    succes: () => {
                      setDeconnecte(true);
                      setPanneau(null);
                      router.refresh();
                    },
                  })
                }
              >
                <Champ label={t["moncompte.suppression_mdp"]} name="mot_de_passe" type="password" requis autoComplete="current-password" full />
                <Etat etat={suppression.etat} />
                <div className="full">
                  <button type="submit" className="secondary" disabled={suppression.envoi}>
                    {libelleBouton(suppression.envoi, t["moncompte.suppression_bouton"])}
                  </button>
                </div>
              </form>
            </div>
          </PanneauUtilisateur>
        )}

        {panneau === "donnees" && (
          <PanneauUtilisateur id="user-data-architecture" titre={t["donnees.titre"]}>
            <p>{t["donnees.intro"]}</p>
            <div className="user-grid">
              {["profils", "activites", "interets", "consentements", "commandes", "soutiens"].map((k) => (
                <article className="user-card" key={k}>
                  <h3>{t[`donnees.${k}_titre`]}</h3>
                  <p>{t[`donnees.${k}_texte`]}</p>
                </article>
              ))}
            </div>
            <div className="privacy-note">
              <strong>{t["donnees.statuts_titre"]}</strong> {t["donnees.statuts_texte"]}
            </div>
          </PanneauUtilisateur>
        )}
      </div>

      {panneau ? (
        <div className="user-actions">
          <button className="secondary" type="button" onClick={() => ouvrir(null)}>
            {t["retour"]}
          </button>
        </div>
      ) : null}

      <div className="privacy-note">
        <strong>{t["fin.titre"]}</strong> {t["fin.texte"]}
      </div>
    </div>
  );
}

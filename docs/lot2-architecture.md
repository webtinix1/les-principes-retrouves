# Lot 2 — Espace utilisateurs : architecture proposée

Document de la **phase 2** du cahier technique (« proposer l'architecture serveur et le schéma de données pour validation »). Il décrit ce qui est implémenté dans cette branche ; les points marqués **À valider** attendent l'accord de M. MAMBOU avant toute mise en production.

## 1. Principes

- Aucune refonte graphique : l'Espace utilisateurs est la **11ᵉ entrée** du menu (`/espace-utilisateurs`), dans la charte V16 (colonne 1100 px, `v16.css`, `ux.css`). Les pages existantes et leurs textes ne sont pas modifiés.
- Les textes de la section `page-utilisateurs` du prototype V16 sont repris à l'identique (hors mentions « prototype » / « démonstration ») et sont **éditables dans Payload** (registre `content/blocs/utilisateurs.ts`). Seuls quelques libellés d'interface indispensables (mot de passe, messages d'erreur, e-mails) ont été ajoutés, courts et sobres.
- La consultation publique reste libre et anonyme. Un compte n'est exigé que pour l'Espace lecteur et la gestion du profil.

## 2. Architecture technique

| Couche | Choix |
|---|---|
| Application | Next.js 16 (App Router) + Payload CMS 3, un seul conteneur (inchangé) |
| Base | PostgreSQL via `@payloadcms/db-postgres`, schéma versionné par migrations (`push: false`) |
| Hébergement | inchangé (conteneur existant, HTTPS par le reverse-proxy) ; aucune brique externe obligatoire |
| E-mails | adaptateur Payload choisi par `EMAIL_TRANSPORT` : `resend` (production, clés existantes), `console` (local, par défaut), `fichier` (tests, interdit en production) |
| Anti-robots | Cloudflare Turnstile (si les clés sont renseignées, comme le formulaire de contact) + champ piège + délai minimal + limitation de débit par IP |

## 3. Authentification — choix

**Deux collections d'authentification distinctes** :

- `users` : administrateurs du back-office (existant) ; reçoit un champ `role`.
- `lecteurs` : comptes du public. Ils ne peuvent **jamais** ouvrir `/admin` ni lire une collection d'administration : tous les contrôles d'accès existants (`connecte`) sont resserrés pour exiger `req.user.collection === "users"`.

Mécanisme (Payload natif, aucun code cryptographique maison) :

- mot de passe haché par Payload (PBKDF2 avec sel par compte), jamais stocké ni journalisé en clair ;
- vérification de l'e-mail obligatoire avant toute connexion (`auth.verify`) ;
- verrouillage du compte après 5 échecs pendant 10 minutes ;
- session : jeton JWT signé par Payload, porté par un **cookie dédié** `lpr_lecteur` (httpOnly, SameSite=Lax, Secure en production), distinct du cookie du back-office : se connecter comme lecteur n'écrase pas une session d'administrateur ;
- déconnexion : suppression du cookie et de la session côté serveur ;
- mot de passe oublié : jeton à usage unique (1 h), lien envoyé par e-mail ; réponse identique que le compte existe ou non (pas d'énumération) ;
- les routes REST natives de la collection `lecteurs` (création, connexion, mot de passe oublié) sont neutralisées : seules les routes du site, protégées (anti-robots, débit), sont utilisables.

## 4. Schéma des données

```
lecteurs (auth)                         journal_securite
  id (uuid)                               id, createdAt
  email*, mot de passe haché*             evenement*  (inscription, verification, connexion,
  nom*, prenoms*                                      echec_connexion, deconnexion, mot_de_passe,
  pays*, ville*                                       profil, suppression, export, …)
  profession, domaine_interet             lecteur (id, nul si supprimé)
  information_acceptee_le*  (date)        empreinte_ip (HMAC, jamais l'IP en clair)
  version_information*                    detail (court)
  ressources_accessibles → ressources[]
  statut de vérification, verrouillage    ← purge automatique après 12 mois

demandes_service                        propositions_collaboration
  reference*  SRV-AAAA-XXXXXX (unique)    reference*  COL-AAAA-XXXXXX (unique)
  lecteur → lecteurs (facultatif)         lecteur → lecteurs (facultatif)
  nom*, email*                            nom*, email*, institution
  nature* (5 valeurs du prototype)        type* (5 valeurs du prototype)
  message*                                presentation*
  statut (nouvelle, en_cours,             statut (nouvelle, en_cours,
          traitee, classee)                        traitee, classee)
  note_interne (admin seul)               note_interne (admin seul)
  anonymise                               anonymise
```

Ressources : l'Espace lecteur affiche les ressources de la collection existante `ressources` que l'administration a rattachées au compte (`ressources_accessibles`). Sans rattachement, la liste est vide et le dit clairement. Le téléchargement s'appuie sur la route existante.

Non collecté : aucune donnée sensible, aucune date de naissance, aucune géolocalisation. Le cahier prévoit « domaine d'intérêt » et « profession ou institution » facultatifs : repris tels quels.

## 5. Parcours

1. **Création** : formulaire (champs du prototype) → validation serveur → compte inactif + e-mail de vérification → lien → compte actif. Si l'e-mail existe déjà, la réponse est identique et un e-mail l'indique à son titulaire.
2. **Connexion / déconnexion / mot de passe oublié** : décrits au § 3.
3. **Mon compte** : modification des coordonnées et préférences ; suppression du compte (confirmation par mot de passe).
4. **Services / Collaborations** : formulaire → enregistrement avec identifiant de demande → e-mail d'accusé de réception → file de traitement dans l'administration. Connecté, le formulaire est prérempli et la demande rattachée au compte ; non connecté, nom et e-mail sont saisis (comme dans le prototype). **À valider** : le cahier (§ 3) dit « identification demandée pour soumettre une demande », le prototype propose nom et e-mail. L'implémentation accepte les deux ; imposer le compte tient en une ligne de configuration.
5. **Espace lecteur** : accessible seulement connecté ; demandes du compte (référence, nature, date, statut) et ressources disponibles.

## 6. Administration (Payload)

Rôles du back-office (champ `role` de `users`, les administrateurs existants deviennent `administrateur`) :

| Rôle | Comptes lecteurs | Demandes / collaborations | Export | Statistiques | Suppression |
|---|---|---|---|---|---|
| `administrateur` | tout | tout | oui | oui | oui |
| `gestionnaire` | lecture, modification | tout | oui | oui | non |
| `secretariat` | lecture | lecture, changement de statut, note | non | non | non |

Recherche et filtres natifs de Payload (pays, ville, statut, dates). **Export CSV** des comptes réservé à `administrateur` et `gestionnaire`, chaque export est journalisé. **Statistiques agrégées** par pays et par ville (comptes vérifiés), vue d'administration dédiée.

## 7. Localisation

- Ville et pays : **déclaratifs** (saisis par la personne).
- Pas de géolocalisation GPS. Pas de géolocalisation par IP : l'IP n'est conservée que sous forme d'empreinte HMAC dans le journal de sécurité (détection d'abus), purgée après 12 mois. **À valider** : si des statistiques de provenance technique sont souhaitées, il faudra choisir un service de localisation et informer les visiteurs.

## 8. Sécurité et conservation

- HTTPS (reverse-proxy), CSP et en-têtes existants conservés. Limitation de débit sur toutes les routes sensibles. Réponses d'erreur génériques.
- Journal de sécurité proportionné (§ 4), sans mot de passe ni contenu des messages.
- **Suppression de compte** : le compte est effacé ; les demandes rattachées sont **anonymisées** (nom et e-mail retirés, message conservé pour le suivi). **À valider** (durée de conservation des demandes).
- Sauvegardes : hors périmètre de ce lot (hors forfait) ; la procédure de restauration reste celle de l'hébergeur (`pg_dump`).
- **À fournir par le client avant ouverture** (cahier § 9) : responsable du traitement, finalités, base juridique, durées de conservation, droits des personnes, contact de confidentialité. Le texte de la politique de confidentialité n'est pas modifié par ce lot ; la case d'information du formulaire d'inscription reprend la formulation du prototype.

## 9. Mise en production

Aucune mise en production avant l'accord exprès du client (cahier § 13, phase 7). Variables à renseigner à l'ouverture : `EMAIL_TRANSPORT=resend`, `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_SITE_URL`, `TURNSTILE_*`, `CONTACT_INBOX_EMAIL` (notification interne des demandes).

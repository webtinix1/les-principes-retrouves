# brand-brief.md — Charte de marque & direction artistique

> À consulter avant toute décision visuelle. Aucune couleur, police ou taille hors de cette charte.

---

## 1. Essence (3 mots)

**Clinique · Souverain · Académique.**

Le site doit évoquer **l'architecture d'un institut de recherche ou d'une revue académique de haut niveau** (références : Cairn, HAL, revues de droit comparé). Ce n'est ni un blog personnel, ni une landing page commerciale. Priorités absolues : **sobriété, espace blanc (blanc cassé), rigueur typographique.**

## 2. Palette de couleurs (variables CSS)

À déclarer dans `:root` de `assets/css/style.css`. **Aucune valeur hexadécimale en dur ailleurs.**

```css
:root {
  --or-maat:          #D4AF37; /* Doré Maât — accents, logo, liens actifs, formulations canoniques */
  --bleu-academique:  #1E3A8A; /* Bleu profond — fonds Hero, titres secondaires */
  --bleu-fonce:       #1a252f; /* Bleu nuit — header, footer */
  --blanc-casse:      #F9FAFB; /* Fond principal — lisibilité maximale */
  --gris-texte:       #374151; /* Texte courant */
  --gris-clair:       #f4f4f5; /* Encadrés, citations, cartes */
}
```

**Usage :**
- Fond de page par défaut : `--blanc-casse`.
- Corps de texte : `--gris-texte`.
- Header / Footer : `--bleu-fonce`.
- Hero / bandeaux d'emphase : `--bleu-academique`.
- Accents, liens actifs, plume du logo, formulations canoniques en italique : `--or-maat`.
- Cartes, citations, encadrés : `--gris-clair`.

> L'or est un **accent**, pas une couleur de masse. Utilisé avec parcimonie pour préserver son autorité.

## 3. Typographie

Chargement via **Google Fonts** (voir `integrations.md`).

| Usage | Police | Poids | Variable CSS suggérée |
|---|---|---|---|
| Titres (H1, H2, H3) | **Playfair Display** (alt : Cormorant Garamond) | 700 | `--font-titre` |
| Corps de texte (p, li) | **Lora** ou **Inter** | 400 | `--font-corps` |
| Formules / code (Σ=M(F(V(Σ)))) | **Fira Code** | 500 | `--font-formule` |

- Serif classique pour l'autorité (titres) ; lisibilité écran pour le corps.
- Les **formules mathématiques** (l'équation Σ, π₁/π₂, K ≠ Σ…) sont toujours en Fira Code.
- Hauteur de ligne confortable (≈ 1.6–1.7 pour le corps), mesure de ligne limitée (≈ 65–75 caractères) pour le confort de lecture « revue ».

## 4. Logo « Plume de Maât »

- **Forme** : plume de Maât stylisée, **or sur fond bleu**, ailes déployées (cf. images de référence `GARD SAISINE.png` / `ChatGPT Image VERSION FINALE.png`).
- **Symbolique** : plume centrale dorée = Σ (Unité Structurelle Absolue) ; aile gauche = π₁ (lecture en distinction) ; aile droite = π₂ (lecture en relation).
- **Format** : **SVG** obligatoire (net à toutes tailles, léger).
- **Animation au survol (hover)** : déploiement léger des ailes — `transform: scale(1.05)` + légère rotation, `transition` de **0.4s**. Évoque la « Méthode M » (remontée vers Σ). Discret, jamais clinquant.

## 5. Ton éditorial (copywriting)

**Strictement clinique, objectif, impersonnel, souverain.**

À PROSCRIRE :
- Triomphalisme, superlatifs marketing, ponctuation excitée.
- Posture militante, justification biographique, « je / nous » personnel.
- Emojis dans le contenu publié.
- Rhétorique de vente (même sur la page Formation : on présente, on ne « vend » pas).

À PRIVILÉGIER :
- Phrases déclaratives, affirmatives, denses.
- Vocabulaire conceptuel précis (cf. les 9 concepts stabilisés).
- L'autorité par la nécessité démontrée, pas par l'emphase.

**Phrases-signatures validées** (réutilisables telles quelles) :
- « Le réel est voilé pour tous, filtré pour certains, et reconstructible par la méthode. »
- « L'universel n'a pas de centre. Il se démontre. »
- « Ce livre ne sollicite pas la permission. Il explicite la nécessité. »

## 6. Principes UX / mise en page

- **Mobile-first** (60 % du trafic mobile attendu).
- Minimalisme, hiérarchie de l'information claire, **beaucoup d'espace blanc**.
- Grilles régulières (cartes concepts, cartes tomes, modules).
- Contraste et accessibilité respectés (texte lisible sur tous les fonds).
- Animations rares, lentes, signifiantes (jamais décoratives à l'excès).

## 7. Iconographie & images

- Logo et pictogrammes : **SVG**.
- Photos / illustrations éventuelles : **WebP** (en prod), sobres, jamais de banque d'images « corporate ».
- Préférer le signe typographique (Σ, π₁, π₂) et la géométrie (pyramide, triangle) à l'illustration figurative.
- **Images du carrousel** : photos libres de droits (Lorem Picsum / Unsplash), traitées en **niveaux de gris sous un voile bleu** (`linear-gradient` bleu nuit → bleu académique à ~0.82 d'opacité) pour garantir cohérence + contraste du texte. Stockées en local dans `assets/img/carousel/`. **À convertir en WebP pour la production** (actuellement JPEG pour la maquette).

---

*Sources : DOCUMENT MAÎTRE UNIFIÉ (§3.3 et Cahier des charges §3), images de référence du projet.*

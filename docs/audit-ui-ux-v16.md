# Audit UI/UX — site V16 (branche feat/refresh-prototype-v16)

Périmètre : 12 pages, mesurées à 1440 px (ordinateur) et 390 px (mobile) sur le build de production local.
Contrainte respectée par toutes les propositions : **aucun texte ni aucune image modifiés**. Seuls la mise en forme, la structure HTML, les interactions et l'accessibilité changent.

## Mesures

| Indicateur | Constat | Cible |
|---|---|---|
| Hauteur de l'en-tête collant | 107 px sur ordinateur, 96 px sur mobile (11 à 12 % de l'écran en permanence) | 64 à 72 px une fois la page défilée |
| Menu sur ordinateur | 11 entrées en 12 px, réparties sur **deux lignes** | une seule ligne, 14 px minimum |
| Texte de moins de 13 px | 15 à 25 éléments par page (menu, sur-titres, notes, boutons) | 13 px minimum, 14 px pour ce qui est cliquable |
| Contraste des sur-titres dorés de 10 px | 4,36:1 (Accueil, Institution, Ouvrages, Laboratoire, Concepts, Transmission : 2 à 14 occurrences par page) | 4,5:1 minimum |
| Longueur des lignes dans le texte courant | médiane de 131 caractères, maximum 180 sur ordinateur | 65 à 80 caractères |
| Cibles tactiles sur mobile | liens légaux de 26 px de haut, liens d'achat des tomes de 22 px, boutons de l'Accueil de 30 px | 44 px |
| Structure des titres | l'Accueil n'a pas de H1 ; 9 pages sur 12 sautent un niveau (par exemple de H2 à H4) | un seul H1 par page, des niveaux qui se suivent |
| Longueur des pages sur mobile | Note épistémologique : 12 261 px ; Concepts : 10 712 px ; Laboratoire : 9 911 px | des repères de navigation à l'intérieur de la page |

## Priorité 1 — lisibilité et accessibilité

1. **Mesure de lecture.** Limiter les paragraphes à environ 70 caractères (`max-width: 68ch`) dans le corps des pages et surtout dans le lecteur de chapitres, où le texte en Arial 16 px s'étend sur toute la largeur. Les cartes et les bandeaux gardent leur largeur actuelle.
2. **Lecteur de chapitres.** Le texte intégral passe en Georgia 18 px, avec un interligne de 1,7. Les intertitres déjà présents dans le texte (« §1. Le retournement réflexif… », « CHAPITRE I ») sont aujourd'hui rendus comme des paragraphes ordinaires. Ils seraient détectés et stylés en intertitres, sans changer un mot. Ajouter aussi une barre de progression de lecture et un lien de retour en haut de page.
3. **Tailles minimales.** Passer le menu à 14 px, les sur-titres à 12 px (même espacement des lettres, même couleur), les notes et les mentions à 13 px, et les boutons `.btn` à 14 px.
4. **Contraste des sur-titres dorés.** Assombrir l'or des sur-titres sur fond clair (#B8941F vers #8A6D12, soit environ 5,2:1). L'or vif reste réservé aux fonds marine, où il contraste déjà bien.
5. **Cibles tactiles.** Donner 44 px de hauteur minimale aux liens du pied de page, aux liens d'achat et aux boutons secondaires sur mobile (hauteur de ligne et marges internes ; le texte ne change pas).
6. **Hiérarchie des titres.** Ajouter un H1 à l'Accueil, en reprenant un titre déjà présent ou un titre réservé aux lecteurs d'écran. Corriger les sauts de niveau (attributs uniquement, aucun changement visuel).

## Priorité 2 — navigation et repères

7. **En-tête compact.** Faire tenir le menu sur une seule ligne à partir de 1280 px (14 px, espacement resserré, sous-titre « Maât · Théorie… » masqué une fois la page défilée). Sous 1280 px, utiliser le menu ☰ plutôt que deux lignes serrées. Au défilement, l'en-tête se réduit à environ 64 px.
8. **Menu mobile.** Afficher les entrées en liste verticale pleine largeur, de 48 px de haut, avec le numéro des pages (déjà présent dans `lib/navigation.ts`). Le menu bloque le défilement de la page quand il est ouvert et se ferme avec Échap ou au toucher en dehors.
9. **Sommaire dans les pages longues** (Note épistémologique, Concepts, Laboratoire, Institution, Déclaration). Construire automatiquement un sommaire à partir des H2 existants : colonne collante à gauche sur ordinateur, menu déroulant « Dans cette page » sur mobile. Mettre en évidence la section en cours de lecture.
10. **Bouton « Retour en haut »** sur mobile, affiché après deux écrans de défilement.
11. **Liens « page précédente / page suivante »** en bas de chaque page, suivant l'ordre du menu. Les libellés sont les intitulés du menu, qui existent déjà.

## Priorité 3 — finition visuelle

12. **Haut de l'Accueil.** Aligner sur la même colonne le sur-titre, le paragraphe, les boutons et la signature : aujourd'hui, le paragraphe est décalé, les boutons sont centrés et la signature est à gauche. Sur mobile, mettre les trois boutons en pleine largeur, empilés.
13. **Page Ouvrages.** Une fois le texte choisi, faire défiler la page vers l'espace de lecture. Signaler le texte choisi par une coche en plus de la couleur. Sous le titre « TOME II », la section est vide tant que le Tome II n'est pas sélectionné : la masquer.
14. **Libellés techniques sans style** (« CRGI · SÉQUENCE DE RÉFÉRENCE », « TEXTE LIMINAIRE ») : leur appliquer le style des sur-titres. Mettre les chaînes à flèches (« Phénomène → Saisie… ») en avant dans un bandeau, pour qu'elles se lisent comme un schéma.
15. **Cartes des Concepts.** Égaliser les hauteurs sur une même rangée. Au survol, faire monter légèrement la carte et accentuer la bordure dorée. Mettre les symboles (K, M, Σ, Δ) en Georgia sur une chasse fixe pour que les formules s'alignent.
16. **Rythme vertical.** Fixer une échelle d'espacements (8, 16, 24, 40, 64, 96 px) dans v16.css. Les écarts entre sections varient aujourd'hui d'une page à l'autre.
17. **Images.** Définir un `aspect-ratio` et des `sizes` pour éviter les décalages au chargement. Charger en différé (lazy) les images situées sous le premier écran. Sur mobile, la pyramide de Maât deviendrait zoomable au toucher, car son texte intégré est illisible à 390 px.
18. **Mouvements.** Utiliser des transitions courtes (150 à 200 ms) sur les boutons, les onglets et le menu, et les désactiver avec `prefers-reduced-motion`.
19. **Impression.** Ajouter une feuille de style d'impression pour les chapitres et la Déclaration : sans en-tête, sans menu ni pied de page, texte noir sur fond blanc.

## Hors du périmètre (à arbitrer)

- La mention « Prototype éditorial — Version de démonstration… » s'affiche dans le pied de page. C'est un texte du prototype, conservé tel quel, mais elle déprécie un site en production.
- « Extrait destiné… » s'affiche alors que les textes sont désormais intégraux.

## Estimation

- Priorité 1 : environ 1 jour.
- Priorité 2 : 1,5 jour.
- Priorité 3 : 1 jour.

Chaque lot serait vérifié avec le comparateur de textes déjà en place (0 phrase du prototype manquante attendue) et par des captures avant/après à 1440 et 390 px.

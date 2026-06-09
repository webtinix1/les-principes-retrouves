/* ==========================================================================
   Données du blog / système d'articles (sans back-end, compatible file://).
   Modèle de données : voir docs/data-dictionary.md (article).
   En v2 (PrestaShop), ces entrées deviennent des billets gérés au back-office.
   ========================================================================== */
const ARTICLES = [
  {
    slug: "desadherence-reflexive-visibilite-structurelle",
    title: "Désadhérence réflexive et visibilité structurelle",
    category: "Working Paper",
    published_at: "2026-03-12",
    reading_minutes: 14,
    excerpt: "Les conditions structurelles de possibilité de la découverte scientifique face aux paradigmes saturés.",
    lede: "Cet article formalise les conditions structurelles de possibilité de la découverte scientifique et théorise la désadhérence réflexive comme compétence méthodologique supérieure.",
    body: `
      <p>Face à la fragmentation croissante du savoir contemporain, la présente recherche pose une question rarement formulée : à quelles conditions une découverte devient-elle seulement <em>visible</em> ? L'hypothèse défendue est qu'un paradigme saturé organise, par sa structure même, l'invisibilité de ce qui le déborde.</p>

      <h2>I. La saturation cognitive et les obstacles structurels</h2>
      <p>Un cadre théorique parvenu à maturité cesse d'être un instrument de découverte pour devenir un filtre de pertinence. Ce qui ne se laisse pas formuler dans ses catégories est tenu pour non pertinent, non parce qu'il est faux, mais parce qu'il est <em>illisible</em>. La saturation n'est pas un défaut accidentel : elle est la rançon de la cohérence.</p>

      <h2>II. La désadhérence réflexive comme compétence supérieure</h2>
      <p>La désadhérence réflexive désigne la suspension provisoire et rigoureuse des catégories instituées. Elle ne relève pas du scepticisme, mais d'une discipline : se déprendre des évidences héritées pour reconstruire les structures invisibles dont les phénomènes ne sont que la trace.</p>
      <blockquote>« Le réel est voilé pour tous, filtré pour certains, et reconstructible par la méthode. »</blockquote>

      <h2>III. Le décentrement, locus énonciatif et universalité</h2>
      <p>L'universalité d'une théorie ne tient pas au lieu d'où elle est énoncée. Penser depuis Brazzaville n'est pas une limite mais un décentrement opératoire : il rend visibles des défaillances structurelles que le centre supposé tient pour résolues.</p>

      <h2>IV. Le droit comme laboratoire structurel</h2>
      <p>Le droit constitutionnel offre un terrain d'épreuve privilégié : il met en scène, de manière formalisée, la tension entre validité et effectivité. À ce titre, il substitue à l'induction comparatiste classique une méthode déductive fondationnelle.</p>

      <h2>Conclusion — L'impérium théorique</h2>
      <p>L'autorité d'une théorie est une propriété objective de la théorie, non du chercheur. Elle procède de sa nécessité démontrée. Tel est l'impérium théorique : non un pouvoir, mais une contrainte de cohérence.</p>
    `
  },
  {
    slug: "procedure-ineffectivite-proactivite-encadree",
    title: "Quand la procédure masque l'ineffectivité",
    category: "Tribune",
    published_at: "2026-04-02",
    reading_minutes: 7,
    excerpt: "Pour une proactivité judiciaire encadrée : la fiction de clôture et l'écart entre validité formelle et effectivité.",
    lede: "Un système juridique peut être formellement valide et concrètement défaillant. La procédure héritée organise parfois l'invisibilité de ses propres carences.",
    body: `
      <h2>Le constat</h2>
      <p>Entre la validité formelle d'une norme et son effectivité concrète, l'écart est souvent tenu pour un simple problème d'application. Ce travail soutient qu'il s'agit d'une question de structure : certaines architectures procédurales rendent l'ineffectivité littéralement impensable.</p>

      <h2>Le diagnostic : la fiction de clôture</h2>
      <p>La fiction de clôture est le présupposé selon lequel le cadre procédural est complet et auto-suffisant. Elle neutralise la défaillance en la rejetant hors du champ de ce qui peut être examiné. L'angle mort n'est pas un oubli : il est organisé.</p>
      <blockquote>« Le juge constitutionnel a le devoir — non la simple faculté — d'intervenir d'office chaque fois que l'effectivité de la Constitution est menacée. »</blockquote>

      <h2>La solution : la proactivité judiciaire encadrée</h2>
      <p>La proactivité encadrée n'est pas un activisme. C'est une obligation structurelle, déclenchée par l'urgence caractérisée, et bornée par une motivation rationnelle qui en garantit la sécurité juridique.</p>

      <h2>L'ancrage</h2>
      <p>Pensée depuis Brazzaville pour le monde, cette proposition rappelle une thèse simple : l'universel n'a pas de centre, il se démontre.</p>
    `
  },
  {
    slug: "fiction-de-cloture-angle-mort",
    title: "La fiction de clôture, angle mort du positivisme procédural",
    category: "Note doctrinale",
    published_at: "2026-04-20",
    reading_minutes: 9,
    excerpt: "Comment la séparation validité / effectivité produit une invisibilisation matérielle de la défaillance normative.",
    lede: "La séparation stricte entre validité et effectivité, utile en théorie, devient un mécanisme d'aveuglement lorsqu'elle est rigidifiée.",
    body: `
      <h2>La dualité fonctionnelle du cadre processuel</h2>
      <p>Tout cadre processuel révèle et masque simultanément. Il rend visibles les questions qu'il sait traiter et invisibles celles qu'il ne sait pas formuler. Le positivisme procédural rigidifié érige ce masquage en vertu.</p>

      <h2>La neutralisation par la séparation validité / effectivité</h2>
      <p>En cantonnant l'effectivité hors du champ de la validité, la doctrine se dote d'un alibi : la norme demeure « valide » quand bien même elle serait structurellement inopérante. La défaillance est ainsi reléguée au rang de fait extérieur.</p>
      <ul>
        <li>Imprécision normative tenue pour un défaut de rédaction sans portée structurelle.</li>
        <li>Renvoi inconstitutionnel au pouvoir exécutif traité comme une modalité d'application.</li>
        <li>Omission législative qualifiée de silence, non de carence.</li>
      </ul>

      <h2>L'autosuffisance procédurale et le défaut juridictionnel</h2>
      <p>L'autosuffisance proclamée de la procédure produit un défaut juridictionnel : l'organe chargé de garantir la cohérence du système se trouve désarmé face à ses propres angles morts. Restaurer la matrice systémique suppose de réintégrer l'effectivité dans le champ du contrôle.</p>
    `
  },
  {
    slug: "universel-sans-centre-maat",
    title: "L'universel n'a pas de centre : Maât et décolonisation méthodologique",
    category: "Note doctrinale",
    published_at: "2026-05-08",
    reading_minutes: 8,
    excerpt: "La Maât comme opérateur logique de non-contradiction structurelle, et la pluralité des sources du savoir.",
    lede: "Reconnaître la pluralité des sources de l'intelligibilité n'affaiblit pas l'universel : c'est la condition d'un universalisme réel.",
    body: `
      <h2>La Maât comme opérateur logique</h2>
      <p>La Maât n'est pas convoquée ici comme référence culturelle, mais comme opérateur logique de non-contradiction structurelle. Elle transpose, dans le champ normatif, les principes universels de l'intelligibilité — sans les exposer comme tels.</p>
      <blockquote>« La Maât transpose, dans le champ normatif du droit, de la justice et de l'équité procédurale, les principes universels de l'intelligibilité, sans les exposer comme tels. »</blockquote>

      <h2>Décolonisation méthodologique</h2>
      <p>Désoccidentaliser la normativité ne consiste pas à lui substituer un autre centre, mais à la ramener à sa portée humaine universelle. Les principes formalisés dès Kemet et transmis à la tradition grecque appartiennent à un patrimoine rationnel commun.</p>

      <h2>Un universalisme réel</h2>
      <p>L'universel ne se décrète pas depuis un lieu : il se démontre par sa nécessité. Telle est la thèse que ce travail soutient, depuis Brazzaville, pour le monde.</p>
    `
  }
];

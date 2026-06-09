/* ==========================================================================
   main.js — injection partials, nav mobile, validation formulaire,
   carrousel, blog (liste + filtres) et page article.
   Dépend de partials.js et (sur les pages blog) de articles.js.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    injecterPartials();
    activerNavMobile();
    activerFormulaireContact();
    initCarrousels();
    initBlogListe();
    initArticle();
    initDerniersArticles();
    majAnnee();
  });

  /* 1. Injection header + footer ---------------------------------------- */
  function injecterPartials() {
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");
    var pageId = (document.body.getAttribute("data-page") || "accueil");
    if (header && typeof renderHeader === "function") header.innerHTML = renderHeader(pageId);
    if (footer && typeof renderFooter === "function") footer.innerHTML = renderFooter();
  }

  /* 2. Menu mobile (hamburger) ------------------------------------------ */
  function activerNavMobile() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var ouvert = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* 3. Validation du formulaire de contact (maquette) ------------------- */
  function activerFormulaireContact() {
    var form = document.getElementById("contact_form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valide = true;
      ["full_name", "email", "subject", "message", "consent_rgpd"].forEach(function (name) {
        var champ = form.elements[name];
        if (!champ) return;
        var row = champ.closest(".form__row");
        var ok;
        if (champ.type === "checkbox") ok = champ.checked;
        else if (champ.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(champ.value.trim());
        else ok = champ.value.trim().length > 0;
        if (row) row.classList.toggle("is-invalid", !ok);
        if (!ok) valide = false;
      });
      if (!valide) return;
      var succes = document.getElementById("form_success");
      if (succes) succes.style.display = "block";
      form.reset();
    });
  }

  /* 4. Carrousel -------------------------------------------------------- */
  function initCarrousels() {
    var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll(".carousel").forEach(function (carousel) {
      var viewport = carousel.querySelector(".carousel__viewport");
      var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel__slide"));
      if (slides.length === 0) return;
      var index = 0, timer = null;

      // Points de navigation
      var dots = carousel.querySelector(".carousel__dots");
      slides.forEach(function (_, i) {
        var b = document.createElement("button");
        b.className = "carousel__dot" + (i === 0 ? " is-active" : "");
        b.type = "button";
        b.setAttribute("aria-label", "Aller à la diapositive " + (i + 1));
        b.addEventListener("click", function () { aller(i); relancer(); });
        if (dots) dots.appendChild(b);
      });
      var puces = dots ? Array.prototype.slice.call(dots.children) : [];

      function ajusterHauteur() {
        if (viewport) viewport.style.height = slides[index].offsetHeight + "px";
      }
      function aller(i) {
        slides[index].classList.remove("is-active");
        if (puces[index]) puces[index].classList.remove("is-active");
        index = (i + slides.length) % slides.length;
        slides[index].classList.add("is-active");
        if (puces[index]) puces[index].classList.add("is-active");
        ajusterHauteur();
      }
      function suivant() { aller(index + 1); }
      function precedent() { aller(index - 1); }
      function relancer() {
        if (reduit || slides.length < 2) return;
        clearInterval(timer);
        timer = setInterval(suivant, 6500);
      }

      var bn = carousel.querySelector(".carousel__btn--next");
      var bp = carousel.querySelector(".carousel__btn--prev");
      if (bn) bn.addEventListener("click", function () { suivant(); relancer(); });
      if (bp) bp.addEventListener("click", function () { precedent(); relancer(); });

      carousel.addEventListener("mouseenter", function () { clearInterval(timer); });
      carousel.addEventListener("mouseleave", relancer);

      slides[0].classList.add("is-active");
      ajusterHauteur();
      window.addEventListener("resize", ajusterHauteur);
      window.addEventListener("load", ajusterHauteur);
      relancer();
    });
  }

  /* 5. Utilitaires articles -------------------------------------------- */
  function formaterDate(iso) {
    try {
      return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" })
        .format(new Date(iso + "T00:00:00"));
    } catch (e) { return iso; }
  }
  function articlesTries() {
    return (typeof ARTICLES !== "undefined" ? ARTICLES.slice() : [])
      .sort(function (a, b) { return a.published_at < b.published_at ? 1 : -1; });
  }
  function carteArticle(a) {
    return '<article class="card article-card">' +
      '<span class="tag">' + a.category + '</span>' +
      '<h3><a href="article.html?slug=' + encodeURIComponent(a.slug) + '">' + a.title + '</a></h3>' +
      '<div class="article-meta"><span>' + formaterDate(a.published_at) + '</span><span>' + a.reading_minutes + ' min de lecture</span></div>' +
      '<p>' + a.excerpt + '</p>' +
      '<p class="lire"><a href="article.html?slug=' + encodeURIComponent(a.slug) + '">Lire l\'article →</a></p>' +
      '</article>';
  }

  /* 6. Page Blog : liste + filtres ------------------------------------- */
  function initBlogListe() {
    var liste = document.getElementById("blog_liste");
    if (!liste || typeof ARTICLES === "undefined") return;
    var tous = articlesTries();
    var categories = ["Tous"].concat(tous.map(function (a) { return a.category; })
      .filter(function (c, i, arr) { return arr.indexOf(c) === i; }));

    var filtres = document.getElementById("blog_filtres");
    if (filtres) {
      filtres.innerHTML = categories.map(function (c, i) {
        return '<button class="filtre' + (i === 0 ? " is-active" : "") + '" data-cat="' + c + '">' + c + '</button>';
      }).join("");
      filtres.addEventListener("click", function (e) {
        if (e.target.classList.contains("filtre")) {
          filtres.querySelectorAll(".filtre").forEach(function (f) { f.classList.remove("is-active"); });
          e.target.classList.add("is-active");
          rendre(e.target.getAttribute("data-cat"));
        }
      });
    }
    function rendre(cat) {
      var items = (!cat || cat === "Tous") ? tous : tous.filter(function (a) { return a.category === cat; });
      liste.innerHTML = items.map(carteArticle).join("");
    }
    rendre("Tous");
  }

  /* 7. Accueil : derniers articles ------------------------------------- */
  function initDerniersArticles() {
    var bloc = document.getElementById("derniers_articles");
    if (!bloc || typeof ARTICLES === "undefined") return;
    bloc.innerHTML = articlesTries().slice(0, 3).map(carteArticle).join("");
  }

  /* 8. Page Article ---------------------------------------------------- */
  function initArticle() {
    var conteneur = document.getElementById("article");
    if (!conteneur || typeof ARTICLES === "undefined") return;
    var slug = new URLSearchParams(window.location.search).get("slug");
    var tous = articlesTries();
    var a = tous.filter(function (x) { return x.slug === slug; })[0];

    if (!a) {
      conteneur.innerHTML = '<section class="section"><div class="container prose">' +
        '<h1>Article introuvable</h1><p>Cet article n\'existe pas ou a été déplacé.</p>' +
        '<p><a class="btn btn--or" href="blog.html">Retour au blog</a></p></div></section>';
      return;
    }

    document.title = a.title + " | Les Principes Retrouvés";
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", a.excerpt);

    var i = tous.indexOf(a);
    var prec = tous[i + 1]; // plus ancien
    var suiv = tous[i - 1]; // plus récent

    conteneur.innerHTML =
      '<section class="page-hero"><div class="container">' +
        '<p class="breadcrumb"><a href="blog.html">Blog</a> / ' + a.category + '</p>' +
        '<h1>' + a.title + '</h1>' +
        '<div class="article-header__meta"><span class="tag">' + a.category + '</span>' +
        '<span>' + formaterDate(a.published_at) + '</span><span>' + a.reading_minutes + ' min de lecture</span></div>' +
      '</div></section>' +
      '<section class="section"><div class="container">' +
        '<div class="article__body">' +
          '<p class="article__lede">' + a.lede + '</p>' +
          a.body +
        '</div>' +
        '<nav class="article-nav">' +
          (prec ? '<a href="article.html?slug=' + encodeURIComponent(prec.slug) + '">← ' + prec.title + '</a>' : '<span class="is-disabled">←</span>') +
          (suiv ? '<a href="article.html?slug=' + encodeURIComponent(suiv.slug) + '" style="text-align:right;">' + suiv.title + ' →</a>' : '<span class="is-disabled">→</span>') +
        '</nav>' +
      '</div></section>';
  }

  /* 9. Année dynamique -------------------------------------------------- */
  function majAnnee() {
    var cibles = document.querySelectorAll("[data-annee]");
    if (!cibles.length) return;
    var an = new Date().getFullYear();
    cibles.forEach(function (el) { el.textContent = an; });
  }
})();

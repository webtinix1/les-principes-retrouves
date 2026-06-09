/* ==========================================================================
   main.js — injection des partials, navigation mobile, validation formulaire.
   Dépend de partials.js (chargé avant ce fichier).
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    injecterPartials();
    activerNavMobile();
    activerFormulaireContact();
    majAnnee();
  });

  /* 1. Injection header + footer ---------------------------------------- */
  function injecterPartials() {
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");
    // page_id lu sur <body data-page="...">
    var pageId = (document.body.getAttribute("data-page") || "accueil");

    if (header && typeof renderHeader === "function") {
      header.innerHTML = renderHeader(pageId);
    }
    if (footer && typeof renderFooter === "function") {
      footer.innerHTML = renderFooter();
    }
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

    // Refermer après clic sur un lien (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* 3. Validation du formulaire de contact (côté client, maquette) ------ */
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
        if (champ.type === "checkbox") {
          ok = champ.checked;
        } else if (champ.type === "email") {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(champ.value.trim());
        } else {
          ok = champ.value.trim().length > 0;
        }
        if (row) row.classList.toggle("is-invalid", !ok);
        if (!ok) valide = false;
      });

      if (!valide) return;

      // Maquette : pas d'envoi réel (back-end branché en v2 — cf. integrations.md)
      var succes = document.getElementById("form_success");
      if (succes) succes.style.display = "block";
      form.reset();
    });
  }

  /* 4. Année dynamique éventuelle --------------------------------------- */
  function majAnnee() {
    var cibles = document.querySelectorAll("[data-annee]");
    if (!cibles.length) return;
    var an = new Date().getFullYear();
    cibles.forEach(function (el) { el.textContent = an; });
  }
})();

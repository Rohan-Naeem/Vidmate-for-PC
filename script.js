/* =========================================================
   VidMate Guide — script.js
   Vanilla JavaScript. No dependencies.
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     CONFIGURATION
     Add a legitimate, verified APK download URL here when
     one becomes available. Leave empty until then.
     Example: const DOWNLOAD_URL = "https://example.com/vidmate.apk";
  --------------------------------------------------------- */
  const DOWNLOAD_URL = "";

  /* ---------------------------------------------------------
     Mobile navigation
  --------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const mobileNav = document.querySelector(".mobile-nav");

    if (!toggle || !mobileNav) return;

    function closeNav() {
      mobileNav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    function openNav() {
      mobileNav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", function () {
      const isOpen = mobileNav.classList.contains("is-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNav();
      }
    });
  }

  /* ---------------------------------------------------------
     Smooth scroll for in-page anchor links
  --------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        const headerOffset = 84;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      });
    });
  }

  /* ---------------------------------------------------------
     Download button behavior
     If DOWNLOAD_URL is set, the button becomes a real link
     behavior. If empty, clicking shows a professional
     placeholder message instead.
  --------------------------------------------------------- */
  function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll("[data-download-btn]");

    downloadButtons.forEach(function (button) {
      const statusEl = document.querySelector(
        button.getAttribute("data-status-target") || "#download-status"
      );

      button.addEventListener("click", function (event) {
        if (DOWNLOAD_URL) {
          window.location.href = DOWNLOAD_URL;
          return;
        }

        event.preventDefault();

        if (statusEl) {
          statusEl.textContent =
            "Download link will be added when an appropriate legitimate source is available.";
          statusEl.classList.add("is-visible");
          statusEl.setAttribute("role", "status");
        }
      });
    });
  }

  /* ---------------------------------------------------------
     Active navigation state based on current page
  --------------------------------------------------------- */
  function initActiveNav() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".main-nav a, .mobile-nav a").forEach(function (link) {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------------------------------------------------------
     Init
  --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initSmoothScroll();
    initDownloadButtons();
    initActiveNav();
  });
})();

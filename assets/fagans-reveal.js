/**
 * Fagans Scroll Reveal
 * IntersectionObserver para elementos con [data-f-reveal]
 * Respeta prefers-reduced-motion.
 */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: '0px 0px -14% 0px' }
  );

  function observeEl(el) {
    if (!el.classList.contains('is-visible')) observer.observe(el);
  }

  function observe() {
    document.querySelectorAll('[data-f-reveal]:not(.is-visible)').forEach(observeEl);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }

  // Re-observe after Shopify section updates (theme editor)
  document.addEventListener('shopify:section:load', observe);

  /* ── MutationObserver: captura cards inyectadas dinámicamente
     (product-recommendations, recently-viewed, AJAX) ──────────── */
  var mutObs = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return; // solo elementos
        // el nodo mismo
        if (node.hasAttribute && node.hasAttribute('data-f-reveal')) {
          observeEl(node);
        }
        // descendientes del nodo
        if (node.querySelectorAll) {
          node.querySelectorAll('[data-f-reveal]:not(.is-visible)').forEach(observeEl);
        }
      });
    });
  });

  mutObs.observe(document.body, { childList: true, subtree: true });
})();

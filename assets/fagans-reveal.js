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

  function observe() {
    document.querySelectorAll('[data-f-reveal]:not(.is-visible)').forEach((el) => {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }

  // Re-observe after Shopify section updates (theme editor)
  document.addEventListener('shopify:section:load', observe);
})();

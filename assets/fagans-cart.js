/* ─────────────────────────────────────────────────────────────────
   Fagans Cart — Add-to-cart universal desde cards de producto
   Escucha [data-add-to-cart] en cualquier página (catálogo,
   homepage, colecciones) y actualiza el drawer del tema en
   tiempo real usando window.themeCore.CartApi.
   ───────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-add-to-cart]');
    if (!btn) return;
    e.preventDefault();

    var variantId = parseInt(btn.dataset.variantId, 10);
    if (!variantId) return;

    /* ── Estado visual del botón ── */
    var originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML =
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="animation:fagans-spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';

    /* ── Intentar usar el CartApi del tema (actualiza drawer en tiempo real) ── */
    var themeApi = window.themeCore && window.themeCore.CartApi;

    if (themeApi) {
      themeApi.makeRequest(themeApi.actions.ADD_TO_CART, { id: variantId, quantity: 1 })
        .then(function () {
          return themeApi.makeRequest(themeApi.actions.GET_CART);
        })
        .then(function () {
          btn.innerHTML = '✓ Añadido';
          setTimeout(function () {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
          }, 2000);
        })
        .catch(function () {
          btn.innerHTML = 'Sin stock';
          setTimeout(function () {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
          }, 2000);
        });
    } else {
      /* ── Fallback: fetch directo si el CartApi no está disponible ── */
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      })
        .then(function (r) {
          if (!r.ok) throw new Error('Cart error');
          return r.json();
        })
        .then(function () {
          btn.innerHTML = '✓ Añadido';
          /* Eventos genéricos como fallback */
          document.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true }));
          setTimeout(function () {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
          }, 2000);
        })
        .catch(function () {
          btn.innerHTML = 'Sin stock';
          setTimeout(function () {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
          }, 2000);
        });
    }
  });

  /* ── Animación spinner ── */
  if (!document.getElementById('fagans-cart-spin-style')) {
    var style = document.createElement('style');
    style.id = 'fagans-cart-spin-style';
    style.textContent = '@keyframes fagans-spin{to{transform:rotate(360deg)}}';
    document.head.appendChild(style);
  }
})();

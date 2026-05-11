(function () {
  'use strict';

  var translations = {
    'Customer Reviews': 'Reseñas de clientes',
    'Be the first to write a review': 'Sé el primero en escribir una reseña',
    'Write a review': 'Escribir reseña',
    'Recommendations': 'Recomendaciones',
    'Recently viewed': 'Vistos recientemente',
    'Your cart': 'Carrito',
    'Cart': 'Carrito',
    'View cart': 'Ver carrito',
    'Upsell products': 'Productos recomendados',
    'Add to cart': 'Agregar al carrito',
    'ADD TO CART': 'AGREGAR AL CARRITO',
    'Vendor:': 'Marca:',
    'Regular price': 'Precio regular',
    'HOME': 'Inicio',
    'PRODUCTS': 'Productos',
    'Product': 'Producto',
    'Products': 'Productos',
    'Content:': 'Contenido:',
    'Quantity:': 'Cantidad:',
    'Tax included.': 'Impuesto incluido.',
    'Tax included and shipping calculated at checkout': 'Impuesto incluido. Envío calculado al finalizar la compra',
    'Tax included. Shipping calculated at checkout.': 'Impuesto incluido. Envío calculado al finalizar la compra.',
    'Taxes and shipping calculated at checkout': 'Impuestos y envío calculados al finalizar la compra',
    'Taxes incluidos - costo de envio disponible en \'check out\'': 'Impuestos incluidos. El costo de envío se calcula al finalizar la compra.',
    'Taxes incluidos - costo de envío disponible en \'check out\'': 'Impuestos incluidos. El costo de envío se calcula al finalizar la compra.',
    'Shipping calculated at checkout.': 'Envío calculado al finalizar la compra.',
    'Shipping calculated at checkout': 'Envío calculado al finalizar la compra',
    'More payment options': 'Más opciones de pago',
    'You are only {amount} away from free shipping': 'Te faltan {amount} para envío gratis',
    'You got free shipping': 'Ya tienes envío gratis',
    'Daily Wear': 'Diario',
    'DAYTIME': 'Día',
    'OFFICE': 'Oficina',
    'GYM': 'Gimnasio'
  };

  function normalize(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function translateText(text) {
    var clean = normalize(text);

    var cartHeading = clean.match(/^Your cart\s*\((\d+)\)$/i);
    if (cartHeading) {
      return 'Carrito (' + cartHeading[1] + ')';
    }

    var productStock = clean.match(/^(\d+)\s+products?\s+in\s+stock$/i);
    if (productStock) {
      return productStock[1] === '1'
        ? '1 producto disponible'
        : productStock[1] + ' productos disponibles';
    }

    return translations[clean] || null;
  }

  function translateTextNode(node) {
    var original = node.nodeValue;
    var translated = translateText(original);
    if (!translated) return;
    node.nodeValue = original.replace(original.trim(), translated);
  }

  function run() {
    if (!document.body) return;

    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          var parent = node.parentElement;
          if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].indexOf(parent.tagName) > -1) {
            return NodeFilter.FILTER_REJECT;
          }
          return translateText(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      }
    );

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateTextNode);
  }

  document.addEventListener('DOMContentLoaded', run);
  document.addEventListener('shopify:section:load', run);

  var observer = new MutationObserver(function () {
    run();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();

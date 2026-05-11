(function () {
  'use strict';

  var translations = {
    'Customer Reviews': 'Reseñas de clientes',
    'Be the first to write a review': 'Sé el primero en escribir una reseña',
    'Write a review': 'Escribir reseña',
    'Recommendations': 'Recomendaciones',
    'Recently viewed': 'Vistos recientemente',
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
    'Shipping calculated at checkout.': 'Envío calculado al finalizar la compra.',
    'Shipping calculated at checkout': 'Envío calculado al finalizar la compra',
    'More payment options': 'Más opciones de pago',
    'Daily Wear': 'Diario',
    'DAYTIME': 'Día',
    'OFFICE': 'Oficina',
    'GYM': 'Gimnasio'
  };

  function translateText(text) {
    var clean = text.trim();
    return translations[clean] || null;
  }

  function translateTextNode(node) {
    var translated = translateText(node.nodeValue);
    if (!translated) return;
    node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), translated);
  }

  function run() {
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

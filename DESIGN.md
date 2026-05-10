---
name: Fagans Perfumería
description: Perfumería premium de El Salvador — originales, sin clones, experiencia de compra rápida y sofisticada.
colors:
  onix: "#0E0F0F"
  blanco: "#FFFFFF"
  platino: "#F1F1F1"
  sandalo: "#C79FB8"
  nogal: "#582D0C"
  onix-80: "#2A2B2B"
  onix-60: "#464747"
  sandalo-20: "#F0E8ED"
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  display-sm:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  body-sm:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.02em"
  label:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
  "2xl": "128px"
components:
  button-primary:
    backgroundColor: "{colors.onix}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.none}"
    padding: "14px 40px"
  button-primary-hover:
    backgroundColor: "{colors.sandalo}"
    textColor: "{colors.onix}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.onix}"
    rounded: "{rounded.none}"
    padding: "13px 39px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.blanco}"
    rounded: "{rounded.none}"
    padding: "13px 39px"
  product-card:
    backgroundColor: "{colors.platino}"
    textColor: "{colors.onix}"
    rounded: "{rounded.none}"
    padding: "0"
  product-card-hover:
    backgroundColor: "{colors.onix}"
    textColor: "{colors.blanco}"
  badge-nota:
    backgroundColor: "{colors.sandalo-20}"
    textColor: "{colors.nogal}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  badge-acorde:
    backgroundColor: "{colors.onix}"
    textColor: "{colors.platino}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  cart-drawer:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.onix}"
    width: "420px"
---

## Overview

Fagans opera en dos registros simultáneos: **drama cinematográfico** en el home y **eficiencia quirúrgica** en catálogo y producto. El home se comporta como landing de marca tech — scroll revelador, producto héroe, efectos de entrada. El catálogo y producto se comportan como herramienta de compra — densidad, metadata, fricción mínima.

La paleta es casi binaria: onix profundo sobre blanco y platino. El sándalo (`#C79FB8`) es el único calor — úsalo con economía extrema. El nogal (`#582D0C`) aparece solo en acentos de metadata (badges de notas cálidas, tonos de madera).

Sin bordes redondeados en elementos grandes. La rectitud es sofisticación. El pill solo para badges de metadata.

**Fuente de verdad de CSS tokens:**
```css
:root {
  --onix: #0E0F0F;
  --blanco: #FFFFFF;
  --platino: #F1F1F1;
  --sandalo: #C79FB8;
  --nogal: #582D0C;
  --onix-80: #2A2B2B;
  --onix-60: #464747;
  --sandalo-20: #F0E8ED;
}
```

## Colors

**Estrategia: Drenched en home, Restrained en catálogo.**

El home puede estar bañado en onix — secciones enteras de negro con texto blanco, imágenes de producto que emergen del fondo oscuro. El catálogo y la página de producto invierten: platino/blanco como superficie, onix como texto. El sándalo es el momento de color — nunca en áreas grandes, siempre en detalles que merecen atención (hover de CTA, badge de género femenino/unisex, el punto de acento en la tipografía de la marca).

**No usar:**
- Negro puro `#000000` o blanco puro `#FFFFFF` para texto sobre fondos del mismo extremo — usar onix/platino respectivamente
- Sándalo como color de fondo en áreas mayores a un badge o línea decorativa
- Nogal fuera de contexto de metadata de fragancia

**Contextos de color:**
- Home hero / secciones destacadas: fondo onix, texto blanco
- Catálogo / producto: fondo platino o blanco, texto onix
- Cards en hover: inversión completa (fondo onix, texto blanco)
- Metadata de fragancia (notas, acordes): badges sobre sandalo-20 o badges onix
- Encargo / formularios: fondo blanco, bordes onix 1px, sin relleno de color

## Typography

**Display (Georgia):** Solo para titulares de página, nombres de producto en hero, citas de marca. Tamaño generoso — cuando aparece, manda. Tracking negativo (`-0.02em`) en tamaños grandes. Nunca bold en Georgia — el peso 400 ya tiene presencia.

**Body (system-ui):** Todo lo demás. Formularios, descripciones, precios, filtros, metadata. Legible, neutral, rápido de escanear.

**Label:** ALL CAPS, tracking amplio (`0.12em`), tamaño 0.75rem. Úsalo para categorías de metadata (`NOTAS DE SALIDA`, `OCASIÓN`, `ESTACIÓN`), no para subtítulos decorativos.

**Reglas duras:**
- Líneas de cuerpo: máx 65ch
- No combinar Georgia con bold (weight 700+) nunca
- La jerarquía se construye con escala de tamaño, no con peso ni color
- Precio: body-sm en label caps (`$45.00`) — no serif para números

**Escala de tamaños:**
```
display:    clamp(2.5rem, 6vw, 5rem)
display-sm: clamp(1.5rem, 3.5vw, 2.5rem)
h3:         1.25rem / Georgia / 400
body:       1rem / system-ui / 400
body-sm:    0.875rem / system-ui / 400
label:      0.75rem / system-ui / 500 / uppercase / 0.12em tracking
```

## Elevation

Fagans no usa sombras decorativas. La jerarquía visual se construye con:

1. **Color de fondo**: platino (medio) < blanco (alto) < onix (dominante en hero)
2. **Espacio negativo**: márgenes generosos crean separación más que box-shadows
3. **Borde 1px solid**: solo para elementos interactivos en estado idle (inputs, botones outline). Color: `var(--onix)` al 15% de opacidad

**Excepciones admitidas:**
- Cart drawer: `box-shadow: -4px 0 24px rgba(14,15,15,0.12)` — el único lugar donde una sombra tiene sentido funcional (el drawer flota sobre el contenido)
- Tooltips de metadata: `box-shadow: 0 4px 12px rgba(14,15,15,0.08)`

## Components

### Botones

Tres variantes, sin bordes redondeados, padding horizontal generoso.

**Primary (onix):** `background: var(--onix); color: var(--blanco); padding: 14px 40px`. Hover: fondo cambia a `var(--sandalo)`, texto a `var(--onix)`. Transición: `background 0.2s ease-out`.

**Secondary (outline):** `background: transparent; border: 1px solid var(--onix); color: var(--onix); padding: 13px 39px`. Hover: invierte a primary. Úsalo para acciones secundarias en fondos claros.

**Ghost (para fondos oscuros):** `background: transparent; border: 1px solid rgba(255,255,255,0.4); color: var(--blanco)`. Hover: `border-color: var(--blanco); background: rgba(255,255,255,0.08)`.

**Solicitar (out-of-stock):** Igual que secondary pero con texto `Solicitar` y disabled-state `opacity: 0.5` si no hay stock ni posibilidad de encargo.

### Product Cards

Sin border-radius. El card en idle muestra imagen, nombre (Georgia display-sm), precio (label), badge de género.

Hover: la imagen escala `1.04` (transform, no layout), fondo del card cambia a onix, texto a blanco. Transición `0.3s ease-out-quart`. El CTA aparece deslizando desde abajo.

Dos tamaños de card en catálogo para romper monotonía: card estándar (1 columna) y card destacado (2 columnas en desktop). El destacado usa imagen portrait, el estándar usa imagen cuadrada.

### Metadata Badges (Fragrantica-style)

```
Nota/Acorde:  pill, 4px 12px, body-sm, uppercase tracking-wide
Género:       pill, sandalo-20 bg + nogal text (femenino/unisex) | onix bg + blanco text (masculino)
Temporada:    pill, platino bg + onix text
```

Los badges de acordes principales se muestran como barras horizontales de ancho proporcional (porcentaje del acorde) debajo del nombre, no como tags. Inspiración Fragrantica pero sin los colores chillones.

### Filtros del catálogo

Barra horizontal sticky debajo del header. Fondo blanco, border-bottom 1px onix 10%. Chips de filtro: outline por defecto, onix-filled cuando activos. Sin dropdowns — todos los filtros visibles en la barra en desktop, scroll horizontal en mobile.

### Cart Drawer

420px de ancho desde el borde derecho. Overlay con `backdrop-filter: blur(2px)` sobre el contenido. Fondo blanco. Header del drawer: nombre del producto en Georgia, precio en label. CTA de checkout full-width onix. Sin imágenes grandes — thumbnail 60×80px. Subtotal siempre visible al pie del drawer.

### Encargo (Custom Order Form)

Página dedicada o modal desde el producto. Formulario minimalista: 4 campos (nombre de fragancia sugerida, marca, talla/presentación, nota adicional). Sin decoraciones. Submit button onix. Confirmación inline — sin página de éxito separada.

## Do's and Don'ts

**✓ Hacer:**
- Invertir tarjetas completas (fondo + texto + CTA) en hover — la inversión total se siente más premium que cambiar solo el botón
- Usar Georgia solo para lo que merece atención — nombres de producto en hero, taglines, precio en página de producto
- Mostrar metadata de fragancia en tabla o grid compacto, como ficha técnica
- Usar `prefers-reduced-motion` para desactivar parallax y transiciones de entrada
- Cargar el catálogo con al menos 2 filas visibles en el fold — el usuario no debe adivinar que hay más productos abajo

**✗ No hacer:**
- Borders laterales de acento (`border-left` de color) en cards o callouts — si hay que destacar, usar fondo completo o nada
- Texto con gradiente (`background-clip: text`) — un color sólido, siempre
- Glassmorphism en ningún componente
- Grid de cards idénticas de 3 o 4 columnas sin variación de tamaño
- Sándalo como color dominante en secciones enteras — es un acento de precisión
- Modales para el flujo de encargo si cabe en página — preferir página dedicada o drawer
- Imágenes de producto con fondo blanco sobre fondo platino — pedir imágenes con fondo removido o usar fondo onix para las hero shots

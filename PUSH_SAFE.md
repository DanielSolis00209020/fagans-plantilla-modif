# Protocolo de trabajo — Fagans theme

## CADENA DE AUTORIDAD

```
Shopify (fuente de verdad) → GitHub → local
```

Shopify siempre tiene el estado más reciente (por cambios del editor de tema).
GitHub debe reflejar ese estado antes de que Claude empiece a trabajar.

---

## INICIO DE SESIÓN — siempre, sin excepción

```bash
# 1. Jalar lo que tiene Shopify ahora mismo → local
shopify theme pull --theme 187908981099 --store bhrcza-ne.myshopify.com

# 2. Subir ese estado a GitHub (captura cambios del editor de tema)
git add .
git commit -m "sync: pull desde Shopify antes de iniciar sesión"
git push origin main

# 3. Jalar de GitHub → local (por si hubo merge o conflicto)
git pull
```

Solo después de estos 3 pasos, empezar a trabajar.

---

## VERIFICACIÓN ANTES DE PUBLICAR (obligatorio)

Antes de hacer push al live, siempre verificar visualmente:

```bash
# TÚ corres esto en una terminal aparte:
shopify theme dev --theme 187908981099 --store bhrcza-ne.myshopify.com
```

- Abre http://127.0.0.1:9292 en el navegador
- Claude puede navegar a esa URL para verificar que los cambios se ven bien
- Sin `--theme 187908981099` apunta al tema de desarrollo por defecto — tema equivocado

Solo después de confirmar visualmente, hacer el push al live.

---

## CIERRE DE SESIÓN — después de terminar cambios

```bash
# 1. Guardar en GitHub
git add .
git commit -m "feat: descripción del cambio"
git push origin main

# 2. Subir a Shopify (solo después de verificar con theme dev)
shopify theme push --theme 187908981099 --store bhrcza-ne.myshopify.com --allow-live
```

---

## EL FLUJO COMPLETO EN 3 NODOS

```
┌─────────────┐    pull     ┌──────────┐    pull    ┌───────┐
│   Shopify   │ ──────────► │  GitHub  │ ─────────► │ local │
│ (editor de  │             │  (repo)  │            │       │
│    tema)    │◄────────────│          │◄───────────│       │
└─────────────┘    push     └──────────┘    push    └───────┘

INICIO: Shopify → GitHub → local  (sincronizar)
CIERRE: local → GitHub → Shopify  (publicar)
```

---

## REGLA DE ORO

> **Nunca confiar en lo que hay en local ni en GitHub.**
> Siempre empezar la cadena desde Shopify.

---

## Datos de conexión

```
Store:    bhrcza-ne.myshopify.com
Tema live: 187908981099  (fagans-prod-4-5-26-released)
Backup:    188037628267  (fagans-prod-4-5-27-released)
```

## Flag obligatorio para push al tema publicado

```bash
--allow-live
```

Sin este flag el CLI pide confirmación interactiva y falla.

# Reporte de QA visual — alineación Marketplace

**Fecha:** 2026-09-04

**Rama:** `codex/carrito-fantasma-mvp-pwa`

**Base funcional validada:** `18447f6` (`fix: close internal pilot gaps`)

**Cambio visual:** `style: align MVP with marketplace mockup`

## 1. Referencia

La referencia primaria inspeccionada directamente fue `mockup_marketplace.png`. `mockup_bienestar.png` se revisó únicamente para el cambio de tono posterior al checkout falso.

No se usó un marketplace real como referencia de implementación. Se conservaron identidad, iconografía, tiendas, copy y paleta propios.

## 2. Rasgos visuales extraídos

- Header cálido, compacto y con marca visible.
- Alta densidad comercial: tiendas y varios productos visibles sin grandes vacíos.
- Tiendas pequeñas y visuales antes del catálogo.
- Dos productos por fila en móvil, imágenes protagonistas y precio fácil de escanear.
- Categorías en tira horizontal compacta.
- Carrito siempre accesible y con badge de cantidad.
- Navegación móvil inferior corta.
- Radios moderados, bordes/sombras sutiles y jerarquía tipográfica fuerte.
- Adaptación desktop mediante grids más amplios, sin copiar la sidebar del mockup.
- Color cálido durante browse y transición a menta/teal después del checkout.

El checklist previo a la implementación está en `docs/VISUAL_IMPLEMENTATION_CHECKLIST.md`.

## 3. Archivos cambiados

### Documentación

- `docs/MOCKUP_REVIEW.md`
- `docs/DECISIONS.md`
- `docs/VISUAL_IMPLEMENTATION_CHECKLIST.md`
- `docs/VISUAL_QA_REPORT.md`
- `docs/AGENT_HANDOFF.md`

### Sistema visual y shell

- `tailwind.config.ts`
- `src/index.css`
- `src/App.tsx`
- `src/components/AppShell.tsx`
- `src/components/BrandMark.tsx`
- `src/components/Button.tsx`
- `src/components/SimulationBadge.tsx`
- `src/assets/ghost-mark.svg`

### Componentes de exploración

- `src/components/ModeCard.tsx`
- `src/components/StoreCard.tsx`
- `src/components/ProductCard.tsx`
- `src/components/StoreVisual.tsx` (nuevo)
- `src/components/ProductVisual.tsx` (nuevo)

### Pantallas

- `src/screens/HomeScreen.tsx`
- `src/screens/ModeSelectorScreen.tsx`
- `src/screens/StoreSelectorScreen.tsx`
- `src/screens/CatalogScreen.tsx`
- `src/screens/ProductDetailScreen.tsx`
- `src/screens/CartScreen.tsx`
- `src/screens/CheckoutScreen.tsx`
- `src/screens/TrackingScreen.tsx`
- `src/screens/ResultScreen.tsx`
- `src/screens/HistoryScreen.tsx`

### PWA y sharing

- `index.html`
- `public/manifest.webmanifest`
- `public/icon.svg`
- `public/icon-192.svg`
- `public/icon-512.svg`
- `public/og-image.svg`

## 4. Antes vs. después

| Área | Antes | Después |
|---|---|---|
| Shell | Header sereno con mucho aire y botones de texto. | Franja amarilla compacta, marca, disclosure, iconos y carrito con badge; navegación inferior móvil. |
| Home | Hero grande de bienestar con blobs y título de 4–6xl. | Introducción comercial breve, claim directo, ritual en tres pasos y modos accionables visibles. |
| Tiendas | Cards verticales grandes con descripción extensa. | Destinos compactos en grid, visual propio, tagline y cantidad. |
| Catálogo | Header de tienda sobredimensionado, cards redondeadas y descripciones largas. | Cabecera corta, categorías densas, dos columnas móviles, visuales distintos por categoría y precio protagonista. |
| Producto | Una gran tarjeta de bienestar con tags/padding abundante. | Composición image-first, información comercial directa y CTA visible. |
| Carrito | Cada línea era una card grande separada. | Lista familiar agrupada, miniatura, cantidad, total, eliminar y resumen lateral/adaptativo. |
| Checkout | Bloques amplios y separados. | Resumen de pedido compacto y panel inequívoco “No pagar / Al olvido”. |
| Tracking/Result | Calmados, pero con la misma base visual que todo el producto. | Se convierten en el punto explícito de transición a menta; ahorro es el payoff central. |

## 5. Diferencias deliberadas frente al mockup

- Sin buscador: no existe una función necesaria que justificaría el control.
- Sin sidebar desktop: sus destinos de perfil/favoritos/ajustes están fuera de alcance.
- Sin perfil, favoritos, notificaciones, seller ratings, reseñas, stock o descuentos.
- Ilustraciones originales por categoría en vez de fotos o marcas reales.
- Paleta amarilla/ciruela propia, no una copia cromática de un retailer.
- Disclosure persistente “Compra fantasma · sin cobro”.
- Tracking, Result e History desaceleran deliberadamente la experiencia.

## 6. Capturas y checks responsive

Se capturaron y revisaron en navegador a **390 × 844 px**:

- Home.
- Catálogo FlashMarket.
- Carrito con un producto.
- Resultado “No gastaste S/ 79.90”.

Comparación explícita con `mockup_marketplace.png`:

- **Home:** coincide en header cálido compacto, marca superior y composición orientada a explorar; difiere al dedicar el primer bloque a explicar la simulación, necesario para confianza.
- **Catálogo:** es la coincidencia más fuerte: header amarillo, tienda compacta, categorías horizontales, grid de dos columnas, imágenes dominantes, precios visibles y bottom nav.
- **Carrito:** extiende el lenguaje del mockup con líneas comerciales familiares, sin campos ni apariencias de pago real.
- **Resultado:** difiere intencionalmente; cambia a menta y centra el ahorro, usando la referencia Bienestar solo aquí.

Métricas observadas en Home, catálogo, carrito y resultado: viewport de 390 px y `documentElement.scrollWidth` de 381 px. No hubo scroll horizontal de página; la tira de categorías sí permite overflow horizontal intencional.

Los breakpoints **360, 430, 768 y desktop** fueron revisados en código (grids, anchos máximos y objetivos táctiles), pero no se pudieron volver a capturar visualmente: la herramienta de navegador dejó de autorizar el localhost después de cerrar el diálogo nativo de confirmación. Deben probarse en el staging o en dispositivos reales antes de tráfico público.

Las capturas se realizaron con la herramienta local de navegador y se usaron para iterar; no se añadieron binarios de screenshots al repositorio.

## 7. Regresión funcional

### Shopping — completada en navegador después del rediseño

Home → Comprar algo → FlashMarket → catálogo → producto → agregar → carrito → checkout falso → tracking → resultado → rating final → intención “No” → guardar → historial.

Verificado:

- badge del carrito cambia de 0 a 1;
- subtotal `S/ 79.90` se mantiene en carrito, checkout y resultado;
- tracking se puede saltar después del bloqueo breve;
- guardar vacía el carrito;
- aparece el CTA “Ver historial”;
- historial muestra monto, tienda, rating e intención;
- feedback permanece oculto sin `VITE_FEEDBACK_URL`.

### Food — parcial después del rediseño

Home → rating inicial 4/5 → Pedir comida → AntojoGo → catálogo → producto → agregar al carrito.

El checkout/resultado food usa los mismos componentes y lógica ya aprobados por la regresión previa al commit funcional, pero el recorrido completo no pudo repetirse después de que la herramienta de navegador perdió acceso al localhost. Debe revalidarse en staging.

### Protección de contexto de carrito

Con un producto de AntojoGo activo se intentó cambiar desde Home a “Comprar algo”. Apareció el diálogo esperado indicando que el carrito pertenece a AntojoGo y ofreciendo vaciar/continuar o cancelar. Se eligió cancelar. La sesión de navegador dejó de responder inmediatamente después, por lo que la conservación visual del badge no pudo recapturarse; la misma regla pasó la regresión funcional anterior y su código no fue modificado en el rediseño.

### Persistencia, privacidad y configuración

- La sesión shopping se guardó y apareció inmediatamente en History.
- No existen inputs, textareas o selects de tarjeta, dirección, DNI, teléfono, email o login en las pantallas.
- No se encontraron logos, retailers, sellers ni ratings reales.
- `VITE_FEEDBACK_URL` no configurado: enlace oculto, observado.
- URL configurada: validada en el QA funcional previo a `18447f6`; no reabierta durante esta revisión visual.

## 8. Comandos ejecutados

| Comando | Resultado |
|---|---|
| `npm test` | PASS — 3 archivos, 16/16 tests. |
| `npm run lint` | PASS — sin errores. |
| `npm run build` | PASS — 63 módulos; HTML 1.76 kB, CSS 24.78 kB, JS 225.76 kB (67.32 kB gzip). |
| `npm audit --omit=dev --audit-level=high` | Primer intento bloqueado por CA local; repetido con certificados del sistema: PASS, 0 vulnerabilidades. |
| `git diff --check` | PASS después de retirar whitespace final; solo avisos informativos LF/CRLF de Git en Windows. |

## 9. Issues encontrados y corregidos

- Miniatura de carrito: la etiqueta interna se superponía al icono en tamaños pequeños. Se ocultó solo en miniaturas compactas.
- Resultado tras navegación: la posición previa de scroll podía recortar la parte superior. Cada cambio de pantalla ahora vuelve a `top: 0` y conserva el foco del main.
- Identidad PWA: theme color, iconos y OG image seguían en la paleta teal anterior. Se alinearon al sistema amarillo/ciruela.

## 10. Issues y riesgos restantes

- QA visual real pendiente a 360, 430, 768 y desktop.
- Flujo food completo pendiente de repetir después del rediseño en staging/dispositivo.
- Instalación PWA, safe areas, teclado/zoom y standalone pendientes en Android/iOS reales.
- Los emojis de ilustración varían entre sistemas; son placeholders visuales propios para piloto, no assets finales.
- FlashMarket, AntojoGo y Wishlist Club conservan el riesgo de colisión nominal ya documentado; requieren revisión antes de campaña pública.
- PostHog configurado y formulario real de feedback siguen pendientes de staging.

## 11. Recomendación

**Listo para deploy de owner testing / piloto interno supervisado.**

No se recomienda aún tráfico público amplio. Antes, repetir capturas en los cinco anchos solicitados, completar food en un dispositivo real y verificar instalación PWA, PostHog y feedback en un staging HTTPS.

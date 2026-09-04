# Handoff para futuros agentes

## Propósito

Este documento es la puerta de entrada para Claude Code, Codex, OpenClaw y cualquier otro agente que trabaje sin el contexto de conversaciones anteriores.

## Estado actual que debe asumirse

El MVP funcional está implementado y QA lo dejó apto para demos internas y un piloto cerrado/supervisado. La rama publicada es `codex/carrito-fantasma-mvp-pwa` y el último commit publicado es `e6d8dbf2d7de43cea64b9f33b55746192536d489` (`qa: close mvp review and harden flows`). El checkout local está en `D:\projects\codex\carrito-fantasma`. La revisión P0/P1 descrita en `docs/QA_REPORT.md` está actualmente en el working tree y aún no tiene commit propio.

El flujo completo ya existe: home (con tarjetas de modo accionables), selección de modo y tienda, catálogo, detalle, carrito persistente, checkout falso, tracking simbólico, resultado, encuesta, historial y recomendaciones locales. El checkout actual de trabajo añade rating inicial opcional, confirmación al cambiar de tienda/modo con carrito activo, CTA de historial y feedback externo configurable. No hay deploy público confirmado. Esta nota debe actualizarse si cambia producto, arquitectura, privacidad o alcance.

## Ficha operativa del MVP

### 1. Producto

Carrito Fantasma es una PWA mobile-first para interrumpir compras impulsivas antes de que ocurran. El usuario explora productos o comida ficticios, arma un carrito, confirma una compra falsa, ve un tracking simbólico y descubre cuánto dinero decidió no gastar.

Claim vigente: **“Llena el carrito. Haz checkout falso. Quédate con tu plata.”** No vende productos, no crea pedidos y no debe parecer una pasarela real.

### 2. Objetivo de validación

Validar si el ritual ayuda a ganar tiempo, reduce el impulso y genera una sensación de cierre. Se mide comprensión, completion, alivio/reducción del impulso y probabilidad de repetir antes de una compra real.

Criterio de continuación: más del 50% de quienes empiezan completan la simulación y más del 30% de quienes responden el antes/después reportan menor impulso. No es una herramienta clínica ni asesoría financiera.

### 3. Stack usado

- Vite 6.4.3, React 18.3.1, React DOM 18.3.1 y TypeScript 5.9.3.
- Tailwind CSS 3.4.19 y ESLint 9.39.5.
- `posthog-js` 1.424.1 detrás de `src/lib/analytics.ts`.
- Vitest 2.1.9 como dependencia de desarrollo para la suite unitaria mínima.
- PWA manual con `public/manifest.webmanifest` y `public/sw.js`; no `vite-plugin-pwa`.
- Datos locales TypeScript, estado React y `localStorage`.
- Sin router externo, backend, SSR ni base de datos remota.

`package-lock.json` es la referencia reproducible. No instalar librerías de UI pesadas sin una decisión documentada.

### 4. Cómo correr localmente

Requiere Node.js 20+ y npm:

```bash
npm ci
npm run dev
```

Comandos disponibles:

- `npm run dev`: servidor Vite de desarrollo.
- `npm run build`: typecheck y build de producción.
- `npm run preview`: sirve `dist/` localmente.
- `npm run lint`: ESLint.
- `npm test`: Vitest en modo ejecución única.

El feedback externo es opcional: define `VITE_FEEDBACK_URL` en `.env.local` para mostrar el enlace; si está vacío o no es `http(s)`, no se muestra.

Para probar desde un teléfono en la misma red, usar `npm run dev -- --host 0.0.0.0` o `npm run preview -- --host 0.0.0.0`.

### 5. Cómo hacer build

Antes de cerrar cualquier cambio:

```bash
npm run lint
npm test
npm run build
```

El build de seguimiento transformó 61 módulos y generó aproximadamente 1.76 kB de HTML, 19.61 kB de CSS y 220.84 kB de JavaScript (65.43 kB gzip). `dist/` está excluido de Git.

### 6. Estructura real

```text
src/
  App.tsx                 composición y navegación por estado
  main.tsx                entrada React
  assets/                 recursos propios
  components/             shell, botones, cards, badges y feedback opcional
  data/                   tiendas, productos y categorías
  hooks/                  useCart y useHistory
  lib/                    cart, history, money, storage, analytics, feedback y tests
  screens/                pantallas del flujo
  types/                  modelos de producto, navegación, ritual e historial
public/                   manifest, service worker, iconos y placeholders
docs/                     documentación de producto, UX, QA y decisiones
```

### 7. Pantallas implementadas

`HomeScreen`, `ModeSelectorScreen`, `StoreSelectorScreen`, `CatalogScreen`, `ProductDetailScreen`, `CartScreen`, `CheckoutScreen`, `TrackingScreen`, `ResultScreen` y `HistoryScreen`. La navegación es un `AppScreen` en `src/App.tsx`; no hay URLs internas ni router. Las tarjetas de modo de Home son accionables y abren directamente el selector de tienda.

### 8. Funcionalidades implementadas

- Shopping (principal) y food (secundario).
- Cuatro tiendas ficticias y 40 productos locales en soles peruanos.
- Filtros por categoría, detalle y agregar al carrito.
- Carrito persistente: cantidades 1–20 por producto, máximo 99 unidades y subtotal en céntimos.
- Un carrito no puede mezclar tiendas; el estado persistido se sanea y la UI muestra un aviso.
- Checkout falso con “No pagar” y destino “Al olvido”; no solicita datos personales.
- Tracking de cuatro estados simbólicos, continuable o saltable.
- Rating inicial opcional 1–5 antes de elegir modo; omitirlo no bloquea el flujo y, si se responde, se conserva en el snapshot/historial y analytics usa `moment: before`.
- Resultado “No gastaste S/ X”, encuesta final 1–5 e intención de compra; al guardar ofrece “Ver historial” para ver el acumulado de inmediato.
- Historial local, acumulado, promedio, categorías frecuentes, modo más usado y recomendaciones deterministas.
- Compartir explícito con el monto, sin artículos.
- Enlace de feedback externo opcional mediante `VITE_FEEDBACK_URL`; se oculta si falta o no es una URL `http(s)`.
- Guardias contra mezclar tiendas/modos: cambiar con carrito activo requiere confirmación simple para vaciarlo o conservarlo; agregar desde otra tienda usa la misma regla.
- Fallback ante errores, `localStorage` no disponible/corrupto y foco del área principal en cada transición.

### 9. Fuera de alcance explícito

No agregar sin una nueva aprobación: backend, API propia, DB remota, login, cuentas, pagos, tarjetas, órdenes reales, dirección/ubicación/DNI/teléfono/email obligatorio, app nativa, Next.js/SSR, scraping, integraciones con marketplaces reales, IA en runtime, push notifications, marketplace real, comunidad, ranking, gamificación compleja o monetización.

### 10. Estado de analytics

`src/lib/analytics.ts` expone `trackEvent`. Sin `VITE_POSTHOG_KEY` es noop: no carga SDK ni hace llamadas externas. Eventos aprobados:

`app_opened`, `mode_selected`, `store_selected`, `product_viewed`, `item_added`, `cart_viewed`, `fake_checkout_started`, `fake_checkout_completed`, `tracking_started`, `saving_revealed`, `urge_rating_submitted`, `share_clicked`, `repeat_session`.

Hay allowlist de propiedades, validación de enums/ratings/cantidades, bandas para importes y session IDs técnicos. No enviar nombres, emails, teléfonos, DNI, direcciones, texto libre, artículos completos ni URLs sensibles. Autocapture, pageviews automáticos, perfiles, persistencia y session replay están desactivados. El modo PostHog real aún necesita una prueba E2E con clave de staging.

### 11. Estado de PWA

Manifest propio con `name: Carrito Fantasma`, `short_name: Fantasma`, idioma `es-PE`, `display: standalone`, orientación portrait, theme color propio e iconos SVG. `public/sw.js` usa red primero y fallback de cache para el shell. Manifest, service worker y offline después de primera carga fueron validados en Chromium.

Pendiente: instalación y pruebas de iconos/OG image en Safari/iOS, Android y previews de WhatsApp. Si SVG presenta incompatibilidades, generar PNG propios.

### 12. Estado de deploy

El build estático es compatible con Vercel y Cloudflare Pages (`npm run build`, salida `dist`). No existe deploy público ni dominio productivo confirmado. El código validado está publicado en GitHub en `codex/carrito-fantasma-mvp-pwa`, último commit `e6d8dbf2d7de43cea64b9f33b55746192536d489`.

### 13. Último QA

Ver [`docs/QA_REPORT.md`](QA_REPORT.md) para el seguimiento y [`docs/QA_REPORT_2026-09-04.md`](QA_REPORT_2026-09-04.md) para la regresión base. En el seguimiento: 3 archivos y 16 tests Vitest, lint, build, `npm ls --depth=0`, `node --check public/sw.js` y `git diff --check`: aprobados. Se retestearon Home directo, rating omitido, confirmación de carrito, flujo food, CTA de historial y ocultamiento de feedback sin configuración. La suite no sustituye pruebas en teléfonos reales.

El MVP está listo para demos internas/piloto cerrado, no para tráfico público amplio.

### 14. Bugs conocidos y riesgos

- FlashMarket, AntojoGo y Wishlist Club tienen posibles colisiones de nombre; renombrar antes de exposición pública. Esto requiere revisión marcaria, no solo una búsqueda rápida.
- Falta probar instalación, safe areas, lector de pantalla, zoom, red lenta y modo standalone en teléfonos reales.
- Falta probar PostHog configurado y su consentimiento.
- Falta probar una URL de feedback real y confirmar que abre correctamente fuera de la app.
- Iconos/OG image SVG requieren validación en iOS y redes sociales.
- Recargar durante tracking vuelve a Home con el carrito, pero no reanuda el paso exacto.
- La aceptación destructiva de borrar historial no se ejecutó durante la regresión base; diálogo y cancelación sí fueron verificados.
- La instalación de Vitest reportó 5 vulnerabilidades en el árbol completo de desarrollo; `npm audit --omit=dev --audit-level=high` quedó limpio para producción. No ejecutar `npm audit fix --force` sin revisar impacto.
- Hacen falta cinco pruebas observadas con usuarios reales.

### 15. Próximos pasos recomendados

1. Renombrar las tiendas con colisión y registrar la decisión en `DECISIONS.md`.
2. Crear staging HTTPS en Vercel o Cloudflare Pages y configurar `VITE_FEEDBACK_URL` solo con un formulario externo aprobado.
3. Probar en un Android y un iPhone reales, incluida instalación, confirmaciones, rating opcional y compartir por WhatsApp.
4. Ejecutar cinco sesiones observadas y medir comprensión, completion, alivio y repetición.
5. Configurar PostHog solo si la medición noop resulta insuficiente; hacer una prueba E2E con clave de staging.
6. Repetir `npm test`, lint, build y el recorrido afectado después de cada cambio.

### 16. Decisiones de producto vigentes

- Shopping es el modo principal; food es secundario.
- La moneda inicial es PEN y el contexto de uso es Perú.
- Toda compra, pedido, pago, tracking y entrega son ficticios y deben estar rotulados como simulación.
- Ratings antes/después son opcionales y usan escala 1–5 comparable.
- El tono es divertido, claro y no culpabilizante.
- Carrito, historial y memoria son locales; no hay cuentas ni sincronización.
- Analytics es mínimo, opcional y centralizado.
- El feedback cualitativo, si se habilita, vive fuera de la app y se abre solo por acción explícita; no se recopilan emails dentro del flujo.
- La hipótesis, umbrales y alcance viven en `PROJECT_CONTEXT.md`, `PRODUCT_SPEC.md` y `MVP_SCOPE.md`; decisiones nuevas van en `DECISIONS.md`.

### 17. Riesgos legales/IP

No asumir que una marca ficticia está libre. No usar logos, nombres, fotografías, iconos, colores o layouts reconocibles de Amazon, Mercado Libre, Rappi, PedidosYa, Temu, AliExpress u otras marcas. La búsqueda preliminar de nombres no sustituye clearance legal, dominios ni revisión de copyright. Nunca enviar datos personales a analytics ni construir perfiles individuales.

### 18. Reglas para futuros agentes

- No agregar backend sin aprobación.
- No agregar login sin aprobación.
- No agregar pagos.
- No pedir tarjeta.
- No pedir dirección real.
- No usar marcas reales.
- No copiar marketplaces reales.
- No convertir a Next.js sin justificación documentada y aprobación.
- No agregar IA en runtime.
- No sobreconstruir ni instalar dependencias innecesarias.
- Mantener mobile-first y validar 320–430 px.
- Ejecutar `npm run build` antes de cerrar.
- Documentar cambios importantes en los docs correspondientes.
- Revisar `git status` y conservar cambios ajenos.
- No afirmar que algo está validado solo porque compila.
- Detenerse y pedir decisión si la tarea amplía alcance, privacidad, costo, proveedor o hipótesis.

## Orden de lectura obligatorio

1. `README.md` — resumen y estado.
2. `docs/PROJECT_CONTEXT.md` — problema, hipótesis, usuarios y restricciones.
3. `docs/MVP_SCOPE.md` — qué entra y qué queda fuera.
4. `docs/PRODUCT_SPEC.md` — comportamiento, datos y métricas.
5. `docs/DECISIONS.md` — decisiones aceptadas y preguntas pendientes.
6. El documento especializado relevante: plan técnico, UX o QA.
7. `docs/DO_NOT_BUILD_YET.md` antes de proponer funcionalidades nuevas.

Si aparece un `AGENTS.md` más específico en el repositorio, sus instrucciones también son obligatorias.

## Fuente de verdad

- El alcance aprobado vive en `MVP_SCOPE.md`.
- El comportamiento esperado vive en `PRODUCT_SPEC.md`.
- Las decisiones posteriores registradas en `DECISIONS.md` pueden actualizar una propuesta anterior.
- El código implementado y sus pruebas describen el estado real, pero no autorizan ampliar el alcance.
- Si dos documentos se contradicen, detener la decisión afectada, señalar la contradicción y proponer una actualización mínima de documentación.

## Protocolo antes de cambiar archivos

1. Ejecutar comprobaciones de solo lectura: rama, `git status`, estructura, manifiestos y scripts disponibles.
2. No descartar ni sobrescribir cambios ajenos.
3. Resumir qué requisito del MVP resuelve la tarea.
4. Elegir la implementación más pequeña compatible con privacidad, accesibilidad y medición.
5. No instalar dependencias, cambiar hosting o añadir servicios externos salvo que la tarea lo requiera explícitamente.
6. Confirmar que no se solicitan tarjeta, dirección, login ni datos personales.
7. Mantener marcas, contenido e imágenes completamente ficticios.

## Reglas para implementar

- Mobile-first real; probar primero en ancho pequeño.
- React y TypeScript simples antes que patrones abstractos.
- Estado de carrito e historial locales.
- Importes como enteros en céntimos.
- Funciones puras para totales y snapshots.
- Capa central de analytics; no importar PostHog directamente desde componentes.
- El flujo funciona sin analytics.
- Estados de error y rutas directas no producen pantallas en blanco.
- Componentes propios ligeros antes que librerías pesadas.
- Toda animación respeta movimiento reducido.
- No añadir P1 si P0 relacionado todavía falla.

## Cambios que requieren una decisión documentada

- Agregar backend, cuenta, base remota o integración externa.
- Cambiar el denominador o umbral de las métricas principales.
- Hacer obligatorio un rating o cualquier dato.
- Enviar importes exactos o nuevos campos a analytics.
- Cambiar la moneda o el mercado inicial.
- Introducir una marca, librería importante, proveedor o costo recurrente.
- Modificar el significado de compra fantasma o hacer el checkout más realista.
- Ampliar el alcance listado en `DO_NOT_BUILD_YET.md`.

Registrar la decisión en `DECISIONS.md` con fecha, estado, razón y consecuencias antes o junto con el cambio.

## Validación esperada para cada tarea

- Ejecutar los scripts existentes de typecheck, lint, pruebas y build que correspondan.
- Probar manualmente el recorrido afectado en viewport móvil.
- Verificar que no se rompa persistencia ni se dupliquen sesiones.
- Comprobar eventos nuevos o cambiados sin exponer PII.
- Informar qué se probó y qué no se pudo probar.
- No afirmar que algo está validado si solo compila.

## Cómo manejar ambigüedad

Se pueden tomar supuestos reversibles que mantengan el alcance. Documentarlos en el handoff. Pedir decisión cuando una elección cambie la hipótesis, privacidad, costo, proveedor externo o alcance. No convertir una ambigüedad en una arquitectura general “por si acaso”.

## Formato recomendado de entrega

Al terminar una tarea, dejar este resumen en el mensaje final o PR:

```text
Objetivo:
Cambios realizados:
Archivos clave:
Decisiones tomadas o pendientes:
Validaciones ejecutadas:
Riesgos o limitaciones:
Siguiente paso recomendado:
Estado de git (sin incluir cambios ajenos como propios):
```

## Prompt base para el siguiente agente

```text
Lee README.md y todos los documentos de docs/ antes de actuar. Revisa rama,
git status, estructura y scripts. Trabaja únicamente en [tarea concreta] del
alcance P0/P1. No amplíes el producto, no uses marcas reales, no solicites datos
personales y no conectes componentes directamente a un proveedor de analytics.
Implementa el cambio mínimo, ejecuta las validaciones disponibles, actualiza
DECISIONS.md solo si tomas una decisión relevante y entrega un handoff con el
formato de AGENT_HANDOFF.md.
```

## Señales de alerta

Detenerse y revisar alcance si la tarea empieza a requerir cuentas, API, base de datos, pagos, scraping, datos reales, IA, notificaciones, gamificación o una imitación visual de una marca. Esas capacidades están excluidas deliberadamente, no olvidadas.

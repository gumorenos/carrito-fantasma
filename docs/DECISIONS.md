# Registro de decisiones

## Cómo usar este documento

Registrar aquí decisiones que afecten alcance, arquitectura, privacidad, medición, costos o experiencia. No hace falta documentar cada detalle visual. Una nueva decisión debe incluir fecha, estado, razón y consecuencias. Si reemplaza otra, marcar la anterior como `Reemplazada` sin borrarla.

Estados: `Aceptada`, `Propuesta`, `En prueba`, `Reemplazada` o `Descartada`.

## Decisiones aceptadas

### D-001 — El MVP es una PWA local-first

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** construir una aplicación web mobile-first instalable, sin app nativa.
- **Razón:** permite distribuir por enlace, iterar rápido y operar dentro del presupuesto.
- **Consecuencias:** priorizar navegadores móviles; funciones nativas avanzadas quedan fuera.

### D-002 — No habrá backend, login ni base remota

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** catálogo, carrito e historial viven en el cliente; el historial usa `localStorage`.
- **Razón:** la hipótesis no requiere identidad ni sincronización.
- **Consecuencias:** datos ligados al dispositivo, pérdida posible al limpiar almacenamiento y menor complejidad de privacidad.

### D-003 — Stack base Vite, React, TypeScript y Tailwind

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** usar el stack recomendado cuando comience la implementación.
- **Razón:** velocidad de desarrollo, ecosistema conocido, tipado y buen ajuste para una SPA pequeña.
- **Consecuencias:** no instalar frameworks full-stack o sistemas de diseño pesados sin una necesidad nueva.

### D-004 — La simulación será explícita

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** llamar al carrito y checkout “fantasma” o “falso” y aclarar que no hay cobro ni envío.
- **Razón:** el realismo no puede poner en riesgo confianza ni consentimiento.
- **Consecuencias:** no usar campos, sellos o copy de pago real; la comprensión se evalúa en QA.

### D-005 — No se solicitarán datos sensibles o personales obligatorios

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** no pedir tarjeta, dirección, DNI, teléfono, correo, ubicación ni cuenta.
- **Razón:** no son necesarios para el ritual y elevan riesgo y abandono.
- **Consecuencias:** cualquier feedback identificable vive fuera del flujo y es opcional.

### D-006 — Universo de marcas completamente ficticio

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** usar tiendas, productos, imágenes y sistema visual propios.
- **Razón:** conservar familiaridad funcional sin copiar propiedad o identidad de terceros.
- **Consecuencias:** revisar contenido antes del piloto; ningún agente debe importar logos o capturas reales.

### D-007 — E-commerce es principal y delivery secundario

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** construir primero el recorrido de compra general y reutilizar su base para comida.
- **Razón:** reduce riesgo de dos implementaciones paralelas y refleja la prioridad de producto.
- **Consecuencias:** FlashMarket puede ser la primera tienda; AntojoGo se añade una vez estable el flujo principal.

### D-008 — Medición de impulso antes y después, no bloqueante

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** ofrecer escala 1–5 en ambos momentos con opción de omitir.
- **Razón:** permite medir el efecto percibido sin impedir el ritual.
- **Consecuencias:** el análisis debe reportar cobertura y no asumir que quienes omiten no mejoraron.

### D-009 — Analytics mediante adaptador central

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** los componentes emiten eventos a una interfaz propia; el proveedor se conecta detrás.
- **Razón:** poder probar sin proveedor, respetar consentimiento y evitar lock-in.
- **Consecuencias:** PostHog no se importa directamente en features; la app funciona con analytics bloqueado.

### D-010 — El ahorro exacto queda local y analytics prefiere bandas

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** mostrar y guardar localmente el monto exacto; enviar bandas de valor cuando el análisis no requiera precisión.
- **Razón:** minimizar datos sin perder la métrica conductual.
- **Consecuencias:** definir rangos estables antes del piloto y no enviar el contenido completo del carrito.

### D-011 — Umbrales principales del MVP

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** continuar si más de 50% de sesiones iniciadas completa el checkout falso y más de 30% de respuestas pareadas reporta menor impulso.
- **Razón:** son los criterios de validación proporcionados para esta etapa.
- **Consecuencias:** usar definiciones de `MVP_SCOPE.md`, reportar muestra y cobertura, y no mover denominadores después de ver resultados.

### D-012 — La primera entrega del repositorio es solo documentación

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** no crear scaffold ni instalar dependencias en esta entrega.
- **Razón:** alinear agentes futuros antes de programar.
- **Consecuencias:** la implementación debe comenzar en una tarea separada y explícita.

### D-013 — Scaffold inicial sin router ni librería de UI pesada

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** implementar la base con Vite, React, TypeScript, Tailwind y navegación local por estado; dejar fuera React Router y shadcn/ui por ahora.
- **Razón:** la primera entrega necesita demostrar la Home y el lenguaje visual con la menor superficie técnica posible.
- **Consecuencias:** las pantallas futuras deben conservar rutas/estados coherentes y solo introducir un router si las URLs directas o el botón Atrás lo justifican.
- **Reemplaza o depende de:** D-003 y D-012 para la fase de implementación.

### D-014 — Catálogo local y sesiones con snapshots

- **Fecha:** 2026-09-01
- **Estado:** Aceptada
- **Decisión:** usar `shopping | food` como modos; cuatro IDs de tienda estables; precios enteros en céntimos PEN; categorías e impulsos como uniones TypeScript; y snapshots mínimos de producto/tienda dentro de `GhostCartSession`.
- **Razón:** evita errores de punto flotante, mantiene historial coherente aunque cambie el catálogo y permite recuperar checkout/tracking sin backend ni PII.
- **Consecuencias:** los productos se relacionan por IDs estables, las sesiones usan `schemaVersion: 1` y timestamps ISO, y cualquier migración futura debe validar el esquema local antes de persistirlo.
- **Reemplaza o depende de:** D-002 y D-003.

### D-015 — PWA manual y caché conservadora

- **Fecha:** 2026-09-02
- **Estado:** Aceptada
- **Decisión:** usar un manifest web propio, iconos SVG con tamaños declarados, metadatos Open Graph y un service worker manual pequeño; no instalar `vite-plugin-pwa` por ahora.
- **Razón:** el MVP solo necesita instalación básica, fallback de recursos y distribución por enlace. Un plugin generaría configuración y caché adicionales sin servicios remotos que necesiten sincronización.
- **Alternativas consideradas:** `vite-plugin-pwa` y una PWA sin service worker. Se conserva el service worker mínimo para cachear el shell después de la primera visita.
- **Consecuencias:** se debe versionar `CACHE_NAME` cuando cambie la estrategia de caché, probar instalación en Chrome/Safari y recordar que el offline completo de assets hashados no es un requisito de este MVP.
- **Reemplaza o depende de:** D-001 y D-003.

## Decisiones pendientes

Estas preguntas no bloquean la documentación, pero deben resolverse en el momento indicado:

| ID | Pregunta | Cuándo decidir |
|---|---|---|
| P-001 | ¿Carrito Fantasma y el claim quedan como nombre final? | Antes del piloto público amplio |
| P-002 | ¿PostHog u otra herramienta de analytics? | Al implementar telemetría |
| P-003 | ¿Vercel o Cloudflare Pages? | Antes del primer despliegue |
| P-004 | ¿Qué rangos usar para `value_band` y duración? | Antes de validar eventos |
| P-005 | ¿Qué ventana distingue `repeat_session` de una recarga? | Antes del piloto instrumentado |
| P-006 | ¿Rating inicial en Home o tras elegir modo? | Después de pruebas rápidas de comprensión |
| P-007 | ¿Duración y control exactos del tracking? | Durante pruebas observadas |
| P-008 | ¿Cuántas tiendas y productos necesita el primer piloto? | Al finalizar el recorrido FlashMarket |
| P-009 | ¿Cómo presentar consentimiento de analytics? | Antes de activar el proveedor |
| P-010 | ¿Qué recursos visuales generados o propios se usarán? | Durante diseño del catálogo |

## Plantilla

```text
### D-XXX — Título

- Fecha: AAAA-MM-DD
- Estado: Aceptada | Propuesta | En prueba | Reemplazada | Descartada
- Decisión:
- Razón:
- Alternativas consideradas:
- Consecuencias:
- Reemplaza o depende de:
```

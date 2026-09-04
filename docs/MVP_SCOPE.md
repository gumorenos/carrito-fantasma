# Alcance del MVP

## Objetivo de esta versión

Construir la menor experiencia completa que permita probar el ritual desde el impulso hasta el ahorro revelado, medir finalización y comparar la intensidad del impulso antes y después.

El MVP es un experimento funcional. No es un marketplace incompleto ni una plataforma financiera.

## Alcance incluido

### Experiencia base

- Home con explicación breve y selector de impulso.
- Medición inicial no bloqueante del impulso en una escala simple de 1 a 5.
- Dos modos: **Comprar algo** y **Pedir comida**.
- Selector de tienda ficticia cuando corresponda.
- Catálogos locales por tienda y categoría.
- Detalle de producto con precio ficticio en soles.
- Carrito con cantidades, eliminación y total.
- Checkout falso sin formularios de tarjeta, dirección o identidad.
- Confirmación inequívoca mediante “Completar compra fantasma” o texto equivalente.
- Tracking breve o entrega simbólica, siempre marcado como simulación.
- Resultado con monto no gastado.
- Medición final no bloqueante del impulso en escala de 1 a 5.
- Opción de compartir un resultado sin exponer el contenido del carrito por defecto.
- Historial local con total evitado, últimos carritos y categorías frecuentes.
- Reinicio de un nuevo ritual.

### Datos y medición

- Catálogo en archivos locales TypeScript o JSON.
- Carrito y sesión actual en estado local de React.
- Persistencia del historial en `localStorage`.
- Identificadores aleatorios locales, sin identidad real.
- Capa única para los eventos de analytics definidos en `PRODUCT_SPEC.md`.
- La experiencia principal funciona aunque analytics esté deshabilitado o bloqueado.
- Enlace opcional a Tally o Google Forms para comentarios cualitativos.

### PWA y entrega

- Diseño mobile-first desde 320 px en adelante.
- Manifest, iconos y metadatos básicos de instalación.
- Shell y datos locales utilizables con conectividad limitada después de la primera visita, si la estrategia PWA elegida lo permite sin complejidad excesiva.
- Despliegue HTTPS en Vercel o Cloudflare Pages.

## Pantallas mínimas

1. Home y selector de impulso.
2. Entrada al modo e-commerce.
3. Entrada al modo delivery.
4. Catálogo ficticio.
5. Detalle de producto.
6. Carrito.
7. Checkout falso.
8. Tracking falso o entrega simbólica.
9. Resultado “No gastaste S/ X”.
10. Historial local.

Las pantallas 2 y 3 pueden compartir componentes y estructura. No se deben duplicar aplicaciones completas para cada modo.

## Prioridades

### P0 — necesario para probar la hipótesis

- Recorrido completo sin errores en móvil.
- Al menos una tienda y suficiente catálogo para cada modo.
- Carrito, checkout falso, tracking simbólico y resultado.
- Medición antes/después y eventos del embudo.
- Mensajes claros de simulación y ausencia de datos sensibles.
- Historial local mínimo.

### P1 — útil si P0 está estable

- Todas las tiendas ficticias propuestas.
- Filtros ligeros por categoría.
- Compartir resultado mediante Web Share API con fallback de copia.
- PWA instalable y soporte offline básico.
- Enlace de feedback cualitativo.
- Pequeñas variaciones de copy para pruebas manuales.

### P2 — después de observar usuarios

- Más catálogo, microanimaciones adicionales o personalización cosmética.
- Comparativas entre categorías en el historial.
- Experimentos A/B formales.

P2 no debe retrasar el primer piloto.

## Fuera de alcance

- Login, perfiles o sincronización entre dispositivos.
- Backend, API propia o base de datos remota.
- Pasarela de pago, tarjeta, dirección real o pedidos reales.
- Aplicaciones nativas.
- Scraping o integraciones con marketplaces, restaurantes o precios reales.
- Inteligencia artificial en producción.
- Push notifications avanzadas.
- Comunidad, ranking, marketplace, gamificación compleja o monetización.

El detalle y las condiciones para reconsiderar estas capacidades están en `DO_NOT_BUILD_YET.md`.

## Criterios de aceptación del recorrido

Una versión candidata a piloto debe permitir que una persona nueva:

1. Entienda en la Home, sin explicación verbal, que no realizará una compra real.
2. Seleccione un modo y encuentre productos ficticios.
3. Agregue, cambie cantidades y retire productos sin inconsistencias en el total.
4. Llegue al checkout sin introducir datos personales.
5. Confirme conscientemente una compra fantasma.
6. Complete o salte una secuencia simbólica sin quedarse atrapada.
7. Vea un ahorro igual al total confirmado en el carrito.
8. Registre su impulso final o continúe sin responder.
9. Encuentre la sesión en el historial después de recargar o reabrir la app.
10. Empiece un nuevo flujo sin mezclar el carrito anterior.

## Definición de terminado del MVP

- Todos los P0 implementados y revisados con `QA_CHECKLIST.md`.
- Sin errores bloqueantes conocidos en Chrome Android y Safari iOS recientes.
- El recorrido es operable con teclado y lector de pantalla en sus controles esenciales.
- Analytics no recibe nombres, correo, teléfono, dirección, detalle libre ni identificadores publicitarios.
- La app se despliega con HTTPS y no contiene secretos en el cliente.
- Al menos cinco pruebas observadas permiten corregir problemas obvios antes de ampliar la muestra.
- La documentación refleja las decisiones finales tomadas durante la implementación.

## Métricas de decisión

- **Finalización:** sesiones con `fake_checkout_completed` divididas entre sesiones con `mode_selected`. Meta: **más de 50%**.
- **Reducción del impulso:** sesiones completadas con calificación final menor que la inicial, divididas entre sesiones completadas con ambas respuestas. Meta: **más de 30%**.
- **Cobertura de medición:** sesiones completadas con ambas respuestas, divididas entre sesiones completadas. Debe reportarse junto a la reducción.
- **Señales secundarias:** llegada a `saving_revealed`, intención declarada de regreso, `repeat_session`, tiempo de recorrido y comentarios cualitativos.

No se debe declarar éxito con una muestra mínima o únicamente con usuarios cercanos. El primer piloto sirve para detectar dirección y problemas, no para probar causalidad.

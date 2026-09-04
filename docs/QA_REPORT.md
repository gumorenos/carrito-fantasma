# Informe QA de seguimiento — MVP Carrito Fantasma

## Alcance y versión revisada

- Fecha: 4 de septiembre de 2026.
- Checkout local: `D:\projects\codex\carrito-fantasma`.
- Rama: `codex/carrito-fantasma-mvp-pwa`.
- Base revisada: `e6d8dbf` (`qa: close mvp review and harden flows`).
- Esta pasada añade cambios P0/P1 todavía locales: rating inicial opcional reforzado, tarjetas de Home accionables, guardia de cambio de tienda/modo, CTA de historial, feedback configurable y tests Vitest.

## Comandos ejecutados

| Comando | Resultado |
| --- | --- |
| `npm ls --depth=0` | Aprobado; Vitest quedó instalado como dependencia de desarrollo. |
| `npm test` | Aprobado: 3 archivos, 16 tests. |
| `npm run lint` | Aprobado sin errores. |
| `npm run build` | Aprobado: 61 módulos; HTML 1.76 kB, CSS 19.61 kB, JS 220.84 kB (65.43 kB gzip). |
| `npm audit --omit=dev --audit-level=high` | Aprobado; no vulnerabilidades de producción reportadas. |
| `node --check public/sw.js` | Aprobado. |
| `git diff --check` | Aprobado; solo avisos de LF/CRLF de Git en Windows. |

La instalación de Vitest requirió usar el almacén temporal del entorno y la CA del sistema. El registro de npm informó 5 vulnerabilidades en el árbol completo (dev); `npm audit --omit=dev --audit-level=high` no reportó vulnerabilidades de producción. No se ejecutó un `audit fix` automático.

## Pruebas manuales

Entorno: navegador Chromium integrado, flujo local Vite, viewport móvil.

- Home: “Comprar algo” y “Pedir comida” son tarjetas accionables y abren directamente el selector de tiendas correspondiente.
- Rating inicial: se muestran 1–5, se pudo seleccionar 5 y luego usar “Omitir esta pregunta”; también se pudo elegir “Pedir comida” sin calificar.
- Cambio con carrito activo: al pasar de un carrito FlashMarket a “Pedir comida” apareció una confirmación explícita; al continuar, el carrito se vació y se abrió el nuevo modo.
- Food: AntojoGo → catálogo → producto → carrito → checkout falso → tracking saltable → resultado.
- Resultado: guardar la sesión muestra “Ver historial”; el CTA abrió el acumulado inmediatamente y el carrito quedó vacío.
- Feedback: sin `VITE_FEEDBACK_URL`, el enlace permanece oculto.
- Privacidad: checkout y resultado no muestran inputs ni formularios; no se solicitan tarjeta, dirección, DNI, teléfono, email, login ni ubicación.
- La regresión completa de shopping, persistencia, historial, recomendaciones, PWA offline y responsive 320/360 px fue aprobada previamente en `docs/QA_REPORT_2026-09-04.md`; esta pasada se concentró en los cambios P0/P1.

## Bugs encontrados y corregidos en este seguimiento

1. Las tarjetas de modo en Home parecían botones pero no respondían. Ahora son botones accesibles y saltan al modo elegido.
2. Era posible cambiar de modo/tienda con un carrito activo sin una decisión explícita. Ahora se confirma si se conserva o se vacía el carrito.
3. El rating inicial ya existía en la pantalla de modos, pero “Ahora no” devolvía a Home y no explicaba bien el camino opcional. Ahora se puede continuar sin responder y se conserva el snapshot cuando se responde.
4. Resultado no ofrecía acceso directo al ahorro acumulado después de guardar. Ahora muestra “Ver historial”.
5. No había enlace de feedback configurable. Se añadió `VITE_FEEDBACK_URL`, validación `http(s)` y ocultamiento por defecto.
6. No existía cobertura unitaria mínima. Se añadieron tests para carrito, saneamiento, historial, recomendaciones y bandas de analytics.

## Pendientes y riesgos aceptados para piloto interno

- Probar la confirmación cancelada en un teléfono real y validar que el carrito se conserve.
- Probar feedback con una URL de staging real; el enlace se oculta correctamente sin configuración.
- Probar PostHog configurado, instalación PWA, safe areas, lector de pantalla, red lenta y sharing en Android/iOS reales.
- Renombrar FlashMarket, AntojoGo y Wishlist Club antes de exposición pública por posibles colisiones de marca.
- `tracking` no reanuda el paso exacto tras recarga; vuelve a Home con el carrito persistido.
- No hay cinco sesiones observadas todavía; el piloto debe seguir siendo cerrado y supervisado.

## Veredicto

**Listo para piloto interno y demos moderadas.** No recomendar difusión pública amplia hasta completar pruebas en dispositivos reales, resolver colisiones de nombres y validar cualquier analytics o formulario externo configurado.

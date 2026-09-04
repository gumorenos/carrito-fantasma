# Checklist de QA manual

## Uso

Ejecutar este checklist antes del primer piloto y después de cambios que afecten carrito, checkout, persistencia, analytics o PWA. Registrar dispositivo, navegador, commit, entorno y resultado. No marcar una sección como aprobada por haber probado únicamente escritorio.

## Matriz mínima

- [ ] Chrome reciente en Android real o emulado, ancho aproximado de 360 px.
- [ ] Safari reciente en iPhone real o simulador disponible.
- [ ] Chrome o Edge de escritorio a 320, 375, 768 y 1280 px.
- [ ] Navegación por teclado en escritorio.
- [ ] Lector de pantalla disponible: TalkBack, VoiceOver o NVDA.
- [ ] Conexión normal, red lenta simulada y modo offline después de primera carga.
- [ ] Analytics permitido, rechazado y bloqueado por herramienta del navegador.

## 1. Comprensión y seguridad

- [ ] La Home explica en pocos segundos que la compra es ficticia.
- [ ] Antes de confirmar se lee que nada será cobrado ni enviado.
- [ ] Ninguna pantalla solicita tarjeta, dirección, DNI, teléfono, correo o ubicación.
- [ ] No aparecen logos, nombres, colores o layouts identificables de marcas reales.
- [ ] Todas las tiendas y productos son ficticios.
- [ ] El tracking está identificado como simbólico o simulado.
- [ ] Una persona nueva no cree haber realizado una transacción real.
- [ ] El tono no culpa, avergüenza, diagnostica ni infantiliza.
- [ ] No se presentan recomendaciones médicas o financieras.

## 2. Home y selección

- [ ] Los dos modos se ven y se entienden sin scroll problemático.
- [ ] “Comprar algo” tiene prioridad visual sobre el modo secundario.
- [ ] El rating inicial acepta 1–5 y permite omitir.
- [ ] No se puede enviar un valor fuera de rango.
- [ ] Elegir un modo abre el contenido correcto.
- [ ] Volver a Home no mezcla una sesión terminada con una nueva.
- [ ] El acceso al historial es encontrable sin competir con la acción principal.

## 3. Tiendas, catálogo y detalle

- [ ] Cada tienda abre sus productos y categorías correctos.
- [ ] Tarjetas muestran imagen o placeholder, nombre y precio.
- [ ] Los precios usan formato `S/` coherente.
- [ ] No hay IDs duplicados, imágenes rotas ni texto cortado de forma crítica.
- [ ] Filtros o categorías no ocultan permanentemente todos los productos.
- [ ] Abrir y cerrar detalle conserva contexto razonable.
- [ ] Cantidad y acción de agregar funcionan con toque y teclado.
- [ ] Una URL de producto inexistente se recupera sin pantalla en blanco.

## 4. Carrito

- [ ] Agregar un producto crea una línea correcta.
- [ ] Agregar nuevamente aplica la regla de cantidad esperada.
- [ ] Aumentar y reducir cantidad actualiza subtotal y total.
- [ ] La cantidad nunca es negativa, cero en una línea activa ni absurda.
- [ ] Eliminar un artículo actualiza total y conteo.
- [ ] Vaciar el carrito muestra un estado útil.
- [ ] Los cálculos son correctos con importes decimales y varias unidades.
- [ ] El total permanece coherente después de navegar y recargar.
- [ ] Productos de sesiones o tiendas incompatibles no se mezclan silenciosamente.
- [ ] Los cambios del carrito se anuncian de forma accesible.

## 5. Checkout falso

- [ ] No se puede entrar con carrito vacío o se muestra recuperación segura.
- [ ] Resumen, cantidades y total coinciden con el carrito.
- [ ] La acción dice “Completar compra fantasma” o equivalente inequívoco.
- [ ] No hay lenguaje de pago real.
- [ ] No hay formulario de identidad, dirección o tarjeta.
- [ ] Volver permite editar sin perder artículos.
- [ ] Doble toque o Enter repetido no duplica la finalización.
- [ ] Una vez confirmado, cambios posteriores no alteran el snapshot guardado.

## 6. Tracking y resultado

- [ ] Tracking inicia después de confirmar y no antes.
- [ ] La secuencia es breve, entendible y se puede continuar o saltar.
- [ ] No usa mapa, repartidor, dirección ni hora realista.
- [ ] Con movimiento reducido no hay animaciones molestas ni bloqueos.
- [ ] Recargar durante tracking recupera un estado coherente.
- [ ] El resultado muestra exactamente el total confirmado.
- [ ] El rating final usa la misma escala y permite omitir.
- [ ] Cualquier rating se registra una sola vez por momento.
- [ ] Reiniciar produce un carrito nuevo y conserva el historial previo.
- [ ] Compartir requiere acción explícita y no revela artículos por defecto.
- [ ] Cancelar o no soportar compartir deja la app estable.

## 7. Historial y almacenamiento

- [ ] Una sesión completada aparece una sola vez.
- [ ] Total acumulado coincide con la suma de sesiones válidas.
- [ ] Fecha, modo, tienda, cantidad y monto son coherentes.
- [ ] Categorías frecuentes se calculan sin exponer información fuera del dispositivo.
- [ ] El historial persiste después de cerrar y reabrir.
- [ ] Una sesión incompleta no se suma como ahorro completado.
- [ ] Borrar requiere confirmación y elimina solo datos de Carrito Fantasma.
- [ ] Cancelar el borrado no cambia nada.
- [ ] Datos corruptos se ignoran o recuperan sin bloquear la app.
- [ ] Con `localStorage` deshabilitado, el flujo actual funciona en memoria y avisa la limitación de persistencia.

## 8. Analytics

- [ ] `app_opened` ocurre una vez según la definición de sesión.
- [ ] `mode_selected` y `store_selected` contienen valores permitidos.
- [ ] `product_viewed`, `item_added` y `cart_viewed` siguen el orden real.
- [ ] `fake_checkout_started` no se dispara desde el carrito.
- [ ] `fake_checkout_completed` se deduplica ante doble toque o recarga.
- [ ] `tracking_started` y `saving_revealed` permiten medir abandono entre pasos.
- [ ] `urge_rating_submitted` distingue `before` y `after`.
- [ ] `share_clicked` refleja intento y método sin contenido privado.
- [ ] `repeat_session` no se activa por una simple recarga inmediata.
- [ ] Los eventos no contienen nombre, correo, teléfono, DNI, dirección, texto libre ni URL sensible.
- [ ] Los importes enviados usan bandas si esa es la decisión vigente.
- [ ] Rechazar o bloquear analytics no rompe ninguna pantalla.
- [ ] No hay eventos en desarrollo o producción fuera de la lista aprobada.

## 9. Accesibilidad

- [ ] La página tiene idioma correcto y título útil.
- [ ] Existe un único `h1` lógico por pantalla y jerarquía coherente.
- [ ] Landmarks y nombres accesibles permiten orientarse.
- [ ] Todos los controles son alcanzables y activables con teclado.
- [ ] El foco es visible y no queda atrapado en diálogos o transiciones.
- [ ] Al cambiar de pantalla, el foco se gestiona de manera predecible.
- [ ] Texto y controles esenciales cumplen contraste AA.
- [ ] Zoom a 200% no oculta acciones esenciales.
- [ ] Áreas táctiles son suficientemente grandes.
- [ ] Iconos sin texto tienen nombre accesible.
- [ ] Imágenes tienen `alt` adecuado o se marcan decorativas.
- [ ] La experiencia no depende solo de color, gesto o animación.
- [ ] El lector de pantalla anuncia total, errores y confirmación de agregado.

## 10. Responsive y contenido

- [ ] No existe scroll horizontal a 320 px.
- [ ] Botones fijos no cubren el último elemento ni el teclado virtual.
- [ ] Safe areas de iPhone no tapan acciones.
- [ ] Textos largos y montos grandes no rompen tarjetas.
- [ ] Estados vacíos y errores tienen siguiente acción.
- [ ] Copy usa español claro y moneda peruana de forma consistente.
- [ ] No hay lorem ipsum, enlaces muertos ni placeholders técnicos visibles.
- [ ] Se revisaron ortografía y signos.

## 11. PWA, rendimiento y despliegue

- [ ] Manifest carga sin errores y usa identidad propia.
- [ ] Iconos 192/512 y maskable se ven correctamente.
- [ ] La instalación funciona donde el navegador la soporta.
- [ ] Modo standalone conserva navegación y acciones.
- [ ] Primera carga y navegación son fluidas en Android de gama media.
- [ ] Imágenes tienen tamaño y dimensiones adecuados.
- [ ] No hay errores o promesas rechazadas en consola durante el flujo.
- [ ] Después de primera visita, el comportamiento offline coincide con lo documentado.
- [ ] Una versión nueva no deja al usuario permanentemente en assets incompatibles.
- [ ] Rutas directas funcionan en hosting sin 404 de configuración.
- [ ] HTTPS está activo.
- [ ] No hay secretos, tokens privados ni sourcemaps con datos sensibles.

## 12. Escenarios de punta a punta

### Escenario A — Compra principal

- [ ] Rating inicial 5 → FlashMarket → dos productos → editar cantidad → checkout → tracking → resultado → rating final 3 → historial correcto.

### Escenario B — Delivery

- [ ] Omitir rating → AntojoGo → comida y bebida → eliminar uno → checkout → saltar tracking → resultado → omitir rating.

### Escenario C — Recuperación

- [ ] Crear carrito → recargar → continuar → confirmar con doble toque → recargar tracking → una sola sesión guardada.

### Escenario D — Privacidad

- [ ] Rechazar analytics → completar flujo → revisar red y almacenamiento → no hay PII ni llamadas inesperadas.

### Escenario E — Borrado

- [ ] Completar dos sesiones → verificar suma → cancelar borrado → confirmar borrado → historial vacío y nueva sesión operativa.

## Criterio de salida

- [ ] Cero fallas bloqueantes en recorridos A–E.
- [ ] Cero confusión de compra real en pruebas de comprensión finales.
- [ ] Cero PII solicitada, persistida o enviada.
- [ ] Eventos terminales deduplicados y embudo verificable.
- [ ] Problemas menores registrados con impacto y decisión de aceptar o corregir.
- [ ] Cinco pruebas observadas realizadas antes de ampliar el piloto.

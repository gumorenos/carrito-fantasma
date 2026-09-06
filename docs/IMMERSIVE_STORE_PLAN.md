# Tienda inmersiva — implementación 2026-09-06

Autorizado por el usuario tras la revisión de 0058d5a8. Esta dirección sustituye el requisito anterior de recordar constantemente la simulación.

## Dirección
- Tienda primero: catálogo accesible desde inicio, búsqueda, orden, categorías y fotografías específicas.
- Carrito Fantasma conserva su identidad; el recorrido usa lenguaje comercial normal.
- Explicación inicial una vez por dispositivo y aclaración junto a Confirmar pedido: no hay cobro ni envío. Nunca solicitar tarjeta, dirección real ni inventar reseñas, descuentos, escasez o repartidores.
- Mantener React/Vite, catálogo local y datos locales; no backend ni migración de hosting.

## Entrega
1. Conectar imágenes locales en todos los contextos, mejorar contenido y diseño.
2. Conservar navegación/filtros/scroll, favoritos y productos recientes.
3. Persistir pedido al confirmar, con ID estable; recuperar checkout/confirmación tras recarga y actualizar feedback sobre el mismo pedido.
4. Verificar tests, lint, build, assets y errores de almacenamiento. Commit/push a rama MVP; no merge ni despliegue implícito.

## Validación posterior
Piloto de credibilidad, satisfacción e impulso antes/después. No afirmar ahorro bancario ni eficacia conductual a partir del importe del carrito.

## Implementado
- Catálogo directo con búsqueda insensible a acentos, categorías, orden, favoritos y recientes.
- Rutas hash compatibles con atrás/adelante; filtros incluidos en URL y scroll en memoria.
- 30 productos principales y 10 platos; departamentos curados con fotografías locales y galerías en tres productos.
- Opciones de cubiertos en platos, líneas separadas, pedido automático e idempotente, feedback editable y reintento de guardado.
- Error de almacenamiento basado en cada escritura, no en una comprobación inicial.

## Pendiente fuera de esta entrega
- Piloto conductual/visual con usuarios y validación en navegador móvil.
- Más profundidad editorial, variantes comerciales de productos y galerías de todo el catálogo.
- Confirmar licencia individual o reemplazar fotos antes de redistribución comercial.

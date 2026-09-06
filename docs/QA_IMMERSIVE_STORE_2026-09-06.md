# Revisión de la tienda inmersiva — 2026-09-06

Base: `0058d5a8a73d05af8aa63c6f28f40aac65a71667`.
Rama: `codex/carrito-fantasma-mvp-pwa`.

## Verificaciones ejecutadas
- `npm test`: PASS, 22/22 pruebas en 4 archivos.
- `npm run lint`: PASS.
- `npm run build`: PASS, TypeScript + Vite; JS 211.46 kB, gzip 62.66 kB.
- `node --check public/sw.js`: PASS.
- `git diff --check`: PASS.
- Integridad de assets: 45 imágenes referenciadas existen y decodifican con Pillow; ~4 MB total. FlashMarket: 30 productos.
- Inspección de hojas de contacto de assets: correspondencia foto/producto/plato; se excluyeron batería y funda con logos destacados.

## Cobertura nueva
Recuperación de checkout, confirmación con ID estable, actualización de feedback sin duplicado, fallo de escritura y preservación de registros previos, datos corruptos, opciones de plato separadas tras persistencia y URLs malformadas/filtros. Son pruebas de lógica/persistencia; no equivalen a pruebas de interacción en navegador.

## No ejecutado
QA visual/interactivo en navegador móvil, actualización PWA instalada y piloto conductual. No se despliega ni se mezcla con main en esta entrega.

## Recorrido para QA del preview
1. Primera visita: explicación inicial; cerrar y recargar; no vuelve a interrumpir.
2. Buscar con/sin acento, filtrar y ordenar; abrir ficha y volver; comprobar filtro y scroll. Usar atrás/adelante del navegador.
3. Galerías de parlante, audífonos y sillón; favoritos; productos recientes.
4. Agregar desde tarjeta; en platos elegir cubiertos. Opciones distintas generan líneas distintas.
5. Cambiar tienda sin vaciar carrito; solo solicitar cambio de carrito al agregar un producto incompatible.
6. Confirmar; abrir Mis pedidos; recargar: mismo pedido y sin duplicado. Editar respuestas opcionales y comprobar persistencia.
7. Bloquear/cuota de localStorage: error visible; pestaña sigue usable, reintentar guardado.
8. Probar 360/390 px, desktop, teclado, 200% zoom y modo offline después de recorrer las imágenes.

## Limitaciones explícitas
- Fotos de catálogo de demostración: derechos individuales no verificados; ver `CATALOG_ASSETS.md`.
- Galerías solo en tres productos. Opciones actuales corresponden a cubiertos; no se inventaron variantes de dispositivos.
- Historial antiguo conserva snapshots/imagenes anteriores. No se reutilizaron sus IDs para artículos diferentes.
- Estado local por dispositivo; no sincronización entre dispositivos ni garantía de coordinación entre pestañas.

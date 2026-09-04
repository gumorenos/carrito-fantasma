# Revisión y decisión de mockups

**Estado:** dirección visual aprobada por Product Owner

**Referencia primaria:** `mockup_marketplace.png`

**Referencia secundaria:** `mockup_bienestar.png`, limitada al cierre posterior al checkout falso
**Fecha de decisión:** 2026-09-04

## Decisión ejecutiva

`mockup_marketplace.png` define el lenguaje visual del MVP antes y durante el ritual: Home, tiendas, catálogo, producto, carrito y checkout falso deben sentirse como una experiencia de exploración comercial compacta, familiar y energética.

`mockup_bienestar.png` no define la Home ni el catálogo. Solo aporta una referencia emocional para Tracking, Result e History: después de confirmar el checkout falso, el sistema desacelera y el ahorro se presenta con mayor calma.

La secuencia intencional es:

> Home / browse → e-commerce → producto → carrito → checkout falso → transición visual → tracking simbólico → revelación calmada del ahorro

La aplicación conserva identidad propia y una señal visible de simulación. La referencia es el mockup, no un marketplace real.

## Referencias inspeccionadas

### Marketplace — referencia primaria

![Mockup Marketplace](../mockup_marketplace.png)

La composición observada usa un header amarillo compacto, marca y utilidades visibles, alta densidad de tiendas/productos, imágenes protagonistas, precios con contraste y navegación móvil inferior. En desktop muestra sidebar, pero sus destinos exceden el MVP y no se replicarán.

### Bienestar — referencia secundaria

![Mockup Bienestar](../mockup_bienestar.png)

La composición observada usa verdes suaves, mucho aire, bloques amplios y una promesa de bienestar. Este lenguaje sirve para el cierre emocional, no para reproducir el ritual de compra.

## Evaluación por criterio

| Criterio | Marketplace | Bienestar | Aplicación decidida |
|---|---|---|---|
| Claridad del ritual | Alta | Media-baja | Marketplace para browse y carrito. |
| Rapidez para comunicar compra falsa | Media-baja por sí solo | Media | Disclosure compacto propio en todo el recorrido. |
| Confianza | Media | Alta | Familiaridad comercial más aviso “sin cobro”. |
| Tono emocional | Activo y divertido | Calmo | Activo antes; calmo después del checkout. |
| Diferenciación | Requiere cuidado | Alta | Sistema propio, sin marcas ni trade dress real. |
| Usabilidad móvil | Alta con simplificación | Alta | Densidad de Marketplace, sin destinos fuera de alcance. |
| Potencial en video | Alto | Medio | Ritual dinámico y payoff calmado. |
| Implementación | Media-alta | Alta | Componentes compactos simples en React/Tailwind. |
| Riesgo de sobrepulido | Alto | Alto | No buscar, favoritos, perfil, rachas ni dashboard. |
| Riesgo de meme | Alto si no hay propósito | Bajo-medio | Disclosure y resultado útil reducen el riesgo. |

## Mockup Marketplace

### Pros

- Comunica de inmediato que se puede explorar, elegir y llenar un carrito.
- Da protagonismo a productos, tiendas y precios.
- Permite ver más opciones con menos scroll.
- Genera una secuencia activa y reconocible para TikTok, Reels y Shorts.
- Se traduce a componentes pequeños y reutilizables.
- Su versión móvil ofrece una estructura clara: header, tiendas, productos y navegación.

### Contras

- Sin disclosure podría confundirse con comercio real.
- Algunos rasgos genéricos —buscador, perfil, favoritos, sidebar— sugieren funciones fuera del alcance.
- Un amarillo o una composición copiados literalmente podrían recordar identidades de terceros.
- Más densidad exige cuidar legibilidad y tamaño táctil a 360 px.
- Imágenes demasiado realistas podrían reforzar el impulso.

### Riesgos y mitigaciones

- **Confusión con checkout real:** indicador persistente “Compra fantasma · sin cobro” y copy explícito en Home, carrito y checkout.
- **Propiedad intelectual:** nombres, iconos, ilustraciones, colores y microcopy propios; ninguna marca, seller, rating o reseña real.
- **Expansión de alcance:** no añadir búsqueda, favoritos, perfil, stock, descuentos, notificaciones ni sidebar completa.
- **Solo meme:** conectar el browse con la pausa, el tracking simbólico, la encuesta y el ahorro guardado.
- **Estimular más deseo:** catálogo ficticio y visual estilizado; sin urgencia, escasez ni ofertas engañosas.

### Elementos a tomar

- Header cálido, compacto y comercial.
- Tira/grid de tiendas visuales.
- Navegación de categorías compacta.
- Grid de dos productos por fila en móvil.
- Imágenes dominantes, nombres breves y precios visibles.
- Carrito persistente con badge de cantidad.
- Menor radio, menor whitespace y jerarquía de secciones clara.

### Elementos a descartar

- Búsqueda sin funcionalidad.
- Perfil, favoritos, ajustes y notificaciones.
- Sidebar desktop y navegación de cuenta.
- “Recomendado para ti” cuando implique personalización inexistente.
- Seller ratings, reseñas, stock, contadores o descuentos ficticios.
- Iconos, nombres o combinaciones cromáticas copiadas de un retailer real.

## Mockup Bienestar

### Pros

- Ofrece un cierre seguro y amable.
- El verde/menta funciona para bajar intensidad después del ritual.
- El ahorro puede ser el centro visual sin parecer promoción comercial.
- Facilita una encuesta final y un historial reflexivo.

### Contras

- Como sistema principal oculta la hipótesis diferenciadora: completar una compra fantasma.
- El hero de meditación y el exceso de aire pueden parecer una app genérica de mindfulness.
- Promesas amplias de bienestar financiero exceden lo validado.
- Rachas, logros y perfil sugieren gamificación y cuentas.

### Elementos a tomar

- Transición a superficies más calmadas desde Tracking.
- Ahorro como recompensa positiva.
- Mensajes no culpabilizantes.
- Composición más reposada en Result e History.

### Elementos a descartar

- Hero de bienestar como identidad de Home.
- Ilustración literal de meditación.
- “Sin culpa”, asesoría financiera o promesas terapéuticas.
- Rachas, logros, perfil y cifras inventadas.
- Grandes tarjetas blancas flotantes en todas las pantallas.

## Sistema visual aprobado

- Base cálida original inspirada en el mockup: amarillo fantasma para header y acciones comerciales, tinta oscura y fondos crema/neutros.
- Acentos propios por tienda/categoría para que las imágenes ficticias se distingan.
- Radios contenidos y sombras sutiles; no usar `rounded-[2rem]` como patrón universal.
- Densidad deliberada en Home, tiendas y catálogo.
- Cambio progresivo a teal/menta en Tracking, Result e History.
- Tipografía con precio y título de sección dominantes; soporte y disclosure en tamaños secundarios legibles.
- Desktop amplía grids y ancho del contenido sin convertirse en dashboard.

## Lista de componentes visuales a implementar

### Navegación y sistema

- `AppShell` con header marketplace propio, cart badge y acceso a historial.
- `SimulationBadge` compacto: “Compra fantasma · sin cobro”.
- Navegación inferior móvil limitada a Inicio, Tiendas, Carrito e Historial.
- Botones primario/secundario con objetivos táctiles de al menos 44 px.

### Home y exploración

- Intro breve de concepto sin hero sobredimensionado.
- Tarjetas accionables `Comprar algo` y `Pedir comida`.
- Rating inicial opcional como paso secundario.
- `StoreCard` visual y compacto.
- Tira horizontal de categorías.
- `ProductCard` image-first, precio visible y acción de detalle.
- Grid denso: dos columnas en móvil y expansión adaptativa en desktop.

### Producto, carrito y checkout

- Detalle con imagen dominante, nombre, precio, copy corto y CTA fantasma.
- Línea de carrito con miniatura, stepper de cantidad, precio y eliminar.
- Resumen de subtotal y checkout falso inequívoco.
- Checkout sin inputs personales ni apariencia de pasarela real.

### Transición y cierre

- Tracking simbólico con transición visual hacia calma.
- Result con “No gastaste S/ X” como pieza central.
- Rating final, guardar, historial, compartir y feedback opcional.
- History local sencillo, sin dashboard financiero complejo.

## Diferencias deliberadas frente al mockup

1. No se implementa buscador porque no existe una necesidad validada ni un catálogo remoto.
2. No se implementa sidebar desktop: contiene destinos de cuenta y configuración fuera de alcance.
3. No se implementan perfil, favoritos, notificaciones ni personalización pretendida.
4. La paleta no copia un retailer; usa un amarillo propio con tinta ciruela y acentos fantasma.
5. Se mantiene disclosure visible de simulación, ausente en el mockup.
6. Tracking, Result e History reducen deliberadamente la energía comercial para cerrar el ritual.

## Estado

La dirección ya no está pendiente de aprobación. Debe implementarse y validarse visualmente contra `mockup_marketplace.png`, preservando las diferencias de producto, privacidad e IP descritas arriba.

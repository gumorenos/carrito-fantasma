# Especificación de producto

## 1. Propósito

Esta especificación describe el comportamiento observable del MVP. Define qué debe poder hacer una persona, qué información se guarda localmente y cómo se mide el embudo. El diseño visual detallado y la implementación quedan en documentos separados.

## 2. Resultado del usuario

Al terminar una sesión, la persona debe sentir que completó una decisión y conservar una señal positiva y concreta: el monto que no gastó. La app no promete eliminar impulsos ni ofrecer tratamiento.

## 3. Flujo principal

### 3.1 Inicio

- Mostrar nombre, claim y una explicación en una o dos frases.
- Indicar de forma visible: “Es una simulación. No compras nada de verdad.”
- Ofrecer los botones “Comprar algo” y “Pedir comida”.
- Pedir opcionalmente intensidad inicial: “¿Qué tan fuerte está el impulso?” de 1 a 5, con opción “Omitir esta pregunta”; seleccionar un modo sin responder también continúa el flujo.
- El selector de modo debe ser la acción dominante; la medición no puede bloquearlo.

### 3.2 Selección de tienda y catálogo

- E-commerce muestra una o varias tiendas ficticias; FlashMarket puede ser la opción inicial.
- Delivery usa AntojoGo y puede agrupar comida por restaurantes o categorías ficticias sin crear un modelo complejo.
- Cada tarjeta presenta nombre inventado, imagen propia o placeholder, precio ficticio y categoría.
- El catálogo debe ser finito y local. No se consultan precios, stock ni imágenes de comercios reales.
- La interfaz recuerda constantemente el contexto ficticio mediante microcopy discreto, sin repetir advertencias alarmantes.

### 3.3 Detalle

- Mostrar imagen, nombre, descripción breve, precio y selector de cantidad cuando sea útil.
- Acción principal: “Agregar al carrito fantasma”.
- Permitir volver al catálogo conservando filtros y carrito.
- No mostrar reseñas falsas presentadas como personas reales, vendedores, stock urgente ni temporizadores manipulativos.

### 3.4 Carrito

- Listar productos, cantidades, subtotales y total en `S/`.
- Permitir editar cantidades, eliminar y seguir explorando.
- Explicar: “Este carrito es una simulación. No se realizará ningún cobro.”
- Acción principal: “Ir al checkout falso”.
- Si queda vacío, mostrar un estado claro y regreso al catálogo.

### 3.5 Checkout falso

- Resumir tienda, artículos y total.
- No mostrar campos que parezcan obligatorios para tarjeta, DNI, teléfono, correo o dirección.
- Si se usa una opción de entrega, debe ser simbólica y no permitir ingresar ubicación real.
- Acción principal inequívoca: “Completar compra fantasma”.
- Acción secundaria: volver al carrito.
- No usar botones como “Pagar ahora”, “Comprar de verdad” o textos que puedan confundirse con una transacción.

### 3.6 Tracking o entrega simbólica

- Mostrar una secuencia corta y original, por ejemplo: “Decisión recibida”, “El impulso está pasando” y “Tu dinero sigue contigo”.
- Identificar la experiencia como simulación.
- No inventar un repartidor real, mapa real, placa, dirección ni hora exacta de entrega.
- La duración no debe ser una espera artificial larga. Debe existir una forma clara de continuar o saltar después de una breve pausa.

### 3.7 Resultado

- Mensaje principal: “No gastaste S/ X”.
- Mostrar una celebración sobria y positiva.
- Preguntar opcionalmente la intensidad final del impulso de 1 a 5.
- Ofrecer “Hacer otro carrito”, “Ver mi historial” y “Compartir logro”.
- Compartir usa texto genérico y el monto solo con una acción explícita. No incluye artículos ni categorías por defecto.
- Ofrecer feedback externo como acción secundaria, nunca como bloqueo.

### 3.8 Historial

- Mostrar total acumulado no gastado.
- Mostrar sesiones recientes con fecha aproximada, modo, tienda, total y número de artículos.
- Mostrar categorías frecuentes solo si existen datos suficientes.
- Permitir borrar todo el historial con confirmación.
- Explicar que los datos viven en ese dispositivo y se perderán si se limpia el almacenamiento.

## 4. Requisitos funcionales

| ID | Requisito | Prioridad |
|---|---|---|
| FR-01 | Elegir entre compra y comida sin iniciar sesión | P0 |
| FR-02 | Explorar catálogo local por tienda y categoría | P0 |
| FR-03 | Abrir el detalle de un producto ficticio | P0 |
| FR-04 | Agregar, editar y eliminar artículos del carrito | P0 |
| FR-05 | Calcular subtotales y total de forma consistente | P0 |
| FR-06 | Completar un checkout falso sin datos sensibles | P0 |
| FR-07 | Completar o saltar el tracking simbólico | P0 |
| FR-08 | Revelar un ahorro igual al total confirmado | P0 |
| FR-09 | Capturar ratings opcionales antes y después | P0 |
| FR-10 | Guardar y recuperar historial local | P0 |
| FR-11 | Borrar historial local con confirmación | P0 |
| FR-12 | Registrar el embudo mediante un adaptador | P0 |
| FR-13 | Compartir un resultado controlado por el usuario | P1 |
| FR-14 | Instalar la experiencia como PWA | P1 |

## 5. Reglas de negocio

- Todos los precios son ficticios, positivos y expresados inicialmente en PEN.
- El ahorro de una sesión es el total final del carrito en el momento de confirmar.
- Cambios posteriores al catálogo no alteran sesiones ya guardadas; el historial conserva un snapshot mínimo.
- Un carrito activo pertenece a una sola tienda y modo. Si la persona intenta cambiar de contexto, debe confirmar si vacía el carrito o conserva el actual; nunca se mezcla en silencio.
- Una sesión completada se guarda una sola vez, incluso si la pantalla se recarga.
- Un carrito nuevo comienza vacío y no modifica el registro anterior.
- La app no debe generar deuda, puntos canjeables, recompensas monetarias ni saldos reales.
- El usuario puede usar el flujo sin aceptar analytics opcional.

## 6. Modelo conceptual local

### Producto

- `id` estable y no derivado del nombre.
- `storeId`, `mode`, nombre, descripción, categoría, precio en céntimos, imagen local y etiquetas opcionales.
- Indicador explícito de contenido ficticio si hiciera falta en la vista.

### Carrito

- Identificador de sesión, modo, tienda, líneas con `productId`, snapshot de nombre/precio y cantidad.
- Fecha de creación y fecha de última modificación.

### Sesión completada

- Identificador aleatorio local.
- Fechas de inicio y finalización.
- Modo, tienda, categorías, cantidad total, total no gastado.
- Ratings inicial y final solo si fueron enviados.
- No guarda texto libre ni datos personales.

### Preferencias

- Versión del esquema local.
- Consentimiento de analytics, si se implementa.
- Indicadores locales necesarios para reconocer una sesión repetida.

## 7. Analytics

Todos los eventos pasan por una función o servicio central. Ningún componente debe llamar directamente al proveedor elegido.

| Evento | Momento | Propiedades permitidas |
|---|---|---|
| `app_opened` | Al iniciar una sesión visible | `session_id`, `is_pwa`, `has_history` |
| `mode_selected` | Al elegir compra o comida | `session_id`, `mode` |
| `store_selected` | Al entrar a una tienda | `session_id`, `mode`, `store_id` |
| `product_viewed` | Al abrir detalle | `session_id`, `store_id`, `product_id`, `category`, `price_band` |
| `item_added` | Al agregar al carrito | `session_id`, `product_id`, `category`, `quantity`, `cart_value_band` |
| `cart_viewed` | Al abrir carrito | `session_id`, `mode`, `item_count`, `value_band` |
| `fake_checkout_started` | Al entrar al checkout | `session_id`, `mode`, `item_count`, `value_band` |
| `fake_checkout_completed` | Al confirmar la simulación | `session_id`, `mode`, `store_id`, `item_count`, `value_band` |
| `tracking_started` | Al entrar a la secuencia simbólica | `session_id`, `mode`, `variant` |
| `saving_revealed` | Al mostrar el resultado | `session_id`, `mode`, `value_band`, `duration_band` |
| `urge_rating_submitted` | Al enviar una calificación | `session_id`, `moment`, `rating` |
| `share_clicked` | Al intentar compartir | `session_id`, `share_method`, `includes_amount` |
| `repeat_session` | Al empezar una nueva sesión tras una visita previa | `session_id`, `days_since_last_session_band`, `previously_completed` |

No enviar nombres de producto como texto libre, URL completa con parámetros, dirección, IP capturada por código propio, correo, teléfono, DNI ni contenido del formulario externo.

### Definiciones de métricas

- **Inicio del flujo:** primera ocurrencia de `mode_selected` por `session_id`.
- **Finalización:** primera ocurrencia de `fake_checkout_completed` para esa sesión.
- **Ahorro revelado:** `saving_revealed`; se monitorea aparte para detectar abandono en tracking.
- **Impulso reducido:** rating final menor que rating inicial dentro de una sesión completada.
- **Sesión repetida:** nueva sesión con actividad después de una sesión anterior persistida; la ventana exacta se registra en `DECISIONS.md` cuando se pruebe.
- **Bandas de valor:** rangos predefinidos para evitar enviar importes innecesariamente precisos. Los importes exactos pueden permanecer solo en el dispositivo.

## 8. Criterios cuantitativos

- Continuar: finalización superior a 50% y reducción reportada superior a 30%.
- Reportar siempre tamaño de muestra, cobertura de ratings y fuente de adquisición.
- No mezclar recargas o eventos duplicados con usuarios únicos.
- Usar feedback cualitativo para explicar los abandonos, no para reemplazar el embudo.

## 9. Casos límite

- `localStorage` bloqueado, lleno o eliminado: la sesión actual debe seguir funcionando en memoria y mostrar una explicación si no puede persistir.
- Catálogo o ID inválido: volver a una vista segura sin pantalla en blanco.
- Carrito vacío al entrar por URL directa: redirigir o mostrar estado vacío.
- Doble toque en confirmación: no duplicar sesión ni eventos de finalización.
- Recarga durante tracking: recuperar el resultado pendiente o regresar a un estado coherente.
- Total cero o datos corruptos: impedir confirmación y recuperar un carrito válido.
- Analytics bloqueado: ninguna función de producto debe fallar.

## 10. Preguntas abiertas para pruebas

- ¿La medición inicial debe aparecer antes o después de seleccionar el modo?
- ¿Cuánto tracking simbólico produce cierre sin frustrar?
- ¿Conviene mostrar tiendas primero o entrar directamente a un catálogo?
- ¿“No gastaste” se entiende mejor que “Te ahorraste”?
- ¿El modo comida produce una respuesta distinta al modo e-commerce?
- ¿El historial motiva el regreso o introduce culpa por los montos?

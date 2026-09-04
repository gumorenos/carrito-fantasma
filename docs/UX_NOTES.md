# Notas de UX y contenido

## Objetivo emocional

La experiencia debe acompañar el impulso, no combatirlo con un sermón. El usuario llega con energía, curiosidad o ansiedad; el flujo la canaliza hacia elegir y completar, hace una pausa breve y termina con alivio, agencia y una recompensa visible.

El tono adecuado es cercano, ligero y respetuoso. Puede tener humor, pero nunca convertir al usuario en el chiste.

## Principios de experiencia

1. **Entender en segundos:** en la primera pantalla debe quedar claro qué ocurre y que no hay compra real.
2. **Familiar sin imitar:** tarjetas, carrito y checkout pueden ser reconocibles, pero la identidad, composición y lenguaje deben ser propios.
3. **Un camino dominante:** cada pantalla tiene una acción principal evidente.
4. **Fricción con propósito:** la pausa del tracking ayuda al ritual; formularios y pasos administrativos no.
5. **Celebrar agencia:** hablar de una decisión tomada, no de una debilidad corregida.
6. **Salida siempre disponible:** el usuario puede volver, omitir ratings y borrar historial.

## Arquitectura de información móvil

- Home prioriza selector de impulso; historial queda como enlace secundario.
- Dentro de una tienda, encabezado compacto con regreso y acceso al carrito.
- Catálogo usa una columna en pantallas estrechas o dos tarjetas compactas si siguen siendo legibles.
- Carrito y checkout colocan el total y la acción principal cerca del pulgar, sin ocultar información bajo el botón.
- Tracking reduce navegación secundaria para conservar el momento, pero ofrece continuar o salir.
- Resultado concentra ahorro, rating final y siguiente paso.

No añadir una barra inferior permanente si solo duplica tres enlaces y reduce espacio. Validar primero la navegación más simple.

## Home

La propuesta debe explicarse sin términos técnicos o financieros. Ejemplo de jerarquía:

- “¿Qué te provoca comprar?”
- “Haz una compra fantasma y deja que pase el impulso. No se cobra nada.”
- Botones: “Comprar algo” y “Pedir comida”.
- Nota discreta: “Sin tarjeta. Sin dirección. Sin cuenta.”

El claim puede aparecer como apoyo, no debe sustituir la explicación.

## Ratings de impulso

- Escala simple de 1 a 5 con extremos escritos, por ejemplo “Bajito” y “Muy fuerte”.
- Misma escala y orden antes y después.
- No usar rojo para “mal” ni verde para “bien”.
- Opción visible para omitir.
- El rating final no debe condicionar la celebración.
- No interpretar una respuesta como diagnóstico.

## Catálogo y detalle

- Productos plausibles pero inventados, con un toque original.
- Evitar escasez falsa, cuentas regresivas, “solo queda uno”, reseñas inventadas y presión social.
- Ofertón Fantasma puede representar FOMO de forma satírica, no replicar tácticas manipulativas que aumenten el impulso.
- Los precios deben ser variados para que el total tenga significado, sin intentar reflejar precios reales exactos.
- Etiquetas como “Producto ficticio” pueden aparecer en detalle o en el encabezado de la tienda, sin ensuciar cada tarjeta.

## Carrito y checkout

Mantener patrones familiares: líneas, cantidades, subtotal, total y botón dominante. Cambiar deliberadamente lo que puede generar engaño:

- usar “carrito fantasma” y “checkout falso” en encabezados o microcopy;
- no mostrar marcas de tarjetas, candados de pago o sellos falsos;
- no pedir nombre, teléfono, correo, DNI o dirección;
- no usar “Pagar” como acción;
- incluir antes de confirmar: “Nada será cobrado ni enviado”.

La confirmación debe sentirse intencional, no accidental, pero un solo botón es suficiente.

## Tracking simbólico

El tracking no debe fingir logística real. Puede convertir el proceso interno en pasos:

1. “Decisión recibida”.
2. “Dejando pasar el impulso”.
3. “Tu plata sigue contigo”.

Usar progreso, ilustración o animación propia. Evitar mapas, motos, nombres de repartidores, matrículas, direcciones y estimaciones realistas. Ofrecer movimiento reducido y una forma clara de avanzar.

## Resultado

La cifra debe ser protagonista: **“No gastaste S/ 86.50”**.

Mensajes de apoyo posibles:

- “El carrito se fue. Tu plata no.”
- “Te diste tiempo antes de decidir.”
- “Buen trabajo escuchando el impulso sin obedecerlo.”

Evitar:

- “Evitaste otra mala decisión”.
- “Controla tus gastos de una vez”.
- “Felicidades, venciste tu adicción”.
- Comparaciones con otras personas.

El total es una estimación basada en el carrito ficticio, no ahorro bancario real. La interfaz puede aclararlo en texto secundario.

## Historial

- Titular neutral, por ejemplo “Tus carritos fantasma”.
- Total acumulado descrito como “monto que decidiste no gastar aquí”, no como saldo real.
- Sesiones recientes en orden cronológico inverso.
- Estados vacíos amables, sin presión para generar actividad.
- Acción “Borrar historial de este dispositivo” con confirmación clara.

No crear rachas, niveles, rankings ni mensajes de pérdida por no volver.

## Identidad visual

- Crear paleta, tipografía, iconografía y radios propios.
- Evitar combinaciones, headers, navegación, iconos de entrega o jerarquías que reproduzcan una marca reconocible.
- No usar logos reales, capturas, nombres alterados mínimamente ni mascotas parecidas.
- Cada tienda ficticia puede tener un acento, pero debe compartir el sistema visual de Carrito Fantasma.
- Las imágenes deben ser locales, licenciadas para uso, propias o generadas; conservar trazabilidad de su origen.

La dirección sugerida es juguetona y limpia, con contraste alto y celebración sobria. No decidir una identidad definitiva antes de probar comprensión.

## Accesibilidad

- Texto base legible sin zoom y sin bloques largos durante el flujo.
- Controles táctiles amplios y separación suficiente.
- Etiquetas visibles; no depender solo de placeholder o icono.
- Estados de foco visibles y orden lógico del teclado.
- Mensajes del carrito anunciados sin mover el foco inesperadamente.
- Imágenes con `alt` útil; decoraciones con alternativa vacía.
- Color nunca como única señal.
- Animaciones opcionales o reducidas según preferencia del sistema.
- Copy comprensible en español peruano neutral, evitando jerga que excluya.

## Estados que deben diseñarse

- Carga inicial breve.
- Catálogo vacío o producto inexistente.
- Carrito vacío.
- Acceso directo al checkout sin carrito.
- Almacenamiento local no disponible.
- Analytics bloqueado o sin consentimiento, sin error visible innecesario.
- Recarga durante tracking.
- Historial vacío o corrupto recuperado.
- Compartir no disponible o cancelado.
- Offline después de una primera visita.

## Pruebas de comprensión

En pruebas moderadas, no explicar la interfaz. Preguntar después:

- “¿Qué creías que iba a pasar al confirmar?”
- “¿En algún momento pensaste que te cobrarían o enviarían algo?”
- “¿Cómo describirías esta app a un amigo?”
- “¿Qué parte te dio más o menos satisfacción?”
- “¿La usarías antes de una compra real? ¿En cuál?”
- “¿Algo te hizo sentir juzgado o confundido?”

Si varias personas creen que compraron, el problema es crítico aunque completen el flujo.

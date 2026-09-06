> **Dirección vigente — 2026-09-06:** El usuario autorizó una tienda inmersiva. Ver [plan de implementación](IMMERSIVE_STORE_PLAN.md). Sustituye las reglas anteriores de avisos constantes, emojis como producto, guardado manual y seguimiento simbólico. Aclaración inicial y junto a Confirmar pedido; sin cobro, envío ni datos de pago. Los apartados de implementación previos describen la versión anterior.

# Contexto del proyecto

## Resumen

**Nombre provisional:** Carrito Fantasma
**Claim provisional:** “Llena el carrito. Haz checkout falso. Quédate con tu plata.”
**Mercado inicial:** Perú
**Formato:** PWA mobile-first
**Etapa:** MVP de validación conductual, no producto comercial

Carrito Fantasma intercepta el momento entre el impulso y una compra real. En lugar de pedir a la persona que simplemente “no compre”, le ofrece completar un ritual parecido al e-commerce o delivery, pero sin transacción, datos sensibles ni productos reales. El resultado convierte la renuncia en una recompensa visible: el monto que no se gastó.

## Problema

Las compras impulsivas y los pedidos de comida por antojo se benefician de flujos extremadamente fáciles, recompensas inmediatas y patrones familiares. Las alternativas habituales —cerrar la app, esperar o anotar el gasto— pueden sentirse como una interrupción sin cierre emocional.

La oportunidad es comprobar si una simulación breve satisface parte del ritual de explorar, elegir, agregar, confirmar y recibir una recompensa, dando tiempo para que baje el impulso.

## Hipótesis

### Hipótesis de comportamiento

Si una persona con ganas de comprar puede completar un ritual ficticio creíble, breve y no culpabilizante, entonces una proporción relevante terminará la simulación y reportará menor intensidad del impulso.

### Hipótesis de producto

Una PWA sin registro, abierta desde un enlace y con datos locales es suficiente para validar la conducta antes de invertir en cuentas, backend, personalización avanzada o app nativa.

### Hipótesis de adquisición

Los primeros usuarios pueden llegar mediante WhatsApp, TikTok, Instagram Reels, YouTube Shorts, LinkedIn, demos a conocidos, landing pages y formularios. El experimento no depende de llamadas en frío.

## Qué se está validando

- Comprensión: la persona entiende que es una simulación para manejar un impulso.
- Activación: selecciona un modo y empieza a explorar.
- Finalización: completa el checkout falso y llega al ahorro revelado.
- Efecto percibido: su calificación de impulso baja después del ritual.
- Intención de regreso: declara que lo usaría otra vez o genera una sesión repetida.
- Tono: la experiencia se siente liviana y útil, no moralista ni engañosa.

## Qué no se está validando todavía

- Tratamiento clínico de compras compulsivas o trastornos alimentarios.
- Recomendaciones financieras personalizadas.
- Integraciones con comercios, bancos o tarjetas.
- Disposición a pagar por el producto.
- Retención de largo plazo, comunidad o efectos duraderos.
- Optimización algorítmica del catálogo.

## Usuarios iniciales

Personas adultas que reconocen impulsos cotidianos de bajo o mediano valor, por ejemplo:

- comprar un gadget, decoración, maquillaje o producto viral que no necesitan;
- comprar por una oferta o por miedo a perderla;
- pedir delivery sin hambre clara o fuera de un plan;
- navegar como forma de distracción y terminar comprando.

El MVP no debe afirmar que funciona para casos clínicos ni reemplazar apoyo profesional.

## Trabajo que el usuario intenta resolver

> “Cuando me den ganas de comprar algo por impulso, quiero hacer algo que se sienta satisfactorio y me dé cierre, para dejar pasar el impulso sin gastar de verdad.”

## Contexto operativo

- Disponibilidad del creador: aproximadamente 5 horas diarias.
- Presupuesto semanal ideal: S/ 0–300.
- Nivel técnico: medio, con apoyo de IA y vibe coding.
- Prioridad: velocidad de aprendizaje sobre amplitud funcional.
- Moneda y ejemplos iniciales: soles peruanos (`S/`).
- El MVP debe poder operar con servicios gratuitos o de bajo costo.

## Principios

1. **Claridad antes que realismo:** debe sentirse familiar, pero nunca confundirse con una compra real.
2. **Cierre antes que fricción:** el ritual debe ser suficientemente completo para dar satisfacción, sin convertirse en una tarea larga.
3. **Autonomía antes que culpa:** celebrar la decisión, no juzgar el deseo.
4. **Privacidad por defecto:** sin datos personales obligatorios ni información de pago o ubicación.
5. **Aprendizaje antes que escala:** cada pantalla debe contribuir al ritual o a responder la hipótesis.
6. **Ficción original:** tiendas, catálogo, ilustraciones y lenguaje propios.

## Modos y universo ficticio

### Comprar algo — modo principal

Categorías: gadgets, decoración, gaming, tecnología, cosas virales, belleza y productos tipo marketplace.

Tiendas posibles:

- **FlashMarket:** gadgets, hogar y tecnología.
- **TodoInnecesario:** objetos virales o absurdos.
- **Wishlist Club:** productos aspiracionales.
- **Ofertón Fantasma:** impulsos asociados con descuentos y FOMO.

### Pedir comida — modo secundario

Categorías: hamburguesas, pollo, sushi, postres, snacks y bebidas.

Tienda posible:

- **AntojoGo:** delivery ficticio con restaurantes y productos inventados.

Los nombres son provisionales. Antes de un lanzamiento público deben revisarse disponibilidad, posibles conflictos y coherencia con la identidad final.

## Riesgos principales

- Que la gente lo perciba solo como meme y no como herramienta reutilizable.
- Que un checkout demasiado real parezca engañoso o genere ansiedad.
- Que uno demasiado corto no produzca sensación de ritual o cierre.
- Que la medición del impulso interrumpa el flujo y reduzca la finalización.
- Que el lenguaje se sienta culpabilizante, infantil o clínico.
- Que el catálogo estimule aún más el deseo de comprar.
- Que una experiencia visual parecida a una marca real cree riesgo legal o de confianza.
- Que la muestra inicial sea pequeña o sesgada hacia amigos del creador.

## Señal para continuar o reformular

Continuar si se cumplen las metas cuantitativas y las entrevistas o respuestas abiertas muestran uso intencional antes de una compra real. Reformular si la experiencia se entiende pero solo entretiene, si el checkout falso se abandona, si no baja el impulso, si nadie la reutilizaría o si el tono produce culpa o confusión.

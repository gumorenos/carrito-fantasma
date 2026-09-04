# Carrito Fantasma

> **Llena el carrito. Haz checkout falso. Quédate con tu plata.**

Carrito Fantasma es una PWA mobile-first que busca interrumpir una compra impulsiva mediante un ritual seguro de compra simulada. La persona puede explorar productos ficticios, llenar un carrito, completar un checkout claramente falso, pasar por una entrega simbólica y ver cuánto dinero decidió no gastar.

## Estado del proyecto

**Etapa actual:** flujo principal del MVP implementado y listo para pruebas internas.

El repositorio contiene un scaffold funcional de Vite + React + TypeScript + Tailwind, catálogo local, carrito persistente, checkout falso, tracking simbólico, resultado de ahorro, historial local y una capa de analytics opcional. No existe backend, login ni integración de pagos.

El modelo local incluye cuatro tiendas ficticias y 40 productos tipados, con precios PEN en céntimos, categorías, tags, placeholders locales y tipos de impulso.

## Hipótesis principal

Repetir una versión breve y familiar del ritual de compra puede ayudar a que baje la urgencia, producir una sensación de cierre y dar tiempo para evitar una compra impulsiva real.

El MVP no busca demostrar impacto clínico ni solucionar todos los hábitos de consumo. Busca responder cuatro preguntas:

1. ¿La gente entiende el concepto?
2. ¿Completa la simulación?
3. ¿Siente menos impulso o alguna satisfacción al terminar?
4. ¿Volvería a usarlo antes de comprar realmente?

## Problema que queremos resolver

Las aplicaciones de compras y delivery reducen la distancia entre sentir un impulso y pagar. Carrito Fantasma propone una pausa activa: la persona conserva la parte satisfactoria del ritual —explorar, elegir, llenar y confirmar— sin convertirla en una transacción.

La herramienta no pretende decirle a nadie qué debe comprar ni sustituir apoyo profesional. Solo ofrece una forma breve de ganar tiempo y observar si el impulso cambia.

## Momento de uso

El usuario llega desde un enlace, abre la app en el teléfono y piensa algo parecido a:

> “Tengo ganas de comprar esto, pero sé que probablemente no lo necesito. Quiero hacer algo con esa sensación sin gastar.”

La primera visita debe funcionar sin cuenta, explicación verbal ni configuración. El recorrido completo debería poder terminarse en pocos minutos.

## Recorrido mínimo

1. Elegir el tipo de impulso: comprar algo o pedir comida.
2. Entrar a una tienda y catálogo ficticios.
3. Ver productos y agregarlos al carrito.
4. Revisar el carrito y hacer un checkout explícitamente simulado.
5. Ver un tracking breve o una entrega simbólica.
6. Descubrir el monto: **“No gastaste S/ X”**.
7. Registrar opcionalmente si bajó el impulso.
8. Consultar un historial local simple.

El modo principal es **Comprar algo**. El modo **Pedir comida** es secundario, pero forma parte del alcance inicial para comparar dos clases frecuentes de impulso.

## Pantallas del MVP

1. Home y selector de impulso.
2. Entrada al modo e-commerce.
3. Entrada al modo delivery.
4. Catálogo de productos ficticios.
5. Detalle de producto.
6. Carrito.
7. Checkout falso.
8. Tracking falso o entrega simbólica.
9. Resultado con el monto no gastado.
10. Historial local simple.

La experiencia debe priorizar móvil. La adaptación para pantallas grandes es secundaria y no debe convertirse en una segunda aplicación con sidebar, perfil o dashboard.

## Límites innegociables

- No se venden productos ni comida reales.
- No se solicita tarjeta, dirección real, login ni datos personales obligatorios.
- No se usan logos, nombres ni diseños identificables de marketplaces o apps de delivery reales.
- Todo checkout, tracking y entrega debe estar rotulado como simulación.
- La experiencia no debe culpabilizar, avergonzar ni diagnosticar al usuario.
- La implementación debe seguir siendo simple, local-first y de bajo costo.

## Criterio de éxito

La señal principal para continuar es que:

- más del 50% de quienes seleccionan un modo complete el checkout falso; y
- más del 30% de quienes respondan la medición antes y después reporte una reducción del impulso.

La cobertura de respuestas se monitorea como métrica de calidad para evitar conclusiones basadas en una muestra sesgada.

## Eventos de validación

El embudo se observa con eventos sin datos personales:

`app_opened` → `mode_selected` → `store_selected` → `product_viewed` → `item_added` → `cart_viewed` → `fake_checkout_started` → `fake_checkout_completed` → `tracking_started` → `saving_revealed`.

Los ratings antes/después usan `urge_rating_submitted`. También se observan `share_clicked` y `repeat_session`. La lista completa, propiedades permitidas y definiciones están en [PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md).

## Dirección de diseño

La propuesta actual combina:

- una identidad calmada y propia, con espacio visual y lenguaje no culpabilizante;
- patrones familiares de catálogo, detalle y carrito para que el ritual se entienda;
- tiendas y productos completamente ficticios;
- una señal visible de que todo es simulación y no habrá cobro ni envío.

La decisión está documentada en [MOCKUP_REVIEW.md](docs/MOCKUP_REVIEW.md). No se deben copiar logos, paletas, layouts o recursos identificables de marcas reales.

## Arquitectura prevista

- SPA React/PWA sin backend.
- Catálogo local en `src/data`.
- Carrito y sesión en estado de React.
- Historial en `localStorage` con esquema versionado.
- Funciones puras para totales, ahorro y snapshots.
- Analytics detrás de una capa centralizada y opcional.
- Imágenes locales, placeholders o recursos propios.

La arquitectura detallada, los límites de dependencias y el plan de siete días están en [TECHNICAL_PLAN.md](docs/TECHNICAL_PLAN.md).

## Estructura actual

```text
src/
  App.tsx              composición y navegación por estado
  components/          shell, cards, botones y enlaces opcionales
  data/                tiendas, productos y categorías ficticias
  hooks/               estado React de carrito e historial
  lib/                 cálculos, persistencia, analytics, feedback y tests unitarios
  screens/             pantallas del recorrido
  types/               modelos de dominio y navegación
public/                iconos PWA e imágenes propias
docs/                  contexto, alcance, UX, QA y handoff
```

Esta estructura es deliberadamente pequeña. No crear capas vacías ni abstraer antes de que una prueba del MVP lo justifique.

## Stack previsto

- Vite, React y TypeScript.
- Tailwind CSS.
- Datos locales en TypeScript o JSON.
- Estado simple de React y persistencia en `localStorage`.
- PWA básica.
- Vitest para reglas puras y saneamiento; no hay Playwright todavía.
- Capa centralizada de analytics, con PostHog u otra solución simple detrás de un adaptador.
- Vercel o Cloudflare Pages.
- Tally o Google Forms para feedback cualitativo opcional.

Estas tecnologías están instaladas para la base técnica actual. No se añadió ninguna librería de UI pesada ni un router externo.

## Desarrollo

Requisitos actuales: Node.js 20+ y npm. El proyecto no necesita servicios externos para arrancar.

```bash
npm install
npm run dev
```

Comandos disponibles:

- `npm run dev` — servidor local de Vite.
- `npm run build` — typecheck y build de producción.
- `npm run preview` — sirve el build localmente.
- `npm run lint` — revisión estática con ESLint.
- `npm test` — ejecuta los tests unitarios mínimos con Vitest.

El build genera `dist/`, que está excluido de Git.

### Analytics opcional (PostHog)

Analytics está detrás de `src/lib/analytics.ts`. Sin `VITE_POSTHOG_KEY`, `trackEvent` funciona como noop: no carga el SDK, no hace llamadas de red y el flujo sigue funcionando.

Para habilitarlo localmente:

```bash
cp .env.example .env.local
```

Después completa `VITE_POSTHOG_KEY` en `.env.local`. `VITE_POSTHOG_HOST` usa por defecto `https://us.i.posthog.com`; cambia el valor solo si tu proyecto de PostHog utiliza otro host. Nunca incluyas secretos privados en variables `VITE_`, commits ni capturas.

La integración usa únicamente los eventos aprobados en [PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md), con IDs técnicos, modos, categorías y bandas de valor. No envía nombres de productos, texto libre, emails, teléfonos, DNI, direcciones ni URLs sensibles. PostHog se inicializa con autocaptura, pageviews y session replay desactivados, y con persistencia en memoria.

### Feedback cualitativo opcional

El MVP puede mostrar un enlace externo de feedback en el resultado y el historial. Configúralo en `.env.local` con `VITE_FEEDBACK_URL` (por ejemplo, la URL pública de Tally o Google Forms). Si la variable está vacía, ausente o no usa `http(s)`, el enlace permanece oculto. La app nunca solicita email ni texto libre dentro del flujo.

```bash
VITE_FEEDBACK_URL=https://tu-formulario.example/feedback
```

## PWA y despliegue estático

La PWA usa un manifest propio y un service worker pequeño (`public/sw.js`) para cachear el shell y reutilizar recursos ya visitados cuando la conexión falla. No hay sincronización en segundo plano, push notifications ni datos remotos esenciales. La navegación actual vive en estado React, por lo que el hosting solo necesita servir `index.html` en la raíz.

### Vercel

1. Importa el repositorio en Vercel.
2. Selecciona **Vite** si solicita un framework preset.
3. Usa `npm run build` como comando de build y `dist` como directorio de salida.
4. Añade `VITE_POSTHOG_KEY` y `VITE_POSTHOG_HOST` solo si quieres analytics en ese entorno.
5. Activa el dominio HTTPS que entrega Vercel y prueba la URL pública desde un móvil.

### Cloudflare Pages

1. Crea un proyecto en Pages conectado al repositorio.
2. Usa `npm run build` como build command y `dist` como output directory.
3. Configura las variables `VITE_POSTHOG_KEY` y `VITE_POSTHOG_HOST` en **Settings → Environment variables** si corresponde.
4. Publica con HTTPS y verifica manifest, iconos y `/sw.js` desde el dominio generado.

No se añadió configuración de Next.js, SSR ni una regla de backend. Si en el futuro se agregan rutas URL reales, habrá que añadir un fallback SPA específico del proveedor.

### Checklist rápido en celular

- Ejecuta `npm run build` y `npm run preview -- --host 0.0.0.0` en la misma red del teléfono.
- Abre la URL local o pública en Chrome Android y Safari iOS; prueba anchos de 360–430 px sin scroll horizontal.
- Confirma que Home, catálogo, carrito, checkout falso, tracking, resultado e historial se pueden recorrer con un dedo.
- Verifica que nunca aparezcan tarjeta, dirección, DNI, teléfono, email o pago real.
- Comprueba que el navegador detecte el manifest y permita **Agregar a pantalla de inicio** cuando sea compatible.
- Abre la app instalada en modo standalone y revisa que el encabezado, botones y safe areas no queden tapados.
- Tras una primera visita, activa modo avión y comprueba que el shell y los recursos ya visitados tengan un fallback razonable.
- Comparte la URL pública por WhatsApp y valida título, descripción e imagen de previsualización.
- Repite el flujo con analytics bloqueado; ninguna pantalla debe romperse.

## Documentación

- [Contexto del proyecto](docs/PROJECT_CONTEXT.md)
- [Alcance del MVP](docs/MVP_SCOPE.md)
- [Especificación de producto](docs/PRODUCT_SPEC.md)
- [Plan técnico y plan de 7 días](docs/TECHNICAL_PLAN.md)
- [Notas de UX y contenido](docs/UX_NOTES.md)
- [Instrucciones para futuros agentes](docs/AGENT_HANDOFF.md)
- [Checklist manual de QA](docs/QA_CHECKLIST.md)
- [Informe QA de seguimiento](docs/QA_REPORT.md)
- [Registro de decisiones](docs/DECISIONS.md)
- [Qué no construir todavía](docs/DO_NOT_BUILD_YET.md)
- [Revisión de mockups](docs/MOCKUP_REVIEW.md)

## Orden recomendado para nuevos agentes

Leer primero `PROJECT_CONTEXT.md`, `MVP_SCOPE.md`, `PRODUCT_SPEC.md` y `DECISIONS.md`. Después consultar el documento específico de la tarea. Antes de implementar, revisar [AGENT_HANDOFF.md](docs/AGENT_HANDOFF.md) y [DO_NOT_BUILD_YET.md](docs/DO_NOT_BUILD_YET.md).

El alcance aprobado vive en `MVP_SCOPE.md`; las decisiones nuevas deben registrarse en `DECISIONS.md`. Si una tarea requiere cuenta, backend, pagos, datos reales, scraping, IA, notificaciones, gamificación o una imitación de marca, debe detenerse y pedir una decisión explícita.

## Validación y canales

El primer piloto puede distribuirse mediante WhatsApp, TikTok, Instagram Reels, YouTube Shorts, LinkedIn, demos a conocidos, formularios y landing pages. Cada experimento debe registrar qué pregunta intenta responder y distinguir entre:

- personas que entendieron la simulación;
- personas que completaron el ritual;
- personas que reportaron menor impulso;
- personas que volverían a usarlo antes de una compra real.

El plan operativo de siete días y el checklist antes del piloto están en [TECHNICAL_PLAN.md](docs/TECHNICAL_PLAN.md) y [QA_CHECKLIST.md](docs/QA_CHECKLIST.md).

## Para contribuir más adelante

Antes de modificar el repositorio:

1. Leer `PROJECT_CONTEXT.md`, `MVP_SCOPE.md`, `PRODUCT_SPEC.md` y `DECISIONS.md`.
2. Revisar `git status` y conservar los cambios ajenos.
3. Confirmar que la tarea pertenece al MVP.
4. Proponer la solución más pequeña que permita validar la hipótesis.
5. Actualizar la documentación si se toma una decisión que cambie producto, datos, privacidad o arquitectura.

No ampliar el flujo ni instalar dependencias nuevas sin una tarea explícita de implementación y una razón ligada al MVP.

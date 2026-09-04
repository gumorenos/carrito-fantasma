# Plan técnico

## Estado actual

La base técnica del MVP ya está implementada: Vite + React + TypeScript + Tailwind, catálogo local, navegación por estado, carrito persistente, checkout falso, tracking simbólico, resultado, historial local y analytics opcional. La PWA usa un manifest y un service worker manual de alcance conservador; no hay backend ni servicios remotos esenciales. Este archivo describe la dirección técnica y los límites para el piloto.

## Objetivos técnicos

- Entregar un flujo mobile-first rápido y estable en siete días de trabajo enfocado.
- Mantener toda la funcionalidad principal en el navegador.
- Permitir cambiar el proveedor de analytics sin modificar componentes de producto.
- Preservar historial local sin cuentas ni backend.
- Desplegar con costo inicial cercano a cero.
- Mantener el sistema legible para una persona de nivel técnico medio y para agentes de IA posteriores.

## Arquitectura propuesta

Una única SPA/PWA React con cuatro capas ligeras:

1. **Presentación:** páginas y componentes mobile-first.
2. **Dominio local:** carrito, sesión, cálculo de ahorro y reglas de finalización.
3. **Persistencia:** adaptador versionado sobre `localStorage`, con fallback en memoria.
4. **Telemetría:** adaptador de analytics con implementación no-op, consola de desarrollo y proveedor opcional.

No se necesita servidor propio. El catálogo se empaqueta con la aplicación y el formulario cualitativo vive en un servicio externo.

## Stack base

- Vite.
- React.
- TypeScript en modo estricto.
- Tailwind CSS.
- Datos locales TypeScript o JSON validados al cargar.
- Estado con hooks, Context y `useReducer` cuando exista estado compartido.
- `localStorage` mediante un módulo propio pequeño.
- PWA básica con manifest y service worker manual; no se incorpora un plugin si no aporta una necesidad observada.
- PostHog o analytics sencillo, únicamente detrás del adaptador interno.
- Vercel o Cloudflare Pages.

Evitar una librería global de estado, framework full-stack o design system pesado mientras Context y componentes propios cubran el flujo.

## Estructura prevista

La estructura exacta puede ajustarse durante el scaffold, conservando estas responsabilidades:

```text
src/
  app/                 composición, rutas y providers
  components/          componentes reutilizables simples
  features/
    catalog/
    cart/
    checkout/
    tracking/
    result/
    history/
  data/                tiendas y productos ficticios
  domain/              modelos, cálculos y reglas puras
  lib/
    analytics/         contrato y proveedores
    storage/           persistencia, versión y migraciones
  pages/               pantallas del recorrido
  styles/              tokens y estilos globales
public/
  images/              recursos propios
  icons/               iconos PWA
docs/                   documentación de producto y técnica
```

No crear carpetas vacías “por si acaso”. La estructura debe crecer a medida que se implementan recorridos reales.

## Navegación

El MVP necesita URLs o estados navegables para Home, catálogo, producto, carrito, checkout, tracking, resultado e historial. Al crear el scaffold se decidirá entre un router pequeño y navegación controlada por estado según estos criterios:

- el botón Atrás del navegador debe funcionar;
- una recarga no debe producir una pantalla incoherente;
- rutas directas sin estado previo deben degradar a Home, catálogo o carrito vacío;
- la solución no debe introducir configuración innecesaria.

Si se usa React Router, limitarlo a estas rutas y no construir layouts abstractos anticipadamente.

## Estado y flujo de datos

### Estado efímero

- filtros y categoría visible;
- paneles, diálogos y paso actual del tracking;
- errores de interfaz.

### Estado de sesión

- `sessionId` aleatorio;
- modo y tienda seleccionados;
- carrito y total calculado;
- rating inicial;
- timestamps necesarios para duración.

Se mantiene en React y puede persistirse para recuperarse de una recarga.

### Historial persistido

- sesiones completadas como snapshots inmutables;
- total acumulado derivado, no duplicado si puede calcularse;
- preferencias y consentimiento;
- marca local de visita anterior.

El almacenamiento debe tener una versión de esquema y validación defensiva. Las claves deben usar un namespace, por ejemplo `carrito-fantasma:v1:*`, sin guardar datos personales.

## Reglas de dominio que deben ser funciones puras

- cálculo de subtotal y total;
- normalización de cantidades;
- creación del snapshot de una sesión completada;
- suma del dinero no gastado;
- categorías frecuentes;
- comparación de ratings antes/después;
- deduplicación de una finalización.

Estas reglas merecen pruebas unitarias porque un error afecta directamente el resultado mostrado y las métricas.

## Catálogo

- Usar identificadores estables y únicos.
- Guardar importes como enteros en céntimos para evitar errores de punto flotante.
- Separar contenido de presentación y lógica.
- Mantener un catálogo pequeño pero suficiente: variedad visible sin transformar la carga de contenido en el proyecto principal.
- No incluir nombres, fotos, descripciones o precios copiados de publicaciones reales.
- Optimizar imágenes locales antes de incluirlas y definir dimensiones para evitar saltos de layout.

## Analytics

Definir un contrato central equivalente a `track(event, properties)` y, si hace falta, métodos de consentimiento y contexto. Los componentes solo importan ese contrato.

Implementaciones previstas:

- **No-op:** analytics deshabilitado sin afectar la app.
- **Desarrollo:** registro controlado para verificar eventos.
- **Producción:** proveedor seleccionado con lista cerrada de eventos y propiedades.

Requisitos:

- generar `session_id` aleatorio y local;
- deduplicar eventos terminales;
- evitar montos exactos fuera del dispositivo cuando basten bandas;
- no enviar PII ni texto libre;
- respetar la decisión de consentimiento definida antes del piloto;
- documentar variables de entorno sin incluir secretos;
- probar el flujo con bloqueadores de analytics.

## PWA

Alcance básico:

- manifest válido con nombre, nombre corto, color propio, iconos y modo standalone;
- HTTPS en el entorno público;
- iconos 192 y 512, incluyendo una opción maskable si la herramienta lo requiere;
- metadatos de tema y viewport;
- estrategia de caché conservadora para shell, imágenes y catálogo local;
- aviso o recuperación segura cuando se publique una versión nueva.

No implementar sincronización en segundo plano, push ni caché compleja de APIs porque no existen servicios remotos esenciales.

## Privacidad y seguridad

- No incluir campos de tarjeta, dirección, DNI, teléfono, correo o ubicación.
- No guardar datos sensibles en `localStorage`.
- No insertar HTML de catálogo sin sanitización.
- No poner secretos o claves privadas en Vite; todo lo enviado al cliente es público.
- Mantener dependencias mínimas y revisar alertas antes del despliegue.
- Añadir una explicación breve sobre almacenamiento local y borrado de historial.
- Analytics es opcional y la app debe seguir funcionando si se rechaza.

## Accesibilidad y rendimiento

- HTML semántico, landmarks, encabezados ordenados y botones reales.
- Área táctil mínima cercana a 44 × 44 px.
- Contraste WCAG AA para texto y controles esenciales.
- Focus visible, navegación por teclado y anuncios accesibles para cambios importantes del carrito.
- Respetar `prefers-reduced-motion` en tracking y celebraciones.
- Evitar autoplay con sonido.
- Cargar imágenes dimensionadas y ligeras; no añadir una librería solo para animaciones.
- Objetivo práctico: experiencia fluida en un Android de gama media y red móvil normal.

## Estrategia de pruebas

- Pruebas unitarias para cálculos, persistencia, migración y deduplicación.
- Pruebas de componentes solo en interacciones con riesgo: carrito, confirmación y ratings.
- Al menos una prueba end-to-end del recorrido principal cuando el scaffold esté estable.
- QA manual completo usando `QA_CHECKLIST.md` antes del piloto.

No buscar cobertura porcentual alta por sí misma. Probar primero las reglas que podrían mostrar un ahorro incorrecto, duplicar historial o romper el recorrido.

## Despliegue

- Un entorno de preview por cambio cuando el proveedor lo permita.
- Un único entorno público para el piloto.
- HTTPS, configuración de SPA y variables de analytics separadas.
- Rollback sencillo a un despliegue anterior.
- No comprar infraestructura antes de agotar los planes gratuitos adecuados.
- Vercel y Cloudflare Pages sirven el build estático desde `dist/`; la navegación actual no requiere reglas de backend.

## Plan de 7 días

El plan asume hasta 5 horas enfocadas por día y comienza después de aprobar esta documentación.

### Día 1 — Base y lenguaje visual

- Crear Vite + React + TypeScript y Tailwind.
- Configurar calidad mínima: scripts, formato, typecheck y pruebas.
- Definir tokens visuales originales y layout mobile-first.
- Crear modelos, catálogo pequeño y rutas base.
- Resultado: Home navegable y datos ficticios cargando.

### Día 2 — Exploración e-commerce

- Implementar selector de modo, tiendas, catálogo y detalle.
- Cargar FlashMarket y categorías prioritarias.
- Añadir rating inicial no bloqueante.
- Verificar accesibilidad básica y navegación Atrás.
- Resultado: descubrir productos y agregarlos desde el modo principal.

### Día 3 — Carrito y checkout falso

- Implementar estado de carrito y persistencia de sesión.
- Editar cantidades, eliminar, calcular total y estados vacíos.
- Crear resumen y confirmación de checkout sin datos personales.
- Añadir reglas puras y pruebas críticas.
- Resultado: `fake_checkout_completed` coherente y sin duplicados.

### Día 4 — Tracking, resultado e historial

- Crear secuencia simbólica breve con opción de continuar.
- Revelar ahorro y capturar rating final.
- Persistir historial y total acumulado.
- Manejar recarga, doble toque y almacenamiento no disponible.
- Resultado: recorrido e-commerce completo de punta a punta.

### Día 5 — Delivery y pulido de UX

- Reutilizar componentes para AntojoGo y categorías de comida.
- Revisar copy de simulación, tono y estados de error.
- Añadir compartir y enlace de feedback si P0 está estable.
- Hacer pruebas observadas con 3–5 personas y corregir confusiones.
- Resultado: ambos modos utilizables sin explicación verbal.

### Día 6 — Medición, PWA y QA

- Implementar adaptador y eventos de analytics.
- Configurar consentimiento o modo de medición acordado.
- Añadir manifest, iconos y caché básica.
- Ejecutar QA manual móvil, accesibilidad y rendimiento.
- Resultado: candidata de piloto instrumentada.

### Día 7 — Despliegue y piloto

- Desplegar en Vercel o Cloudflare Pages.
- Verificar eventos de producción y recorrido en dispositivos reales.
- Preparar landing o mensajes cortos para canales de validación.
- Lanzar una muestra pequeña y registrar incidencias, embudo y feedback.
- Resultado: experimento público medible y decisión sobre la siguiente iteración.

## Presupuesto

Objetivo base: **S/ 0** usando hosting, analytics y formularios en planes gratuitos que resulten adecuados. El tope de **S/ 300** se reserva para un dominio, recursos visuales originales o apoyo puntual que acelere la validación. No pagar servicios recurrentes antes de observar uso real.

## Señales contra la sobrearquitectura

Detener y simplificar si una propuesta introduce cualquiera de estos elementos sin una necesidad observada: API propia, ORM, repositorio monolítico complejo, microservicios, sincronización, esquema de usuario, abstracciones para proveedores inexistentes o más tiempo en infraestructura que en el recorrido principal.

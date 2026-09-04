# Handoff para futuros agentes

## Propósito

Este documento es la puerta de entrada para Claude Code, Codex, OpenClaw y cualquier otro agente que trabaje sin el contexto de conversaciones anteriores.

## Estado que debe asumirse

Al crear esta documentación, el repositorio remoto estaba vacío y la rama era `main`. Actualmente existe una base técnica funcional con Vite + React + TypeScript + Tailwind, Home y navegación local; el recorrido de compra sigue incompleto. Verificar siempre el estado actual porque esta nota puede quedar desactualizada.

## Orden de lectura obligatorio

1. `README.md` — resumen y estado.
2. `docs/PROJECT_CONTEXT.md` — problema, hipótesis, usuarios y restricciones.
3. `docs/MVP_SCOPE.md` — qué entra y qué queda fuera.
4. `docs/PRODUCT_SPEC.md` — comportamiento, datos y métricas.
5. `docs/DECISIONS.md` — decisiones aceptadas y preguntas pendientes.
6. El documento especializado relevante: plan técnico, UX o QA.
7. `docs/DO_NOT_BUILD_YET.md` antes de proponer funcionalidades nuevas.

Si aparece un `AGENTS.md` más específico en el repositorio, sus instrucciones también son obligatorias.

## Fuente de verdad

- El alcance aprobado vive en `MVP_SCOPE.md`.
- El comportamiento esperado vive en `PRODUCT_SPEC.md`.
- Las decisiones posteriores registradas en `DECISIONS.md` pueden actualizar una propuesta anterior.
- El código implementado y sus pruebas describen el estado real, pero no autorizan ampliar el alcance.
- Si dos documentos se contradicen, detener la decisión afectada, señalar la contradicción y proponer una actualización mínima de documentación.

## Protocolo antes de cambiar archivos

1. Ejecutar comprobaciones de solo lectura: rama, `git status`, estructura, manifiestos y scripts disponibles.
2. No descartar ni sobrescribir cambios ajenos.
3. Resumir qué requisito del MVP resuelve la tarea.
4. Elegir la implementación más pequeña compatible con privacidad, accesibilidad y medición.
5. No instalar dependencias, cambiar hosting o añadir servicios externos salvo que la tarea lo requiera explícitamente.
6. Confirmar que no se solicitan tarjeta, dirección, login ni datos personales.
7. Mantener marcas, contenido e imágenes completamente ficticios.

## Reglas para implementar

- Mobile-first real; probar primero en ancho pequeño.
- React y TypeScript simples antes que patrones abstractos.
- Estado de carrito e historial locales.
- Importes como enteros en céntimos.
- Funciones puras para totales y snapshots.
- Capa central de analytics; no importar PostHog directamente desde componentes.
- El flujo funciona sin analytics.
- Estados de error y rutas directas no producen pantallas en blanco.
- Componentes propios ligeros antes que librerías pesadas.
- Toda animación respeta movimiento reducido.
- No añadir P1 si P0 relacionado todavía falla.

## Cambios que requieren una decisión documentada

- Agregar backend, cuenta, base remota o integración externa.
- Cambiar el denominador o umbral de las métricas principales.
- Hacer obligatorio un rating o cualquier dato.
- Enviar importes exactos o nuevos campos a analytics.
- Cambiar la moneda o el mercado inicial.
- Introducir una marca, librería importante, proveedor o costo recurrente.
- Modificar el significado de compra fantasma o hacer el checkout más realista.
- Ampliar el alcance listado en `DO_NOT_BUILD_YET.md`.

Registrar la decisión en `DECISIONS.md` con fecha, estado, razón y consecuencias antes o junto con el cambio.

## Validación esperada para cada tarea

- Ejecutar los scripts existentes de typecheck, lint, pruebas y build que correspondan.
- Probar manualmente el recorrido afectado en viewport móvil.
- Verificar que no se rompa persistencia ni se dupliquen sesiones.
- Comprobar eventos nuevos o cambiados sin exponer PII.
- Informar qué se probó y qué no se pudo probar.
- No afirmar que algo está validado si solo compila.

## Cómo manejar ambigüedad

Se pueden tomar supuestos reversibles que mantengan el alcance. Documentarlos en el handoff. Pedir decisión cuando una elección cambie la hipótesis, privacidad, costo, proveedor externo o alcance. No convertir una ambigüedad en una arquitectura general “por si acaso”.

## Formato recomendado de entrega

Al terminar una tarea, dejar este resumen en el mensaje final o PR:

```text
Objetivo:
Cambios realizados:
Archivos clave:
Decisiones tomadas o pendientes:
Validaciones ejecutadas:
Riesgos o limitaciones:
Siguiente paso recomendado:
Estado de git (sin incluir cambios ajenos como propios):
```

## Prompt base para el siguiente agente

```text
Lee README.md y todos los documentos de docs/ antes de actuar. Revisa rama,
git status, estructura y scripts. Trabaja únicamente en [tarea concreta] del
alcance P0/P1. No amplíes el producto, no uses marcas reales, no solicites datos
personales y no conectes componentes directamente a un proveedor de analytics.
Implementa el cambio mínimo, ejecuta las validaciones disponibles, actualiza
DECISIONS.md solo si tomas una decisión relevante y entrega un handoff con el
formato de AGENT_HANDOFF.md.
```

## Señales de alerta

Detenerse y revisar alcance si la tarea empieza a requerir cuentas, API, base de datos, pagos, scraping, datos reales, IA, notificaciones, gamificación o una imitación visual de una marca. Esas capacidades están excluidas deliberadamente, no olvidadas.

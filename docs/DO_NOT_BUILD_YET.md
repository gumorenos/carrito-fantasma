> **Dirección vigente — 2026-09-06:** El usuario autorizó una tienda inmersiva. Ver [plan de implementación](IMMERSIVE_STORE_PLAN.md). Sustituye las reglas anteriores de avisos constantes, emojis como producto, guardado manual y seguimiento simbólico. Aclaración inicial y junto a Confirmar pedido; sin cobro, envío ni datos de pago. Los apartados de implementación previos describen la versión anterior.

# No construir todavía

## Propósito

Esta lista protege el experimento contra expansión de alcance. Las capacidades siguientes no están olvidadas: fueron excluidas porque no son necesarias para comprobar si el ritual reduce un impulso. Un agente no debe implementarlas como “mejora” incidental.

## Exclusiones

| Capacidad | Por qué no ahora | Señal mínima para reconsiderar |
|---|---|---|
| Login y perfiles | Añaden fricción, identidad y soporte | Retención demostrada y necesidad real de sincronizar |
| Backend propio | No es necesario para catálogo o historial local | Función validada que no pueda resolverse en el cliente |
| Base de datos remota | Aumenta privacidad, costo y operaciones | Usuarios pidan continuidad entre dispositivos |
| Pasarela de pago | Contradice la promesa de no comprar | No pertenece al producto actual; exige redefinirlo |
| Tarjeta o dirección real | Riesgo innecesario y posible engaño | No reconsiderar para el ritual ficticio |
| App nativa | Duplica esfuerzo antes de probar demanda | Uso repetido y límites claros de la PWA |
| Scraping | Fragilidad, permisos y dependencia de terceros | Caso validado, revisión legal y valor demostrado |
| Integraciones con marketplaces | Acerca la app a compras reales y lock-in | Investigación separada posterior, con consentimiento |
| Precios o stock reales | Pueden alimentar el impulso y requieren mantenimiento | Evidencia de que la ficción impide el efecto buscado |
| IA en producción | No resuelve la hipótesis básica | Problema específico repetido que reglas simples no cubran |
| Recomendaciones personalizadas | Requieren más datos y pueden estimular compras | Beneficio observado, guardrails y privacidad aprobada |
| Push avanzado | Permisos y riesgo de generar culpa o reactivar deseos | Patrón de retorno validado y pruebas de tono |
| Marketplace real | Cambia el modelo a comercio | Fuera de la tesis actual |
| Comunidad y feed | Moderación, privacidad y efecto social | Necesidad consistente después de retención individual |
| Ranking | Comparación y culpa, sin relación con el ritual | No reconsiderar sin investigación de daño |
| Gamificación compleja | Puede reemplazar una compulsión por otra | Ritual base útil y pruebas específicas de seguridad |
| Rachas obligatorias | Castigan ausencia y fomentan presión | No recomendadas para este producto |
| Monetización | Distrae de validar utilidad | Uso repetido y propuesta de valor comprobados |
| Suscripción | Requiere cuenta, cobro y soporte | Solo después de validar retención y disposición a pagar |
| Cupones o afiliados | Incentivan compras reales y crean conflicto | Incompatibles con el MVP; requieren nueva tesis |
| Dashboard administrativo | No hay operación que administrar | Volumen y proceso manual que lo justifiquen |
| CMS | Catálogo pequeño y local es suficiente | Cambios frecuentes por personas no técnicas |
| Microservicios o monorepo complejo | Sobrecoste técnico sin escala | Nunca por anticipación; solo por límites medidos |
| Design system externo pesado | Reduce velocidad y puede diluir identidad | Componentes repetidos que no se mantengan con tokens simples |
| A/B testing formal | Muestra inicial insuficiente | Tráfico suficiente y una hipótesis concreta |
| Soporte multiidioma/multimoneda | Mercado inicial es Perú | Señal real de otro mercado después del piloto |

## También evitar durante el MVP

- Reseñas falsas atribuidas a personas.
- Temporizadores, stock limitado o urgencia artificial.
- Mapas y repartidores ficticios presentados como reales.
- Sonidos automáticos, confeti excesivo o animaciones pesadas.
- Catálogos enormes antes de probar el flujo.
- Encuestas largas dentro del recorrido.
- Formularios de onboarding.
- Perfil financiero, presupuesto mensual o conexión bancaria.
- Consejos clínicos, diagnósticos o promesas terapéuticas.
- Métricas de vanidad que no ayuden a decidir continuidad.
- Refactors generales mientras existan fallas P0.

## Prueba para una propuesta nueva

Antes de añadir una capacidad, responder:

1. ¿Qué pregunta de validación resuelve?
2. ¿Qué evento o prueba mostrará si funcionó?
3. ¿Puede probarse manualmente o con una solución más pequeña?
4. ¿Introduce datos personales, costo, dependencia o riesgo de marca?
5. ¿Retrasa el recorrido completo o el piloto?
6. ¿Está incluida en `MVP_SCOPE.md`?

Si no existe una respuesta clara para las preguntas 1 y 2, no construirla. Si está fuera del alcance, requiere una decisión explícita en `DECISIONS.md` y autorización del responsable del producto.

## Regla de salida

Solo reconsiderar esta lista después de observar el MVP y conservar evidencia: embudo, ratings pareados, repetición, entrevistas o respuestas cualitativas. Una idea atractiva o una sugerencia de un agente no es evidencia suficiente.

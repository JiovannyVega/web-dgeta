# UI/UX: perfil y formularios

Referencia de trabajo: https://github.com/atuizz/codex-ui-ux-skill/blob/main/ui-ux/SKILL.md

## Contexto y decisiones

- Proyecto en desarrollo: aplicación escolar para alumnos y tutores.
- Objetos principales: datos del alumno, formularios, borradores y entregas.
- Superficies: consulta/edición por apartado, catálogo y formulario por pasos.
- Recorrido: elegir apartado o formulario, consultar o responder, corregir, revisar y guardar.
- Primera decisión: qué información actualizar o qué formulario responder/retomar.
- Éxito: guardar sin perder respuestas y distinguir con claridad borrador de entrega finalizada.
- Recuperación: errores junto al campo, conservar lo escrito y permitir corregir antes de avanzar; mensaje de almacenamiento si falla el guardado.
- Móvil: contenido en una columna, acciones accesibles y etiquetas legibles sin desplazamiento horizontal.
- Temperamento: institucional, sobrio, cercano; verde existente y superficies neutras.
- Vocabulario: datos, preguntas, continuar, salir, borrador, finalizar. Rutas, MySQL y detalles de almacenamiento permanecen en documentación técnica.
- Base: React/Tailwind existentes; reutilizar botones y campos. Referencias previas de WAI y GOV.UK en UX_FORMULARIOS.md.
- Riesgos: mensajes repetidos, demasiados recuadros, estilos de foco que ocultan errores, estados de guardado confundidos con controles.

## Alcance de la mejora

Pulido de componentes y páginas existentes. Conservar los cuatro apartados del perfil, el familiar en recuadro aparte, el catálogo de siete formularios, los errores en cada pregunta, la fecha automática y la barra con Continuar/Salir. En revisión, la acción principal es Finalizar formulario. Mantener las opciones de los instrumentos y los datos actuales.

## Criterios reutilizables

1. Una acción principal por contexto; misma altura, tipografía, espaciado e iconos en perfil y formularios.
2. Filtros compactos distinguibles de los botones de acción; estado indicado con texto además de color.
3. Mensajes cortos: resultado y siguiente paso. No repetir explicaciones técnicas en cada pantalla.
4. Errores rojos junto al campo y foco visible que conserva el borde de error.
5. Texto largo ajustable, controles de al menos 44 px y texto de entrada de 16 px.
6. Respetar movimiento reducido. No añadir efectos decorativos ni nuevas dependencias de producto.
7. Guardar al continuar/salir; no reintroducir botones de guardado duplicados ni resúmenes de errores.

## Verificación

Compilar y revisar los archivos modificados. Probar edición/cancelación/guardado del perfil, filtros, respuestas pendientes, borrador y finalización. Revisar capturas a 1440 px y 390 px; comprobar desbordamiento, acciones y foco. Registrar resultados y limitaciones después de la revisión.

## Resultado de esta revisión

- Botones y campos compartidos entre perfil y anexos; mensajes de error al guardar en rojo, conservando los datos en edición.
- Catálogo con filas compactas y filtros por estado, acción sólida para retomar un borrador y salida del estado vacío.
- Cabecera compacta en perfil/formularios, incluyendo enlace para saltar al contenido y navegación al apartado relacionado.
- Corrección de la regla global de bordes: los colores de error y selección ya no quedan anulados. Foco verde oscuro sin ocultar el borde de error; barra de progreso estilizada y movimiento reducido.
- Mensajes más breves; se conservan los errores junto a cada pregunta, la fecha automática y las dos acciones acordadas.
- ESLint y compilación TypeScript/Vite correctos.
- Chromium real con Playwright: perfil (editar/guardar/cancelar y persistencia del tutor), filtros, apertura de los siete anexos, errores y bordes calculados, tres pasos completos del cuestionario, revisión, finalización, guardado al salir y recuperación del borrador. Recorrido repetido a 1440, 390 y 320 px, sin desbordamiento horizontal ni errores JavaScript.
- Capturas revisadas de catálogo, perfil y preguntas en escritorio/móvil. Evidencia y script de revisión: carpeta `.tmp` del espacio de trabajo, fuera de los repositorios.

No equivale a una auditoría completa de accesibilidad: quedan dispositivos físicos, lector de pantalla y evaluación con alumnos. Las fechas y los registros siguen siendo locales; su validación por servidor corresponde a la futura integración de entregas con la API.

La ampliación de estas reglas al resto del portal y sus comprobaciones se documenta en [UI_UX_PORTAL.md](./UI_UX_PORTAL.md).

# Criterios UX y accesibilidad de formularios

Revisión del 12 de noviembre de 2026. Aplica a los siete formularios del alumno. La investigación usa guías primarias de W3C/WAI y sistemas de diseño gubernamentales; distingue requisitos de accesibilidad de decisiones de diseño.

## Reglas aplicadas

| Criterio | Aplicación | Referencia |
| --- | --- | --- |
| Etapas comprensibles | Inicio con instrucciones y extensión, preguntas agrupadas, revisión y confirmación. Se conserva cada pregunta condicional junto con su antecedente. | [WAI, formularios de varias páginas](https://www.w3.org/WAI/tutorials/forms/multi-page/) |
| Progreso accesible | Paso actual, título de la sección, elemento progress y título del documento que identifica etapa y errores. Sin tiempo límite ni duración inventada. | [WAI, formularios de varias páginas](https://www.w3.org/WAI/tutorials/forms/multi-page/) |
| Corrección de errores | Mensaje rojo junto al campo, borde rojo, foco en la primera respuesta pendiente y aria-invalid/aria-describedby. Sin resumen adicional de errores. Se conservan las respuestas al corregir. | [GOV.UK, resumen de errores](https://design-system.service.gov.uk/components/error-summary/), [WAI, notificaciones](https://www.w3.org/WAI/tutorials/forms/notifications/) |
| Revisión antes de finalizar | Resumen de lo preguntado, respuestas opcionales sin contestar e intervención Cambiar respuestas. Los campos no aplicables no aparecen. Se vuelve a confirmar después de editar. | [GOV.UK, revisar respuestas](https://design-system.service.gov.uk/patterns/check-answers/) |
| Captura no redundante | Datos personales y académicos y respuestas comunes precargadas. La identificación completa se concentra en inicio y revisión para reducir ruido durante las preguntas. | [WCAG 2.2, 3.3.7](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) |
| Etiquetas claras | Obligatorio/opcional expresado en texto. Opciones cortas mediante radios, listas mayores mediante select, varias respuestas mediante checkboxes. No hay opciones seleccionadas por defecto. | [WAI, etiquetas](https://www.w3.org/WAI/tutorials/forms/labels/), [GOV.UK, radios](https://design-system.service.gov.uk/components/radios/) |
| Recuperación | Borrador al continuar o salir, recuperación del paso y hora del último guardado. Si guardar falla, no se avanza. | Prevención de pérdida de trabajo como decisión del producto, apoyada en los principios de formularios multipágina de WAI. |
| Salida y acciones reversibles | Continuar y Salir del formulario como únicas acciones de navegación. Diálogo para enlaces internos con cambios: guardar, seguir respondiendo o salir sin guardar. Aviso nativo al recargar/cerrar con cambios. Deshacer al quitar una fila. | [DWP, agregar elementos](https://design-system.dwp.gov.uk/patterns/add-another-thing/how-it-works) y prevención de errores como decisión de diseño. |
| Controles distinguibles | Verde sólido para continuar/finalizar; borde verde para secundarias. Iconos decorativos acompañados de texto. Estados del catálogo con etiqueta e icono además de color. | [Apple, botones](https://developer.apple.com/design/human-interface-guidelines/buttons) |
| Tamaños y contraste | Botones de al menos 44 px, campos de 48 px, foco visible, texto de controles de 16 px y paleta con contraste verificado. Los 44 px son una elección del producto; WCAG 2.5.8 AA fija un mínimo general de 24 px, con excepciones. | [WCAG, tamaño de objetivos](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), [WCAG, contraste](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) |
| Presentación adaptable | Una columna en pantallas pequeñas, acciones que se acomodan al ancho, cabecera reducida durante formularios y enlace Saltar al contenido. El desplazamiento horizontal de la hoja de respuestas se limita al contenedor de tabla. | [WCAG, reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) |
| Catálogo orientado a tareas | Filtros Todos/Pendientes/En borrador/Finalizados, contadores, estado vacío y acciones con nombre accesible que incluye el formulario. | Organización del producto basada en el estado real de los registros locales. |

## Comprobaciones realizadas

- Compilación TypeScript/Vite y ESLint de los componentes modificados.
- Diez pruebas de lógica, incluida conservación del Anexo 6 anterior, puntuaciones, empates, condicionales, agrupación y entregas históricas.
- Pruebas de interacción en DOM aislado: siete tarjetas y filtros, cuatro entregas completas con revisión/cambios, enlaces de error y foco, borradores por pasos, recuperación del paso, diálogo de salida, condicionales y deshacer filas.
- Contraste calculado a partir de los colores del tema Tailwind instalado: blanco/verde 800 = 7.09:1; gris 600/blanco = 7.56:1; verde 950/verde 100 = 13.56:1; ámbar 950/ámbar 100 = 13.47:1; gris 800/gris 100 = 13.35:1; rojo 950/rojo 50 = 14.78:1. Borde gris 500/blanco = 4.84:1.

## Alcance y validación pendiente

Estas comprobaciones no constituyen una auditoría WCAG completa. Se revisaron capturas y recorridos en Chromium a 1440, 390 y 320 px. Faltan dispositivos físicos, zoom de 200 % y 400 %, recorridos con lector de pantalla y pruebas de comprensión con alumnos. El DOM simulado comprueba estados y foco programático; no verifica el diseño visual ni la contención nativa del foco del diálogo.

La protección de salida cubre enlaces internos, cierre/recarga y las acciones explícitas del formulario; no intercepta el botón Atrás del navegador en la navegación SPA. Los datos continúan siendo locales. Autenticación, autorización y sincronización con MySQL requieren una etapa posterior.


Los ajustes posteriores de presentación y la guía utilizada se documentan en [UI_UX_CRITERIOS.md](./UI_UX_CRITERIOS.md).

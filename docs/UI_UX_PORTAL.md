# Dirección visual del portal completo

Se aplican UI/UX de atuizz y UI UX Pro Max de nextlevelbuilder. Guías consultadas directamente y buscador ejecutado desde `.tmp`, sin instalar dependencias de producto.

## Contexto

Aplicación escolar en desarrollo. Alumnos: consultar datos, calificaciones, asistencias y mensajes; responder formularios. Tutores: consultar grupos/alumnos, dar seguimiento y registrar atención. Superficies: inicio orientado a tareas, listas/tablas, detalle, edición y cuestionarios por pasos. La primera decisión es elegir la tarea; el éxito es completarla sin perder datos. Recuperación mediante errores junto al campo, borrador y cancelación. En móvil, navegación modal y contenido de una columna; tablas con desplazamiento local.

## Dirección elegida

Conservar React/Tailwind y verde institucional. Refactorizar componentes compartidos y páginas; no reconstruir el backend. Estética plana y sobria, tipografía del sistema, títulos de 24 px, texto de 14–16 px, separación de 16/24/32 px, bordes discretos y botones de 44 px. Estados de alerta conservan rojo/ámbar/verde con etiquetas.

El buscador Pro Max devolvió Minimalism/Swiss y Flat Design, adecuados como referencia de superficies, foco y densidad. Sus patrones de landing y fuentes de bienestar/editoriales no encajan con un portal operativo: no se adoptan. La búsqueda React de tablas no tuvo coincidencia tras la consulta inicial; la consulta de formularios sí devolvió pautas para React 19, pero no justifica migrar a Server Actions esta SPA.

## Conservar y cambiar

- Conservar rutas, datos y formularios existentes; sin Git, ramas ni commits.
- Conservar fecha automática, errores locales, revisión y acciones Continuar/Salir.
- Unificar cabecera, menú, controles, ancho, tablas y jerarquía de todas las rutas activas.
- Quitar felicitaciones genéricas, contadores decorativos, contacto/materias repetidos en el perfil, búsquedas/notificaciones sin función en la cabecera y tarjetas de soporte sin destino.
- No mostrar arquitectura, referencias de anexos ni mensajes repetidos del almacenamiento en el flujo habitual.
- No simular acciones remotas que todavía no existen. Ocultar acciones sin implementación o dar un estado explícito cuando formen parte de un flujo necesario.

## Verificación prevista

Compilación, lint y recorridos en Chromium de todas las rutas de alumno/tutor y acceso, a 1440/768/390/320 px. Revisar menú con teclado/Escape, tablas, filtros, estados vacíos, formularios y persistencia. Capturas en `.tmp`. Registrar fallos y corregir antes de entregar; no confundir las comprobaciones automatizadas con auditoría WCAG completa.

## Resultado

- Navegación, cabecera y estilo compartidos en las áreas de alumno y tutor; menú móvil nativo con foco contenido, cierre con Escape y retorno al botón de apertura.
- Inicio del alumno basado en los formularios reales del almacenamiento actual; inicio del tutor centrado en grupos y seguimiento. Se retiraron felicitaciones y cifras decorativas del inicio anterior.
- Perfil del tutor sin contacto ni asignaturas repetidas. Se conservaron los cuatro apartados del alumno y su contacto de emergencia separado.
- Tablas con desplazamiento dentro de su contenedor, encabezados de columna y acceso por teclado; calificaciones con números legibles y selección de semestres existentes. Exportación CSV de las filas filtradas del tutor.
- Filtros con estado accesible, búsquedas etiquetadas, estados vacíos y etiquetas textuales de mensajes sin leer. Asistencias desplegables mediante botones operables con teclado.
- Selección de grupo y alumno reflejada en la ruta de detalle. Cuando no hay lista, contacto o calificaciones para el elemento seleccionado, se muestra el estado vacío correspondiente; no se reutiliza el detalle de Juan Pérez para otros alumnos.
- Acceso y registro comparten controles y presentación. Se retiraron botones de Google, recuperación, notificaciones y opciones de creación/agenda que no tenían implementación. El acceso conserva la navegación local existente: no se implementó autenticación. El registro indica solicitar el alta al plantel.
- Pantalla de simulación integrada con el diseño del portal y todos sus campos etiquetados. Se conserva su cálculo de ejemplo; no se presenta como un modelo conectado a la API.
- Se mantienen fecha automática, errores solo junto a las preguntas, revisión y dos acciones de navegación en los anexos.

## Comprobaciones

- Compilación TypeScript/Vite y ESLint de componentes, páginas activas, layouts y datos modificados: correctos.
- 24 rutas, incluidas acceso/registro, las cuatro secciones del perfil y la simulación; recorridas en Chromium a 1440, 768, 390 y 320 px (96 vistas). Sin desbordamiento horizontal, controles sin nombre, errores JavaScript ni títulos principales duplicados detectados.
- Axe en el estado inicial de las 24 rutas a escritorio, con reglas WCAG A/AA seleccionadas: sin incidencias detectadas tras corregir cinco etiquetas en la simulación. Esto no constituye una auditoría WCAG completa.
- Recorridos interactivos a 1440, 390 y 320 px: menú/teclado, asistencias, semestres, filtros, detalle de grupo/alumno, exportación, ficha de tutor, acceso y visibilidad de contraseña.
- Regresión de perfil y siete anexos a 1440, 390 y 320 px: edición, cancelar, persistencia del tutor, errores, fecha automática, dos acciones, guardado al salir, recuperación y entrega finalizada.
- Capturas de las rutas guardadas en `.tmp` del espacio de trabajo; revisión visual de inicio, calificaciones, asistencias, mensajes, perfil del tutor, acceso y simulación en escritorio/móvil.

La revisión cubre las rutas activas de App.tsx. Las páginas de muestra sin ruta (HomePage, ExamplePage, PerfilPage y CalificationsPage) no forman parte del flujo servido. Los módulos que ya usaban datos de ejemplo conservan esa condición; no se modificaron la API ni la base de datos. Pendientes de una etapa posterior: integración de módulos, autenticación, dispositivos físicos y pruebas con lector de pantalla y alumnos.

También se verificó el estado con resultados de la simulación a 390 px: se corrigió el contraste de las recomendaciones ámbar y pasó la comprobación Axe de ese estado.

## Evolución visual: bosque y papel

El usuario solicita más identidad tras aprobar la limpieza. Se conserva la estructura operativa y se aplica una dirección visual: navegación verde bosque, selección en tono hoja, fondo cálido, superficies de lectura claras, números con mayor jerarquía y composición asimétrica de los inicios. El alumno ve su siguiente formulario destacado; el tutor combina su lista de grupos con seguimiento. En móvil las columnas vuelven a una secuencia de tareas. Se mantienen contraste, foco, movimiento reducido, errores locales y dos acciones en los anexos. No se agregan datos, controles ni imágenes decorativas.

Verificación de la identidad bosque/papel: compilación y lint correctos; 24 rutas en 1440/768/390/320 px sin desbordamientos ni incidencias Axe en el estado inicial de escritorio. Recorridos de teclado, menú, filtros, detalles, ficha de tutor y acceso conservados. El menú móvil abierto también pasó la comprobación de contraste/accesibilidad. Capturas revisadas de los dos inicios, calificaciones, perfil y entrada del cuestionario en escritorio/móvil.

## Corrección de navegación y dirección visual

Tras el rechazo de la apariencia bosque el usuario elige la dirección institucional moderna: menú blanco sin contenedor flotante, superficies neutras frías y verde solo en selección/acciones. Se elimina Mi perfil de la cabecera y del acceso rápido del inicio del alumno: queda una sola entrada en el menú. La cabecera incluye Cerrar sesión, que vuelve al login mediante reemplazo de navegación; no borra el perfil ni las respuestas locales. Se conserva la protección de borrador al salir desde un cuestionario. No se añade autenticación: aún no existe una sesión remota ni tokens que invalidar en el frontend.

Comprobación de navegación a 1440/390/320 px: acceso de perfil único, retorno al login desde alumno/tutor y salida con guardado del borrador, correctos.

Verificación de la versión institucional clara: 24 rutas a 1440/768/390/320 px sin desbordamientos ni incidencias detectadas por Axe en escritorio; menú móvil abierto también verificado. Capturas de inicio de alumno/tutor revisadas. Perfil único y retorno al login comprobados en ambos roles; borrador conservado al salir mediante Cerrar sesión desde un formulario con cambios.

La dirección visual posterior basada en la skill frontend-design de Anthropic se documenta en [DISENO_EXPEDIENTE.md](./DISENO_EXPEDIENTE.md). Reemplaza la propuesta visual anterior y conserva las reglas de navegación y captura acordadas.

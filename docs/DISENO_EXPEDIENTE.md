# Identidad visual: expediente de tutoría

Guía aplicada: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md

## Plan previo a implementación

Producto: portal de tutoría para alumnos y tutores. Se conservan blanco/verde sobrio, menú claro, acceso único al perfil, salida al login y el funcionamiento de los formularios.

Paleta: tinta #18332D, verde institucional #145B47, verde claro #DCEDE5, papel #FFFFFF, fondo #F3F6F4 y línea #D8E2DC. Los colores de validación mantienen su significado.

Tipografía: Outfit para títulos y marca; Source Sans 3 para lectura y controles. Archivos locales con sus licencias, sin peticiones de fuentes al navegar. Los encabezados tendrán una escala diferenciada de la información secundaria.

Composición: el expediente de tutoría como elemento protagonista, inspirado en la organización de un archivo escolar. El panel principal muestra el siguiente formulario o la atención individual; el resumen lateral presenta avance real y contexto. Debajo, una franja de acceso escolar y listas con jerarquía clara.

    Menú claro | Cabecera con Cerrar sesión
               | Título y contexto
               | Expediente de tarea       | Avance / contexto
               | Accesos escolares y listas de consulta

En móvil se conserva la secuencia tarea, avance y acceso; sin columnas estrechas ni contenido oculto tras acciones fijas.

## Revisión del plan contra el encargo

Se descarta cambiar solo colores, repetir tarjetas idénticas, añadir cifras decorativas, usar una estética de periódico o poner rótulos innecesarios encima de cada sección. La personalidad se concentra en tipografía y en el panel de tarea con estructura de expediente; el resto debe ser tranquilo. La pestaña del expediente tiene un título funcional (Formularios/Atención individual), no un número ornamental. No se añaden imágenes ni animaciones automáticas.

Verificación: capturas antes/después, recorrido de rutas y contraste, móvil, teclado, perfil único, cierre al login y protección de borradores.

## Revisión y resultado

Se revisaron capturas y se simplificó el remate de la pestaña para evitar un doble arco decorativo. Se sustituyeron las variantes TTF iniciales por WOFF2 variables latinas: 61 KB en total, con licencias OFL distribuidas en public/licenses/fonts. No se hacen solicitudes a Google Fonts al usar el portal.

- Compilación y lint de los componentes cambiados: correctos.
- 24 rutas en 1440, 768, 390 y 320 px: sin desbordamientos, controles sin nombre ni títulos principales duplicados detectados. Axe en los estados iniciales de escritorio: sin incidencias detectadas.
- Expediente en estado pendiente, borrador y completado verificado en cuatro anchos; fuentes locales cargadas y progreso consistente.
- Regresión de perfil y siete anexos: edición/cancelación, datos de tutor, errores, fecha automática, guardado al salir, recuperación y entrega finalizada.
- Perfil único, cierre al login y protección del borrador: comprobados en alumno/tutor y móvil/escritorio.
- Evidencia en `.tmp`: portal-*.png, expediente-borrador-*.png y expediente-completo-*.png. Capturas revisadas de ambos inicios, catálogo y móvil.

Esto no equivale a una auditoría completa de accesibilidad. La integración y autenticación remotas siguen fuera del cambio visual.

## Acceso al portal

El login comparte la identidad aprobada. Se reemplaza la tarjeta aislada sobre una pantalla vacía por una composición de dos paneles: identidad verde y expediente ilustrado a la izquierda, formulario claro a la derecha. El único elemento expresivo es la ilustración del expediente, realizada en CSS y oculta para tecnología asistiva; no contiene datos ni controles ficticios. En móvil se reduce a una cabecera de marca y se priorizan los campos. Se conservan etiquetas, gestor de contraseñas, mostrar/ocultar, navegación y comportamiento existentes de acceso/registro.

Comprobación de acceso/registro: ESLint y TypeScript/Vite correctos. Chromium a 1440, 768, 390 y 320 px: sin desbordamientos ni incidencias Axe detectadas. Se probaron navegación por teclado, mostrar/ocultar contraseña, conservación del valor, entrada al portal, cierre al login y enlace entre acceso/registro. Capturas revisadas: login-acceso-1440.png, login-acceso-390.png y login-registro-768.png, en `.tmp` del espacio de trabajo. Se conserva el comportamiento local de acceso y el estado existente de solicitud de alta; no se añadió autenticación remota.

## Fondo de acceso y espacio de trabajo adaptable

Se conserva la composición del login y se añade un fondo SVG de curvas de terreno en tonos suaves, relacionado con la identidad agropecuaria y sin competir con el formulario. Las pantallas internas dejan de usar máximos de 1240/1024/896 px y centrado automático: comparten un contenedor que ocupa el ancho disponible con márgenes laterales de 20–28 px. El perfil adapta sus campos de una a tres columnas; la entrada de los anexos deja de ser una tarjeta estrecha centrada y distribuye instrucciones/datos a la derecha en pantallas amplias. Se conserva el ancho de lectura de los párrafos y el tamaño accesible de los controles.

Verificación del espacio adaptable: compilación y lint correctos. Se recorrieron 24 rutas a 1920/1440/768/390/320 px y se comprobó que el contenedor interno ocupa el ancho de su área disponible, sin desbordamientos; Axe en estado inicial a 1440 px, sin incidencias detectadas. Se verificaron fondo, columnas del perfil y anexos con datos desplegados a 1920/1280/1024/768/390/320 px. Pasó la regresión de perfil y siete anexos, incluidos borradores y finalización. Capturas revisadas de login, perfil y entrada del anexo a 1920 px; evidencia en `.tmp`.

## Movimiento solicitado para el acceso

Se añade desplazamiento oscilante de las ondas, entrada del panel/formulario y un movimiento inicial del expediente con salida de la hoja. La hoja responde al cursor mediante transformaciones acotadas, sin actualizar estado de React por cada movimiento. La salida de la hoja y su interacción usan capas separadas para no competir por la misma transformación. Se añade una transición breve al entrar a los apartados del portal.

Las ondas pueden pausarse/reanudarse desde un control fuera del panel. En móvil se conserva la cabecera compacta. Con movimiento reducido se muestra el estado final estático y no se ejecuta la interacción de la hoja. No se bloquea el formulario ni se cambian los flujos de acceso.

Verificación del movimiento: ESLint y compilación correctos. Chromium comprobó transformaciones de las ondas en distintos tiempos, entrada del panel, salida de la hoja, seguimiento del cursor y regreso al reposo. Pausa/reanudación comprobadas sobre el tiempo real de la animación. Movimiento reducido verificado sin animaciones ni respuesta al cursor. Acceso/registro, teclado, contraseña y entrada/cierre al login comprobados a 1440/768/390/320 px. Axe con movimiento reducido y con movimiento activo/control de pausa visible: sin incidencias detectadas. Capturas revisadas de la hoja en reposo y al pasar el cursor, guardadas en `.tmp/login-motion-*.png`.

Corrección visual de la hoja: la máscara estaba aplicada al mismo contenedor animado y se desplazaba con él. Ahora la máscara es fija, está alineada con la abertura superior de la carpeta y contiene una capa independiente que mueve la hoja. Se fijan las capas de fondo/hoja/frente y la hoja inicia completamente guardada, sin aparición translúcida. Chromium verificó siete tiempos de animación en 1440/1024/768 px, incluyendo pruebas de recorte por debajo de la abertura aun ocultando temporalmente la cubierta frontal. Se revisaron capturas inicial/intermedia/final y pasó la regresión de cursor, pausa, ondas y movimiento reducido. Compilación y lint correctos.

## Captura de identidad en registro

El campo Nombre completo se sustituye por Nombre (nombres), Apellido paterno (apellidoPaterno) y Apellido materno (apellidoMaterno), con claves independientes para FormData. Nombre y apellido paterno obligatorios; apellido materno opcional y señalado, para no forzar datos inventados. Nombre acepta nombres compuestos. Autocompletado de nombre y primer apellido; el segundo apellido no reutiliza el mismo token para evitar duplicaciones automáticas. Dos columnas para apellidos donde hay espacio, una columna en móvil pequeño. El registro sigue sin enviar a la API; no se modifican entidades ni MySQL en esta tarea de frontend.

Verificación de nombre/apellidos: compilación y lint correctos; Chromium a 1440/768/390/320 px. FormData mantiene separados nombres, apellidoPaterno y apellidoMaterno, admite nombres compuestos y conserva valores al mostrar el estado de alta pendiente. Apellido paterno requerido, materno opcional; campos de apellidos alineados en escritorio y apilados en móvil pequeño. Login conservado. Capturas revisadas y evidencia en `.tmp/registro-nombres-*.png`.

## Transici?n entre acceso y registro

Ambas rutas comparten AccessLayout: se conservan el fondo, la carpeta y el estado de pausa. Solo cambia el formulario dentro de Outlet, con entrada suave y ajuste animado de altura. La hoja se guarda parcialmente y vuelve a salir al cambiar de vista, dentro de la m?scara fija existente. La navegaci?n mueve el foco al t?tulo y tambi?n funciona con Atr?s/Adelante. Pausar mantiene los formularios visibles; movimiento reducido omite la animaci?n de la hoja y las transiciones.

Verificaci?n: compilaci?n TypeScript/Vite y lint correctos. Chromium a 1440/768/390/320 px verific? que el panel y la ilustraci?n mantienen sus nodos, las ondas no reinician, no hay recarga de documento, funcionan historial/pausa y no hay errores de ejecuci?n ni desbordamientos. Pasaron las regresiones de nombre/apellidos, acceso y recorte de la hoja. Capturas de registro revisadas en escritorio y m?vil; evidencia en `.tmp/access-transition-register-*.png` y `.tmp/access-route-transition-check.cjs`.

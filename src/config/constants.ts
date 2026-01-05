// Constantes de rutas
export const ROUTES = {
    // Rutas principales
    HOME: '/',
    REGISTER: '/register',
    HOMEPAGE: '/homepage',
    PERFIL: '/perfil',
    CALIFICATIONS: '/califications',

    // Rutas de profesor
    PROFESOR: {
        DASHBOARD: '/profesor/dashboard',
        MIS_GRUPOS: '/profesor/misgrupos',
        DETALLES_GRUPO: '/profesor/misgrupos/detalles',
        CALIFICACIONES: '/profesor/calificaciones',
        INCIDENCIAS: '/profesor/incidencias',
        TUTORIAS: '/profesor/tutorias',
        MENSAJES: '/profesor/mensajes',
        DETALLES_ALUMNO: '/profesor/detalles-alumno',
        PREDICCION: '/profesor/prediccion',
    },

    // Rutas de estudiante
    ESTUDIANTE: {
        DASHBOARD: '/estudiante/dashboard',
        ASISTENCIAS: '/estudiante/asistencias',
        CALIFICACIONES: '/estudiante/calificaciones',
        FORMULARIOS: '/estudiante/formularios',
        FORMULARIO: '/estudiante/formulario/:id',
        MENSAJES: '/estudiante/mensajes',
        PERFIL: '/estudiante/perfil',
    },

    // Rutas de Daniel
    DANIEL: {
        PREDICCION: '/daniel/prediccion',
    },
} as const;

// Constantes de colores
export const COLORS = {
    PRIMARY: 'green-800',
    PRIMARY_LIGHT: 'green-700',
    PRIMARY_DARK: 'green-900',
    BACKGROUND: 'gray-50',
    BACKGROUND_DARK: 'gray-900',
    TEXT: 'gray-900',
    TEXT_LIGHT: 'gray-500',
    BORDER: 'gray-200',
    ERROR: 'red-500',
    SUCCESS: 'green-500',
    WARNING: 'yellow-500',
} as const;

// Constantes de tamaños
export const SIZES = {
    SIDEBAR_WIDTH: '256px', // w-64
    HEADER_HEIGHT: '64px',
    INPUT_HEIGHT: '40px',
    BUTTON_HEIGHT: '40px',
} as const;

// Constantes de breakpoints
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
} as const;

// Duraciones de animación
export const ANIMATIONS = {
    FAST: 150,
    BASE: 200,
    SLOW: 300,
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
    REQUIRED_FIELD: 'Este campo es requerido',
    INVALID_EMAIL: 'Correo electrónico inválido',
    INVALID_PASSWORD: 'La contraseña debe tener al menos 8 caracteres',
    PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
    NETWORK_ERROR: 'Error de conexión. Por favor, inténtelo de nuevo.',
} as const;

// Roles de usuario
export const USER_ROLES = {
    STUDENT: 'estudiante',
    TEACHER: 'profesor',
    ADMIN: 'admin',
} as const;

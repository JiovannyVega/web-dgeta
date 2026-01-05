// Configuración centralizada del tema
export const theme = {
    colors: {
        primary: {
            DEFAULT: '#166534', // green-700
            dark: '#14532d',    // green-800
            light: '#86efac',   // green-300
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#166534',
            800: '#14532d',
            900: '#052e16',
            950: '#052e16',
        },
        background: {
            light: '#f9fafb',   // gray-50
            dark: '#111827',    // gray-900
        },
        text: {
            light: '#1f2937',   // gray-800
            dark: '#f3f4f6',    // gray-100
        },
    },

    // Breakpoints responsivos
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    // Espaciados comunes
    spacing: {
        pageX: '2rem',      // Padding horizontal de páginas
        pageY: '2rem',      // Padding vertical de páginas
        cardGap: '1.5rem',  // Gap entre tarjetas
    },

    // Duraciones de transición
    transitions: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
    },

    // Radios de bordes
    borderRadius: {
        sm: '0.375rem',
        base: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
    },

    // Sombras
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
};

// Tipos para TypeScript
export type Theme = typeof theme;

export default theme;

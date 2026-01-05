// Utilidades para combinar clases CSS de forma segura
export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}

// Clases CSS reutilizables
export const cssClasses = {
    // Contenedores
    container: {
        main: 'flex flex-col min-h-screen w-full bg-gray-50',
        page: 'flex flex-col min-h-full w-full bg-green-50',
        section: 'flex flex-col w-full h-full p-5',
    },

    // Tarjetas
    card: {
        base: 'bg-white rounded-xl p-6 shadow-sm border border-gray-100',
        hover: 'bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200',
        interactive: 'bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer',
    },

    // Botones
    button: {
        primary: 'bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
        secondary: 'bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
        ghost: 'text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200',
        icon: 'p-2 rounded-full hover:bg-gray-200 transition-colors duration-200',
        iconCircle: 'bg-green-800 text-white rounded-full p-4 transition-transform duration-300 ease-in-out hover:scale-110',
    },

    // Inputs
    input: {
        base: 'border border-gray-300 rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200',
        error: 'border border-red-300 rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-red-50',
    },

    // Layout
    layout: {
        sidebar: 'w-64 bg-white flex flex-col p-6 border-r border-gray-200 shadow-sm',
        header: 'flex justify-between items-center mb-6 pb-4 border-b border-gray-200',
        main: 'flex-1 p-8 overflow-y-auto bg-gray-50',
    },

    // Texto
    text: {
        heading1: 'text-3xl font-bold text-gray-900',
        heading2: 'text-2xl font-bold text-gray-900',
        heading3: 'text-xl font-bold text-gray-900',
        subtitle: 'text-sm text-gray-500',
        label: 'text-sm font-semibold text-gray-700 mb-2',
    },

    // Grid
    grid: {
        cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
        cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    },

    // Flex
    flex: {
        center: 'flex items-center justify-center',
        between: 'flex items-center justify-between',
        start: 'flex items-center justify-start',
        end: 'flex items-center justify-end',
        col: 'flex flex-col',
    },
};

// Helper para estados condicionales
export const conditionalClass = (condition: boolean, trueClass: string, falseClass: string = '') => {
    return condition ? trueClass : falseClass;
};

// Helper para clases activas
export const activeClass = (isActive: boolean, activeClass: string, inactiveClass: string) => {
    return isActive ? activeClass : inactiveClass;
};

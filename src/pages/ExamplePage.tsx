/**
 * Ejemplo de uso de las utilidades de estilos
 * Este archivo muestra cómo usar correctamente el sistema de estilos
 */

import { cssClasses, cn, conditionalClass, activeClass } from '@/utils/styles';
import { ROUTES } from '@/config/constants';
import theme from '@/config/theme';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function ExamplePage() {
    const [isActive, setIsActive] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={cssClasses.container.main}>
            {/* Header con clases predefinidas */}
            <header className={cssClasses.layout.header}>
                <h1 className={cssClasses.text.heading1}>Página de Ejemplo</h1>
                <p className={cssClasses.text.subtitle}>
                    Demostrando el uso del sistema de estilos
                </p>
            </header>

            <main className={cssClasses.layout.main}>
                {/* Grid responsivo */}
                <div className={cssClasses.grid.cols3}>
                    {/* Tarjeta básica */}
                    <div className={cssClasses.card.base}>
                        <h3 className={cssClasses.text.heading3}>Tarjeta Básica</h3>
                        <p className="text-gray-600 mt-2">
                            Esta es una tarjeta usando las clases predefinidas
                        </p>
                    </div>

                    {/* Tarjeta con hover */}
                    <div className={cssClasses.card.hover}>
                        <h3 className={cssClasses.text.heading3}>Tarjeta con Hover</h3>
                        <p className="text-gray-600 mt-2">
                            Pasa el mouse sobre esta tarjeta
                        </p>
                    </div>

                    {/* Tarjeta interactiva */}
                    <div className={cssClasses.card.interactive}>
                        <h3 className={cssClasses.text.heading3}>Tarjeta Interactiva</h3>
                        <p className="text-gray-600 mt-2">
                            Esta tarjeta tiene animación de elevación
                        </p>
                    </div>
                </div>

                {/* Botones */}
                <div className="mt-8 space-y-4">
                    <h2 className={cssClasses.text.heading2}>Botones</h2>

                    <div className="flex gap-4">
                        <button className={cssClasses.button.primary}>
                            Botón Primario
                        </button>

                        <button className={cssClasses.button.secondary}>
                            Botón Secundario
                        </button>

                        <button className={cssClasses.button.ghost}>
                            Botón Ghost
                        </button>

                        {/* Botón con estado activo usando activeClass */}
                        <button
                            onClick={() => setIsActive(!isActive)}
                            className={activeClass(
                                isActive,
                                'bg-green-900 text-white px-4 py-2 rounded-lg',
                                cssClasses.button.primary
                            )}
                        >
                            {isActive ? 'Activo' : 'Inactivo'}
                        </button>
                    </div>
                </div>

                {/* Inputs */}
                <div className="mt-8 space-y-4">
                    <h2 className={cssClasses.text.heading2}>Inputs</h2>

                    <div className="max-w-md space-y-4">
                        <div>
                            <label className={cssClasses.text.label}>
                                Input Normal
                            </label>
                            <input
                                type="text"
                                placeholder="Escribe algo..."
                                className={cssClasses.input.base}
                            />
                        </div>

                        <div>
                            <label className={cssClasses.text.label}>
                                Input con Error
                            </label>
                            <input
                                type="text"
                                placeholder="Este input tiene error"
                                className={conditionalClass(
                                    hasError,
                                    cssClasses.input.error,
                                    cssClasses.input.base
                                )}
                            />
                            <button
                                onClick={() => setHasError(!hasError)}
                                className="text-sm text-blue-600 mt-1"
                            >
                                Toggle error
                            </button>
                        </div>
                    </div>
                </div>

                {/* Combinando clases con cn() */}
                <div className="mt-8">
                    <h2 className={cssClasses.text.heading2}>Clases Condicionales</h2>

                    <div
                        className={cn(
                            cssClasses.card.base,
                            'mt-4',
                            isActive && 'border-green-500 border-2',
                            hasError && 'border-red-500'
                        )}
                    >
                        <p>
                            Esta tarjeta cambia su borde basado en el estado
                        </p>
                    </div>
                </div>

                {/* Usando constantes de rutas */}
                <div className="mt-8">
                    <h2 className={cssClasses.text.heading2}>Links con Rutas</h2>

                    <div className="flex gap-4">
                        <Link to={ROUTES.HOME} className="text-blue-600 hover:underline">
                            Inicio
                        </Link>
                        <Link to={ROUTES.PROFESOR.DASHBOARD} className="text-blue-600 hover:underline">
                            Dashboard Profesor
                        </Link>
                        <Link to={ROUTES.ESTUDIANTE.DASHBOARD} className="text-blue-600 hover:underline">
                            Dashboard Estudiante
                        </Link>
                    </div>
                </div>

                {/* Usando tema */}
                <div className="mt-8">
                    <h2 className={cssClasses.text.heading2}>Tema</h2>

                    <div className="flex gap-4">
                        {Object.entries(theme.colors.primary).map(([key, value]) => (
                            <div key={key} className="text-center">
                                <div
                                    className="w-16 h-16 rounded-lg shadow-md"
                                    style={{ backgroundColor: value }}
                                />
                                <p className="text-xs mt-2">{key}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Layout Flex */}
                <div className="mt-8">
                    <h2 className={cssClasses.text.heading2}>Layouts Flex</h2>

                    <div className={cn(cssClasses.card.base, 'mt-4', cssClasses.flex.between)}>
                        <span>Inicio</span>
                        <span>Fin</span>
                    </div>

                    <div className={cn(cssClasses.card.base, 'mt-4', cssClasses.flex.center)}>
                        <span>Centrado</span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ExamplePage;

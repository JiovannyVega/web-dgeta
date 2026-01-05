# Guía de Estilos - DGETA Web

## 📋 Estructura de Estilos

Este proyecto utiliza **Tailwind CSS v4** con una configuración personalizada para mantener consistencia en toda la aplicación.

## 🎨 Sistema de Colores

### Colores Principales
- **Primary**: `green-800` (#166534)
- **Primary Light**: `green-700` (#15803d)
- **Primary Dark**: `green-900` (#14532d)

### Colores de Fondo
- **Light**: `gray-50` (#f9fafb)
- **Dark**: `gray-900` (#111827)

### Uso en Código
```tsx
// Usar constantes en lugar de valores hardcodeados
import { COLORS } from '@/config/constants';

<button className={`bg-${COLORS.PRIMARY} text-white`}>
  Click me
</button>
```

## 🛠️ Utilidades Personalizadas

### Clases CSS Reutilizables
El proyecto incluye un sistema de utilidades en `src/utils/styles.ts`:

```tsx
import { cssClasses, cn } from '@/utils/styles';

// Usar clases predefinidas
<div className={cssClasses.card.base}>
  Contenido de la tarjeta
</div>

// Combinar clases condicionalmente
<button className={cn(
  cssClasses.button.primary,
  isActive && 'bg-green-900'
)}>
  Botón
</button>
```

### Clases Disponibles

#### Contenedores
- `cssClasses.container.main` - Contenedor principal de la app
- `cssClasses.container.page` - Contenedor de página
- `cssClasses.container.section` - Sección de contenido

#### Tarjetas
- `cssClasses.card.base` - Tarjeta básica
- `cssClasses.card.hover` - Tarjeta con hover
- `cssClasses.card.interactive` - Tarjeta interactiva

#### Botones
- `cssClasses.button.primary` - Botón principal
- `cssClasses.button.secondary` - Botón secundario
- `cssClasses.button.ghost` - Botón ghost
- `cssClasses.button.icon` - Botón de icono

#### Inputs
- `cssClasses.input.base` - Input base
- `cssClasses.input.error` - Input con error

## 📐 Layout

### Estructura Común de Página
```tsx
<div className={cssClasses.container.page}>
  <Header />
  <div className="flex flex-row w-full h-full">
    <Sidebar />
    <main className={cssClasses.layout.main}>
      {/* Contenido */}
    </main>
  </div>
</div>
```

## 🎯 Componentes Layer (@layer)

### Base
Contiene resets globales y estilos base para HTML, body, inputs, etc.

### Components
Componentes reutilizables como `.card`, `.btn-primary`, `.input-base`, etc.

### Utilities
Utilidades personalizadas como `.bg-primary`, `.text-primary`, etc.

## 🔄 Transiciones

Usa las constantes de `ANIMATIONS`:
```tsx
import { ANIMATIONS } from '@/config/constants';

<div style={{ transitionDuration: `${ANIMATIONS.BASE}ms` }}>
  Contenido con transición
</div>
```

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Uso
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Contenido responsive */}
</div>
```

## ✅ Mejores Prácticas

1. **Usar constantes**: Importa colores y rutas desde `config/constants.ts`
2. **Reutilizar clases**: Usa `cssClasses` para componentes comunes
3. **Combinar clases**: Usa la función `cn()` para clases condicionales
4. **Evitar inline styles**: Prefiere Tailwind classes
5. **Mobile-first**: Diseña primero para móvil, luego escala

## 🚫 Anti-patrones a Evitar

```tsx
// ❌ Evitar
<div className="bg-green-800">

// ✅ Mejor
import { COLORS } from '@/config/constants';
<div className={`bg-${COLORS.PRIMARY}`}>

// ❌ Evitar valores hardcodeados
<div style={{ color: '#166534' }}>

// ✅ Mejor
<div className="text-primary">

// ❌ Evitar clases inline complejas
<button className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">

// ✅ Mejor
<button className={cssClasses.button.primary}>
```

## 📦 Archivos Importantes

- `src/index.css` - Configuración global de Tailwind
- `src/config/theme.ts` - Tema centralizado
- `src/utils/styles.ts` - Utilidades de estilos
- `src/config/constants.ts` - Constantes del proyecto

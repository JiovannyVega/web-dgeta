# Sistema de Layouts por Rol

Este proyecto implementa layouts distintos para Estudiantes y Profesores, proporcionando una experiencia de usuario personalizada según el rol.

## Arquitectura

### Componentes de Layout

#### 1. **StudentLayout** (`src/components/layouts/StudentLayout.tsx`)
Layout específico para estudiantes con:
- Menú de navegación enfocado en actividades académicas
- Header compartido
- Sidebar con items del estudiante:
  - Dashboard
  - Calificaciones
  - Asistencias
  - Formularios
  - Mensajes
  - Mi Perfil

#### 2. **ProfesorLayout** (`src/components/layouts/ProfesorLayout.tsx`)
Layout específico para profesores con:
- Menú de navegación enfocado en gestión académica
- Header compartido
- Sidebar con items del profesor:
  - Dashboard
  - Mis Grupos
  - Calificaciones
  - Incidencias
  - Tutorías
  - Mensajes
  - Predicción

### Componente Sidebar Mejorado

El componente `Sidebar` ahora acepta props personalizables:

```typescript
interface SidebarProps {
  userName?: string;
  userRole?: string;
  menuItems?: MenuItem[];
}

interface MenuItem {
  path: string;
  icon: IconType;
  label: string;
}
```

## Uso

### En una página de Estudiante:

```tsx
import React from "react";
import StudentLayout from "../../components/layouts/StudentLayout";

const MiPagina: React.FC = () => {
  return (
    <StudentLayout>
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Tu contenido aquí */}
        </div>
      </div>
    </StudentLayout>
  );
};

export default MiPagina;
```

### En una página de Profesor:

```tsx
import React from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";

const MiPagina: React.FC = () => {
  return (
    <ProfesorLayout>
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Tu contenido aquí */}
        </div>
      </div>
    </ProfesorLayout>
  );
};

export default MiPagina;
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── layouts/
│   │   ├── StudentLayout.tsx      # Layout para estudiantes
│   │   └── ProfesorLayout.tsx     # Layout para profesores
│   ├── Header.tsx                 # Header compartido
│   └── Sidebar.tsx                # Sidebar configurable
├── pages/
│   ├── estudiante/                # Páginas de estudiante
│   │   ├── Dashboard.tsx          # ✅ Usa StudentLayout
│   │   ├── Asistencias.tsx
│   │   └── ...
│   └── profesor/                  # Páginas de profesor
│       ├── Dashboard.tsx          # ✅ Usa ProfesorLayout
│       ├── MisGrupos.tsx
│       └── ...
```

## Ventajas

1. **Separación de Responsabilidades**: Cada layout maneja su propia configuración de menú
2. **Reutilización de Código**: Header y Sidebar son compartidos pero configurables
3. **Mantenibilidad**: Cambios en el menú de un rol no afectan al otro
4. **Escalabilidad**: Fácil agregar nuevos roles (Administrador, Director, etc.)
5. **Consistencia**: Todos los componentes del mismo rol tienen el mismo layout

## Próximos Pasos

### Para implementar autenticación y roles dinámicos:

1. **Crear un Context de Autenticación**:
```tsx
// src/contexts/AuthContext.tsx
interface User {
  name: string;
  role: 'student' | 'profesor' | 'admin';
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials) => Promise<void>;
  logout: () => void;
}
```

2. **Componente de Layout Dinámico**:
```tsx
// src/components/layouts/DynamicLayout.tsx
const DynamicLayout = ({ children }) => {
  const { user } = useAuth();
  
  if (user?.role === 'profesor') {
    return <ProfesorLayout>{children}</ProfesorLayout>;
  }
  
  return <StudentLayout>{children}</StudentLayout>;
};
```

3. **Protección de Rutas**:
```tsx
// src/components/ProtectedRoute.tsx
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  
  return children;
};
```

## Personalización

Para cambiar el menú de un rol, edita el array `menuItems` en el layout correspondiente:

```tsx
const studentMenuItems: MenuItem[] = [
  { path: "/estudiante/dashboard", icon: FaChartLine, label: "Dashboard" },
  { path: "/estudiante/nuevo-item", icon: FaNuevoIcono, label: "Nuevo Item" },
  // ... más items
];
```

## Ejemplos Actualizados

- ✅ `/src/pages/estudiante/Dashboard.tsx` - Usa StudentLayout
- ✅ `/src/pages/profesor/Dashboard.tsx` - Usa ProfesorLayout

Para actualizar las demás páginas, sigue el mismo patrón mostrado arriba.

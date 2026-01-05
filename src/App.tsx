import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Páginas de Profesor
import Dashboard from "./pages/profesor/Dashboard";
import MisGrupos from "./pages/profesor/MisGrupos";
import Calificaciones from "./pages/profesor/Calificaciones";
import Incidencias from "./pages/profesor/Incidencias";
import Tutorias from "./pages/profesor/Tutorias";
import Mensajes from "./pages/profesor/Mensajes";
import GrupoDetalles from "./pages/profesor/DetallesDeGrupo";
import DetallesDeAlumno from "./pages/profesor/PerfilDelEstudiante";
import PrediccionProfesor from "./pages/profesor/PrediccionEstudiante";

// Páginas de Estudiante
import EstudianteDashboard from "./pages/estudiante/Dashboard";
import EstudianteAsistencias from "./pages/estudiante/Asistencias";
import EstudianteCalificaciones from "./pages/estudiante/Calificaciones";
import EstudianteFormularios from "./pages/estudiante/Formularios";
import EstudianteLlenadoFormulario from "./pages/estudiante/LlenadoDeFormulario";
import EstudianteMensajes from "./pages/estudiante/Mensajes";
import EstudiantePerfil from "./pages/estudiante/PerfilEstudiante";

// Páginas de Daniel
import PrediccionDaniel from "./pages/daniel/PrediccionEstudiante";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          {/* Rutas de autenticación */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas de Profesor */}
          <Route path="/profesor">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="misgrupos" element={<MisGrupos />} />
            <Route path="misgrupos/detalles" element={<GrupoDetalles />} />
            <Route path="calificaciones" element={<Calificaciones />} />
            <Route path="incidencias" element={<Incidencias />} />
            <Route path="tutorias" element={<Tutorias />} />
            <Route path="mensajes" element={<Mensajes />} />
            <Route path="detalles-alumno" element={<DetallesDeAlumno />} />
            <Route path="prediccion" element={<PrediccionProfesor />} />
          </Route>

          {/* Rutas de Estudiante */}
          <Route path="/estudiante">
            <Route path="dashboard" element={<EstudianteDashboard />} />
            <Route path="asistencias" element={<EstudianteAsistencias />} />
            <Route path="calificaciones" element={<EstudianteCalificaciones />} />
            <Route path="formularios" element={<EstudianteFormularios />} />
            <Route path="formulario/:id" element={<EstudianteLlenadoFormulario />} />
            <Route path="mensajes" element={<EstudianteMensajes />} />
            <Route path="perfil" element={<EstudiantePerfil />} />
          </Route>

          {/* Rutas de Daniel */}
          <Route path="/daniel">
            <Route path="prediccion" element={<PrediccionDaniel />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App

import React from "react";
import { useSearchParams } from "react-router-dom";
import { groupStudents } from "../../data/portal";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaArrowLeft, FaUser, FaChartLine } from "react-icons/fa";

const PerfilDelEstudiante: React.FC = () => {
  const [params]=useSearchParams();
  const selected=groupStudents.find(e=>e.id===Number(params.get('alumno')))??groupStudents[0];
  const estudiante = {
    nombre: selected.id === 1 ? "Juan Pérez García" : selected.nombre,
    matricula: selected.matricula,
    grupo: "Matemáticas 3-A",
    promedio: selected.promedio,
    asistencia: selected.asistencia,
    email: selected.id === 1 ? "juan.perez@estudiante.edu.mx" : "Sin registrar",
    telefono: selected.id === 1 ? "(33) 1234-5678" : "Sin registrar",
  };

  const calificaciones = selected.id === 1 ? [
    { materia: "Matemáticas", parcial1: 9.5, parcial2: 8.8, parcial3: 9.2, promedio: 9.2 },
    { materia: "Física", parcial1: 8.5, parcial2: 9.0, parcial3: 9.5, promedio: 9.0 },
    { materia: "Química", parcial1: 9.0, parcial2: 9.2, parcial3: 9.0, promedio: 9.1 },
  ] : [];

  return (
    <ProfesorLayout>
      <div className="ui-page">
        {/* Page Header */}
        <div className="mb-8">
          <a
            href="/profesor/misgrupos/detalles"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-3 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span className="text-sm font-medium">Volver al Grupo</span>
          </a>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Perfil del Estudiante</h1>
          <p className="text-gray-600">{estudiante.grupo}</p>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-xl  border border-gray-200 p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
              <FaUser className="text-green-800 text-4xl" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{estudiante.nombre}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Matrícula</p>
                  <p className="font-medium text-gray-900">{estudiante.matricula}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Correo</p>
                  <p className="font-medium text-gray-900">{estudiante.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-medium text-gray-900">{estudiante.telefono}</p>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaChartLine className="text-green-800 text-xl" />
              </div>
              <span className="text-2xl font-semibold text-green-800">{estudiante.promedio.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600">Promedio General</p>
          </div>

          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FaChartLine className="text-gray-700 text-xl" />
              </div>
              <span className="text-2xl font-semibold text-gray-900">{estudiante.asistencia}%</span>
            </div>
            <p className="text-sm text-gray-600">Asistencia</p>
          </div>
        </div>

        {/* Grades Table */}
        <div className="bg-white rounded-xl  border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Historial de Calificaciones</h2>
          </div>
          <div className="table-scroll" role="region" aria-label="Tabla de registros" tabIndex={0}>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Materia
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Parcial 1
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Parcial 2
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Parcial 3
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Promedio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {!calificaciones.length&&<tr><td colSpan={5} className="p-6 text-sm text-gray-600">No hay calificaciones disponibles para este alumno.</td></tr>}{calificaciones.map((calif, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {calif.materia}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">
                      {calif.parcial1.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">
                      {calif.parcial2.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">
                      {calif.parcial3.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="font-bold text-green-800">{calif.promedio.toFixed(1)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProfesorLayout>
  );
};

export default PerfilDelEstudiante;

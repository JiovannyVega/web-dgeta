import React from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaArrowLeft, FaUsers, FaChartBar } from "react-icons/fa";

const DetallesDeGrupo: React.FC = () => {
  const estudiantes = [
    { id: 1, nombre: "Juan Pérez", matricula: "2023001", promedio: 9.2, asistencia: 95 },
    { id: 2, nombre: "María Rodríguez", matricula: "2023002", promedio: 9.8, asistencia: 100 },
    { id: 3, nombre: "Carlos Gómez", matricula: "2023003", promedio: 8.3, asistencia: 88 },
    { id: 4, nombre: "Ana Torres", matricula: "2023004", promedio: 9.2, asistencia: 92 },
    { id: 5, nombre: "Luis Martínez", matricula: "2023005", promedio: 7.8, asistencia: 85 },
  ];

  const promedioGrupo = (estudiantes.reduce((acc, est) => acc + est.promedio, 0) / estudiantes.length).toFixed(1);
  const asistenciaGrupo = (estudiantes.reduce((acc, est) => acc + est.asistencia, 0) / estudiantes.length).toFixed(0);

  return (
    <ProfesorLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <a
            href="/profesor/misgrupos"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-3 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span className="text-sm font-medium">Volver a Mis Grupos</span>
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Matemáticas 3-A</h1>
          <p className="text-gray-600">3º Grado - Secundaria</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{estudiantes.length}</span>
            </div>
            <p className="text-sm text-gray-600">Total Estudiantes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaChartBar className="text-green-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-green-600">{promedioGrupo}</span>
            </div>
            <p className="text-sm text-gray-600">Promedio del Grupo</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FaChartBar className="text-yellow-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{asistenciaGrupo}%</span>
            </div>
            <p className="text-sm text-gray-600">Asistencia Promedio</p>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Lista de Estudiantes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matrícula
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Promedio
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asistencia
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {estudiantes.map((estudiante) => (
                  <tr key={estudiante.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{estudiante.nombre}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {estudiante.matricula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="font-bold text-green-600">{estudiante.promedio.toFixed(1)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="font-semibold text-gray-900">{estudiante.asistencia}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <a
                        href="/profesor/detalles-alumno"
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        Ver perfil
                      </a>
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

export default DetallesDeGrupo;

import React from "react";
import { useSearchParams } from "react-router-dom";
import { tutorGroups, groupStudents } from "../../data/portal";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaArrowLeft, FaUsers, FaChartBar } from "react-icons/fa";

const DetallesDeGrupo: React.FC = () => {
  const [params] = useSearchParams();
  const group=tutorGroups.find(g=>g.nombre===params.get('grupo'))??tutorGroups[0];
  const estudiantes=group===tutorGroups[0]?groupStudents:[];

  const promedioGrupo = estudiantes.length?(estudiantes.reduce((acc, est) => acc + est.promedio, 0) / estudiantes.length).toFixed(1):'—';
  const asistenciaGrupo = estudiantes.length?(estudiantes.reduce((acc, est) => acc + est.asistencia, 0) / estudiantes.length).toFixed(0):'—';

  return (
    <ProfesorLayout>
      <div className="ui-page">
        {/* Page Header */}
        <div className="mb-8">
          <a
            href="/profesor/misgrupos"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-3 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span className="text-sm font-medium">Volver a Mis Grupos</span>
          </a>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{group.nombre}</h1>
          <p className="text-gray-600">{group.nivel}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FaUsers className="text-gray-700 text-xl" />
              </div>
              <span className="text-2xl font-semibold text-gray-900">{estudiantes.length}</span>
            </div>
            <p className="text-sm text-gray-600">Alumnos en lista</p>
          </div>

          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaChartBar className="text-green-800 text-xl" />
              </div>
              <span className="text-2xl font-semibold text-green-800">{promedioGrupo}</span>
            </div>
            <p className="text-sm text-gray-600">Promedio del Grupo</p>
          </div>

          <div className="bg-white rounded-xl  border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FaChartBar className="text-amber-800 text-xl" />
              </div>
              <span className="text-2xl font-semibold text-gray-900">{asistenciaGrupo}%</span>
            </div>
            <p className="text-sm text-gray-600">Asistencia Promedio</p>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl  border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Estudiantes</h2>
          </div>
          <div className="table-scroll" role="region" aria-label="Tabla de registros" tabIndex={0}>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Matrícula
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Promedio
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Asistencia
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {!estudiantes.length&&<tr><td colSpan={5} className="p-6 text-sm text-gray-600">No hay una lista de alumnos disponible para este grupo.</td></tr>}{estudiantes.map((estudiante) => (
                  <tr key={estudiante.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{estudiante.nombre}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {estudiante.matricula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="font-bold text-green-800">{estudiante.promedio.toFixed(1)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="font-semibold text-gray-900">{estudiante.asistencia}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <a
                        href={`/profesor/detalles-alumno?alumno=${estudiante.id}`}
                        className="text-green-800 hover:text-green-900 font-medium text-sm"
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

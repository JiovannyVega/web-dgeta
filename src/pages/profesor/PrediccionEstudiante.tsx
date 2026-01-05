import React from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaChartLine, FaExclamationTriangle } from "react-icons/fa";

const PrediccionEstudiante: React.FC = () => {
  const estudiantes = [
    {
      id: 1,
      nombre: "Juan Pérez",
      matricula: "2023001",
      promedio: 9.2,
      asistencia: 95,
      prediccion: "Excelente",
      riesgo: "Bajo",
      color: "green",
    },
    {
      id: 2,
      nombre: "María Rodríguez",
      matricula: "2023002",
      promedio: 9.8,
      asistencia: 100,
      prediccion: "Excelente",
      riesgo: "Bajo",
      color: "green",
    },
    {
      id: 3,
      nombre: "Carlos Gómez",
      matricula: "2023003",
      promedio: 8.3,
      asistencia: 88,
      prediccion: "Bueno",
      riesgo: "Medio",
      color: "yellow",
    },
    {
      id: 4,
      nombre: "Luis Martínez",
      matricula: "2023005",
      promedio: 7.8,
      asistencia: 85,
      prediccion: "Regular",
      riesgo: "Alto",
      color: "red",
    },
  ];

  const getRiesgoColor = (riesgo: string) => {
    switch (riesgo) {
      case "Bajo":
        return "bg-green-100 text-green-700";
      case "Medio":
        return "bg-yellow-100 text-yellow-700";
      case "Alto":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <ProfesorLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Predicción de Estudiantes
          </h1>
          <p className="text-gray-600">
            Análisis predictivo del rendimiento académico
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaChartLine className="text-green-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-green-600">
                {estudiantes.filter((e) => e.riesgo === "Bajo").length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Riesgo Bajo</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FaExclamationTriangle className="text-yellow-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-yellow-600">
                {estudiantes.filter((e) => e.riesgo === "Medio").length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Riesgo Medio</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-red-600">
                {estudiantes.filter((e) => e.riesgo === "Alto").length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Riesgo Alto</p>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">
              Análisis por Estudiante
            </h2>
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
                    Predicción
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nivel de Riesgo
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {estudiantes.map((estudiante) => (
                  <tr key={estudiante.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">
                        {estudiante.nombre}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {estudiante.matricula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="font-bold text-gray-900">
                        {estudiante.promedio.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">
                      {estudiante.asistencia}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="font-medium text-gray-900">
                        {estudiante.prediccion}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRiesgoColor(
                          estudiante.riesgo
                        )}`}
                      >
                        {estudiante.riesgo}
                      </span>
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

export default PrediccionEstudiante;

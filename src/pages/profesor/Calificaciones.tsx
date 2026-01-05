import React, { useState } from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaSearch, FaFileExport } from "react-icons/fa";

const Calificaciones: React.FC = () => {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("matematicas-3a");
  const [searchTerm, setSearchTerm] = useState("");

  const estudiantes = [
    { id: 1, nombre: "Juan Pérez", matricula: "2023001", parcial1: 9.5, parcial2: 8.8, parcial3: 9.2, promedio: 9.2 },
    { id: 2, nombre: "María Rodríguez", matricula: "2023002", parcial1: 10.0, parcial2: 9.5, parcial3: 10.0, promedio: 9.8 },
    { id: 3, nombre: "Carlos Gómez", matricula: "2023003", parcial1: 8.5, parcial2: 8.0, parcial3: 8.3, promedio: 8.3 },
    { id: 4, nombre: "Ana Torres", matricula: "2023004", parcial1: 9.0, parcial2: 9.2, parcial3: 9.5, promedio: 9.2 },
    { id: 5, nombre: "Luis Martínez", matricula: "2023005", parcial1: 7.5, parcial2: 8.0, parcial3: 7.8, promedio: 7.8 },
  ];

  const estudiantesFiltrados = estudiantes.filter((estudiante) =>
    estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estudiante.matricula.includes(searchTerm)
  );

  const getCalificacionColor = (calif: number) => {
    if (calif >= 9) return "text-green-600";
    if (calif >= 8) return "text-blue-600";
    if (calif >= 7) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <ProfesorLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Calificaciones</h1>
            <p className="text-gray-600">Gestiona las calificaciones de tus grupos</p>
          </div>
          <button className="flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-xl hover:bg-green-900 transition-colors">
            <FaFileExport />
            Exportar
          </button>
        </div>

        {/* Group Selector */}
        <div className="mb-6">
          <select
            value={grupoSeleccionado}
            onChange={(e) => setGrupoSeleccionado(e.target.value)}
            className="w-full md:w-auto px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="matematicas-3a">Matemáticas 3-A</option>
            <option value="algebra-3b">Álgebra Lineal 3-B</option>
            <option value="calculo-5c">Cálculo 5-C</option>
            <option value="trigonometria-5a">Trigonometría 5-A</option>
          </select>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar estudiante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Grades Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
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
                    Parcial 1
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parcial 2
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parcial 3
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Promedio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {estudiantesFiltrados.map((estudiante) => (
                  <tr key={estudiante.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{estudiante.nombre}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                      {estudiante.matricula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`font-semibold ${getCalificacionColor(estudiante.parcial1)}`}>
                        {estudiante.parcial1.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`font-semibold ${getCalificacionColor(estudiante.parcial2)}`}>
                        {estudiante.parcial2.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`font-semibold ${getCalificacionColor(estudiante.parcial3)}`}>
                        {estudiante.parcial3.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`font-bold text-lg ${getCalificacionColor(estudiante.promedio)}`}>
                        {estudiante.promedio.toFixed(1)}
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

export default Calificaciones;

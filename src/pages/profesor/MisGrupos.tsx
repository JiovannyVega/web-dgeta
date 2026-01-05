import React, { useState } from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaPlus, FaUsers, FaSearch } from "react-icons/fa";

const MisGrupos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const grupos = [
    {
      nombre: "Matemáticas 3-A",
      nivel: "3º Grado - Secundaria",
      estudiantes: 32,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      nombre: "Álgebra Lineal 3-B",
      nivel: "3º Grado - Secundaria",
      estudiantes: 28,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      nombre: "Cálculo 5-C",
      nivel: "5º Grado - Preparatoria",
      estudiantes: 35,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      nombre: "Trigonometría 5-A",
      nivel: "5º Grado - Preparatoria",
      estudiantes: 30,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  const gruposFiltrados = grupos.filter((grupo) =>
    grupo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProfesorLayout>
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Grupos</h1>
              <p className="text-gray-600">Administra tus grupos y estudiantes</p>
            </div>
            <button className="flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-xl hover:bg-green-900 transition-colors">
              <FaPlus />
              Crear Grupo
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar grupos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gruposFiltrados.map((grupo, index) => (
              <a
                key={index}
                href="/profesor/misgrupos/detalles"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className={`w-16 h-16 ${grupo.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                  <FaUsers className={`${grupo.iconColor} text-2xl`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {grupo.nombre}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{grupo.nivel}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Estudiantes</span>
                  <span className="text-lg font-bold text-gray-900">
                    {grupo.estudiantes}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {gruposFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron grupos</p>
            </div>
          )}
        </div>
      </div>
    </ProfesorLayout>
  );
};

export default MisGrupos;

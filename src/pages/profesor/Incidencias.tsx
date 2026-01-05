import React, { useState } from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaPlus, FaExclamationTriangle } from "react-icons/fa";

const Incidencias: React.FC = () => {
  const [filtro, setFiltro] = useState("todas");

  const incidencias = [
    {
      id: 1,
      tipo: "Falta",
      estudiante: "Juan Pérez",
      grupo: "Matemáticas 3-A",
      fecha: "2025-01-04",
      descripcion: "Falta injustificada",
      estado: "pendiente",
    },
    {
      id: 2,
      tipo: "Retardo",
      estudiante: "Carlos Gómez",
      grupo: "Álgebra Lineal 3-B",
      fecha: "2025-01-04",
      descripcion: "Llegó 15 minutos tarde",
      estado: "resuelta",
    },
    {
      id: 3,
      tipo: "Conducta",
      estudiante: "Luis Martínez",
      grupo: "Cálculo 5-C",
      fecha: "2025-01-03",
      descripcion: "Comportamiento inapropiado en clase",
      estado: "pendiente",
    },
  ];

  const incidenciasFiltradas = incidencias.filter((inc) =>
    filtro === "todas" ? true : inc.estado === filtro
  );

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Falta":
        return "bg-red-100 text-red-700";
      case "Retardo":
        return "bg-yellow-100 text-yellow-700";
      case "Conducta":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getEstadoBadge = (estado: string) => {
    return estado === "pendiente"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";
  };

  return (
    <ProfesorLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Incidencias</h1>
            <p className="text-gray-600">Gestiona y reporta incidencias de estudiantes</p>
          </div>
          <button className="flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-xl hover:bg-green-900 transition-colors">
            <FaPlus />
            Nueva Incidencia
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFiltro("todas")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${filtro === "todas"
              ? "bg-green-800 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro("pendiente")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${filtro === "pendiente"
              ? "bg-green-800 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFiltro("resuelta")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${filtro === "resuelta"
              ? "bg-green-800 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            Resueltas
          </button>
        </div>

        {/* Incidencias List */}
        <div className="space-y-4">
          {incidenciasFiltradas.map((incidencia) => (
            <div
              key={incidencia.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <FaExclamationTriangle className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{incidencia.estudiante}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTipoColor(incidencia.tipo)}`}>
                        {incidencia.tipo}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getEstadoBadge(incidencia.estado)}`}>
                        {incidencia.estado === "pendiente" ? "Pendiente" : "Resuelta"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{incidencia.grupo}</p>
                    <p className="text-sm text-gray-700">{incidencia.descripcion}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{incidencia.fecha}</span>
              </div>
            </div>
          ))}
        </div>

        {incidenciasFiltradas.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No hay incidencias {filtro !== "todas" ? filtro + "s" : ""}</p>
          </div>
        )}
      </div>
    </ProfesorLayout>
  );
};

export default Incidencias;

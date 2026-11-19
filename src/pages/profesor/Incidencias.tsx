import React, { useState } from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaExclamationTriangle } from "react-icons/fa";

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
        return "bg-red-100 text-red-800";
      case "Retardo":
        return "bg-yellow-100 text-amber-900";
      case "Conducta":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getEstadoBadge = (estado: string) => {
    return estado === "pendiente"
      ? "bg-yellow-100 text-amber-900"
      : "bg-green-100 text-green-900";
  };

  return (
    <ProfesorLayout>
      <div className="ui-page">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Incidencias</h1>
            <p className="text-gray-600">Gestiona y reporta incidencias de estudiantes</p>
          </div>

        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            aria-pressed={filtro === "todas"} onClick={() => setFiltro("todas")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${filtro === "todas"
              ? "bg-green-800 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            Todas
          </button>
          <button
            aria-pressed={filtro === "pendiente"} onClick={() => setFiltro("pendiente")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${filtro === "pendiente"
              ? "bg-green-800 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            Pendientes
          </button>
          <button
            aria-pressed={filtro === "resuelta"} onClick={() => setFiltro("resuelta")}
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
              className="bg-white rounded-xl  border border-gray-200 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <FaExclamationTriangle className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
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
                <span className="text-sm text-gray-600">{incidencia.fecha}</span>
              </div>
            </div>
          ))}
        </div>

        {incidenciasFiltradas.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-600">No hay incidencias {filtro !== "todas" ? filtro + "s" : ""}</p>
          </div>
        )}
      </div>
    </ProfesorLayout>
  );
};

export default Incidencias;

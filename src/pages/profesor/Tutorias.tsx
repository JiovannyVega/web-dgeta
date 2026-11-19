import React, { useState } from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaCalendarAlt } from "react-icons/fa";

const Tutorias: React.FC = () => {
  const [vistaActiva, setVistaActiva] = useState("programadas");

  const tutoriasProgramadas = [
    {
      id: 1,
      estudiante: "Juan Pérez",
      tema: "Álgebra - Ecuaciones cuadráticas",
      fecha: "2025-01-05",
      hora: "10:00 AM",
      estado: "confirmada",
    },
    {
      id: 2,
      estudiante: "María Rodríguez",
      tema: "Cálculo - Derivadas",
      fecha: "2025-01-05",
      hora: "2:00 PM",
      estado: "confirmada",
    },
    {
      id: 3,
      estudiante: "Carlos Gómez",
      tema: "Trigonometría - Identidades",
      fecha: "2025-01-06",
      hora: "11:00 AM",
      estado: "pendiente",
    },
  ];

  const tutoriasCompletadas = [
    {
      id: 1,
      estudiante: "Ana Torres",
      tema: "Matemáticas - Fracciones",
      fecha: "2025-01-03",
      hora: "3:00 PM",
      duracion: "1 hora",
    },
    {
      id: 2,
      estudiante: "Luis Martínez",
      tema: "Geometría - Teorema de Pitágoras",
      fecha: "2025-01-02",
      hora: "4:00 PM",
      duracion: "45 min",
    },
  ];

  return (
    <ProfesorLayout>
      <div className="ui-page">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tutorías</h1>
            <p className="text-gray-600">Gestiona tus sesiones de tutoría</p>
          </div>

        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            aria-pressed={vistaActiva === "programadas"} onClick={() => setVistaActiva("programadas")}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${vistaActiva === "programadas"
              ? "bg-green-800 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            Programadas ({tutoriasProgramadas.length})
          </button>
          <button
            aria-pressed={vistaActiva === "completadas"} onClick={() => setVistaActiva("completadas")}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${vistaActiva === "completadas"
              ? "bg-green-800 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            Completadas ({tutoriasCompletadas.length})
          </button>
        </div>

        {/* Tutorías Programadas */}
        {vistaActiva === "programadas" && (
          <div className="space-y-4">
            {tutoriasProgramadas.map((tutoria) => (
              <div
                key={tutoria.id}
                className="bg-white rounded-xl  border border-gray-200 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <FaCalendarAlt className="text-gray-700 text-xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{tutoria.estudiante}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${tutoria.estado === "confirmada"
                            ? "bg-green-100 text-green-900"
                            : "bg-yellow-100 text-amber-900"
                            }`}
                        >
                          {tutoria.estado === "confirmada" ? "Confirmada" : "Pendiente"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{tutoria.tema}</p>
                      <p className="text-sm text-gray-600">
                        {tutoria.fecha} - {tutoria.hora}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tutorías Completadas */}
        {vistaActiva === "completadas" && (
          <div className="space-y-4">
            {tutoriasCompletadas.map((tutoria) => (
              <div
                key={tutoria.id}
                className="bg-white rounded-xl  border border-gray-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-green-800 text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{tutoria.estudiante}</h3>
                    <p className="text-sm text-gray-700 mb-2">{tutoria.tema}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span>{tutoria.fecha} - {tutoria.hora}</span>
                      <span className="text-green-800 font-medium">Duración: {tutoria.duracion}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProfesorLayout>
  );
};

export default Tutorias;

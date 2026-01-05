import React, { useState } from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";

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
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tutorías</h1>
            <p className="text-gray-600">Gestiona tus sesiones de tutoría</p>
          </div>
          <button className="flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-xl hover:bg-green-900 transition-colors">
            <FaPlus />
            Agendar Tutoría
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setVistaActiva("programadas")}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${vistaActiva === "programadas"
              ? "bg-green-800 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            Programadas ({tutoriasProgramadas.length})
          </button>
          <button
            onClick={() => setVistaActiva("completadas")}
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
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FaCalendarAlt className="text-blue-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{tutoria.estudiante}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${tutoria.estado === "confirmada"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
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
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-colors text-sm">
                      Iniciar
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                      Cancelar
                    </button>
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
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-green-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{tutoria.estudiante}</h3>
                    <p className="text-sm text-gray-700 mb-2">{tutoria.tema}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{tutoria.fecha} - {tutoria.hora}</span>
                      <span className="text-green-600 font-medium">Duración: {tutoria.duracion}</span>
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

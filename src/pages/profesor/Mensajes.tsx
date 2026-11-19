import React, { useState } from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaSearch } from "react-icons/fa";

interface Mensaje {
  id: number;
  remitente: string;
  asunto: string;
  preview: string;
  fecha: string;
  leido: boolean;
}

const Mensajes: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [tabActiva, setTabActiva] = useState<"recibidos" | "enviados">("recibidos");

  const mensajesRecibidos: Mensaje[] = [
    {
      id: 1,
      remitente: "Dirección Académica",
      asunto: "Reunión de profesores",
      preview: "Se convoca a todos los profesores a la reunión mensual del próximo viernes...",
      fecha: "Hoy 9:30 AM",
      leido: false,
    },
    {
      id: 2,
      remitente: "Juan Pérez (Estudiante)",
      asunto: "Consulta sobre calificación",
      preview: "Profesor, me gustaría solicitar una revisión de mi calificación del segundo parcial...",
      fecha: "Ayer",
      leido: false,
    },
    {
      id: 3,
      remitente: "Coordinación",
      asunto: "Material didáctico disponible",
      preview: "Estimados profesores, les informamos que ya está disponible el nuevo material...",
      fecha: "3 Ene 2025",
      leido: true,
    },
  ];

  const mensajesEnviados: Mensaje[] = [
    {
      id: 1,
      remitente: "Matemáticas 3-A",
      asunto: "Tarea para el lunes",
      preview: "Estimados estudiantes, les recuerdo completar los ejercicios del capítulo 5...",
      fecha: "Ayer",
      leido: true,
    },
  ];

  const mensajesMostrados = tabActiva === "recibidos" ? mensajesRecibidos : mensajesEnviados;
  const mensajesFiltrados = mensajesMostrados.filter((m) =>
    m.remitente.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.asunto.toLowerCase().includes(busqueda.toLowerCase())
  );

  const mensajesNoLeidos = mensajesRecibidos.filter((m) => !m.leido).length;

  return (
    <ProfesorLayout>
      <div className="ui-page">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Mensajes</h1>
          <p className="text-gray-600">Comunícate con estudiantes y colegas</p>
        </div>

        {/* Search and Tabs */}
        <div className="bg-white rounded-xl  border border-gray-200 mb-6">
          {/* Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                aria-label="Buscar mensajes" placeholder="Buscar mensajes..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800 "
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              aria-pressed={tabActiva === "recibidos"} onClick={() => setTabActiva("recibidos")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${tabActiva === "recibidos" ? "text-green-900" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Recibidos
              {mensajesNoLeidos > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {mensajesNoLeidos}
                </span>
              )}
              {tabActiva === "recibidos" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
            </button>
            <button
              aria-pressed={tabActiva === "enviados"} onClick={() => setTabActiva("enviados")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${tabActiva === "enviados" ? "text-green-900" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Enviados
              {tabActiva === "enviados" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
            </button>
          </div>

          {/* Messages List */}
          <div className="divide-y divide-gray-200">
            {!mensajesFiltrados.length && <p role="status" className="p-6 text-sm text-gray-600">No se encontraron mensajes. Prueba otra búsqueda.</p>}{mensajesFiltrados.map((mensaje) => (
              <div
                key={mensaje.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${!mensaje.leido ? "bg-gray-50" : ""
                  }`}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{mensaje.remitente}</h3>
                      {!mensaje.leido && <span className="text-xs font-medium text-green-800">Sin leer</span>}
                    </div>
                    <h4 className={`text-sm mb-1 ${!mensaje.leido ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                      {mensaje.asunto}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{mensaje.preview}</p>
                  </div>
                  <span className="text-xs text-gray-600 ml-4 whitespace-nowrap">{mensaje.fecha}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfesorLayout>
  );
};

export default Mensajes;

import React, { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { FaSearch, FaCircle } from "react-icons/fa";

interface Mensaje {
  id: number;
  remitente: string;
  rol: string;
  asunto: string;
  preview: string;
  fecha: string;
  leido: boolean;
  enLinea?: boolean;
}

const Mensajes: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [tabActiva, setTabActiva] = useState<"recibidos" | "enviados">("recibidos");

  const mensajesRecibidos: Mensaje[] = [
    {
      id: 1,
      remitente: "Ana Torres",
      rol: "Profesora",
      asunto: "Revisión de Proyecto Final",
      preview: "Hola Roberto, he revisado la primera entrega de tu proyecto final. Hay algunos puntos que...",
      fecha: "10:45 AM",
      leido: false,
      enLinea: true,
    },
    {
      id: 2,
      remitente: "Secretaría Académica",
      rol: "",
      asunto: "Recordatorio: Pago de Colegiatura",
      preview: "Estimado estudiante, le recordamos que la fecha límite para el pago de la colegiatura es...",
      fecha: "Ayer",
      leido: false,
      enLinea: true,
    },
    {
      id: 3,
      remitente: "Luis Mendoza",
      rol: "Profesor",
      asunto: "Material Adicional para Álgebra",
      preview: "Les comparto un enlace con ejercicios adicionales para practicar para el próximo examen.",
      fecha: "24 de Octubre",
      leido: true,
    },
    {
      id: 4,
      remitente: "Coordinación de Carrera",
      rol: "",
      asunto: "Invitación a Conferencia Magistral",
      preview: "Se les extiende una cordial invitación a la conferencia sobre Inteligencia Artificial que se...",
      fecha: "23 de Octubre",
      leido: true,
    },
    {
      id: 5,
      remitente: "Ana Torres",
      rol: "Profesora",
      asunto: "Calificaciones del Primer Parcial",
      preview: "Ya se encuentran disponibles en la plataforma las calificaciones correspondientes al primer...",
      fecha: "20 de Octubre",
      leido: true,
    },
  ];

  const mensajesEnviados: Mensaje[] = [
    {
      id: 1,
      remitente: "Ana Torres",
      rol: "Profesora",
      asunto: "RE: Consulta sobre proyecto",
      preview: "Estimada profesora, le escribo para solicitar una asesoría sobre el proyecto final...",
      fecha: "Ayer",
      leido: true,
    },
    {
      id: 2,
      remitente: "Coordinación de Carrera",
      rol: "",
      asunto: "Confirmación de asistencia",
      preview: "Por medio del presente confirmo mi asistencia a la conferencia magistral del día...",
      fecha: "22 de Octubre",
      leido: true,
    },
  ];

  const mensajesMostrados = tabActiva === "recibidos" ? mensajesRecibidos : mensajesEnviados;

  const mensajesFiltrados = mensajesMostrados.filter(
    (mensaje) =>
      mensaje.remitente.toLowerCase().includes(busqueda.toLowerCase()) ||
      mensaje.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
      mensaje.preview.toLowerCase().includes(busqueda.toLowerCase())
  );

  const mensajesNoLeidos = mensajesRecibidos.filter((m) => !m.leido).length;

  return (
    <StudentLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mensajes</h1>
          <p className="text-gray-600">Revisa tus mensajes y comunicados importantes.</p>
        </div>

        {/* Search and Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar mensajes..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setTabActiva("recibidos")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${tabActiva === "recibidos"
                ? "text-green-700"
                : "text-gray-600 hover:text-gray-900"
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
              onClick={() => setTabActiva("enviados")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${tabActiva === "enviados"
                ? "text-green-700"
                : "text-gray-600 hover:text-gray-900"
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
            {mensajesFiltrados.length > 0 ? (
              mensajesFiltrados.map((mensaje) => (
                <div
                  key={mensaje.id}
                  className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${!mensaje.leido ? "bg-blue-50" : ""
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900">
                            {mensaje.remitente}
                          </h3>
                          {mensaje.rol && (
                            <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                              {mensaje.rol}
                            </span>
                          )}
                          {mensaje.enLinea && (
                            <FaCircle className="ml-2 text-green-500 text-xs" />
                          )}
                        </div>
                        {!mensaje.leido && (
                          <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <h4 className={`text-sm mb-1 ${!mensaje.leido ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                        {mensaje.asunto}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {mensaje.preview}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-xs text-gray-500 whitespace-nowrap">
                        {mensaje.fecha}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-gray-500">No se encontraron mensajes</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Total Recibidos</p>
            <p className="text-3xl font-bold text-gray-900">
              {mensajesRecibidos.length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">No Leídos</p>
            <p className="text-3xl font-bold text-blue-600">
              {mensajesNoLeidos}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Enviados</p>
            <p className="text-3xl font-bold text-gray-900">
              {mensajesEnviados.length}
            </p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Mensajes;

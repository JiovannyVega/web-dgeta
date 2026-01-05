import React, { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";

interface Formulario {
  id: number;
  titulo: string;
  descripcion: string;
  estado: "completado" | "pendiente";
  imagen: string;
  colorFondo: string;
  fechaRealizacion?: string;
  horaRealizacion?: string;
}

const Formularios: React.FC = () => {
  const [mostrarDetalles, setMostrarDetalles] = useState<number | null>(null);

  const formularios: Formulario[] = [
    {
      id: 1,
      titulo: "Riesgo de Abandono",
      descripcion: "Última actualización hoy",
      estado: "completado",
      imagen:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
      colorFondo: "bg-cyan-100",
      fechaRealizacion: "25 de Noviembre, 2025",
      horaRealizacion: "10:30 AM",
    },
    {
      id: 2,
      titulo: "Test Estilos de aprendizaje",
      descripcion: "Última actualización ayer",
      estado: "pendiente",
      imagen:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      colorFondo: "bg-orange-100",
    },
    {
      id: 3,
      titulo: "Autoevaluación",
      descripcion: "Última actualización hace ayer",
      estado: "pendiente",
      imagen:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
      colorFondo: "bg-gray-800",
    },
    {
      id: 4,
      titulo: "Evaluación tutor",
      descripcion: "Última actualización hace un mes",
      estado: "pendiente",
      imagen:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop",
      colorFondo: "bg-teal-900",
    },
  ];

  return (
    <StudentLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Formularios</h1>
          <p className="text-gray-600">
            Completa los formularios pendientes para continuar con tu proceso académico
          </p>
        </div>

        {/* Formularios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {formularios.map((formulario) => (
            <div
              key={formulario.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image Container */}
              <div
                className={`relative h-48 ${formulario.colorFondo} overflow-hidden`}
              >
                <img
                  src={formulario.imagen}
                  alt={formulario.titulo}
                  className="w-full h-full object-cover"
                />
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${formulario.estado === "completado"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                      }`}
                  >
                    {formulario.estado === "completado"
                      ? "Completado"
                      : "Pendiente"}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {formulario.titulo}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {formulario.descripcion}
                </p>

                {/* Action Button */}
                {formulario.estado === "completado" ? (
                  <button
                    onClick={() =>
                      setMostrarDetalles(
                        mostrarDetalles === formulario.id
                          ? null
                          : formulario.id
                      )
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    {mostrarDetalles === formulario.id
                      ? "Ocultar Detalles"
                      : "Ver Detalles"}
                  </button>
                ) : (
                  <a
                    href="/estudiante/formularios/llenar"
                    className="block w-full px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium text-center"
                  >
                    Llenar ahora
                  </a>
                )}

                {/* Detalles de Realización */}
                {mostrarDetalles === formulario.id &&
                  formulario.estado === "completado" && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">
                        Información de Realización
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="material-icons-outlined text-gray-500 text-lg mr-2">
                            event
                          </span>
                          <span className="text-gray-600">Fecha:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {formulario.fechaRealizacion}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="material-icons-outlined text-gray-500 text-lg mr-2">
                            schedule
                          </span>
                          <span className="text-gray-600">Hora:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {formulario.horaRealizacion}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">{formularios.length}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Formularios</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {formularios.filter((f) => f.estado === "completado").length}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Completados</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {formularios.filter((f) => f.estado === "pendiente").length}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Pendientes</h3>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Información importante</h4>
              <p className="text-sm text-blue-700">
                Es necesario completar todos los formularios pendientes antes del final del semestre. Si tienes dudas sobre algún formulario, contacta a tu tutor académico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Formularios;

import React from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { FaTrophy, FaFileAlt, FaCalendarCheck, FaChartLine } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const promedioGeneral = 10.0;

  return (
    <StudentLayout>
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Hola, Roberto!</h1>
            <p className="text-gray-600">Tu camino al éxito académico.</p>
          </div>

          {/* Performance Banner */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 mb-8 border border-green-200">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-green-500">
                  <span className="text-4xl font-bold text-green-600">
                    {promedioGeneral.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="ml-8 flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Desempeño Excepcional!
                </h2>
                <p className="text-gray-700">
                  ¡Sigue así, estás alcanzando tus metas con éxito!
                </p>
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Calificaciones Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <FaTrophy className="text-green-600 text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Calificaciones
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  ¡Mantén el excelente trabajo, tus esfuerzos están dando frutos!
                </p>
                <a
                  href="/estudiante/calificaciones"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Ver progreso →
                </a>
              </div>
            </div>

            {/* Formularios Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <FaFileAlt className="text-green-600 text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Formularios
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  ¡Completa tus tareas, cada paso te acerca más a tus objetivos!
                </p>
                <a
                  href="/estudiante/formularios"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Llenar ahora →
                </a>
              </div>
            </div>

            {/* Asistencias Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <FaCalendarCheck className="text-green-600 text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Asistencias
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Consulta tu registro de asistencias y puntualidad.
                </p>
                <a
                  href="/estudiante/asistencias"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Ver registro →
                </a>
              </div>
            </div>
          </div>

          {/* Resumen Académico */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FaChartLine className="text-green-600 mr-2" />
              Resumen Académico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Materias Cursando
                  </p>
                  <p className="text-xs text-gray-500">Semestre actual</p>
                </div>
                <span className="text-2xl font-bold text-gray-900">6</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Materias Aprobadas
                  </p>
                  <p className="text-xs text-gray-500">Este semestre</p>
                </div>
                <span className="text-2xl font-bold text-green-600">5</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Asistencia General
                  </p>
                  <p className="text-xs text-gray-500">Todas las materias</p>
                </div>
                <span className="text-2xl font-bold text-gray-900">95%</span>
              </div>
            </div>
          </div>

          {/* Próximas Evaluaciones */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Próximas Evaluaciones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Álgebra</h4>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">
                    Examen
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Examen Final - Unidades 1-6
                </p>
                <p className="text-xs text-gray-500">
                  30 de Noviembre, 2025
                </p>
              </div>

              <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Física I</h4>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">
                    Tarea
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Ejercicios de Cinemática
                </p>
                <p className="text-xs text-gray-500">
                  28 de Noviembre, 2025
                </p>
              </div>

              <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Programación</h4>
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-medium">
                    Proyecto
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Proyecto Final - Sistema Web
                </p>
                <p className="text-xs text-gray-500">
                  5 de Diciembre, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Dashboard;

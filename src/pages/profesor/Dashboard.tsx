import React from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaUsers, FaClipboardCheck, FaExclamationTriangle, FaEnvelope, FaChartLine } from "react-icons/fa";

const Dashboard: React.FC = () => {
  return (
    <ProfesorLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido, Profesor García
          </h1>
          <p className="text-gray-600">Aquí tienes un resumen de tu jornada.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">4</span>
            </div>
            <p className="text-sm text-gray-600">Grupos Asignados</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaClipboardCheck className="text-green-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">12</span>
            </div>
            <p className="text-sm text-gray-600">Calificaciones Pendientes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">2</span>
            </div>
            <p className="text-sm text-gray-600">Incidencias Hoy</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FaEnvelope className="text-yellow-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">5</span>
            </div>
            <p className="text-sm text-gray-600">Mensajes Nuevos</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              <a
                href="/profesor/misgrupos"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaUsers className="text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">Ver mis grupos</span>
              </a>
              <a
                href="/profesor/calificaciones"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaClipboardCheck className="text-green-600 mr-3" />
                <span className="font-medium text-gray-900">Registrar calificaciones</span>
              </a>
              <a
                href="/profesor/incidencias"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaExclamationTriangle className="text-red-600 mr-3" />
                <span className="font-medium text-gray-900">Reportar incidencia</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Grupos del Día</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Matemáticas 3-A</p>
                  <p className="text-sm text-gray-600">8:00 AM - 9:30 AM</p>
                </div>
                <span className="text-sm font-medium text-blue-600">32 estudiantes</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Álgebra Lineal 3-B</p>
                  <p className="text-sm text-gray-600">10:00 AM - 11:30 AM</p>
                </div>
                <span className="text-sm font-medium text-green-600">28 estudiantes</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Cálculo 5-C</p>
                  <p className="text-sm text-gray-600">2:00 PM - 3:30 PM</p>
                </div>
                <span className="text-sm font-medium text-yellow-600">35 estudiantes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <FaChartLine className="text-green-600 mr-2" />
            Actividad Reciente
          </h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Matemáticas 3-A:</span> Calificaciones del examen parcial actualizadas
              </p>
            </div>
            <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50 rounded">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Álgebra Lineal 3-B:</span> Nueva tarea asignada
              </p>
            </div>
            <div className="flex items-center p-3 border-l-4 border-red-500 bg-red-50 rounded">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Cálculo 5-C:</span> Incidencia reportada - Juan Pérez (falta injustificada)
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProfesorLayout>
  );
};

export default Dashboard;

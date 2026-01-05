import React, { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { FaBook, FaCheckCircle, FaTimesCircle, FaClock, FaInfoCircle, FaChevronDown, FaChevronRight } from "react-icons/fa";

interface AsistenciaRegistro {
  fecha: string;
  estado: "presente" | "ausente" | "tarde";
  observaciones?: string;
}

interface Materia {
  id: number;
  nombre: string;
  asistenciaGeneral: number;
  registros: AsistenciaRegistro[];
}

const Asistencias: React.FC = () => {
  const [materiaExpandida, setMateriaExpandida] = useState<number | null>(1);

  const materias: Materia[] = [
    {
      id: 1,
      nombre: "Cálculo Diferencial",
      asistenciaGeneral: 95,
      registros: [
        { fecha: "25 de Octubre, 2023", estado: "presente" },
        { fecha: "23 de Octubre, 2023", estado: "presente" },
        {
          fecha: "20 de Octubre, 2023",
          estado: "ausente",
          observaciones: "Justificada por enfermedad",
        },
        { fecha: "18 de Octubre, 2023", estado: "tarde" },
        { fecha: "16 de Octubre, 2023", estado: "presente" },
        { fecha: "13 de Octubre, 2023", estado: "presente" },
        { fecha: "11 de Octubre, 2023", estado: "presente" },
        { fecha: "9 de Octubre, 2023", estado: "tarde" },
        { fecha: "6 de Octubre, 2023", estado: "presente" },
        { fecha: "4 de Octubre, 2023", estado: "presente" },
      ],
    },
    {
      id: 2,
      nombre: "Álgebra Lineal",
      asistenciaGeneral: 100,
      registros: [
        { fecha: "26 de Octubre, 2023", estado: "presente" },
        { fecha: "24 de Octubre, 2023", estado: "presente" },
        { fecha: "21 de Octubre, 2023", estado: "presente" },
        { fecha: "19 de Octubre, 2023", estado: "presente" },
        { fecha: "17 de Octubre, 2023", estado: "presente" },
        { fecha: "14 de Octubre, 2023", estado: "presente" },
        { fecha: "12 de Octubre, 2023", estado: "presente" },
        { fecha: "10 de Octubre, 2023", estado: "presente" },
      ],
    },
    {
      id: 3,
      nombre: "Física I",
      asistenciaGeneral: 88,
      registros: [
        { fecha: "27 de Octubre, 2023", estado: "presente" },
        { fecha: "25 de Octubre, 2023", estado: "ausente" },
        { fecha: "22 de Octubre, 2023", estado: "presente" },
        { fecha: "20 de Octubre, 2023", estado: "tarde" },
        { fecha: "18 de Octubre, 2023", estado: "presente" },
        { fecha: "15 de Octubre, 2023", estado: "presente" },
      ],
    },
    {
      id: 4,
      nombre: "Programación I",
      asistenciaGeneral: 92,
      registros: [
        { fecha: "26 de Octubre, 2023", estado: "presente" },
        { fecha: "23 de Octubre, 2023", estado: "presente" },
        { fecha: "19 de Octubre, 2023", estado: "ausente" },
        { fecha: "16 de Octubre, 2023", estado: "presente" },
        { fecha: "12 de Octubre, 2023", estado: "presente" },
      ],
    },
  ];

  const toggleMateria = (materiaId: number) => {
    setMateriaExpandida(materiaExpandida === materiaId ? null : materiaId);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "presente":
        return "bg-green-100 text-green-700";
      case "ausente":
        return "bg-red-100 text-red-700";
      case "tarde":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case "presente":
        return "Presente";
      case "ausente":
        return "Ausente";
      case "tarde":
        return "Tarde";
      default:
        return estado;
    }
  };

  const getAsistenciaColor = (porcentaje: number) => {
    if (porcentaje >= 95) return "text-green-600";
    if (porcentaje >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <StudentLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Asistencias</h1>
          <p className="text-gray-600">Aquí puedes ver tu registro de asistencia para cada materia</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaBook className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{materias.length}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Materias</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {materias.reduce((acc, m) => acc + m.registros.filter((r) => r.estado === "presente").length, 0)}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Asistencias</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FaTimesCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {materias.reduce((acc, m) => acc + m.registros.filter((r) => r.estado === "ausente").length, 0)}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Faltas</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FaClock className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {materias.reduce((acc, m) => acc + m.registros.filter((r) => r.estado === "tarde").length, 0)}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Retardos</h3>
          </div>
        </div>

        {/* Materias List */}
        <div className="space-y-4 mb-8">
          {materias.map((materia) => (
            <div key={materia.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Materia Header */}
              <div
                className="px-6 py-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleMateria(materia.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {materiaExpandida === materia.id ? (
                      <FaChevronDown className="w-5 h-5 text-green-600" />
                    ) : (
                      <FaChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{materia.nombre}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{materia.registros.length} clases registradas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Asistencia General:</p>
                    <p className={`text-2xl font-bold ${getAsistenciaColor(materia.asistenciaGeneral)}`}>
                      {materia.asistenciaGeneral}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Registros Table */}
              {materiaExpandida === materia.id && (
                <div className="border-t border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fecha</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Observaciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {materia.registros.map((registro, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-900">{registro.fecha}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${getEstadoColor(registro.estado)}`}>
                                <span className={`w-2 h-2 rounded-full mr-2 ${registro.estado === "presente" ? "bg-green-600" :
                                  registro.estado === "ausente" ? "bg-red-600" : "bg-yellow-600"
                                  }`}></span>
                                {getEstadoTexto(registro.estado)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{registro.observaciones || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaInfoCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Información importante</h4>
              <p className="text-sm text-blue-700">
                Se requiere un mínimo de 80% de asistencia para aprobar cada materia. Las faltas justificadas deben ser reportadas al tutor académico dentro de los 3 días siguientes a la ausencia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Asistencias;

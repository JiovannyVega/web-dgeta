import React, { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";

interface Materia {
  id: number;
  nombre: string;
  parcial1: number;
  parcial2: number;
  parcial3: number;
  calFinal: number;
  accionesEmprender: string;
}

interface Semestre {
  nombre: string;
  materias: Materia[];
  tutor: string;
}

const CalificacionesEstudiante: React.FC = () => {
  const [semestreActivo, setSemestreActivo] = useState("Primer semestre");

  // Datos de ejemplo para diferentes semestres
  const semestres: Record<string, Semestre> = {
    "Primer semestre": {
      nombre: "Primer semestre",
      tutor: "Roberto Rangel Anguiano",
      materias: [
        {
          id: 1,
          nombre: "Álgebra",
          parcial1: 8,
          parcial2: 7,
          parcial3: 6,
          calFinal: 10,
          accionesEmprender: "Reforzar temas",
        },
        {
          id: 2,
          nombre: "Inglés 1",
          parcial1: 5,
          parcial2: 7,
          parcial3: 6,
          calFinal: 5,
          accionesEmprender: "N/A",
        },
        {
          id: 3,
          nombre: "Química 1",
          parcial1: 7,
          parcial2: 7,
          parcial3: 5,
          calFinal: 5,
          accionesEmprender: "Reforzar temas",
        },
        {
          id: 4,
          nombre: "TICs",
          parcial1: 7,
          parcial2: 7,
          parcial3: 4,
          calFinal: 5,
          accionesEmprender: "N/A",
        },
        {
          id: 5,
          nombre: "Lógica",
          parcial1: 7,
          parcial2: 7,
          parcial3: 5,
          calFinal: 5,
          accionesEmprender: "Reforzar temas",
        },
        {
          id: 6,
          nombre: "LEOyE 1",
          parcial1: 7,
          parcial2: 7,
          parcial3: 7,
          calFinal: 5,
          accionesEmprender: "N/A",
        },
      ],
    },
    "Segundo semestre": {
      nombre: "Segundo semestre",
      tutor: "María González Pérez",
      materias: [
        {
          id: 1,
          nombre: "Geometría Analítica",
          parcial1: 9,
          parcial2: 8,
          parcial3: 8,
          calFinal: 8,
          accionesEmprender: "N/A",
        },
        {
          id: 2,
          nombre: "Inglés 2",
          parcial1: 7,
          parcial2: 8,
          parcial3: 7,
          calFinal: 7,
          accionesEmprender: "N/A",
        },
      ],
    },
    "Tercer semestre": {
      nombre: "Tercer semestre",
      tutor: "Carlos Martínez Silva",
      materias: [],
    },
    "Cuarto semestre": {
      nombre: "Cuarto semestre",
      tutor: "Ana López Torres",
      materias: [],
    },
    "Quinto semestre": {
      nombre: "Quinto semestre",
      tutor: "Jorge Ramírez Cruz",
      materias: [],
    },
    "Sexto semestre": {
      nombre: "Sexto semestre",
      tutor: "Patricia Hernández Vega",
      materias: [],
    },
  };

  const semestreData = semestres[semestreActivo];

  return (
    <StudentLayout>
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Grades Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Materia
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Parcial 1
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Parcial 2
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Parcial 3
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Cal. Final
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Acciones a Emprender
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {semestreData.materias.length > 0 ? (
                    semestreData.materias.map((materia) => (
                      <tr key={materia.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            {materia.nombre}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-semibold ${materia.parcial1 < 6
                              ? "bg-red-100 text-red-700"
                              : materia.parcial1 < 8
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                              }`}
                          >
                            {materia.parcial1}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-semibold ${materia.parcial2 < 6
                              ? "bg-red-100 text-red-700"
                              : materia.parcial2 < 8
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                              }`}
                          >
                            {materia.parcial2}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-semibold ${materia.parcial3 < 6
                              ? "bg-red-100 text-red-700"
                              : materia.parcial3 < 8
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                              }`}
                          >
                            {materia.parcial3}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-base font-bold ${materia.calFinal < 6
                              ? "bg-red-100 text-red-700"
                              : materia.calFinal < 8
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                              }`}
                          >
                            {materia.calFinal}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm ${materia.accionesEmprender === "N/A"
                              ? "text-gray-500"
                              : "text-blue-600 font-medium"
                              }`}
                          >
                            {materia.accionesEmprender}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <span className="material-icons-outlined text-5xl text-gray-300 mb-3">
                            assignment
                          </span>
                          <p className="text-lg font-medium">
                            No hay calificaciones disponibles
                          </p>
                          <p className="text-sm mt-1">
                            Las calificaciones se mostrarán cuando estén
                            disponibles
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer with Tutor Info */}
            {semestreData.materias.length > 0 && (
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                <div className="flex items-center">
                  <span className="material-icons-outlined text-gray-600 mr-2">
                    person
                  </span>
                  <span className="text-sm text-gray-600">
                    Tutor:{" "}
                    <span className="font-semibold text-gray-900">
                      {semestreData.tutor}
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Info Cards */}
          {semestreData.materias.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <span className="material-icons text-blue-600 text-2xl">
                      assignment
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">
                      Total de Materias
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {semestreData.materias.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <span className="material-icons text-green-600 text-2xl">
                      check_circle
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">
                      Materias Aprobadas
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        semestreData.materias.filter((m) => m.calFinal >= 6)
                          .length
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                    <span className="material-icons text-yellow-600 text-2xl">
                      star
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">
                      Promedio General
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {semestreData.materias.length > 0
                        ? (
                          semestreData.materias.reduce(
                            (sum, m) => sum + m.calFinal,
                            0
                          ) / semestreData.materias.length
                        ).toFixed(1)
                        : "0.0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default CalificacionesEstudiante;

import React, { useState } from "react";
import { Summary } from "../../components/PageUI";
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
      <div className="ui-page">
        <div className="min-w-0">
          <header className="ui-page-heading"><div><h1>Calificaciones</h1><p>Consulta los resultados de cada semestre.</p></div><div><label htmlFor="grade-term" className="mb-2 block text-sm font-medium">Semestre</label><select id="grade-term" value={semestreActivo} onChange={event=>setSemestreActivo(event.target.value)} className="min-h-12 w-full rounded-lg border border-gray-500 bg-white px-3">{Object.keys(semestres).map(term=><option key={term}>{term}</option>)}</select></div></header>
          {/* Grades Table */}
          <div className="bg-white rounded-xl  border border-gray-200 overflow-hidden">
            <div className="table-scroll" role="region" aria-label="Tabla de registros" tabIndex={0}>
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Materia
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Parcial 1
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Parcial 2
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Parcial 3
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Cal. Final
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
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
                            className={`tabular-nums font-semibold ${materia.parcial1 < 6 ? 'text-red-800' : 'text-gray-900'}`}
                          >
                            {materia.parcial1}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`tabular-nums font-semibold ${materia.parcial2 < 6 ? 'text-red-800' : 'text-gray-900'}`}
                          >
                            {materia.parcial2}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`tabular-nums font-semibold ${materia.parcial3 < 6 ? 'text-red-800' : 'text-gray-900'}`}
                          >
                            {materia.parcial3}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`tabular-nums font-semibold ${materia.calFinal < 6 ? 'text-red-800' : 'text-gray-900'}`}
                          >
                            {materia.calFinal}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm ${materia.accionesEmprender === "N/A"
                              ? "text-gray-600"
                              : "text-gray-700 font-medium"
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
                        className="px-6 py-12 text-center text-gray-600"
                      >
                        <div className="flex flex-col items-center">

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

          <Summary items={[{label:'Materias',value:semestreData.materias.length},{label:'Aprobadas',value:semestreData.materias.filter(m=>m.calFinal>=6).length},{label:'Promedio',value:semestreData.materias.length?(semestreData.materias.reduce((sum,m)=>sum+m.calFinal,0)/semestreData.materias.length).toFixed(1):'—'}]}/>
        </div>
      </div>
    </StudentLayout>
  );
};

export default CalificacionesEstudiante;

import React, { useState } from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";

interface FormularioPrediccion {
  // Datos binarios (0-1)
  daytimeEveningAttendance: number;
  gender: number;
  scholarshipHolder: number;
  international: number;
  debtor: number;
  displaced: number;
  educationalSpecialNeeds: number;

  // Datos discretos
  curricularUnits1stSemEnrolled: number;
  curricularUnits1stSemEvaluations: number;
  curricularUnits1stSemApproved: number;
  curricularUnits1stSemGrade: number;
  curricularUnits1stSemWithoutEvaluations: number;
}

interface Prediccion {
  abandonoEscuela: "Sí" | "No" | null;
  reprobaraOPasara: "Reprobará" | "Pasará" | null;
  calificacionEstimada: number | null;
}

const PrediccionEstudiante: React.FC = () => {
  const [formData, setFormData] = useState<FormularioPrediccion>({
    daytimeEveningAttendance: 1,
    gender: 0,
    scholarshipHolder: 0,
    international: 0,
    debtor: 0,
    displaced: 0,
    educationalSpecialNeeds: 0,
    curricularUnits1stSemEnrolled: 0,
    curricularUnits1stSemEvaluations: 0,
    curricularUnits1stSemApproved: 0,
    curricularUnits1stSemGrade: 0,
    curricularUnits1stSemWithoutEvaluations: 0,
  });

  const [prediccion, setPrediccion] = useState<Prediccion>({
    abandonoEscuela: null,
    reprobaraOPasara: null,
    calificacionEstimada: null,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "curricularUnits1stSemGrade"
          ? parseFloat(value)
          : parseInt(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de llamada a modelo de ML
    // Aquí deberías conectar con tu API/modelo real
    setTimeout(() => {
      // Lógica básica de ejemplo - reemplazar con tu modelo real
      const promedio = formData.curricularUnits1stSemGrade;
      const materiasAprobadas = formData.curricularUnits1stSemApproved;
      const materiasInscritas = formData.curricularUnits1stSemEnrolled;

      // Predicción de abandono
      const riesgoAbandono =
        formData.debtor === 1 ||
        formData.displaced === 1 ||
        materiasAprobadas / materiasInscritas < 0.5;

      // Predicción de reprobar/pasar
      const pasara =
        promedio >= 6.0 && materiasAprobadas >= materiasInscritas * 0.7;

      // Calificación estimada (con variación aleatoria pequeña)
      const calificacionEstimada =
        promedio > 0
          ? Math.min(10, Math.max(0, promedio + (Math.random() - 0.5) * 0.5))
          : 5.0;

      setPrediccion({
        abandonoEscuela: riesgoAbandono ? "Sí" : "No",
        reprobaraOPasara: pasara ? "Pasará" : "Reprobará",
        calificacionEstimada: parseFloat(calificacionEstimada.toFixed(2)),
      });

      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      daytimeEveningAttendance: 1,
      gender: 0,
      scholarshipHolder: 0,
      international: 0,
      debtor: 0,
      displaced: 0,
      educationalSpecialNeeds: 0,
      curricularUnits1stSemEnrolled: 0,
      curricularUnits1stSemEvaluations: 0,
      curricularUnits1stSemApproved: 0,
      curricularUnits1stSemGrade: 0,
      curricularUnits1stSemWithoutEvaluations: 0,
    });
    setPrediccion({
      abandonoEscuela: null,
      reprobaraOPasara: null,
      calificacionEstimada: null,
    });
  };

  return (
    <ProfesorLayout><div className="dashboard-container ui-page">
      <div className="ui-page-heading"><div>
        <h1>Simulación de seguimiento</h1>
        <p>Consulta una estimación orientativa a partir de los valores capturados.</p></div>
      </div>

      <div
        className="dashboard-content"
      >
        <form onSubmit={handleSubmit} className="prediccion-form">
          {/* Sección: Datos Personales */}
          <div className="form-section">
            <h2>Datos personales</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="prediction-daytimeEveningAttendance">Asistencia Diurna/Nocturna</label>
                <select
                  id="prediction-daytimeEveningAttendance" name="daytimeEveningAttendance"
                  value={formData.daytimeEveningAttendance}
                  onChange={handleInputChange}
                  required
                >
                  <option value={1}>Diurna</option>
                  <option value={0}>Nocturna</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="prediction-gender">Género</label>
                <select
                  id="prediction-gender" name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>Hombre</option>
                  <option value={1}>Mujer</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="prediction-scholarshipHolder">¿Tiene beca?</label>
                <select
                  id="prediction-scholarshipHolder" name="scholarshipHolder"
                  value={formData.scholarshipHolder}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="prediction-international">¿Es internacional?</label>
                <select
                  id="prediction-international" name="international"
                  value={formData.international}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="prediction-debtor">¿Tiene deudas académicas?</label>
                <select
                  id="prediction-debtor" name="debtor"
                  value={formData.debtor}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="prediction-displaced">¿Estudiante desplazado?</label>
                <select
                  id="prediction-displaced" name="displaced"
                  value={formData.displaced}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="prediction-educationalSpecialNeeds">¿Necesidades educativas especiales?</label>
                <select
                  id="prediction-educationalSpecialNeeds" name="educationalSpecialNeeds"
                  value={formData.educationalSpecialNeeds}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección: Datos Académicos */}
          <div className="form-section">
            <h2>Datos académicos del primer semestre</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="prediction-curricularUnits1stSemEnrolled">Materias inscritas (0-26)</label>
                <input
                  type="number"
                  id="prediction-curricularUnits1stSemEnrolled" name="curricularUnits1stSemEnrolled"
                  value={formData.curricularUnits1stSemEnrolled}
                  onChange={handleInputChange}
                  min="0"
                  max="26"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prediction-curricularUnits1stSemEvaluations">Evaluaciones realizadas (0-45)</label>
                <input
                  type="number"
                  id="prediction-curricularUnits1stSemEvaluations" name="curricularUnits1stSemEvaluations"
                  value={formData.curricularUnits1stSemEvaluations}
                  onChange={handleInputChange}
                  min="0"
                  max="45"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prediction-curricularUnits1stSemApproved">Materias aprobadas (0-26)</label>
                <input
                  type="number"
                  id="prediction-curricularUnits1stSemApproved" name="curricularUnits1stSemApproved"
                  value={formData.curricularUnits1stSemApproved}
                  onChange={handleInputChange}
                  min="0"
                  max="26"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prediction-curricularUnits1stSemGrade">Promedio de calificaciones (0.0-18.875)</label>
                <input
                  type="number"
                  id="prediction-curricularUnits1stSemGrade" name="curricularUnits1stSemGrade"
                  value={formData.curricularUnits1stSemGrade}
                  onChange={handleInputChange}
                  min="0"
                  max="18.875"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prediction-curricularUnits1stSemWithoutEvaluations">Materias sin evaluación (0-12)</label>
                <input
                  type="number"
                  id="prediction-curricularUnits1stSemWithoutEvaluations" name="curricularUnits1stSemWithoutEvaluations"
                  value={formData.curricularUnits1stSemWithoutEvaluations}
                  onChange={handleInputChange}
                  min="0"
                  max="12"
                  required
                />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Procesando..." : "Obtener Predicción"}
            </button>
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Limpiar Formulario
            </button>
          </div>
        </form>

        {/* Resultados de Predicción */}
        {prediccion.abandonoEscuela && (
          <div className="prediccion-resultados">
            <h2>Resultado de simulación</h2>

            <div className="resultado-card">
              <div
                className={`resultado-item ${prediccion.abandonoEscuela === "Sí"
                  ? "alerta-alta"
                  : "alerta-baja"
                  }`}
              >
                <h3>¿Abandonará la escuela?</h3>
                <p className="resultado-valor">{prediccion.abandonoEscuela}</p>
              </div>

              <div
                className={`resultado-item ${prediccion.reprobaraOPasara === "Reprobará"
                  ? "alerta-media"
                  : "alerta-baja"
                  }`}
              >
                <h3>¿Reprobará o pasará?</h3>
                <p className="resultado-valor">{prediccion.reprobaraOPasara}</p>
              </div>

              <div className="resultado-item">
                <h3>Calificación estimada</h3>
                <p className="resultado-valor calificacion">
                  {prediccion.calificacionEstimada?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="recomendaciones">
              <h3>Recomendaciones</h3>
              <ul>
                {prediccion.abandonoEscuela === "Sí" && (
                  <li className="recomendacion-urgente">
                    Alto riesgo de abandono. Se recomienda intervención
                    inmediata con tutorías y apoyo psicopedagógico.
                  </li>
                )}
                {prediccion.reprobaraOPasara === "Reprobará" && (
                  <li className="recomendacion-importante">
                    Riesgo de reprobar. Considere asesorías adicionales y
                    seguimiento personalizado.
                  </li>
                )}
                {prediccion.calificacionEstimada &&
                  prediccion.calificacionEstimada < 6 && (
                    <li className="recomendacion-importante">
                      Calificación por debajo del mínimo. Reforzar
                      conocimientos básicos de la materia.
                    </li>
                  )}
                {prediccion.abandonoEscuela === "No" &&
                  prediccion.reprobaraOPasara === "Pasará" && (
                    <li className="recomendacion-positiva">
                      El estudiante muestra buen rendimiento. Mantener el
                      seguimiento regular.
                    </li>
                  )}
              </ul>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .prediccion-form {
          background: white;
          border-radius: 8px;
          padding: 24px;
          border: 1px solid #e5e7eb;
          margin-bottom: 24px;
        }

        .form-section {
          margin-bottom: 32px;
        }

        .form-section h2 {
          color: #111827;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e5e7eb;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 500;
          margin-bottom: 8px;
          color: #333;
          font-size: 14px;
        }

        .form-group input,
        .form-group select {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: 2px solid #166534; outline-offset: 2px;
          border-color: #166534;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 24px;
        }

        .btn-primary,
        .btn-secondary {
          padding: 12px 32px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary {
          background: #166534;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #14532d;


        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #f5f5f5;
          color: #333;
        }

        .btn-secondary:hover {
          background: #e0e0e0;
        }

        .prediccion-resultados {
          background: white;
          border-radius: 8px;
          padding: 24px;
          border: 1px solid #e5e7eb;
        }

        .prediccion-resultados h2 {
          color: #166534;
          margin-bottom: 20px;
          text-align: center;
        }

        .resultado-card {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .resultado-item {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border: 2px solid transparent;
          transition: all 0.3s;
        }

        .resultado-item h3 {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .resultado-valor {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }

        .resultado-valor.calificacion {
          color: #166534;
        }

        .alerta-alta {
          background: #ffebee;
          border-color: #ef5350;
        }

        .alerta-alta .resultado-valor {
          color: #c62828;
        }

        .alerta-media {
          background: #fff3e0;
          border-color: #ff9800;
        }

        .alerta-media .resultado-valor {
          color: #92400e;
        }

        .alerta-baja {
          background: #e8f5e9;
          border-color: #4caf50;
        }

        .alerta-baja .resultado-valor {
          color: #2e7d32;
        }

        .recomendaciones {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #166534;
        }

        .recomendaciones h3 {
          color: #166534;
          margin-bottom: 16px;
          font-size: 18px;
        }

        .recomendaciones ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .recomendaciones li {
          padding: 12px;
          margin-bottom: 8px;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.6;
        }

        .recomendacion-urgente {
          background: #ffebee;
          color: #c62828;
          border-left: 4px solid #ef5350;
        }

        .recomendacion-importante {
          background: #fff3e0;
          color: #92400e;
          border-left: 4px solid #ff9800;
        }

        .recomendacion-positiva {
          background: #e8f5e9;
          color: #2e7d32;
          border-left: 4px solid #4caf50;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .resultado-card {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </div></ProfesorLayout>
  );
};

export default PrediccionEstudiante;

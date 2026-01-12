import React, { useState } from "react";

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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Predicción de Rendimiento Estudiantil</h1>
        <p>Complete los datos del estudiante para obtener las predicciones</p>
      </div>

      <div
        className="dashboard-content"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <form onSubmit={handleSubmit} className="prediccion-form">
          {/* Sección: Datos Personales */}
          <div className="form-section">
            <h2>Datos Personales</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Asistencia Diurna/Nocturna</label>
                <select
                  name="daytimeEveningAttendance"
                  value={formData.daytimeEveningAttendance}
                  onChange={handleInputChange}
                  required
                >
                  <option value={1}>Diurna</option>
                  <option value={0}>Nocturna</option>
                </select>
              </div>

              <div className="form-group">
                <label>Género</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>Hombre</option>
                  <option value={1}>Mujer</option>
                </select>
              </div>

              <div className="form-group">
                <label>¿Tiene beca?</label>
                <select
                  name="scholarshipHolder"
                  value={formData.scholarshipHolder}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí</option>
                </select>
              </div>

              <div className="form-group">
                <label>¿Es internacional?</label>
                <select
                  name="international"
                  value={formData.international}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí</option>
                </select>
              </div>

              <div className="form-group">
                <label>¿Tiene deudas académicas?</label>
                <select
                  name="debtor"
                  value={formData.debtor}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí</option>
                </select>
              </div>

              <div className="form-group">
                <label>¿Estudiante desplazado?</label>
                <select
                  name="displaced"
                  value={formData.displaced}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>No</option>
                  <option value={1}>Sí</option>
                </select>
              </div>

              <div className="form-group">
                <label>¿Necesidades educativas especiales?</label>
                <select
                  name="educationalSpecialNeeds"
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
            <h2>Datos Académicos del 1er Semestre</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Materias inscritas (0-26)</label>
                <input
                  type="number"
                  name="curricularUnits1stSemEnrolled"
                  value={formData.curricularUnits1stSemEnrolled}
                  onChange={handleInputChange}
                  min="0"
                  max="26"
                  required
                />
              </div>

              <div className="form-group">
                <label>Evaluaciones realizadas (0-45)</label>
                <input
                  type="number"
                  name="curricularUnits1stSemEvaluations"
                  value={formData.curricularUnits1stSemEvaluations}
                  onChange={handleInputChange}
                  min="0"
                  max="45"
                  required
                />
              </div>

              <div className="form-group">
                <label>Materias aprobadas (0-26)</label>
                <input
                  type="number"
                  name="curricularUnits1stSemApproved"
                  value={formData.curricularUnits1stSemApproved}
                  onChange={handleInputChange}
                  min="0"
                  max="26"
                  required
                />
              </div>

              <div className="form-group">
                <label>Promedio de calificaciones (0.0-18.875)</label>
                <input
                  type="number"
                  name="curricularUnits1stSemGrade"
                  value={formData.curricularUnits1stSemGrade}
                  onChange={handleInputChange}
                  min="0"
                  max="18.875"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Materias sin evaluación (0-12)</label>
                <input
                  type="number"
                  name="curricularUnits1stSemWithoutEvaluations"
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
            <h2>Resultados de la Predicción</h2>

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
                    🚨 Alto riesgo de abandono. Se recomienda intervención
                    inmediata con tutorías y apoyo psicopedagógico.
                  </li>
                )}
                {prediccion.reprobaraOPasara === "Reprobará" && (
                  <li className="recomendacion-importante">
                    ⚠️ Riesgo de reprobar. Considere asesorías adicionales y
                    seguimiento personalizado.
                  </li>
                )}
                {prediccion.calificacionEstimada &&
                  prediccion.calificacionEstimada < 6 && (
                    <li className="recomendacion-importante">
                      📚 Calificación por debajo del mínimo. Reforzar
                      conocimientos básicos de la materia.
                    </li>
                  )}
                {prediccion.abandonoEscuela === "No" &&
                  prediccion.reprobaraOPasara === "Pasará" && (
                    <li className="recomendacion-positiva">
                      ✅ El estudiante muestra buen rendimiento. Mantener el
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
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .form-section {
          margin-bottom: 32px;
        }

        .form-section h2 {
          color: #1a237e;
          font-size: 20px;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e8eaf6;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #1a237e;
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
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary {
          background: #1a237e;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #0d1654;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(26, 35, 126, 0.3);
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
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .prediccion-resultados h2 {
          color: #1a237e;
          margin-bottom: 20px;
          text-align: center;
        }

        .resultado-card {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
          color: #1a237e;
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
          color: #e65100;
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
          border-left: 4px solid #1a237e;
        }

        .recomendaciones h3 {
          color: #1a237e;
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
          border-radius: 4px;
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
          color: #e65100;
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
    </div>
  );
};

export default PrediccionEstudiante;

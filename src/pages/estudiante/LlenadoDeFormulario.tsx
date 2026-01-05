import React, { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { FaArrowLeft, FaArrowRight, FaCheck, FaInfo } from "react-icons/fa";

const LlenadoDeFormulario: React.FC = () => {
  const totalPreguntas = 20;
  const [preguntaActual, setPreguntaActual] = useState(1);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});

  const preguntas: Record<number, string> = {
    1: "Tengo fama de decir lo que pienso claramente y sin rodeos.",
    2: "Estoy seguro de lo que es bueno y lo que es malo, lo que está bien y lo que está mal.",
    3: "Muchas veces actúo sin mirar las consecuencias.",
    4: "Normalmente trato de resolver los problemas metódicamente y paso a paso.",
    5: "Creo que los formalismos coartan y limitan la actuación libre de las personas.",
    6: "Me interesa saber cuáles son los sistemas de valores de los demás y con qué criterios actúan.",
    7: "Pienso que el actuar intuitivamente puede ser siempre tan válido como actuar reflexivamente.",
    8: "Creo que lo más importante es que las cosas funcionen.",
    9: "Procuro estar al tanto de lo que ocurre aquí y ahora.",
    10: "Disfruto cuando tengo tiempo para preparar mi trabajo y realizarlo a conciencia.",
    11: "Estoy a gusto siguiendo un orden en las comidas, en el estudio y haciendo ejercicio regularmente.",
    12: "Cuando escucho una nueva idea enseguida empiezo a pensar cómo ponerla en práctica.",
    13: "Prefiero las ideas originales y novedosas aunque no sean prácticas.",
    14: "Admito y me ajusto a las normas solo si me sirven para lograr mis objetivos.",
    15: "Normalmente encajo bien con personas reflexivas, analíticas y me cuesta sintonizar con personas demasiado espontáneas.",
    16: "Escucho con más frecuencia que hablo.",
    17: "Prefiero las cosas estructuradas a las desordenadas.",
    18: "Cuando poseo cualquier información, trato de interpretarla bien antes de manifestar alguna conclusión.",
    19: "Antes de hacer algo estudio con cuidado sus ventajas e inconvenientes.",
    20: "Me crezco con el reto de hacer algo nuevo y diferente.",
  };

  const opciones = [
    { valor: "totalmente-acuerdo", texto: "Totalmente de acuerdo" },
    { valor: "de-acuerdo", texto: "De acuerdo" },
    { valor: "indeciso", texto: "Indeciso" },
    { valor: "en-desacuerdo", texto: "En desacuerdo" },
    { valor: "totalmente-desacuerdo", texto: "Totalmente en desacuerdo" },
  ];

  const handleRespuestaChange = (valor: string) => {
    setRespuestas({
      ...respuestas,
      [preguntaActual]: valor,
    });
  };

  const handleSiguiente = () => {
    if (preguntaActual < totalPreguntas) {
      setPreguntaActual(preguntaActual + 1);
    }
  };

  const handleAnterior = () => {
    if (preguntaActual > 1) {
      setPreguntaActual(preguntaActual - 1);
    }
  };

  const handleEnviar = () => {
    console.log("Respuestas:", respuestas);
    alert("Formulario enviado exitosamente");
  };

  const progreso = (preguntaActual / totalPreguntas) * 100;
  const respuestaActual = respuestas[preguntaActual];

  return (
    <StudentLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-6">
          <a
            href="/estudiante/formularios"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-3 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span className="text-sm font-medium">Volver</span>
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Estilos de aprendizaje
          </h1>
          <p className="text-gray-600">
            Selecciona la opción que mejor te represente en cada afirmación.
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Progress Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-gray-900">
                Pregunta {preguntaActual} de {totalPreguntas}
              </h2>
              <span className="text-sm text-gray-600">
                {Math.round(progreso)}% completado
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
          </div>

          {/* Question Content */}
          <div className="px-8 py-8">
            <p className="text-xl text-gray-900 mb-8 leading-relaxed">
              {preguntas[preguntaActual]}
            </p>

            {/* Options */}
            <div className="space-y-3">
              {opciones.map((opcion) => (
                <label
                  key={opcion.valor}
                  className={`flex items-center p-5 rounded-lg border-2 cursor-pointer transition-all ${respuestaActual === opcion.valor
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <input
                    type="radio"
                    name={`pregunta-${preguntaActual}`}
                    value={opcion.valor}
                    checked={respuestaActual === opcion.valor}
                    onChange={() => handleRespuestaChange(opcion.valor)}
                    className="w-5 h-5 text-green-600 focus:ring-green-500 focus:ring-2"
                  />
                  <span
                    className={`ml-4 text-base ${respuestaActual === opcion.valor
                      ? "text-green-900 font-medium"
                      : "text-gray-700"
                      }`}
                  >
                    {opcion.texto}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={handleAnterior}
              disabled={preguntaActual === 1}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${preguntaActual === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              <FaArrowLeft className="mr-2" />
              Anterior
            </button>

            {preguntaActual < totalPreguntas ? (
              <button
                onClick={handleSiguiente}
                disabled={!respuestaActual}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${!respuestaActual
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
                  }`}
              >
                Siguiente
                <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleEnviar}
                disabled={Object.keys(respuestas).length !== totalPreguntas}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${Object.keys(respuestas).length !== totalPreguntas
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
                  }`}
              >
                <FaCheck className="mr-2" />
                Enviar formulario
              </button>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <div className="flex items-start">
            <FaInfo className="text-blue-600 text-xl mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm mb-1">
                Instrucciones
              </h4>
              <p className="text-sm text-blue-700">
                Responde cada pregunta con sinceridad según lo que mejor te
                represente. No hay respuestas correctas o incorrectas.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-xs text-gray-600 mb-1">Respondidas</p>
            <p className="text-2xl font-bold text-green-600">
              {Object.keys(respuestas).length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-xs text-gray-600 mb-1">Pendientes</p>
            <p className="text-2xl font-bold text-orange-600">
              {totalPreguntas - Object.keys(respuestas).length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-xs text-gray-600 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-900">
              {totalPreguntas}
            </p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default LlenadoDeFormulario;

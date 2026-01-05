import React, { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { FaSave, FaTimes, FaEdit } from "react-icons/fa";

const PerfilEstudiante: React.FC = () => {
  // Estados para modo edición
  const [editandoPersonal, setEditandoPersonal] = useState(false);
  const [editandoContacto, setEditandoContacto] = useState(false);
  const [editandoDomicilio, setEditandoDomicilio] = useState(false);

  // Estados para datos personales
  const [datosPersonales, setDatosPersonales] = useState({
    nombres: "Roberto",
    apellidoPaterno: "Rangel",
    apellidoMaterno: "Garcia",
    sexo: "Masculino",
    fechaNacimiento: "2002-05-15",
    curp: "RAGR020515HDFNRA01",
  });

  // Estados para datos de contacto
  const [datosContacto, setDatosContacto] = useState({
    celular: "3312345678",
    telefonoCasa: "3398765432",
    correo: "roberto.rangel@estudiante.dgeta.edu.mx",
  });

  // Estados para datos de domicilio
  const [datosDomicilio, setDatosDomicilio] = useState({
    codigoPostal: "44100",
    estado: "Jalisco",
    municipio: "Guadalajara",
    localidad: "Guadalajara",
    colonia: "Centro",
    calle: "Avenida Hidalgo",
    numeroExterior: "123",
    numeroInterior: "A",
  });

  return (
    <StudentLayout>
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Administra tu información personal</p>
        </div>

        {/* Datos Personales Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Datos Personales</h2>
              <p className="text-sm text-gray-500 mt-1">Información básica sobre ti</p>
            </div>
            {!editandoPersonal && (
              <button
                onClick={() => setEditandoPersonal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <FaEdit className="w-4 h-4" />
                Editar
              </button>
            )}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Nombres */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                <input
                  type="text"
                  value={datosPersonales.nombres}
                  onChange={(e) => setDatosPersonales({ ...datosPersonales, nombres: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  readOnly={!editandoPersonal}
                />
              </div>

              {/* Apellidos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellido Paterno</label>
                  <input
                    type="text"
                    value={datosPersonales.apellidoPaterno}
                    onChange={(e) => setDatosPersonales({ ...datosPersonales, apellidoPaterno: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoPersonal}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellido Materno</label>
                  <input
                    type="text"
                    value={datosPersonales.apellidoMaterno}
                    onChange={(e) => setDatosPersonales({ ...datosPersonales, apellidoMaterno: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoPersonal}
                  />
                </div>
              </div>

              {/* Sexo y Fecha de Nacimiento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                  <select
                    value={datosPersonales.sexo}
                    onChange={(e) => setDatosPersonales({ ...datosPersonales, sexo: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    disabled={!editandoPersonal}
                  >
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
                  <input
                    type="date"
                    value={datosPersonales.fechaNacimiento}
                    onChange={(e) => setDatosPersonales({ ...datosPersonales, fechaNacimiento: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoPersonal}
                  />
                </div>
              </div>

              {/* CURP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CURP</label>
                <input
                  type="text"
                  value={datosPersonales.curp}
                  onChange={(e) => setDatosPersonales({ ...datosPersonales, curp: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all uppercase"
                  readOnly={!editandoPersonal}
                  maxLength={18}
                />
              </div>
            </div>

            {/* Botones */}
            {editandoPersonal && (
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditandoPersonal(false)}
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  onClick={() => setEditandoPersonal(false)}
                  className="flex items-center gap-2 bg-green-800 text-white px-6 py-2 rounded-xl hover:bg-green-900 transition-colors"
                >
                  <FaSave className="w-4 h-4" />
                  Guardar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Datos de Contacto Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Datos de Contacto</h2>
              <p className="text-sm text-gray-500 mt-1">Tu información de contacto</p>
            </div>
            {!editandoContacto && (
              <button
                onClick={() => setEditandoContacto(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <FaEdit className="w-4 h-4" />
                Editar
              </button>
            )}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Teléfono Celular y Teléfono de Casa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Celular</label>
                  <input
                    type="tel"
                    value={datosContacto.celular}
                    onChange={(e) => setDatosContacto({ ...datosContacto, celular: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoContacto}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono de Casa</label>
                  <input
                    type="tel"
                    value={datosContacto.telefonoCasa}
                    onChange={(e) => setDatosContacto({ ...datosContacto, telefonoCasa: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoContacto}
                  />
                </div>
              </div>

              {/* Correo Electrónico */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  value={datosContacto.correo}
                  onChange={(e) => setDatosContacto({ ...datosContacto, correo: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  readOnly={!editandoContacto}
                />
              </div>
            </div>

            {/* Botones */}
            {editandoContacto && (
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditandoContacto(false)}
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  onClick={() => setEditandoContacto(false)}
                  className="flex items-center gap-2 bg-green-800 text-white px-6 py-2 rounded-xl hover:bg-green-900 transition-colors"
                >
                  <FaSave className="w-4 h-4" />
                  Guardar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Datos del Domicilio Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Datos del Domicilio</h2>
              <p className="text-sm text-gray-500 mt-1">Tu dirección de residencia actual</p>
            </div>
            {!editandoDomicilio && (
              <button
                onClick={() => setEditandoDomicilio(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <FaEdit className="w-4 h-4" />
                Editar
              </button>
            )}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Código Postal y Estado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                  <input
                    type="text"
                    value={datosDomicilio.codigoPostal}
                    onChange={(e) => setDatosDomicilio({ ...datosDomicilio, codigoPostal: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoDomicilio}
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <input
                    type="text"
                    value={datosDomicilio.estado}
                    onChange={(e) => setDatosDomicilio({ ...datosDomicilio, estado: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoDomicilio}
                  />
                </div>
              </div>

              {/* Municipio y Localidad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Municipio</label>
                  <input
                    type="text"
                    value={datosDomicilio.municipio}
                    onChange={(e) => setDatosDomicilio({ ...datosDomicilio, municipio: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoDomicilio}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localidad</label>
                  <input
                    type="text"
                    value={datosDomicilio.localidad}
                    onChange={(e) => setDatosDomicilio({ ...datosDomicilio, localidad: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoDomicilio}
                  />
                </div>
              </div>

              {/* Colonia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Colonia</label>
                <input
                  type="text"
                  value={datosDomicilio.colonia}
                  onChange={(e) => setDatosDomicilio({ ...datosDomicilio, colonia: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  readOnly={!editandoDomicilio}
                />
              </div>

              {/* Calle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calle</label>
                <input
                  type="text"
                  value={datosDomicilio.calle}
                  onChange={(e) => setDatosDomicilio({ ...datosDomicilio, calle: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  readOnly={!editandoDomicilio}
                />
              </div>

              {/* Número Exterior e Interior */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número Exterior</label>
                  <input
                    type="text"
                    value={datosDomicilio.numeroExterior}
                    onChange={(e) => setDatosDomicilio({ ...datosDomicilio, numeroExterior: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoDomicilio}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número Interior</label>
                  <input
                    type="text"
                    value={datosDomicilio.numeroInterior}
                    onChange={(e) => setDatosDomicilio({ ...datosDomicilio, numeroInterior: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    readOnly={!editandoDomicilio}
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            {editandoDomicilio && (
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditandoDomicilio(false)}
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  onClick={() => setEditandoDomicilio(false)}
                  className="flex items-center gap-2 bg-green-800 text-white px-6 py-2 rounded-xl hover:bg-green-900 transition-colors"
                >
                  <FaSave className="w-4 h-4" />
                  Guardar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default PerfilEstudiante;

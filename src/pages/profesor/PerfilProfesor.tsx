import React from "react";
import ProfesorLayout from "../../components/layouts/ProfesorLayout";
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaChalkboardTeacher } from "react-icons/fa";

const PerfilProfesor: React.FC = () => {
    const profesor = {
        nombre: "Dra. María López Pérez",
        empleado: "EMP-0456",
        departamento: "Departamento de Matemáticas",
        materias: ["Cálculo I", "Álgebra Lineal"],
        correo: "maria.lopez@dgeta.edu.mx",
        telefono: "(33) 9876-5432",
        oficina: "Edificio B, despacho 204",
    };

    return (
        <ProfesorLayout>
            <div className="p-6 lg:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
                    <p className="text-gray-600">Información personal y académica</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex items-start gap-6">
                        <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center">
                            <FaUser className="text-green-600 text-4xl" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{profesor.nombre}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Empleado</p>
                                    <p className="font-medium text-gray-900">{profesor.empleado}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Departamento</p>
                                    <p className="font-medium text-gray-900">{profesor.departamento}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Correo</p>
                                    <p className="font-medium text-gray-900">{profesor.correo}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Teléfono</p>
                                    <p className="font-medium text-gray-900">{profesor.telefono}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Oficina</p>
                                    <p className="font-medium text-gray-900">{profesor.oficina}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Materias</p>
                                    <p className="font-medium text-gray-900">{profesor.materias.join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <FaChalkboardTeacher className="text-green-600 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Asignaturas</h3>
                                <p className="text-sm text-gray-600">Lista de materias que impartes</p>
                            </div>
                        </div>
                        <ul className="mt-4 list-disc list-inside text-gray-900">
                            {profesor.materias.map((m, i) => (
                                <li key={i}>{m}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FaBuilding className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Información</h3>
                                <p className="text-sm text-gray-600">Datos de contacto y ubicación</p>
                            </div>
                        </div>
                        <div className="mt-4 text-gray-900">
                            <p className="mb-2"><FaEnvelope className="inline mr-2 text-gray-500" />{profesor.correo}</p>
                            <p className="mb-2"><FaPhone className="inline mr-2 text-gray-500" />{profesor.telefono}</p>
                            <p className="mb-2"><FaBuilding className="inline mr-2 text-gray-500" />{profesor.oficina}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ProfesorLayout>
    );
};

export default PerfilProfesor;

import Header from '../components/Header'
import Sidebar from '../components/Sidebar';
import { FaSave, FaUser, FaHome, FaEnvelope, FaPhone } from "react-icons/fa";

const PerfilPage = () => {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-5xl mx-auto">
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
                            <p className="text-gray-600">Administra tu información personal</p>
                        </div>

                        {/* Profile Avatar Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="relative">
                                    <div className="w-32 h-32 bg-gradient-to-br from-green-800 to-green-900 rounded-2xl flex items-center justify-center shadow-lg">
                                        <FaUser className="w-16 h-16 text-white" />
                                    </div>
                                    <button className="absolute bottom-0 right-0 bg-white border-2 border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors shadow-sm">
                                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Usuario</h2>
                                    <p className="text-gray-600 mb-4">Estudiante</p>
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-lg">Activo</span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg">2024-2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* General Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                    <FaUser className="w-5 h-5 text-green-800" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Información General</h3>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                                        <input
                                            type="text"
                                            placeholder="Ingresa tus nombres"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Apellido Paterno</label>
                                        <input
                                            type="text"
                                            placeholder="Apellido paterno"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Apellido Materno</label>
                                        <input
                                            type="text"
                                            placeholder="Apellido materno"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                                            <option value="">Seleccionar género</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="femenino">Femenino</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">CURP</label>
                                        <input
                                            type="text"
                                            placeholder="Ingresa tu CURP"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all uppercase"
                                            maxLength={18}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-900 transition-colors shadow-sm"
                                    >
                                        <FaSave className="w-4 h-4" />
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Address Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <FaHome className="w-5 h-5 text-blue-800" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Datos del Domicilio</h3>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                                        <input
                                            type="text"
                                            placeholder="Ej: 12345"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            maxLength={5}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                                        <input
                                            type="text"
                                            placeholder="Estado de residencia"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Municipio</label>
                                        <input
                                            type="text"
                                            placeholder="Municipio o delegación"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Colonia</label>
                                        <input
                                            type="text"
                                            placeholder="Colonia o fraccionamiento"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Dirección Completa</label>
                                    <input
                                        type="text"
                                        placeholder="Calle, número exterior, número interior"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-900 transition-colors shadow-sm"
                                    >
                                        <FaSave className="w-4 h-4" />
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <FaEnvelope className="w-5 h-5 text-purple-800" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Información de Contacto</h3>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaPhone className="inline w-4 h-4 mr-1" />
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="Ej: 5512345678"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaEnvelope className="inline w-4 h-4 mr-1" />
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="correo@ejemplo.com"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-900 transition-colors shadow-sm"
                                    >
                                        <FaSave className="w-4 h-4" />
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default PerfilPage

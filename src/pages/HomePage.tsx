import { Link } from "react-router-dom";
import { FaBell, FaCog, FaBook, FaClipboardCheck, FaFileAlt, FaChartLine, FaUser } from "react-icons/fa";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-800 rounded-xl flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">DGETA</h1>
                                <p className="text-sm text-gray-500">Portal Educativo</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                <FaBell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                <FaCog className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-gray-900">Usuario</div>
                                    <div className="text-xs text-gray-500">Estudiante</div>
                                </div>
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <FaUser className="w-5 h-5 text-green-800" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido de vuelta!</h2>
                    <p className="text-gray-600">Aquí tienes un resumen de tu actividad académica</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FaBook className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">8</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Materias Activas</h3>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <FaClipboardCheck className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">95%</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Asistencia</h3>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <FaFileAlt className="w-6 h-6 text-yellow-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">3</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Tareas Pendientes</h3>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <FaChartLine className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">8.5</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Promedio General</h3>
                    </div>
                </div>

                {/* Quick Access */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Acceso Rápido</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link
                            to="/perfil"
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="relative">
                                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FaUser className="w-7 h-7 text-green-800" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Mi Perfil</h4>
                                <p className="text-sm text-gray-600">Gestiona tu información personal</p>
                            </div>
                        </Link>

                        <Link
                            to="/califications"
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="relative">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FaBook className="w-7 h-7 text-blue-800" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Calificaciones</h4>
                                <p className="text-sm text-gray-600">Consulta tus calificaciones</p>
                            </div>
                        </Link>

                        <Link
                            to="/estudiante/formularios"
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="relative">
                                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FaFileAlt className="w-7 h-7 text-purple-800" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Formularios</h4>
                                <p className="text-sm text-gray-600">Completa formularios pendientes</p>
                            </div>
                        </Link>

                        <Link
                            to="/estudiante/asistencias"
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-yellow-300 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="relative">
                                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FaClipboardCheck className="w-7 h-7 text-yellow-800" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Asistencias</h4>
                                <p className="text-sm text-gray-600">Revisa tu asistencia</p>
                            </div>
                        </Link>

                        <Link
                            to="/estudiante/mensajes"
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-red-300 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="relative">
                                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-red-800" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Mensajes</h4>
                                <p className="text-sm text-gray-600">Revisa tus mensajes</p>
                            </div>
                        </Link>

                        <Link
                            to="/estudiante/dashboard"
                            className="group bg-gradient-to-br from-green-800 to-green-900 rounded-2xl p-6 shadow-sm border border-green-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full"></div>
                            <div className="relative">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FaChartLine className="w-7 h-7 text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Dashboard Completo</h4>
                                <p className="text-sm text-green-100">Ver todas las estadísticas</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;

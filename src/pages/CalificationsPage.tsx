import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { FaBook, FaDownload, FaEye, FaChartBar } from 'react-icons/fa'

const CalificationsPage = () => {
    // Datos de ejemplo
    const calificaciones = [
        { id: 1, materia: "Matemáticas", parcial1: 8.5, parcial2: 9.0, parcial3: 8.8, final: 8.8 },
        { id: 2, materia: "Física", parcial1: 7.5, parcial2: 8.0, parcial3: 8.5, final: 8.0 },
        { id: 3, materia: "Química", parcial1: 9.0, parcial2: 9.5, parcial3: 9.0, final: 9.2 },
        { id: 4, materia: "Literatura", parcial1: 8.0, parcial2: 8.5, parcial3: 9.0, final: 8.5 },
        { id: 5, materia: "Historia", parcial1: 7.8, parcial2: 8.2, parcial3: 8.0, final: 8.0 },
    ];

    const getCalificacionColor = (calificacion: number) => {
        if (calificacion >= 9) return "text-green-700 bg-green-100";
        if (calificacion >= 8) return "text-blue-700 bg-blue-100";
        if (calificacion >= 7) return "text-yellow-700 bg-yellow-100";
        return "text-red-700 bg-red-100";
    };

    const promedio = (calificaciones.reduce((acc, cal) => acc + cal.final, 0) / calificaciones.length).toFixed(2);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Calificaciones</h1>
                            <p className="text-gray-600">Consulta tus calificaciones por materia y periodo</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                        <FaBook className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">{calificaciones.length}</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Materias Totales</h3>
                            </div>

                            <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FaChartBar className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-2xl font-bold text-white">{promedio}</span>
                                </div>
                                <h3 className="text-sm font-medium text-green-100">Promedio General</h3>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">{calificaciones.filter(c => c.final >= 8).length}</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Aprobadas +8</h3>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">3</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Parcial Actual</h3>
                            </div>
                        </div>

                        {/* Califications Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Historial de Calificaciones</h2>
                                    <p className="text-sm text-gray-600 mt-1">Periodo 2024-2025</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded-xl hover:bg-green-900 transition-colors shadow-sm">
                                    <FaDownload className="w-4 h-4" />
                                    Descargar
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Materia</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Parcial 1</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Parcial 2</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Parcial 3</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Final</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {calificaciones.map((cal) => (
                                            <tr key={cal.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                            <FaBook className="w-5 h-5 text-green-800" />
                                                        </div>
                                                        <span className="font-medium text-gray-900">{cal.materia}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-semibold ${getCalificacionColor(cal.parcial1)}`}>
                                                        {cal.parcial1}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-semibold ${getCalificacionColor(cal.parcial2)}`}>
                                                        {cal.parcial2}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-semibold ${getCalificacionColor(cal.parcial3)}`}>
                                                        {cal.parcial3}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex px-4 py-2 rounded-lg text-base font-bold ${getCalificacionColor(cal.final)}`}>
                                                        {cal.final}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver detalles">
                                                            <FaEye className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Descargar">
                                                            <FaDownload className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Table Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                        Mostrando <span className="font-semibold text-gray-900">{calificaciones.length}</span> materias
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Promedio general:</span>
                                        <span className="px-4 py-2 bg-green-800 text-white rounded-lg text-lg font-bold">
                                            {promedio}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CalificationsPage

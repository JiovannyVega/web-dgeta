import { FaBell, FaCog, FaSignOutAlt, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

interface HeaderProps {
    userName?: string;
    userRole?: string;
    onLogout?: () => void;
}

const Header = ({ userName = "Usuario", userRole = "Estudiante", onLogout }: HeaderProps) => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Brand */}
                    <Link to="/" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-green-800 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 group-hover:text-green-800 transition-colors">DGETA</h1>
                            <p className="text-sm text-gray-500">Portal Educativo</p>
                        </div>
                    </Link>

                    {/* Search Bar - Hidden on mobile */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar materias, tareas..."
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Notifications */}
                        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <FaBell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Settings */}
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <FaCog className="w-5 h-5" />
                        </button>

                        {/* Divider */}
                        <div className="h-8 w-px bg-gray-200"></div>

                        {/* User Profile */}
                        <Link to="/perfil" className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-semibold text-gray-900">{userName}</div>
                                <div className="text-xs text-gray-500">{userRole}</div>
                            </div>
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <FaUser className="w-5 h-5 text-green-800" />
                            </div>
                        </Link>

                        {/* Logout */}
                        <button
                            onClick={onLogout}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cerrar sesión"
                        >
                            <FaSignOutAlt className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search - Shown on small screens */}
                <div className="md:hidden mt-4">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

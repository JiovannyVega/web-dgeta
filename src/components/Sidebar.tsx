import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import type { IconType } from "react-icons";

export interface MenuItem {
    path: string;
    icon: IconType;
    label: string;
}

interface SidebarProps {
    userName?: string;
    userRole?: string;
    menuItems?: MenuItem[];
}

const Sidebar = ({ userName = "Usuario", userRole = "Estudiante", menuItems = [] }: SidebarProps) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-green-800 text-white rounded-lg shadow-lg"
            >
                {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen
                    w-72 bg-white border-r border-gray-200 shadow-lg
                    transform transition-transform duration-300 ease-in-out z-40
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <FaUser className="w-6 h-6 text-green-800" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{userName}</h3>
                                <p className="text-sm text-gray-500">{userRole}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);

                                return (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`
                                                flex items-center gap-3 px-4 py-3 rounded-xl
                                                transition-all duration-200 group
                                                ${active
                                                    ? 'bg-green-800 text-white shadow-sm'
                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-800'
                                                }
                                            `}
                                        >
                                            <Icon className={`
                                                w-5 h-5 transition-transform
                                                ${active ? 'scale-110' : 'group-hover:scale-110'}
                                            `} />
                                            <span className="font-medium">{item.label}</span>
                                            {active && (
                                                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                            <h4 className="text-sm font-bold text-green-900 mb-1">¿Necesitas ayuda?</h4>
                            <p className="text-xs text-green-700 mb-3">Contacta a soporte técnico</p>
                            <button className="w-full bg-green-800 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-900 transition-colors">
                                Contactar
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar

import React from "react";
import type { ReactNode } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import type { MenuItem } from "../Sidebar";
import {
    FaChartLine,
    FaStar,
    FaEnvelope,
    FaUser,
    FaUsers,
    FaExclamationTriangle,
    FaGraduationCap,
    FaChartBar
} from "../../config/menuIcons";

interface ProfesorLayoutProps {
    children: ReactNode;
}

const ProfesorLayout: React.FC<ProfesorLayoutProps> = ({ children }) => {
    const profesorMenuItems: MenuItem[] = [
        { path: "/profesor/dashboard", icon: FaChartLine, label: "Dashboard" },
        { path: "/profesor/misgrupos", icon: FaUsers, label: "Mis Grupos" },
        { path: "/profesor/calificaciones", icon: FaStar, label: "Calificaciones" },
        { path: "/profesor/incidencias", icon: FaExclamationTriangle, label: "Incidencias" },
        { path: "/profesor/tutorias", icon: FaGraduationCap, label: "Tutorías" },
        { path: "/profesor/mensajes", icon: FaEnvelope, label: "Mensajes" },
        { path: "/profesor/prediccion", icon: FaChartBar, label: "Predicción" },
        { path: "/profesor/perfil", icon: FaUser, label: "Perfil" },
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Sidebar
                userName="Prof. García"
                userRole="Profesor"
                menuItems={profesorMenuItems}
            />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default ProfesorLayout;

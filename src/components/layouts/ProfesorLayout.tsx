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
        { path: "/profesor/dashboard", icon: FaChartLine, label: "Inicio" },
        { path: "/profesor/misgrupos", icon: FaUsers, label: "Mis grupos" },
        { path: "/profesor/calificaciones", icon: FaStar, label: "Calificaciones" },
        { path: "/profesor/incidencias", icon: FaExclamationTriangle, label: "Incidencias" },
        { path: "/profesor/tutorias", icon: FaGraduationCap, label: "Tutorías" },
        { path: "/profesor/formularios", icon: FaGraduationCap, label: "Formularios" },
        { path: "/profesor/mensajes", icon: FaEnvelope, label: "Mensajes" },
        { path: "/profesor/prediccion", icon: FaChartBar, label: "Seguimiento" },
        { path: "/profesor/perfil", icon: FaUser, label: "Mi perfil" },
    ];

    return (
        <div className="app-shell">
            <Sidebar
                userName="Dra. María López Pérez"
                userRole="Tutor"
                menuItems={profesorMenuItems}
            />
            <div className="min-w-0 flex-1 flex flex-col">
                <Header />
                <main id="page-content" tabIndex={-1} className="app-content focus:outline-none">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default ProfesorLayout;

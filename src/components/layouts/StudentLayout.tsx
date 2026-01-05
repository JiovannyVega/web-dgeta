import React from "react";
import type { ReactNode } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import type { MenuItem } from "../Sidebar";
import {
    FaChartLine,
    FaStar,
    FaEnvelope,
    FaClipboardCheck,
    FaFileAlt,
    FaUser
} from "../../config/menuIcons";

interface StudentLayoutProps {
    children: ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
    const studentMenuItems: MenuItem[] = [
        { path: "/estudiante/dashboard", icon: FaChartLine, label: "Dashboard" },
        { path: "/estudiante/calificaciones", icon: FaStar, label: "Calificaciones" },
        { path: "/estudiante/asistencias", icon: FaClipboardCheck, label: "Asistencias" },
        { path: "/estudiante/formularios", icon: FaFileAlt, label: "Formularios" },
        { path: "/estudiante/mensajes", icon: FaEnvelope, label: "Mensajes" },
        { path: "/estudiante/perfil", icon: FaUser, label: "Mi Perfil" },
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Sidebar
                userName="Roberto Rangel"
                userRole="Estudiante"
                menuItems={studentMenuItems}
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

export default StudentLayout;

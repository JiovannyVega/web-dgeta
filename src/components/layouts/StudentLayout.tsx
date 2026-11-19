import React from "react";
import type { ReactNode } from "react";
import { getStudentSummary } from "../../data/localRecords";
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
        { path: "/estudiante/dashboard", icon: FaChartLine, label: "Inicio" },
        { path: "/estudiante/calificaciones", icon: FaStar, label: "Calificaciones" },
        { path: "/estudiante/asistencias", icon: FaClipboardCheck, label: "Inasistencias" },
        { path: "/estudiante/formularios", icon: FaFileAlt, label: "Formularios" },
        { path: "/estudiante/mensajes", icon: FaEnvelope, label: "Mensajes" },
        {
            path: "/estudiante/perfil", icon: FaUser, label: "Mi perfil",
            children: [
                { path: "/estudiante/perfil/personales", label: "Datos personales" },
                { path: "/estudiante/perfil/academicos", label: "Datos académicos" },
                { path: "/estudiante/perfil/contacto", label: "Datos de contacto" },
                { path: "/estudiante/perfil/domicilio", label: "Datos del domicilio" },
            ],
        },
    ];

    return (
        <div className="app-shell">
            <Sidebar
                userName={getStudentSummary().nombre || "Alumno"}
                userRole="Alumno"
                menuItems={studentMenuItems}
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

export default StudentLayout;

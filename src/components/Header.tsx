import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

export default function Header() {
  const tutor = useLocation().pathname.startsWith('/profesor');
  return <header className="app-header">
    <a href="#page-content" className="skip-link">Saltar al contenido</a>
    <div className="flex min-h-18 items-center justify-between gap-3 py-3 pl-20 pr-4 lg:px-7">
      <span className="text-lg font-semibold tracking-tight text-green-900 lg:hidden">DGETA</span>
      <span className="hidden text-sm text-gray-600 lg:inline">{tutor ? 'Portal del tutor' : 'Portal del alumno'}</span>
      <Link to="/" replace className="ui-session-link"><FaSignOutAlt aria-hidden="true" className="h-4 w-4" /><span>Cerrar sesión</span></Link>
    </div>
  </header>;
}

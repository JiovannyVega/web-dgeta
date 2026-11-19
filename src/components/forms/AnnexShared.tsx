import { Link } from 'react-router-dom';
import type { StudentSummary } from '../../data/localRecords';

export const primary = 'ui-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-green-800 bg-green-800 px-4 py-2.5 text-center text-sm font-semibold leading-5 text-white hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-600';
export const secondary = 'ui-secondary inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-green-800 bg-white px-4 py-2.5 text-center text-sm font-semibold leading-5 text-green-800 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-600';
export const input = 'w-full min-h-12 scroll-mt-24 scroll-mb-28 rounded-lg border border-gray-500 bg-white px-3 py-2.5 text-base text-gray-900 focus:outline-2 focus:outline-offset-2 focus:outline-green-800';

export function StudentIdentity({ student, editable = false }: { student: StudentSummary; editable?: boolean }) {
  return <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6" aria-label="Datos personales y académicos del alumno">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-lg font-semibold text-gray-900">Datos del alumno</h2>
      {editable && <Link to="/estudiante/perfil/personales" className={secondary}>Actualizar datos</Link>}
    </div>
    <p className="mb-4 text-sm text-gray-600">Tus datos personales y académicos se agregarán automáticamente; no necesitas capturarlos otra vez.</p>
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries({ Nombre: student.nombre, 'No. de control': student.numeroControl, 'Especialidad/Carrera': student.carrera, Semestre: student.semestre, Grupo: student.grupo, Turno: student.turno, Tutor: student.tutor }).map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-sm text-gray-600">{label}</dt><dd className="mt-1 break-words font-medium text-gray-900">{value || 'Sin registrar'}</dd></div>)}
    </dl>
  </section>;
}

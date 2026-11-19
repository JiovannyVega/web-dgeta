import { FaChevronRight } from 'react-icons/fa';
import { PageHeading, Summary } from '../../components/PageUI';
import StudentLayout from '../../components/layouts/StudentLayout';
import { displayDate } from '../../data/localRecords';
import { attendanceSubjects, buildAttendanceReport } from '../../data/studentAttendance';

const percent = new Intl.NumberFormat('es-MX', { style: 'percent', maximumFractionDigits: 1 });
const states = {
  absence: { label: 'Falta', style: 'bg-red-100 text-red-800' },
  late: { label: 'Retardo', style: 'bg-amber-100 text-amber-900' },
  converted: { label: 'Falta por retardos', style: 'bg-red-100 text-red-800' },
};

export default function Asistencias() {
  const reports = attendanceSubjects.map(buildAttendanceReport);
  const totalClasses = reports.reduce((sum, report) => sum + (report.classes ?? 0), 0);
  const totalAbsences = reports.reduce((sum, report) => sum + report.totalAbsences, 0);
  const totalConverted = reports.reduce((sum, report) => sum + report.converted, 0);
  const totalLates = reports.reduce((sum, report) => sum + report.lates, 0);
  const hasGeneralRate = totalClasses > 0 && reports.every(report =>
    report.classes !== undefined && report.classes >= report.incidents.length);

  return (
    <StudentLayout>
      <div className="ui-page">
        <PageHeading title="Inasistencias" description="Consulta tus faltas y retardos por materia." />
        <Summary items={[
          { label: 'Inasistencia general', value: hasGeneralRate ? percent.format(totalAbsences / totalClasses) : 'Pendiente' },
          { label: 'Faltas totales', value: totalAbsences },
          { label: 'Retardos registrados', value: totalLates },
          { label: 'Faltas por retardos', value: totalConverted },
        ]} />
        <p className="mb-6 text-sm text-gray-700">Cada 3 retardos en la misma materia cuentan como una falta.</p>

        <section aria-labelledby="attendance-by-subject" className="space-y-3">
          <h2 id="attendance-by-subject" className="text-lg font-semibold">Por materia</h2>
          {reports.map(report => (
            <details key={report.id} className="group overflow-hidden rounded-xl border border-gray-200 bg-white">
              <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 rounded-xl px-5 py-4 font-semibold text-gray-900 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
                <FaChevronRight aria-hidden="true" className="shrink-0 text-sm text-green-800 group-open:rotate-90" />
                {report.name}
              </summary>
              {report.rows.length === 0 ? (
                <p className="border-t border-gray-200 p-5 text-sm text-gray-600">No hay registros disponibles para esta materia.</p>
              ) : (
                <table className="w-full border-t border-gray-200 text-left text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th scope="col" className="px-4 py-3">Fecha</th>
                      <th scope="col" className="px-4 py-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {report.rows.map(row => (
                      <tr key={row.id}>
                        <td className="px-4 py-3"><time dateTime={row.date}>{displayDate(row.date)}</time></td>
                        <td className="px-4 py-3">
                          <span className={`inline-block rounded-lg px-2 py-1 font-semibold ${states[row.type].style}`}>
                            {states[row.type].label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </details>
          ))}
        </section>
      </div>
    </StudentLayout>
  );
}

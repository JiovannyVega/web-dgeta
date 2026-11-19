import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaCheckCircle, FaClock, FaPen } from 'react-icons/fa';
import StudentLayout from '../../components/layouts/StudentLayout';
import { primary, secondary } from '../../components/forms/AnnexShared';
import { displayDate } from '../../data/localRecords';
import { allStudentForms, buildFormSteps } from '../../data/studentForms';
import { getFormStore } from '../../data/studentFormStorage';

type Status = 'all' | 'pending' | 'draft' | 'completed';
export default function Formularios() {
  const [filter, setFilter] = useState<Status>('all');
  const store = getFormStore();
  const forms = allStudentForms.map(form => {
    const record = store.records[form.id];
    return { form, record, status: record?.submittedAt ? 'completed' : record ? 'draft' : 'pending' };
  });
  const visible = forms.filter(item => filter === 'all' || item.status === filter);
  const filters: { id: Status; label: string }[] = [{ id: 'all', label: 'Todos' }, { id: 'pending', label: 'Pendientes' }, { id: 'draft', label: 'En borrador' }, { id: 'completed', label: 'Finalizados' }];
  return <StudentLayout><div className="ui-page space-y-6">
    <header><h1 className="text-2xl font-semibold text-gray-900">Formularios</h1><p className="mt-2 max-w-2xl leading-7 text-gray-600">Responde los pendientes, retoma un borrador o consulta tus respuestas.</p></header>

    <fieldset><legend className="sr-only">Filtrar formularios por estado</legend><div className="inline-flex max-w-full flex-wrap gap-1 rounded-xl bg-gray-200/60 p-1">{filters.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${filter === item.id ? 'bg-white text-green-900 ' : 'text-gray-700 hover:bg-white/70'}`}>{item.label} <span className="tabular-nums">({item.id === 'all' ? forms.length : forms.filter(form => form.status === item.id).length})</span></button>)}</div></fieldset>
    <p role="status" aria-live="polite" className="text-sm text-gray-600">Se muestran {visible.length} de {forms.length} formularios.</p>
    {!visible.length && <div className="rounded-xl border border-gray-200 bg-white p-6"><h2 className="font-semibold text-gray-900">No hay formularios en este estado</h2><button type="button" className={`${secondary} mt-4`} onClick={() => setFilter('all')}>Ver todos los formularios</button></div>}
    <div className="form-register">
      {visible.map(({ form, record, status }) => {
        const label = status === 'completed' ? 'Finalizado' : status === 'draft' ? 'En borrador' : 'Pendiente';
        const Icon = status === 'completed' ? FaCheckCircle : status === 'draft' ? FaPen : FaClock;
        const color = status === 'completed' ? 'bg-green-100 text-green-950' : status === 'draft' ? 'bg-amber-100 text-amber-950' : 'bg-gray-100 text-gray-800';
        const action = status === 'completed' ? 'Consultar respuestas' : status === 'draft' ? 'Continuar formulario' : 'Ver y comenzar';
        return <article key={form.id} aria-labelledby={`form-title-${form.id}`} className="form-register-item flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <FaClipboardList className="hidden h-6 w-6 shrink-0 text-green-800 sm:block" aria-hidden="true" />
          <div className="min-w-0 flex-1">

          <h2 id={`form-title-${form.id}`} className="text-lg font-semibold leading-6 text-gray-900">{form.title}</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">{form.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3"><span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${color}`}><Icon className="h-3 w-3 shrink-0" aria-hidden="true" />{label}</span><span className="text-sm text-gray-600">{buildFormSteps(form).length} apartados</span></div>
          {record?.savedAt && <p className="mt-2 text-sm leading-6 text-gray-600">{record.submittedAt ? 'Finalizado' : 'Último borrador'}: {displayDate(record.savedAt)}.</p>}
          </div>
          <Link aria-label={`${action}: ${form.title}`} to={`/estudiante/formulario/${form.id}`} className={`${status === 'draft' ? primary : secondary} w-full shrink-0 sm:w-44`}>{action}</Link>
        </article>;
      })}
    </div>
  </div></StudentLayout>;
}

import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import ProfesorLayout from '../../components/layouts/ProfesorLayout';
import { StudentIdentity, primary, secondary, input } from '../../components/forms/AnnexShared';
import { ANNEX9_KEY, displayDate, getStudentSummary, readLocal, today, writeLocal } from '../../data/localRecords';
import { getFormStore } from '../../data/studentFormStorage';
import { scoreAnnex6 } from '../../data/annexes';
import type { Annex9Record } from '../../data/annexes';

const emptyDraft = () => ({ tutor: getStudentSummary().tutor, date: today(), situation: '', attention: '', results: '', observations: '' });

export default function FormulariosProfesor() {
  const [records, setRecords] = useState<Annex9Record[]>(() => readLocal(ANNEX9_KEY, []));
  const [draft, setDraft] = useState(emptyDraft);
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const student = getStudentSummary();
  const questionnaire = getFormStore().records['anexo-6'];
  const result = questionnaire?.submittedAt ? scoreAnnex6(questionnaire.answers) : null;
  const current = records.find(record => record.id === selected);
  const fieldClass = (key: string) => fieldErrors[key] ? input.replace('border-gray-500', 'border-red-600') : input;
  const updateField = (key: keyof ReturnType<typeof emptyDraft>, value: string) => {
    setDraft(previous => ({ ...previous, [key]: value }));
    setFieldErrors(previous => { const next = { ...previous }; if (value.trim() && (key !== 'date' || value <= today())) delete next[key]; return next; });
  };

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const missing: Record<string, string> = {};
    for (const key of ['tutor', 'situation', 'attention'] as const) if (!draft[key].trim()) missing[key] = 'Completa esta respuesta para continuar.';
    if (!draft.date || draft.date > today()) missing.date = 'Indica una fecha válida, sin fechas futuras.';
    setFieldErrors(missing);
    if (Object.keys(missing).length) {
      setError('');
      requestAnimationFrame(() => document.getElementById('session-' + Object.keys(missing)[0])?.focus()); return;
    }
    try {
      const record: Annex9Record = {
        ...Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()])) as ReturnType<typeof emptyDraft>,
        id: crypto.randomUUID(), student: getStudentSummary(), savedAt: new Date().toISOString(),
      };
      const latest = readLocal<Annex9Record[]>(ANNEX9_KEY, []);
      const next = [record, ...latest];
      writeLocal(ANNEX9_KEY, next); setRecords(next); setSelected(record.id); setCreating(false);
      setMessage('Ficha guardada.'); setError(''); setFieldErrors({});
      requestAnimationFrame(() => headingRef.current?.focus());
    } catch {
      setError('No fue posible guardar la ficha. Los datos siguen en pantalla; inténtalo de nuevo.');
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  };

  return <ProfesorLayout><div className="ui-page space-y-6">
    <header><h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-gray-900 focus:outline-none">Formularios de tutoría</h1><p className="mt-2 text-gray-600">Consulta los cuestionarios y registra la atención individual.</p></header>

    <StudentIdentity student={student} />
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <p className="text-sm font-semibold text-green-800">Valoración e interpretación</p>
      <h2 className="mt-2 text-xl font-semibold">Cuestionario de perfil personal y académico</h2>
      {result && questionnaire ? <div className="mt-4 space-y-3">
        <p className="text-sm text-gray-600">Alumno al aplicar: {questionnaire.student?.nombre || student.nombre} · Fecha: {displayDate(questionnaire.date)}</p>
        <p className="text-lg font-semibold text-green-900">{result.score} de 15 puntos · Riesgo {result.level.toLowerCase()}</p>
        <p className="leading-7 text-gray-700">{result.guidance}</p>
        <p className="text-sm leading-6 text-gray-600">Interpretación del instrumento original; requiere revisión y acompañamiento del tutor. No sustituye la valoración individual del caso.</p>
        <details className="rounded-lg border border-gray-200 p-4"><summary className="cursor-pointer font-medium text-green-900 focus-visible:outline-2 focus-visible:outline-green-800">Ver criterio de puntuación</summary><p className="mt-3 text-sm leading-6 text-gray-700">Se suma un punto por cada coincidencia: 1F, 2V, 3F, 4F, 5F, 6F, 7F, 8F, 9V, 10F, 11F, 12V, 13V, 14V, 15V. Bajo: 0–2; moderado: 3–5; alto: 6–10; muy alto: 11–15.</p></details>
      </div> : <p className="mt-4 text-gray-600">El alumno aún no ha finalizado el cuestionario .</p>}
    </section>

    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold text-green-800">Atención individual</p><h2 className="mt-2 text-xl font-semibold">Ficha de atención de tutoría individual</h2></div>{!creating && <button type="button" className={primary} onClick={() => { setCreating(true); setSelected(null); setDraft(emptyDraft()); setError(''); setFieldErrors({}); setMessage(''); }}>Registrar atención</button>}</div>
      <div role="status" aria-live="polite">{message && <p className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">{message}</p>}</div>
      {error && <div ref={errorRef} tabIndex={-1} role="alert" className="mt-4 text-sm leading-6 text-red-800">{error}</div>}
      {creating && <form onSubmit={save} noValidate className="mt-6 space-y-6">
        <p className="text-sm text-gray-600">Los campos marcados con * son obligatorios. La identidad y los datos académicos del alumno se agregarán automáticamente al guardar.</p>
        <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="session-tutor" className={`mb-2 block text-sm font-medium ${fieldErrors.tutor ? 'text-red-800' : 'text-gray-900'}`}>Nombre del tutor *</label><input id="session-tutor" required maxLength={150} value={draft.tutor} onChange={event => updateField('tutor', event.target.value)} aria-invalid={Boolean(fieldErrors.tutor)} aria-describedby={fieldErrors.tutor ? 'session-tutor-error' : undefined} className={fieldClass('tutor')} />{fieldErrors.tutor && <p id="session-tutor-error" className="mt-2 text-sm font-medium text-red-800">{fieldErrors.tutor}</p>}</div><div><label htmlFor="session-date" className={`mb-2 block text-sm font-medium ${fieldErrors.date ? 'text-red-800' : 'text-gray-900'}`}>Fecha de atención *</label><input id="session-date" type="date" max={today()} required value={draft.date} onChange={event => updateField('date', event.target.value)} aria-invalid={Boolean(fieldErrors.date)} aria-describedby={fieldErrors.date ? 'session-date-error' : undefined} className={fieldClass('date')} />{fieldErrors.date && <p id="session-date-error" className="mt-2 text-sm font-medium text-red-800">{fieldErrors.date}</p>}</div></div>
        {([
          ['situation', 'Situación presentada', true, 'Describe la situación por la que se realiza la tutoría.'],
          ['attention', 'Atención otorgada', true, 'Describe la atención que se brindó al estudiante.'],
          ['results', 'Resultados obtenidos y seguimiento del caso, por parte del tutor', false, 'Registra los resultados y el seguimiento del caso.'],
          ['observations', 'Observaciones', false, 'Indica si el estudiante buscó apoyo o un docente recomendó la tutoría; señala si el caso fue canalizado con otra persona o instancia.'],
        ] as const).map(([key, label, required, hint]) => <div key={key}><label htmlFor={`session-${key}`} className={`mb-2 block font-medium ${fieldErrors[key] ? 'text-red-800' : 'text-gray-900'}`}>{label}{required ? ' *' : ' (opcional)'}</label><textarea id={`session-${key}`} required={required} rows={4} maxLength={10000} value={draft[key]} onChange={event => updateField(key, event.target.value)} aria-invalid={Boolean(fieldErrors[key])} aria-describedby={`session-${key}-hint${fieldErrors[key] ? ` session-${key}-error` : ''}`} className={`${fieldClass(key)} resize-y`} /><p id={`session-${key}-hint`} className="mt-2 text-sm leading-6 text-gray-600">{hint}</p>{fieldErrors[key] && <p id={`session-${key}-error`} className="mt-2 text-sm font-medium text-red-800">{fieldErrors[key]}</p>}</div>)}
        <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-5"><button type="button" className={secondary} onClick={() => { setCreating(false); setError(''); setFieldErrors({}); setMessage('Edición cancelada. No se guardó una nueva ficha.'); }}>Cancelar</button><button type="submit" className={primary}>Guardar ficha</button></div>
      </form>}
      {!creating && <div className="mt-6 space-y-3">{records.length === 0 ? <p className="text-gray-600">Aún no hay fichas registradas. Cada atención puede guardarse como una ficha independiente.</p> : records.map(record => <button type="button" key={record.id} onClick={() => setSelected(record.id)} aria-expanded={selected === record.id} className={`${secondary} w-full justify-between text-left`}><span>{displayDate(record.date)} · {record.student.nombre}</span><span>Consultar</span></button>)}</div>}
      {!creating && current && <article className="mt-6 rounded-xl border border-gray-300 bg-gray-50 p-5">
        <h3 className="text-lg font-semibold">Atención del {displayDate(current.date)}</h3><p className="mt-2 text-sm text-gray-700">Tutor: {current.tutor}</p>
        <p className="mt-2 text-sm text-gray-600">Alumno: {current.student.nombre} · Grupo: {current.student.grupo || 'Sin registrar'} · Carrera: {current.student.carrera || 'Sin registrar'} · Turno: {current.student.turno || 'Sin registrar'}</p>
        <dl className="mt-5 space-y-5">{Object.entries({ 'Situación presentada': current.situation, 'Atención otorgada': current.attention, 'Resultados obtenidos y seguimiento del caso': current.results, Observaciones: current.observations }).map(([label, value]) => <div key={label}><dt className="font-semibold text-gray-900">{label}</dt><dd className="mt-2 whitespace-pre-wrap break-words leading-7 text-gray-700">{value || 'Sin observaciones registradas'}</dd></div>)}</dl>
      </article>}
    </section>
  </div></ProfesorLayout>;
}

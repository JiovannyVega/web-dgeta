import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaChevronDown, FaClipboardList } from 'react-icons/fa';
import { initialData } from '../../data/profile';
import { displayDate, getStudentSummary, PROFILE_KEY, readLocal } from '../../data/localRecords';
import { formInitialAnswers, getFormStore, saveStudentForm } from '../../data/studentFormStorage';
import type { StudentFormRecord } from '../../data/studentFormStorage';
import { buildFormSteps, hasAnswer, isVisible, scoreLearning, validateQuestions } from '../../data/studentForms';
import type { FormAnswers, StudentForm } from '../../data/studentForms';
import { StudentIdentity, primary, secondary } from '../../components/forms/AnnexShared';
import StudentQuestion, { QuestionAnswer } from '../../components/forms/StudentQuestion';
import FormExitDialog from '../../components/forms/FormExitDialog';

export function LearningResult({ answers }: { answers: FormAnswers }) {
  const result = scoreLearning(answers);
  return <section className="rounded-xl border border-green-300 bg-green-50 p-5" aria-label="Resultado del test de estilos de aprendizaje">
    <h2 className="text-lg font-semibold text-green-950">Hoja de respuestas · Resultado</h2>
    <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">{result.names.map((name, i) => <div key={name}><dt className="text-sm font-medium text-green-900">{name}</dt><dd className="mt-1 text-2xl font-bold text-green-950">{result.scores[i]} <span className="text-sm font-normal">/ 24 puntos</span></dd></div>)}</dl>
    <p className="mt-4 font-semibold text-green-950">{result.dominant.length > 1 ? 'Empate entre' : 'Mayor puntaje en'}: {result.dominant.join(', ')}.</p>
    <details className="mt-4 rounded-lg border border-green-300 bg-white p-4"><summary className="min-h-11 cursor-pointer font-medium text-green-900 focus-visible:outline-2 focus-visible:outline-green-800">Consultar hoja de respuestas por reactivo</summary>
      <div className="mt-4 overflow-x-auto"><table className="w-full min-w-80 border-collapse text-left text-sm"><caption className="mb-3 text-left text-gray-700">Puntuación de cada respuesta: Siempre = 2, Algunas veces = 1, Muy rara vez = 0.</caption><thead><tr>{['Reactivo', ...result.names].map(name => <th key={name} scope="col" className="border border-gray-300 bg-gray-50 p-3 font-semibold">{name}</th>)}</tr></thead>
        <tbody>{Array.from({ length: 12 }, (_, index) => <tr key={index}><th scope="row" className="border border-gray-300 p-3 font-medium">{index + 1}</th>{['visual', 'auditivo', 'sensacion'].map(prefix => <td key={prefix} className="border border-gray-300 p-3">{String(answers[`${prefix}${index + 1}`])}</td>)}</tr>)}</tbody>
        <tfoot><tr><th scope="row" className="border border-gray-300 bg-green-50 p-3">Total</th>{result.scores.map((score, index) => <td key={index} className="border border-gray-300 bg-green-50 p-3 font-bold">{score}</td>)}</tr></tfoot>
      </table></div>
    </details>
    <p className="mt-2 text-sm leading-6 text-green-950">Se aplica la suma indicada en el instrumento. Este resultado describe las respuestas al test; no determina tu capacidad ni limita cómo puedes aprender.</p>
  </section>;
}

function ProfileInformation({ profile }: { profile: typeof initialData }) {
  const p = profile.personales;
  const c = profile.contacto;
  const d = profile.domicilio;
  const items = {
    CURP: p.curp, Sexo: p.sexo, 'Fecha de nacimiento': p.fechaNacimiento,
    Domicilio: [d.calle, d.numeroExterior, d.numeroInterior ? `Int. ${d.numeroInterior}` : '', d.colonia, d.localidad, d.municipio, d.estado, d.codigoPostal].filter(Boolean).join(', '),
    'Teléfono celular': c.celular, 'Teléfono de casa': c.telefonoCasa, 'Correo electrónico': c.correo,
    'Familiar para emergencias': [c.emergenciaNombre, c.emergenciaApellidoPaterno, c.emergenciaApellidoMaterno].filter(Boolean).join(' '),
    'Teléfono del familiar': c.emergenciaCelular, Parentesco: c.emergenciaParentesco,
  };
  return <details className="rounded-xl border border-gray-200 bg-white p-5"><summary className="min-h-11 cursor-pointer font-semibold text-green-900 focus-visible:outline-2 focus-visible:outline-green-800">Datos personales, de contacto y domicilio</summary>
    <dl className="mt-4 grid gap-4 sm:grid-cols-2">{Object.entries(items).map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-sm text-gray-600">{label}</dt><dd className="mt-1 break-words text-gray-900">{value || 'Sin registrar'}</dd></div>)}</dl>
  </details>;
}

export default function FormularioAlumno({ definition }: { definition: StudentForm }) {
  const navigate = useNavigate();
  const [record, setRecord] = useState<StudentFormRecord | undefined>(() => getFormStore().records[definition.id]);
  const [answers, setAnswers] = useState(() => formInitialAnswers(definition));
  const steps = buildFormSteps(definition);
  const [page, setPage] = useState(() => Math.max(0, Math.min(record?.step ?? 0, steps.length - 1)));
  const [phase, setPhase] = useState<'intro' | 'questions' | 'review'>('intro');
  const [returnToReview, setReturnToReview] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [exitPath, setExitPath] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(answers));
  const allQuestions = definition.sections.flatMap(section => section.questions);
  const current = steps[page];
  const submitted = Boolean(record?.submittedAt);
  const dirty = !submitted && JSON.stringify(answers) !== savedSnapshot;
  const student = record?.submittedAt && record.student ? record.student : getStudentSummary();
  const profile = record?.submittedAt && record.profile ? record.profile : readLocal(PROFILE_KEY, initialData);
  const active = allQuestions.filter(q => isVisible(q, answers, allQuestions));
  const answered = active.filter(q => hasAnswer(answers[q.key])).length;
  const availableSteps = steps.map((step, index) => !step.questions.length || step.questions.some(q => isVisible(q, answers, allQuestions)) ? index : -1).filter(index => index >= 0);
  const position = Math.max(0, availableSteps.indexOf(page));
  const learning = getFormStore().records['estilos-aprendizaje'];
  const savedTime = record?.savedAt ? new Intl.DateTimeFormat('es-MX', { hour: '2-digit', minute: '2-digit' }).format(new Date(record.savedAt)) : '';

  useEffect(() => {
    const previous = document.title;
    return () => { document.title = previous; };
  }, []);
  useEffect(() => {
    document.title = `${Object.keys(errors).length ? 'Error: ' : ''}${submitted ? 'Entrega guardada' : phase === 'intro' ? 'Antes de comenzar' : phase === 'review' ? 'Revisa tus respuestas' : `Paso ${position + 1} de ${availableSteps.length + 1}: ${current.title}`} · ${definition.title} · DGETA`;
  }, [errors, submitted, phase, position, availableSteps.length, current.title, definition.title]);
  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    const guardLinks = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || (url.pathname === window.location.pathname && url.search === window.location.search)) return;
      event.preventDefault(); event.stopPropagation(); setExitPath(url.pathname + url.search + url.hash);
    };
    window.addEventListener('beforeunload', beforeUnload);
    document.addEventListener('click', guardLinks, true);
    return () => { window.removeEventListener('beforeunload', beforeUnload); document.removeEventListener('click', guardLinks, true); };
  }, [dirty]);

  const showErrors = (next: Record<string, string>) => { setErrors(next); requestAnimationFrame(() => focusError(Object.keys(next)[0])); };
  const saveDraft = (step = page, announce = true) => {
    try {
      const next = saveStudentForm(definition, answers, false, step);
      setRecord(next); setSavedSnapshot(JSON.stringify(answers)); setErrors({});
      if (announce) setMessage('Borrador guardado. Puedes continuar después.');
      return true;
    } catch (error) { showErrors({ storage: error instanceof Error && error.message.startsWith('Este formulario') ? error.message : 'No se pudo guardar el borrador. Tus respuestas siguen en pantalla. Revisa el espacio del navegador e inténtalo de nuevo.' }); return false; }
  };
  const moveFocus = () => requestAnimationFrame(() => (sectionRef.current ?? headingRef.current)?.focus());
  const begin = () => {
    setErrors({});
    if (returnToReview) { setPhase('review'); moveFocus(); return; }
    setPage(availableSteps.includes(page) ? page : availableSteps[0]); setPhase('questions'); moveFocus();
  };
  const review = () => {
    const next = validateQuestions(allQuestions, answers, allQuestions);
    if (Object.keys(next).length) { showErrors(next); return; }
    if (!saveDraft(page, false)) return;
    setPhase('review'); setReturnToReview(false); setConfirmed(false); setMessage('Borrador guardado. Revisa las respuestas antes de finalizar.'); moveFocus();
  };
  const go = (target: number, validate: boolean) => {
    const next = validate ? validateQuestions(current.questions, answers, allQuestions) : {};
    if (Object.keys(next).length) { showErrors(next); return; }
    if (validate && !saveDraft(target, false)) return;
    setPage(target); setErrors({}); setMessage(validate ? 'Avance guardado.' : ''); moveFocus();
  };
  const focusError = (key: string) => {
    if (key === 'storage') { errorRef.current?.focus(); return; }
    if (key === 'confirmed') setPhase('review');
    else { const index = steps.findIndex(step => step.questions.some(q => q.key === key)); if (index >= 0) { setPage(index); setPhase('questions'); } }
    requestAnimationFrame(() => {
      const target = document.getElementById(key === 'confirmed' ? 'form-confirmation' : `answer-${key}`);
      const control = target?.matches('input, select, textarea, button') ? target : target?.querySelector<HTMLElement>('input, select, textarea') ?? target?.querySelector<HTMLElement>('button');
      (control as HTMLElement | null)?.focus();
    });
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== 'review') { if (position < availableSteps.length - 1) go(availableSteps[position + 1], true); else review(); return; }
    const next: Record<string, string> = validateQuestions(allQuestions, answers, allQuestions);
    if (!confirmed) next.confirmed = 'Marca la confirmación después de revisar tus respuestas.';
    if (Object.keys(next).length) { showErrors(next); return; }
    try {
      if (definition.id === 'estilos-aprendizaje') scoreLearning(answers);
      const saved = saveStudentForm(definition, answers, true, page); setRecord(saved); setAnswers(saved.answers);
      setErrors({}); setMessage('Formulario finalizado. Tus respuestas quedaron guardadas.'); requestAnimationFrame(() => headingRef.current?.focus());
    } catch (error) { showErrors({ storage: error instanceof Error && error.message.startsWith('Este formulario') ? error.message : 'No se pudo guardar. Tus respuestas siguen en pantalla. Revisa el espacio del navegador e inténtalo de nuevo.' }); }
  };
  const leave = (save: boolean) => {
    const destination = exitPath;
    if (save && !saveDraft()) { setExitPath(null); return; }
    setExitPath(null); if (destination) navigate(destination);
  };
  const changeStep = (index: number) => { setPage(index); setPhase('questions'); setReturnToReview(true); setConfirmed(false); setErrors({}); moveFocus(); };
  const answersOverview = (canChange: boolean) => steps.filter(step => !step.questions.length || step.questions.some(q => isVisible(q, answers, allQuestions))).map(step => {
    const index = steps.indexOf(step);
    return <details key={index} className="rounded-xl border border-gray-200 bg-white p-5"><summary className="min-h-11 cursor-pointer font-semibold leading-6 text-green-900 focus-visible:outline-2 focus-visible:outline-green-800">{step.title}</summary><div className="mt-4 space-y-5">
      {canChange && <button type="button" className={secondary} aria-label={`Cambiar respuestas: ${step.title}`} onClick={() => changeStep(index)}>Cambiar respuestas</button>}
      {step.questions.filter(q => isVisible(q, answers, allQuestions)).map(q => <div key={q.key}><h3 className="mb-2 text-sm font-semibold text-gray-700">{q.label}{!q.required && <span className="ml-1 font-normal">(opcional)</span>}</h3><QuestionAnswer question={q} value={answers[q.key]} /></div>)}
      {definition.id === 'ficha-estudiante' && !step.questions.length && (learning?.submittedAt ? <LearningResult answers={learning.answers} /> : <p className="text-gray-600">Test de aprendizaje pendiente. El resultado se incorpora cuando lo finalices.</p>)}
    </div></details>;
  });
  return <div className="space-y-6">
    {(submitted || phase === 'intro') && <Link to="/estudiante/formularios" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-medium text-gray-600 hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"><FaArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /><span>Volver a formularios</span></Link>}
    {(submitted || phase !== 'intro') && <header><h1 ref={headingRef} tabIndex={-1} className="scroll-mt-24 text-2xl font-bold leading-8 text-gray-900 focus:outline-none">{definition.title}</h1></header>}
    {!submitted && phase !== 'intro' && <div className="border-b border-gray-200 pb-5"><div className="flex flex-wrap justify-between gap-2"><p className="text-sm font-semibold text-gray-900">{phase === 'review' ? `Paso ${availableSteps.length + 1} de ${availableSteps.length + 1} · Revisión` : `Paso ${position + 1} de ${availableSteps.length + 1}`}</p><p className="text-sm text-gray-600">{answered} respuestas registradas</p></div><progress max={availableSteps.length + 1} value={phase === 'review' ? availableSteps.length + 1 : position} aria-label="Avance por pasos del formulario" className="form-progress mt-3 h-2 w-full" /><p className="mt-2 text-sm leading-6 text-gray-600">{savedTime ? `Último borrador: ${savedTime}. ` : ''}{dirty ? 'Avanza o sal del formulario para guardar tus cambios.' : 'El avance se guarda al continuar.'}</p></div>}
    {message && <p role="status" aria-live="polite" aria-atomic="true" className="text-sm leading-6 text-green-800">{message}</p>}
    {errors.storage && <p ref={errorRef} tabIndex={-1} role="alert" className="text-sm leading-6 text-red-800">{errors.storage}</p>}
    {submitted ? <>
      <section className="rounded-xl border border-green-300 bg-green-50 p-6"><h2 className="text-xl font-semibold text-green-950">Formulario finalizado</h2><p className="mt-2 leading-7 text-green-950">Puedes consultar tus respuestas a continuación. No necesitas volver a llenar este formulario.</p><p className="mt-2 text-sm text-green-950">Fecha de aplicación: {displayDate(record!.date)}.</p></section>
      <details className="rounded-xl border border-gray-200 bg-white p-5"><summary className="min-h-11 cursor-pointer font-semibold text-green-900">Identificación de esta entrega</summary><StudentIdentity student={student} /><ProfileInformation profile={profile} /></details>
      {definition.id === 'estilos-aprendizaje' && <LearningResult answers={answers} />}{answersOverview(false)}
    </> : phase === 'intro' ? <>
      <section aria-labelledby="annex-intro-title" className="annex-intro w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800"><FaClipboardList className="h-6 w-6" aria-hidden="true" /></div><span className="text-sm font-semibold text-green-800">{record ? 'Borrador guardado' : 'Formulario del alumno'}</span></div>
          <h1 id="annex-intro-title" ref={headingRef} tabIndex={-1} className="scroll-mt-24 text-2xl font-semibold leading-8 text-gray-900 focus:outline-none sm:text-3xl sm:leading-10">{definition.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600"><span>{availableSteps.length} pasos</span><span aria-hidden="true">·</span><span>Sin límite de tiempo</span></div>
          <p className="mt-4 max-w-lg text-sm leading-6 text-gray-700">{record ? 'Continúa a tu ritmo desde donde te quedaste.' : 'Responde a tu ritmo. Tu avance se guarda al continuar o salir.'}</p>
          <div className="mt-6"><button type="button" className={`${primary} w-full sm:w-auto sm:min-w-56`} onClick={begin}>{returnToReview ? 'Volver a revisar' : record ? 'Continuar formulario' : 'Comenzar formulario'}</button></div>
          <p className="mt-4 text-sm leading-6 text-gray-600">Tus datos personales se agregarán automáticamente.</p>
        </div>
        <div className="annex-intro-details border-t border-gray-200">
          <details className="group border-b border-gray-200 px-6 sm:px-8"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-medium text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 [&::-webkit-details-marker]:hidden"><span>Instrucciones y apartados</span><FaChevronDown aria-hidden="true" className="h-3 w-3 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><div className="space-y-4 pb-6 text-sm leading-6 text-gray-600"><p>{definition.description}</p><p>Los campos obligatorios están identificados. Al avanzar se guarda un borrador y al terminar podrás revisar tus respuestas.</p><ol className="list-decimal space-y-2 pl-5">{definition.sections.map(section => <li key={section.title}>{section.title}</li>)}</ol></div></details>
          <details className="group border-b border-gray-200 px-6 sm:px-8"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-medium text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 [&::-webkit-details-marker]:hidden"><span>Consultar mis datos</span><FaChevronDown aria-hidden="true" className="h-3 w-3 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><div className="space-y-4 pb-6"><StudentIdentity student={student} editable /><ProfileInformation profile={profile} /></div></details>
          <p className="px-6 py-4 text-sm leading-6 text-gray-600 sm:px-8">La fecha de aplicación se registrará automáticamente al finalizar.</p>

        </div>
      </section>
    </> : <form onSubmit={submit} noValidate className="space-y-6">
      {phase === 'review' ? <>
        <section className="rounded-xl border border-gray-200 bg-white p-5"><h2 ref={sectionRef} tabIndex={-1} className="scroll-mt-24 text-xl font-semibold focus:outline-none">Revisa tus respuestas antes de finalizar</h2><p className="mt-3 leading-7 text-gray-700">Abre los apartados para comprobar tus respuestas. Puedes cambiarlas sin perder lo que ya capturaste.</p><p className="mt-4 text-sm text-gray-600">La fecha de aplicación se registrará automáticamente al finalizar.</p></section>
        <details className="rounded-xl border border-gray-200 bg-white p-5"><summary className="min-h-11 cursor-pointer font-semibold text-green-900 focus-visible:outline-2 focus-visible:outline-green-800">Comprobar datos personales y académicos</summary><StudentIdentity student={student} editable /><ProfileInformation profile={profile} /></details>
        {answersOverview(true)}
        <div className={`rounded-xl border bg-white p-5 ${errors.confirmed ? 'border-red-600' : 'border-gray-300'}`}><label htmlFor="form-confirmation" className="flex min-h-12 cursor-pointer items-start gap-3"><input id="form-confirmation" type="checkbox" aria-required="true" checked={confirmed} aria-invalid={Boolean(errors.confirmed)} aria-describedby={errors.confirmed ? 'confirmation-hint confirmation-error' : 'confirmation-hint'} onChange={event => { setConfirmed(event.target.checked); setErrors(previous => { const next = { ...previous }; delete next.confirmed; return next; }); }} className="mt-1 h-5 w-5 shrink-0 accent-green-800" /><span className={`text-sm leading-7 ${errors.confirmed ? 'text-red-800' : 'text-gray-900'}`}>{definition.id.startsWith('diagnostico') ? 'Manifiesto que la información aquí recabada es verídica y autorizo a la escuela utilizarla con fines académicos y estadísticos.' : 'Revisé mis respuestas y deseo finalizar este formulario.'} <span className="font-medium">(obligatorio)</span></span></label><p id="confirmation-hint" className="mt-3 text-sm leading-6 text-gray-600">Al finalizar podrás consultar tus respuestas. La entrega ya no podrá editarse.</p>{errors.confirmed && <p id="confirmation-error" className="mt-2 text-sm font-medium text-red-800">{errors.confirmed}</p>}</div>
      </> : <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6"><header className="border-b border-gray-200 pb-4"><h2 ref={sectionRef} tabIndex={-1} className="scroll-mt-24 text-xl font-semibold leading-7 text-gray-900 focus:outline-none">{current.title}</h2>{current.description && <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">{current.description}</p>}</header>
        <div className="mt-6 space-y-7">{current.questions.filter(q => isVisible(q, answers, allQuestions)).map(q => <div key={q.key} onBlur={event => { if (event.currentTarget.contains(event.relatedTarget as Node | null)) return; const issue = validateQuestions([q], answers, allQuestions); setErrors(previous => { const next = { ...previous }; if (issue[q.key]) next[q.key] = issue[q.key]; else delete next[q.key]; return next; }); }}><StudentQuestion question={q} value={answers[q.key]} error={errors[q.key]} onChange={value => {
          const updated = { ...answers, [q.key]: value }; setAnswers(updated); setConfirmed(false); setMessage('');
          setErrors(previous => { const next = { ...previous }; for (const question of allQuestions) if (!isVisible(question, updated, allQuestions)) delete next[question.key]; if (next[q.key]) { const issue = validateQuestions([q], updated, allQuestions); if (issue[q.key]) next[q.key] = issue[q.key]; else delete next[q.key]; } return next; });
        }} onError={error => showErrors({ [q.key]: error })} /></div>)}
          {definition.id === 'ficha-estudiante' && !current.questions.length && (learning?.submittedAt ? <LearningResult answers={learning.answers} /> : <div><p className="leading-7 text-gray-600">El resultado se incorporará al finalizar el test de aprendizaje. Puedes guardar esta ficha sin volver a capturar ese dato.</p><Link to="/estudiante/formulario/estilos-aprendizaje" className={`${secondary} mt-4`}>Ir al test de aprendizaje</Link></div>)}
        </div>
      </section>}
      <div className="sticky bottom-0 z-10 grid grid-cols-2 gap-3 rounded-xl border border-gray-200 bg-white p-3  sm:flex sm:justify-between sm:p-4">
        <button type="button" className={secondary} onClick={() => { if (saveDraft()) navigate('/estudiante/formularios'); }}>Salir del formulario</button>
        {phase === 'review' ? <button type="submit" className={primary}>Finalizar formulario</button> : <button type="button" className={primary} onClick={() => { if (returnToReview || position === availableSteps.length - 1) review(); else go(availableSteps[position + 1], true); }}>Continuar</button>}
      </div>
    </form>}
    <FormExitDialog open={exitPath !== null} onStay={() => setExitPath(null)} onSaveExit={() => leave(true)} onLeave={() => leave(false)} />
  </div>;
}

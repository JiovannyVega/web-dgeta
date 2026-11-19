import { initialData } from './profile';
import { ANNEX6_KEY, getStudentSummary, PROFILE_KEY, readLocal, today, writeLocal } from './localRecords';
import type { Annex6Record } from './annexes';
import type { StudentSummary } from './localRecords';
import { FORM_RECORDS_KEY, isVisible, validateQuestions } from './studentForms';
import type { FormAnswers, StudentForm } from './studentForms';

export interface StudentFormRecord {
  answers: FormAnswers;
  date: string;
  savedAt: string;
  submittedAt?: string;
  confirmed?: boolean;
  student?: StudentSummary;
  profile?: typeof initialData;
  step?: number;
}
export interface StudentFormStore { records: Record<string, StudentFormRecord>; shared: FormAnswers }

export function getFormStore(): StudentFormStore {
  const store = readLocal<StudentFormStore>(FORM_RECORDS_KEY, { records: {}, shared: {} });
  const valid = store && typeof store.records === 'object' && store.records && typeof store.shared === 'object' && store.shared ? store : { records: {}, shared: {} };
  const previous = readLocal<Annex6Record | null>(ANNEX6_KEY, null);
  if (!valid.records['anexo-6'] && previous) return { ...valid, records: { ...valid.records, 'anexo-6': { answers: previous.answers, date: previous.date, savedAt: previous.submittedAt ?? '', submittedAt: previous.submittedAt, student: previous.student ? { ...previous.student, tutor: previous.tutor || previous.student.tutor } : undefined, confirmed: Boolean(previous.submittedAt) } } };
  return valid;
}

export function formInitialAnswers(form: StudentForm): FormAnswers {
  const store = getFormStore();
  const record = store.records[form.id];
  if (record?.submittedAt) return record.answers;
  const candidates = { ...store.shared, ...record?.answers };
  return Object.fromEntries(form.sections.flatMap(section => section.questions).filter(q => candidates[q.key] !== undefined).map(q => [q.key, candidates[q.key]]));
}

export function saveStudentForm(form: StudentForm, answers: FormAnswers, submit: boolean, step = 0): StudentFormRecord {
  const store = getFormStore();
  if (store.records[form.id]?.submittedAt) throw new Error('Este formulario ya se finalizó. Vuelve al listado para consultar la entrega guardada.');
  const questions = form.sections.flatMap(section => section.questions);
  if (submit && Object.keys(validateQuestions(questions, answers, questions)).length) throw new Error('Revisa las respuestas obligatorias antes de finalizar.');
  const filtered: FormAnswers = Object.fromEntries(questions.filter(q => isVisible(q, answers, questions) && answers[q.key] !== undefined).map(q => [q.key, answers[q.key]]));
  const savedAt = new Date().toISOString();
  const record: StudentFormRecord = {
    answers: filtered, date: today(), savedAt, step,
    ...(submit ? { submittedAt: savedAt, confirmed: true, student: getStudentSummary(), profile: readLocal(PROFILE_KEY, initialData) } : {}),
  };
  const shared = { ...store.shared };
  for (const question of questions) delete shared[question.key];
  writeLocal(FORM_RECORDS_KEY, { records: { ...store.records, [form.id]: record }, shared: { ...shared, ...filtered } });
  return record;
}

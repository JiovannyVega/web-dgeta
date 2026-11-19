import { useRef, useState } from 'react';
import { input, secondary } from './AnnexShared';
import { getChoiceLabel, getChoiceValue } from '../../data/studentForms';
import type { AnswerValue, Question, Row } from '../../data/studentForms';

export function QuestionAnswer({ question, value }: { question: Question; value?: AnswerValue }) {
  if (!value || (Array.isArray(value) && !value.length)) return <p className="text-gray-600">Sin respuesta</p>;
  if (question.type === 'photo' && typeof value === 'string') return <img src={value} alt="Fotografía registrada del estudiante" className="h-32 w-32 rounded-lg border border-gray-300 object-cover" />;
  if (question.type === 'table' && Array.isArray(value)) return <div className="space-y-3">{(value as Row[]).map((row, index) => <dl key={index} className="grid gap-3 rounded-lg border border-gray-200 p-3 sm:grid-cols-2">{question.columns?.map(column => <div key={column.key}><dt className="text-sm text-gray-600">{column.label}</dt><dd className="break-words text-gray-900">{row[column.key] || 'Sin registrar'}</dd></div>)}</dl>)}</div>;
  const display = (item: string) => {
    const choice = question.options?.find(option => getChoiceValue(option) === item);
    return choice ? getChoiceLabel(choice) : item;
  };
  return <p className="whitespace-pre-wrap break-words text-gray-900">{Array.isArray(value) ? (value as string[]).map(display).join(', ') : display(value)}</p>;
}

export default function StudentQuestion({ question, value, error, onChange, onError }: {
  question: Question; value?: AnswerValue; error?: string; onChange: (value: AnswerValue) => void; onError: (message: string) => void;
}) {
  const [removedRow, setRemovedRow] = useState<{ row: Row; index: number } | null>(null);
  const undoRef = useRef<HTMLButtonElement>(null);
  const id = `answer-${question.key}`;
  const description = [question.hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined;
  const controlClass = error ? input.replace('border-gray-500', 'border-red-600') : input;
  const label = <>{question.label}<span className={`ml-1 text-sm font-normal ${error ? 'text-red-800' : 'text-gray-600'}`}>{question.required ? '(obligatorio)' : '(opcional)'}</span></>;
  const messages = <>{question.hint && <p id={`${id}-hint`} className="mt-2 text-sm leading-6 text-gray-600">{question.hint}</p>}{error && <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-800">{error}</p>}</>;
  if (question.type === 'table') {
    const rows = Array.isArray(value) ? value as Row[] : [];
    return <fieldset id={id} aria-describedby={description} aria-invalid={Boolean(error)} className={`min-w-0 rounded-xl border p-4 ${error ? 'border-red-600' : 'border-gray-300'}`}><legend className={`px-2 font-semibold ${error ? 'text-red-800' : 'text-gray-900'}`}>{label}</legend>
      <div className="space-y-4">{rows.map((row, rowIndex) => <div key={rowIndex} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h3 className="font-medium">Registro {rowIndex + 1}</h3><button type="button" className={secondary} aria-label={`Quitar registro ${rowIndex + 1} de ${question.label}`} onClick={() => { setRemovedRow({ row, index: rowIndex }); onChange(rows.filter((_, index) => index !== rowIndex)); requestAnimationFrame(() => undoRef.current?.focus()); }}>Quitar registro</button></div>
        <div className="grid gap-4 sm:grid-cols-2">{question.columns?.map(column => {
          const cellId = `${id}-${rowIndex}-${column.key}`;
          const changeCell = (text: string) => onChange(rows.map((item, index) => index === rowIndex ? { ...item, [column.key]: text } : item));
          return <div key={column.key}><label htmlFor={cellId} className="mb-2 block text-sm font-medium">{column.label}</label>{column.options ? <select id={cellId} className={controlClass} value={row[column.key] ?? ''} onChange={event => changeCell(event.target.value)}><option value="">Selecciona una opción</option>{column.options.map(option => <option key={option}>{option}</option>)}</select> : <input id={cellId} type={column.type ?? 'text'} min={column.min} max={column.max} step={column.type === 'number' ? '1' : undefined} maxLength={column.type === 'number' ? undefined : 500} className={controlClass} value={row[column.key] ?? ''} onChange={event => changeCell(event.target.value)} />}</div>;
        })}</div>
      </div>)}</div>
      <button type="button" className={`${secondary} mt-4`} disabled={rows.length >= (question.maxRows ?? 20)} onClick={() => onChange([...rows, {}])}>Agregar registro</button>
      <div role="status" aria-live="polite">{removedRow && <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-gray-300 bg-gray-50 p-3"><p className="text-sm text-gray-800">Registro quitado.</p><button ref={undoRef} type="button" disabled={rows.length >= (question.maxRows ?? 20)} className={secondary} onClick={() => { const next = [...rows]; const restoredIndex = Math.min(removedRow.index, rows.length); next.splice(restoredIndex, 0, removedRow.row); onChange(next); setRemovedRow(null); requestAnimationFrame(() => document.getElementById(`${id}-${restoredIndex}-${question.columns?.[0]?.key}`)?.focus()); }}>Deshacer</button></div>}</div>
      <p className="mt-2 text-sm text-gray-600">{rows.length} de {question.maxRows ?? 20} registros disponibles.</p>{messages}
    </fieldset>;
  }
  if (question.type === 'radio' || question.type === 'multi' || (question.type === 'select' && (question.options?.length ?? 0) <= 4)) return <fieldset id={id} aria-describedby={description} aria-required={Boolean(question.required)} aria-invalid={Boolean(error)} className={`min-w-0 rounded-xl border p-4 ${error ? 'border-red-600' : 'border-gray-300'}`}><legend className={`px-2 font-medium leading-6 ${error ? 'text-red-800' : 'text-gray-900'}`}>{label}</legend><div className="mt-2 grid gap-3 sm:grid-cols-2">{question.options?.map(option => {
    const optionValue = getChoiceValue(option);
    const selected = question.type === 'multi' ? Array.isArray(value) && value.some(item => item === optionValue) : value === optionValue;
    return <label key={optionValue} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border p-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-green-800 ${error ? 'border-red-600 bg-white text-gray-900' : selected ? 'border-green-800 bg-green-50 text-green-900' : 'border-gray-400 bg-white text-gray-900'}`}><input type={question.type === 'multi' ? 'checkbox' : 'radio'} name={id} value={optionValue} checked={selected} className="h-5 w-5 shrink-0 accent-green-800" onChange={() => {
      if (question.type !== 'multi') onChange(optionValue);
      else { const selectedValues = Array.isArray(value) ? value as string[] : []; onChange(selected ? selectedValues.filter(item => item !== optionValue) : [...selectedValues, optionValue]); }
    }} />{getChoiceLabel(option)}</label>;
  })}</div>{messages}</fieldset>;
  if (question.type === 'photo') return <div><label htmlFor={id} className={`mb-2 block font-medium ${error ? 'text-red-800' : 'text-gray-900'}`}>{label}</label><input id={id} type="file" accept="image/jpeg,image/png,image/webp" className={controlClass} aria-describedby={description} aria-invalid={Boolean(error)} onChange={event => {
    const file = event.target.files?.[0]; if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 500 * 1024) { onError('Selecciona una imagen JPG, PNG o WebP de hasta 500 KB.'); event.target.value = ''; return; }
    const reader = new FileReader(); reader.onload = () => { if (typeof reader.result === 'string') onChange(reader.result); }; reader.onerror = () => onError('No se pudo leer la fotografía. Intenta con otro archivo.'); reader.readAsDataURL(file);
  }} />{typeof value === 'string' && value && <div className="mt-3 flex items-center gap-4"><img src={value} alt="Vista previa de la fotografía" className="h-24 w-24 rounded-lg object-cover" /><button type="button" className={secondary} onClick={() => onChange('')}>Quitar foto</button></div>}{messages}</div>;
  return <div className="min-w-0"><label htmlFor={id} className={`mb-2 block font-medium leading-6 ${error ? 'text-red-800' : 'text-gray-900'}`}>{label}</label>
    {question.type === 'select' ? <select id={id} value={typeof value === 'string' ? value : ''} className={controlClass} aria-required={Boolean(question.required)} aria-invalid={Boolean(error)} aria-describedby={description} onChange={event => onChange(event.target.value)}><option value="">Selecciona una opción</option>{question.options?.map(option => <option key={getChoiceValue(option)} value={getChoiceValue(option)}>{getChoiceLabel(option)}</option>)}</select>
      : question.type === 'textarea' ? <textarea id={id} rows={4} maxLength={10000} value={typeof value === 'string' ? value : ''} className={`${controlClass} resize-y`} aria-required={Boolean(question.required)} aria-invalid={Boolean(error)} aria-describedby={description} onChange={event => onChange(event.target.value)} />
        : <input id={id} type={question.type === 'confirm' ? 'text' : question.type} min={question.min} max={question.max} step={question.type === 'number' ? 'any' : undefined} maxLength={question.type === 'text' ? 500 : undefined} value={typeof value === 'string' ? value : ''} className={controlClass} aria-required={Boolean(question.required)} aria-invalid={Boolean(error)} aria-describedby={description} onChange={event => onChange(event.target.value)} />}
    {messages}
  </div>;
}

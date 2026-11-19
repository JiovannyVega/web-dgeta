import { useEffect, useRef } from 'react';
import { primary, secondary } from './AnnexShared';

export default function FormExitDialog({ open, onStay, onSaveExit, onLeave }: { open: boolean; onStay: () => void; onSaveExit: () => void; onLeave: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && dialog && !dialog.open) { dialog.showModal(); heading.current?.focus(); }
    if (!open && dialog?.open) dialog.close();
  }, [open]);
  return <dialog ref={ref} aria-labelledby="exit-form-title" aria-describedby="exit-form-description" onCancel={event => { event.preventDefault(); onStay(); }} className="m-auto w-[calc(100%_-_2rem)] max-w-lg rounded-2xl border border-gray-300 bg-white p-6 text-gray-900 shadow-xl backdrop:bg-black/50">
    <h2 ref={heading} id="exit-form-title" tabIndex={-1} className="text-xl font-semibold focus:outline-none">Tienes cambios sin guardar</h2>
    <p id="exit-form-description" className="mt-3 leading-7 text-gray-700">Puedes guardar un borrador para continuar después, seguir respondiendo o salir sin guardar estos cambios.</p>
    <div className="mt-6 flex flex-col gap-3"><button type="button" className={primary} onClick={onSaveExit}>Guardar borrador y salir</button><button type="button" className={secondary} onClick={onStay}>Seguir respondiendo</button><button type="button" className="min-h-11 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800" onClick={onLeave}>Salir sin guardar</button></div>
  </dialog>;
}

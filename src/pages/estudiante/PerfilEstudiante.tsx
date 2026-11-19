import { useState } from "react";
import { useRef } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { FaSave, FaTimes, FaEdit } from "react-icons/fa";
import { primary as primaryButton, secondary as secondaryButton, input } from "../../components/forms/AnnexShared";
import StudentLayout from "../../components/layouts/StudentLayout";
import { initialData } from "../../data/profile";
import type { Section, Values } from "../../data/profile";
import { readLocal, writeLocal, PROFILE_KEY } from "../../data/localRecords";

interface Field { name: string; label: string; type?: string; options?: string[]; maxLength?: number }
const sections = {
  personales: { title: "Datos personales", description: "Información básica sobre ti", fields: [
    { name: "nombres", label: "Nombres" },
    { name: "apellidoPaterno", label: "Apellido paterno" },
    { name: "apellidoMaterno", label: "Apellido materno" },
    { name: "sexo", label: "Sexo", options: ["Masculino", "Femenino"] },
    { name: "fechaNacimiento", label: "Fecha de nacimiento", type: "date" },
    { name: "curp", label: "CURP", maxLength: 18 },
  ] as Field[] },
  academicos: { title: "Datos académicos", description: "La administración escolar registra y actualiza estos datos.", fields: [
    { name: "especialidad", label: "Especialidad/Carrera" },
    { name: "turno", label: "Turno" },
    { name: "numeroControl", label: "No. de Control" },
    { name: "semestre", label: "Semestre" },
    { name: "grupo", label: "Grupo" },
    { name: "tutor", label: "Nombre del tutor" },
  ] as Field[] },
  contacto: { title: "Datos de contacto", description: "Tus teléfonos y correo electrónico", fields: [
    { name: "celular", label: "Teléfono celular", type: "tel" },
    { name: "telefonoCasa", label: "Teléfono de casa", type: "tel" },
    { name: "correo", label: "Correo electrónico", type: "email" },
    { name: "emergenciaNombre", label: "Nombre" },
    { name: "emergenciaApellidoPaterno", label: "Apellido paterno" },
    { name: "emergenciaApellidoMaterno", label: "Apellido materno" },
    { name: "emergenciaCelular", label: "Teléfono celular", type: "tel" },
    { name: "emergenciaParentesco", label: "Parentesco" },
  ] as Field[] },
  domicilio: { title: "Datos del domicilio", description: "Tu dirección de residencia actual", fields: [
    { name: "codigoPostal", label: "Código postal", maxLength: 5 },
    { name: "estado", label: "Estado" }, { name: "municipio", label: "Municipio" },
    { name: "localidad", label: "Localidad" }, { name: "colonia", label: "Colonia" },
    { name: "calle", label: "Calle" }, { name: "numeroExterior", label: "Número exterior" },
    { name: "numeroInterior", label: "Número interior" },
  ] as Field[] },
};

function ProfileSection({ section, values, onSave, emergency = false }: { section: Section; values: Values; onSave?: (values: Values) => void; emergency?: boolean }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(values);
  const [message, setMessage] = useState("");
  const [saveFailed, setSaveFailed] = useState(false);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const config = emergency ? {
    title: "Familiar en caso de emergencia",
    description: "La persona a quien podemos contactar si necesitas ayuda.",
    fields: sections.contacto.fields.filter(field => field.name.startsWith("emergencia")),
  } : {
    ...sections[section],
    fields: sections[section].fields.filter(field => !field.name.startsWith("emergencia")),
  };
  const titleId = `profile-${section}${emergency ? '-emergencia' : ''}-title`;
  const hasChanges = config.fields.some(field => (draft[field.name] ?? "").trim() !== (values[field.name] ?? ""));
  const finishEditing = () => {
    setEditing(false);
    requestAnimationFrame(() => editButtonRef.current?.focus());
  };
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSave) return;
    try {
      onSave(Object.fromEntries(config.fields.map(field => [field.name, (draft[field.name] ?? "").trim()])));
    } catch {
      setSaveFailed(true);
      setMessage("No se pudo guardar. Revisa el almacenamiento del navegador e inténtalo de nuevo.");
      return;
    }
    setSaveFailed(false);
    finishEditing();
    setMessage("Cambios guardados.");
  };
  return (
    <section aria-labelledby={titleId} className="bg-white rounded-xl  border border-gray-200 overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-gray-200 flex flex-wrap justify-between items-start gap-4">
        <div className="min-w-0 flex-1 basis-48">
          <h2 id={titleId} className="text-lg sm:text-xl font-semibold leading-7 text-gray-900">{config.title}</h2>
          <p className="text-sm leading-6 text-gray-600 mt-1">{config.description}</p>
        </div>
        {onSave && !editing && <button ref={editButtonRef} type="button" aria-label={`Editar ${config.title.toLowerCase()}`}
          onClick={() => {
            setDraft(values); setEditing(true); setMessage(""); setSaveFailed(false);
            requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement | HTMLSelectElement>("input, select")?.focus());
          }} className={secondaryButton}>
          <FaEdit className="h-4 w-4 shrink-0" aria-hidden="true" focusable="false" /><span>Editar</span>
        </button>}
        {editing && <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold leading-6 text-green-900">En edición</span>}
      </div>
      {editing ? <form ref={formRef} onSubmit={save} aria-labelledby={titleId} className="p-5 sm:p-6">

        <div className="profile-fields grid gap-x-6 gap-y-5">
          {config.fields.map(field => {
            const id = `perfil-${section}-${field.name}`;
            const hint = field.name === "curp" ? "18 caracteres. Las letras se convierten a mayúsculas." : field.name === "codigoPostal" ? "Escribe los 5 dígitos de tu código postal." : field.name === "emergenciaParentesco" ? "Por ejemplo: madre, padre, hermana o abuelo." : field.type === "email" ? "Por ejemplo: nombre@correo.com" : undefined;
            const className = `${input} min-w-0 leading-6`;
            const autoComplete = field.type === "email" ? "email" : field.type === "tel" ? (emergency ? "section-emergency tel" : "tel") : field.name === "codigoPostal" ? "postal-code" : field.name === "nombres" ? "given-name" : field.name === "emergenciaNombre" ? "section-emergency given-name" : "off";
            return <div key={field.name}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-2">{field.label}</label>
              {field.options ? (
                <select id={id} name={field.name} value={draft[field.name] ?? ""} className={className} onChange={event => setDraft({ ...draft, [field.name]: event.target.value })}>
                  <option value="">Selecciona una opción</option>
                  {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input id={id} name={field.name} type={field.type ?? "text"} value={draft[field.name] ?? ""} maxLength={field.maxLength}
                  minLength={field.name === "curp" ? 18 : undefined}
                  autoComplete={autoComplete} inputMode={field.name === "codigoPostal" ? "numeric" : undefined}
                  pattern={field.name === "codigoPostal" ? "[0-9]{5}" : undefined}
                  aria-describedby={hint ? `${id}-hint` : undefined} className={className}
                  onChange={event => setDraft({ ...draft, [field.name]: field.name === "curp" ? event.target.value.toUpperCase() : event.target.value })} />
              )}
              {hint && <p id={`${id}-hint`} className="mt-2 text-sm leading-5 text-gray-600">{hint}</p>}
            </div>;
          })}
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-gray-200 pt-5 mt-6">
          <button type="button" onClick={() => { setDraft(values); finishEditing(); setSaveFailed(false); setMessage("Edición cancelada. Se conservaron los datos anteriores."); }} className={secondaryButton}>
            <FaTimes className="h-4 w-4 shrink-0" aria-hidden="true" focusable="false" /><span>Cancelar</span>
          </button>
          <button type="submit" disabled={!hasChanges} className={primaryButton}>
            <FaSave className="h-4 w-4 shrink-0" aria-hidden="true" focusable="false" /><span>Guardar cambios</span>
          </button>
        </div>
      </form> : <dl className="profile-fields grid gap-x-6 gap-y-6 p-5 sm:p-6">
        {config.fields.map(field => <div key={field.name} className="min-w-0">
          <dt className="text-sm font-medium leading-5 text-gray-600">{field.label}</dt>
          <dd className={`mt-1.5 text-base leading-6 break-words ${values[field.name] ? 'text-gray-900' : 'text-gray-600'}`}>
            {values[field.name] ? (field.type === "date" ? new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(new Date(`${values[field.name]}T00:00:00`)) : values[field.name]) : "Sin registrar"}
          </dd>
        </div>)}
      </dl>}
      <div role={saveFailed ? "alert" : "status"} aria-live={saveFailed ? "assertive" : "polite"} aria-atomic="true">
        {message && <p className={`mx-5 mb-5 text-sm leading-6 sm:mx-6 ${saveFailed ? "text-red-800" : "text-green-800"}`}>{message}</p>}
      </div>
    </section>
  );
}
export default function PerfilEstudiante() {
  const location = useLocation();
  const [data, setData] = useState(() => readLocal(PROFILE_KEY, initialData));
  const saveSection = (target: Exclude<Section, "academicos">, values: Values) => {
    const current = readLocal(PROFILE_KEY, initialData);
    const next = { ...current, [target]: { ...current[target], ...values } };
    writeLocal(PROFILE_KEY, next);
    setData(next);
  };
  const section = location.pathname.replace(/^\/estudiante\/perfil\/?/, "");
  if (!Object.prototype.hasOwnProperty.call(sections, section)) return <Navigate to="/estudiante/perfil/personales" replace />;
  const selected = section as Section;
  const onSave = selected === "academicos" ? undefined : (values: Values) => saveSection(selected, values);
  return <StudentLayout>
    <div className="ui-page">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Mi perfil</h1>
        <p className="text-gray-600">Consulta tu información por apartado.</p>
      </div>
      <div className="space-y-6">
        <ProfileSection key={selected} section={selected} values={data[selected]} onSave={onSave} />
        {selected === "contacto" && <ProfileSection key="emergencia" section="contacto" emergency values={data.contacto}
          onSave={values => saveSection("contacto", values)} />}
      </div>
    </div>
  </StudentLayout>;
}

import ProfesorLayout from '../../components/layouts/ProfesorLayout';
import { PageHeading } from '../../components/PageUI';
import { tutorProfile as profesor } from '../../data/portal';
export default function PerfilProfesor() {
 return <ProfesorLayout><div className="ui-page">
  <PageHeading title="Mi perfil" description="Información del tutor."/>
  <section className="ui-panel" aria-labelledby="tutor-name"><h2 id="tutor-name">{profesor.nombre}</h2>
   <dl className="mt-6 grid gap-6 sm:grid-cols-2">{Object.entries({'Número de empleado':profesor.empleado,Departamento:profesor.departamento,'Correo electrónico':profesor.correo,'Teléfono':profesor.telefono,Oficina:profesor.oficina}).map(([label,value])=><div key={label} className="min-w-0"><dt className="text-sm text-gray-600">{label}</dt><dd className="mt-1 break-words font-medium text-gray-900">{value}</dd></div>)}</dl>
   <div className="mt-6 border-t border-gray-200 pt-5"><h3 className="text-sm font-medium text-gray-600">Asignaturas</h3><ul className="mt-3 flex flex-wrap gap-2">{profesor.materias.map(m=><li key={m} className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800">{m}</li>)}</ul></div>
  </section>
 </div></ProfesorLayout>;
}

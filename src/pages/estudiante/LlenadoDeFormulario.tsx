import { Link, useParams } from 'react-router-dom';
import StudentLayout from '../../components/layouts/StudentLayout';
import { secondary } from '../../components/forms/AnnexShared';
import FormularioAlumno from './FormularioAlumno';
import { allStudentForms } from '../../data/studentForms';

export default function LlenadoDeFormulario() {
  const { id } = useParams();
  const definition = allStudentForms.find(form => form.id === id);
  return <StudentLayout><div className="ui-page">
    {definition ? <FormularioAlumno key={definition.id} definition={definition} /> : <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"><h1 className="text-xl font-semibold">Formulario no encontrado</h1><p className="text-gray-600">Selecciona uno de los formularios disponibles para alumnos.</p><Link to="/estudiante/formularios" className={secondary}>Volver a formularios</Link></section>}
  </div></StudentLayout>;
}
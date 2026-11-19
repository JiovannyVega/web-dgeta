import { Link } from 'react-router-dom';
import { FaBookOpen, FaCalendarCheck, FaEnvelope } from 'react-icons/fa';
import StudentLayout from '../../components/layouts/StudentLayout';
import { PageHeading, TaskFolder, QuickLinks } from '../../components/PageUI';
import { primary, secondary } from '../../components/forms/AnnexShared';
import { allStudentForms, buildFormSteps } from '../../data/studentForms';
import { getFormStore } from '../../data/studentFormStorage';
import { getStudentSummary } from '../../data/localRecords';
export default function Dashboard() {
 const {records}=getFormStore(); const student=getStudentSummary();
 const completed=allStudentForms.filter(f=>records[f.id]?.submittedAt).length;
 const drafts=allStudentForms.filter(f=>records[f.id]&&!records[f.id].submittedAt);
 const next=drafts[0]??allStudentForms.find(f=>!records[f.id]?.submittedAt);
 return <StudentLayout><div className="ui-page home-page">
  <PageHeading title="Inicio" description={student.nombre?`Hola, ${student.nombre.split(' ')[0]}. Este es tu espacio de tutoría.`:'Este es tu espacio de tutoría.'}/>
  <div className="overview-grid">
   <TaskFolder label={drafts.length?'Retomar borrador':'Formularios'} title={next?next.title:'Tus formularios están completos'} description={next?(drafts.length?'Continúa desde donde te quedaste.':'Responde este formulario para continuar con tu seguimiento.'):'Puedes volver a consultar tus respuestas cuando lo necesites.'} meta={next?<span>{buildFormSteps(next).length} apartados</span>:undefined} action={<Link className={primary} to={next?`/estudiante/formulario/${next.id}`:'/estudiante/formularios'}>{next?(drafts.length?'Continuar formulario':'Comenzar formulario'):'Consultar respuestas'}</Link>}/>
   <section className="overview-progress" aria-labelledby="delivery-progress"><h2 id="delivery-progress">Tu avance</h2><p className="delivery-count"><strong>{completed}</strong> de {allStudentForms.length} formularios finalizados</p><progress className="form-progress" max={allStudentForms.length} value={completed} aria-label="Formularios finalizados"/><dl><div><dt>Sin comenzar</dt><dd>{allStudentForms.length-completed-drafts.length}</dd></div><div><dt>En borrador</dt><dd>{drafts.length}</dd></div></dl><Link to="/estudiante/formularios" className={secondary}>Ver todos los formularios</Link></section>
  </div>
  <QuickLinks title="Información escolar" items={[{title:'Calificaciones',description:'Resultados por semestre',path:'/estudiante/calificaciones',icon:FaBookOpen},{title:'Inasistencias',description:'Faltas y retardos por materia',path:'/estudiante/asistencias',icon:FaCalendarCheck},{title:'Mensajes',description:'Avisos de tus docentes',path:'/estudiante/mensajes',icon:FaEnvelope}]}/>
 </div></StudentLayout>;
}

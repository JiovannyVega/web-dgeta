import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaExclamationCircle, FaEnvelope } from 'react-icons/fa';
import ProfesorLayout from '../../components/layouts/ProfesorLayout';
import { PageHeading, TaskFolder, QuickLinks } from '../../components/PageUI';
import { primary, secondary } from '../../components/forms/AnnexShared';
import { tutorGroups } from '../../data/portal';
export default function Dashboard() {
 return <ProfesorLayout><div className="ui-page home-page">
  <PageHeading title="Inicio" description="Acompaña a tus alumnos y registra su seguimiento."/>
  <div className="overview-grid"><TaskFolder label="Atención individual" title="Registra la atención de tus alumnos." description="Describe la situación, la atención otorgada y los acuerdos de la sesión." action={<Link to="/profesor/formularios" className={primary}>Registrar atención</Link>}/>
   <section className="overview-progress" aria-labelledby="assigned-groups"><h2 id="assigned-groups">A tu cargo</h2><dl className="assignment-counts"><div><dt>Grupos asignados</dt><dd>{tutorGroups.length}</dd></div><div><dt>Alumnos en los grupos</dt><dd>{tutorGroups.reduce((sum,g)=>sum+g.estudiantes,0)}</dd></div></dl><Link className={secondary} to="/profesor/misgrupos">Consultar grupos</Link></section>
  </div>
  <section className="group-register" aria-labelledby="group-register-title"><div className="section-heading"><h2 id="group-register-title">Mis grupos</h2><span>{tutorGroups.length} grupos asignados</span></div><div className="group-register-list">{tutorGroups.map(group=><Link key={group.nombre} to={`/profesor/misgrupos/detalles?grupo=${encodeURIComponent(group.nombre)}`} className="group-register-item" aria-label={`Consultar ${group.nombre}`}><h3>{group.nombre}</h3><span>{group.estudiantes} alumnos</span></Link>)}</div></section>
  <QuickLinks title="Seguimiento" items={[{title:'Tutorías',description:'Sesiones y acuerdos',path:'/profesor/tutorias',icon:FaCalendarAlt},{title:'Incidencias',description:'Casos por revisar',path:'/profesor/incidencias',icon:FaExclamationCircle},{title:'Mensajes',description:'Avisos y conversaciones',path:'/profesor/mensajes',icon:FaEnvelope}]}/>
 </div></ProfesorLayout>;
}

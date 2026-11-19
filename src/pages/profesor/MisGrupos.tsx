import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfesorLayout from '../../components/layouts/ProfesorLayout';
import { PageHeading } from '../../components/PageUI';
import { input, secondary } from '../../components/forms/AnnexShared';
import { tutorGroups } from '../../data/portal';
export default function MisGrupos() {
 const [search,setSearch]=useState(''); const groups=tutorGroups.filter(g=>g.nombre.toLocaleLowerCase('es').includes(search.toLocaleLowerCase('es')));
 return <ProfesorLayout><div className="ui-page"><PageHeading title="Mis grupos" description="Consulta los alumnos de cada grupo."/>
  <label htmlFor="group-search" className="mb-2 block text-sm font-medium">Buscar grupo</label><input id="group-search" type="search" value={search} onChange={e=>setSearch(e.target.value)} className={`${input} mb-6 max-w-lg`}/>
  <p role="status" className="mb-3 text-sm text-gray-600">{groups.length} grupos</p>
  <div className="ui-panel">{groups.length?groups.map(group=><div key={group.nombre} className="ui-task"><div className="min-w-0 flex-1"><h2>{group.nombre}</h2><p>{group.nivel} · {group.estudiantes} alumnos</p></div><Link to={`/profesor/misgrupos/detalles?grupo=${encodeURIComponent(group.nombre)}`} className={secondary} aria-label={`Consultar ${group.nombre}`}>Ver alumnos</Link></div>):<><h2>No se encontraron grupos</h2><button type="button" className={`${secondary} mt-4`} onClick={()=>setSearch('')}>Limpiar búsqueda</button></>}</div>
 </div></ProfesorLayout>;
}

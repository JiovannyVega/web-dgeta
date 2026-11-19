import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import type { IconType } from 'react-icons';

export interface MenuItem { path: string; icon: IconType; label: string; children?: {path:string;label:string}[] }
interface SidebarProps { userName?:string; userRole?:string; menuItems?:MenuItem[] }
export default function Sidebar({userName='Usuario',userRole='Alumno',menuItems=[]}:SidebarProps) {
  const {pathname}=useLocation();
  const [expanded,setExpanded]=useState<string|null>(menuItems.find(i=>i.children&&pathname.startsWith(i.path))?.path??null);
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const active=(path:string)=>pathname===path || (path.endsWith('/formularios')&&pathname.startsWith('/estudiante/formulario/')) || (path.endsWith('/misgrupos')&&(pathname.includes('/misgrupos/')||pathname.endsWith('/detalles-alumno')));
  const close=()=>dialog.current?.close();
  useEffect(()=>{
    const media=window.matchMedia('(min-width: 1024px)');
    const resize=()=>{if(media.matches)dialog.current?.close();};
    media.addEventListener('change',resize);return()=>media.removeEventListener('change',resize);
  },[]);
  const navigation=(prefix:string)=><>
    <div className="navigation-brand border-b border-gray-200 px-6 py-6"><Link to={pathname.startsWith('/profesor')?'/profesor/dashboard':'/estudiante/dashboard'} onClick={close} className="inline-flex min-h-11 flex-col justify-center"><span className="text-xl font-bold tracking-tight text-green-900">DGETA</span><span className="text-sm text-gray-600">Tutoría escolar</span></Link></div>
    <nav aria-label="Navegación principal" className="min-h-0 flex-1 overflow-y-auto p-3"><ul className="space-y-1">{menuItems.map(item=>{
      const Icon=item.icon; const isActive=active(item.path); const open=expanded===item.path;
      return <li key={item.path}>{item.children?<>
        <button type="button" className={`nav-item w-full ${pathname.startsWith(item.path)?'nav-active':''}`} aria-expanded={open} aria-controls={`${prefix}-profile`} onClick={()=>setExpanded(open?null:item.path)}><Icon aria-hidden="true" className="h-4 w-4 shrink-0"/><span>{item.label}</span><FaChevronDown aria-hidden="true" className={`ml-auto h-3 w-3 ${open?'rotate-180':''}`}/></button>
        {open&&<ul id={`${prefix}-profile`} className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">{item.children.map(child=><li key={child.path}><Link to={child.path} onClick={close} aria-current={active(child.path)?'page':undefined} className={`nav-item text-sm ${active(child.path)?'nav-active':''}`}>{child.label}</Link></li>)}</ul>}
      </>:<Link to={item.path} onClick={close} aria-current={isActive?'page':undefined} className={`nav-item ${isActive?'nav-active':''}`}><Icon aria-hidden="true" className="h-4 w-4 shrink-0"/><span>{item.label}</span></Link>}</li>;
    })}</ul></nav>
    <div className="navigation-identity border-t border-gray-200 px-6 py-5"><div className="account-person"><span className="identity-mark" aria-hidden="true">{userName.replace(/^(?:Dra?\.|Prof\.)\s*/i, "").split(" ").filter(Boolean).slice(0,2).map(word=>word[0]).join("")}</span><div className="min-w-0"><p className="break-words text-sm font-semibold text-gray-900">{userName}</p><p className="mt-1 text-xs text-gray-600">{userRole}</p></div></div></div>
  </>;
  return <>
    <button ref={trigger} type="button" aria-label="Abrir menú de navegación" aria-haspopup="dialog" className="fixed left-4 top-3.5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-green-800 text-white lg:hidden" onClick={()=>dialog.current?.showModal()}><FaBars aria-hidden="true"/></button>
    <aside className="app-sidebar hidden lg:flex">{navigation('desktop')}</aside>
    <dialog ref={dialog} aria-label="Menú de navegación" className="mobile-navigation" onClick={e=>{if(e.target===e.currentTarget)close();}} onClose={()=>trigger.current?.focus()}>
      <div className="navigation-surface flex h-full flex-col"><button type="button" aria-label="Cerrar menú de navegación" className="navigation-close absolute right-3 top-5 inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100" onClick={close}><FaTimes aria-hidden="true"/></button>{navigation('mobile')}</div>
    </dialog>
  </>;
}

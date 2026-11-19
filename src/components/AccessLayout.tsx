import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FaPause, FaPlay } from 'react-icons/fa';

export default function AccessLayout() {
 const [paused,setPaused]=useState(false);
 const {pathname}=useLocation();
 const previousPath=useRef(pathname);
 const formFrame=useRef<HTMLDivElement>(null);
 // Keep the previous height while the new form enters, including validation messages.
 useLayoutEffect(()=>{
  const frame=formFrame.current;
  const content=frame?.firstElementChild;
  if(!frame || !(content instanceof HTMLElement)) return;
  const resize=()=>{frame.style.height=`${content.offsetHeight}px`;};
  resize();
  const observer=new ResizeObserver(resize);
  observer.observe(content);
  return ()=>observer.disconnect();
 },[pathname]);
 const paperExchange=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(previousPath.current===pathname) return;
  previousPath.current=pathname;
  formFrame.current?.querySelector('h1')?.focus({preventScroll:true});
  const paper=paperExchange.current;
  if(!paper) return;
  paper.getAnimations().forEach(animation=>animation.cancel());
  if(paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const animation=paper.animate([
   {transform:'translateY(0) rotate(0deg)'},
   {transform:'translateY(64px) rotate(-3deg)',offset:.4},
   {transform:'translateY(-12px) rotate(2deg)',offset:.8},
   {transform:'translateY(0) rotate(0deg)'},
  ],{duration:700,easing:'cubic-bezier(.22,.7,.25,1)'});
  return ()=>animation.cancel();
 },[pathname,paused]);
 const movePaper=(event:PointerEvent<HTMLDivElement>)=>{
  if(paused || !['mouse','pen'].includes(event.pointerType) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds=event.currentTarget.getBoundingClientRect();
  const x=(event.clientX-bounds.left)/bounds.width-.5;
  const y=(event.clientY-bounds.top)/bounds.height-.5;
  event.currentTarget.style.setProperty('--paper-x',`${(x*12).toFixed(2)}px`);
  event.currentTarget.style.setProperty('--paper-y',`${(y*8).toFixed(2)}px`);
  event.currentTarget.style.setProperty('--paper-tilt',`${(x*8).toFixed(2)}deg`);
 };
 const resetPaper=(event:PointerEvent<HTMLDivElement>)=>{
  for(const property of ['--paper-x','--paper-y','--paper-tilt']) event.currentTarget.style.removeProperty(property);
 };
 return <div className={`access-shell${paused?' access-motion-paused':''}`}><div className="access-layout">
  <aside className="access-brand" aria-label="DGETA, tutoría escolar">
   <div className="access-lockup"><span>DGETA</span><p>Tutoría escolar</p></div>
   <div className="access-brand-content"><p className="access-statement">Tu espacio de tutoría escolar.</p><p className="access-description">Tu información, tus formularios y el seguimiento que te acompaña.</p></div>
   <div className="access-art" aria-hidden="true" onPointerMove={movePaper} onPointerLeave={resetPaper}><div className="access-folder-motion"><div className="access-file-back"/><div className="access-paper-mask"><div className="access-paper-reveal"><div className="access-paper-exchange" ref={paperExchange}><div className="access-paper"><div className="paper-emblem"/><div className="paper-rule paper-rule-long"/><div className="paper-rule"/><div className="paper-rule paper-rule-short"/><div className="paper-rule paper-rule-long"/><div className="paper-rule"/><div className="paper-seal"/></div></div></div></div><div className="access-file-front"><span>Expediente de tutoría</span><div className="file-binding"><span/><span/></div></div></div></div>
   <p className="access-audience">Un portal para alumnos y tutores.</p>
  </aside>
  <main className="access-main"><div className="access-form-frame" ref={formFrame}><Outlet/></div></main>
 </div><div className="access-motion-bar"><button type="button" className="access-motion-toggle" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?<FaPlay aria-hidden="true"/>:<FaPause aria-hidden="true"/>}<span>{paused?'Reanudar animaciones':'Pausar animaciones'}</span></button></div></div>;
}

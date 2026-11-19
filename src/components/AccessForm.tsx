import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { input, primary } from './forms/AnnexShared';

export default function AccessForm({register=false}:{register?:boolean}) {
 const [show,setShow]=useState(false);
 const [error,setError]=useState('');
 const navigate=useNavigate();
 return <div className="access-form-content">
   <header className="access-form-heading"><h1 tabIndex={-1}>{register?'Crear cuenta':'Iniciar sesión'}</h1><p>{register?'Ingresa tus datos personales y de contacto.':'Ingresa con tu correo y contraseña.'}</p></header>
   <form className="access-fields" onSubmit={e=>{e.preventDefault();if(register)setError('Solicita el alta de tu cuenta a la coordinación de tu plantel.');else navigate('/estudiante/dashboard');}}>
    {register&&<div className="access-name-grid">
     <div className="access-given-name"><label htmlFor="access-name">Nombre</label><input id="access-name" name="nombres" autoComplete="given-name" maxLength={150} required className={input}/></div>
     <div><label htmlFor="access-paternal-name">Apellido paterno</label><input id="access-paternal-name" name="apellidoPaterno" autoComplete="family-name" maxLength={150} required className={input}/></div>
     <div><label htmlFor="access-maternal-name">Apellido materno</label><input id="access-maternal-name" name="apellidoMaterno" autoComplete="off" maxLength={150} className={input}/></div>
    </div>}
    <div><label htmlFor="access-email">Correo electrónico</label><input id="access-email" name="email" type="email" autoComplete="username" required className={input}/></div>
    <div><label htmlFor="access-password">Contraseña</label><div className="relative"><input id="access-password" name="password" type={show?'text':'password'} autoComplete={register?'new-password':'current-password'} required className={`${input} pr-14`}/><button type="button" className="access-password-toggle" onClick={()=>setShow(!show)} aria-label={show?'Ocultar contraseña':'Mostrar contraseña'} aria-pressed={show}>{show?<FaEyeSlash aria-hidden="true"/>:<FaEye aria-hidden="true"/>}</button></div></div>
    {error&&<p role="alert" className="text-sm leading-6 text-red-800">{error}</p>}
    <button type="submit" className={`${primary} access-submit`}>{register?'Crear cuenta':'Entrar'}</button>
   </form>
   <p className="access-switch">{register?'¿Ya tienes cuenta?':'¿Aún no tienes cuenta?'} <Link to={register?'/':'/register'}>{register?'Inicia sesión':'Crear cuenta'}</Link></p>
  </div>;
}

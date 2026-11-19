import { initialData } from './profile';

export const PROFILE_KEY = 'dgeta.local.profile.v1';
export const ANNEX6_KEY = 'dgeta.local.annex6.v1';
export const ANNEX9_KEY = 'dgeta.local.annex9.v1';

export function readLocal<T>(key: string, fallback: T): T {
  try {
    const text = localStorage.getItem(key);
    return text ? JSON.parse(text) as T : fallback;
  } catch {
    return fallback;
  }
}

export function writeLocal<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStudentSummary() {
  const profile = readLocal(PROFILE_KEY, initialData);
  return {
    nombre: [profile.personales.nombres, profile.personales.apellidoPaterno, profile.personales.apellidoMaterno].filter(Boolean).join(' '),
    numeroControl: profile.academicos.numeroControl,
    grupo: profile.academicos.grupo,
    carrera: profile.academicos.especialidad,
    turno: profile.academicos.turno,
    semestre: profile.academicos.semestre,
    tutor: profile.academicos.tutor ?? '',
  };
}

export type StudentSummary = ReturnType<typeof getStudentSummary>;

export function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function displayDate(value: string) {
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(new Date(value.length === 10 ? `${value}T12:00:00` : value));
}

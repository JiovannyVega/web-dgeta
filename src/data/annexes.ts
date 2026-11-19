import type { StudentSummary } from './localRecords';

export const annex6Questions = [
  'Mi promedio de la secundaria es igual o mayor a 7',
  'Reprobé 2 o más materias en la secundaria',
  'Yo elegí el plantel de bachillerato al que asisto',
  'Asisto a la Media Superior porque creo que me será útil',
  'Me gusta la escuela',
  'Soy bueno para estudiar',
  'En la secundaria sentía confianza con algún maestro(a) como para platicar con él(ella)',
  'En la secundaria preguntaba mis dudas al maestro(a)',
  'En la secundaria me molestaban con frecuencia otro u otros compañeros (burlas, intimidación, golpes, extorsiones, etc.)',
  'Si yo reprobara alguna materia, se lo platicaría a mi mamá o a mi papá',
  'Si tuviera un problema personal, lo platicaría con mi mamá o mi papá',
  'Me gustaría emigrar a los Estados Unidos en los próximos 5 años',
  'Es posible que me case o viva con mi pareja antes de terminar el bachillerato',
  'En mi casa hemos tenido problemas económicos serios (deudas, no alcanza para los gastos del diario, etc.)',
  'Es más importante trabajar que estudiar',
];

export type Answer = 'V' | 'F';
export const riskKey: Answer[] = ['F', 'V', 'F', 'F', 'F', 'F', 'F', 'F', 'V', 'F', 'F', 'V', 'V', 'V', 'V'];

export function scoreAnnex6(answers: Record<string, unknown>) {
  if (annex6Questions.some((_, index) => answers[String(index + 1)] !== 'V' && answers[String(index + 1)] !== 'F')) throw new Error('Responde los 15 enunciados antes de enviar.');
  const score = riskKey.reduce((total, answer, index) => total + Number(answers[String(index + 1)] === answer), 0);
  const level = score > 10 ? 'Muy alto' : score >= 6 ? 'Alto' : score >= 3 ? 'Moderado' : 'Bajo';
  const guidance = score > 10
    ? 'Es importante dar un seguimiento al caso, ofrecer las orientaciones pertinentes al alumno y acordar un estrecho trabajo conjunto con sus padres para lograr la permanencia escolar.'
    : score >= 6
      ? 'Es importante ofrecer orientaciones al alumno y a sus padres en los factores de riesgo que presente para lograr la permanencia escolar.'
      : score >= 3
        ? 'Se aconseja dialogar con el alumno(a) sobre los factores de riesgo específico para determinar acciones de acompañamiento.'
        : 'El/la estudiante tiene un bajo riesgo de abandonar la escuela.';
  return { score, level, guidance };
}

export interface Annex6Record {
  answers: Record<string, Answer>;
  tutor: string;
  date: string;
  submittedAt?: string;
  student?: StudentSummary;
}

export interface Annex9Record {
  id: string;
  student: StudentSummary;
  tutor: string;
  date: string;
  situation: string;
  attention: string;
  results: string;
  observations: string;
  savedAt: string;
}

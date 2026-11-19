export type Incident = {
  id: string;
  date: string;
  type: 'absence' | 'late';
};

type SubjectAttendance = {
  id: string;
  name: string;
  classes?: number;
  incidents: Incident[];
};

// The student view only consumes published records and does not read student-entered data.
export const attendanceSubjects: SubjectAttendance[] = [
  { id: 'calculo', name: 'Cálculo Diferencial', incidents: [] },
  { id: 'algebra', name: 'Álgebra Lineal', incidents: [] },
  { id: 'fisica', name: 'Física I', incidents: [] },
  { id: 'programacion', name: 'Programación I', incidents: [] },
];

export function buildAttendanceReport(subject: SubjectAttendance) {
  let lates = 0;
  let absences = 0;
  const rows = [...subject.incidents]
    .sort((a, b) => a.date.localeCompare(b.date))
    .flatMap(incident => {
      if (incident.type === 'absence') {
        absences++;
        return [incident];
      }

      lates++;
      return lates % 3 === 0
        ? [incident, { ...incident, id: `conversion-${incident.id}`, type: 'converted' as const }]
        : [incident];
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const converted = Math.floor(lates / 3);
  return { ...subject, rows, lates, converted, totalAbsences: absences + converted };
}

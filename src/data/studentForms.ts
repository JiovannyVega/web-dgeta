import { annex6Questions } from './annexes';

export type Choice = string | { value: string; label: string };
export interface Column { key: string; label: string; options?: string[]; type?: 'text' | 'number'; min?: number; max?: number }
export interface Question {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'radio' | 'multi' | 'table' | 'photo' | 'confirm';
  required?: boolean;
  options?: Choice[];
  columns?: Column[];
  maxRows?: number;
  hint?: string;
  min?: number;
  max?: number;
  when?: { key: string; values: string[] };
}
export interface FormSection { title: string; description?: string; questions: Question[] }
export interface StudentForm { id: string; title: string; description: string; sources: string[]; sections: FormSection[] }
export type Row = Record<string, string>;
export type AnswerValue = string | string[] | Row[];
export type FormAnswers = Record<string, AnswerValue>;
export const FORM_RECORDS_KEY = 'dgeta.local.student-forms.v1';

export const yesNo = ['Sí', 'No'];
const text = (key: string, label: string, hint?: string): Question => ({ key, label, type: 'text', hint });
const long = (key: string, label: string, required = false): Question => ({ key, label, type: 'textarea', required });
const select = (key: string, label: string, options: Choice[], required = false): Question => ({ key, label, type: 'select', options, required });
const yn = (key: string, label: string, required = false): Question => ({ key, label, type: 'radio', options: yesNo, required });
const number = (key: string, label: string, min = 0, max?: number): Question => ({ key, label, type: 'number', min, max });
const detail = (key: string, label: string, parent: string, values = ['Sí']): Question => ({ ...text(key, label), when: { key: parent, values } });
const multi = (key: string, label: string, options: string[]): Question => ({ key, label, type: 'multi', options });
const education = ['Sin estudios', 'Primaria incompleta', 'Primaria concluida', 'Secundaria incompleta', 'Secundaria concluida', 'Carrera técnica', 'Bachillerato incompleto', 'Bachillerato concluido', 'Técnico superior universitario', 'Licenciatura incompleta', 'Licenciatura concluida', 'Especialidad', 'Maestría', 'Doctorado', 'Otro'];
const frequency = ['No los he padecido en los últimos seis meses', '1 o 2 veces en los últimos seis meses', '3 a 5 veces en los últimos seis meses', '6 o más veces en los últimos seis meses'];
const income = ['Hasta 2,000', '2,001 a 6,000', '6,001 a 10,000', '10,001 a 20,000', '20,001 a 30,000', 'Más de 30,000'];

const health: FormSection = { title: 'Salud', questions: [
  select('bodyType', '¿Qué figura corresponde a la percepción que tienes de tu apariencia física?', ['Endomorfo o grueso', 'Ectomorfo o delgado', 'Mesomorfo o atlético']),
  number('height', 'Estatura (cm)', 1, 300), number('weight', 'Peso (kg)', 1, 600),
  yn('recentHealth', 'Durante el último semestre, ¿has tenido algún problema de salud?'), detail('recentHealthDetail', 'Especifica el problema de salud', 'recentHealth'),
  yn('healthService', '¿Actualmente cuentas con algún tipo de servicio de salud?'),
  { ...multi('healthProviders', '¿Con cuáles de los servicios médicos cuentas?', ['IMSS', 'ISSSTE', 'PEMEX', 'El Ejército o Marina', 'Secretaría de Salud', 'Seguro Popular', 'IMSS Oportunidades', 'Médico privado', 'Otro']), when: { key: 'healthService', values: ['Sí'] } },
  detail('healthProviderOther', 'Otro servicio médico', 'healthProviders', ['Otro']),
  select('doctorVisits', '¿Con qué frecuencia asistes al médico?', ['Cada semana', 'Cada mes', 'Cada seis meses', 'Cada año', 'Cuando me enfermo']),
  select('dentistVisits', '¿Con qué frecuencia asistes al dentista?', ['Cada semana', 'Cada mes', 'Cada seis meses', 'Cada año', 'Cuando lo necesito']),
  select('glasses', '¿Necesitas anteojos?', ['No los necesito', 'Sólo para leer', 'Sí los uso', 'Sí los necesito pero no los uso', 'No lo sé']),
  yn('medicalTreatment', '¿Actualmente te encuentras bajo algún tratamiento médico?'), detail('medicalTreatmentDetail', '¿Cuál tratamiento?', 'medicalTreatment'),
  yn('disability', '¿Tienes alguna discapacidad física?'), detail('disabilityDetail', '¿Cuál discapacidad?', 'disability'),
  yn('psychologicalTreatment', '¿Has asistido o asistes a tratamiento psicológico o psiquiátrico?'),
  ...[text('psychologicalFrom', 'Desde (mes/año)'), text('psychologicalUntil', 'Hasta (mes/año)'), text('psychologicalWhere', '¿Dónde?')].map(q => ({ ...q, when: { key: 'psychologicalTreatment', values: ['Sí'] } })),
] };

const healthSheet: FormSection = { title: 'Salud y actividad laboral', questions: [
  yn('medicationAllergy', '¿Eres alérgico a algún medicamento?'), detail('medicationAllergyDetail', '¿A cuál medicamento?', 'medicationAllergy'),
  yn('chronicDisease', '¿Tienes alguna enfermedad crónica?'), detail('chronicDiseaseDetail', '¿Cuál enfermedad?', 'chronicDisease'),
  yn('medication', '¿Tomas algún medicamento?'), detail('medicationDetail', '¿Cuál medicamento tomas?', 'medication'),
  yn('works', '¿Actualmente trabajas?'), detail('workplace', '¿Dónde trabajas? / Nombre de la empresa', 'works'),
] };

const basicSections: FormSection[] = [
  { title: 'Datos complementarios e institución', description: 'Tu identificación, domicilio, teléfonos y datos académicos se agregarán automáticamente.', questions: [
    text('school', 'Escuela / Centro de Bachillerato Tecnológico Agropecuario'), text('schoolNumber', 'Número del centro'),
    text('birthPlace', 'Lugar de nacimiento'), text('birthMunicipality', 'Delegación o municipio de nacimiento'), text('birthState', 'Entidad federativa de nacimiento'), text('birthCountry', 'País de nacimiento'), text('nationality', 'Nacionalidad'),
    { key: 'photo', label: 'Fotografía del estudiante', type: 'photo', hint: 'JPG, PNG o WebP de hasta 500 KB. Se reutiliza en la ficha y el diagnóstico.' },
  ] },
  { title: 'Antecedentes escolares y trabajo', questions: [
    text('previousSchool', 'Nombre de la escuela en donde cursaste el último ciclo escolar'), text('previousSchoolAddress', 'Domicilio de la escuela anterior'), text('previousSchoolMunicipality', 'Delegación o municipio de la escuela anterior'), text('previousSchoolState', 'Entidad federativa de la escuela anterior'), text('previousSchoolShift', 'Turno de la escuela anterior'), number('previousAverage', 'Promedio de calificaciones en el ciclo escolar anterior', 0, 10),
    yn('scholarship', '¿Recibiste alguna beca?'), detail('scholarshipDetail', 'Especifica la beca', 'scholarship'),
    yn('works', '¿Actualmente trabajas?'), detail('workplace', 'Nombre de la empresa / ¿Dónde trabajas?', 'works'),
    ...[text('workPosition', 'Puesto u ocupación'), text('workSchedule', 'Horario de trabajo'), number('workHours', 'Número de horas a la semana que trabajas', 0, 168)].map(q => ({ ...q, when: { key: 'works', values: ['Sí'] } })),
  ] },
  { title: 'Familiares que viven contigo', description: 'Relaciona únicamente a las personas que viven en tu misma casa. Puedes dejar la tabla vacía si no corresponde.', questions: [{ key: 'household', label: 'Datos familiares', type: 'table', maxRows: 20, columns: [
    { key: 'surnames', label: 'Apellidos' }, { key: 'names', label: 'Nombre(s)' }, { key: 'sex', label: 'Sexo', options: ['Femenino', 'Masculino'] }, { key: 'age', label: 'Edad', type: 'number', min: 0, max: 120 }, { key: 'occupation', label: 'Ocupación' }, { key: 'relationship', label: 'Parentesco' },
  ] }] },
  ...['madre', 'padre'].map((parent): FormSection => ({ title: `Datos de ${parent === 'madre' ? 'la madre' : 'el padre'}`, description: 'Completa los datos que conozcas y que correspondan a tu situación familiar.', questions: [
    text(`${parent}Paternal`, 'Apellido paterno'), text(`${parent}Maternal`, 'Apellido materno'), text(`${parent}Name`, 'Nombre(s)'), { key: `${parent}BirthDate`, label: 'Fecha de nacimiento', type: 'date' },
    text(`${parent}BirthPlace`, 'Lugar de nacimiento'), text(`${parent}Municipality`, 'Delegación o municipio'), text(`${parent}State`, 'Entidad federativa'), text(`${parent}Country`, 'País'), text(`${parent}Curp`, 'CURP'), select(`${parent}Education`, 'Grado máximo de estudios', education), detail(`${parent}EducationOther`, 'Especifica otros estudios', `${parent}Education`, ['Otro']),
    yn(`${parent}Works`, '¿Trabaja?'), { ...number(`${parent}Hours`, 'Número de horas a la semana que trabaja', 0, 168), when: { key: `${parent}Works`, values: ['Sí'] } },
  ] })),
  { title: 'Ingresos familiares', questions: [
    select('incomePeople', '¿Cuántas personas que viven en tu casa tienen ingresos?', ['1', '2', '3', '4', '5 o más']),
    multi('financialDependence', '¿De quién dependes económicamente?', ['Padre', 'Madre', 'Hermano(a)', 'Otro']), detail('financialDependenceOther', 'Especifica de quién dependes', 'financialDependence', ['Otro']),
    { key: 'familyIncome', label: 'Ingresos familiares mensuales', type: 'table', maxRows: 20, columns: [{ key: 'person', label: 'Persona con ingresos económicos' }, { key: 'income', label: 'Ingreso mensual en pesos', options: income }, { key: 'percentage', label: 'Porcentaje destinado al gasto familiar', type: 'number', min: 0, max: 100 }] },
  ] },
  { title: 'Vivienda', questions: [
    select('houseOwnership', 'La casa donde vives es', ['Propia', 'Rentada', 'Prestada', 'Otro']), detail('houseOwnershipOther', 'Especifica otra situación de vivienda', 'houseOwnership', ['Otro']),
    select('houseType', 'Tipo de vivienda', ['Casa', 'Departamento', 'Vecindad', 'Otro']), detail('houseTypeOther', 'Especifica otro tipo de vivienda', 'houseType', ['Otro']),
    select('walls', 'Las paredes son de', ['Tabique', 'Madera', 'Lámina', 'Otro']), detail('wallsOther', 'Especifica otro material de paredes', 'walls', ['Otro']),
    select('floor', 'El piso es de', ['Loseta', 'Cemento', 'Madera', 'Otro']), detail('floorOther', 'Especifica otro material del piso', 'floor', ['Otro']),
    select('roof', 'El techo es de', ['Concreto', 'Lámina', 'Madera', 'Otro']), detail('roofOther', 'Especifica otro material del techo', 'roof', ['Otro']),
  ] },
  { title: 'Bienes y servicios', questions: [
    ...['Agua potable', 'Drenaje', 'Electricidad', 'Lavadora de ropa', 'Estufa de gas', 'Horno de microondas', 'Refrigerador', 'Línea telefónica', 'Computadora', 'Lap top', 'Tableta', 'Internet', 'Televisión de paga (Sky, Dish, Cable)', 'VHS', 'DVD', 'Blue ray'].map((name, i) => yn(`houseService${i}`, `¿Tu vivienda cuenta con ${name.toLowerCase()}?`)),
    ...['Reproductor digital portátil de música', 'Tablet', 'Lap top'].map((name, i) => yn(`personalDevice${i}`, `¿Para tu uso personal cuentas con ${name.toLowerCase()}?`)),
    select('lightbulbs', '¿Cuántos focos hay dentro de tu vivienda?', ['1', '2', '3', '4', '5', '6 o más']), select('televisions', '¿Cuántas televisiones hay en tu vivienda?', ['1', '2', '3', '4', '5 o más']),
  ] },
  health,
  { title: 'Cuadro clínico personal', description: 'Indica qué trastornos has padecido y con qué frecuencia durante los últimos seis meses. Estas respuestas no sustituyen una valoración médica.', questions: [
    ...[
      ['Gastrointestinales', 'Dolor intenso en la boca del estómago o intestino, diarreas frecuentes, estreñimiento crónico, náusea o vómito frecuentes, mareos continuos.'],
      ['Respiratorios', 'Gripa o tos constante por más de 15 días, dificultad para respirar sin ejercicio vigoroso, tuberculosis, inflamación de ganglios, hipoacusia, dolor intenso en articulaciones.'],
      ['Circulatorios', 'Aumento de la frecuencia de los latidos sin ejercicio, hinchazón en manos, pies o párpados, problemas de corazón, venas o presión.'],
      ['Hormonales o metabólicos', 'Incremento o pérdida no voluntaria de más de cinco kilos, diabetes, híper o hipotiroidismo, trastornos del desarrollo.'],
      ['De la piel', 'Dermatitis frecuentes, acné, herpes, lunares, verrugas, tiña u hongos.'],
      ['Neurológicos', 'Convulsiones, mareos, desmayos, dolor de cabeza intenso que impide las actividades cotidianas o somnolencia durante actividades diarias.'],
      ['Genitourinarios', 'Ardor o comezón en genitales, úlceras, verrugas, secreciones genitales verdosas o amarillentas, enfermedades de transmisión sexual, insuficiencia renal, cistitis o sangrado al orinar.'],
      ['Alergias', 'Especifica las alergias en el siguiente campo.'], ['Otros', 'Especifica otros trastornos en el siguiente campo.'],
    ].map(([label, hint], index) => ({ ...select(`clinical${index}`, label, frequency), hint })),
    text('clinicalAllergies', 'Especifica las alergias del cuadro clínico'), text('clinicalOther', 'Especifica otros trastornos'),
  ] },
  { title: 'Cuadro clínico familiar', description: 'Durante el último año, ¿quién de tus familiares ha padecido estas enfermedades? Indica el familiar o escribe Ninguno / No lo sé.', questions: [
    ...['Respiratorias', 'Gastrointestinales', 'Dermatológicas', 'Neurológicas', 'Hipertensión', 'Cáncer', 'Obesidad', 'Diabetes mellitus', 'Cardiovasculares', 'Hepáticas', 'Tumores'].map((name, index) => text(`familyClinical${index}`, `${name}: familiar que la padece`)), text('familyClinicalOther', 'Otra enfermedad: especifica cuál y qué familiar la padece'),
  ] },
  { title: 'Alimentación', questions: [
    ...['Desayunas', 'Comes', 'Cenas'].map((name, i) => select(`meals${i}`, `¿Con qué frecuencia ${name.toLowerCase()}?`, ['De 1 a 2 veces por semana', 'De 3 a 4 veces por semana', 'De 5 a 7 veces por semana'])),
    ...['Frutas frescas', 'Verduras', 'Cereales (trigo, avena, etc.)', 'Tubérculos (papa, camote)', 'Lácteos (leche, queso, yogurt)', 'Leguminosas (frijoles, habas, lentejas)', 'Carne roja (res, cerdo)', 'Carne blanca (pollo, pescado)', 'Refrescos o aguas dulces', 'Jugos naturales o envasados', 'Golosinas dulces', 'Golosinas saladas (papitas)', 'Comida rápida (hot dogs, tacos, tortas)', 'Pan dulce', 'Pan blanco o bolillo', 'Tortillas'].map((name, i) => select(`foods${i}`, `¿Con qué frecuencia consumes ${name.toLowerCase()}?`, ['Todos los días', 'Varias veces a la semana', 'De vez en cuando', 'Nunca'])),
    yn('foodDiscomfort', 'Cuando tomas algún alimento, ¿te sientes mal o cansado?'),
  ] },
  { title: 'Ejercicio, deportes y hábitos de consumo', questions: [
    select('exercise', '¿Cuántas veces a la semana haces ejercicio físico?', ['De 1 a 2 veces', 'De 3 a 4 veces', 'De 5 a 7 veces', 'Nunca']), yn('sports', '¿Practicas algún deporte?'),
    { ...multi('sportsTypes', '¿Qué deportes practicas?', ['Futbol', 'Beisbol', 'Basquetbol', 'Natación', 'Atletismo', 'Halterofilia', 'Tenis', 'Gimnasia', 'Judo', 'Karate', 'Boxeo', 'Lucha', 'Ciclismo', 'Charrería', 'Otro']), when: { key: 'sports', values: ['Sí'] } }, detail('sportsOther', 'Especifica otro deporte', 'sportsTypes', ['Otro']),
    yn('smokes', '¿Fumas?'), { ...select('cigarettes', '¿Cuántos cigarros por día?', ['1 a 5', '6 a 10', '10 o más']), when: { key: 'smokes', values: ['Sí'] } },
    ...['Cerveza', 'Vinos de mesa', 'Cocteles', 'Licores', 'Otros'].flatMap((name, i) => [yn(`drink${i}`, `¿Consumes ${name.toLowerCase()}?`), { ...select(`drinkFrequency${i}`, `${name}: ¿cuántas veces por semana?`, ['Una', '2 o 3', '4 o más']), when: { key: `drink${i}`, values: ['Sí'] } }]), detail('drinkOther', 'Especifica otras bebidas', 'drink4'),
    yn('friendsAddiction', '¿Consideras que tus amigos tienen alguna adicción?'), detail('friendsAddictionDetail', 'Especifica la adicción', 'friendsAddiction'), yn('friendsDrugs', '¿Consideras que tus amigos consumen alguna droga?'), detail('friendsDrugsDetail', 'Especifica la droga', 'friendsDrugs'),
  ] },
  { title: 'Recreación, internet y telefonía móvil', questions: [
    multi('recreation', 'Marca las actividades que frecuentemente realizas', ['Ir al parque', 'Ir al cine', 'Ir a bailar', 'Jugar videojuegos', 'Ir de compras', 'Hacer deporte', 'Reunirte con amigos', 'Salir con mi pareja', 'Escuchar música', 'Usar la computadora', 'Ver televisión', 'Ver películas en casa', 'Leer', 'Otro']), detail('recreationOther', 'Especifica otra actividad', 'recreation', ['Otro']),
    yn('internetSkills', '¿Sabes usar internet?'), yn('internetAccess', '¿Tienes acceso a internet?'),
    { ...select('internetPlace', 'Lugar principal en el que tienes acceso a internet', ['Casa', 'Café internet', 'Escuela', 'Casa de algún amigo o familiar', 'Trabajo', 'Otro']), when: { key: 'internetAccess', values: ['Sí'] } }, detail('internetPlaceOther', 'Especifica otro lugar de acceso', 'internetPlace', ['Otro']),
    multi('internetUses', '¿Para qué utilizas el internet?', ['Jugar', 'Uso de redes sociales como Facebook, Hi5, Twitter, Blogs', 'Ver videos', 'Bajar o escuchar música', 'Chatear', 'Buscar amigos', 'Buscar pareja', 'Buscar empleo', 'Correo electrónico', 'Foros de discusión', 'Buscar y recibir información', 'Hacer compras en línea', 'Leer periódicos, libros o revistas', 'Escuchar o leer noticias', 'Descargar software', 'Ver páginas para adultos', 'Intercambiar archivos', 'Ver programas de televisión', 'Bajar o ver películas', 'Llamadas telefónicas (tipo Skype)', 'Banca por internet', 'Otro']), detail('internetUsesOther', 'Especifica otro uso de internet', 'internetUses', ['Otro']),
    ...['Correo electrónico', 'Página web personal', 'Red social (Facebook, Twitter, Hi5, etc.)', 'Blog/weblog'].map((name, i) => yn(`onlineAccount${i}`, `¿Tienes ${name.toLowerCase()}?`)),
    multi('accountUses', '¿Para qué utilizas esas cuentas?', ['Comunicarte', 'Relaciones de amistad', 'Relaciones profesionales', 'Buscar pareja', 'Entretenimiento', 'Buscar amigos', 'Intercambiar información', 'Otro']), detail('accountUsesOther', 'Especifica otro uso de tus cuentas', 'accountUses', ['Otro']),
    yn('cellphone', '¿Tienes teléfono celular?'), { ...yn('cellphoneInternet', '¿Tu teléfono celular tiene acceso a internet?'), when: { key: 'cellphone', values: ['Sí'] } },
  ] },
  { title: 'Participación social y ambiente familiar', questions: [
    yn('socialParticipation', '¿Actualmente participas en alguna organización, asociación, equipo o grupo?'),
    { ...multi('socialGroups', '¿En cuáles participas?', ['Estudiantil', 'Deportivo', 'Beneficencia', 'Religioso', 'Político', 'Académico', 'Otro']), when: { key: 'socialParticipation', values: ['Sí'] } }, detail('socialGroupsOther', 'Especifica otro grupo', 'socialGroups', ['Otro']),
    yn('parentCommunication', '¿Tienes buena comunicación con tus papás?'),
    ...['¿Existe buena comunicación con tus padres?', '¿Cuando faltas a las reglas establecidas en tu hogar recibes algún correctivo?', '¿Consideras que sufres algún tipo de maltrato (físico o verbal) por algún miembro de tu familia?', '¿Cuando se toman decisiones importantes en tu casa participas en ellas?', '¿Tus padres muestran interés por tus actividades escolares?'].map((label, i) => select(`familyEnvironment${i}`, label, ['Siempre', 'Casi siempre', 'Algunas veces', 'Nunca'])),
  ] },
];

const reflectionSections: FormSection[] = [
  { title: 'Tu persona y tu entorno', questions: [
    long('aboutMe', 'Otra cosa que quiero decir respecto a mi persona es'), long('importantInLife', 'Redacta lo que consideres más importante en tu vida'), long('schoolExperiences', 'Comparte experiencias sobre ti mismo en torno a tus escuelas anteriores'), long('bestSubjects', '¿En qué materias de primaria o secundaria obtuviste mejores calificaciones y por qué?'),
    ...['Mamá', 'Papá', 'Hermano(s)', 'Amigos'].flatMap((name, i) => [long(`relationship${i}`, `¿Cómo es la relación con ${name === 'Mamá' || name === 'Papá' ? 'tu' : 'tus'} ${name}?`), long(`relationshipReason${i}`, '¿Por qué?')]),
    text('bestFriend', '¿Quién es tu mejor amigo?'), long('bestFriendReason', '¿Por qué lo consideras así?'), long('desiredFriend', '¿Quién no es tu mejor amigo y por qué te gustaría que lo fuera?'), long('idealFriend', '¿Cómo te gustaría que fuera tu amigo ideal?'), long('idealFriendReason', '¿Por qué?'),
  ] },
  { title: 'Rasgos de personalidad', description: 'Todos somos distintos. Elige en cada par el rasgo con el que más te identificas.', questions: [
    ...[['Dependiente', 'Independiente'], ['Decidido/a', 'Indeciso/a'], ['Tranquilo/a', 'Inquieto/a'], ['Responsable', 'Irresponsable'], ['Honesto/a', 'Deshonesto/a'], ['Confiado/a', 'Desconfiado/a'], ['Fuerte', 'Débil'], ['Alegre', 'Triste'], ['Divertido', 'Apático']].map((pair, i) => select(`traitA${i}`, `Elige el rasgo que más está presente en ti: ${pair.join(' / ')}`, pair)),
    ...['Responsable', 'Dependiente', 'Honesto'].map((name, i) => long(`traitDefinitionA${i}`, `Describe qué significa para ti: ${name}`)),
    ...[['Seguro', 'Inseguro/a'], ['Sociable', 'No sociable'], ['Puntual', 'Impuntual'], ['Simpático', 'Antipático'], ['Optimista', 'Pesimista'], ['Ordenado', 'Desordenado'], ['Amable', 'Egoísta'], ['Tranquilo/a', 'Agresivo/a'], ['Estudioso/a', 'No estudioso/a']].map((pair, i) => select(`traitB${i}`, `Elige el rasgo que más está presente en ti: ${pair.join(' / ')}`, pair)),
    ...['Sociable', 'Optimista', 'Agresivo'].map((name, i) => long(`traitDefinitionB${i}`, `Describe qué significa para ti: ${name}`)),
  ] },
  { title: 'Tus características y proyecto de vida', questions: [
    { key: 'mainTraits', label: 'Elige tus tres rasgos principales y explica los motivos', type: 'table', maxRows: 3, columns: [{ key: 'trait', label: 'Me considero' }, { key: 'reason', label: 'Porque' }] }, long('extraTrait', 'Me considero así, porque (espacio adicional del formato)'),
    long('traitsForStudy', 'De las características que reconociste, ¿cuáles te ayudan en tus estudios y por qué?'), long('likes', '¿Qué es lo que más te gusta hacer?'), long('dislikes', '¿Qué es lo que más te disgusta?'), long('lifeProject', '¿Cuál es tu proyecto de vida?'), long('futureVision', '¿Cómo te visualizas en un futuro, quizá dentro de 10 años?'), long('futureActions', '¿Qué debes hacer para lograr los dos puntos antes descritos?'),
    yn('admiresSomeone', '¿Conoces a personas o personajes que admiras?'), detail('admiredPerson', '¿Quién es o cómo se llama?', 'admiresSomeone'), { ...yn('imitatePerson', '¿Te gustaría seguir su ejemplo o imitarla?'), when: { key: 'admiresSomeone', values: ['Sí'] } }, { ...long('admiredReason', '¿Por qué?'), when: { key: 'admiresSomeone', values: ['Sí'] } },
  ] },
  { title: 'Materias y entorno escolar', description: 'Registra las materias del último grado de secundaria. Si estás en un semestre distinto al primero, utiliza el último semestre escolar.', questions: [
    { key: 'previousGrades', label: 'Le tomamos la temperatura a tus calificaciones', type: 'table', maxRows: 20, columns: [{ key: 'subject', label: 'Nombre de la asignatura' }, { key: 'grade', label: 'Valoración', options: ['Sobresaliente', 'Notable', 'Bien', 'Suficiente', 'Insuficiente / Deficiente'] }] }, long('lowGrades', '¿En qué materias obtuviste bajas calificaciones y por qué?'),
  ] },
];

export const learningSections: FormSection[] = [
  { title: 'Aprendizaje visual', questions: [
    '¿Eres limpio y ordenado?', '¿Hablas muy rápido?', '¿Planeas muy bien tu agenda?', '¿Ves las palabras en tu mente?', '¿Recuerdas más lo que viste que lo que escuchaste?', '¿Tienes problema con las instrucciones verbales a menos que estén escritas o que te las repitan?', '¿Te gusta leer en vez de oír que alguien lea?', '¿Te distraes en una conversación telefónica?', '¿Prefieres que te pongan un ejemplo en vez de que te den instrucciones verbales?', '¿Sabes lo que quieres?', '¿Sabes lo que quieres decir pero no encuentras las palabras correctas?', '¿Memorizas más por asociaciones de imágenes que de sonidos?',
  ].map((label, i) => ({ ...select(`visual${i + 1}`, label, [{ value: '2', label: 'Siempre · 2 puntos' }, { value: '1', label: 'Algunas veces · 1 punto' }, { value: '0', label: 'Muy rara vez · 0 puntos' }], true) })) },
  { title: 'Aprendizaje auditivo', questions: [
    '¿Te hablas a ti mismo mientras estás trabajando?', '¿Te distraes cuando hay ruido?', '¿Te gusta leer en voz alta y escuchar?', '¿Mueves los labios o pronuncias las palabras mientras estás leyendo?', '¿Lo que escuchaste lo puedes reproducir imitando el tono de voz, el acento, el timbre?', '¿Se te dificulta la escritura, pero eres muy bueno al contar de viva voz lo que escuchaste?', '¿Hablas con cierto acento?', '¿Crees que eres una persona que sabe hablar muy bien y que los demás te prestan atención?', '¿Te gusta la música más que el arte?', '¿Aprendes escuchando y recuerdas lo que escuchaste en vez de recordar lo que viste?', '¿Te gusta hablar mucho, discutir, hacer minuciosas descripciones para los demás?', '¿Antes de escribir algo, lo piensas dentro o lo dices en voz alta y luego lo escribes?',
  ].map((label, i) => select(`auditivo${i + 1}`, label, [{ value: '2', label: 'Siempre · 2 puntos' }, { value: '1', label: 'Algunas veces · 1 punto' }, { value: '0', label: 'Muy rara vez · 0 puntos' }], true)) },
  { title: 'Aprendizaje de sensación', questions: [
    '¿Hablas calmadamente tomando bastante aire?', '¿Tocas a las personas para que te presten atención?', '¿Te acercas cuando estás hablando con alguien?', '¿Mueves mucho tu cuerpo?', '¿Aprendes más cuando lo estás haciendo?', '¿Memorizas más cuando caminas o te paseas?', '¿Utilizas tu dedo para mantener el renglón mientras estás leyendo?', '¿Gesticulas mucho tu rostro cuando te expresas?', '¿Te es difícil permanecer sentado por largos períodos de tiempo?', '¿Tomas decisiones basándote en tus sentimientos?', '¿Tocas objetos, como un bolígrafo o lápiz, o mueves tus dedos o tus pies mientras estás escuchando?', '¿Practicas deportes y actividades al aire libre?',
  ].map((label, i) => select(`sensacion${i + 1}`, label, [{ value: '2', label: 'Siempre · 2 puntos' }, { value: '1', label: 'Algunas veces · 1 punto' }, { value: '0', label: 'Muy rara vez · 0 puntos' }], true)) },
];

const evaluationQuestions: Question[] = [
  yn('evaluation1', '¿Identificas al tutor escolar?', true), yn('evaluation2', '¿Conoces a tu tutor grupal?', true),
  yn('evaluation3', '¿Consideras que tu tutor grupal es una persona dispuesta para ayudarte y te brindó una atención cordial y de respeto?', true),
  yn('evaluation4', '¿Tu tutor grupal te ayudó a resolver las dudas o los problemas que le planteaste?', true),
  yn('evaluation5', '¿Consideras que el tutor grupal dispuso de tiempo suficiente para atenderte?', true),
  select('evaluation6', '¿Cuántas sesiones recibiste de tutoría grupal durante el semestre?', ['Ninguna', 'De 1 a 4 sesiones', 'De 5 a 8 sesiones', '9 sesiones o más'], true),
  yn('evaluation7', 'Cuando lo solicitaste, ¿recibiste tutoría individual?', true), yn('evaluation8', 'Cuando fue necesario, ¿recibiste visitas domiciliarias por parte del tutor grupal o escolar?', true), yn('evaluation9', 'Cuando has requerido atención especializada, ¿te han canalizado al área o instancia correspondiente?', true),
  yn('evaluation10', 'Cuando tuviste problemas en tu aprovechamiento escolar, ¿el tutor te proporcionó el apoyo necesario o te puso en contacto con el profesor que pudiera darte asesoría académica?', true),
  yn('evaluation11', '¿Consideras que la ayuda que te brindó el tutor grupal te permitió decidir acertadamente lo que harías al término del bachillerato tecnológico?', true),
  yn('evaluation12', 'El tutor grupal o algún directivo de tu escuela te informaron acerca de los programas de becas que pudiste aprovechar.', true),
  yn('evaluation13', 'En general las tutorías grupales que recibiste se llevaron a cabo en un ambiente cordial y de respeto entre compañeros.', true),
  yn('evaluation14', '¿Consideras que las tutorías influyen positivamente en tu vida personal y académica?', true), yn('evaluation15', '¿Consideras que las tutorías son importantes para un desarrollo integral de la persona?', true),
  long('evaluation16', '¿Qué propondrías para mejorar el programa de Tutorías y favorecer tu desarrollo durante tu estancia en el plantel?', true),
];

export const studentForms: StudentForm[] = [
  { id: 'anexo-11', title: 'Evaluación de la tutoría grupal', description: 'Evalúa la atención y el acompañamiento que recibiste del tutor durante el semestre.', sources: ['Anexo 11. Evaluación de la tutoría'], sections: [0, 1, 2, 3].map(i => ({ title: `Evaluación · Parte ${i + 1}`, description: 'Evalúa tu experiencia con la tutoría durante el semestre.', questions: evaluationQuestions.slice(i * 4, i * 4 + 4) })) },
  { id: 'anexo-12', title: 'Autoevaluación del estudiante', description: 'Reflexiona sobre tus metas, desempeño y experiencia al concluir el semestre.', sources: ['Anexo 12. Autoevaluación del estudiante'], sections: [
    { title: 'Metas y factores', questions: [long('selfGoals', '¿Lograste tus metas propuestas a inicio de semestre?', true), long('selfHelp', '¿Qué factores te ayudaron al logro de tus metas?', true), long('selfBarriers', '¿Qué factores afectaron el logro de tus metas?', true)] },
    { title: 'Problemas y desempeño', questions: [...Array.from({ length: 5 }, (_, i) => text(`selfProblem${i + 1}`, `Problema ${i + 1} que afectó tu desempeño académico`, 'Ordénalos del 1 al 5; si no hubo problemas, puedes dejar estos espacios vacíos.')), select('selfPerformance', '¿Cómo evalúas tu desempeño académico en general?', ['Excelente', 'Bueno', 'Regular', 'Deficiente'], true)] },
    { title: 'Tutoría y cierre de semestre', questions: [long('selfTutor', '¿Consideras que el tutor asignado cumple con su función?', true), long('selfSuggestions', '¿Qué sugerencia haces a tu tutor para mejorar su labor?', true), long('selfFeelings', '¿Cómo te sientes de concluir un semestre más?', true)] },
  ] },
  { id: 'ficha-estudiante', title: 'Ficha del estudiante', description: 'Información complementaria de identificación, salud y trabajo. Tus datos personales y académicos se agregarán automáticamente.', sources: ['FICHA DEL ESTUDIANTE (identificada internamente como Anexo 10)'], sections: [
    { title: 'Institución e información complementaria', questions: [text('school', 'Escuela'), text('schoolCode', 'Clave de la escuela'), text('socialSecurity', 'Número de seguridad social'), text('guardianName', 'Nombre del padre, madre o tutor legal', 'Se refiere al familiar o tutor legal, no al tutor académico.'), { key: 'photo', label: 'Fotografía del estudiante', type: 'photo', hint: 'JPG, PNG o WebP de hasta 500 KB.' }] },
    healthSheet,
    { title: 'Estilo de aprendizaje', description: 'El resultado se obtiene automáticamente del test de estilos de aprendizaje; no tienes que capturarlo.', questions: [] },
  ] },
  { id: 'estilos-aprendizaje', title: 'Test de estilos de aprendizaje', description: '36 preguntas: aprendizaje visual, auditivo y de sensación. Incluye la hoja de respuestas y el total por categoría.', sources: ['T.S1.F3.a3. Test estilos de aprendizaje', 'HOJA DE RESPUESTAS'], sections: learningSections },
  { id: 'diagnostico-2018', title: 'Diagnóstico 2018', description: 'Entorno familiar, escolar, socioeconómico y de salud. Las respuestas comunes se reutilizan en el diagnóstico inicial.', sources: ['DIAGNOSTICO 2018'], sections: basicSections },
  { id: 'diagnostico-inicial', title: 'Diagnóstico inicial', description: 'Comparte información sobre tu entorno familiar, intereses y trayectoria escolar.', sources: ['T.S1.F1.a4. Diagnóstico inicial'], sections: [...basicSections, ...reflectionSections] },
];

export const getChoiceValue = (choice: Choice) => typeof choice === 'string' ? choice : choice.value;
export const getChoiceLabel = (choice: Choice) => typeof choice === 'string' ? choice : choice.label;

export function isVisible(question: Question, answers: FormAnswers, allQuestions: Question[], seen: string[] = []): boolean {
  if (!question.when) return true;
  if (seen.includes(question.key)) return false;
  const parent = allQuestions.find(item => item.key === question.when?.key);
  if (parent && !isVisible(parent, answers, allQuestions, [...seen, question.key])) return false;
  const value = answers[question.when.key];
  return question.when.values.some(expected => Array.isArray(value) ? value.some(item => typeof item === 'string' && item === expected) : value === expected);
}

export function hasAnswer(value: AnswerValue | undefined) {
  if (Array.isArray(value)) return value.some(item => typeof item === 'string' ? Boolean(item.trim()) : Object.values(item).some(cell => cell.trim()));
  return typeof value === 'string' && Boolean(value.trim());
}

export function validateQuestions(questions: Question[], answers: FormAnswers, allQuestions: Question[]): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const question of questions.filter(item => isVisible(item, answers, allQuestions))) {
    const value = answers[question.key];
    if (question.required && !hasAnswer(value)) errors[question.key] = 'Completa esta respuesta para continuar.';
    if (!hasAnswer(value)) continue;
    if (question.options && question.type !== 'table') {
      const options = question.options.map(getChoiceValue);
      const selected = Array.isArray(value) ? value : [value];
      if (selected.some(item => typeof item !== 'string' || !options.includes(item))) errors[question.key] = 'Elige una de las opciones disponibles.';
    }
    if (question.type === 'number' && (typeof value !== 'string' || !Number.isFinite(Number(value)) || (question.min !== undefined && Number(value) < question.min) || (question.max !== undefined && Number(value) > question.max))) errors[question.key] = `Escribe un número válido${question.min !== undefined ? ` desde ${question.min}` : ''}${question.max !== undefined ? ` hasta ${question.max}` : ''}.`;
    if (question.type === 'date' && (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(new Date(value).getTime()))) errors[question.key] = 'Escribe una fecha válida.';
    if (question.type === 'table' && Array.isArray(value)) for (const row of value) {
      if (typeof row === 'string') { errors[question.key] = 'Revisa los datos de la tabla.'; continue; }
      for (const column of question.columns ?? []) {
        const cell = row[column.key];
        if (!cell?.trim()) continue;
        if (column.options && !column.options.includes(cell)) errors[question.key] = 'Selecciona una opción válida en la tabla.';
        if (column.type === 'number' && (!Number.isFinite(Number(cell)) || (column.min !== undefined && Number(cell) < column.min) || (column.max !== undefined && Number(cell) > column.max))) errors[question.key] = `Revisa el valor de ${column.label} en la tabla.`;
      }
    }
  }
  return errors;
}

export function scoreLearning(answers: FormAnswers) {
  const questions = learningSections.flatMap(section => section.questions);
  if (Object.keys(validateQuestions(questions, answers, questions)).length) throw new Error('Responde las 36 preguntas con una opción válida.');
  const scores = ['visual', 'auditivo', 'sensacion'].map(prefix => Array.from({ length: 12 }, (_, i) => Number(answers[`${prefix}${i + 1}`])).reduce((sum, value) => sum + value, 0));
  const max = Math.max(...scores);
  const names = ['Visual', 'Auditivo', 'De sensación'];
  return { scores, dominant: names.filter((_, i) => scores[i] === max), names };
}

export const annex6Form: StudentForm = {
  id: 'anexo-6', title: 'Cuestionario de perfil personal y académico',
  description: 'Comparte tu experiencia escolar y tus expectativas al iniciar el bachillerato.',
  sources: ['Anexo 6. Cuestionario de perfil personal y académico'],
  sections: [0, 1, 2].map(index => ({ title: `Enunciados ${index * 5 + 1} a ${index * 5 + 5}`, description: 'Selecciona Verdadero (V) o Falso (F) en cada enunciado.', questions: annex6Questions.slice(index * 5, index * 5 + 5).map((label, offset) => ({ key: String(index * 5 + offset + 1), label: `${index * 5 + offset + 1}. ${label}`, type: 'radio', required: true, options: [{ value: 'V', label: 'Verdadero (V)' }, { value: 'F', label: 'Falso (F)' }] })) })),
};

export const allStudentForms = [annex6Form, ...studentForms];

export function buildFormSteps(form: StudentForm) {
  return form.sections.flatMap((section, sectionIndex) => {
    const roots = section.questions.filter(question => !question.when || !section.questions.some(parent => parent.key === question.when?.key));
    const descendants = (root: Question, visited: string[] = []): Question[] => visited.includes(root.key) ? [] : [root, ...section.questions.filter(question => question.when?.key === root.key).flatMap(question => descendants(question, [...visited, root.key]))];
    const chunks: Question[][] = [];
    let chunk: Question[] = [];
    for (const root of roots) {
      const group = descendants(root);
      if (chunk.length && chunk.length + group.length > 6) { chunks.push(chunk); chunk = []; }
      chunk.push(...group);
    }
    if (chunk.length || !chunks.length) chunks.push(chunk);
    return chunks.map((questions, index) => ({ ...section, sectionIndex, title: `${section.title}${chunks.length > 1 ? ` · Parte ${index + 1}` : ''}`, questions }));
  });
}

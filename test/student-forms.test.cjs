const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const ts = require('typescript');
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
const { studentForms, allStudentForms, buildFormSteps, isVisible, scoreLearning, validateQuestions, FORM_RECORDS_KEY } = require('../src/data/studentForms.ts');
const { getFormStore, saveStudentForm, formInitialAnswers } = require('../src/data/studentFormStorage.ts');
const { initialData } = require('../src/data/profile.ts');
const { writeLocal, ANNEX6_KEY, PROFILE_KEY, today } = require('../src/data/localRecords.ts');
const form = id => studentForms.find(item => item.id === id);

function resetStorage() {
  const values = new Map();
  global.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test('El catálogo cubre los nuevos documentos sin incluir anexos exclusivos del tutor', () => {
  assert.equal(allStudentForms.length, 7);
  assert.deepEqual(studentForms.map(item => item.id).sort(), ['anexo-11', 'anexo-12', 'diagnostico-2018', 'diagnostico-inicial', 'estilos-aprendizaje', 'ficha-estudiante']);
  for (const definition of studentForms) {
    const keys = definition.sections.flatMap(section => section.questions.map(q => q.key));
    assert.equal(new Set(keys).size, keys.length, `No debe duplicar preguntas dentro de ${definition.id}`);
  }
  assert.equal(form('anexo-11').sections.flatMap(section => section.questions).length, 16);
  assert.equal(form('estilos-aprendizaje').sections.flatMap(section => section.questions).length, 36);
  assert.equal(form('estilos-aprendizaje').sources.length, 2);
});

test('Los pasos mantienen juntas las preguntas condicionales y sus antecedentes', () => {
  for (const definition of allStudentForms) {
    const steps = buildFormSteps(definition);
    const questions = definition.sections.flatMap(section => section.questions);
    assert.equal(steps.flatMap(step => step.questions).length, questions.length);
    for (const section of definition.sections) for (const question of section.questions) {
      if (question.when && section.questions.some(parent => parent.key === question.when.key)) {
        assert.ok(steps.some(step => step.questions.some(q => q.key === question.key) && step.questions.some(q => q.key === question.when.key)), `${definition.id}: ${question.key} conserva el contexto`);
      }
    }
  }
});

test('El Anexo 6 anterior se conserva al adoptar el nuevo flujo', () => {
  resetStorage();
  const legacy = { answers: { '1': 'F', '2': 'V' }, date: '2026-11-12', tutor: 'Tutor anterior' };
  writeLocal(ANNEX6_KEY, legacy);
  assert.deepEqual(getFormStore().records['anexo-6'].answers, legacy.answers);
  saveStudentForm(allStudentForms[0], { ...legacy.answers, '3': 'F' }, false, 1);
  assert.equal(getFormStore().records['anexo-6'].step, 1);
  assert.equal(getFormStore().records['anexo-6'].answers['3'], 'F');
});

test('Aprendizaje: puntúa cero, máximos, ganador, empates y rechaza incompletos', () => {
  const answerSet = (v, a, s) => Object.fromEntries(['visual', 'auditivo', 'sensacion'].flatMap((prefix, i) => Array.from({ length: 12 }, (_, j) => [`${prefix}${j + 1}`, String([v, a, s][i])])));
  assert.deepEqual(scoreLearning(answerSet(2, 1, 0)).scores, [24, 12, 0]);
  assert.deepEqual(scoreLearning(answerSet(2, 1, 0)).dominant, ['Visual']);
  assert.deepEqual(scoreLearning(answerSet(1, 2, 2)).dominant, ['Auditivo', 'De sensación']);
  assert.deepEqual(scoreLearning(answerSet(0, 0, 0)).dominant, ['Visual', 'Auditivo', 'De sensación']);
  assert.deepEqual(scoreLearning(answerSet(2, 2, 2)).scores, [24, 24, 24]);
  assert.throws(() => scoreLearning({}), /36 preguntas/);
  assert.throws(() => scoreLearning({ ...answerSet(1, 1, 1), visual1: '3' }), /36 preguntas/);
});

test('Las preguntas condicionales respetan también al antecedente del que dependen', () => {
  const questions = form('diagnostico-2018').sections.flatMap(section => section.questions);
  const otherSport = questions.find(q => q.key === 'sportsOther');
  assert.equal(isVisible(otherSport, { sports: 'Sí', sportsTypes: ['Otro'] }, questions), true);
  assert.equal(isVisible(otherSport, { sports: 'No', sportsTypes: ['Otro'] }, questions), false);
  const parents = questions.find(q => q.key === 'madreHours');
  assert.equal(isVisible(parents, { madreWorks: 'No' }, questions), false);
});

test('Validación: opciones, números, tablas y respuestas obligatorias', () => {
  const questions = form('diagnostico-2018').sections.flatMap(section => section.questions);
  assert.ok(validateQuestions(questions, { previousAverage: '11', familyIncome: [{ percentage: '101' }] }, questions).previousAverage);
  assert.ok(validateQuestions(questions, { familyIncome: [{ percentage: '101' }] }, questions).familyIncome);
  assert.ok(validateQuestions(questions, { houseType: 'Opción inventada' }, questions).houseType);
  const evaluation = form('anexo-11').sections.flatMap(section => section.questions);
  assert.equal(Object.keys(validateQuestions(evaluation, {}, evaluation)).length, 16);
});

test('Borradores compartidos, entregas históricas y aislamiento de los formularios', () => {
  resetStorage();
  const profile = structuredClone(initialData);
  profile.academicos.tutor = 'Tutor de prueba';
  writeLocal(PROFILE_KEY, profile);
  saveStudentForm(form('ficha-estudiante'), { school: 'Plantel prueba', works: 'Sí', workplace: 'Taller' }, false);
  assert.equal(formInitialAnswers(form('diagnostico-inicial')).school, 'Plantel prueba');
  assert.equal(formInitialAnswers(form('diagnostico-2018')).workplace, 'Taller');
  saveStudentForm(form('diagnostico-2018'), { school: 'Plantel prueba', works: 'No', workplace: 'Valor anterior que debe excluirse', household: [{ names: 'Familiar' }] }, true);
  const saved = getFormStore().records['diagnostico-2018'];
  assert.equal(saved.answers.workplace, undefined);
  assert.equal(saved.student.tutor, 'Tutor de prueba');
  assert.equal(formInitialAnswers(form('diagnostico-inicial')).school, 'Plantel prueba');
  assert.equal(formInitialAnswers(form('diagnostico-inicial')).works, 'No');
  profile.academicos.tutor = 'Tutor nuevo'; writeLocal(PROFILE_KEY, profile);
  assert.equal(getFormStore().records['diagnostico-2018'].student.tutor, 'Tutor de prueba');
  assert.throws(() => saveStudentForm(form('diagnostico-2018'), {}, true), /ya se finalizó/);
  assert.ok(getFormStore().records['ficha-estudiante']);
  assert.throws(() => saveStudentForm(form('anexo-11'), {}, true), /obligatorias/);
  global.localStorage.setItem(FORM_RECORDS_KEY, '{invalid');
  assert.deepEqual(getFormStore(), { records: {}, shared: {} });
});

test('La fecha de aplicación corresponde al día de finalización y no a la fecha del borrador', () => {
  resetStorage();
  const definition = form('diagnostico-2018');
  writeLocal(FORM_RECORDS_KEY, { records: { [definition.id]: { answers: {}, date: '2000-01-01', savedAt: '2000-01-01T12:00:00Z' } }, shared: {} });
  const saved = saveStudentForm(definition, {}, true);
  assert.equal(saved.date, today());
  assert.equal(saved.submittedAt, saved.savedAt);
  assert.equal(getFormStore().records[definition.id].date, today());
});
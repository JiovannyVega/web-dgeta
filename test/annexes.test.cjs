const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const ts = require('typescript');

for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    });
    module._compile(result.outputText, filename);
  };
}

const { scoreAnnex6, annex6Questions } = require('../src/data/annexes.ts');
const originalKey = 'FVFFFFFFVFFVVVV'.split('');

test('Anexo 6: conserva las 15 preguntas y la puntuación de las 32768 combinaciones', () => {
  assert.equal(annex6Questions.length, 15);
  for (let mask = 0; mask < 2 ** 15; mask++) {
    const answers = Object.fromEntries(originalKey.map((_, index) => [String(index + 1), mask & (1 << index) ? 'V' : 'F']));
    const expected = originalKey.filter((answer, index) => answers[String(index + 1)] === answer).length;
    const result = scoreAnnex6(answers);
    assert.equal(result.score, expected);
    assert.equal(result.level, expected >= 11 ? 'Muy alto' : expected >= 6 ? 'Alto' : expected >= 3 ? 'Moderado' : 'Bajo');
  }
});

test('Anexo 6: rechaza respuestas incompletas o distintas de V/F', () => {
  assert.throws(() => scoreAnnex6({}), /15 enunciados/);
  const answers = Object.fromEntries(originalKey.map((answer, index) => [String(index + 1), answer]));
  answers['4'] = 'Sí';
  assert.throws(() => scoreAnnex6(answers), /15 enunciados/);
});

test('Mi perfil: los datos guardados se reutilizan sin otra captura', () => {
  const storage = new Map();
  global.localStorage = {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };
  const { initialData } = require('../src/data/profile.ts');
  const { PROFILE_KEY, ANNEX6_KEY, readLocal, writeLocal, getStudentSummary } = require('../src/data/localRecords.ts');
  const profile = structuredClone(initialData);
  profile.personales.nombres = 'Alumno de prueba';
  profile.academicos = { especialidad: 'Informática', grupo: 'A', semestre: '1° semestre', turno: 'Mixto', numeroControl: '00123' };
  writeLocal(PROFILE_KEY, profile);
  assert.equal(getStudentSummary().numeroControl, '00123');
  assert.equal(getStudentSummary().carrera, 'Informática');
  assert.equal(getStudentSummary().turno, 'Mixto');
  assert.equal(getStudentSummary().tutor, '');
  profile.academicos.tutor = 'Tutor de prueba';
  writeLocal(PROFILE_KEY, profile);
  assert.equal(getStudentSummary().tutor, 'Tutor de prueba');
  writeLocal(ANNEX6_KEY, { answers: { '1': 'F' }, date: '2026-11-12', tutor: '' });
  assert.deepEqual(readLocal(ANNEX6_KEY, null).answers, { '1': 'F' });
  const snapshot = getStudentSummary();
  profile.academicos.grupo = 'B';
  writeLocal(PROFILE_KEY, profile);
  assert.equal(getStudentSummary().grupo, 'B');
  assert.equal(snapshot.grupo, 'A');
  global.localStorage.setItem(PROFILE_KEY, '{invalid');
  assert.equal(getStudentSummary().nombre, 'Roberto Rangel Garcia');
});

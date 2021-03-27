import compareFiles from '../src/compareFiles.js';
import parse from '../src/parses.js';

test('comparing flat json-files', () => {
  const file1 = parse('data1.json');
  const file2 = parse('data2.json');
  const difference = compareFiles(file1, file2);
  expect(difference).toMatch('   host: hexlet.io');
  expect(difference).toMatch(' - timeout: 50');
  expect(difference).toMatch(' + timeout: 20');
  expect(difference).toMatch(' - proxy: 123.234.53.22');
  expect(difference).toMatch(' - follow: false');
  expect(difference).toMatch(' + verbose: true');
});

test('comparing flat yaml-files', () => {
  const file1 = parse('data1.yml');
  const file2 = parse('data2.yml');
  const difference = compareFiles(file1, file2);
  expect(difference).toMatch('   host: hexlet.io');
  expect(difference).toMatch(' - timeout: 50');
  expect(difference).toMatch(' + timeout: 20');
  expect(difference).toMatch(' - proxy: 123.234.53.22');
  expect(difference).toMatch(' - follow: false');
  expect(difference).toMatch(' + verbose: true');
});

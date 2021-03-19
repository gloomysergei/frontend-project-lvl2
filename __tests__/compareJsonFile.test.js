import compareJsonFile from '../src/compareJsonFile.js';
import readFile from '../src/getFixtures.js';

test('comparing flat json-files', () => {
  const file1 = JSON.parse(readFile('data1.json'));
  const file2 = JSON.parse(readFile('data2.json'));
  const difference = compareJsonFile(file1, file2);
  expect(difference).toMatch('   host: hexlet.io');
  expect(difference).toMatch(' - timeout: 50');
  expect(difference).toMatch(' + timeout: 20');
  expect(difference).toMatch(' - proxy: 123.234.53.22');
  expect(difference).toMatch(' - follow: false');
  expect(difference).toMatch(' + verbose: true');
});

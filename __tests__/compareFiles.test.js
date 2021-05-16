import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import stylish from '../src/stylish.js';
import result from '../src/build.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('comparing nested json-files', () => {
  const nestedData = fs.readFileSync(getFixturePath('nested.txt'), 'utf-8');
  const data1 = JSON.parse(fs.readFileSync(getFixturePath('data1.json'), 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(getFixturePath('data2.json'), 'utf-8'));
  const buildAst = result(data1, data2);
  const actual = stylish(buildAst);

  expect(actual).toEqual(nestedData);
});

test('comparing nested yml-files', () => {
  const nestedData = fs.readFileSync(getFixturePath('nested.txt'), 'utf-8');
  const data1 = yaml.load(fs.readFileSync(getFixturePath('data1.yml'), 'utf-8'));
  const data2 = yaml.load(fs.readFileSync(getFixturePath('data2.yml'), 'utf-8'));
  const buildAst = result(data1, data2);
  const actual = stylish(buildAst);

  expect(actual).toEqual(nestedData);
});

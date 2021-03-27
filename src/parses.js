import fs from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const parse = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = join(__dirname, '..', '__fixtures__', filename);

  const format = extname(getFixturePath);
  const data = fs.readFileSync(getFixturePath, 'utf-8');

  let parsing;
  if (format === '') {
    parsing = JSON.parse;
  } else {
    parsing = yaml.load;
  }

  return parsing(data);
};
export default parse;

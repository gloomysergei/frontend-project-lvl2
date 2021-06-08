import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const getFormat = (filename) => extname(filename).substring(1);

const getFileContents = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

export { getFixturePath, getFormat, getFileContents };

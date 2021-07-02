import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, extname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFormat = (filename) => extname(filename).substring(1);
const getFileContents = (filename) => fs.readFileSync(join(__dirname, '..', '__fixtures__', filename), 'utf-8');
export { getFormat, getFileContents };

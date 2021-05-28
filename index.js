import { getFormat, getFileContents } from './src/fileReader.js';
import format from './src/formatters/index.js';
import parse from './src/parses.js';
import result from './src/build.js';

function finddiff(firstFile, secondFile, outputFormat = 'stylish') {
  const firstContent = getFileContents(firstFile);
  const secondContent = getFileContents(secondFile);
  const firstFormat = getFormat(firstFile);
  const secondFormat = getFormat(secondFile);
  const obj1 = parse(firstContent, firstFormat);
  const obj2 = parse(secondContent, secondFormat);
  const differenceTree = result(obj1, obj2);
  return format(differenceTree, outputFormat);
}
export default finddiff;

import stylish from './stylish.js';
import parsePlain from './plain.js';

const format = (data, outputFormat) => {
  if (outputFormat === 'stylish') {
    return stylish(data);
  }
  if (outputFormat === 'plain') {
    return parsePlain(data);
  }
  if (outputFormat === 'json') {
    return JSON.stringify(data, null, 2);
  }
  throw new Error(`Invalid format type '${outputFormat}`);
};
export default format;

import stylish from './stylish.js';
import parsePlain from './plain.js';

const format = (data, outputFormat) => {
  if (outputFormat === 'stylish') {
    return stylish(data);
  }
  return parsePlain(data);
};
export default format;

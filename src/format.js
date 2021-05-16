import stylish from './stylish.js';

const format = (data, outputFormat) => {
  if (outputFormat === 'stylish') {
    return stylish(data);
  }
  return 'cap';
};
export default format;

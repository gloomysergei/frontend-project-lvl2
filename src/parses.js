import yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === '') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};
export default parse;

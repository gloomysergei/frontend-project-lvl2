import _ from 'lodash';

const compareJsonFile = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const diff = keys.map((key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return (`  - ${key}: ${data1[key]}\n`);
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return (`  + ${key}: ${data2[key]}\n`);
    }
    if (data1[key] !== data2[key]) {
      return (`  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`);
    }
    return (`   ${key}: ${data1[key]}\n`);
  });
  return (`{\n ${diff.join('')}}\n`);
};
export default compareJsonFile;

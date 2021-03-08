import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const compareJsonFile = (firstFile, secondFile) => {
  const filepath1 = path.resolve(firstFile);
  const filepath2 = path.resolve(secondFile);
  const data1 = JSON.parse(fs.readFileSync(filepath1));
  const data2 = JSON.parse(fs.readFileSync(filepath2));
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

import _ from 'lodash';

const propertyActions = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    process: (obj1, obj2, f) => f(obj1, obj2),
  },
  // Ключ есть в 1-ом объекте, но нет во 2-ом
  {
    type: 'deleted',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: (obj1, obj2, key) => obj1[key],
  },
  // Ключа  нет в 1-ом объекте, но есть во 2-ом
  {
    type: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (obj1, obj2, key) => obj2[key],
  },
  // значения не совпадают
  {
    type: 'changed',
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key],
    process: (obj1, obj2, key) => ({ valueOne: obj1[key], valueTwo: obj2[key] }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key],
    process: (obj1, obj2, key) => obj1[key],
  },
];

const getPropertyAction = (obj1, obj2, key) => propertyActions.find(
  (elem) => elem.check(obj1, obj2, key),
);

const buildAST = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const keysSort = (_.sortBy(keys, (item) => item));

  const result = keysSort.map((key) => {
    const { type, process } = getPropertyAction(obj1, obj2, key);
    return type === 'nested'
      ? { type, key, children: process(obj1[key], obj2[key], buildAST) }
      : { type, key, value: process(obj1, obj2, key) };
  });
  return result;
};
// const arr = (buildAST(file1, file2));
// console.log(JSON.stringify(arr, null, 2));

// export default buildAST;
export default (obj1, obj2) => ({
  type: 'root',
  children: buildAST(obj1, obj2),
});

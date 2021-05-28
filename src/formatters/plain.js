import _ from 'lodash';

const nestedKey = (depth, key) => [...depth, key];

const defineValueType = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const formatPlain = (node, depth) => {
  switch (node.type) {
    case 'nested': {
      const nestedValue = node.children
        .filter((child) => child.type !== 'unchanged')
        .flatMap((child) => formatPlain(child, nestedKey(depth, node.key)));
      return nestedValue;
    }
    case 'deleted': {
      return `Property '${nestedKey(depth, node.key).join('.')}' was removed`;
    }
    case 'added': {
      return `Property '${nestedKey(depth, node.key).join('.')}' was added with value: ${defineValueType(node.value)}`;
    }
    case 'changed': {
      const valueNew = defineValueType(node.value.valueTwo);
      const valueOld = defineValueType(node.value.valueOne);
      return `Property '${nestedKey(depth, node.key).join('.')}' was updated. From ${valueOld} to ${valueNew}`;
    }
    default: {
      throw new Error(`Unknown node type ${node.type}`);
    }
  }
};

const parsePlain = (tree) => {
  if (tree.type === 'root') {
    return (tree.children.flatMap((child) => parsePlain(child))).join('\n');
  }
  return formatPlain(tree, []);
};

export default parsePlain;

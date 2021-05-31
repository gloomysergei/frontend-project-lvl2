import _ from 'lodash';

const spaceCount = (depth, count = 4) => ' '.repeat(depth * count - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = Object.entries(value).map(([key, content]) => {
    const handledContent = `${stringify(content, depth + 1)}`;
    return `${spaceCount(depth + 1)}  ${key}: ${handledContent}`;
  });
  return `{\n${result.join('\n')}\n${spaceCount(depth)}  }`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const value = stringify(node.value, depth);
    switch (node.type) {
      case 'root': {
        return `{\n${node.children.map((child) => iter(child, depth + 1)).join('\n')}\n}`;
      }
      case 'deleted': {
        return `${spaceCount(depth)}- ${node.key}: ${value}`;
      }
      case 'added': {
        return `${spaceCount(depth)}+ ${node.key}: ${value}`;
      }
      case 'changed': {
        const valueNew = stringify(node.value.valueTwo, depth);
        const valueOld = stringify(node.value.valueOne, depth);
        const stringNew = `${spaceCount(depth)}- ${node.key}: ${valueOld}`;
        const stringOld = `${spaceCount(depth)}+ ${node.key}: ${valueNew}`;
        return `${stringNew}\n${stringOld}`;
      }
      case 'unchanged': {
        return `${spaceCount(depth)}  ${node.key}: ${value}`;
      }
      case 'nested': {
        const valueNested = `{\n${node.children.map((child) => iter(child, depth + 1)).join('\n')}\n${spaceCount(depth)}  }`;
        return `${spaceCount(depth)}  ${node.key}: ${valueNested}`;
      }
      default: {
        throw new Error(`Unknown node type ${node.type}`);
      }
    }
  };
  return iter(tree, 0);
};
export default stylish;

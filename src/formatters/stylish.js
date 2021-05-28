import _ from 'lodash';

// count - количество начальных пробелов
const spaceCount = (depth, count = 4) => ' '.repeat(depth * count - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const result = Object.entries(value).map(([key, content]) => {
    // handledContent - обработанный контент
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
// const tree = {
//   type: 'root',
//   children: [
//     {
//       type: 'nested',
//       key: 'common',
//       children: [
//         {
//           type: 'unchanged',
//           key: 'setting1',
//           value: 'Value 1',
//         },
//         {
//           type: 'deleted',
//           key: 'setting2',
//           value: 200,
//         },
//         {
//           type: 'changed',
//           key: 'setting3',
//           value: {
//             valueOne: true,
//             valueTwo: null,
//           },
//         },
//       ],
//     },
//     {
//       type: 'added',
//       key: 'follow',
//       value: false,
//     },
//     {
//       type: 'unchanged',
//       key: 'key',
//       value: 'value',
//     },
//     {
//       type: 'added',
//       key: 'setting5',
//       value: {
//         key5: 'value5',
//       },
//     },
//     {
//       type: 'changed',
//       key: 'wow',
//       value: {
//         valueOne: 182,
//         valueTwo: 'so much',
//       },
//     },
//     {
//       type: 'deleted',
//       key: 'group2',
//       value: {
//         abc: 12345,
//         deep: {
//           id: 45,
//         },
//       },
//     },
//   ],
// };

// console.log(stylish(tree));

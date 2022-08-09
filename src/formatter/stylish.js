import _ from 'lodash';

const space = (depth, spaceCount = 2) => ' '.repeat(spaceCount * depth);
const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const lines = Object.entries(data)
    .map(([key, value]) => `${space(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...lines, `${space(depth)}  }`].join('\n');
};

const stylish = (tree) => {
  const iter = (data, depth) => data.map((node) => {
    const getValue = (value, sign) => `${space(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.type) {
      case 'added':
        return getValue(node.value, '+');
      case 'removed':
        return getValue(node.value, '-');
      case 'notChanged':
        return getValue(node.value, ' ');
      case 'updated':
        return `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`;
      case 'nested':
        return `${space(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${space(depth)}  }\n`;
      default:
        throw new Error(`Unknown type: '${node.type}' of node!`);
    }
  });
  return `{\n${iter(tree, 1).join('')}}`;
};

export default stylish;

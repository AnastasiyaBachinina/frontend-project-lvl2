import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  return _.isString(data) ? `'${data}'` : data;
};

const plain = (innerTree) => {
  const format = (nodes, parent) => nodes
    .filter((node) => node.type !== 'notChanged')
    .map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;
      switch (node.type) {
        case 'added':
          return `Property '${property}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'updated':
          return `Property '${property}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'nested':
          return `${format(node.children, property)}`;
        default:
          throw new Error(`Unknown type: '${node.type}' of node!`);
      }
    }).join('\n');
  return format(innerTree, 0);
};

export default plain;

import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: value2 };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { type: 'nested', key, children: buildTree(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated', key, value1, value2,
      };
    }
    return { type: 'notChanged', key, value: value1 };
  });
};

export default buildTree;

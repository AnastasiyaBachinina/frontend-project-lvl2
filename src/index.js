import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseFile from './parsers.js';
import format from './formatter/stylish.js';

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

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename.trim()), 'utf-8');
const extractFormat = (filename) => path.extname(filename).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileformat1 = extractFormat(filepath1);
  const fileformat2 = extractFormat(filepath2);
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);
  const data1 = parseFile(fileformat1, fileContent1);
  const data2 = parseFile(fileformat2, fileContent2);
  const innerTree = buildTree(data1, data2);
  return format(innerTree, formatName);
};

export default genDiff;

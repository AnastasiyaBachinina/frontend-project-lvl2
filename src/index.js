import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parseFile from './parsers.js';
import format from './formatters/index.js';

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename.trim()), 'utf-8');
const extractFormat = (filename) => path.extname(filename).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const dataContent1 = readFile(filepath1);
  const dataContent2 = readFile(filepath2);
  const data1 = parseFile(dataContent1, extractFormat(filepath1));
  const data2 = parseFile(dataContent2, extractFormat(filepath2));
  const innerTree = buildTree(data1, data2);
  return format(innerTree, formatName);
};

export default genDiff;

import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (pathToFile) => {
  const format = path.extname(pathToFile);
  const contentFile = JSON.parse(fs.readFileSync(pathToFile, 'utf8'), format);
  return contentFile;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const file1 = readFile(pathToFile1);
  const file2 = readFile(pathToFile2);

  const keys = Object.keys({ ...file1, ...file2 }).sort();

  const getDistinction = keys.map((key) => {
    if (!_.has(file2, key)) {
      return `- ${key}: ${file1[key]}`;
    }
    if (!_.has(file1, key)) {
      return `+ ${key}: ${file2[key]}`;
    }
    if (file1[key] === file2[key]) {
      return `  ${key}: ${file1[key]}`;
    }
    return `- ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
  }).join('\n  ');

  return `{\n  ${getDistinction}\n}`;
};

export default genDiff;

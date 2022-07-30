import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (pathToFile) => {
  const format = path.extname(pathToFile);
  const contentFile = JSON.parse(fs.readFileSync(pathToFile, 'utf8'), format);
  return contentFile;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const contentFile1 = readFile(pathToFile1);
  const contentFile2 = readFile(pathToFile2);

  const keys1 = Object.keys(contentFile1);
  const keys2 = Object.keys(contentFile2);

  const uniqeKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const result = uniqeKeys.reduce((acc, key) => {
    const firstValue = contentFile1[key];
    const secondValue = contentFile2[key];

    if (firstValue === secondValue) {
      acc += `    ${key}: ${secondValue}\n`;
      return acc;
    }
    if (firstValue === undefined) {
      acc += `  + ${key}: ${secondValue}\n`;
      return acc;
    }
    if (secondValue === undefined) {
      acc += `  - ${key}: ${firstValue}\n`;
      return acc;
    }
    acc += `  - ${key}: ${firstValue}\n`;
    acc += `  + ${key}: ${secondValue}\n`;

    return acc;
  }, '');

  return `{\n${result}}`;
};

export default genDiff;
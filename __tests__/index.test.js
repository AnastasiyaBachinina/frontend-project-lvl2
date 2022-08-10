import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const tests = [
  {
    filename1: 'file1.json', filename2: 'file2.json', output: 'expectedFileStylish.txt', formatName: 'stylish',
  },
  {
    filename1: 'file1.yml', filename2: 'file2.yml', output: 'expectedFileStylish.txt', formatName: 'stylish',
  },
];

test.each(tests)('gendiff stylish tests', ({
  filename1, filename2, output, formatName,
}) => {
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);
  const expected = readFile(output);
  const result = genDiff(filepath1, filepath2, formatName);
  expect(result).toEqual(expected);
});

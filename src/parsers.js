import { load } from 'js-yaml';

const parse = (dataContent, formatName) => {
  switch (formatName) {
    case 'json':
      return JSON.parse(dataContent);
    case 'yml':
      return load(dataContent);
    case 'yaml':
      return load(dataContent);
    default:
      throw new Error(`Unknown format to parse: '${formatName}'!`);
  }
};

export default parse;

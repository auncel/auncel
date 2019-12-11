import * as fs from 'fs';
import { join, relative } from 'path';

const SPLITTER = '<!-- splitter -->';

export interface IFixtureData {
  name: string;
  description: string;
  type: string;
  fragment: string;
  stylesheet: string;
}

export interface IFixture {
  question: IFixtureData;
  answers: IFixtureData[];
}

export function readFixture(filepath): IFixtureData {
  if (!fs.existsSync(filepath)) {
    throw Error(`file ${filepath} dosen't exist!`);
  }

  const htmlContent: string = fs.readFileSync(filepath, { encoding: 'utf8' });

  const commentEndIdx = htmlContent.indexOf('-->');
  const description = htmlContent.substring(4, commentEndIdx).trim();
  const splitterIdx = htmlContent.indexOf(SPLITTER);
  const stylesheet = htmlContent.substring(commentEndIdx + 3, splitterIdx).trim().slice(7, -8).trim();
  const fragment = htmlContent.substring(splitterIdx + SPLITTER.length).trim();

  const relativePaths = relative(__dirname, filepath).split('/');
  const filename = relativePaths.pop();

  const [typeName, type] = filename.split('.');
  relativePaths.push(typeName);
  const name = `${type}: ${relativePaths.join(' -> ')}`;
  return {
    name,
    description,
    type,
    fragment,
    stylesheet,
  };
}


export function readFixtures(dirpath): IFixture {
  if (!fs.statSync(dirpath).isDirectory) {
    throw Error(`${dirpath} must be Directory`);
  }
  const fixtureObject: IFixture = { question: null, answers: [] };
  const filenames = fs.readdirSync(dirpath);
  filenames.sort(); // 字母排序
  // eslint-disable-next-line no-restricted-syntax
  for (const filename of filenames) {
    // eslint-disable-next-line no-await-in-loop
    const fixtureData = readFixture(join(dirpath, filename));
    if (fixtureData.type === 'question') {
      fixtureObject.question = fixtureData;
    } else {
      fixtureObject.answers.push(fixtureData);
    }
  }
  return fixtureObject;
}

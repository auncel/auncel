import * as fs from 'fs';
import { join, relative } from 'path';
import * as YAML from 'js-yaml';

const SPLITTER = '<!-- splitter -->';

export interface IFixtureData {
  name: string;
  description: string;
  similarity: number;
  type: string;
  fragment: string;
  stylesheet: string;
}

export interface IFixture {
  title: string;
  question: IFixtureData;
  answers: IFixtureData[];
}

export function readFixture(filepath): IFixtureData {
  if (!fs.existsSync(filepath)) {
    throw Error(`file ${filepath} dosen't exist!`);
  }

  const htmlContent: string = fs.readFileSync(filepath, { encoding: 'utf8' });

  const commentEndIdx = htmlContent.indexOf('-->');
  const yamlText = htmlContent.substring(4, commentEndIdx).trim();
  const splitterIdx = htmlContent.indexOf(SPLITTER);
  const stylesheet = htmlContent.substring(commentEndIdx + 3, splitterIdx).trim().slice(7, -8).trim();
  const fragment = htmlContent.substring(splitterIdx + SPLITTER.length).trim();

  const relativePaths = relative(__dirname, filepath).split('/');
  const filename = relativePaths.pop();

  const { description, similarity }: { description: string; similarity: number} = YAML.load(yamlText);
  const [typeName, type] = filename.split('.');
  relativePaths.push(typeName);
  const name = `${type}: ${relativePaths.join(' -> ')}`;

  return {
    name,
    description,
    similarity,
    type,
    fragment,
    stylesheet,
  };
}


export function readFixtures(dirpath): IFixture {
  if (!fs.statSync(dirpath).isDirectory) {
    throw Error(`${dirpath} must be Directory`);
  }
  const fixtureObject: IFixture = { title: '', question: null, answers: [] };
  fixtureObject.title = relative(__dirname, dirpath).split('/').join(' -> ');
  const filenames = fs.readdirSync(dirpath);
  filenames.sort(); // 字母排序
  // eslint-disable-next-line no-restricted-syntax
  for (const filename of filenames) {
    const fixtureData = readFixture(join(dirpath, filename));
    if (fixtureData.type === 'question') {
      fixtureObject.question = fixtureData;
    } else {
      fixtureObject.answers.push(fixtureData);
    }
  }
  return fixtureObject;
}

export function readAllFixtures(): Map<string, IFixture> {
  const fixtrueMap = new Map<string, IFixture>();

  function dirRecursion(dirpath: string): void {
    if (fs.statSync(dirpath).isDirectory) {
      const dirfiles = fs.readdirSync(dirpath, { withFileTypes: true });
      // eslint-disable-next-line no-restricted-syntax
      for (const dirfile of dirfiles) {
        if (dirfile.isFile() && dirfile.name.endsWith('.html')) {
          const fixtrue = readFixtures(dirpath);
          fixtrueMap.set(fixtrue.title, fixtrue);
          break;
        } else if (dirfile.isDirectory()) {
          dirRecursion(join(dirpath, dirfile.name));
        }
      }
    }
  }

  dirRecursion(__dirname);

  return fixtrueMap;
}

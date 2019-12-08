/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 7th December 2019 9:08 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 7th December 2019 9:08 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 MIT License                                         *
 *-------------------------------------------------------------------------- */

import { Puppeteer, PageManager } from '@feoj/common/puppeteer/index';
import { readJSFile } from '@feoj/common/utils/readJSFile';
import { IRenderNode } from '@feoj/common/types/domCore';
import { htmlWrap } from '../utils';
import { readFixtures, IFixture, IFixtureData } from '../../fixtures/readFixture';

const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const divSimple = require('../../fixtures/render/simple.json');

let M_diffScript = '';
let pageManager: PageManager = null;
beforeAll(() => {
  return Promise.all([
    // 编译 ts
    new Promise((resolve, reject) => {
      webpack(webpackConfig, (error, stats) => {
        if (!error) {
          resolve();
        } else {
          reject(error);
        }
      });
    }).then(() => {
      return readJSFile(__dirname + '/../../dist/diff.js');
    }).then((diffModuleStr) => {
      M_diffScript = `${diffModuleStr}; window.Diff.generateRenderTree();`;
    }),
    // 获取 puppeteer 实例
    Puppeteer.getPageManager().then((manager) => {
      pageManager = manager;
    }),
  ]).catch(err => {throw err});
}, 60 * 1000); // 1 分钟超时

function testFactory(prefix, data) {
  const { title, fragment, stylesheet, anwser } = data;
  test(`${prefix} ${title}`, async () => {
    const html = htmlWrap(fragment, stylesheet);
    const page = await pageManager.getPage();
    await page.setContent(html);
    const renderTree: IRenderNode = (await page.evaluate(M_diffScript) as IRenderNode);
    expect(renderTree).toEqual(anwser);
    pageManager.releasePage(page);
  });
}

describe('相等测试 DIV', () => {
  divSimple.forEach(example => testFactory('相等测试',example));
});

// function getRenderTree(fixture: IFixtureData) {
//   const { fragment, stylesheet, } = fixture;
//   const html = htmlWrap(fragment, stylesheet);
//   return pageManager.getPage().then((page) => {
//     return page.setContent(html).then(() => {
//       return page.evaluate(M_diffScript).finally(() => pageManager.releasePage(page));
//     });
//   });
// }

// describe('div simple', () => {
//   beforeEach(() => {
//     jest.setTimeout(10_000);
//   });

//   async function textFixtureFactory(fixture: IFixture) {
//     const { question, answers } = fixture;
//     const questionRenderTree = await getRenderTree(question);
//     const answerRenderTrees = await Promise.all(answers.map(answer => getRenderTree(answer)));

//     for (const tree of answerRenderTrees) {
//       test(question.name, () => {
//         expect(tree).toEqual(questionRenderTree);
//       }, 10_000);
//     }
//   }

//    readFixtures(__dirname + '/../../fixtures/elements/div/simple/')
//     .then(fixture => {
//       textFixtureFactory(fixture);
//     });
//   // test('async', async () => {
//   //   const fixture = await readFixtures(__dirname + '/../../fixtures/elements/div/simple/')
//   //   textFixtureFactory(fixture);
//   // });
// });
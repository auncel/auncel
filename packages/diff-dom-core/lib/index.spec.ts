/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Wednesday, 11th December 2019 10:08 pm                      *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 11th December 2019 10:08 pm                     *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { Puppeteer, PageManager } from '@feoj/common/pptr/index';
import { readJSFile } from '@feoj/common/utils/readJSFile';
import { readAllFixtures, IFixtureData } from '../fixtures/readFixture';
import { createHTMLTpl } from './utils';
import { IRenderNode } from '@feoj/common/types/domCore';
import { strictEqualDiff } from './diffCore/strictly-equal';
import { generateDiffResult, IFixedScoringPointResult } from './evaluateSimilarity/fixedScoringPoint';
import { writeFileSync } from 'fs';
import '@feoj/common/polyfill/toJSON';

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const fixtureMap = readAllFixtures();
const similarityMap = new Map<string, IFixedScoringPointResult>();
let pageManager: PageManager = null;
let M_diffScript = '';
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
      return readJSFile(__dirname + '/../dist/diff.js');
    }).then((diffModuleStr) => {
      M_diffScript = `${diffModuleStr}; window.Diff.generateRenderTree();`;
    }),
    // 获取 puppeteer 实例
    Puppeteer.getPageManager().then((manager) => {
      pageManager = manager;
    }),
  ]).catch(err => {throw err});
}, 60 * 1000); // 1 分钟超时

async function getRenderTree(fixtureData: IFixtureData): Promise<IRenderNode> {
  const { fragment, stylesheet } = fixtureData;
  const html = createHTMLTpl(fragment, stylesheet);
  const page = await pageManager.getPage();
  await page.setContent(html);
  const renderTree: IRenderNode = (await page.evaluate(M_diffScript) as IRenderNode);
  return renderTree;
}
for (const [title, fixtrue] of fixtureMap.entries()) {
  describe(title, () => {
    const { question, answers } = fixtrue;
    for (const answer of answers) {
      let questionRenderTree = null;
      test(answer.description, async () => {
        if (!questionRenderTree) {
          questionRenderTree = await getRenderTree(question)
        }
        const answerRenerTree = await getRenderTree(answer);
        const diffTree = strictEqualDiff(questionRenderTree, answerRenerTree);
        const evaluateResult: any = generateDiffResult(diffTree);
        evaluateResult.expect = answer.similarity
        similarityMap.set(`${title}: ${question.name} ==> ${answer.name}`, evaluateResult);
        expect(evaluateResult.score * 100 > answer.similarity).toBe(true);
      });
    }
  });
}

afterAll(async () => {
  const dateStr = new Date().toLocaleString().replace(/[,:\s\/]/g,'-');
  writeFileSync(`${__dirname}/../logs/${dateStr}.json`, JSON.stringify(similarityMap,null,2));
  await Puppeteer.close();
});
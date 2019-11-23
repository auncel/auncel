import { Puppeteer, PageManager, } from '@feoj/common/puppeteer';
import { readJSFile } from '@feoj/common/utils/readJSFile';
import { IRenderNode } from '@feoj/common/types/difference.interface';
import { htmlWrap } from './utils';

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const divSimple = require('../fixtures/render/simple.json');

let M_diffScript = '';
let pageManager: PageManager = null;
beforeAll(() => {
  return Promise.all([
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
      M_diffScript = `${diffModuleStr}; window.Diff.genRenderTree(document.body);`;
    }),
    Puppeteer.getPageManager().then((manager) => {
      pageManager = manager;
    }),
  ]);
}, 60 * 1000); // 1 分钟超时

describe('相等测试 DIV', () => {

  function testFactory(prefix, data) {
    const { title, fragment, stylesheet, anwser } = data;
    test(`${prefix} ${title}`, async () => {
      const html = htmlWrap(fragment, stylesheet)
      const page = await pageManager.getPage();
      await page.setContent(html);
      const renderTree: IRenderNode = await page.evaluate(M_diffScript);

      expect(renderTree).toEqual(anwser);
      pageManager.releasePage(page);
    });
  }

  divSimple.forEach(example => testFactory('相等测试',example));
});
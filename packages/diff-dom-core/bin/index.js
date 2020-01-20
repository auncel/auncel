#!/bin/ent node
const { createHTMLTpl } = require('../dist/utils');
const { readJSFile } = require('../dist/utils/readJSFile');
const { Puppeteer } = require('../dist/pptr');

require('../../common/dist/polyfill/toJSON');

async function generateRenderTree(html, stylesheet) {
  const pageManager = await Puppeteer.getPageManager();
  const diffScript = await readJSFile(`${__dirname}/../dist/diff.js`);
  const page = await pageManager.getPage();
  await page.setContent(createHTMLTpl(html, stylesheet));
  const renderTree = await page.evaluate(
    `${diffScript}; window.Diff.generateRenderTree();`,
  );

  console.log(JSON.stringify(renderTree, null, 2));
}

const args = process.argv.slice(2);

generateRenderTree(`
  <div></div>
`, 'div { color: red; } ');

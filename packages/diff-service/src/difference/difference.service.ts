import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { RenderNode, DiffNode } from '@feoj/common/types/difference.interface';
// import { diffLogger as logger } from '@utils/logger'
import { Puppeteer } from 'src/puppeteer/Pupepteer';
import { PageManager } from 'src/puppeteer/PageManager';
import { readJSFile } from '../utils/readJSFile';
import { Page } from 'puppeteer';
// import { diff } from '@feoj/diff-dom-core/dist/diff';

interface window {

};

@Injectable()
export class DifferenceService {
  private pageManager: PageManager = null;
  
  public async getRenderTree(html: string): Promise<RenderNode> {

    const diffModuleStr = await readJSFile(path.resolve(__dirname, '../../lib/diff.js'));
    const wrapFunc = `
      ${diffModuleStr};
      window.Diff.genRenderTree(document.body);
    `;

    let page: Page;
    try {
      page = await this.pageManager.getPage();
      await page.setContent(html);
      const beforeDiff =  Date.now();
      const renderTree: RenderNode = await page.evaluate(wrapFunc);
      Logger.log(`diff cosst ${Date.now() - beforeDiff} ms`);
      // await page.screenshot({
      //   path: 'screenshot.png',
      //   fullPage: true,
      // });
      return renderTree;
    } catch (err) {
      throw err;
    } finally {
      this.pageManager.releasePage(page);
    }
  }

  
  public async diff(tree0: RenderNode, treee1: RenderNode): Promise<DiffNode> {
    // const difftree = diff(tree0, treee1);
    // return difftree;
    return Promise.resolve({} as DiffNode);
  }
  
  public async diffHTML(html1: string, html2: string) {
    const diffModuleStr = await readJSFile(path.resolve(__dirname, '../../lib/diff.js'));
    const genRenderTreeFunc = `
      ${diffModuleStr};
      window.Diff.genRenderTree(document.body);
    `;

    let page1: Page;
    let page2: Page;
    try {
      // TODO: 并行
      page1 =  await this.pageManager.getPage();
      await page1.setContent(html1);
      const exemplarTree: RenderNode = await page1.evaluate(genRenderTreeFunc);

      page2 = await this.pageManager.getPage();
      await page2.setContent(html2);
      const instanceTree: RenderNode = await page2.evaluate(genRenderTreeFunc);

      // const diffTree = diff(exemplarTree, instanceTree);
      // const genDiffResFunc = `
      //   const diffTree = ${JSON.stringify(diffTree)};
      //   ${diffModuleStr};
      //   window.Diff.genDiffRes(diffTree);
      // `
      // const logs = await page2.evaluate(genDiffResFunc);
      const diffImgName = `diff-img-${Date.now()}.png`; // TODO: 文件名区分用户
      page1.screenshot({
        path: 'public/' + diffImgName, // TODO: public/ 抽离为配置变量
        fullPage: true,
      });
      return {
        // logs,
        img: diffImgName,
      };
    } finally {
      this.pageManager.releasePage(page1);
      this.pageManager.releasePage(page2);
    }
  }
  async onModuleInit() {
    Logger.log('[difference service][before onModuleInit]')
    const pageManager = await Puppeteer.getPageManager();
    this.pageManager = pageManager;
    Logger.log('[difference service][after onModuleInit]')
  }

  OnApplicationBootstrap() {
    Logger.log('[difference service][hook OnApplicationBootstrap]')
  }
}

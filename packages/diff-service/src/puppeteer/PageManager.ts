import { Page, Browser } from 'puppeteer';
import { MAX_PAGE_POOL_SIZE } from './constants';
import sleep from '../utils/sleep';

/**
 * TODO: 当 initpageManager 时，不允许调用 getPage、releasePage
 *
 * @export
 * @class PageManager
 */
export class PageManager {
  private pagePool: Page[] = [];

  public async initPageManager(browser: Browser) {
    // const browser = await Puppeteer.getBrowser();
    console.time(`create ${MAX_PAGE_POOL_SIZE} page instance`);
    const pagePromises: Promise<Page>[] = [];
    for (let i = 0; i < MAX_PAGE_POOL_SIZE; i++) {
      pagePromises.push(browser.newPage());
    }
    const pageArr = await Promise.all(pagePromises);
    console.timeEnd(`create ${MAX_PAGE_POOL_SIZE} page instance`);
    this.pagePool.push(...pageArr);
  }

  public async getPage() {
    // wait
    while (this.pagePool.length === 0) {
      console.log('awaiting for get Page');
      await sleep(200);
    }

    return this.pagePool.shift();
  }

  public async releasePage(page: Page) {
    // TODO: 检测 page 是否已经放入
    this.pagePool.push(page);
  }
}

// PageManager.initPageManager().then(() => {

//   PageManager.getPage();
//   PageManager.getPage();
//   PageManager.getPage();
//   PageManager.getPage();
//   PageManager.getPage();
//   PageManager.getPage();
//   PageManager.getPage();
//   PageManager.getPage();
//   PageManager.getPage();
//   PageManager.getPage().then(p => {
//     setTimeout(() => {
//       PageManager.releasePage(p)
//     }, 1000);
//   });

//   PageManager.getPage();
// });

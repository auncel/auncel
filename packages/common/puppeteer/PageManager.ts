import { Page, Browser } from 'puppeteer';
import log from '../logger/puppeteer';
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
  /**
   * a lock
   * @private
   * @type {boolean}
   * @memberof PageManager
   */
  private isCreating: boolean = true;
  
  public async initPageManager(browser: Browser) {
    // const browser = await Puppeteer.getBrowser();
    this.isCreating = true;
    log.info(`started creating ${MAX_PAGE_POOL_SIZE} page instance at ${Date.now()}`);
    console.time(`create ${MAX_PAGE_POOL_SIZE} page instance`)
    const pagePromises: Promise<Page>[] = [];
    for (let i = 0; i < MAX_PAGE_POOL_SIZE; i++) {
      pagePromises.push(browser.newPage());
    }
    const pageArr = await Promise.all(pagePromises)
    console.timeEnd(`create ${MAX_PAGE_POOL_SIZE} page instance`)
    log.info(`creating ${MAX_PAGE_POOL_SIZE} page instance finished at ${Date.now}`);
    this.isCreating = false;
    this.pagePool.push(...pageArr);
  }

  public async getPage() {
    // TODO: retry times limit
    // wait
    while (this.isCreating || this.pagePool.length === 0) {
      log.warn('awaiting for get Page');
      await sleep(200);
    }

    return this.pagePool.shift();
  }

  public async releasePage(page: Page) {
    // TODO: 检测 page 是否已经放入
    this.pagePool.push(page);
  }
}

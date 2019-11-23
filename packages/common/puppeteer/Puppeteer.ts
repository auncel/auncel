import { Browser, launch } from 'puppeteer';
import log from '../logger/puppeteer';
import { PageManager } from './PageManager';

export class Puppeteer {
  private static browser: Browser = null;
  private static pageManager: PageManager = null;

  public static async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      log.info(`start launch puppeteer at ${Date.now()}`);
      console.time('puppeteer launch');
      this.browser = await launch({
        args: ['--no-sandbox'],
        defaultViewport: {
          width: 1519, // base on my computer: acer Aspire VX15
          height: 824,
        },
      });
      console.timeEnd('puppeteer launch');
      log.info(`launch puppeterr at ${Date.now()}`);
    }
    return this.browser;
  }

  public static async getPageManager(): Promise<PageManager> {
    if (!this.pageManager) {
      this.pageManager = new PageManager();
      const browser = await Puppeteer.getBrowser();
      await this.pageManager.initPageManager(browser);
    }
    return this.pageManager;
  }
}

import * as puppeteer from 'puppeteer';
import { Browser } from 'puppeteer';
import { PageManager } from './PageManager';

export class Puppeteer {
  private static browser: Browser = null;
  private static pageManager: PageManager = null;

  public static async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      console.time('puppeteer launch');
      this.browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        defaultViewport: {
          width: 1519, // base on my computer: acer Aspire VX15
          height: 824,
        },
      });
      console.timeEnd('puppeteer launch');
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

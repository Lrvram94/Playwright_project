import { Page, Browser } from '@playwright/test';

export class BrowserUtils {
  static async getNewPage(browser: Browser): Promise<Page> {
    const context = await browser.newContext();
    return await context.newPage();
  }

  static async clearBrowserData(page: Page): Promise<void> {
    await page.context().clearCookies();
    await page.context().clearPermissions();
  }

  static async setViewportSize(page: Page, width: number, height: number): Promise<void> {
    await page.setViewportSize({ width, height });
  }
}

export class WaitUtils {
  static async waitForTimeout(milliseconds: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number = 30000,
    interval: number = 1000
  ): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await this.waitForTimeout(interval);
    }
    
    throw new Error(`Condition not met within ${timeout}ms`);
  }
}

export class DataUtils {
  static generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomEmail(): string {
    const username = this.generateRandomString(8);
    const domain = this.generateRandomString(5);
    return `${username}@${domain}.com`;
  }

  static getCurrentTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }
}

export class FileUtils {
  static async downloadFile(page: Page, downloadSelector: string): Promise<string> {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click(downloadSelector)
    ]);
    
    const filename = download.suggestedFilename();
    const path = `downloads/${filename}`;
    await download.saveAs(path);
    return path;
  }

  static async uploadFile(page: Page, fileInputSelector: string, filePath: string): Promise<void> {
    await page.setInputFiles(fileInputSelector, filePath);
  }
}
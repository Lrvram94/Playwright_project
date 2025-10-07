import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigation methods with enhanced strategies
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

    // Element interaction methods using Locator objects as per project conventions
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ timeout: 15000 });
    await locator.click();
  }

  async fillInput(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ timeout: 15000 });
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ timeout: 15000 });
    return await locator.textContent() || '';
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  // Wait methods
  async waitForElement(selector: string, timeout: number = 60000) {
    await this.page.waitForSelector(selector, { timeout });
  }

   async waitForPageLoad(): Promise<void> {
    try {
      // Quick check for domcontentloaded first
      await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      // Then try networkidle with shorter timeout for sandbox environments
      await this.page.waitForLoadState('networkidle', { timeout: 5000 });
    } catch {
      // Fallback - page is already loaded enough for interaction
      console.log('Page load completed with basic DOM content');
    }
  }

  // Utility methods
  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }
}

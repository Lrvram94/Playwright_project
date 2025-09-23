import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigation methods
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // Element interaction methods
  async clickElement(selector: string) {
    await this.page.click(selector);
  }

  async fillInput(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  // Wait methods
  async waitForElement(selector: string, timeout: number = 30000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
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

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrangeHrmObjects extends BasePage {
  constructor(public readonly page: Page) {
    super(page);
  }

  // Login Page Locators
  get usernameInput(): Locator { return this.page.locator('input[name="username"]'); }
  get passwordInput(): Locator { return this.page.locator('input[name="password"]'); }
  get loginButton(): Locator { return this.page.locator('button[type="submit"]'); }
  get loginErrorMessage(): Locator { return this.page.locator('.oxd-alert-content'); }
  
  // Dashboard Page Locators
  get timeatworkModule(): Locator { return this.page.getByText('Time at Work', { exact: true }); }
  get timeatworkattendancecard(): Locator { return this.page.locator('.orangehrm-attendance-card-bar'); } 
  get myaccountMenu(): Locator { return this.page.getByText('My Actions', { exact: true }); }
  get quickLaunchModule(): Locator { return this.page.getByText('Quick Launch', { exact: true }); }
  
  // Employee Distribution by Sub Unit locators
  get employeeDistributionContainer(): Locator { return this.page.locator('.oxd-sheet').filter({ hasText: 'Employee Distribution by Sub Unit' }); }
  get pieChartElement(): Locator { return this.employeeDistributionContainer.locator('canvas, svg, .chart, [class*="chart"]'); }
  
  /**
   * Check if Employee Distribution pie chart shows data
   * @returns True if Employee Distribution displays a pie chart with data
   */
  async doesEmployeeDistributionShowPieChart(): Promise<boolean> {
    try {
      await this.employeeDistributionContainer.waitFor({ state: 'visible', timeout: 5000 });
      return await this.pieChartElement.isVisible();
    } catch {
      return false;
    }
  }
}
  
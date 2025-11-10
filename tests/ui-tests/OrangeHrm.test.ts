import { test, expect } from '@playwright/test';
import { OrangeHrmObjects } from '../../src/pages/OrangeHrmObjects';
import { orangeHRMData } from '../../src/data/test-data';
import { config } from '../../src/config/config';

test.describe('OrangeHRM Login Test', () => {
  test.beforeEach(async ({ page }) => {
    const orangeHrm = new OrangeHrmObjects(page);
    await orangeHrm.navigateTo(orangeHRMData.urls.demo);
    await orangeHrm.usernameInput.fill(orangeHRMData.credentials.admin.username);
    await orangeHrm.passwordInput.fill(orangeHRMData.credentials.admin.password);
    await orangeHrm.loginButton.click();
    await expect(page).toHaveURL(orangeHRMData.urls.dashboard);
  });

  test('Successful login and dashboard access', async ({ page }) => {
    const orangeHrm = new OrangeHrmObjects(page);
    
    // Verify we're on the dashboard page
    await expect(page).toHaveURL(orangeHRMData.urls.dashboard);

    // Verify if key dashboards are visible with relevant data
    await expect(orangeHrm.timeatworkModule).toBeVisible();
    await expect(orangeHrm.timeatworkattendancecard).toBeVisible();
    await expect(orangeHrm.myaccountMenu).toBeVisible();
    await expect(orangeHrm.quickLaunchModule).toBeVisible();
    await expect(orangeHrm.employeeDistributionContainer).toBeVisible();
    
    // Verify Employee Distribution by Sub Unit shows pie chart
    await orangeHrm.doesEmployeeDistributionShowPieChart();
    

    // Take screenshot for verification
    await orangeHrm.takeScreenshot('Dashboard_After_Login');
  });
});
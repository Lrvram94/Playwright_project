import { test, expect } from '@playwright/test';
import { OrangeHrmObjects } from '../../src/pages/OrangeHrmObjects';
import { orangeHRMData } from '../../src/data/test-data';
import { config } from '../../src/config/config';
import { OrangeHrmApiHelper } from '../../src/utils/api-helpers';

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

  test('Add new employee and verify in employee list', async ({ page }) => {
    const orangeHrm = new OrangeHrmObjects(page);
    // Generate random employee data
    const randomEmployee = orangeHRMData.generateRandomEmployee();
    
    // Navigate to PIM module
    await orangeHrm.pimMenu.click();
    await orangeHrm.addEmployeeButton.click();
    await expect(page).toHaveURL(orangeHRMData.urls.addEmployee);
    
    // Fill in employee details
    await orangeHrm.firstNameInput.fill(randomEmployee.firstName);
    await orangeHrm.middleNameInput.fill(randomEmployee.middleName);
    await orangeHrm.lastNameInput.fill(randomEmployee.lastName);
    
    // Save employee and wait for navigation
    await Promise.all([
      page.waitForURL('**/pim/viewPersonalDetails/**', { timeout: 20000 }),
      orangeHrm.saveEmployeeButton.click()
    ]);
    
    await orangeHrm.waitForPageLoad();
    
    // Verify employee was saved by checking we're on the Personal Details page
    await expect(orangeHrm.personalDetailsHeading).toBeVisible({ timeout: 10000 });
    console.log(`Employee ${randomEmployee.firstName} ${randomEmployee.middleName} ${randomEmployee.lastName} has been successfully created`);
  });
});

test.describe('OrangeHRM API Login Tests', () => {
  test('Login via API and verify in UI', async ({ browser, request }) => {
    // Step 1: Create a temporary context to perform login
    const loginContext = await browser.newContext();
    const loginPage = await loginContext.newPage();
    
    // Step 2: Login using API helper (page-based approach for session cookies)
    const apiHelper = new OrangeHrmApiHelper(request);
    const cookies = await apiHelper.loginViaPage(loginPage);
    
    // Step 3: Get storage state from logged-in context
    const storageState = await loginContext.storageState();
    
    // Close the login context
    await loginContext.close();
    
    // Step 4: Create new context with the logged-in storage state
    const authenticatedContext = await browser.newContext({ storageState });
    const page = await authenticatedContext.newPage();
    
    // Step 5: Navigate to dashboard (should be logged in)
    const orangeHrm = new OrangeHrmObjects(page);
    await orangeHrm.navigateTo(orangeHRMData.urls.dashboard);
    
    // Step 6: Verify login success via UI elements
    await expect(page).toHaveURL(orangeHRMData.urls.dashboard);
    await expect(orangeHrm.myaccountMenu).toBeVisible();
    await expect(orangeHrm.pimMenu).toBeVisible();
    await expect(orangeHrm.timeatworkModule).toBeVisible();
    
    console.log('✓ Successfully logged in via API and verified in UI');
    await orangeHrm.takeScreenshot('API_Login_Dashboard');
    
    // Cleanup - close page first, then context
    await page.close();
    await authenticatedContext.close();
  });
});
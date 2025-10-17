import { test, expect } from '@playwright/test';
import { SauceDemoObjects } from '../../src/pages/SauceDemoObjects';
import { sauceDemoData } from '../../src/data/test-data';


// End to End tests
test.describe('Authenticated SauceDemo Tests', () => {
  test.beforeEach(async ({ page }) => {
    const sauceDemo = new SauceDemoObjects(page);
    await sauceDemo.navigateTo(sauceDemoData.urls.base); 
    await sauceDemo.usernameInput.fill(sauceDemoData.credentials.standard.username);
    await sauceDemo.passwordInput.fill(sauceDemoData.credentials.standard.password);
    await sauceDemo.loginButton.click();
    await expect(page).toHaveURL(sauceDemoData.urls.inventory);
  });

test('Order Sauce Labs Bolt T-Shirt', async ({ page }) => {
  const sauceDemo = new SauceDemoObjects(page);
  await expect(page.locator('.inventory_list')).toBeVisible();
  await sauceDemo.saucelabsBoltTShirtCartButton.click();
  await sauceDemo.shoppingCartLink.click();
  await expect(page).toHaveURL(sauceDemoData.urls.cart);
  await sauceDemo.checkoutButton.click();
  await expect(page).toHaveURL(sauceDemoData.urls.checkout);
  // Fill in checkout information using test data
  await sauceDemo.firstNameInput.fill(sauceDemoData.checkoutInfo.firstName);
  await sauceDemo.lastNameInput.fill(sauceDemoData.checkoutInfo.lastName);
  await sauceDemo.postalCodeInput.fill(sauceDemoData.checkoutInfo.postalCode);
  await sauceDemo.continueButton.click();
  await expect(page).toHaveURL(sauceDemoData.urls.checkoutOverview);
  await sauceDemo.finishButton.click();
  //Check if the order is complete using test data
  await expect(page.locator('.complete-header')).toHaveText(sauceDemoData.messages.orderComplete);
  await sauceDemo.takeScreenshot('Order_Complete');
  await expect(page).toHaveURL(sauceDemoData.urls.checkoutComplete);
});
});
  
// Login tests
test.describe('Login Tests', () => {
  test('Locked out user', async ({ page }) => {
    const sauceDemo = new SauceDemoObjects(page);
    await sauceDemo.navigateTo(sauceDemoData.urls.base);
    await sauceDemo.usernameInput.fill(sauceDemoData.credentials.lockedOut.username);
    await sauceDemo.passwordInput.fill(sauceDemoData.credentials.lockedOut.password);
    await sauceDemo.loginButton.click();
    
    // Wait for and verify error message using test data
    await sauceDemo.errorMessage.waitFor();
    await expect(sauceDemo.errorMessage).toHaveText(sauceDemoData.messages.lockedOutError);
    await sauceDemo.takeScreenshot('Locked_Out_User');
  });
});

import { test, expect } from '@playwright/test';
import { SauceDemoObjects } from '../../src/pages/SauceDemoObjects';


// End to End tests
test.describe('Authenticated SauceDemo Tests', () => {
  test.beforeEach(async ({ page }) => {
    const sauceDemo = new SauceDemoObjects(page);
    await sauceDemo.navigateTo(sauceDemo.sauceDemoUrl); 
    await sauceDemo.usernameInput.fill(sauceDemo.username);
    await sauceDemo.passwordInput.fill(sauceDemo.password);
    await sauceDemo.loginButton.click();
    await expect(page).toHaveURL(sauceDemo.inventoryUrl);
  });

test('Order Sauce Labs Bolt T-Shirt', async ({ page }) => {
  const sauceDemo = new SauceDemoObjects(page);
  await expect(page.locator('.inventory_list')).toBeVisible();
  await sauceDemo.saucelabsBoltTShirtCartButton.click();
  await sauceDemo.shoppingCartLink.click();
  await expect(page).toHaveURL(sauceDemo.cartUrl);
  await sauceDemo.checkoutButton.click();
  await expect(page).toHaveURL(sauceDemo.checkoutUrl);
  // Fill in checkout information
  await sauceDemo.firstNameInput.fill('John');
  await sauceDemo.lastNameInput.fill('Doe');
  await sauceDemo.postalCodeInput.fill('12345');
  await sauceDemo.continueButton.click();
  await expect(page).toHaveURL(sauceDemo.checkoutOverviewUrl);
  await sauceDemo.finishButton.click();
  //Check if the order is complete
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  await sauceDemo.takeScreenshot('Order_Complete');
  await expect(page).toHaveURL(sauceDemo.checkoutCompleteUrl);
});
});
  
// Login tests
test.describe('Login Tests', () => {
  test('Locked out user', async ({ page }) => {
    const sauceDemo = new SauceDemoObjects(page);
    await sauceDemo.navigateTo(sauceDemo.sauceDemoUrl);
    await sauceDemo.usernameInput.fill(sauceDemo.lockedOutUsername);
    await sauceDemo.passwordInput.fill(sauceDemo.password);
    await sauceDemo.loginButton.click();
    
    // Wait for and verify error message
    await sauceDemo.errorMessage.waitFor();
    await expect(sauceDemo.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await sauceDemo.takeScreenshot('Locked_Out_User');
  });
});

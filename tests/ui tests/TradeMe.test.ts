import { test, expect } from '@playwright/test';
import { TradeMeObjects } from '../../src/pages/TradeMeObjects';


test.describe('TradeMe navigate to website', () => {
  test.beforeEach(async ({ page }) => {
    const tradeMe = new TradeMeObjects(page);
    await tradeMe.navigateTo(tradeMe.tradeMeSandBoxUrl); 
    await expect(page).toHaveURL(tradeMe.tradeMeSandBoxUrl);
  });

test('Search for Used Cars listing', async ({ page }) => {
  // Initialize TradeMe page object
  const tradeMe = new TradeMeObjects(page);
  
  // Navigate to Motors section from homepage
  await tradeMe.motorVehiclesLink.waitFor();
  await tradeMe.motorVehiclesLink.click();
  
  // Verify successful navigation to Motors page
  await expect(page).toHaveURL(tradeMe.motorsUrl);
  await tradeMe.takeScreenshot('Motors_Page');
  
  // Open car type filter dropdown
  await tradeMe.carTypeDropdown.click();
  
  // Select "Used" cars filter checkbox
  await tradeMe.usedCarCheckbox.waitFor();
  await tradeMe.usedCarCheckbox.check({ force: true });
  await expect(tradeMe.usedCarCheckbox).toBeChecked();
  
  // Execute search by clicking view listings button
  await tradeMe.viewListingsButton.click();
  
  // Verify redirection to used cars search results page
  await expect(page).toHaveURL(tradeMe.usedCarsUrl);
  await tradeMe.takeScreenshot('Used_Cars_Page');

  //Verify Car listings are displayed
  await expect(tradeMe.searchResultsList).toBeVisible();
  // Check that there is at least one listing
  const listingCount = await tradeMe.searchResultsList.count();
  expect(listingCount).toBeGreaterThan(0);
})
});




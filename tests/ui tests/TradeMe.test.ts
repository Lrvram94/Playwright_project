import { test, expect } from '@playwright/test';
import { TradeMeObjects } from '../../src/pages/TradeMeObjects';
import { WaitUtils } from '@utils/test-utils';


test.describe('TradeMe navigate to website', () => {
  test.beforeEach(async ({ page }) => {
    const tradeMe = new TradeMeObjects(page);
    await tradeMe.navigateTo(tradeMe.tradeMeSandBoxUrl); 
    await expect(page).toHaveURL(tradeMe.tradeMeSandBoxUrl);
    await tradeMe.waitForPageLoad();
  });

test('Search for Used Cars listing', async ({ page }) => {
  // Initialize TradeMe page object
  const tradeMe = new TradeMeObjects(page);
  
  // Navigate to Motors section from homepage
  await tradeMe.motorVehiclesLink.waitFor();
  await tradeMe.motorVehiclesLink.click();
  
  // Verify successful navigation to Motors page
  await expect(page).toHaveURL(tradeMe.motorsUrl);
  
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

  // Verify Car listings are displayed
  await expect(tradeMe.searchResultsList).toBeVisible();
  // Check that there is at least one listing
  const listingCount = await tradeMe.searchResultsList.count();
  expect(listingCount).toBeGreaterThan(0);
})

test('Search for Rental houses listing in Lower Hutt', async ({ page }) => {
  // Initialize TradeMe page object
  const tradeMe = new TradeMeObjects(page); 
  // Navigate to Properties section from homepage
  await tradeMe.propertiesLink.waitFor();
  await tradeMe.propertiesLink.click();
  // Click on "For Rent" tab
  await tradeMe.rentalPropertiesLink.waitFor();
  await tradeMe.rentalPropertiesLink.click();
  // Verify successful navigation to Rental Properties page
  await expect(page).toHaveURL(tradeMe.rentalPropertiesUrl);
  // Select Wellington region from region dropdown
  await tradeMe.regionDropdown.click();
  await tradeMe.regionDropdown.selectOption({ label: 'Wellington' });
  // Select Lower Hutt district from district dropdown
  await tradeMe.districtDropdown.click();
  await tradeMe.districtDropdown.selectOption({ label: 'Lower Hutt' });
  //select suburbs 
  await tradeMe.allSuburbsDropdown.waitFor();
  await tradeMe.allSuburbsDropdown.click();
  // Select "All Suburbs"
  await page.getByText('All suburbs', { exact: true }).click();
  // Search for rental listings
  await tradeMe.searchResultsButton.click();
  await tradeMe.waitForPageLoad();
  // Verify rental listings are displayed
  const listingCount = await tradeMe.rentalSearchResultsList.count();
  expect(listingCount).toBeGreaterThan(0);
  await tradeMe.takeScreenshot('Rental_Listings_Page');
});
});
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SauceDemoObjects extends BasePage {
   constructor(public readonly page: Page) {
      super(page);
   }
 
  // SauceDemo Page Locators
  get usernameInput(): Locator { return this.page.locator('#user-name'); }
  get passwordInput(): Locator { return this.page.locator('#password'); }
  get loginButton(): Locator { return this.page.locator('#login-button'); }
  get errorMessage(): Locator { return this.page.locator('[data-test="error"]'); }
  get inventoryList(): Locator { return this.page.locator('.inventory_list'); }
  get completeHeader(): Locator { return this.page.locator('.complete-header'); }
  get saucelabsBoltTShirtCartButton(): Locator { return this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt'); }
  get shoppingCartLink(): Locator { return this.page.locator('.shopping_cart_link'); }
  get checkoutButton(): Locator { return this.page.locator('#checkout'); }
  
  
  // Checkout Page Locators
  get checkoutUrl(): string { return 'https://www.saucedemo.com/checkout-step-one.html'; }
  get firstNameInput(): Locator { return this.page.locator('#first-name'); }
  get lastNameInput(): Locator { return this.page.locator('#last-name'); }
  get postalCodeInput(): Locator { return this.page.locator('#postal-code'); }   
  get continueButton(): Locator { return this.page.locator('#continue'); }
  get finishButton(): Locator { return this.page.locator('#finish'); }

   
};

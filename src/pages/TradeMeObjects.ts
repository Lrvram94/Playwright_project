import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TradeMeObjects extends BasePage {
   constructor(public readonly page: Page) {
      super(page);
   }

    // TradeMe URLs    
    get tradeMeSandBoxUrl(): string { return 'https://www.tmsandbox.co.nz/a/'; }
    get motorsUrl(): string { return 'https://www.tmsandbox.co.nz/a/motors'; }
    get usedCarsUrl(): string { return 'https://www.tmsandbox.co.nz/a/motors/cars/search?vehicle_condition=used'; }

    // TradeMe Motor Page Locators
    get motorVehiclesLink(): Locator { 
        return this.page.locator('.tm-homepage-search-header__vertical-links-link', { hasText: 'Motors'}); 
    }
    
    get carTypeDropdown(): Locator { 
        return this.page.locator('.tm-motors-search-bar__dropdown-multi-select', { hasText: 'All cars' });
    }
    
    get usedCarCheckbox(): Locator {
        return this.page.locator('tg-checkbox').filter({ hasText: 'Used' }).locator('input[type="checkbox"]');
   }  
    get viewListingsButton(): Locator { 
        return this.page.locator('button:has-text("View listings")');
    }

    get searchResultsList(): Locator {
        return this.page.locator('.tm-search-results');
    }
}


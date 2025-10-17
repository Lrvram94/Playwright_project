import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TradeMeObjects extends BasePage {
   constructor(public readonly page: Page) {
      super(page);
}

// TradeMe Motor Page Locators
get motorVehiclesLink(): Locator { 
    return this.page.locator('.tm-homepage-search-header__vertical-links-link', { hasText: 'Motors'}); 
}
    
get CarTypeDropdown(): Locator { 
    return this.page.locator('span.tm-motors-search-bar__dropdown-multi-select-text', { hasText: 'All cars' });
}
     
get viewListingsButton(): Locator { 
    return this.page.locator('button:has-text("View listings")');
}

get searchResultsList(): Locator {
    return this.page.locator('.tm-search-results');
}

get propertiesLink(): Locator { 
    return this.page.locator('.tm-homepage-search-header__vertical-links-link', { hasText: 'Property'}); 
}

get rentalPropertiesLink(): Locator { 
    return this.page.locator('a.tm-property-search-form__tab-item', { hasText: ' For rent '});    
}

get regionDropdown(): Locator {
    return this.page.locator('select[name="region"]');
}  
   
get districtDropdown(): Locator {
    return this.page.locator('select[name="district"]');   
}

get allSuburbsDropdown(): Locator {
    return this.page.locator('button.tm-property-location-search-multi-dropdown__suburb-button', { hasText: "All suburbs" });
} 

get minRentDropdown(): Locator {
    return this.page.locator('select[name="selectedMin"]');
}

get bedroomsDropdown(): Locator {
    return this.page.locator('select[name="selectBedrooms"]');
}

get bathroomsDropdown(): Locator {
    return this.page.locator('select[name="selectBathrooms"]');
}

get propertyTypeDropdown(): Locator {
    return this.page.locator('select[id="propertyTypeSearchButton"]');
}
get searchResultsButton(): Locator {
    return this.page.locator('button', { hasText: "Search" });
}
get rentalSearchResultsList(): Locator {
    return this.page.locator('tm-property-search-results');
}
}
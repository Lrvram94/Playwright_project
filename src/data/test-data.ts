// SauceDemo specific test data
export const sauceDemoData = {
  urls: {
    base: 'https://www.saucedemo.com/',
    inventory: 'https://www.saucedemo.com/inventory.html',
    cart: 'https://www.saucedemo.com/cart.html',
    checkout: 'https://www.saucedemo.com/checkout-step-one.html',
    checkoutOverview: 'https://www.saucedemo.com/checkout-step-two.html',
    checkoutComplete: 'https://www.saucedemo.com/checkout-complete.html'
  },
  
  credentials: {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    lockedOut: { username: 'locked_out_user', password: 'secret_sauce' }
  },
  
  checkoutInfo: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },
  
  messages: {
    orderComplete: 'Thank you for your order!',
    lockedOutError: 'Epic sadface: Sorry, this user has been locked out.'
  }
};

// TradeMe specific test data
export const tradeMeData = {
  urls: {
    sandbox: 'https://www.tmsandbox.co.nz/a/',
    motors: 'https://www.tmsandbox.co.nz/a/motors',
    usedCars: 'https://www.tmsandbox.co.nz/a/motors/cars/search?vehicle_condition=used',
    rentalPropertiesUrl : 'https://www.tmsandbox.co.nz/a/property/residential/rent'
  }
};

// OrangeHRM specific test data
export const orangeHRMData = {
  urls: {
    demo: 'https://opensource-demo.orangehrmlive.com/',
    dashboard: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
  },

  credentials : {
    admin: { username: 'Admin', password: 'admin123' }
}
};

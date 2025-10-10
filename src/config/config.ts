export const config = {
  // Application-specific environments
  apps: {
    sauceDemo: {
      dev: 'https://www.saucedemo.com',
      staging: 'https://www.saucedemo.com',
      prod: 'https://www.saucedemo.com'
    },
    tradeMe: {
      dev: 'https://www.tmsandbox.co.nz/a/',
      staging: 'https://www.tmsandbox.co.nz/a/',
      prod: 'https://www.trademe.co.nz'
    }
  },

  // Default timeouts (in milliseconds)
  timeouts: {
    short: 5000,
    medium: 15000,
    long: 30000,
    extraLong: 60000,
    pageLoad: 10000,
    elementWait: 5000
  },

  // Browser configurations
  browsers: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO || '0'),
    devtools: process.env.DEVTOOLS === 'true'
  },

  // Test execution settings
  execution: {
    retries: parseInt(process.env.RETRIES || '1'),
    workers: parseInt(process.env.WORKERS || '1'),
    fullyParallel: process.env.FULLY_PARALLEL === 'true'
  },

  // Screenshot and video settings
  capture: {
    screenshot: process.env.SCREENSHOT || 'only-on-failure',
    video: process.env.VIDEO || 'retain-on-failure',
    trace: process.env.TRACE || 'on-first-retry'
  }
};

// Get current environment
export const getCurrentEnvironment = (): string => {
  return process.env.TEST_ENV || 'dev';
};

// Get app-specific URL for current environment
export const getAppUrl = (appName: 'sauceDemo' | 'tradeMe'): string => {
  const env = getCurrentEnvironment();
  return config.apps[appName][env as keyof typeof config.apps[typeof appName]] || config.apps[appName].dev;
};

// Get timeout by type
export const getTimeout = (type: keyof typeof config.timeouts): number => {
  return config.timeouts[type];
};

// Check if running in CI environment
export const isCI = (): boolean => {
  return !!process.env.CI;
};

// Get browser configuration
export const getBrowserConfig = () => {
  return {
    headless: config.browsers.headless,
    slowMo: config.browsers.slowMo,
    devtools: config.browsers.devtools && !isCI() // Don't open devtools in CI
  };
};

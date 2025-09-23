export const config = {
  // Environment URLs
  environments: {
    dev: 'https://dev.example.com',
    staging: 'https://staging.example.com',
    prod: 'https://prod.example.com'
  },

  // Default timeouts (in milliseconds)
  timeouts: {
    short: 5000,
    medium: 15000,
    long: 30000,
    extraLong: 60000
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

// Get base URL for current environment
export const getBaseUrl = (): string => {
  const env = getCurrentEnvironment();
  return config.environments[env as keyof typeof config.environments] || config.environments.dev;
};

import { APIRequestContext, Cookie, Page } from '@playwright/test';
import { orangeHRMData } from '../data/test-data';

export class OrangeHrmApiHelper {
  private baseUrl = 'https://opensource-demo.orangehrmlive.com';

  constructor(private request: APIRequestContext) {}

  /**
   * Login to OrangeHRM via API and return cookies
   * Uses a headless approach to get valid session cookies
   */
  async login(): Promise<Cookie[]> {
    // First, we need to get the login page to capture any CSRF tokens
    const loginPage = await this.request.get(`${this.baseUrl}/web/index.php/auth/login`);
    
    // Perform login with form data
    const response = await this.request.post(`${this.baseUrl}/web/index.php/auth/validate`, {
      form: {
        username: orangeHRMData.credentials.admin.username,
        password: orangeHRMData.credentials.admin.password,
        _token: '' // OrangeHRM might need CSRF token
      },
      maxRedirects: 10
    });

    // Get all cookies from the request context after login
    const storageState = await this.request.storageState();
    
    return storageState.cookies;
  }

  /**
   * Alternative: Login via Page context (more reliable for session-based auth)
   * Uses OrangeHRM page object for proper Page Object Model pattern
   */
  async loginViaPage(page: Page): Promise<Cookie[]> {
    // Import here to avoid circular dependencies
    const { OrangeHrmObjects } = await import('../pages/OrangeHrmObjects');
    const orangeHrm = new OrangeHrmObjects(page);
    
    // Navigate to login page
    await orangeHrm.navigateTo(`${this.baseUrl}/web/index.php/auth/login`);
    
    // Fill login form using page object locators
    await orangeHrm.usernameInput.fill(orangeHRMData.credentials.admin.username);
    await orangeHrm.passwordInput.fill(orangeHRMData.credentials.admin.password);
    await orangeHrm.loginButton.click();
    
    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard/index', { timeout: 10000 });
    
    // Extract cookies from the page context
    const cookies = await page.context().cookies();
    
    return cookies;
  }
}
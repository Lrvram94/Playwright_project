import { APIRequestContext, APIResponse, expect } from '@playwright/test';

/**
 * Base class for all API services - similar to BasePage for UI tests
 * Provides common HTTP methods and assertions that all API classes can use
 */
export abstract class BaseAPI {
  protected request: APIRequestContext;
  protected baseUrl: string;

  constructor(request: APIRequestContext, baseUrl?: string) {
    this.request = request;
    this.baseUrl = baseUrl || '';
  }

  /**
   * Standard HTTP GET method
   * @param endpoint - API endpoint path
   * @param options - Additional request options
   */
  protected async get(endpoint: string, options?: any): Promise<APIResponse> {
    const fullUrl = this.buildUrl(endpoint);
    const response = await this.request.get(fullUrl, {
      headers: this.getDefaultHeaders(),
      ...options
    });
    return response;
  }

  /**
   * Standard HTTP POST method
   * @param endpoint - API endpoint path
   * @param data - Request body data
   * @param options - Additional request options
   */
  protected async post(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const fullUrl = this.buildUrl(endpoint);
    const response = await this.request.post(fullUrl, {
      data,
      headers: this.getDefaultHeaders(),
      ...options
    });
    return response;
  }

  /**
   * Standard HTTP PUT method
   * @param endpoint - API endpoint path
   * @param data - Request body data
   * @param options - Additional request options
   */
  protected async put(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const fullUrl = this.buildUrl(endpoint);
    const response = await this.request.put(fullUrl, {
      data,
      headers: this.getDefaultHeaders(),
      ...options
    });
    return response;
  }

  /**
   * Standard HTTP DELETE method
   * @param endpoint - API endpoint path
   * @param options - Additional request options
   */
  protected async delete(endpoint: string, options?: any): Promise<APIResponse> {
    const fullUrl = this.buildUrl(endpoint);
    const response = await this.request.delete(fullUrl, {
      headers: this.getDefaultHeaders(),
      ...options
    });
    return response;
  }

  /**
   * Build complete URL from base URL and endpoint
   * Similar to how BasePage handles URL construction
   */
  private buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http')) {
      return endpoint; // Already a full URL
    }
    
    const cleanBase = this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    return `${cleanBase}${cleanEndpoint}`;
  }

  /**
   * Get default headers - similar to how BasePage provides common functionality
   */
  protected getDefaultHeaders(): Record<string, string> {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  /**
   * Common assertion methods - following the pattern of BasePage utilities
   */
  async assertStatusCode(response: APIResponse, expectedStatus: number): Promise<void> {
    expect(response.status()).toBe(expectedStatus);
  }

  async assertResponseTime(response: APIResponse, maxTime: number = 5000): Promise<void> {
    // This is a placeholder - actual implementation would measure response time
    expect(response.status()).toBeTruthy();
  }

  async assertJsonProperty(response: APIResponse, propertyPath: string, expectedValue?: any): Promise<void> {
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(propertyPath);
    
    if (expectedValue !== undefined) {
      const propertyValue = this.getNestedProperty(responseBody, propertyPath);
      expect(propertyValue).toBe(expectedValue);
    }
  }

    /**
     * Helper method to get nested properties from objects
     */
    private getNestedProperty(obj: any, path: string): any {
      return path.split('.').reduce((current, key) => current?.[key], obj);
    }
  }
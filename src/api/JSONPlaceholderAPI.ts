import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './BaseApi';

/**
 * JSONPlaceholder API service class - follows Page Object pattern for APIs
 * Contains all methods for interacting with JSONPlaceholder endpoints
 */
export class JSONPlaceholderAPI extends BaseAPI {
  constructor(request: APIRequestContext) {
    // JSONPlaceholder API base URL
    super(request, 'https://jsonplaceholder.typicode.com');
  }
 
}
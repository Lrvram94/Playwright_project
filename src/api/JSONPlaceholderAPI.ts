import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './BaseAPI';

/**
 * JSONPlaceholder API service class - follows Page Object pattern for APIs
 * Contains all methods for interacting with JSONPlaceholder endpoints
 */
export class JSONPlaceholderAPI extends BaseAPI {
  constructor(request: APIRequestContext) {
    // Using the baseURL from playwright config, so no need to pass it here
    super(request);
  }

  /**
   * Endpoint getters - following the pattern of URL getters in page objects
   * These provide a centralized way to manage API endpoints
   */
  get postsEndpoint(): string { return '/posts'; }
  get usersEndpoint(): string { return '/users'; }
  get commentsEndpoint(): string { return '/comments'; }
  get albumsEndpoint(): string { return '/albums'; }
  get photosEndpoint(): string { return '/photos'; }
  get todosEndpoint(): string { return '/todos'; }

  /**
   * Posts API Methods - Business logic methods like in page objects
   */
  async getAllPosts() {
    return await this.get(this.postsEndpoint);
  }

  async getPostById(id: number) {
    return await this.get(`${this.postsEndpoint}/${id}`);
  }

  async createPost(postData: any) {
    return await this.post(this.postsEndpoint, postData);
  }

  async updatePost(id: number, postData: any) {
    return await this.put(`${this.postsEndpoint}/${id}`, postData);
  }

  async deletePost(id: number) {
    return await this.delete(`${this.postsEndpoint}/${id}`);
  }

  async getPostComments(postId: number) {
    return await this.get(`${this.postsEndpoint}/${postId}/comments`);
  }

  /**
   * Users API Methods
   */
  async getAllUsers() {
    return await this.get(this.usersEndpoint);
  }

  async getUserById(id: number) {
    return await this.get(`${this.usersEndpoint}/${id}`);
  }

  async createUser(userData: any) {
    return await this.post(this.usersEndpoint, userData);
  }

  async updateUser(id: number, userData: any) {
    return await this.put(`${this.usersEndpoint}/${id}`, userData);
  }

  async deleteUser(id: number) {
    return await this.delete(`${this.usersEndpoint}/${id}`);
  }

  async getUserPosts(userId: number) {
    return await this.get(`${this.usersEndpoint}/${userId}/posts`);
  }

  async getUserAlbums(userId: number) {
    return await this.get(`${this.usersEndpoint}/${userId}/albums`);
  }

  async getUserTodos(userId: number) {
    return await this.get(`${this.usersEndpoint}/${userId}/todos`);
  }

  /**
   * Comments API Methods
   */
  async getAllComments() {
    return await this.get(this.commentsEndpoint);
  }

  async getCommentById(id: number) {
    return await this.get(`${this.commentsEndpoint}/${id}`);
  }

  /**
   * Albums API Methods
   */
  async getAllAlbums() {
    return await this.get(this.albumsEndpoint);
  }

  async getAlbumById(id: number) {
    return await this.get(`${this.albumsEndpoint}/${id}`);
  }

  async getAlbumPhotos(albumId: number) {
    return await this.get(`${this.albumsEndpoint}/${albumId}/photos`);
  }

  /**
   * Todos API Methods
   */
  async getAllTodos() {
    return await this.get(this.todosEndpoint);
  }

  async getTodoById(id: number) {
    return await this.get(`${this.todosEndpoint}/${id}`);
  }

  async createTodo(todoData: any) {
    return await this.post(this.todosEndpoint, todoData);
  }

  async updateTodo(id: number, todoData: any) {
    return await this.put(`${this.todosEndpoint}/${id}`, todoData);
  }

  async deleteTodo(id: number) {
    return await this.delete(`${this.todosEndpoint}/${id}`);
  }
}
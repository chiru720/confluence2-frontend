/**
 * Base API client for making requests to the backend
 */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API client singleton
class ApiClient {
  private static instance: ApiClient;
  private api: AxiosInstance;
  
  private constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle token expiration or auth errors
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }
  
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
  
  // Generic request method with type support
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.request<T>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{message?: string}>;
        const errorMessage = 
          axiosError.response?.data?.message || 
          axiosError.message || 
          'An unknown error occurred';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }
  
  // GET request
  public async get<T>(url: string, params?: any): Promise<T> {
    return this.request<T>({ method: 'GET', url, params });
  }
  
  // POST request
  public async post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'POST', url, data });
  }
  
  // PUT request
  public async put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data });
  }
  
  // PATCH request
  public async patch<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PATCH', url, data });
  }
  
  // DELETE request
  public async delete<T>(url: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', url });
  }
}

// Export a singleton instance
export const apiClient = ApiClient.getInstance(); 
/**
 * Base HTTP service following Dependency Inversion Principle.
 * All API services should extend or use this base service
 * rather than calling fetch/axios directly.
 */

import { APP_CONFIG } from "@/config";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
}

class HttpService {
  private baseUrl: string;

  constructor(baseUrl: string = APP_CONFIG.API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) =>
        url.searchParams.append(key, value),
      );
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", endpoint, options);
  }

  post<T>(
    endpoint: string,
    body: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("POST", endpoint, { ...options, body });
  }

  put<T>(
    endpoint: string,
    body: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, { ...options, body });
  }

  patch<T>(
    endpoint: string,
    body: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, { ...options, body });
  }

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", endpoint, options);
  }
}

export const httpService = new HttpService();
export default HttpService;

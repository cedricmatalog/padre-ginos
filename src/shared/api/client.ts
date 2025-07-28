import { BASE_URL } from "../config/constants";

interface ApiClient {
  get<T = any>(endpoint: string): Promise<T>;
  post<T = any>(endpoint: string, data?: any): Promise<T>;
}

const apiClient: ApiClient = {
  async get<T = any>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
    }
    return response.json();
  },

  async post<T = any>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to post to ${endpoint}: ${response.status}`);
    }
    return response.json();
  },
};

export default apiClient;
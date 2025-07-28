import apiClient from "./client";
import type { ContactFormData, ApiResponse } from "../types";

export const postContact = async (name: string, email: string, message: string): Promise<ApiResponse> => {
  return apiClient.post<ApiResponse>("/api/contact", { name, email, message });
};

export const postContactForm = async (formData: ContactFormData): Promise<ApiResponse> => {
  return apiClient.post<ApiResponse>("/api/contact", formData);
};
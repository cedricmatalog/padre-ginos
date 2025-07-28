import apiClient from "./client";
import type { Cart, PastOrder, PastOrderDetails, ApiResponse } from "../types";

export const createOrder = async (cart: Cart): Promise<ApiResponse> => {
  return apiClient.post<ApiResponse>("/api/order", { cart });
};

export const getPastOrders = async (page: number = 1): Promise<PastOrder[]> => {
  return apiClient.get<PastOrder[]>(`/api/past-orders?page=${page}`);
};

export const getPastOrder = async (orderId: string): Promise<PastOrderDetails> => {
  return apiClient.get<PastOrderDetails>(`/api/past-order/${orderId}`);
};
import apiClient from "./client";

export const createOrder = async (cart) => {
  return apiClient.post("/api/order", { cart });
};

export const getPastOrders = async () => {
  return apiClient.get("/api/past-orders");
};

export const getPastOrder = async (orderId) => {
  return apiClient.get(`/api/past-order/${orderId}`);
};
import apiClient from "./client";

export const postContact = async (name, email, message) => {
  return apiClient.post("/api/contact", { name, email, message });
};
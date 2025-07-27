import apiClient from "./client";

export const getPizzaTypes = async () => {
  return apiClient.get("/api/pizzas");
};

export const getPizzaOfTheDay = async () => {
  return apiClient.get("/api/pizza-of-the-day");
};
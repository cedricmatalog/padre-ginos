import apiClient from "./client";
import type { Pizza } from "../types";

export const getPizzaTypes = async (): Promise<Pizza[]> => {
  return apiClient.get<Pizza[]>("/api/pizzas");
};

export const getPizzaOfTheDay = async (): Promise<Pizza> => {
  return apiClient.get<Pizza>("/api/pizza-of-the-day");
};
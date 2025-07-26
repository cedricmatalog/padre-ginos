import { BASE_URL } from "../lib/config";

export const getPizzaTypes = async () => {
  const response = await fetch(`${BASE_URL}/api/pizzas`);
  if (!response.ok) {
    throw new Error("Failed to fetch pizza types");
  }
  return response.json();
};

export const getPizzaOfTheDay = async () => {
  const response = await fetch(`${BASE_URL}/api/pizza-of-the-day`);
  if (!response.ok) {
    throw new Error("Failed to fetch pizza of the day");
  }
  return response.json();
};

export const createOrder = async (cart) => {
  const response = await fetch(`${BASE_URL}/api/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart }),
  });
  if (!response.ok) {
    throw new Error("Failed to create order");
  }
  return response.json();
};

import { BASE_URL } from "../config";

export default async function getPastOrders(page) {
  const response = await fetch(`${BASE_URL}/api/past-orders?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch past orders");
  }
  const data = await response.json();

  return data;
}

import { BASE_URL } from "../config";

export default async function getPastOrder(orderId) {
  console.log("Fetching past order with ID:", orderId); // Debugging line
  const response = await fetch(`${BASE_URL}/api/past-order/${orderId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch past order");
  }

  const data = await response.json();
  console.log("Fetched past order:", data); // Debugging line
  return data;
}

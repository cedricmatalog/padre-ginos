import { BASE_URL } from "../lib/config";

export default async function postContact(name, email, message) {
  console.log({ name, email, message }); // Debugging line
  const response = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to post contact");
  }

  const data = await response.json();
  return data;
}

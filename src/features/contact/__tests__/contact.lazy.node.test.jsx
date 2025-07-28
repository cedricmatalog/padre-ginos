import { render } from "@testing-library/react";
import { expect, test, vi, afterEach } from "vitest";

import createFetchMock from "vitest-fetch-mock";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../../../pages/contact.lazy";
import { BASE_URL } from "../../../shared/config/constants";

const queryClient = new QueryClient();
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("can submit contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({ success: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );

  const nameInput = screen.getByPlaceholderText("Enter your full name");
  const emailInput = screen.getByPlaceholderText("your.email@example.com");
  const messageInput = screen.getByPlaceholderText("How can we help you? Tell us about your question or feedback...");

  const testData = {
    name: "John Doe",
    email: "john@example.com",
    message: "Hello, this is a test message.",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  messageInput.value = testData.message;

  const submitButton = screen.getByRole("button");
  submitButton.click();

  const h2 = await screen.findByRole("heading", { level: 2, name: /message sent/i });

  expect(h2.innerText).toContain("Message Sent!");

  const request = fetchMocker.requests();
  expect(request.length).toBe(1);
  expect(request[0].url).toBe(`${BASE_URL}/api/contact`);

  expect(fetchMocker).toHaveBeenCalledWith(`${BASE_URL}/api/contact`, {
    method: "POST",
    body: JSON.stringify(testData),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../../hooks/usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "Calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description: "This is a test pizza",
  image: "/public/pizzas/calabrese.jpg",
  size: { S: 12.2, M: 14.5, L: 16.8 },
};

test("gives null when first called", () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));

  const { result } = renderHook(() => usePizzaOfTheDay());
  expect(result.current.pizza).toBeNull();
});

test("to call the api and give back the pizza of the day ", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));

  const { result } = renderHook(() => usePizzaOfTheDay());
  await waitFor(
    () => {
      expect(result.current.pizza).toEqual(testPizza);
    },
    { timeout: 2000 },
  );
});

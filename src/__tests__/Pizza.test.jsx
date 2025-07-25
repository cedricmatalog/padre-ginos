import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import Pizza from "../components/Pizza";

// Mock BASE_URL to be empty for testing
vi.mock("../config", () => ({
  BASE_URL: "",
}));

test("alt test renders on Pizza image", async () => {
  const name = "Pepperoni Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} />,
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

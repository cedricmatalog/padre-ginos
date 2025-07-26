import { render, cleanup } from "@testing-library/react";
import { expect, test, vi, afterEach } from "vitest";

import Pizza from "../../components/Pizza";

vi.mock("../lib/config", () => ({
  BASE_URL: "",
}));

afterEach(cleanup);

test("alt test renders on Pizza image", () => {
  const name = "Pepperoni Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} />,
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

test("to have default image if none is provided", () => {
  const screen = render(
    <Pizza name="something else" description="super cool pizza" />,
  );

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});

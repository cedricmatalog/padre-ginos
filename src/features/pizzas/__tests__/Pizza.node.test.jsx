import { render, cleanup } from "@testing-library/react";
import { expect, test, vi, afterEach } from "vitest";

import Pizza from "../components/Pizza";

vi.mock("../../../shared/config/constants", () => ({
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
  expect(img.alt).toBe(`${name} pizza`);
});

test("to have default image if none is provided", () => {
  const name = "something else";
  const screen = render(
    <Pizza name={name} description="super cool pizza" />,
  );

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
  expect(img.alt).toBe(`${name} pizza`);
});

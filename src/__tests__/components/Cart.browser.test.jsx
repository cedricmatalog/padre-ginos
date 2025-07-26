import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import Cart from "../../components/Cart";

test("snapshot with nothing in cart", () => {
  const { asFragment } = render(<Cart cart={[]} />);
  expect(asFragment()).toMatchSnapshot();
});

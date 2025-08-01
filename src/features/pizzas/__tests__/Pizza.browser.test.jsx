import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Pizza from "../components/Pizza";

test("alt text renders on image", async () => {
  const name = "My favorite pizza";
  const src = "https://picsum.photos/200";
  const description = "A delicious pizza";

  const screen = render(<Pizza name={name} image={src} description={description} />);

  const img = await screen.getByRole("img");

  console.log({ img });

  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("src", src);
  await expect.element(img).toHaveAttribute("alt", `${name} pizza`);
});

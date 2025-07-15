import { createRoot } from "react-dom/client";

import Pizza from "./Pizza";
import Order from "./Order";

const pizzaData = [
  {
    title: "Margherita",
    description: "Classic pizza with tomato sauce and mozzarella",
    image: "/public/pizzas/margherita.webp",
    name: "Margherita",
  },
  {
    title: "Pepperoni",
    description: "Spicy pepperoni with mozzarella and tomato sauce",
    image: "/public/pizzas/pepperoni.webp",
    name: "Pepperoni",
  },
  {
    title: "Vegetarian",
    description: "Loaded with fresh vegetables and mozzarella",
    image: "/public/pizzas/vegetarian.webp",
    name: "Vegetarian",
  },
  {
    title: "BBQ Chicken",
    description: "Grilled chicken with BBQ sauce and red onions",
    image: "/public/pizzas/bbq-chicken.webp",
    name: "BBQ Chicken",
  },
  {
    title: "Hawaiian",
    description: "Ham and pineapple with mozzarella",
    image: "/public/pizzas/hawaiian.webp",
    name: "Hawaiian",
  },
];

const App = () => {
  return (
    <div>
      <h1>Padre Gino's '- Order now</h1>
      <Order />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

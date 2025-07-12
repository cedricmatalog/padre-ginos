import { createRoot } from "react-dom/client";

import Pizza from "./Pizza";

const pizzaData = [
  {
    title: "Margherita",
    description: "Classic pizza with tomato sauce and mozzarella",
  },
  {
    title: "Pepperoni",
    description: "Spicy pepperoni with mozzarella and tomato sauce",
  },
  {
    title: "Vegetarian",
    description: "Loaded with fresh vegetables and mozzarella",
  },
  {
    title: "BBQ Chicken",
    description: "Grilled chicken with BBQ sauce and red onions",
  },
  {
    title: "Hawaiian",
    description: "Ham and pineapple with mozzarella",
  },
];

const App = () => {
  return (
    <div>
      <h1>Padre Gino's</h1>
      {pizzaData.map((pizza, index) => (
        <Pizza key={index} {...pizza} />
      ))}
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

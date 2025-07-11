import { createElement } from "react";
import { createRoot } from "react-dom/client";

const Pizza = (props) => {
  return createElement("div", {}, [
    createElement("h1", {}, props.title),
    createElement("p", {}, props.description),
  ]);
};

//eslint-disable-next-line no-unused-vars
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
  return createElement("div", null, createElement("h1", {}, "Padre Gino's"), [
    createElement(Pizza, {
      title: "Margherita",
      description: "Classic pizza with tomato sauce and mozzarella",
    }),
    createElement(Pizza, {
      title: "Pepperoni",
      description: "Spicy pepperoni with mozzarella and tomato sauce",
    }),
    createElement(Pizza, {
      title: "Vegetarian",
      description: "Loaded with fresh vegetables and mozzarella",
    }),
    createElement(Pizza, {
      title: "BBQ Chicken",
      description: "Grilled chicken with BBQ sauce and red onions",
    }),
    createElement(Pizza, {
      title: "Hawaiian",
      description: "Ham and pineapple with mozzarella",
    }),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(createElement(App, null));

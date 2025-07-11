const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.title),
    React.createElement("p", {}, props.description),
  ]);
};

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
  return React.createElement(
    "div",
    null,
    React.createElement("h1", {}, "Padre Gino's"),
    [
      React.createElement(Pizza, {
        title: "Margherita",
        description: "Classic pizza with tomato sauce and mozzarella",
      }),
      React.createElement(Pizza, {
        title: "Pepperoni",
        description: "Spicy pepperoni with mozzarella and tomato sauce",
      }),
      React.createElement(Pizza, {
        title: "Vegetarian",
        description: "Loaded with fresh vegetables and mozzarella",
      }),
      React.createElement(Pizza, {
        title: "BBQ Chicken",
        description: "Grilled chicken with BBQ sauce and red onions",
      }),
      React.createElement(Pizza, {
        title: "Hawaiian",
        description: "Ham and pineapple with mozzarella",
      }),
    ]
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App, null));

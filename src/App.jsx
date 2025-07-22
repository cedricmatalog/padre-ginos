import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Order from "./Order";
import PizzaoOfTheDay from "./PizzaoOfTheDay";

const App = () => {
  return (
    <StrictMode>
      <div>
        <h1>Padre Gino's '- Order now</h1>
        <Order />
        <PizzaoOfTheDay />
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

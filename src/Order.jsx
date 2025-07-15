import { use, useEffect, useState } from "react";
import Pizza from "./Pizza";

export default function Order() {
  const [pizzaType, setPizzaType] = useState("Pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");

  const pizzaTypes = ["Margherita", "Pepperoni", "Veggie"];
  const pizzaSizes = [
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
  ];

  const handlePizzaTypeChange = (event) => {
    setPizzaType(event.target.value);
  };

  const handlePizzaSizeChange = (event) => {
    setPizzaSize(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to add the pizza to the cart can be added here
    console.log(`Added ${pizzaType} (${pizzaSize}) to cart`);
  };

  useEffect(() => {
    // This effect can be used to fetch pizza types or sizes from an API if needed
    console.log(`Selected pizza type: ${pizzaType}, size: ${pizzaSize}`);
  }, [pizzaType, pizzaSize]);

  return (
    <div className="order">
      <h2>Create Order</h2>

      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type:</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={handlePizzaTypeChange}
            >
              {pizzaTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size:</label>
            <div>
              {pizzaSizes.map(({ label, value }) => (
                <span key={value}>
                  <input
                    checked={pizzaSize === value}
                    type="radio"
                    name="pizza-size"
                    value={value}
                    id={`pizza-${value}`}
                    onChange={handlePizzaSizeChange}
                  />

                  <label htmlFor={`pizza-${value}`}>{label}</label>
                </span>
              ))}
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className="order-pizza">
          <Pizza
            title={pizzaType}
            description="Delicious pizza with fresh ingredients."
            image="/public/pizzas/pepperoni.jpg"
            name={pizzaType}
          />
          <p>$13.37</p>
        </div>
      </form>
    </div>
  );
}

import { useEffect, useState, useContext, use } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

import Pizza from "../Pizza";
import { intl } from "../utils";
import Cart from "../Cart"; // Assuming you have a Cart component
import { CartContext } from "../contexts";

export const Route = createLazyFileRoute("/order")({
  path: "/order",
  component: Order,
});

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("Pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(selectedPizza?.sizes[pizzaSize]);
  }

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    setCart([]);
    setLoading(false);
  }

  async function fetchPizzaTypes() {
    // wait for 1 second to simulate loading
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await fetch("/api/pizzas");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      console.log("Fetched pizza types:", data);
      setPizzaTypes(data);

      setPizzaType(data[0]?.id || "Pepperoni");
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch pizza types:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPizzaTypes();

    return () => {
      // Cleanup if necessary
      setPizzaTypes([]);
      setPizzaType("Pepperoni");
      setPizzaSize("M");
    };
  }, []);

  // const pizzaTypes = ["Margherita", "Pepperoni", "Veggie"];
  const pizzaSizes = [
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
  ];

  const handlePizzaTypeChange = (event) => {
    console.log("Pizza type changed:", event.target.value);
    setPizzaType(event.target.value);
  };

  const handlePizzaSizeChange = (event) => {
    setPizzaSize(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to add the pizza to the cart can be added here
    console.log(`Added ${pizzaType} (${pizzaSize}) to cart`);

    setCart((prevCart) => [
      ...prevCart,
      {
        pizza: selectedPizza,
        size: pizzaSize,
        price: selectedPizza.sizes[pizzaSize],
      },
    ]);
  };

  // useEffect(() => {
  //   // This effect can be used to fetch pizza types or sizes from an API if needed
  //   console.log(`Selected pizza type: ${pizzaType}, size: ${pizzaSize}`);
  // }, [pizzaType, pizzaSize]);

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type:</label>
              <select
                name="pizza-type"
                value={pizzaType}
                onChange={handlePizzaTypeChange}
              >
                {pizzaTypes.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
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

          {loading ? (
            <p>Loading pizza...</p>
          ) : (
            <div className="order-pizza">
              <Pizza
                title={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
                name={selectedPizza.name}
              />
              <p>{price}</p>
            </div>
          )}
        </form>
      </div>
      {!loading && <Cart cart={cart} checkout={checkout} />}
    </div>
  );
}

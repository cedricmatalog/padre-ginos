import { createLazyFileRoute } from "@tanstack/react-router";

import Pizza from "../components/Pizza";
import Cart from "../components/Cart"; // Assuming you have a Cart component
import { useOrder } from "../hooks/useOrder";

export const Route = createLazyFileRoute("/order")({
  path: "/order",
  component: Order,
});

function Order() {
  const {
    pizzaTypes,
    pizzaType,
    pizzaSize,
    cart,
    loading,
    price,
    selectedPizza,
    checkout,
    handlePizzaTypeChange,
    handlePizzaSizeChange,
    handleSubmit,
  } = useOrder();

  const pizzaSizes = [
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
  ];

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>

        <form action={handleSubmit}>
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

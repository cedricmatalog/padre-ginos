import Pizza from "./Pizza";

export default function Order() {
  const pizzaType = "Pepperoni";
  const pizzaSize = "M";

  const pizzaTypes = ["Margherita", "Pepperoni", "Veggie"];
  const pizzaSizes = ["S", "M", "L"];

  return (
    <div className="order">
      <h2>Create Order</h2>

      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type:</label>
            <select name="pizza-type" value={pizzaType}>
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
              {pizzaSizes.map((size) => (
                <span key={size}>
                  <input
                    id={`pizza-${size}`}
                    checked={pizzaSize === size}
                    type="radio"
                    name="pizza-size"
                    value={size}
                  />
                  {size}
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

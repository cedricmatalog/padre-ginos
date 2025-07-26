import { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts";
import { intl } from "../utils";
import { DEFAULT_PIZZA_TYPE, DEFAULT_PIZZA_SIZE } from "../lib/config";
import { getPizzaTypes, createOrder } from "../api";

export const useOrder = () => {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState(DEFAULT_PIZZA_TYPE);
  const [pizzaSize, setPizzaSize] = useState(DEFAULT_PIZZA_SIZE);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(selectedPizza?.sizes[pizzaSize]);
  }

  async function checkout() {
    setLoading(true);

    await createOrder(cart);

    setCart([]);
    setLoading(false);
  }

  async function fetchPizzaTypes() {
    // wait for 1 second to simulate loading
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const data = await getPizzaTypes();

      // console.log("Fetched pizza types:", data);
      setPizzaTypes(data);

      setPizzaType(data[0]?.id || DEFAULT_PIZZA_TYPE);
      setLoading(false);
    } catch (error) {
      //   console.error("Failed to fetch pizza types:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPizzaTypes();

    return () => {
      // Cleanup if necessary
      setPizzaTypes([]);
      setPizzaType(DEFAULT_PIZZA_TYPE);
      setPizzaSize(DEFAULT_PIZZA_SIZE);
    };
  }, []);

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

  return {
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
  };
};

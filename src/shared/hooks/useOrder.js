import { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts/contexts";
import { intl } from "../utils";
import { DEFAULT_PIZZA_TYPE, DEFAULT_PIZZA_SIZE } from "../config/constants";
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
  const handleSubmit = () => {
    setCart((prevCart) => {
      // Check if the same pizza (type and size) already exists in cart
      const existingItemIndex = prevCart.findIndex(
        item => item.pizza.id === selectedPizza.id && item.size === pizzaSize
      );

      if (existingItemIndex >= 0) {
        // If it exists, increment the quantity
        const updatedCart = [...prevCart];
        const currentQuantity = updatedCart[existingItemIndex].quantity || 1;
        const newQuantity = currentQuantity + 1;
        
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: newQuantity,
          price: selectedPizza.sizes[pizzaSize] * newQuantity,
        };
        return updatedCart;
      } else {
        // If it doesn't exist, add as new item with quantity 1
        return [
          ...prevCart,
          {
            pizza: selectedPizza,
            size: pizzaSize,
            price: selectedPizza.sizes[pizzaSize],
            quantity: 1,
          },
        ];
      }
    });
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

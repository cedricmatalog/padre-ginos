import { useState, useEffect, useDebugValue } from "react";
import { getPizzaOfTheDay } from "../lib/api";

export const usePizzaOfTheDay = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useDebugValue(pizza ? pizza.name : "No pizza of the day");

  useEffect(() => {
    const fetchPizzaOfTheDay = async () => {
      // simulate delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const data = await getPizzaOfTheDay();
        setPizza(data);
      } catch (error) {
        console.error("Failed to fetch pizza of the day:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzaOfTheDay();
  }, []);

  return { pizza, loading, error };
};

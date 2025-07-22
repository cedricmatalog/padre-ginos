import { useState, useEffect, useDebugValue } from "react";

export const usePizzaOfTheDay = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);

  useDebugValue(pizza ? pizza.name : "No pizza of the day");

  useEffect(() => {
    const fetchPizzaOfTheDay = async () => {
      // simulate delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await fetch("/api/pizza-of-the-day");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.error("Failed to fetch pizza of the day:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzaOfTheDay();
  }, []);

  return { pizza, loading };
};

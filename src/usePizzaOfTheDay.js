import { useState, useEffect } from "react";

export const usePizzaOfTheDay = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizzaOfTheDay = async () => {
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

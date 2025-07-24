import { BASE_URL } from "../config";
import { usePizzaOfTheDay } from "../hooks/usePizzaOfTheDay";
import { intl } from "../utils";

const PizzaoOfTheDay = () => {
  const { pizza, loading, error } = usePizzaOfTheDay();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!pizza) {
    return <div>No pizza of the day available.</div>;
  }

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizza.name}</h3>
          <p>{pizza.description}</p>
          <p className="pizza-of-the-day-price">
            From: {intl.format(pizza.sizes.S)}
          </p>
        </div>
        <img
          className="pizza-of-the-day-image"
          src={`${BASE_URL}${pizza.image}`}
          alt={pizza.name}
        />
      </div>
    </div>
  );
};

export default PizzaoOfTheDay;
